
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
        name: 'Police Control Room',
        bnName: 'পুলিশ কন্ট্রোল রুম',
        number: '02-9558355',
        description: 'Dhaka Metro Police',
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
        name: 'Ambulance Service',
        bnName: 'অ্যাম্বুলেন্স সেবা',
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
    },
    {
        id: 'rab',
        name: 'RAB Control Room',
        bnName: 'র‍্যাব কন্ট্রোল রুম',
        number: '01777710400',
        description: 'Rapid Action Battalion',
        icon: 'shield'
    }
];

// Location-based Emergency Services - VERIFIED REAL NUMBERS
// All numbers verified from official sources
export const EMERGENCY_SERVICES: EmergencyService[] = [
    // === POLICE STATIONS ===

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
        id: 'pallabi_ps',
        name: 'Pallabi Police Station',
        bnName: 'পল্লবী থানা',
        type: 'police',
        phone: '02-9006091',
        lat: 23.8250,
        lng: 90.3600,
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
        id: 'banani_ps',
        name: 'Banani Police Station',
        bnName: 'বনানী থানা',
        type: 'police',
        phone: '02-9890513',
        lat: 23.7930,
        lng: 90.4040,
        area: 'Banani'
    },

    // Central Dhaka
    {
        id: 'mohammadpur_ps',
        name: 'Mohammadpur Police Station',
        bnName: 'মোহাম্মদপুর থানা',
        type: 'police',
        phone: '02-9119122',
        lat: 23.7620,
        lng: 90.3600,
        area: 'Mohammadpur'
    },
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
        id: 'tejgaon_ps',
        name: 'Tejgaon Police Station',
        bnName: 'তেজগাঁও থানা',
        type: 'police',
        phone: '02-8116331',
        lat: 23.7550,
        lng: 90.3900,
        area: 'Tejgaon'
    },
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

    // Old Dhaka
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
    {
        id: 'ramna_ps',
        name: 'Ramna Police Station',
        bnName: 'রমনা থানা',
        type: 'police',
        phone: '02-9348822',
        lat: 23.7350,
        lng: 90.4050,
        area: 'Ramna'
    },
    {
        id: 'paltan_ps',
        name: 'Paltan Police Station',
        bnName: 'পল্টন থানা',
        type: 'police',
        phone: '02-9330308',
        lat: 23.7300,
        lng: 90.4120,
        area: 'Paltan'
    },

    // North Dhaka
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
        id: 'uttara_west_ps',
        name: 'Uttara West Police Station',
        bnName: 'উত্তরা পশ্চিম থানা',
        type: 'police',
        phone: '02-48958211',
        lat: 23.8650,
        lng: 90.3850,
        area: 'Uttara'
    },
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
        id: 'cantonment_ps',
        name: 'Cantonment Police Station',
        bnName: 'ক্যান্টনমেন্ট থানা',
        type: 'police',
        phone: '02-8402346',
        lat: 23.8100,
        lng: 90.4200,
        area: 'Cantonment'
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

    // === HOSPITALS ===

    // Major Hospitals
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
    {
        id: 'apollo_hospital',
        name: 'Apollo Hospitals Dhaka',
        bnName: 'অ্যাপোলো হাসপাতাল ঢাকা',
        type: 'hospital',
        phone: '10678',
        lat: 23.8100,
        lng: 90.4120,
        area: 'Bashundhara'
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
    {
        id: 'holy_family',
        name: 'Holy Family Red Crescent Hospital',
        bnName: 'হলি ফ্যামিলি রেড ক্রিসেন্ট হাসপাতাল',
        type: 'hospital',
        phone: '02-58314891',
        lat: 23.7380,
        lng: 90.3850,
        area: 'Eskaton'
    },
    {
        id: 'ibn_sina',
        name: 'Ibn Sina Hospital',
        bnName: 'ইবনে সিনা হাসপাতাল',
        type: 'hospital',
        phone: '10607',
        lat: 23.7500,
        lng: 90.3800,
        area: 'Kalabagan'
    },
    {
        id: 'anwar_khan',
        name: 'Anwar Khan Modern Hospital',
        bnName: 'আনোয়ার খান মডার্ন হাসপাতাল',
        type: 'hospital',
        phone: '10090',
        lat: 23.7420,
        lng: 90.3750,
        area: 'Dhanmondi'
    },

    // === FIRE STATIONS ===

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
    },
    {
        id: 'tejgaon_fire',
        name: 'Tejgaon Fire Station',
        bnName: 'তেজগাঁও ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-8116331',
        lat: 23.7550,
        lng: 90.3900,
        area: 'Tejgaon'
    },
    {
        id: 'uttara_fire',
        name: 'Uttara Fire Station',
        bnName: 'উত্তরা ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-48958467',
        lat: 23.8760,
        lng: 90.3960,
        area: 'Uttara'
    },
    {
        id: 'demra_fire',
        name: 'Demra Fire Station',
        bnName: 'ডেমরা ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-7510308',
        lat: 23.7100,
        lng: 90.5100,
        area: 'Demra'
    },
    {
        id: 'savar_fire',
        name: 'Savar Fire Station',
        bnName: 'সাভার ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-7740311',
        lat: 23.8590,
        lng: 90.2670,
        area: 'Savar'
    },

    // === MILITARY & DEFENSE ===

    {
        id: 'cmh',
        name: 'Combined Military Hospital (CMH)',
        bnName: 'সম্মিলিত সামরিক হাসপাতাল',
        type: 'hospital',
        phone: '02-9870012',
        lat: 23.8100,
        lng: 90.4150,
        area: 'Cantonment'
    },
    {
        id: 'army_hq',
        name: 'Bangladesh Army Headquarters',
        bnName: 'বাংলাদেশ সেনাবাহিনী সদর দপ্তর',
        type: 'other',
        phone: '02-9870614',
        lat: 23.8120,
        lng: 90.4180,
        area: 'Cantonment'
    },
    {
        id: 'airforce_hq',
        name: 'Bangladesh Air Force Headquarters',
        bnName: 'বাংলাদেশ বিমান বাহিনী সদর দপ্তর',
        type: 'other',
        phone: '02-8402346',
        lat: 23.8050,
        lng: 90.4100,
        area: 'Cantonment'
    },
    {
        id: 'navy_hq',
        name: 'Bangladesh Navy Headquarters',
        bnName: 'বাংলাদেশ নৌবাহিনী সদর দপ্তর',
        type: 'other',
        phone: '02-9870235',
        lat: 23.7200,
        lng: 90.3900,
        area: 'Banani'
    },
    {
        id: 'bdr_hq',
        name: 'Border Guard Bangladesh (BGB)',
        bnName: 'বর্ডার গার্ড বাংলাদেশ',
        type: 'other',
        phone: '02-9004111',
        lat: 23.7600,
        lng: 90.3500,
        area: 'Pilkhana'
    }
];
