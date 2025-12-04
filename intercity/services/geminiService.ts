
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RoutingResponse } from "../types";

// --- Cache Configuration ---
const CACHE_TTL = 1000 * 60 * 30; // 30 Minutes for "Fresh" data
const CACHE_PREFIX = 'bdt_route_v1_';

const getCacheKey = (origin: string, destination: string) =>
  `${CACHE_PREFIX}${origin.trim().toLowerCase()}_${destination.trim().toLowerCase()}`;

// --- Helper to clean Gemini response ---
const cleanResponse = (text: string) => {
  // Remove markdown code blocks markers
  let clean = text.replace(/```json/g, '').replace(/```/g, '');
  return clean.trim();
};

// --- Helper to attempt fetching real bus data ---
const fetchRealBusData = async (from: string, to: string) => {
  const controller = new AbortController();
  // REDUCED TIMEOUT: 1500ms (1.5s) - Aggressive timeout for speed
  const timeoutId = setTimeout(() => controller.abort(), 1500);

  try {
    // City Mapping for Shohoz/Legacy APIs + Bangla Support
    const cityMap: Record<string, string> = {
      // English Mappings
      "jashore": "Jessore",
      "barisal": "Barishal",
      "chittagong": "Chattogram",
      "coxs bazar": "Cox's Bazar",
      "cox's bazar": "Cox's Bazar",
      "dhaka": "Dhaka",
      "sylhet": "Sylhet",
      "rajshahi": "Rajshahi",
      "khulna": "Khulna",
      "rangpur": "Rangpur",
      "benapole": "Benapole",
      "kuakata": "Kuakata",
      "teknaf": "Teknaf",
      "pabna": "Pabna",
      "ishwardi": "Ishwardi",

      // Bangla Mappings
      "ঢাকা": "Dhaka",
      "চট্টগ্রাম": "Chattogram",
      "কক্সবাজার": "Cox's Bazar",
      "সিলেট": "Sylhet",
      "রাজশাহী": "Rajshahi",
      "খুলনা": "Khulna",
      "বরিশাল": "Barishal",
      "যশোর": "Jessore",
      "বেনাপোল": "Benapole",
      "রংপুর": "Rangpur",
      "কুয়াকাটা": "Kuakata",
      "সেন্টমার্টিন": "Saint Martin",
      "পাবনা": "Pabna"
    };

    const normalizeCity = (city: string) => {
      const lower = city.toLowerCase().trim();
      // Check for keywords in the input (e.g., "Gabtoli, Dhaka" matches "dhaka")
      for (const key in cityMap) {
        if (lower.includes(key)) return cityMap[key];
      }
      // Capitalize first letter as fallback
      return city.charAt(0).toUpperCase() + city.slice(1);
    };

    const fromCity = normalizeCity(from);
    const toCity = normalizeCity(to);

    // Default to tomorrow for availability
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = new Date(tomorrow).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'); // 04-Dec-2025

    const url = `https://webapi.shohoz.com/v1.0/web/booking/bus/search-trips?from_city=${encodeURIComponent(fromCity)}&to_city=${encodeURIComponent(toCity)}&date_of_journey=${formattedDate}&dor=`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });

    if (response.ok) {
      const data = await response.json();

      let trips: any[] = [];

      // Try to find the trips array in common locations
      if (Array.isArray(data)) {
        trips = data;
      } else if (data.trips && Array.isArray(data.trips)) {
        trips = data.trips;
      } else if (data.payload && data.payload.trips && Array.isArray(data.payload.trips)) {
        trips = data.payload.trips;
      } else {
        // Fallback: look for any large array in values
        const values = Object.values(data);
        const foundArray = values.find(v => Array.isArray(v) && v.length > 0);
        if (foundArray) trips = foundArray as any[];
      }

      // OPTIMIZATION: Extract only vital info. 
      // Limited to 5 items to prevent output token limits/latency
      const simplifiedTrips = trips.slice(0, 5).map(t => ({
        op: t.operator_name || t.operator || "Bus Service",
        type: t.bus_type || t.trip_type || "Non-AC",
        dep: t.departure_time || t.time,
        price: t.fare || t.price || "Check Counter",
        cntr: t.boarding_point || t.counter || "Main Counter",
        ph: t.contact_number || "Unavailable"
      }));

      if (simplifiedTrips.length > 0) {
        return JSON.stringify(simplifiedTrips);
      }

      // If we couldn't parse trips nicely, send a very small substring
      return JSON.stringify(data).substring(0, 1000);
    }
  } catch (error) {
    // API fetch failed or timed out - verify quietly
  } finally {
    clearTimeout(timeoutId);
  }
  return null;
};

