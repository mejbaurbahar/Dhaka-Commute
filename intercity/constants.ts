import { DistrictMap, RouteResponse } from './types';

// Update this to your actual backend URL. 
export const API_ENDPOINT = '/api/routes/intercity';

// [Latitude, Longitude] - Covering all 64 Districts + Major Spots
export const DISTRICT_COORDINATES: { [key: string]: [number, number] } = {
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
  "Nijhum Dwip": [22.0538, 91.0028],

  // Additional Major Cities & Important Locations
  "Savar": [23.8583, 90.2667],
  "Tongi": [23.8973, 90.4030],
  "Comilla": [23.4607, 91.1809],
  "Bhairab": [24.0500, 90.9667],
  "Ashuganj": [24.0333, 90.9833],
  "Mawa": [23.4532, 90.2487],
  "Aricha": [23.7697, 89.7989],
  "Paturia": [23.7833, 89.5167],
  "Daulatdia": [23.6333, 89.5833],
  "Hatirjheel": [23.7522, 90.4069],

  // Important Upazilas & Towns
  "Feni Town": [23.0186, 91.3966],
  "Brahmanbaria Town": [23.9513, 91.1147],
  "Narail Town": [23.1725, 89.5127],
  "Satkhira Town": [22.7185, 89.0705],
  "Kushtia Town": [23.9013, 89.1204],
  "Munshiganj Town": [23.5422, 90.5305],
  "Manikganj Town": [23.8644, 90.0047],
  "Mirsarai": [22.7500, 91.6167],
  "Sitakunda": [22.6333, 91.6667],
  "Hathazari": [22.4833, 91.7833],
  "Raozan": [22.5333, 91.9833],
  "Laksam": [23.2388, 91.1267],

  // Border & Port Towns
  "Mongla": [22.4920, 89.6000],
  "Payra Port": [21.8333, 90.0667],
  "Bhomra": [23.0333, 88.8667],
  "Burimari": [26.2333, 88.9667],
  "Tamabil": [25.1500, 92.2833],
  "Hili": [25.4167, 88.8000],

  // Historic & Cultural Sites
  "Mahasthangarh": [24.9667, 89.3500],
  "Paharpur": [25.0333, 88.9833],
  "Mainamati": [23.4167, 91.1833],
  "Lalbagh Fort": [23.7197, 90.3875],
  "Sonargaon": [23.6500, 90.6000],
  "Bagerhat Historic Mosque City": [22.6516, 89.7859],

  // Hill Tracts & Nature
  "Ruma": [21.8500, 92.5167],
  "Thanchi": [21.7667, 92.5833],
  "Alikadam": [21.6333, 92.4500],
  "Lama": [21.7333, 92.2167],
  "Remakri": [22.1833, 92.3500],
  "Khagrachhari Town": [23.1116, 91.9906],
  "Rangamati Town": [22.6533, 92.1789],

  // Tea Gardens & Natural Attractions
  "Srimangal Tea Garden": [24.3065, 91.7296],
  "Lawachara Forest": [24.3333, 91.7500],
  "Ratargul Swamp Forest": [25.0333, 91.8833],
  "Madhabkunda Waterfall": [24.6167, 91.9667],

  // Coastal & Island Destinations
  "Maheshkhali": [21.4667, 91.9833],
  "Sonadia Island": [21.4167, 91.8667],
  "Parki Beach": [21.7833, 91.8333],
  "Inani Beach": [21.2333, 92.0500],
  "Himchari": [21.3500, 92.0000]
};

