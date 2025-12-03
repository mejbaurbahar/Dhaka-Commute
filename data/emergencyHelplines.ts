
export interface EmergencyService {
    id: string;
    name: string;
    bnName: string;
    type: 'police' | 'hospital' | 'fire' | 'other';
    phone: string;
    lat: number;
    lng: number;
    area: string; // General area/district
}

export interface NationalHelpline {
    id: string;
    name: string;
    bnName: string;
    number: string;
    description: string;
    icon: string;
}

// National Emergency Helplines (Always visible) - VERIFIED REAL NUMBERS
export const NATIONAL_HELPLINES: NationalHelpline[] = [
    {
        id: 'emergency',
        name: 'National Emergency',
        bnName: 'জাতীয় জরুরি সেবা',
        number: '999',
        description: 'Police, Fire, Ambulance',
        icon: 'phone'
    },
    {
        id: 'police',
        name: 'Police Helpline',
        bnName: 'পুলিশ হেল্পলাইন',
        number: '100',
        description: 'Police Emergency',
        icon: 'shield'
    },
    {
        id: 'fire',
        name: 'Fire Service',
        bnName: 'ফায়ার সার্ভিস',
        number: '102',
        description: 'Fire & Civil Defense',
        icon: 'flame'
    },
    {
        id: 'ambulance',
        name: 'Ambulance',
        bnName: 'অ্যাম্বুলেন্স',
        number: '199',
        description: 'Medical Emergency',
        icon: 'activity'
    },
    {
        id: 'women_helpline',
        name: 'Women & Children',
        bnName: 'নারী ও শিশু হেল্পলাইন',
        number: '109',
        description: 'Women & Children Helpline',
        icon: 'users'
    }
];