// --- Dhaka Local Bus Knowledge Base ---
const DHAKA_LOCAL_BUS_DATA = `
USE THIS MASTER LIST FOR DHAKA LOCAL BUS ROUTES. DO NOT INVENT BUSES.
FORMAT: Name | Route | Key Stops | Fare

1. Achim Paribahan | Gabtoli ⇄ Demra | Gabtoli, Technical, Mirpur 1, Mirpur 10, Kalshi, Badda, Rampura, Demra | ৳20-35
2. Active Paribahan | Shia Masjid ⇄ Abdullahpur | Shyamoli, Technical, Mirpur 1, Mirpur 10, Kalshi, Airport, Uttara | ৳25-40
3. Agradut | Savar ⇄ Notun Bazar | Savar, Gabtoli, Shyamoli, Mohakhali, Gulshan 1, Badda | ৳30-50
4. Airport Bangabandhu Avenue | Fulbaria ⇄ Abdullahpur | Gulistan, Shahbag, Farmgate, Mohakhali, Banani, Airport, Uttara | ৳25-45
5. Ajmi | Dhamrai ⇄ Chittagong Road | Savar, Gabtoli, Shyamoli, New Market, Gulistan, Signboard | ৳35-60
6. Al Madina Plus One | Nandan Park ⇄ Kamalapur | Savar, Gabtoli, Shyamoli, Farmgate, Shahbag, Gulistan, Motijheel | ৳40-70
7. Alif | Mirpur 14 ⇄ Nandan Park | Mirpur 10, Mirpur 1, Technical, Gabtoli, Savar | ৳35-60
8. Alif | Shia Masjid ⇄ Banasree | Mohammadpur, Asad Gate, Farmgate, Moghbazar, Rampura | ৳20-35
9. Alif | Mirpur 1 ⇄ Banasree | Technical, Agargaon, Mohakhali, Gulshan, Badda, Rampura | ৳20-35
10. Alif | Japan Garden City ⇄ Abdullahpur | Shyamoli, Agargaon, Mirpur 10, Kalshi, Airport, Uttara | ৳25-45
11. Anabil Super | Sign Board ⇄ Gazipur | Jatrabari, Sayedabad, Badda, Kuril, Airport, Tongi | ৳30-60
12. Arnob | Hemayetpur ⇄ Demra | Gabtoli, Shyamoli, Mohakhali, Gulshan 1, Badda, Rampura | ৳25-45
13. Ashirbad Paribahan | Duairipara ⇄ Azimpur | Mirpur 1, Technical, Shyamoli, New Market | ৳15-30
14. Ashulia Classic | Nobinagar ⇄ Satrasta | Ashulia, Abdullahpur, Airport, Banani, Mohakhali | ৳35-55
15. Asmani | Dhour ⇄ Madanpur | Abdullahpur, Airport, Kuril, Badda, Rampura, Demra | ৳30-55
16. ATCL | Mohammadpur ⇄ Arambagh | Asad Gate, Science Lab, Shahbag, Gulistan | ৳15-25
17. Baishakhi Paribahan | Savar ⇄ Notun Bazar | Gabtoli, Technical, Shyamoli, Mohakhali, Gulshan 1, Badda | ৳30-50
18. Bashumoti | Gabtoli ⇄ Gazipur | Mirpur 10, Kalshi, Airport, Uttara, Tongi | ৳35-60
19. Best Satabdi AC | Azimpur ⇄ Diabari | Farmgate, Mohakhali, Banani, Airport, Uttara | ৳40-70
20. Best Transport | Mirpur 10 ⇄ Jatrabari | Agargaon, Farmgate, Shahbag, Gulistan | ৳20-35
21. Bihanga | Mirpur 12 ⇄ Notun Bazar | Mirpur 10, Agargaon, Mohakhali, Gulshan 1, Badda | ৳15-30
22. Bikash | Sign Board ⇄ Dhour | Jatrabari, Gulistan, Farmgate, Mohakhali, Airport | ৳35-60
23. Bikalpa | Mirpur 12 ⇄ Motijheel | Mirpur 10, Agargaon, Farmgate, Shahbag, Gulistan | ৳20-35
24. Bondhu | Gulistan ⇄ Notun Bazar | Paltan, Malibagh, Rampura, Badda | ৳15-25
25. Borak | Palashi ⇄ Meghna Ghat | Gulistan, Jatrabari, Signboard, Chittagong Road | ৳40-70
26. BRTC | Motijheel ⇄ Uttara/Gazipur | Shahbag, Farmgate, Mohakhali, Airport | ৳25-60
27. Cantonment | Mirpur 14 ⇄ Savar | Mirpur 1, Gabtoli, Hemayetpur | ৳25-40
28. City Link | Chittagong Road ⇄ Ghatar Char | Jatrabari, Gulistan, Shahbag, Mohammadpur | ৳30-50
29. D Link | Fulbaria ⇄ Dhamrai | Gulistan, New Market, Shyamoli, Gabtoli, Savar | ৳35-60
30. Desh Bangla | Postagola ⇄ Kamarpara | Jatrabari, Badda, Kuril, Airport, Abdullahpur | ৳30-55
31. Dewan | Azimpur ⇄ Kuril | Science Lab, Farmgate, Mohakhali, Gulshan 1, Badda | ৳20-35
32. Dhakar Chaka | Gulshan/Banani Area Loop | Police Plaza, Gulshan 2, Banani, Notun Bazar | ৳15-25
33. Dhaka Paribahan | Gulistan ⇄ Shib Bari | Shahbag, Farmgate, Mohakhali, Airport, Gazipur | ৳30-60
34. Elite | Agargaon ⇄ Abdullahpur | Mirpur 10, Kalshi, Airport, Uttara | ৳20-35
35. ETC Transport | Golap Shah Mazar ⇄ Mirpur 12 | Shahbag, Farmgate, Agargaon, Mirpur 10 | ৳15-25
36. First Ten | Vashantek ⇄ Gabtoli | Mirpur 14, Mirpur 10, Mirpur 1 | ৳15-25
37. FTCL | Mohammadpur ⇄ Chittagong Road | Asad Gate, Science Lab, Shahbag, Gulistan, Jatrabari | ৳25-45
38. Grameen Suveccha | Fulbaria ⇄ Chandra | Gulistan, Gabtoli, Savar, Nobinagar | ৳40-70
39. Green Anabil | Chashara ⇄ Gazipur | Signboard, Jatrabari, Badda, Airport, Tongi | ৳40-70
40. Green Dhaka | Motijheel ⇄ Abdullahpur | Gulistan, Malibagh, Badda, Kuril, Airport | ৳25-45
41. Gulshan Chaka | Banani ⇄ Notun Bazar | Gulshan 2 | ৳15-25
42. Hazi Transport | Mirpur 12 ⇄ Motijheel | Mirpur 10, Agargaon, Farmgate, Shahbag, Gulistan | ৳20-35
43. Himachal | Metro Hall ⇄ Mirpur 12 | Jatrabari, Gulistan, Farmgate, Mirpur 10 | ৳30-50
44. Himalay | Madanpur ⇄ Tongi | Signboard, Jatrabari, Badda, Airport | ৳35-60
45. Itihash | Mirpur 14 ⇄ Chandra | Mirpur 10, Mirpur 1, Gabtoli, Savar | ৳40-70
46. Jabale Noor | Agargaon ⇄ Abdullahpur | Mirpur 10, Kalshi, Airport, Uttara | ৳20-35
47. Jabale Noor | Gabtoli ⇄ Notun Bazar | Technical, Mohakhali, Gulshan 1, Badda | ৳15-25
48. JM Super | Jatrabari ⇄ Tongi | Sayedabad, Badda, Rampura, Airport | ৳25-45
49. Kamal Plus | Chittagong Road ⇄ Ghatar Char | Signboard, Jatrabari, Gulistan, Mohammadpur | ৳30-50
50. Khajababa | Jatrabari ⇄ Mirpur 12 | Gulistan, Shahbag, Farmgate, Agargaon, Mirpur 10 | ৳20-35
51. Labbaik | Savar ⇄ Sign Board | Gabtoli, Shyamoli, Farmgate, Sayedabad, Jatrabari | ৳30-50
52. Lal Sabuj | Nandan Park ⇄ Motijheel | Savar, Gabtoli, Farmgate, Shahbag, Gulistan | ৳40-70
53. Lams | Mirpur 12 ⇄ Motijheel | Mirpur 10, Agargaon, Farmgate, Shahbag | ৳20-35
54. Malancha | Mohammadpur ⇄ Dhupkhola | Asad Gate, Science Lab, New Market, Gulistan | ৳15-25
55. Manjil Express | Chittagong Road ⇄ Abdullahpur | Jatrabari, Gulistan, Mohakhali, Airport | ৳35-60
56. Meghla | Kalabagan ⇄ Vulta | Science Lab, Shahbag, Gulistan, Jatrabari | ৳30-55
57. Mirpur Link | ECB Square ⇄ Azimpur | Mirpur 10, Mirpur 1, Shyamoli, New Market | ৳15-25
58. Mirpur Mission | Chiriyakhana ⇄ Motijheel | Mirpur 1, Technical, Shyamoli, Farmgate, Gulistan | ৳15-25
59. MM Lovely | Savar ⇄ Signboard | Gabtoli, Farmgate, Malibagh, Sayedabad | ৳30-50
60. Modhumoti | Chiriyakhana ⇄ Demra | Mirpur 1, Agargaon, Mohakhali, Badda, Rampura | ৳20-35
61. Mohona | Mirpur 14 ⇄ Fantasy Kingdom | Mirpur 10, Mirpur 1, Gabtoli, Savar, Ashulia | ৳30-50
62. Moumita | Chashara ⇄ Chandra | Signboard, Jatrabari, Gulistan, Gabtoli, Savar | ৳50-80
63. Nabakali | Chiriyakhana ⇄ Keraniganj | Mirpur 1, Gabtoli, Mohammadpur, Babubazar | ৳25-40
64. New Vision | Chiriyakhana ⇄ Motijheel | Mirpur 1, Khamarbari, Farmgate, Shahbag, Gulistan | ৳15-25
65. Nilachol | Chittagong Road ⇄ Paturia | Jatrabari, Gulistan, Gabtoli, Savar, Manikganj | ৳50-90
66. Nishorgo | Mirpur 14 ⇄ Azimpur | Mirpur 10, Agargaon, Farmgate, New Market | ৳15-30
67. Nur E Makka | Chiriyakhana ⇄ Malibagh | Mirpur 10, Kuril, Badda, Rampura | ৳15-30
68. Omama International | Motijheel ⇄ Airport | Shahbag, Farmgate, Mohakhali, Banani | ৳20-35
69. One Transport | Nandan Park ⇄ Motijheel | Savar, Gabtoli, Farmgate, Shahbag, Gulistan | ৳40-70
70. Pallabi Super | Gabtoli ⇄ Kamarpara | Mirpur 1, Mirpur 10, Airport, Uttara, Abdullahpur | ৳25-45
71. Power Paribahan | Mirpur 14 ⇄ Konabari | Mirpur 10, Mirpur 1, Gabtoli, Savar, Chandra | ৳35-60
72. Prattay | Gabtoli ⇄ Babubazar | Mohammadpur, Jigatola, Science Lab, Gulistan | ৳20-35
73. Provati Banasree | Fulbaria ⇄ Baromi | Malibagh, Mohakhali, Airport, Tongi, Gazipur | ৳40-75
74. Purbachol Logistics | Mirpur 14 ⇄ Chandra | Mirpur 10, Gabtoli, Savar, Nobinagar | ৳40-70
75. Raida Enterprise | Postagola ⇄ Diabari | Jatrabari, Khilgaon, Badda, Kuril, Airport | ৳25-45
76. Raja City | Postagola ⇄ Ghatar Char | Jatrabari, Gulistan, Shahbag, Mohammadpur | ৳25-40
77. Rajanigandha | Chittagong Road ⇄ Mohammadpur | Signboard, Jatrabari, Gulistan, Science Lab | ৳25-40
78. Rajdhani Super | Hemayetpur ⇄ Demra | Gabtoli, Mirpur 10, Kuril, Badda, Rampura | ৳30-50
79. Ramjan | Gabtoli ⇄ Demra | Mohammadpur, Science Lab, Shahbag, Malibagh, Rampura | ৳25-40
80. Rois | Sony Cinema ⇄ Banasree | Mirpur 2, Mirpur 10, Agargaon, Mohakhali, Badda | ৳15-25
81. Rongdhonu Express | Adabor ⇄ Postagola | Shyamoli, Farmgate, Shahbag, Gulistan, Jatrabari | ৳15-25
82. Runway Express | Keraniganj ⇄ ECB Square | Mohammadpur, Shyamoli, Mirpur 1, Mirpur 10 | ৳25-40
83. Rupa Paribahan | Gabtoli ⇄ Mirpur 14 | Technical, Mirpur 1, Mirpur 10 | ৳10-15
84. Rupkotha | Gabtoli ⇄ Abdullahpur | Mirpur 1, Mirpur 10, Airport, Uttara | ৳20-35
85. Safety Druti | Mirpur 12 ⇄ Azimpur | Mirpur 10, Agargaon, Farmgate, Shahbag, New Market | ৳15-30
86. Sakalpa | Chiriyakhana ⇄ Kamalapur | Mirpur 1, Technical, Shyamoli, Farmgate, Motijheel | ৳15-25
87. Salsabil | Postagola ⇄ Gazipur | Jatrabari, Sayedabad, Badda, Airport, Tongi | ৳35-60
88. Savar Paribahan | Sadarghat ⇄ Nandan Park | Gulistan, Gabtoli, Savar, Ashulia | ৳40-70
89. Selfie | Gabtoli ⇄ Paturia | Savar, Dhamrai, Manikganj | ৳50-90
90. Shadhin | Bosila ⇄ Demra | Mohammadpur, Science Lab, Shahbag, Gulistan, Jatrabari | ৳25-40
91. Shadhin Express | Mirpur 12 ⇄ Maowa | Mirpur 10, Farmgate, Gulistan, Jatrabari, Kuchilamora | ৳40-70
92. Shahria Enterprise | Gabtoli ⇄ Postagola | Mohammadpur, Science Lab, New Market, Gulistan | ৳25-40
93. Shikor | Mirpur 12 ⇄ Jatrabari | Mirpur 10, Agargaon, Farmgate, Shahbag, Gulistan | ৳20-35
94. Siam Transport | Banasree ⇄ Nobinagar | Badda, Airport, Uttara, Abdullahpur, Ashulia | ৳35-60
95. Skyline | Sadarghat ⇄ Gazipur | Gulistan, Mohakhali, Airport, Tongi | ৳35-60
96. Somota | Chittagong Road ⇄ Abdullahpur | Signboard, Jatrabari, Badda, Airport | ৳40-70
97. Somoy | Sign Board ⇄ Mirpur 12 | Jatrabari, Gulistan, Farmgate, Mirpur 10 | ৳25-40
98. Super | Gulistan ⇄ Nobinagar | Gabtoli, Savar, Ashulia | ৳35-60
99. Suveccha | Chittagong Road ⇄ Chandra | Jatrabari, Gulistan, Gabtoli, Savar | ৳50-80
100. Swajan | Savar ⇄ Sadarghat | Gabtoli, Shyamoli, Science Lab, New Market | ৳30-50
101. Talukdar | Chiriyakhana ⇄ Chittagong Road | Mirpur 1, Farmgate, Shahbag, Gulistan, Jatrabari | ৳30-55
102. Tanjil | Chiriyakhana ⇄ Sadarghat | Mirpur 1, Technical, Shyamoli, New Market | ৳15-25
103. Taranga Plus | Mohammadpur ⇄ South Banasree | Asad Gate, Farmgate, Moghbazar, Rampura | ৳15-30
104. Thikana Express | Shonbari ⇄ Chandra | Baipail, DEPZ | ৳50-90
105. Titas | Chiriyakhana ⇄ Chandra | Mirpur 1, Gabtoli, Savar | ৳40-70
106. Trust Transport | Mirpur 10 ⇄ Shahbag | Cantonment, Farmgate | ৳15-25
107. Trust Transport AC | Mirpur DOHS ⇄ Kawran Bazar | Cantonment, Farmgate | ৳30-50
108. Turag | Jatrabari ⇄ Tongi | Sayedabad, Badda, Kuril, Airport, Uttara | ৳25-40
109. Victor Classic | Sadarghat ⇄ Abdullahpur | Gulistan, Malibagh, Mohakhali, Airport, Uttara | ৳25-45
110. Welcome | Nandan Park ⇄ Motijheel | Savar, Gabtoli, Farmgate, Shahbag, Gulistan | ৳40-70
111. 4 No. Alike | Balughat ⇄ Motijheel | Cantonment, Farmgate, Shahbag, Gulistan | ৳15-25
112. 6 No. | Kamalapur ⇄ Notun Bazar | Gulistan, Malibagh, Mohakhali, Gulshan | ৳15-30
113. 9 No. | College Gate ⇄ Mirpur 12 | Shyamoli, Technical, Mirpur 1, Mirpur 10 | ৳10-20
114. 13 No. | Mohammadpur ⇄ Azimpur | Asad Gate, Science Lab, New Market | ৳10-15
`;

