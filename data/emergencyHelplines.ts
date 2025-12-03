
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

// National Emergency Helplines (Always visible)
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

// Location-based Emergency Services
export const EMERGENCY_SERVICES: EmergencyService[] = [
    // Gabtoli Area
    {
        id: 'gabtoli_ps',
        name: 'Gabtoli Police Station',
        bnName: 'গাবতলী থানা',
        type: 'police',
        phone: '02-9004481',
        lat: 23.7831,
        lng: 90.3475,
        area: 'Gabtoli'
    },
    {
        id: 'gabtoli_hospital',
        name: 'Gabtoli TB Hospital',
        bnName: 'গাবতলী টিবি হাসপাতাল',
        type: 'hospital',
        phone: '02-9004100',
        lat: 23.7850,
        lng: 90.3490,
        area: 'Gabtoli'
    },
    {
        id: 'gabtoli_fire',
        name: 'Gabtoli Fire Station',
        bnName: 'গাবতলী ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-9004200',
        lat: 23.7820,
        lng: 90.3460,
        area: 'Gabtoli'
    },

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
        id: 'mirpur_hospital',
        name: 'National Institute of Traumatology',
        bnName: 'জাতীয় ট্রমাটোলজি ইনস্টিটিউট',
        type: 'hospital',
        phone: '02-9006707',
        lat: 23.8050,
        lng: 90.3650,
        area: 'Mirpur'
    },
    {
        id: 'mirpur_fire',
        name: 'Mirpur Fire Station',
        bnName: 'মিরপুর ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-9006800',
        lat: 23.8100,
        lng: 90.3700,
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
    {
        id: 'gulshan_fire',
        name: 'Gulshan Fire Station',
        bnName: 'গুলশান ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-9884200',
        lat: 23.7850,
        lng: 90.4150,
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
        id: 'labaid_hospital',
        name: 'Labaid Hospital',
        bnName: 'লাবএইড হাসপাতাল',
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
        id: 'icddrb_hospital',
        name: 'ICDDR,B Hospital',
        bnName: 'আইসিডিডিআরবি হাসপাতাল',
        type: 'hospital',
        phone: '02-9827001',
        lat: 23.7800,
        lng: 90.4020,
        area: 'Mohakhali'
    },

    // Farmgate Area
    {
        id: 'tejgaon_ps',
        name: 'Tejgaon Police Station',
        bnName: 'তেজগাঁও থানা',
        type: 'police',
        phone: '02-9110328',
        lat: 23.7550,
        lng: 90.3900,
        area: 'Farmgate'
    },
    {
        id: 'birdem_hospital',
        name: 'BIRDEM Hospital',
        bnName: 'বারডেম হাসপাতাল',
        type: 'hospital',
        phone: '02-9661551',
        lat: 23.7380,
        lng: 90.3950,
        area: 'Shahbag'
    },
    {
        id: 'farmgate_fire',
        name: 'Farmgate Fire Station',
        bnName: 'ফার্মগেট ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-9110400',
        lat: 23.7560,
        lng: 90.3890,
        area: 'Farmgate'
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
        phone: '02-9661064',
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
    {
        id: 'motijheel_fire',
        name: 'Motijheel Fire Station',
        bnName: 'মতিঝিল ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-9560400',
        lat: 23.7340,
        lng: 90.4180,
        area: 'Motijheel'
    },

    // Uttara Area
    {
        id: 'uttara_ps',
        name: 'Uttara Police Station',
        bnName: 'উত্তরা থানা',
        type: 'police',
        phone: '02-8991555',
        lat: 23.8750,
        lng: 90.3950,
        area: 'Uttara'
    },
    {
        id: 'uttara_hospital',
        name: 'Uttara Adhunik Medical College',
        bnName: 'উত্তরা আধুনিক মেডিকেল কলেজ',
        type: 'hospital',
        phone: '02-8991200',
        lat: 23.8700,
        lng: 90.3900,
        area: 'Uttara'
    },
    {
        id: 'uttara_fire',
        name: 'Uttara Fire Station',
        bnName: 'উত্তরা ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-8991600',
        lat: 23.8760,
        lng: 90.3960,
        area: 'Uttara'
    },

    // Dhanmondi Area
    {
        id: 'dhanmondi_ps',
        name: 'Dhanmondi Police Station',
        bnName: 'ধানমন্ডি থানা',
        type: 'police',
        phone: '02-9661771',
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
    {
        id: 'dhanmondi_fire',
        name: 'Dhanmondi Fire Station',
        bnName: 'ধানমন্ডি ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-9661800',
        lat: 23.7460,
        lng: 90.3760,
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
        id: 'badda_hospital',
        name: 'Popular Medical College',
        bnName: 'পপুলার মেডিকেল কলেজ',
        type: 'hospital',
        phone: '02-8413010',
        lat: 23.7850,
        lng: 90.4300,
        area: 'Badda'
    },

    // Hemayetpur Area
    {
        id: 'hemayetpur_ps',
        name: 'Hemayetpur Police Outpost',
        bnName: 'হেমায়েতপুর পুলিশ ফাঁড়ি',
        type: 'police',
        phone: '02-7791234',
        lat: 23.7950,
        lng: 90.2450,
        area: 'Hemayetpur'
    },
    {
        id: 'hemayetpur_hospital',
        name: 'Hemayetpur Health Complex',
        bnName: 'হেমায়েতপুর স্বাস্থ্য কমপ্লেক্স',
        type: 'hospital',
        phone: '02-7791100',
        lat: 23.7960,
        lng: 90.2460,
        area: 'Hemayetpur'
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
        id: 'savar_hospital',
        name: 'Enam Medical College',
        bnName: 'এনাম মেডিকেল কলেজ',
        type: 'hospital',
        phone: '02-7740711',
        lat: 23.8550,
        lng: 90.2650,
        area: 'Savar'
    },
    {
        id: 'savar_fire',
        name: 'Savar Fire Station',
        bnName: 'সাভার ফায়ার স্টেশন',
        type: 'fire',
        phone: '02-7740500',
        lat: 23.8590,
        lng: 90.2670,
        area: 'Savar'
    }
];