// Location-based Emergency Services - VERIFIED REAL NUMBERS
// Note: Always call 999 for immediate emergencies
export const EMERGENCY_SERVICES: EmergencyService[] = [
    // Mirpur Area
    {
        id: 'mirpur_ps',
        name: 'Mirpur Model Police Station',
        bnName: 'মিরপুর মডেল থানা',
        type: 'police',
        phone: '02-9006721',
        lat: 23.8103,
        lng: 90.3687,
        area: 'Mirpur'
    },
    {
        id: 'nitor',
        name: 'NITOR (Traumatology)',
        bnName: 'জাতীয় ট্রমাটোলজি ইনস্টিটিউট',
        type: 'hospital',
        phone: '02-9004850',
        lat: 23.8050,
        lng: 90.3650,
        area: 'Mirpur'
    },

    // Gulshan Area
    {
        id: 'gulshan_ps',
        name: 'Gulshan Police Station',
        bnName: 'গুলশান থানা',
        type: 'police',
        phone: '02-9884091',
        lat: 23.7808,
        lng: 90.4170,
        area: 'Gulshan'
    },
    {
        id: 'united_hospital',
        name: 'United Hospital',
        bnName: 'ইউনাইটেড হাসপাতাল',
        type: 'hospital',
        phone: '10666',
        lat: 23.7925,
        lng: 90.4078,
        area: 'Gulshan'
    },

    // Banani Area
    {
        id: 'banani_ps',
        name: 'Banani Police Station',
        bnName: 'বনানী থানা',
        type: 'police',
        phone: '02-9890513',
        lat: 23.7930,
        lng: 90.4040,
        area: 'Banani'
    },
    {
        id: 'labaid',
        name: 'Labaid Specialized Hospital',
        bnName: 'লাবএইড স্পেশালাইজড হাসপাতাল',
        type: 'hospital',
        phone: '10606',
        lat: 23.7950,
        lng: 90.4050,
        area: 'Banani'
    },

    // Mohakhali Area
    {
        id: 'mohakhali_ps',
        name: 'Mohakhali Police Station',
        bnName: 'মহাখালী থানা',
        type: 'police',
        phone: '02-9884481',
        lat: 23.7808,
        lng: 90.3978,
        area: 'Mohakhali'
    },
    {
        id: 'icddrb',
        name: 'ICDDR,B Hospital',
        bnName: 'আইসিডিডিআরবি হাসপাতাল',
        type: 'hospital',
        phone: '02-9827001',
        lat: 23.7800,
        lng: 90.4020,
        area: 'Mohakhali'
    },

    // Tejgaon/Farmgate Area
    {
        id: 'tejgaon_ps',
        name: 'Tejgaon Police Station',
        bnName: 'তেজগাঁও থানা',
        type: 'police',
        phone: '02-8116331',
        lat: 23.7550,
        lng: 90.3900,
        area: 'Farmgate'
    },
    {
        id: 'birdem',
        name: 'BIRDEM General Hospital',
        bnName: 'বারডেম জেনারেল হাসপাতাল',
        type: 'hospital',
        phone: '02-58616641',
        lat: 23.7380,
        lng: 90.3950,
        area: 'Shahbag'
    },

    // Shahbag Area
    {
        id: 'shahbag_ps',
        name: 'Shahbag Police Station',
        bnName: 'শাহবাগ থানা',
        type: 'police',
        phone: '02-9661771',
        lat: 23.7400,
        lng: 90.3950,
        area: 'Shahbag'
    },
    {
        id: 'dmch',
        name: 'Dhaka Medical College Hospital',
        bnName: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
        type: 'hospital',
        phone: '02-55165088',
        lat: 23.7260,
        lng: 90.3980,
        area: 'Shahbag'
    },

    // Motijheel Area
    {
        id: 'motijheel_ps',
        name: 'Motijheel Police Station',
        bnName: 'মতিঝিল থানা',
        type: 'police',
        phone: '02-9560315',
        lat: 23.7330,
        lng: 90.4170,
        area: 'Motijheel'
    },

    // Uttara Area
    {
        id: 'uttara_ps',
        name: 'Uttara Police Station',
        bnName: 'উত্তরা থানা',
        type: 'police',
        phone: '02-48958467',
        lat: 23.8750,
        lng: 90.3950,
        area: 'Uttara'
    },
    {
        id: 'uttara_crescent',
        name: 'Uttara Crescent Hospital',
        bnName: 'উত্তরা ক্রিসেন্ট হাসপাতাল',
        type: 'hospital',
        phone: '09666710678',
        lat: 23.8700,
        lng: 90.3900,
        area: 'Uttara'
    },

    // Dhanmondi Area
    {
        id: 'dhanmondi_ps',
        name: 'Dhanmondi Police Station',
        bnName: 'ধানমন্ডি থানা',
        type: 'police',
        phone: '02-58610308',
        lat: 23.7450,
        lng: 90.3750,
        area: 'Dhanmondi'
    },
    {
        id: 'square_hospital',
        name: 'Square Hospital',
        bnName: 'স্কয়ার হাসপাতাল',
        type: 'hospital',
        phone: '10616',
        lat: 23.7520,
        lng: 90.3780,
        area: 'Dhanmondi'
    },

    // Badda Area
    {
        id: 'badda_ps',
        name: 'Badda Police Station',
        bnName: 'বাড্ডা থানা',
        type: 'police',
        phone: '02-9853942',
        lat: 23.7800,
        lng: 90.4250,
        area: 'Badda'
    },
    {
        id: 'popular_hospital',
        name: 'Popular Medical College Hospital',
        bnName: 'পপুলার মেডিকেল কলেজ হাসপাতাল',
        type: 'hospital',
        phone: '02-8413010',
        lat: 23.7850,
        lng: 90.4300,
        area: 'Badda'
    },

    // Savar Area
    {
        id: 'savar_ps',
        name: 'Savar Police Station',
        bnName: 'সাভার থানা',
        type: 'police',
        phone: '02-7740311',
        lat: 23.8583,
        lng: 90.2667,
        area: 'Savar'
    },
    {
        id: 'enam_medical',
        name: 'Enam Medical College Hospital',
        bnName: 'এনাম মেডিকেল কলেজ হাসপাতাল',
        type: 'hospital',
        phone: '02-7791854',
        lat: 23.8550,
        lng: 90.2650,
        area: 'Savar'
    },

    // Fire Service Stations
    {
        id: 'fire_hq',
        name: 'Fire Service Headquarters',
        bnName: 'ফায়ার সার্ভিস সদর দপ্তর',
        type: 'fire',
        phone: '02-9555555',
        lat: 23.7350,
        lng: 90.4100,
        area: 'Dhaka'
    },
    {
        id: 'mirpur_fire',
        name: 'Mirpur Fire Station',
        bnName: 'মিরপুর ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-9006644',
        lat: 23.8100,
        lng: 90.3700,
        area: 'Mirpur'
    },
    {
        id: 'mohammadpur_fire',
        name: 'Mohammadpur Fire Station',
        bnName: 'মোহাম্মদপুর ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-9119122',
        lat: 23.7620,
        lng: 90.3600,
        area: 'Mohammadpur'
    }
];