// --- Dhaka Metro Rail Knowledge Base ---
const DHAKA_METRO_RAIL_DATA = `
USE THIS DATA FOR DHAKA METRO RAIL (MRT Line 6):
Stations: Uttara North - Uttara Center - Uttara South - Pallabi - Mirpur 11 - Mirpur 10 - Kazipara - Shewrapara - Agargaon - Bijoy Sarani - Farmgate - Karwan Bazar - Shahbag - Dhaka University - Bangladesh Secretariat - Motijheel.
- Operating Hours: ~07:15 AM to ~09:40 PM.
- Usage: Suggest METRO_RAIL if the user is traveling between these areas (e.g. Uttara to Motijheel, Mirpur to Farmgate). It is faster than local bus.
- **IMPORTANT**: There is **NO** "Airport Metro Station" yet.
  - If starting from **Airport (DAC)**: Take a bus/CNG/Rickshaw to **Uttara North (Diabari)** station (approx 10-15 min) to catch the Metro.
`;

// --- Ship Knowledge Base ---
const SHIP_KNOWLEDGE_BASE = `
USE THIS REAL-WORLD SHIP/FERRY DATA:
**1. Cox's Bazar to Saint Martin (Direct)**:
- **MV Karnafuly Express**: Dep CXB (BIWTA Ghat) 07:00 | Arr Saint Martin 12:30.
- **Fare**: ~1600-3000 BDT (Economy/Business).
- **Return**: Dep Saint Martin 15:00 | Arr CXB 20:30.

**2. Teknaf to Saint Martin**:
- **MV Baro Awlia**: Dep Teknaf 09:30 | Arr Saint Martin 12:00.
- **Keari Sindbad**: Dep Teknaf 09:30 | Arr Saint Martin 12:00.
- **Fare**: ~500-1200 BDT.
- **Return**: Dep Saint Martin 15:00.

**3. Dhaka to Barishal/South (Launch)**:
- **Sundarban / Parabat / Surovi**: Dep Sadarghat 20:30-21:00 (Overnight).
- **Green Line Water Bus**: Dep Sadarghat 08:00 (Day).
`;