export const LOCATIONS_DATA: DistrictMap = {
  "Popular Tourist Spots": [
    "Cox's Bazar", "Saint Martin's Island", "Sajek Valley", "Kuakata",
    "Sreemangal", "Sundarbans", "Tanguar Haor", "Jaflong", "Nijhum Dwip",
    "Inani Beach", "Himchari", "Maheshkhali", "Bichnakandi", "Bandarban",
    "Rangamati", "Khagrachari", "Ruma", "Thanchi"
  ],
  "Dhaka Division": [
    "Dhaka", "Savar", "Tongi", "Gazipur", "Narayanganj", "Narsingdi",
    "Manikganj", "Munshiganj", "Faridpur", "Rajbari", "Gopalganj",
    "Madaripur", "Shariatpur", "Kishoreganj", "Tangail",
    "Sonargaon", "Dhamrai", "Keraniganj", "Dohar", "Nawabganj",
    "Kapasia", "Mirzapur", "Basail", "Kalihati", "Gopalpur",
    "Lohajang", "Sirajdikhan", "Sreenagar", "Bhairab", "Hatirjheel",
    "Mawa", "Paturia", "Aricha", "Daulatdia", "Ashuganj"
  ],
  "Chattogram Division": [
    "Chattogram", "Cox's Bazar", "Comilla", "Feni", "Brahmanbaria",
    "Chandpur", "Lakshmipur", "Noakhali", "Bandarban", "Rangamati",
    "Khagrachari", "Mirsarai", "Sitakunda", "Hathazari", "Raozan",
    "Anowara", "Boalkhali", "Patiya", "Lohagara", "Teknaf",
    "Ramu", "Ukhia", "Chakaria", "Pekua", "Kutubdia",
    "Laksam", "Burichang", "Debidwar", "Homna", "Muradnagar",
    "Feni Town", "Daganbhuiyan", "Sonagazi", "Hajiganj", "Matlab",
    "Kachua", "Shahrasti", "Kasba", "Nabinagar", "Sarail",
    "Ruma", "Thanchi", "Rowangchhari", "Lama", "Alikadam",
    "Kaptai", "Langadu", "Baghaichhari", "Belaichhari", "Juraichhari",
    "Mainamati", "Ramgarh", "Dighinala", "Manikchhari", "Panchari"
  ],
  "Rajshahi Division": [
    "Rajshahi", "Bogura", "Pabna", "Sirajganj", "Natore", "Naogaon",
    "Chapainawabganj", "Joypurhat", "Mahasthangarh", "Paharpur",
    "Godagari", "Bagmara", "Charghat", "Durgapur", "Mohanpur",
    "Puthia", "Tanore", "Bagha", "Paba", "Shibganj",
    "Sherpur", "Adamdighi", "Sonatola", "Dhunat", "Gabtali",
    "Sariakandi", "Shajahanpur", "Kahaloo", "Nandigram", "Shahjahanpur",
    "Ishwardi", "Bera", "Atgharia", "Chatmohar", "Faridpur",
    "Belkuchi", "Kamarkhand", "Kazipur", "Raiganj", "Shahjadpur",
    "Ullahpara", "Singra", "Gurudaspur", "Naldanga", "Lalpur",
    "Badalgachhi", "Porsha", "Sapahar", "Patnitala", "Dhamoirhat",
    "Gomastapur", "Nachole", "Bholahat", "Shibganj"
  ],
  "Khulna Division": [
    "Khulna", "Jashore", "Satkhira", "Kushtia", "Bagerhat", "Jhenaidah",
    "Narail", "Magura", "Chuadanga", "Meherpur", "Benapole",
    "Mongla", "Bhomra", "Bagerhat Historic Mosque City", "Sundarbans",
    "Dumuria", "Batiaghata", "Dacope", "Koyra", "Paikgachha",
    "Phultala", "Dighalia", "Terokhada", "Rupsa", "Abhaynagar",
    "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Manirampur",
    "Sharsha", "Kaliganj", "Shyamnagar", "Tala", "Kalaroa",
    "Assasuni", "Debhata", "Patkelghata", "Kumarkhali", "Khoksa",
    "Mirpur", "Daulatpur", "Bheramara", "Shailkupa", "Alamdanga",
    "Damurhuda", "Jibannagar", "Harinakunda", "Kotchandpur", "Shailkupa",
    "Shalikha", "Sreepur", "Mohammadpur", "Lohagara", "Kalia"
  ],
  "Barishal Division": [
    "Barishal", "Patuakhali", "Bhola", "Barguna", "Pirojpur", "Jhalokati",
    "Kuakata", "Nijhum Dwip", "Payra Port",
    "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla",
    "Mehendiganj", "Muladi", "Wazirpur", "Agailjhara", "Bauphal",
    "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Dumki",
    "Amtali", "Betagi", "Bamna", "Pathorghata", "Taltali",
    "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad",
    "Indurkani", "Zianagor", "Rajapur", "Kathalia", "Nalchity",
    "Charfasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin",
    "Burhanuddin", "Monpura"
  ],
  "Sylhet Division": [
    "Sylhet", "Moulvibazar", "Habiganj", "Sunamganj", "Sreemangal",
    "Jaflong", "Tamabil", "Bichnakandi", "Tanguar Haor", "Lawachara Forest",
    "Ratargul Swamp Forest", "Madhabkunda Waterfall", "Srimangal Tea Garden",
    "Barlekha", "Kamalganj", "Kulaura", "Rajnagar", "Bahubal",
    "Chunarughat", "Nabiganj", "Madhabpur", "Ajmiriganj", "Baniachang",
    "Lakhai", "Shaistaganj", "Bishwambarpur", "Chhatak", "Derai",
    "Dharamapasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah",
    "Tahirpur", "Companiganj", "Gowainghat", "Jointiapur", "Kanaighat",
    "Zakiganj", "Bishwanath", "Balaganj", "Fenchuganj", "Golapganj",
    "Osmaninagar", "Dakshin Surma", "Beani Bazar"
  ],
  "Rangpur Division": [
    "Rangpur", "Dinajpur", "Nilphamari", "Lalmonirhat", "Kurigram",
    "Thakurgaon", "Panchagarh", "Gaibandha", "Burimari", "Hili",
    "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha",
    "Pirganj", "Taraganj", "Birampur", "Birganj", "Biral",
    "Bochaganj", "Chirirbandar", "Fulbari", "Ghoraghat", "Hakimpur",
    "Khansama", "Kaharole", "Parbatipur", "Nawabganj", "Dimla",
    "Domar", "Jaldhaka", "Kishoreganj", "Saidpur", "Aditmari",
    "Hatibandha", "Kaliganj", "Patgram", "Tetulia", "Debiganj",
    "Boda", "Atwari", "Baliadangi", "Haripur", "Pirganj",
    "Ranisankail", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata",
    "Sundarganj", "Bhurungamari", "Char Rajibpur", "Chilmari", "Phulchhari",
    "Nageshwari", "Rajarhat", "Roumari", "Ulipur"
  ],
  "Mymensingh Division": [
    "Mymensingh", "Jamalpur", "Netrokona", "Sherpur",
    "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur",
    "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur",
    "Trishal", "Tara Khanda", "Gafargaon", "Bhaluka", "Bakshiganj",
    "Dewanganj", "Islampur", "Madarganj", "Melandaha", "Sarishabari",
    "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda",
    "Kendua", "Madan", "Mohanganj", "Purbadhala", "Jhenaigati",
    "Nakla", "Nalitabari", "Sreebardi", "Sreebordi"
  ],
  "Hill Tracts & Adventure": [
    "Sajek Valley", "Bandarban", "Rangamati", "Khagrachari",
    "Ruma", "Thanchi", "Alikadam", "Lama", "Remakri",
    "Khagrachhari Town", "Rangamati Town", "Rowangchhari",
    "Kaptai", "Langadu", "Dighinala", "Manikchhari",
    "Belaichhari", "Juraichhari", "Baghaichhari", "Naniarchar",
    "Matiranga", "Panchhari", "Ramgarh"
  ],
  "Beaches & Islands": [
    "Cox's Bazar", "Saint Martin's Island", "Kuakata",
    "Inani Beach", "Himchari", "Parki Beach", "Maheshkhali",
    "Sonadia Island", "Nijhum Dwip", "Teknaf", "Kutubdia",
    "Patenga", "Kolatoli Beach", "Sugandha Beach", "Sea Beach"
  ],
  "Historic & Cultural Sites": [
    "Mahasthangarh", "Paharpur", "Mainamati", "Lalbagh Fort",
    "Sonargaon", "Bagerhat Historic Mosque City", "Ahsan Manzil",
    "Kantaji Temple", "Puthia Rajbari", "Somapura Mahavihara",
    "Kantanagar Temple", "Shait Gumbad Mosque", "Khan Jahan Ali Mazar"
  ],
  "Border Crossings & Ports": [
    "Benapole", "Bhomra", "Mongla", "Payra Port", "Burimari",
    "Tamabil", "Hili", "Teknaf", "Sona Masjid", "Akhaura",
    "Sonahat", "Banglabandha", "Chittagong Port", "Pangaon"
  ],
  "Industrial & Economic Hubs": [
    "Gazipur", "Savar", "Narayanganj", "Tongi", "Ashulia",
    "Narsingdi", "Comilla", "Chattogram", "Mongla", "Ishwardi",
    "Pabna", "Khulna", "Bogura"
  ],
  "Major Transit Points": [
    "Bhairab", "Ashuganj", "Mawa", "Aricha", "Paturia", "Daulatdia",
    "Goalundo", "Chandpur", "Bhairab Bazar", "Akhaura Junction",
    "Laksam Junction", "Joydebpur", "Abdullahpur"
  ],
  "Tea Garden Regions": [
    "Sreemangal", "Srimangal Tea Garden", "Lawachara Forest",
    "Moulvibazar", "Sylhet", "Kamalganj", "Kulaura", "Fatikchhari"
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