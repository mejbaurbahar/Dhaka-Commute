import { DistrictMap, RouteResponse } from './types';

// Update this to your actual backend URL. 
export const API_ENDPOINT = '/api/routes/intercity'; 

// [Latitude, Longitude] - Covering all 64 Districts + Major Spots
export const DISTRICT_COORDINATES: {[key: string]: [number, number]} = {
  // Dhaka Division (13)
  "Dhaka": [23.8103, 90.4125],
  "Gazipur": [24.0958, 90.4125],
  "Kishoreganj": [24.4260, 90.9821],
  "Manikganj": [23.8644, 90.0047],
  "Munshiganj": [23.5422, 90.5305],
  "Narayanganj": [23.6238, 90.5000],
  "Narsingdi": [23.9193, 90.7202],
  "Tangail": [24.2513, 89.9167],
  "Faridpur": [23.6071, 89.8429],
  "Gopalganj": [23.0051, 89.8258],
  "Madaripur": [23.1641, 90.1897],
  "Rajbari": [23.7574, 89.6445],
  "Shariatpur": [23.2423, 90.4348],

  // Chattogram Division (11)
  "Chattogram": [22.3569, 91.7832],
  "Brahmanbaria": [23.9513, 91.1147],
  "Chandpur": [23.2321, 90.6631],
  "Cumilla": [23.4607, 91.1809],
  "Cox's Bazar": [21.4272, 92.0058],
  "Feni": [23.0186, 91.3966],
  "Khagrachari": [23.1116, 91.9906],
  "Lakshmipur": [22.9447, 90.8282],
  "Noakhali": [22.8724, 91.0973],
  "Rangamati": [22.6533, 92.1789],
  "Bandarban": [22.1953, 92.2184],

  // Rajshahi Division (8)
  "Rajshahi": [24.3636, 88.6241],
  "Bogura": [24.8465, 89.3775],
  "Joypurhat": [25.0968, 89.0227],
  "Naogaon": [24.7936, 88.9318],
  "Natore": [24.4206, 89.0006],
  "Chapainawabganj": [24.5965, 88.2775],
  "Pabna": [24.0063, 89.2372],
  "Sirajganj": [24.4534, 89.7008],

  // Khulna Division (10)
  "Khulna": [22.8456, 89.5403],
  "Bagerhat": [22.6516, 89.7859],
  "Chuadanga": [23.6402, 88.8418],
  "Jashore": [23.1634, 89.2182],
  "Jhenaidah": [23.5450, 89.1726],
  "Kushtia": [23.9013, 89.1204],
  "Magura": [23.4873, 89.4198],
  "Meherpur": [23.7622, 88.6318],
  "Narail": [23.1725, 89.5127],
  "Satkhira": [22.7185, 89.0705],

  // Barishal Division (6)
  "Barishal": [22.7010, 90.3535],
  "Barguna": [22.1520, 90.1181],
  "Bhola": [22.6859, 90.6482],
  "Jhalokati": [22.6406, 90.1987],
  "Patuakhali": [22.3596, 90.3299],
  "Pirojpur": [22.5841, 89.9720],

  // Sylhet Division (4)
  "Sylhet": [24.8949, 91.8687],
  "Habiganj": [24.3749, 91.4155],
  "Moulvibazar": [24.4829, 91.7649],
  "Sunamganj": [25.0662, 91.4073],

  // Rangpur Division (8)
  "Rangpur": [25.7439, 89.2752],
  "Dinajpur": [25.6217, 88.6355],
  "Gaibandha": [25.3288, 89.5281],
  "Kurigram": [25.8054, 89.6362],
  "Lalmonirhat": [25.9165, 89.4532],
  "Nilphamari": [25.9318, 88.8561],
  "Panchagarh": [26.3373, 88.5537],
  "Thakurgaon": [26.0337, 88.4617],

  // Mymensingh Division (4)
  "Mymensingh": [24.7471, 90.4203],
  "Jamalpur": [24.9375, 89.9378],
  "Netrokona": [24.8710, 90.7277],
  "Sherpur": [25.0205, 90.0153],

  // Famous Tourist Spots & Borders
  "Saint Martin's Island": [20.6237, 92.3234],
  "Sajek Valley": [23.3820, 92.2938],
  "Kuakata": [21.8218, 90.1174],
  "Sreemangal": [24.3065, 91.7296],
  "Sundarbans": [21.9497, 89.1833],
  "Teknaf": [20.8700, 92.2900],
  "Benapole": [23.0381, 88.8976],
  "Jaflong": [25.1633, 92.0175],
  "Bichnakandi": [25.1783, 91.8797],
  "Tanguar Haor": [25.1481, 91.0772],
  "Nijhum Dwip": [22.0538, 91.0028]
};