// --- Intercity Bus Knowledge Base (For Fallback) ---
const INTERCITY_BUS_KNOWLEDGE_BASE = `
IF API DATA IS MISSING, USE THESE OPERATORS AND SCHEDULES:

**Benapole to Dhaka (Direct):**
- **Green Line**: Scania AC. 09:00, 12:30, 22:00. Fare: ~1500-2000 BDT. Counter: Benapole Checkpost.
- **Shohagh Paribahan**: AC/Non-AC. 08:30, 11:00, 21:30. Fare: ~800-1600 BDT.
- **Eagle Paribahan**: Non-AC/AC. 10:00, 20:00, 22:30. Fare: ~700-1200 BDT.
- **Hanif Enterprise**: AC/Non-AC. Frequent. Fare: ~800-1500 BDT.

**Dhaka to Cox's Bazar:**
- **Green Line / Saint Martin Paribahan**: Luxury AC. 21:00, 22:00. Fare: ~2000-2500 BDT.
- **Shyamoli / Hanif**: AC/Non-AC. 20:30, 21:30, 23:00. Fare: ~1000-1800 BDT.

**Cox's Bazar to Teknaf (Marine Drive):**
- **Palanquin Service**: Marine Drive Special. 08:00, 10:00, 14:00. Fare: ~250-400 BDT.
- **Cox's Bazar Special**: Local/Seating. Frequent. Fare: ~150-250 BDT.
- **Saint Martin Paribahan**: Bus to Teknaf Jetty. 06:00, 07:00, 08:00. Fare: ~300-500 BDT.

**Sylhet to Chattogram (Direct):**
- **Ena Transport**: AC/Non-AC. 07:00, 14:00, 22:00. Fare: ~800-1200 BDT.
- **Saudia Paribahan**: AC/Non-AC. 08:00, 21:00, 23:00. Fare: ~900-1400 BDT.
- **Paharika Service**: Non-AC. Frequent.

**Benapole to Chattogram/Cox's Bazar:**
- Typically connects via Dhaka (Sayedabad/Fakirapool) OR via Jashore.
- Preferred Route: Benapole -> Dhaka (Bus) -> Cox's Bazar (Bus).
`;

// --- Train Knowledge Base ---
const TRAIN_KNOWLEDGE_BASE = `
USE THIS REAL-WORLD TRAIN DATA FOR BANGLADESH RAILWAY:

**1. Dhaka (Kamalapur) ⇄ Chattogram:**
- **Sonar Bangla Express (788)**: Dep DAC 07:00 | Arr CGP 12:15. (Off: Wed). Premium Non-Stop.
- **Subarna Express (702)**: Dep DAC 16:30 | Arr CGP 21:50. (Off: Fri).
- **Mahanagar Provati (704)**: Dep DAC 07:45 | Arr CGP 14:00. (Off: None).
- **Mahanagar Godhuli (722)**: Dep DAC 15:00 | Arr CGP 21:25. (Off: None).
- **Turna Express (742)**: Dep DAC 23:30 | Arr CGP 06:20. (Off: None).
- *Return (CGP to DAC)*: Sonar Bangla (17:00), Subarna (07:00), Turna (23:00).

**2. Dhaka ⇄ Sylhet:**
- **Parabat Express (709)**: Dep DAC 06:20 | Arr ZYL 13:00. (Off: Tue).
- **Jayantika Express (717)**: Dep DAC 11:15 | Arr ZYL 19:00. (Off: Thu).
- **Kalni Express (773)**: Dep DAC 13:30 | Arr ZYL 20:30. (Off: Fri).
- **Upaban Express (739)**: Dep DAC 20:30 | Arr ZYL 05:00. (Off: Wed).

**3. Dhaka ⇄ Rajshahi:**
- **Banalata Express (791)**: Dep DAC 13:30 | Arr RJH 17:50. (Off: Fri). Non-Stop.
- **Silkcity Express (753)**: Dep DAC 14:45 | Arr RJH 20:35. (Off: Sun).
- **Padma Express (759)**: Dep DAC 23:00 | Arr RJH 04:30. (Off: Tue).

**4. Dhaka ⇄ Khulna:**
- **Sundarban Express (726)**: Dep DAC 08:15 | Arr KLN 15:50. (Off: Wed).
- **Chitra Express (764)**: Dep DAC 19:00 | Arr KLN 03:40. (Off: Mon).

**5. Dhaka ⇄ Benapole:**
- **Benapole Express (795)**: Dep Benapole 13:00 -> Arr Dhaka 21:00. (Off: Wed).
- **Benapole Express (796)**: Dep Dhaka 23:45 -> Arr Benapole 07:20. (Off: Wed).

**6. Dhaka ⇄ Cox's Bazar:**
- **Cox's Bazar Express (813)**: Dep DAC 22:30 -> Arr CXB 07:00. (Off: Mon).
- **Porjoton Express (815)**: Dep DAC 06:15 -> Arr CXB 15:00. (Off: Tue).
- *Return (CXB to DAC)*: CXB Exp (12:30), Porjoton (20:00).

**7. Dhaka ⇄ Rangpur/Kurigram/Lalmonirhat:**
- **Rangpur Express (771)**: Dep DAC 09:10 | Arr Rangpur 19:00. (Off: Sun).
- **Kurigram Express (797)**: Dep DAC 20:45 | Arr Kurigram 06:15. (Off: Wed).
- **Lalmoni Express (751)**: Dep DAC 21:45 | Arr Lalmonirhat 07:20. (Off: Fri).

**8. Sylhet ⇄ Chattogram (Cross-Country):**
- **Paharika Express (719)**: Dep ZYL 10:15 | Arr CGP 19:00. (Off: Sat).
- **Udayan Express (723)**: Dep ZYL 22:00 | Arr CGP 06:30. (Off: Sun).

**9. Khulna/Jashore ⇄ Rajshahi (Cross-Country):**
- **Kapotaksha Express (715)**: Dep KLN 06:15 -> Jashore 07:00 -> Arr RJH 12:00. (Off: Tue).
- **Sagar Dari Express (761)**: Dep KLN 16:00 -> Jashore 17:00 -> Arr RJH 22:00. (Off: Mon).
`;