export const LOCATIONS_DATA: DistrictMap = {
  "Popular Tourist Spots": [
    "Cox's Bazar", "Saint Martin's Island", "Sajek Valley", "Kuakata", 
    "Sreemangal", "Sundarbans", "Tanguar Haor", "Jaflong", "Nijhum Dwip"
  ],
  "Dhaka Division": [
    "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", 
    "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", 
    "Narsingdi", "Rajbari", "Shariatpur", "Tangail"
  ],
  "Chattogram Division": [
    "Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", 
    "Comilla", "Cox's Bazar", "Feni", "Khagrachari", 
    "Lakshmipur", "Noakhali", "Rangamati"
  ],
  "Rajshahi Division": [
    "Bogura", "Chapainawabganj", "Joypurhat", "Naogaon", 
    "Natore", "Pabna", "Rajshahi", "Sirajganj"
  ],
  "Khulna Division": [
    "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", 
    "Khulna", "Kushtia", "Magura", "Meherpur", 
    "Narail", "Satkhira"
  ],
  "Barishal Division": [
    "Barguna", "Barishal", "Bhola", "Jhalokati", 
    "Patuakhali", "Pirojpur"
  ],
  "Sylhet Division": [
    "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"
  ],
  "Rangpur Division": [
    "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", 
    "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"
  ],
  "Mymensingh Division": [
    "Jamalpur", "Mymensingh", "Netrokona", "Sherpur"
  ]
};

export const POPULAR_ROUTES = [
  { from: "Dhaka", to: "Cox's Bazar" },
  { from: "Dhaka", to: "Sylhet" },
  { from: "Dhaka", to: "Sajek Valley" },
  { from: "Chattogram", to: "Saint Martin's Island" }
];

export const DEMO_RESPONSE: RouteResponse = {
  from: "Dhaka",
  to: "Saint Martin's Island",
  date: new Date().toISOString().split('T')[0],
  source: "memory_cache",
  result: `**Route: Dhaka to Saint Martin's Island**  
**Approximate Distance:** ~350 km (Road) + 9 km (Sea)

**Recommended Modes:**

🚌 **By Bus + Ship** – Time: 10-12 hours | Price: 1800-4500 BDT  
Most popular option. Direct buses go to Teknaf, then you catch a ship.  
**Operators:** Hanif, Shyamoli, Saint Martin Paribahan, Desh Travels.  
**Ships:** Keari Sindbad, Atlantic Cruise, Bay One (from Chattogram).

✈️ **By Air + Road + Ship** – Time: 4-5 hours | Price: 4500-8000 BDT  
Fly to Cox's Bazar (45 min), then taxi/bus to Teknaf (2 hrs), then ship to island (2 hrs).  
**Airlines:** US-Bangla, Biman, Novoair.

🚂 **By Train + Bus + Ship** – Time: 14+ hours | Price: 800-2500 BDT  
Train (Cox's Bazar Express) to Cox's Bazar, then bus to Teknaf, then ship.  
**Train:** Dhaka to Cox's Bazar (Non-stop).

**Booking Links:**  
- Bus: [Shohoz](https://shohoz.com)  
- Ship: [Keari](https://keari.com)  
- Air: [Fly Novoair](https://flynovoair.com)
`
};