// --- Flight Knowledge Base ---
const FLIGHT_KNOWLEDGE_BASE = `
USE THIS REAL-WORLD FLIGHT DATA FOR BANGLADESH DOMESTIC AIRLINES:
**Airlines**: US-Bangla Airlines (BS), Biman Bangladesh (BG), Novoair (VQ), Air Astra (2A).
**Fare Ranges**: Saver (3500-4500), Flexi (5000-7500), Premium (8000+).

**1. Dhaka (DAC) ⇄ Chattogram (CGP)**:
- Frequency: Very High (Every 30-60 mins).
- First Flight: ~07:30 (US-Bangla/Biman).
- Last Flight: ~21:30 (US-Bangla).
- Flight Time: 45 mins.

**2. Dhaka (DAC) ⇄ Cox's Bazar (CXB)**:
- Frequency: High (Daily 8-10 flights).
- Morning: 07:30, 08:45, 09:30, 10:30.
- Afternoon: 12:00, 13:30, 14:45, 15:30.
- Flight Time: 60 mins.

**3. Dhaka (DAC) ⇄ Sylhet (ZYL)**:
- Frequency: Medium (Daily 5-6 flights).
- Schedule: 07:45, 11:30, 13:40, 18:30, 20:15.
- Flight Time: 50 mins.

**4. Dhaka (DAC) ⇄ Jashore (JSR)**:
- Frequency: Medium (Daily 6-8 flights).
- Schedule: 07:45, 10:30, 15:30, 17:45, 19:30.
- Flight Time: 40 mins.
- **Note**: Serves Khulna, Benapole, Narail.

**5. Dhaka (DAC) ⇄ Saidpur (SPD)**:
- Frequency: High (Daily 12+ flights).
- Serves: Rangpur, Dinajpur, Thakurgaon.
- Schedule: Frequent from 08:00 to 19:00.

**6. Dhaka (DAC) ⇄ Rajshahi (RJH)**:
- Frequency: Low (Daily 3-4 flights).
- Schedule: ~10:30 (Morning), ~16:00 (Afternoon).
- Operators: US-Bangla, Biman, Novoair.

**7. Dhaka (DAC) ⇄ Barishal (BZL)**:
- Frequency: Low (Daily 1-2 flights).
- Schedule: Typically morning or afternoon.

**Connecting Flights (Cross-Country)**:
- **Jashore to Cox's Bazar**: Fly JSR -> DAC (Layover) -> Fly DAC -> CXB.
- **Sylhet to Cox's Bazar**: Fly ZYL -> DAC (Layover) -> Fly DAC -> CXB.
`;

// --- Schema Definition ---
const routeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    origin: { type: Type.STRING },
    destination: { type: Type.STRING },
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["AIR", "BUS", "TRAIN", "FERRY"] },
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          totalDuration: { type: Type.STRING },
          totalCostRange: { type: Type.STRING },
          recommended: { type: Type.BOOLEAN },
          destinationWeather: {
            type: Type.OBJECT,
            description: "Predicted weather for the destination city",
            properties: {
              temperature: { type: Type.STRING, description: "e.g. 30°C" },
              condition: { type: Type.STRING, description: "e.g. Sunny, Rain" },
              icon: { type: Type.STRING, enum: ["SUN", "CLOUD", "RAIN", "WIND"] },
              advice: { type: Type.STRING, description: "Short advice e.g. Pack sunscreen" }
            },
            required: ["temperature", "condition", "icon", "advice"]
          },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                mode: { type: Type.STRING, enum: ["BUS", "TRAIN", "AIR", "LOCAL_BUS", "RICKSHAW", "WALK", "CNG", "METRO_RAIL", "FERRY"] },
                from: { type: Type.STRING },
                to: { type: Type.STRING },
                instruction: { type: Type.STRING },
                duration: { type: Type.STRING },
                distance: { type: Type.STRING },
                cost: { type: Type.STRING },
                startCoordinates: {
                  type: Type.OBJECT,
                  description: "Lat/Lng of the starting point of this step",
                  properties: { lat: { type: Type.NUMBER }, lng: { type: Type.NUMBER } },
                  required: ["lat", "lng"]
                },
                endCoordinates: {
                  type: Type.OBJECT,
                  description: "Lat/Lng of the ending point of this step",
                  properties: { lat: { type: Type.NUMBER }, lng: { type: Type.NUMBER } },
                  required: ["lat", "lng"]
                },
                details: {
                  type: Type.OBJECT,
                  properties: {
                    busName: { type: Type.STRING, description: "Name of the local bus (e.g. Boishaki)" },
                    busCounter: { type: Type.STRING },
                    counterPhone: { type: Type.STRING },
                    trainName: { type: Type.STRING },
                    flightName: { type: Type.STRING, description: "Airline Name (e.g. US-Bangla)" },
                    departureTime: { type: Type.STRING },
                    arrivalTime: { type: Type.STRING },
                    operator: { type: Type.STRING },
                    ticketType: { type: Type.STRING },
                    schedules: {
                      type: Type.ARRAY,
                      description: "List of available bus/train schedules for this leg",
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          operator: { type: Type.STRING },
                          type: { type: Type.STRING },
                          departureTime: { type: Type.STRING },
                          arrivalTime: { type: Type.STRING },
                          price: { type: Type.STRING },
                          counter: { type: Type.STRING },
                          contactNumber: { type: Type.STRING }
                        }
                      }
                    }
                  }
                }
              },
              required: ["mode", "from", "to", "instruction", "duration", "startCoordinates", "endCoordinates"]
            }
          }
        },
        required: ["id", "type", "title", "steps", "totalDuration", "totalCostRange"]
      }
    }
  },
  required: ["origin", "destination", "options"]
};

export const getTravelRoutes = async (origin: string, destination: string): Promise<RoutingResponse | null> => {
  const cacheKey = getCacheKey(origin, destination);

  try {
    // Get API key from localStorage
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      throw new Error('API key not found. Please set your Gemini API key in settings.');
    }

    // Create AI instance with user's API key
    const ai = new GoogleGenAI({ apiKey });

    // 0. Check Persistent Cache (LocalStorage) First
    // This works both offline and online for instant loading
    const cachedString = localStorage.getItem(cacheKey);
    if (cachedString) {
      const cached = JSON.parse(cachedString);
      const isOffline = !navigator.onLine;
      const isFresh = (Date.now() - cached.timestamp < CACHE_TTL);

      // Return cached data if we are offline OR if the cache is still fresh
      if (isOffline || isFresh) {
        console.log("🚀 Serving from Persistence Cache:", cacheKey);
        return cached.data;
      }
    }

    // 0.5. Check Network Status
    if (!navigator.onLine) {
      throw new Error("No internet connection and no cached route found for this journey.");
    }

    // 1. Attempt to fetch real bus data (Time limited)
    const realBusData = await fetchRealBusData(origin, destination);

    // 2. Build the prompt
    const prompt = `
      Plan a detailed multi-modal trip from ${origin} to ${destination} in Bangladesh.
      
      You MUST provide exactly 3 distinct travel options following this structure:

      ${DHAKA_LOCAL_BUS_DATA}
      ${DHAKA_METRO_RAIL_DATA}
      ${TRAIN_KNOWLEDGE_BASE}
      ${INTERCITY_BUS_KNOWLEDGE_BASE}
      ${FLIGHT_KNOWLEDGE_BASE}
      ${SHIP_KNOWLEDGE_BASE}

      **CRITICAL INSTRUCTION - OPTIMIZE FOR SPEED**: 
      - **BE BRIEF**: Keep 'instruction' and 'summary' fields VERY short (under 10 words).
      - **NO REPETITION**: Do not repeat schedule details in the instruction text.
      - **LIMIT SCHEDULES**: 'details.schedules' MUST have Max 3 items.
      - **NO EXPLANATIONS**: Do NOT output long paragraphs.
      
      **WEATHER FORECAST**:
      - For the destination city, predict/estimate current weather (Temperature, Condition) and provide a short travel tip.
      
      **DHAKA CITY TRANSIT RULES**:
      - **METRO RAIL PRIORITY**: For travel between Uttara, Mirpur, Farmgate, Shahbag, and Motijheel, you **MUST** use 'METRO_RAIL' (MRT Line 6). It is the fastest option.
      - **AIRPORT TO METRO**: Dhaka Airport does NOT have a metro station. Users must go to **Uttara North** Station (~15-20 mins by bus/CNG) to take the Metro.
      - If user is in these areas, route: Rickshaw -> Nearest Metro Station -> Metro Journey -> Destination.
      - **LOCAL BUS LOOKUP**: When suggesting a local bus in Dhaka, YOU MUST use the exact name from the "DHAKA_LOCAL_BUS_DATA" list above (e.g. "Victor Classic", "Raida Enterprise"). Do NOT invent bus names.

      **SMART MODE SELECTION**: 
      - Check distance. IF SHORT DISTANCE (< 150km, e.g. Benapole to Khulna) OR NO FLIGHT EXISTS: DO NOT PROVIDE "AIR". Provide "BUS" or "Private Car".
      
      **REGIONAL ROUTING LOGIC (IMPORTANT)**:
      - **Benapole/Jashore to Cox's Bazar/Chattogram (AIR Option)**:
         - **MUST USE JASHORE AIRPORT (JSR)**. Do NOT route via Bus to Dhaka for the "Fastest/Air" option.
         - **Connecting Flight**: Explain that it is a connecting flight via Dhaka (JSR -> DAC -> CXB). Provide flight names for both legs.
         - Path: Benapole -> Jashore Airport (CNG/Car) -> Fly to Dhaka (DAC) -> Fly to Cox's Bazar (CXB).

      - **Benapole to Dhaka (BUS Option)**:
         - There are DIRECT buses. Do NOT just say "Benapole to Gabtoli".
         - **MANDATORY**: You MUST populate the 'details.schedules' array with 3 options from the Knowledge Base (Green Line, Hanif, etc.) even if real API data is missing.
         - LIST SPECIFIC OPERATORS.

      - **Saint Martin's Island (SHIP Option)**:
         - If Destination is "Saint Martin":
           - From Cox's Bazar: Use 'FERRY' mode (MV Karnafuly Express).
           - From Teknaf: Use 'FERRY' mode (MV Baro Awlia, Keari Sindbad).
         - The mode MUST be 'FERRY', not 'BUS'.

      - **Cox's Bazar to Teknaf**:
         - Use Knowledge Base data for "Palanquin" or "Saint Martin Paribahan".
         - If operator name is unknown, use "Local Bus" or "Cox's Bazar Special". DO NOT leave operator empty.

      - **Benapole/Jashore to Pabna/Rajshahi/North (TRAIN Option)**:
         - **DO NOT ROUTE VIA DHAKA**. It is a huge detour.
         - **CORRECT ROUTE**: Benapole -> Jashore (Local) -> Train from Jashore to Ishwardi/Rajshahi (e.g. Kapotaksha, Sagar Dari, Rupsha) -> Local Transport to Pabna.

      - **Sylhet <-> Chattogram**:
         - **DO NOT ROUTE VIA DHAKA**. Use direct regional transport.
         - **Direct Train**: Paharika Express / Udayan Express (Via Akhaura).
         - **Direct Bus**: Direct AC/Non-AC buses via Comilla (e.g. Ena, Hanif, Shyamoli).

      **Option 1: AIR (Flight) OR Premium Bus/Car**
      - Standard logic. (If Benapole->CXB, Use Jashore Airport -> Dhaka -> CXB).
      - Use **FLIGHT_KNOWLEDGE_BASE** to provide realistic departure times/frequencies.

      **Option 2: INTERCITY BUS**
      - **Step 1**: Origin -> Best Counter. (Use Metro if in Dhaka and applicable).
      - **Step 2**: Bus Journey. Provide up to 3 schedules (Max).
        ${realBusData ? `USE THIS REAL API DATA: ${realBusData}` : '- Generate realistic schedules using KNOWLEDGE_BASE.'}
      - **Step 3**: Last Mile.

      **Option 3: TRAIN or FERRY**
      - **Step 1**: Origin -> Station/Ghat.
      - **Step 2**: Journey. 
        - Use **TRAIN_KNOWLEDGE_BASE** for trains.
        - Use **SHIP_KNOWLEDGE_BASE** for ferries (Saint Martin).
      - **Step 3**: Station -> Destination.

      **Mapping Data**:
      - Provide "startCoordinates" and "endCoordinates" (lat, lng) for EACH step.
      
      Output strictly in JSON format matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: routeSchema,
        temperature: 0.3, // Reduced temperature for less hallucination/repetition
      },
    });

    const text = response.text;
    if (!text) return null;

    // Clean and parse
    const cleanJsonText = cleanResponse(text);
    const result = JSON.parse(cleanJsonText) as RoutingResponse;

    // Save to Persistent Cache
    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        data: result,
        timestamp: Date.now()
      }));
    } catch (e) {
      // Quota exceeded or disabled
      console.warn("Could not save route to local storage cache", e);
    }

    return result;

  } catch (error) {
    console.error("Error generating routes:", error);
    throw error;
  }
};
