import { BusRoute, Station, MetroStation, MetroLine } from './types';

// Coordinate mapping for major Dhaka locations
export const STATIONS: Record<string, Station> = {
  'gabtoli': { id: 'gabtoli', name: 'Gabtoli', bnName: 'গাবতলী', lat: 23.7831, lng: 90.3475 },
  'technical': { id: 'technical', name: 'Technical', bnName: 'টেকনিক্যাল', lat: 23.7800, lng: 90.3550 },
  'mirpur1': { id: 'mirpur1', name: 'Mirpur 1', bnName: 'মিরপুর ১', lat: 23.7936, lng: 90.3537 },
  'mirpur2': { id: 'mirpur2', name: 'Mirpur 2', bnName: 'মিরপুর ২', lat: 23.8050, lng: 90.3600 },
  'mirpur6': { id: 'mirpur6', name: 'Mirpur 6', bnName: 'মিরপুর ৬', lat: 23.8100, lng: 90.3620 },
  'mirpur7': { id: 'mirpur7', name: 'Mirpur 7', bnName: 'মিরপুর ৭', lat: 23.8130, lng: 90.3630 },
  'mirpur10': { id: 'mirpur10', name: 'Mirpur 10', bnName: 'মিরপুর ১০', lat: 23.8071, lng: 90.3686 },
  'mirpur11': { id: 'mirpur11', name: 'Mirpur 11', bnName: 'মিরপুর ১১', lat: 23.8150, lng: 90.3650 },
  'mirpur12': { id: 'mirpur12', name: 'Mirpur 12', bnName: 'মিরপুর ১২', lat: 23.8200, lng: 90.3650 },
  'mirpur13': { id: 'mirpur13', name: 'Mirpur 13', bnName: 'মিরপুর ১৩', lat: 23.8160, lng: 90.3700 },
  'mirpur14': { id: 'mirpur14', name: 'Mirpur 14', bnName: 'মিরপুর ১৪', lat: 23.8120, lng: 90.3750 },
  'pallabi': { id: 'pallabi', name: 'Pallabi', bnName: 'পল্লবী', lat: 23.8250, lng: 90.3600 },
  'purobi': { id: 'purobi', name: 'Purobi', bnName: 'পূর্বী', lat: 23.8210, lng: 90.3620 },
  'kalshi': { id: 'kalshi', name: 'Kalshi', bnName: 'কালশী', lat: 23.8200, lng: 90.3800 },
  'ecb': { id: 'ecb', name: 'ECB Square', bnName: 'ইসিবি স্কয়ার', lat: 23.8230, lng: 90.3900 },
  'kuril': { id: 'kuril', name: 'Kuril Bishwa Road', bnName: 'কুড়িল বিশ্ব রোড', lat: 23.8231, lng: 90.4100 },
  'kuril_flyover': { id: 'kuril_flyover', name: 'Kuril Flyover', bnName: 'কুড়িল ফ্লাইওভার', lat: 23.8220, lng: 90.4080 },
  'bashundhara': { id: 'bashundhara', name: 'Bashundhara', bnName: 'বসুন্ধরা', lat: 23.8120, lng: 90.4250 },
  'notun_bazar': { id: 'notun_bazar', name: 'Notun Bazar', bnName: 'নতুন বাজার', lat: 23.7950, lng: 90.4250 },
  'badda': { id: 'badda', name: 'Badda', bnName: 'বাড্ডা', lat: 23.7850, lng: 90.4250 },
  'badda_link_road': { id: 'badda_link_road', name: 'Badda Link Road', bnName: 'বাড্ডা লিংক রোড', lat: 23.7830, lng: 90.4200 },
  'uttar_badda': { id: 'uttar_badda', name: 'Uttar Badda', bnName: 'উত্তর বাড্ডা', lat: 23.7880, lng: 90.4250 },
  'madhya_badda': { id: 'madhya_badda', name: 'Madhya Badda', bnName: 'মধ্য বাড্ডা', lat: 23.7820, lng: 90.4250 },
  'merul': { id: 'merul', name: 'Merul Badda', bnName: 'মেরুল বাড্ডা', lat: 23.7700, lng: 90.4200 },
  'rampura': { id: 'rampura', name: 'Rampura Bridge', bnName: 'রামপুরা ব্রিজ', lat: 23.7650, lng: 90.4150 },
  'rampura_bazar': { id: 'rampura_bazar', name: 'Rampura Bazar', bnName: 'রামপুরা বাজার', lat: 23.7620, lng: 90.4180 },
  'banasree': { id: 'banasree', name: 'Banasree', bnName: 'বনশ্রী', lat: 23.7600, lng: 90.4300 },
  'south_banasree': { id: 'south_banasree', name: 'South Banasree', bnName: 'দক্ষিণ বনশ্রী', lat: 23.7550, lng: 90.4350 },
  'demra': { id: 'demra', name: 'Demra Staff Quarter', bnName: 'ডেমরা', lat: 23.7200, lng: 90.4500 },
  'airport': { id: 'airport', name: 'Airport', bnName: 'বিমানবন্দর', lat: 23.8511, lng: 90.4087 },
  'uttara': { id: 'uttara', name: 'Uttara (House Building)', bnName: 'উত্তরা', lat: 23.8700, lng: 90.4000 },
  'abdullahpur': { id: 'abdullahpur', name: 'Abdullahpur', bnName: 'আবদুল্লাহপুর', lat: 23.8800, lng: 90.4000 },
  'mohakhali': { id: 'mohakhali', name: 'Mohakhali', bnName: 'মহাখালী', lat: 23.7778, lng: 90.4050 },
  'farmgate': { id: 'farmgate', name: 'Farmgate', bnName: 'ফার্মগেট', lat: 23.7561, lng: 90.3872 },
  'shahbag': { id: 'shahbag', name: 'Shahbag', bnName: 'শাহবাগ', lat: 23.7400, lng: 90.3950 },
  'gulistan': { id: 'gulistan', name: 'Gulistan', bnName: 'গুলিস্তান', lat: 23.7250, lng: 90.4100 },
  'motijheel': { id: 'motijheel', name: 'Motijheel', bnName: 'মতিঝিল', lat: 23.7330, lng: 90.4170 },
  'sayedabad': { id: 'sayedabad', name: 'Sayedabad', bnName: 'সায়েদাবাদ', lat: 23.7150, lng: 90.4250 },
  'jatrabari': { id: 'jatrabari', name: 'Jatrabari', bnName: 'যাত্রাবাড়ী', lat: 23.7050, lng: 90.4350 },
  'savar': { id: 'savar', name: 'Savar', bnName: 'সাভার', lat: 23.8450, lng: 90.2600 },
  'hemayetpur': { id: 'hemayetpur', name: 'Hemayetpur', bnName: 'হেমায়েতপুর', lat: 23.8000, lng: 90.2800 },
  'kallyanpur': { id: 'kallyanpur', name: 'Kallyanpur', bnName: 'কল্যাণপুর', lat: 23.7800, lng: 90.3650 },
  'shyamoli': { id: 'shyamoli', name: 'Shyamoli', bnName: 'শ্যামলী', lat: 23.7750, lng: 90.3700 },
  'dhanmondi27': { id: 'dhanmondi27', name: 'Dhanmondi 27', bnName: 'ধানমন্ডি ২৭', lat: 23.7550, lng: 90.3750 },
  'dhanmondi32': { id: 'dhanmondi32', name: 'Dhanmondi 32', bnName: 'ধানমন্ডি ৩২', lat: 23.7500, lng: 90.3750 },
  'dhanmondi15': { id: 'dhanmondi15', name: 'Dhanmondi 15', bnName: 'ধানমন্ডি ১৫', lat: 23.7450, lng: 90.3700 },
  'newmarket': { id: 'newmarket', name: 'New Market', bnName: 'নিউ মার্কেট', lat: 23.7330, lng: 90.3850 },
  'azimpur': { id: 'azimpur', name: 'Azimpur', bnName: 'আজিমপুর', lat: 23.7280, lng: 90.3880 },
  'banani': { id: 'banani', name: 'Banani', bnName: 'বনানী', lat: 23.7930, lng: 90.4040 },
  'gulshan1': { id: 'gulshan1', name: 'Gulshan 1', bnName: 'গুলশান ১', lat: 23.7800, lng: 90.4150 },
  'gulshan2': { id: 'gulshan2', name: 'Gulshan 2', bnName: 'গুলশান ২', lat: 23.7950, lng: 90.4150 },
  'shia_masjid': { id: 'shia_masjid', name: 'Shia Masjid', bnName: 'শিয়া মসজিদ', lat: 23.7660, lng: 90.3580 },
  'japan_garden': { id: 'japan_garden', name: 'Japan Garden City', bnName: 'জাপান গার্ডেন সিটি', lat: 23.7680, lng: 90.3570 },
  'ring_road': { id: 'ring_road', name: 'Ring Road', bnName: 'রিং রোড', lat: 23.7700, lng: 90.3560 },
  'adabor': { id: 'adabor', name: 'Adabor', bnName: 'আদাবর', lat: 23.7700, lng: 90.3550 },
  'amin_bazar': { id: 'amin_bazar', name: 'Amin Bazar', bnName: 'আমিন বাজার', lat: 23.7900, lng: 90.3400 },
  'boliarpur': { id: 'boliarpur', name: 'Boliarpur', bnName: 'বলিয়ারপুর', lat: 23.7953, lng: 90.2903 },
  'modhumoti': { id: 'modhumoti', name: 'Modhumoti', bnName: 'মধুমত', lat: 23.7920, lng: 90.3100 },
  'parbat': { id: 'parbat', name: 'Parbat', bnName: 'পর্বত', lat: 23.7850, lng: 90.3420 },
  'mazar_road': { id: 'mazar_road', name: 'Mazar Road', bnName: 'মাজার রোড', lat: 23.7922, lng: 90.3430 },
  'amtola': { id: 'amtola', name: 'Amtola', bnName: 'আমতলা', lat: 23.7850, lng: 90.4020 },
  'post_office_gulshan': { id: 'post_office_gulshan', name: 'Post Office (Gulshan)', bnName: 'পোস্ট অফিস (গুলশান)', lat: 23.7998, lng: 90.3940 },
  'agargaon': { id: 'agargaon', name: 'Agargaon', bnName: 'আগারগাঁও', lat: 23.7780, lng: 90.3800 },
  'fulbaria': { id: 'fulbaria', name: 'Fulbaria', bnName: 'ফুলবাড়িয়া', lat: 23.7220, lng: 90.4080 },
  'paltan': { id: 'paltan', name: 'Paltan', bnName: 'পল্টন', lat: 23.7300, lng: 90.4120 },
  'press_club': { id: 'press_club', name: 'Press Club', bnName: 'প্রেস ক্লাব', lat: 23.7290, lng: 90.4030 },
  'kawran_bazar': { id: 'kawran_bazar', name: 'Kawran Bazar', bnName: 'কাওরান বাজার', lat: 23.7500, lng: 90.3930 },
  'sadarghat': { id: 'sadarghat', name: 'Sadarghat', bnName: 'সদরঘাট', lat: 23.7050, lng: 90.4050 },
  'malibagh': { id: 'malibagh', name: 'Malibagh', bnName: 'মালিবাগ', lat: 23.7500, lng: 90.4150 },
  'malibagh_railgate': { id: 'malibagh_railgate', name: 'Malibagh Railgate', bnName: 'মালিবাগ রেলগেট', lat: 23.7520, lng: 90.4160 },
  'mouchak': { id: 'mouchak', name: 'Mouchak', bnName: 'মৌচাক', lat: 23.7480, lng: 90.4120 },
  'mogbazar': { id: 'mogbazar', name: 'Mogbazar', bnName: 'মগবাজার', lat: 23.7450, lng: 90.4050 },
  'postagola': { id: 'postagola', name: 'Postagola', bnName: 'পোস্তগোলা', lat: 23.6950, lng: 90.4300 },
  'science_lab': { id: 'science_lab', name: 'Science Lab', bnName: 'সায়েন্স ল্যাব', lat: 23.7380, lng: 90.3850 },
  'city_college': { id: 'city_college', name: 'City College', bnName: 'সিটি কলেজ', lat: 23.7400, lng: 90.3820 },
  'khilkhet': { id: 'khilkhet', name: 'Khilkhet', bnName: 'খিলক্ষেত', lat: 23.8350, lng: 90.4150 },
  'kakali': { id: 'kakali', name: 'Kakali', bnName: 'কাকলী', lat: 23.7950, lng: 90.4050 },
  'nabisco': { id: 'nabisco', name: 'Nabisco', bnName: 'নাবিস্কো', lat: 23.7650, lng: 90.4020 },
  'satrasta': { id: 'satrasta', name: 'Satrasta', bnName: 'সাতরাস্তা', lat: 23.7600, lng: 90.3980 },
  'shantinagar': { id: 'shantinagar', name: 'Shantinagar', bnName: 'শান্তিনগর', lat: 23.7410, lng: 90.4150 },
  'tongi': { id: 'tongi', name: 'Tongi', bnName: 'টঙ্গী', lat: 23.8900, lng: 90.4020 },
  'gazipur': { id: 'gazipur', name: 'Gazipur Chourasta', bnName: 'গাজীপুর চৌরাস্তা', lat: 23.9900, lng: 90.3950 },
  'gazipur_bypass': { id: 'gazipur_bypass', name: 'Gazipur Bypass', bnName: 'গাজীপুর বাইপাস', lat: 23.9700, lng: 90.3900 },
  'kachukhet': { id: 'kachukhet', name: 'Kachukhet', bnName: 'কাচুক্ষেত', lat: 23.7980, lng: 90.3900 },
  'bijoy_sarani': { id: 'bijoy_sarani', name: 'Bijoy Sarani', bnName: 'বিজয় সরণি', lat: 23.7630, lng: 90.3880 },
  'signboard': { id: 'signboard', name: 'Sign Board', bnName: 'সাইনবোর্ড', lat: 23.6900, lng: 90.4600 },
  'chittagong_road': { id: 'chittagong_road', name: 'Chittagong Road', bnName: 'চট্টগ্রাম রোড', lat: 23.6800, lng: 90.4700 },
  'shankar': { id: 'shankar', name: 'Shankar', bnName: 'শংকর', lat: 23.7520, lng: 90.3680 },
  'mohammadpur': { id: 'mohammadpur', name: 'Mohammadpur', bnName: 'মোহাম্মদপুর', lat: 23.7620, lng: 90.3600 },
  'jigatola': { id: 'jigatola', name: 'Jigatola', bnName: 'জিগাতলা', lat: 23.7420, lng: 90.3750 },
  'madanpur': { id: 'madanpur', name: 'Madanpur', bnName: 'মদনপুর', lat: 23.6700, lng: 90.5200 },
  'chandra': { id: 'chandra', name: 'Chandra', bnName: 'চন্দ্রা', lat: 24.0300, lng: 90.2300 },
  'kamalapur': { id: 'kamalapur', name: 'Kamalapur Railway Station', bnName: 'কমলাপুর রেলওয়ে স্টেশন', lat: 23.7310, lng: 90.4250 },
  'high_court': { id: 'high_court', name: 'High Court', bnName: 'হাইকোর্ট', lat: 23.7270, lng: 90.4020 },
  'sony_cinema': { id: 'sony_cinema', name: 'Sony Cinema Hall', bnName: 'সনি সিনেমা হল', lat: 23.8030, lng: 90.3620 },
  'ansar_camp': { id: 'ansar_camp', name: 'Ansar Camp', bnName: 'আনসার ক্যাম্প', lat: 23.7900, lng: 90.3520 },
  'kadamtoli': { id: 'kadamtoli', name: 'Kadamtoli', bnName: 'কদমতলী', lat: 23.6900, lng: 90.4400 },
  'dholpur': { id: 'dholpur', name: 'Dholpur', bnName: 'ধোলপুর', lat: 23.7100, lng: 90.4300 },
  'kazipara': { id: 'kazipara', name: 'Kazipara', bnName: 'কাজীপাড়া', lat: 23.7970, lng: 90.3700 },
  'shewrapara': { id: 'shewrapara', name: 'Shewrapara', bnName: 'শেওড়াপাড়া', lat: 23.7900, lng: 90.3750 },
  'idb': { id: 'idb', name: 'IDB Bhaban', bnName: 'আইডিবি ভবন', lat: 23.7750, lng: 90.3820 },
  'wireless': { id: 'wireless', name: 'Wireless Gate', bnName: 'ওয়্যারলেস গেট', lat: 23.7820, lng: 90.4000 },
  'chairman_bari': { id: 'chairman_bari', name: 'Chairman Bari', lat: 23.7880, lng: 90.4020 },
  'mes': { id: 'mes', name: 'MES', lat: 23.8150, lng: 90.4000 },
  'shewra': { id: 'shewra', name: 'Shewra', lat: 23.8200, lng: 90.4050 },
  'jashimuddin': { id: 'jashimuddin', name: 'Jashimuddin', lat: 23.8600, lng: 90.3980 },
  'rajlakshmi': { id: 'rajlakshmi', name: 'Rajlakshmi', lat: 23.8650, lng: 90.3980 },
  'azampur': { id: 'azampur', name: 'Azampur', lat: 23.8680, lng: 90.3980 },
  'shonir_akhra': { id: 'shonir_akhra', name: 'Shonir Akhra', lat: 23.7000, lng: 90.4450 },
  'rayerbag': { id: 'rayerbag', name: 'Rayerbag', lat: 23.6980, lng: 90.4500 },
  'matuail': { id: 'matuail', name: 'Matuail', lat: 23.6950, lng: 90.4550 },
  'maniknagar': { id: 'maniknagar', name: 'Manik Nagar', lat: 23.7200, lng: 90.4300 },
  'tt_para': { id: 'tt_para', name: 'TT Para', lat: 23.7280, lng: 90.4300 },
  'mugdapara': { id: 'mugdapara', name: 'Mugdapara', lat: 23.7300, lng: 90.4320 },
  'bashabo': { id: 'bashabo', name: 'Bashabo', lat: 23.7350, lng: 90.4350 },
  'khilgaon': { id: 'khilgaon', name: 'Khilgaon', lat: 23.7480, lng: 90.4250 },
  'hazipara': { id: 'hazipara', name: 'Hazipara', lat: 23.7600, lng: 90.4180 },
  'bashtola': { id: 'bashtola', name: 'Bashtola', lat: 23.7900, lng: 90.4250 },
  'shahjadpur': { id: 'shahjadpur', name: 'Shahjadpur', lat: 23.7920, lng: 90.4250 },
  'nadda': { id: 'nadda', name: 'Nadda', lat: 23.8050, lng: 90.4250 },
  'jamuna_future_park': { id: 'jamuna_future_park', name: 'Jamuna Future Park', lat: 23.8130, lng: 90.4220 },
  'station_road': { id: 'station_road', name: 'Station Road', lat: 23.9000, lng: 90.4000 },
  'mill_gate': { id: 'mill_gate', name: 'Mill Gate', lat: 23.9100, lng: 90.4000 },
  'board_bazar': { id: 'board_bazar', name: 'Board Bazar', lat: 23.9300, lng: 90.3980 },
  'college_gate': { id: 'college_gate', name: 'College Gate', lat: 23.7680, lng: 90.3720 },
  'asad_gate': { id: 'asad_gate', name: 'Asad Gate', lat: 23.7600, lng: 90.3750 },
  'shukrabad': { id: 'shukrabad', name: 'Shukrabad', lat: 23.7520, lng: 90.3780 },
  'nilkhet': { id: 'nilkhet', name: 'Nilkhet', lat: 23.7320, lng: 90.3870 },
  'bakshi_bazar': { id: 'bakshi_bazar', name: 'Bakshi Bazar', lat: 23.7220, lng: 90.3950 },
  'chankhar_pul': { id: 'chankhar_pul', name: 'Chankhar Pul', lat: 23.7250, lng: 90.4000 },
  'palashi': { id: 'palashi', name: 'Palashi', lat: 23.7280, lng: 90.3900 },
  'eden_college': { id: 'eden_college', name: 'Eden College', lat: 23.7300, lng: 90.3880 },
  'bangla_motor': { id: 'bangla_motor', name: 'Bangla Motor', lat: 23.7450, lng: 90.3950 },
  'matsya_bhaban': { id: 'matsya_bhaban', name: 'Matsya Bhaban', lat: 23.7320, lng: 90.4000 },
  'kakrail': { id: 'kakrail', name: 'Kakrail', lat: 23.7380, lng: 90.4080 },
  'gpo': { id: 'gpo', name: 'GPO', lat: 23.7280, lng: 90.4100 },
  'golap_shah_mazar': { id: 'golap_shah_mazar', name: 'Golap Shah Mazar', lat: 23.7230, lng: 90.4100 },
  'naya_bazar': { id: 'naya_bazar', name: 'Naya Bazar', lat: 23.7150, lng: 90.4050 },
  'babubazar': { id: 'babubazar', name: 'Babubazar', lat: 23.7100, lng: 90.4000 },
  'keraniganj': { id: 'keraniganj', name: 'Keraniganj', lat: 23.6800, lng: 90.3800 },
  'bosila': { id: 'bosila', name: 'Bosila', lat: 23.7500, lng: 90.3450 },
  'diabari': { id: 'diabari', name: 'Diabari', lat: 23.8800, lng: 90.3800 },
  'rupnagar': { id: 'rupnagar', name: 'Rupnagar', lat: 23.8150, lng: 90.3550 },
  'rupnagar_abashik': { id: 'rupnagar_abashik', name: 'Rupnagar Abashik', lat: 23.8150, lng: 90.3550 },
  'beribadh': { id: 'beribadh', name: 'Beribadh', lat: 23.8300, lng: 90.3400 },
  'birulia': { id: 'birulia', name: 'Birulia', lat: 23.8500, lng: 90.3300 },
  'ashulia': { id: 'ashulia', name: 'Ashulia', lat: 23.8900, lng: 90.3000 },
  'zirabo': { id: 'zirabo', name: 'Zirabo', lat: 23.9200, lng: 90.2800 },
  'fantasy_kingdom': { id: 'fantasy_kingdom', name: 'Fantasy Kingdom', lat: 23.9350, lng: 90.2850 },
  'nandan_park': { id: 'nandan_park', name: 'Nandan Park', lat: 24.0000, lng: 90.2500 },
  'baipayl': { id: 'baipayl', name: 'Baipayl', lat: 23.9500, lng: 90.2600 },
  'nobinagar': { id: 'nobinagar', name: 'Nobinagar', lat: 23.9100, lng: 90.2500 },
  'konabari': { id: 'konabari', name: 'Konabari', lat: 24.0200, lng: 90.3200 },
  'dhour': { id: 'dhour', name: 'Dhour', lat: 23.8750, lng: 90.3600 },
  'kamarpara': { id: 'kamarpara', name: 'Kamarpara', lat: 23.8850, lng: 90.3850 },
  'maowa': { id: 'maowa', name: 'Maowa', lat: 23.4700, lng: 90.2600 },
  'vashantek': { id: 'vashantek', name: 'Vashantek', lat: 23.8180, lng: 90.3850 },
  'jahangir_gate': { id: 'jahangir_gate', name: 'Jahangir Gate', lat: 23.7700, lng: 90.3900 },
  'staff_road': { id: 'staff_road', name: 'Staff Road', lat: 23.8000, lng: 90.4020 },
  'sainik_club': { id: 'sainik_club', name: 'Sainik Club', lat: 23.7950, lng: 90.4000 },
  'shishu_mela': { id: 'shishu_mela', name: 'Shishu Mela', lat: 23.7720, lng: 90.3700 },


  'shibu_market': { id: 'shibu_market', name: 'Shibu Market', lat: 23.6500, lng: 90.4800 },
  'chashara': { id: 'chashara', name: 'Chashara', lat: 23.6200, lng: 90.5000 },
  'dhamrai': { id: 'dhamrai', name: 'Dhamrai', lat: 23.9200, lng: 90.2100 },
  'manikganj': { id: 'manikganj', name: 'Manikganj', lat: 23.8600, lng: 90.0000 },
  'chiriyakhana': { id: 'chiriyakhana', name: 'Chiriyakhana', lat: 23.8150, lng: 90.3500 },
  'shib_bari': { id: 'shib_bari', name: 'Shib Bari', lat: 24.0050, lng: 90.4000 },
  'ghatar_char': { id: 'ghatar_char', name: 'Ghatar Char', lat: 23.7450, lng: 90.3400 },
  'paturia': { id: 'paturia', name: 'Paturia', lat: 23.7800, lng: 89.6300 },
  'tajmahal_road': { id: 'tajmahal_road', name: 'Tajmahal Road', lat: 23.7650, lng: 90.3650 },
  'arambagh': { id: 'arambagh', name: 'Arambagh', lat: 23.7300, lng: 90.4200 },
  'jurain': { id: 'jurain', name: 'Jurain', lat: 23.6900, lng: 90.4300 },
  'dayaganj': { id: 'dayaganj', name: 'Dayaganj', lat: 23.7000, lng: 90.4250 },
  'victoria_park': { id: 'victoria_park', name: 'Victoria Park', lat: 23.7080, lng: 90.4100 },
  'gandaria': { id: 'gandaria', name: 'Gandaria', lat: 23.7020, lng: 90.4220 },
  'tikatuli': { id: 'tikatuli', name: 'Tikatuli', lat: 23.7180, lng: 90.4200 },
  'hasnabad': { id: 'hasnabad', name: 'Hasnabad', lat: 23.6700, lng: 90.4200 },
  'nimtola': { id: 'nimtola', name: 'Nimtola', lat: 23.5500, lng: 90.3000 },
  'sreenagar': { id: 'sreenagar', name: 'Sreenagar', lat: 23.5300, lng: 90.2800 },
  'kuchimura': { id: 'kuchimura', name: 'Kuchimura', lat: 23.6000, lng: 90.3500 },
  'rajendrapur': { id: 'rajendrapur', name: 'Rajendrapur', lat: 24.0800, lng: 90.3800 },
  'rajarbag': { id: 'rajarbag', name: 'Rajarbag', lat: 23.7400, lng: 90.4150 },
  'fokirapul': { id: 'fokirapul', name: 'Fokirapul', lat: 23.7350, lng: 90.4150 },
  'gulshan_bridge': { id: 'gulshan_bridge', name: 'Gulshan Bridge', lat: 23.7850, lng: 90.4100 },
  'dhakeshwari': { id: 'dhakeshwari', name: 'Dhakeshwari', lat: 23.7250, lng: 90.3900 },
  'panthapath': { id: 'panthapath', name: 'Panthapath', lat: 23.7500, lng: 90.3900 },
  'bata_signal': { id: 'bata_signal', name: 'Bata Signal', lat: 23.7400, lng: 90.3900 },
  'katabon': { id: 'katabon', name: 'Katabon', lat: 23.7380, lng: 90.3900 },
  'salimullah_road': { id: 'salimullah_road', name: 'Salimullah Road', lat: 23.7630, lng: 90.3620 },
  'jakir_hossen_road': { id: 'jakir_hossen_road', name: 'Jakir Hossen Road', lat: 23.7640, lng: 90.3640 },
  'baitul_mukarram': { id: 'baitul_mukarram', name: 'Baitul Mukarram', lat: 23.7280, lng: 90.4130 },
  'jagannath_university': { id: 'jagannath_university', name: 'Jagannath University', lat: 23.7090, lng: 90.4110 },
  'washpur': { id: 'washpur', name: 'Washpur', lat: 23.7580, lng: 90.3420 },
  'town_hall': { id: 'town_hall', name: 'Town Hall', lat: 23.7650, lng: 90.3620 },
  'konapara': { id: 'konapara', name: 'Konapara', lat: 23.7100, lng: 90.4550 },
  'kajla': { id: 'kajla', name: 'Kajla', lat: 23.7080, lng: 90.4400 },
  'manikdi': { id: 'manikdi', name: 'Manikdi', lat: 23.8250, lng: 90.3900 },
  'pagla': { id: 'pagla', name: 'Pagla', lat: 23.6550, lng: 90.4350 },
  'new_jail': { id: 'new_jail', name: 'New Jail (Keraniganj)', lat: 23.6600, lng: 90.3700 },
  'kamrangirchar': { id: 'kamrangirchar', name: 'Kamrangirchar', lat: 23.7100, lng: 90.3700 },
  'amulia': { id: 'amulia', name: 'Amulia', lat: 23.7300, lng: 90.4700 },
  'sreepur': { id: 'sreepur', name: 'Sreepur', lat: 24.1900, lng: 90.4700 },
  'kapasia': { id: 'kapasia', name: 'Kapasia', lat: 24.1000, lng: 90.5700 },
  'beraid': { id: 'beraid', name: 'Beraid', lat: 23.7900, lng: 90.4600 },
  'meghna_ghat': { id: 'meghna_ghat', name: 'Meghna Ghat', lat: 23.6000, lng: 90.6000 },
  'sonargaon': { id: 'sonargaon', name: 'Sonargaon', lat: 23.6300, lng: 90.6000 },
  'vulta': { id: 'vulta', name: 'Vulta', lat: 23.8000, lng: 90.5800 },
  'rupganj': { id: 'rupganj', name: 'Rupganj', lat: 23.7800, lng: 90.5500 },
  'fatullah': { id: 'fatullah', name: 'Fatullah', lat: 23.6300, lng: 90.4800 },
  'panchabati': { id: 'panchabati', name: 'Panchabati', lat: 23.6300, lng: 90.4600 },
  'dhaleshwar': { id: 'dhaleshwar', name: 'Dhaleshwar', lat: 23.6500, lng: 90.3000 },
  'narayanganj': { id: 'narayanganj', name: 'Narayanganj', lat: 23.6230, lng: 90.5000 },
  'link_road': { id: 'link_road', name: 'Link Road', lat: 23.6400, lng: 90.4900 },
  'taltola': { id: 'taltola', name: 'Taltola', lat: 23.7720, lng: 90.3800 },
  'kalampur': { id: 'kalampur', name: 'Kalampur', lat: 23.9000, lng: 90.1500 },
  'savar_cantonment': { id: 'savar_cantonment', name: 'Savar Cantonment', lat: 23.8800, lng: 90.2600 },
  'shimultola': { id: 'shimultola', name: 'Shimultola', lat: 23.8600, lng: 90.2700 },
  'jamgora': { id: 'jamgora', name: 'Jamgora', lat: 23.9300, lng: 90.2800 },
  'palli_bidyut': { id: 'palli_bidyut', name: 'Palli Bidyut', lat: 23.9000, lng: 90.2600 },
  'mirpur_dohs': { id: 'mirpur_dohs', name: 'Mirpur DOHS', lat: 23.8300, lng: 90.3700 },
  '300_feet': { id: '300_feet', name: '300 Feet', lat: 23.8200, lng: 90.4500 },
  'kanchpur': { id: 'kanchpur', name: 'Kanchpur', lat: 23.6900, lng: 90.5200 },
  'police_plaza': { id: 'police_plaza', name: 'Police Plaza', lat: 23.7700, lng: 90.4100 },
  'duairipara': { id: 'duairipara', name: 'Duairipara', lat: 23.8200, lng: 90.3600 },
  'shial_bari': { id: 'shial_bari', name: 'Shial Bari', lat: 23.8100, lng: 90.3500 },
  'proshika_moor': { id: 'proshika_moor', name: 'Proshika Moor', lat: 23.8100, lng: 90.3600 },
  'zia_uddyan': { id: 'zia_uddyan', name: 'Zia Uddyan', lat: 23.7600, lng: 90.3800 },
  'old_airport': { id: 'old_airport', name: 'Old Airport', lat: 23.7700, lng: 90.3900 },
  'metro_hall': { id: 'metro_hall', name: 'Metro Hall', lat: 23.6300, lng: 90.5000 },
  'jalkuri': { id: 'jalkuri', name: 'Jalkuri', lat: 23.6600, lng: 90.4800 },
  'bangladesh_bank': { id: 'bangladesh_bank', name: 'Bangladesh Bank', lat: 23.7300, lng: 90.4200 },
  'barmi': { id: 'barmi', name: 'Barmi', lat: 24.1500, lng: 90.4500 },
  'joydebpur': { id: 'joydebpur', name: 'Joydebpur', lat: 23.9900, lng: 90.4200 },
  'surabari': { id: 'surabari', name: 'Surabari', lat: 24.0000, lng: 90.3000 },
  'narsinghpur': { id: 'narsinghpur', name: 'Narsinghpur', lat: 23.9500, lng: 90.2800 },
  'jarun': { id: 'jarun', name: 'Jarun', lat: 24.0100, lng: 90.3100 },
  'dhupkhola': { id: 'dhupkhola', name: 'Dhupkhola', lat: 23.7000, lng: 90.4200 },
  'golapbagh': { id: 'golapbagh', name: 'Golapbagh', lat: 23.7200, lng: 90.4300 },
  'janapoth': { id: 'janapoth', name: 'Janapoth Moor', lat: 23.7100, lng: 90.4300 },
  'shonbari': { id: 'shonbari', name: 'Shonbari', lat: 23.9500, lng: 90.3000 },
  'ichapura': { id: 'ichapura', name: 'Ichapura', lat: 23.8500, lng: 90.5000 },
  'kanchan_bridge': { id: 'kanchan_bridge', name: 'Kanchan Bridge', lat: 23.8200, lng: 90.5200 },
  'nila_market': { id: 'nila_market', name: 'Nila Market', lat: 23.8200, lng: 90.4800 },
  'charighat': { id: 'charighat', name: 'Ghatar Char', lat: 23.7500, lng: 90.3400 },
  'tolarbag': { id: 'tolarbag', name: 'Tolarbag', lat: 23.7900, lng: 90.3500 },
  'bangla_college': { id: 'bangla_college', name: 'Bangla College', lat: 23.7800, lng: 90.3500 },
  'darussalam': { id: 'darussalam', name: 'Darussalam', lat: 23.7800, lng: 90.3500 },
  'manik_mia': { id: 'manik_mia', name: 'Manik Mia Avenue', lat: 23.7600, lng: 90.3800 },
  'khamar_bari': { id: 'khamar_bari', name: 'Khamar Bari', lat: 23.7600, lng: 90.3900 },
  'khilgaon_flyover': { id: 'khilgaon_flyover', name: 'Khilgaon Flyover', lat: 23.7500, lng: 90.4200 },
  'sikder_medical': { id: 'sikder_medical', name: 'Sikder Medical', lat: 23.7400, lng: 90.3600 },
  'hazaribag': { id: 'hazaribag', name: 'Hazaribag', bnName: 'হাজারীবাগ', lat: 23.7300, lng: 90.3700 },
  'dholairpar': { id: 'dholairpar', name: 'Dholairpar', bnName: 'ঢোলাইরপাড়', lat: 23.7026, lng: 90.4353 },
  'star_kabab': { id: 'star_kabab', name: 'Star Kabab', bnName: 'স্টার কাবাব', lat: 23.7550, lng: 90.3650 },
  'bot_tola': { id: 'bot_tola', name: 'Bot Tola', bnName: 'বট তলা', lat: 23.7520, lng: 90.3920 },
  'cantonment': { id: 'cantonment', name: 'Cantonment', bnName: 'ক্যান্টনমেন্ট', lat: 23.8200, lng: 90.4000 },
  'adamjee_college': { id: 'adamjee_college', name: 'Adamjee College', bnName: 'আদমজী কলেজ', lat: 23.7947, lng: 90.3933 },
  'workshop': { id: 'workshop', name: 'Workshop', bnName: 'ওয়ার্কশপ', lat: 23.7750, lng: 90.3920 },
  'saudi_colony': { id: 'saudi_colony', name: 'Saudi Colony', bnName: 'সৌদি কলোনি', lat: 23.7720, lng: 90.3930 },
  'kuril_chourasta': { id: 'kuril_chourasta', name: 'Kuril Chourasta', bnName: 'কুড়িল চৌরাস্তা', lat: 23.8220, lng: 90.4200 },
  'ittefaq_moor': { id: 'ittefaq_moor', name: 'Ittefaq Moor', bnName: 'ইত্তেফাক মোড়', lat: 23.7280, lng: 90.4200 },
  'dainik_bangla_moor': { id: 'dainik_bangla_moor', name: 'Dainik Bangla Moor', bnName: 'দৈনিক বাংলা মোড়', lat: 23.7300, lng: 90.4180 },
  'ray_saheb_bazar': { id: 'ray_saheb_bazar', name: 'Ray Saheb Bazar', bnName: 'রায় সাহেব বাজার', lat: 23.7120, lng: 90.4080 },
  'zirani_bazar': { id: 'zirani_bazar', name: 'Zirani Bazar', bnName: 'জিরানী বাজার', lat: 23.9130, lng: 90.3192 },
  'tarabo': { id: 'tarabo', name: 'Tarabo', bnName: 'তারাবো', lat: 23.7285, lng: 90.5173 },
  'khidma_hospital': { id: 'khidma_hospital', name: 'Khidma Hospital', bnName: 'খিদমা হাসপাতাল', lat: 23.7483, lng: 90.4287 },
  'baunia': { id: 'baunia', name: 'Baunia', bnName: 'বাউনিয়া', lat: 23.7988, lng: 90.3847 },
  'tongi_college_gate': { id: 'tongi_college_gate', name: 'Tongi College Gate', bnName: 'টঙ্গী কলেজ গেট', lat: 23.8950, lng: 90.4050 },
  'bhogra': { id: 'bhogra', name: 'Bhogra', bnName: 'ভোগড়া', lat: 23.9850, lng: 90.4100 },
  'kazla': { id: 'kazla', name: 'Kazla', bnName: 'কাজলা', lat: 23.7050, lng: 90.4400 },
  'bashundhara_300_feet': { id: 'bashundhara_300_feet', name: 'Bashundhara 300 Feet', bnName: 'বসুন্ধরা ৩০০ ফিট', lat: 23.8180, lng: 90.4480 },
  'showari_ghat': { id: 'showari_ghat', name: 'Showari Ghat', lat: 23.7100, lng: 90.3900 },

};

export const BUS_DATA: BusRoute[] = [
  {
    id: 'raida',
    name: 'Raida Enterprise',
    bnName: 'রাইদা এন্টারপ্রাইজ',
    routeString: 'Postagola ⇄ Diabari',
    stops: ['postagola', 'dholairpar', 'jurain', 'dayaganj', 'tikatuli', 'maniknagar', 'mugdapara', 'bashabo', 'khilgaon', 'khidma_hospital', 'malibagh', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'diabari'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'victor_classic',
    name: 'Victor Classic',
    bnName: 'ভিক্টর ক্লাসিক',
    routeString: 'Sadarghat ⇄ Abdullahpur',
    stops: ['sadarghat', 'ray_saheb_bazar', 'naya_bazar', 'gulistan', 'paltan', 'kakrail', 'malibagh', 'mogbazar', 'mohakhali', 'banani', 'kuril', 'airport', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  // ... (Other existing buses: akash, turag, onabil, prochesta, salsabil, prabhati_banasree, gazipur_paribahan, ajmeri, skylark, vip27, balaka, shatabdi, bhuiyan, paristhan, projapoti, jabale_noor, rob_rob, akik, meshkat, boishakhi, achia, midline, omama, tetulia, shikhor, swajan, basumati, bihanga, transilva, tanjil, 7_no, 8_no, modhumita, welcome, labbaik, thikana, siam, rajdhani, meghla, trust_ac, himachal, bikalpa, dhaka_paribahan, winner, falgun, agradut, al_makka, ayath, bahon, brtc_ac_motijheel, champion, dewan, dishari, ftcl, grameen, kanak, manjil, moitri, nur_e_makka, pallabi_super, rajanigandha, safety, somoy, suprobhat, trust)

  // NEW BUSES FROM LIST
  {
    id: 'achim',
    name: 'Achim Paribahan',
    bnName: 'আছিম পরিবহন',
    routeString: 'Gabtoli ⇄ Demra',
    stops: ['hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'jamuna_future_park', 'bashundhara', 'nadda', 'notun_bazar', 'bashtola', 'shahjadpur', 'uttar_badda', 'badda', 'madhya_badda', 'merul', 'rampura', 'banasree', 'demra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'active_paribahan',
    name: 'Active Paribahan',
    bnName: 'এক্টিভ পরিবহন',
    routeString: 'Shia Masjid ⇄ Abdullahpur',
    stops: ['shia_masjid', 'adabor', 'shyamoli', 'technical', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewrapara', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:30 PM'
  },
  {
    id: 'agradut', // Overwriting/Updating existing if duplicate ID
    name: 'Agradut',
    bnName: 'অগ্রদূত',
    routeString: 'Savar ⇄ Notun Bazar',
    stops: ['savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'agargaon', 'zia_uddyan', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'bashtola', 'shahjadpur', 'uttar_badda', 'notun_bazar'],
    type: 'Semi-Sitting',
    hours: '5:30 AM - 10:30 PM'
  },
  {
    id: 'airport_bangabandhu',
    name: 'Airport Bangabandhu Avenue',
    bnName: 'এয়ারপোর্ট বঙ্গবন্ধু এভিনিউ',
    routeString: 'Fulbaria ⇄ Abdullahpur',
    stops: ['fulbaria', 'golap_shah_mazar', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'banani', 'kakali', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ajmi',
    name: 'Ajmi',
    bnName: 'আজমী',
    routeString: 'Dhamrai ⇄ Chittagong Road',
    stops: ['dhamrai', 'savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'dhanmondi27', 'dhanmondi32', 'kalabagan', 'city_college', 'newmarket', 'nilkhet', 'azimpur', 'bakshi_bazar', 'gulistan', 'chittagong_road'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'al_madina_plus_one',
    name: 'Al Madina Plus One',
    bnName: 'আল মনিদা প্লাস ওয়ান',
    routeString: 'Nandan Park ⇄ Kamalapur',
    stops: ['nandan_park', 'zirani_bazar', 'zirabo', 'baipayl', 'nobinagar', 'savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel', 'kamalapur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'alif_1',
    name: 'Alif (Mirpur-Nandan)',
    bnName: 'আলিফ',
    routeString: 'Mirpur 14 ⇄ Nandan Park',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'ansar_camp', 'mazar_road', 'konabari', 'rupnagar', 'beribadh', 'birulia', 'ashulia', 'zirabo', 'fantasy_kingdom', 'nandan_park'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'alif_2',
    name: 'Alif (Shia Masjid-Banasree)',
    bnName: 'আলিফ',
    routeString: 'Shia Masjid ⇄ Banasree',
    stops: ['shia_masjid', 'japan_garden', 'adabor', 'shyamoli', 'shishu_mela', 'agargaon', 'zia_uddyan', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'madhya_badda', 'merul', 'rampura', 'banasree'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'alif_3',
    name: 'Alif (Mirpur-Banasree)',
    bnName: 'আলিফ',
    routeString: 'Mirpur 1 ⇄ Banasree',
    stops: ['mirpur1', 'mirpur2', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'madhya_badda', 'merul', 'rampura', 'banasree'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'alif_4',
    name: 'Alif (Japan Garden-Abdullahpur)',
    bnName: 'আলিফ',
    routeString: 'Japan Garden City ⇄ Abdullahpur',
    stops: ['japan_garden', 'ring_road', 'adabor', 'shyamoli', 'shishu_mela', 'agargaon', 'zia_uddyan', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'kakali', 'banani', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ashirbad',
    name: 'Ashirbad Pahibahan',
    bnName: 'আশীর্বাদ পরিবহন',
    routeString: 'Duairipara ⇄ Azimpur',
    stops: ['duairipara', 'rupnagar_abashik', 'shial_bari', 'proshika_moor', 'mirpur2', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'dhanmondi27', 'shukrabad', 'dhanmondi32', 'kalabagan', 'city_college', 'newmarket', 'nilkhet', 'azimpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'atcl',
    name: 'ATCL',
    bnName: 'এটিসিএল',
    routeString: 'Mohammadpur ⇄ Arambagh',
    stops: ['mohammadpur', 'asad_gate', 'shukrabad', 'kalabagan', 'city_college', 'science_lab', 'katabon', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'arambagh'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'baishakhi',
    name: 'Baishakhi Paribahan',
    bnName: 'বৈশাখী পরিবহন',
    routeString: 'Savar ⇄ Notun Bazar',
    stops: ['savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'agargaon', 'zia_uddyan', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'bashtola', 'shahjadpur', 'uttar_badda', 'notun_bazar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bondhu',
    name: 'Bondhu Paribahan',
    bnName: 'বন্ধু পরিবহন',
    routeString: 'Gulistan ⇄ Notun Bazar',
    stops: ['gulistan', 'gpo', 'paltan', 'dhamrai', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'malibagh_railgate', 'khidma_hospital', 'hazipara', 'rampura_bazar', 'rampura', 'merul', 'badda', 'shahjadpur', 'bashtola', 'notun_bazar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'borak',
    name: 'Borak',
    bnName: 'বোরাক',
    routeString: 'Palashi ⇄ Meghna Ghat',
    stops: ['palashi', 'chittagong_road', 'sonargaon', 'chashara', 'meghna_ghat'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brihottor_mirpur',
    name: 'Brihottor Mirpur',
    bnName: 'বৃহত্তর মিরপুর',
    routeString: 'Chiriyakhana ⇄ Chandra',
    stops: ['chiriyakhana', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'nobinagar', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_elevated',
    name: 'BRTC Elevated',
    bnName: 'বিআরটিসি এলিভেটেড',
    routeString: 'Rajlakshmi ⇄ Farmgate',
    stops: ['rajlakshmi', 'airport', 'farmgate', 'bijoy_sarani'],
    type: 'Sitting',
    hours: '7:00 AM - 6:00 PM'
  },
  {
    id: 'cantonment',
    name: 'Cantonment',
    bnName: 'ক্যান্টনমেন্ট',
    routeString: 'Mirpur 14 ⇄ Savar',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'city_link',
    name: 'City Link',
    bnName: 'সিটি লিংক',
    routeString: 'Chittagong Road ⇄ Ghatar Char',
    stops: ['chittagong_road', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'kazla', 'jatrabari', 'janapath_moor', 'sayedabad', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bata_signal', 'science_lab', 'city_college', 'jigatola', 'dhanmondi15', 'star_kabab', 'shankar', 'mohammadpur', 'bosila', 'ghatar_char'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'd_link',
    name: 'D Link',
    bnName: 'ডি লিংক',
    routeString: 'Fulbaria ⇄ Dhamrai',
    stops: ['fulbaria', 'chankhar_pul', 'bakshi_bazar', 'azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'dhamrai'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'd_one',
    name: 'D One Transport',
    bnName: 'ডি ওয়ান',
    routeString: 'Motijheel ⇄ Dhamrai',
    stops: ['motijheel', 'dainik_bangla_moor', 'paltan', 'press_club', 'matsya_bhaban', 'high_court', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'khamar_bari', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'nobinagar', 'dhamrai'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'desh_bangla',
    name: 'Desh Bangla',
    bnName: 'দেশ বাংলা',
    routeString: 'Postagola ⇄ Kamarpara',
    stops: ['postagola', 'dholairpar', 'jatrabari', 'janapath_moor', 'sayedabad', 'mugdapara', 'malibagh', 'rampura_bazar', 'rampura', 'merul', 'uttar_badda', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'abdullahpur', 'kamarpara'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dhakar_chaka_1',
    name: 'Dhakar Chaka (Gulshan)',
    bnName: 'ঢাকার চাকা',
    routeString: 'Police Plaza ⇄ Gulshan 2',
    stops: ['police_plaza', 'gulshan1', 'gulshan2'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dhakar_chaka_2',
    name: 'Dhakar Chaka (Banani)',
    bnName: 'ঢাকার চাকা',
    routeString: 'Banani ⇄ Notun Bazar',
    stops: ['banani', 'gulshan2', 'notun_bazar'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dipon',
    name: 'Dipon',
    bnName: 'দিপন',
    routeString: 'Tajmahal Road ⇄ Arambagh',
    stops: ['tajmahal_road', 'salimullah_road', 'jakir_hossen_road', 'shankar', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'baitul_mukarram', 'gulistan', 'motijheel', 'dainik_bangla_moor', 'ittefaq_moor', 'arambagh'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'etc',
    name: 'ETC',
    bnName: 'ইটিসি',
    routeString: 'Golap Shah Mazar ⇄ Mirpur 12',
    stops: ['golap_shah_mazar', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'pallabi', 'mirpur12'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'everest',
    name: 'Everest Paribahan',
    bnName: 'এভারেস্ট পরিবহন',
    routeString: 'Rupnagar ⇄ Keraniganj',
    stops: ['rupnagar_abashik', 'mirpur2', 'mirpur1', 'ansar_camp', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'gulistan', 'babubazar', 'keraniganj'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'first_ten',
    name: 'First Ten',
    bnName: 'ফার্স্ট টেন',
    routeString: 'Vashantek ⇄ Gabtoli',
    stops: ['vashantek', 'mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'ansar_camp', 'technical', 'gabtoli'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'grameen_suveccha',
    name: 'Grameen Suveccha',
    bnName: 'গ্রামীণ শুভেচ্ছা',
    routeString: 'Fulbaria ⇄ Chandra',
    stops: ['fulbaria', 'chankhar_pul', 'bakshi_bazar', 'azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'gabtoli', 'amin_bazar', 'hemayetpur', 'savar', 'baipayl', 'zirabo', 'nandan_park', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'green_anabil',
    name: 'Green Anabil',
    bnName: 'গ্রীন অনাবিল',
    routeString: 'Chashara ⇄ Gazipur',
    stops: ['chashara', 'shibu_market', 'jalkuri', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'jatrabari', 'sayedabad', 'mugdapara', 'bashabo', 'malibagh_railgate', 'hazipara', 'rampura_bazar', 'rampura', 'merul', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'station_road', 'mill_gate', 'board_bazar', 'gazipur_bypass', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'green_dhaka',
    name: 'Green Dhaka',
    bnName: 'গ্রীন ঢাকা',
    routeString: 'Motijheel ⇄ Abdullahpur',
    stops: ['motijheel', 'gulistan', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'malibagh_railgate', 'hazipara', 'rampura_bazar', 'rampura', 'merul', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'hazi',
    name: 'Hazi Transport',
    bnName: 'হাজি ট্রান্সপোর্ট',
    routeString: 'Mirpur 12 ⇄ Motijheel',
    stops: ['mirpur12', 'pallabi', 'purobi', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'himachal_suveccha',
    name: 'Himachal Suveccha',
    bnName: 'হিমাচল শুভেচ্ছা',
    routeString: 'Metro Hall ⇄ Mirpur 12',
    stops: ['metro_hall', 'chashara', 'shibu_market', 'jalkuri', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'jatrabari', 'janapoth', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'farmgate', 'bijoy_sarani', 'agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'purobi', 'pallabi', 'mirpur12'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'himalay',
    name: 'Himalay',
    bnName: 'হিমালয়',
    routeString: 'Madanpur ⇄ Tongi',
    stops: ['madanpur', 'jatrabari', 'bangladesh_bank', 'mogbazar', 'mohakhali', 'tongi'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'itihash',
    name: 'Itihash',
    bnName: 'ইতিহাস',
    routeString: 'Mirpur 14 ⇄ Chandra',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'ansar_camp', 'technical', 'gabtoli', 'amin_bazar', 'hemayetpur', 'savar', 'nobinagar', 'baipayl', 'zirabo', 'nandan_park', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'janjabil',
    name: 'Janjabil',
    bnName: 'জানযাবিল',
    routeString: 'Gabtoli ⇄ Babubazar',
    stops: ['gabtoli', 'beribadh', 'sikder_medical', 'hazaribag', 'kamrangirchar', 'showari_ghat', 'babubazar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'kironmala',
    name: 'Kironmala Paribahan',
    bnName: 'কিরণমালা',
    routeString: 'Chiriyakhana ⇄ Konabari',
    stops: ['chiriyakhana', 'mirpur1', 'sony_cinema', 'rupnagar', 'birulia', 'ashulia', 'zirabo', 'narsinghpur', 'surabari', 'jarun', 'konabari'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'lal_sabuj',
    name: 'Lal Sabuj',
    bnName: 'লাল সবুজ',
    routeString: 'Nandan Park ⇄ Motijheel',
    stops: ['nandan_park', 'zirabo', 'baipayl', 'nobinagar', 'savar', 'hemayetpur', 'amin_bazar', 'gabtoli', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'lams',
    name: 'Lams Paribahan',
    bnName: 'লামস পরিবহন',
    routeString: 'Mirpur 12 ⇄ Motijheel',
    stops: ['mirpur12', 'pallabi', 'purobi', 'mirpur11', 'mirpur1', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'bijoy_sarani', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'dainik_bangla_moor', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mm_lovely',
    name: 'MM Lovely',
    bnName: 'এম এম লাভলী',
    routeString: 'Savar ⇄ Signboard',
    stops: ['savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'mogbazar', 'mouchak', 'malibagh', 'mugdapara', 'rajarbag', 'khilgaon_flyover', 'khidma_hospital', 'bashabo', 'maniknagar', 'golapbagh', 'sayedabad', 'janapath_moor', 'jatrabari', 'kazla', 'shonir_akhra', 'rayerbag', 'matuail', 'signboard'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mohona',
    name: 'Mohona',
    bnName: 'মোহনা',
    routeString: 'Mirpur 14 ⇄ Fantasy Kingdom',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'mazar_road', 'konabari', 'rupnagar', 'beribadh', 'birulia', 'ashulia', 'zirabo', 'fantasy_kingdom'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'moumita',
    name: 'Moumita',
    bnName: 'মৌমিতা',
    routeString: 'Chashara ⇄ Chandra',
    stops: ['chashara', 'shibu_market', 'jalkuri', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'kazla', 'jatrabari', 'janapath_moor', 'sayedabad', 'gulistan', 'chankhar_pul', 'bakshi_bazar', 'azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'baipayl', 'zirani_bazar', 'zirabo', 'nandan_park', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mtcl_2',
    name: 'MTCL-2',
    bnName: 'এমটিসিএল ২',
    routeString: 'Mohammadpur ⇄ Fantasy Kingdom',
    stops: ['mohammadpur', 'asad_gate', 'dhanmondi27', 'dhanmondi32', 'shukrabad', 'kalabagan', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel', 'dainik_bangla_moor', 'ittefaq_moor', 'arambagh', 'fantasy_kingdom'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'nur_e_makka',
    name: 'Nur E Makka',
    bnName: 'নূর এ মক্কা',
    routeString: 'Chiriyakhana ⇄ Malibagh Railgate',
    stops: ['chiriyakhana', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'jamuna_future_park', 'bashundhara', 'nadda', 'notun_bazar', 'bashtola', 'shahjadpur', 'uttar_badda', 'badda', 'madhya_badda', 'merul', 'rampura', 'rampura_bazar', 'hazipara', 'malibagh_railgate'],
    type: 'Sitting',
    hours: '5:30 AM - 10:30 PM'
  },
  {
    id: 'nabakali',
    name: 'Nabakali',
    bnName: 'নবকালি',
    routeString: 'Chiriyakhana ⇄ Keraniganj',
    stops: ['chiriyakhana', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'dhanmondi27', 'shukrabad', 'dhanmondi32', 'kalabagan', 'science_lab', 'katabon', 'shahbag', 'high_court', 'fulbaria', 'naya_bazar', 'ray_saheb_bazar', 'babubazar', 'keraniganj'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'new_vision',
    name: 'New Vision',
    bnName: 'নিউ ভিশন',
    routeString: 'Chiriyakhana ⇄ Motijheel',
    stops: ['chiriyakhana', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'dainik_bangla_moor', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'nilachol',
    name: 'Nilachol',
    bnName: 'নিলাচল',
    routeString: 'Chittagong Road ⇄ Paturia',
    stops: ['chittagong_road', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'kazla', 'jatrabari', 'janapath_moor', 'sayedabad', 'gulistan', 'chankhar_pul', 'bakshi_bazar', 'azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'nobinagar', 'manikganj', 'paturia'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'nishorgo',
    name: 'Nishorgo',
    bnName: 'নিসর্গ',
    routeString: 'Mirpur 14 ⇄ Azimpur',
    stops: ['mirpur14', 'mirpur10', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'asad_gate', 'shyamoli', 'mohammadpur', 'shankar', 'dhanmondi15', 'jigatola', 'science_lab', 'newmarket', 'nilkhet', 'eden_college', 'azimpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'omama',
    name: 'Omama International',
    bnName: 'ওমামা ইন্টারন্যাশনাল',
    routeString: 'Motijheel ⇄ Airport',
    stops: ['motijheel', 'dainik_bangla_moor', 'paltan', 'press_club', 'matsya_bhaban', 'high_court', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'jahangir_gate', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'banani', 'kakali', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'one_transport',
    name: 'One Transport',
    bnName: 'ওয়ান ট্রান্সপোর্ট',
    routeString: 'Nandan Park ⇄ Motijheel',
    stops: ['nandan_park', 'zirani_bazar', 'zirabo', 'baipayl', 'nobinagar', 'savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'pallabi_local',
    name: 'Pallabi Local Service',
    bnName: 'পল্লবী লোকাল সার্ভিস',
    routeString: 'Asad Gate ⇄ Mirpur 12',
    stops: ['asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'technical', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur6', 'mirpur11', 'mirpur12'],
    type: 'Semi-Sitting',
    hours: '5:30 AM - 10:30 PM'
  },
  {
    id: 'power_paribahan',
    name: 'Power Paribahan',
    bnName: 'পাওয়ার পরিবহন',
    routeString: 'Mirpur 14 ⇄ Konabari',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'mazar_road', 'konabari', 'rupnagar', 'beribadh', 'birulia', 'ashulia', 'zirabo', 'narsinghpur', 'surabari', 'jarun', 'konabari'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'prattay',
    name: 'Prattay',
    bnName: 'প্রত্যয়',
    routeString: 'Gabtoli ⇄ Babubazar',
    stops: ['gabtoli', 'mazar_road', 'beribadh', 'sikder_medical', 'hazaribag', 'kamrangirchar', 'showari_ghat', 'babubazar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'purbachol',
    name: 'Purbachol Logistics',
    bnName: 'পূর্বাচল লজিস্টিকস',
    routeString: 'Mirpur 14 ⇄ Chandra',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'baipayl', 'zirani_bazar', 'zirabo', 'nandan_park', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'raja_city',
    name: 'Raja City',
    bnName: 'রাজা সিটি',
    routeString: 'Postagola ⇄ Ghatar Char',
    stops: ['postagola', 'dholairpar', 'jurain', 'dayaganj', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'shahbag', 'bata_signal', 'science_lab', 'city_college', 'jigatola', 'dhanmondi15', 'star_kabab', 'shankar', 'mohammadpur', 'bosila', 'ghatar_char'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ramjan',
    name: 'Ramjan',
    bnName: 'রমজান',
    routeString: 'Gabtoli ⇄ Demra',
    stops: ['gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'mohammadpur', 'shankar', 'star_kabab', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'malibagh_railgate', 'khidma_hospital', 'hazipara', 'rampura_bazar', 'rampura', 'banasree', 'demra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'rois',
    name: 'Rois',
    bnName: 'রাইস',
    routeString: 'Sony Cinema ⇄ Banasree',
    stops: ['sony_cinema', 'mirpur2', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'madhya_badda', 'merul', 'rampura', 'banasree'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'rongdhonu',
    name: 'Rongdhonu Express',
    bnName: 'রংধনু এক্সপ্রেস',
    routeString: 'Adabor ⇄ Postagola',
    stops: ['adabor', 'mohammadpur', 'shia_masjid', 'shyamoli', 'college_gate', 'asad_gate', 'kalabagan', 'science_lab', 'katabon', 'bata_signal', 'shahbag', 'kakrail', 'fokirapul', 'motijheel', 'dayaganj', 'jurain', 'dholairpar', 'postagola'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'runway',
    name: 'Runway Express',
    bnName: 'রানওয়ে এক্সপ্রেস',
    routeString: 'Keraniganj ⇄ ECB Square',
    stops: ['keraniganj', 'kadamtali', 'babubazar', 'naya_bazar', 'ray_saheb_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'mirpur12', 'ecb'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'rupa',
    name: 'Rupa Paribahan',
    bnName: 'রুপা পরিবহন',
    routeString: 'Gabtoli ⇄ Mirpur 14',
    stops: ['gabtoli', 'mazar_road', 'technical', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur14'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'rupkotha',
    name: 'Rupkotha',
    bnName: 'রুপকথা',
    routeString: 'Gabtoli ⇄ Abdullahpur',
    stops: ['gabtoli', 'mazar_road', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'sakalpa',
    name: 'Sakalpa Transport',
    bnName: 'স্বকল্প ট্রান্সপোর্ট',
    routeString: 'Chiriyakhana ⇄ Kamalapur',
    stops: ['chiriyakhana', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'farmgate', 'bangla_motor', 'mogbazar', 'malibagh', 'kamalapur'],
    type: 'Semi-Sitting',
    hours: '5:30 AM - 10:30 PM'
  },
  {
    id: 'shadhin',
    name: 'Shadhin',
    bnName: 'স্বাধীন',
    routeString: 'Bosila ⇄ Demra',
    stops: ['bosila', 'mohammadpur', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bangla_motor', 'mogbazar', 'mouchak', 'malibagh_railgate', 'hazipara', 'rampura_bazar', 'rampura', 'banasree', 'demra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'shadhin_express',
    name: 'Shadhin Express',
    bnName: 'স্বাধীন এক্সপ্রেস',
    routeString: 'Mirpur 12 ⇄ Maowa',
    stops: ['mirpur12', 'pallabi', 'purobi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'gpo', 'golap_shah_mazar', 'naya_bazar', 'babubazar', 'keraniganj', 'kadamtali', 'rajendrapur', 'maowa'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'shahria',
    name: 'Shahria Enterprise',
    bnName: 'শাহরিয়া এন্টারপ্রাইজ',
    routeString: 'Gabtoli ⇄ Postagola',
    stops: ['gabtoli', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'dhanmondi27', 'dhanmondi32', 'shukrabad', 'kalabagan', 'city_college', 'science_lab', 'katabon', 'shahbag', 'matsya_bhaban', 'kakrail', 'arambagh', 'motijheel', 'ittefaq_moor', 'tikatuli', 'dayaganj', 'gandaria', 'jurain', 'postagola'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'siam_transport',
    name: 'Siam Transport',
    bnName: 'সিয়াম ট্রান্সপোর্ট',
    routeString: 'Banasree ⇄ Nobinagar',
    stops: ['banasree', 'rampura', 'merul', 'badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'kamarpara', 'dhour', 'beribadh', 'ashulia', 'zirabo', 'fantasy_kingdom', 'jamgora', 'shimultola', 'baipayl', 'palli_bidyut', 'savar_cantonment', 'nobinagar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'skyline',
    name: 'Skyline',
    bnName: 'স্কাই লাইন',
    routeString: 'Sadarghat ⇄ Gazipur',
    stops: ['sadarghat', 'ray_saheb_bazar', 'naya_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'mogbazar', 'satrasta', 'nabisco', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'banani', 'kakali', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'tongi_college_gate', 'station_road', 'mill_gate', 'board_bazar', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'somota',
    name: 'Somota Paribahan',
    bnName: 'সমতা পরিবহন',
    routeString: 'Chittagong Road ⇄ Abdullahpur',
    stops: ['chittagong_road', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'kazla', 'jatrabari', 'janapath_moor', 'sayedabad', 'gulistan', 'chankhar_pul', 'bakshi_bazar', 'dhakeshwari', 'azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'ansar_camp', 'mirpur1', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'somoy_niyantran',
    name: 'Somoy Niyantran',
    bnName: 'সময় নিয়ন্ত্রণ',
    routeString: 'Mirpur 12 ⇄ Keraniganj',
    stops: ['mirpur12', 'pallabi', 'purobi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'bijoy_sarani', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'golap_shah_mazar', 'naya_bazar', 'ray_saheb_bazar', 'babubazar', 'keraniganj'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'super',
    name: 'Super',
    bnName: 'সুপার',
    routeString: 'Gulistan ⇄ Nobinagar',
    stops: ['gulistan', 'shahbag', 'farmgate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'nobinagar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'suvojatri',
    name: 'Suvojatri',
    bnName: 'শুভযাত্রী',
    routeString: 'Fulbaria ⇄ Manikganj',
    stops: ['fulbaria', 'golap_shah_mazar', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bata_signal', 'science_lab', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'manikganj'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'talukdar',
    name: 'Talukdar',
    bnName: 'তালুকদার',
    routeString: 'Chiriyakhana ⇄ Chittagong Road',
    stops: ['chiriyakhana', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'mogbazar', 'mouchak', 'malibagh', 'mugdapara', 'rajarbag', 'khilgaon_flyover', 'khidma_hospital', 'bashabo', 'maniknagar', 'golapbagh', 'sayedabad', 'janapath_moor', 'jatrabari', 'kazla', 'shonir_akhra', 'rayerbag', 'matuail', 'signboard', 'chittagong_road'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'taranga_plus',
    name: 'Taranga Plus',
    bnName: 'তরঙ্গ প্লাস',
    routeString: 'Mohammadpur ⇄ South Banasree',
    stops: ['mohammadpur', 'shankar', 'star_kabab', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'malibagh_railgate', 'khidma_hospital', 'hazipara', 'rampura_bazar', 'rampura', 'banasree', 'south_banasree'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'thikana_express',
    name: 'Thikana Express',
    bnName: 'ঠিকানা এক্সপ্রেস',
    routeString: 'Shonbari ⇄ Chandra',
    stops: ['shonbari', 'sreenagar', 'nimtola', 'kuchimura', 'rajendrapur', 'hasnabad', 'postagola', 'dholairpar', 'jurain', 'jatrabari', 'janapath_moor', 'sayedabad', 'gulistan', 'chankhar_pul', 'bakshi_bazar', 'azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'baipayl', 'zirani_bazar', 'zirabo', 'nandan_park', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'titas',
    name: 'Titas',
    bnName: 'তিতাস',
    routeString: 'Chiriyakhana ⇄ Chandra',
    stops: ['chiriyakhana', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'nobinagar', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: '13_no',
    name: '13 No.',
    bnName: '১৩নং',
    routeString: 'Mohammadpur ⇄ Azimpur',
    stops: ['mohammadpur', 'shankar', 'star_kabab', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'newmarket', 'nilkhet', 'azimpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: '4_no_alike',
    name: '4 No. Alike',
    bnName: '৪নং',
    routeString: 'Balughat ⇄ Motijheel',
    stops: ['mirpur14', 'kachukhet', 'jahangir_gate', 'bijoy_sarani', 'farmgate', 'bangla_motor', 'shahbag', 'paltan', 'gulistan', 'motijheel'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: '6_no',
    name: '6 No.',
    bnName: '৬নং',
    routeString: 'Kamalapur ⇄ Notun Bazar',
    stops: ['kamalapur', 'motijheel', 'gulistan', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'mogbazar', 'kawran_bazar', 'farmgate', 'jahangir_gate', 'bijoy_sarani', 'mohakhali', 'gulshan1', 'gulshan2', 'notun_bazar'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: '6_no_motijheel',
    name: '6 No. Motijheel Banani',
    bnName: '৬নং মতিঝিল বনানী',
    routeString: 'Kamalapur ⇄ Notun Bazar',
    stops: ['kamalapur', 'motijheel', 'gulistan', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'mogbazar', 'kawran_bazar', 'farmgate', 'jahangir_gate', 'bijoy_sarani', 'mohakhali', 'gulshan1', 'gulshan2', 'notun_bazar'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: '9_no',
    name: '9 No.',
    bnName: '৯নং',
    routeString: 'College Gate ⇄ Mirpur 12',
    stops: ['college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'bangla_college', 'tolarbag', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'proshika_moor', 'pallabi', 'buet_market', 'mirpur12'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'anabil_super',
    name: 'Anabil Super',
    bnName: 'অনাবিল সুপার',
    routeString: 'Sign Board ⇄ Gazipur',
    stops: ['signboard', 'shonir_akhra', 'jatrabari', 'sayedabad', 'mugdapara', 'bashabo', 'khilgaon', 'malibagh_railgate', 'hazipara', 'rampura_bazar', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'station_road', 'mill_gate', 'board_bazar', 'gazipur_bypass', 'gazipur'],
    type: 'Sitting',
    hours: '6:00 AM - 12:00 PM'
  },
  {
    id: 'arnob',
    name: 'Arnob',
    bnName: 'অরনব',
    routeString: 'Hemayetpur ⇄ Demra',
    stops: ['hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'agargaon', 'zia_uddyan', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'madhya_badda', 'merul', 'rampura', 'banasree', 'demra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ashulia_classic',
    name: 'Ashulia Classic',
    bnName: 'আশুলিয়া ক্লাসিক',
    routeString: 'Nobinagar ⇄ Satrasta',
    stops: ['nobinagar', 'baipayl', 'jamgora', 'fantasy_kingdom', 'zirabo', 'ashulia', 'kamarpara', 'abdullahpur', 'uttara', 'azampur', 'rajlakshmi', 'jashimuddin', 'airport', 'khilkhet', 'kuril', 'kuril_chourasta', 'shewra', 'mes', 'kakali', 'banani', 'chairman_bari', 'amtola', 'mohakhali', 'nabisco', 'satrasta'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'asmani',
    name: 'Asmani',
    bnName: 'আসমানী',
    routeString: 'Dhour ⇄ Madanpur',
    stops: ['dhour', 'abdullahpur', 'uttara', 'azampur', 'rajlakshmi', 'jashimuddin', 'airport', 'khilkhet', 'kuril', 'kuril_chourasta', 'jamuna_future_park', 'bashundhara', 'bashundhara_300_feet', 'nadda', 'notun_bazar', 'bashtola', 'shahjadpur', 'uttar_badda', 'badda', 'madhya_badda', 'merul', 'rampura', 'banasree', 'demra', 'tarabo', 'madanpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bashumoti',
    name: 'Bashumoti',
    bnName: 'বসুমতি',
    routeString: 'Gazipur ⇄ Gabtoli',
    stops: ['gazipur', 'board_bazar', 'mill_gate', 'station_road', 'tongi', 'tongi_college_gate', 'abdullahpur', 'airport', 'khilkhet', 'kuril', 'kuril_chourasta', 'kalshi', 'pallabi', 'mirpur11', 'mirpur10', 'mirpur2', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'gabtoli'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'basumati_transport',
    name: 'Basumati Transport',
    bnName: 'বাসুমতি ট্রান্সপোর্ট',
    routeString: 'Gabtoli ⇄ Gazipur',
    stops: ['gabtoli', 'mazar_road', 'technical', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'tongi_college_gate', 'station_road', 'mill_gate', 'board_bazar', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'best_satabdi',
    name: 'Best Satabdi AC',
    bnName: 'বেষ্ট শতাব্দী এসি',
    routeString: 'Azimpur ⇄ Diabari',
    stops: ['azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'khamar_bari', 'farmgate', 'jahangir_gate', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'banani', 'kakali', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'diabari'],
    type: 'AC',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'best_transport',
    name: 'Best Transport',
    bnName: 'বেষ্ট ট্রান্সপোর্ট',
    routeString: 'Mirpur 10 ⇄ Jatrabari',
    stops: ['mirpur10', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel', 'dainik_bangla_moor', 'ittefaq_moor', 'sayedabad', 'janapath_moor', 'jatrabari'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bikash',
    name: 'Bikash',
    bnName: 'বিকাশ',
    routeString: 'Azimpur ⇄ Kamarpara',
    stops: ['azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi27', 'dhanmondi32', 'khamar_bari', 'farmgate', 'jahangir_gate', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'banani', 'kakali', 'staff_road', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'kamarpara'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bikash_paribahan',
    name: 'Bikash Paribahan',
    bnName: 'বিকাশ পরিবহন',
    routeString: 'Sign Board ⇄ Dhour',
    stops: ['signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'kazla', 'jatrabari', 'janapath_moor', 'sayedabad', 'gulistan', 'chankhar_pul', 'bakshi_bazar', 'azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'khamar_bari', 'farmgate', 'jahangir_gate', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'banani', 'kakali', 'staff_road', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'kamarpara', 'dhour'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'deepan',
    name: 'Deepan',
    bnName: 'দিপান',
    routeString: 'Tajmahal Road ⇄ Arambagh',
    stops: ['tajmahal_road', 'shankar', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gulistan', 'motijheel', 'arambagh'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dip_paribahan',
    name: 'Dip Paribahan',
    bnName: 'দ্বীপ পরিবহন',
    routeString: 'Azimpur ⇄ Kuril',
    stops: ['azimpur', 'city_college', 'kalabagan', 'panthapath', 'kawran_bazar', 'satrasta', 'nabisco', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'notun_bazar', 'bashundhara', 'kuril'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dhaka_metro',
    name: 'Dhaka Metro Service',
    bnName: 'ঢাকা মেট্রো সার্ভিস',
    routeString: 'Mirpur 1 ⇄ Azimpur',
    stops: ['mirpur1', 'ansar_camp', 'technical', 'mirpur10', 'mirpur14', 'kallyanpur', 'shyamoli', 'asad_gate', 'dhanmondi32', 'shukrabad', 'kalabagan', 'science_lab', 'newmarket', 'nilkhet', 'azimpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dhaka_paribahan',
    name: 'Dhaka Paribahan',
    bnName: 'ঢাকা পরিবহন',
    routeString: 'Gulistan ⇄ Shib Bari',
    stops: ['gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'farmgate', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'kakali', 'banani', 'airport', 'uttara', 'gazipur', 'shib_bari'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'elite',
    name: 'Elite',
    bnName: 'এলিট',
    routeString: 'Agargaon ⇄ Abdullahpur',
    stops: ['agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'purobi', 'pallabi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'etc_transport',
    name: 'ETC Transport',
    bnName: 'ইটিসি ট্রান্সপোর্ট',
    routeString: 'Golap Shah Mazar ⇄ Mirpur 12',
    stops: ['golap_shah_mazar', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'khamar_bari', 'agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'purobi', 'pallabi', 'mirpur12'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ftcl_2',
    name: 'FTCL (Mohammadpur-Chittagong Road)',
    bnName: 'এফটিসিএল',
    routeString: 'Mohammadpur ⇄ Chittagong Road',
    stops: ['mohammadpur', 'shankar', 'star_kabab', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'sayedabad', 'janapath_moor', 'jatrabari', 'kazla', 'shonir_akhra', 'rayerbag', 'matuail', 'signboard', 'chittagong_road'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ftcl_3',
    name: 'FTCL (Mohammadpur-Arambagh)',
    bnName: 'এফটিসিএল',
    routeString: 'Mohammadpur ⇄ Arambagh',
    stops: ['mohammadpur', 'shankar', 'star_kabab', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel', 'arambagh'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'gulshan_chaka',
    name: 'Gulshan Chaka',
    bnName: 'গুলশান চাকা',
    routeString: 'Banani ⇄ Notun Bazar',
    stops: ['banani', 'gulshan2', 'notun_bazar'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'himachal',
    name: 'Himachal',
    bnName: 'হিমাচল',
    routeString: 'Mirpur Sony ⇄ Khidma Hospital',
    stops: ['sony_cinema', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'merul', 'rampura', 'rampura_bazar', 'hazipara', 'malibagh_railgate', 'khilgaon', 'khidma_hospital'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'jm_super',
    name: 'J M Super Paribahan',
    bnName: 'জে এম সুপার পরিবহন',
    routeString: 'Jatrabari ⇄ Tongi',
    stops: ['jatrabari', 'janapath_moor', 'sayedabad', 'mugdapara', 'bashabo', 'khilgaon', 'khidma_hospital', 'malibagh_railgate', 'hazipara', 'rampura_bazar', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'tongi_college_gate'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'jabale_noor_1',
    name: 'Jabale Noor (Agargaon-Abdullahpur)',
    bnName: 'জাবালে নুর পরিবহন',
    routeString: 'Agargaon ⇄ Abdullahpur',
    stops: ['agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'purobi', 'pallabi', 'kalshi', 'kuril', 'airport', 'jashimuddin', 'rajlakshmi', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'jabale_noor_2',
    name: 'Jabale Noor (Gabtoli-Notun Bazar)',
    bnName: 'জাবালে নুর পরিবহন',
    routeString: 'Gabtoli ⇄ Notun Bazar',
    stops: ['gabtoli', 'mirpur1', 'mirpur10', 'kalshi', 'kuril_flyover', 'notun_bazar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'kamal_plus',
    name: 'Kamal Plus Paribahan',
    bnName: 'কামাল প্লাস পরিবহন',
    routeString: 'Chittagong Road ⇄ Ghatar Char',
    stops: ['chittagong_road', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'jatrabari', 'sayedabad', 'gulistan', 'chankhar_pul', 'bakshi_bazar', 'azimpur', 'nilkhet', 'newmarket', 'science_lab', 'city_college', 'jigatola', 'dhanmondi15', 'star_kabab', 'shankar', 'mohammadpur', 'ghatar_char'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'khajababa',
    name: 'Khajababa',
    bnName: 'খাজা বাবা',
    routeString: 'Jatrabari ⇄ Mirpur 12',
    stops: ['jatrabari', 'sayedabad', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'farmgate', 'khamar_bari', 'agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'purobi', 'pallabi', 'mirpur12'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'malancha',
    name: 'Malancha',
    bnName: 'মালঞ্চ',
    routeString: 'Mohammadpur ⇄ Dhupkhola',
    stops: ['mohammadpur', 'shankar', 'star_kabab', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'dayaganj', 'dhupkhola'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'manjil_express',
    name: 'Manjil Express',
    bnName: 'মাঞ্জিল এক্সপ্রেস',
    routeString: 'Chittagong Road ⇄ Abdullahpur',
    stops: ['chittagong_road', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'jatrabari', 'sayedabad', 'gulistan', 'gpo', 'paltan', 'kakrail', 'malibagh', 'mouchak', 'mogbazar', 'satrasta', 'nabisco', 'mohakhali', 'chairman_bari', 'banani', 'kakali', 'staff_road', 'mes', 'shewra', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '5:30 AM - 10:30 PM'
  },
  {
    id: 'meghla_transport',
    name: 'Meghla Transport',
    bnName: 'মেঘলা ট্রান্সপোর্ট',
    routeString: 'Kalabagan ⇄ Vulta',
    stops: ['kalabagan', 'science_lab', 'katabon', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'sayedabad', 'jatrabari', 'shonir_akhra', 'signboard', 'kanchpur', 'vulta'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mirpur_link',
    name: 'Mirpur Link',
    bnName: 'মিরপুর লিংক',
    routeString: 'ECB Square ⇄ Azimpur',
    stops: ['ecb', 'purobi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'khamar_bari', 'dhanmondi27', 'dhanmondi32', 'city_college', 'newmarket', 'nilkhet', 'azimpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mirpur_mission',
    name: 'Mirpur Mission',
    bnName: 'মিরপুর মিশন',
    routeString: 'Chiriyakhana ⇄ Motijheel',
    stops: ['chiriyakhana', 'mirpur1', 'khamar_bari', 'farmgate', 'press_club', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mirpur_transport',
    name: 'Mirpur Transport Service',
    bnName: 'মিরপুর ট্রান্সপোর্ট সার্ভিস',
    routeString: 'Gulistan ⇄ Mirpur 12',
    stops: ['gulistan', 'golap_shah_mazar', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'farmgate', 'khamar_bari', 'agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'purobi', 'pallabi', 'mirpur12'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mirpur_united',
    name: 'Mirpur United Service',
    bnName: 'মিরপুর ইউনাইটেড সার্ভিস',
    routeString: 'Sadarghat ⇄ Mirpur 12',
    stops: ['sadarghat', 'ray_saheb_bazar', 'naya_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'farmgate', 'khamar_bari', 'agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'purobi', 'pallabi', 'mirpur12'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'provati_banasree',
    name: 'Provati Banasree',
    bnName: 'প্রভাতী বনশ্রী',
    routeString: 'Fulbaria ⇄ Baromi',
    stops: ['fulbaria', 'golap_shah_mazar', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mogbazar', 'satrasta', 'nabisco', 'mohakhali', 'amtola', 'chairman_bari', 'banani', 'kakali', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'tongi_college_gate', 'station_road', 'mill_gate', 'board_bazar', 'gazipur', 'joydebpur', 'sreepur', 'barmi'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'rajanigandha',
    name: 'Rajanigandha',
    bnName: 'রজনীগন্ধা',
    routeString: 'Chittagong Road ⇄ Mohammadpur',
    stops: ['chittagong_road', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'jatrabari', 'sayedabad', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'shahbag', 'bata_signal', 'science_lab', 'jigatola', 'dhanmondi15', 'star_kabab', 'shankar', 'mohammadpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'rajdhani_super',
    name: 'Rajdhani Super',
    bnName: 'রাজধানী বাস',
    routeString: 'Hemayetpur ⇄ Demra',
    stops: ['hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'jamuna_future_park', 'bashundhara', 'nadda', 'notun_bazar', 'bashtola', 'shahjadpur', 'uttar_badda', 'badda', 'madhya_badda', 'merul', 'rampura', 'banasree', 'demra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'savar_paribahan',
    name: 'Savar Paribahan',
    bnName: 'সাভার পরিবহন',
    routeString: 'Sadarghat ⇄ Nandan Park',
    stops: ['sadarghat', 'ray_saheb_bazar', 'naya_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'science_lab', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'baipayl', 'zirani_bazar', 'nandan_park'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'safety_druti',
    name: 'Safety Druti',
    bnName: 'সেফটি দ্রুতি',
    routeString: 'Mirpur 12 ⇄ Azimpur',
    stops: ['mirpur12', 'pallabi', 'purobi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'khamar_bari', 'dhanmondi27', 'dhanmondi32', 'kalabagan', 'city_college', 'newmarket', 'nilkhet', 'azimpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'somoy',
    name: 'Somoy',
    bnName: 'সময়',
    routeString: 'Sign Board ⇄ Mirpur 12',
    stops: ['signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'jatrabari', 'sayedabad', 'janapath_moor', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'farmgate', 'bijoy_sarani', 'agargaon', 'idb', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'pallabi', 'purobi', 'mirpur12'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'trust_1',
    name: 'Trust Transport (Mirpur 10-Banani)',
    bnName: 'ট্রাষ্ট ট্রান্সপোর্ট',
    routeString: 'Mirpur 10 ⇄ Banani',
    stops: ['mirpur10', 'mirpur13', 'mirpur14', 'kachukhet', 'sainik_club', 'banani'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'trust_2',
    name: 'Trust Transport (Mirpur 10-Shahbag)',
    bnName: 'ট্রাষ্ট ট্রান্সপোর্ট',
    routeString: 'Mirpur 10 ⇄ Shahbag',
    stops: ['mirpur10', 'mirpur13', 'mirpur14', 'kachukhet', 'workshop', 'saudi_colony', 'jahangir_gate', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'trust_3',
    name: 'Trust Transport (Mirpur DOHS-Motijheel)',
    bnName: 'ট্রাষ্ট ট্রান্সপোর্ট',
    routeString: 'Mirpur DOHS ⇄ Motijheel',
    stops: ['mirpur_dohs', 'kalshi', 'ecb', 'cantonment', 'adamjee_college', 'workshop', 'saudi_colony', 'jahangir_gate', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'dainik_bangla_moor', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'trust_ac',
    name: 'Trust Transport AC',
    bnName: 'ট্রাষ্ট ট্রান্সপোর্ট এসি',
    routeString: 'Mirpur DOHS ⇄ Kawran Bazar',
    stops: ['mirpur_dohs', 'kalshi', 'ecb', 'cantonment', 'adamjee_college', 'workshop', 'saudi_colony', 'jahangir_gate', 'farmgate', 'kawran_bazar'],
    type: 'AC',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_savar',
    name: 'BRTC (Madanpur-Savar)',
    bnName: 'বি আর টিসি',
    routeString: 'Madanpur ⇄ Savar',
    stops: ['madanpur', 'kanchpur', 'chittagong_road', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'kazla', 'jatrabari', 'sayedabad', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'khamar_bari', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_tongi',
    name: 'BRTC (Motijheel-Tongi)',
    bnName: 'বি আর টিসি',
    routeString: 'Motijheel ⇄ Tongi',
    stops: ['motijheel', 'dainik_bangla_moor', 'ittefaq_moor', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'jahangir_gate', 'mohakhali', 'amtola', 'chairman_bari', 'kakali', 'banani', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_chandra',
    name: 'BRTC (Motijheel-Chandra)',
    bnName: 'বি আর টিসি',
    routeString: 'Motijheel ⇄ Chandra',
    stops: ['motijheel', 'ittefaq_moor', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'khamar_bari', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'baipayl', 'zirani_bazar', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_badda',
    name: 'BRTC (Mohammadpur-Kuril)',
    bnName: 'বি আর টিসি',
    routeString: 'Mohammadpur ⇄ Kuril',
    stops: ['mohammadpur', 'asad_gate', 'khamar_bari', 'farmgate', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_kamalapur',
    name: 'BRTC (Kamalapur-Kuril)',
    bnName: 'বি আর টিসি',
    routeString: 'Kamalapur ⇄ Kuril',
    stops: ['kamalapur', 'motijheel', 'gulistan', 'gpo', 'paltan', 'press_club', 'high_court', 'matsya_bhaban', 'shahbag', 'bangla_motor', 'kawran_bazar', 'farmgate', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_vulta',
    name: 'BRTC (Vulta-Kuril)',
    bnName: 'বি আর টিসি',
    routeString: 'Vulta ⇄ Kuril',
    stops: ['vulta', 'kanchan_bridge', 'nila_market', '300_feet', 'bashundhara_300_feet', 'kuril'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_airport',
    name: 'BRTC (Motijheel-Abdullahpur)',
    bnName: 'বি আর টিসি',
    routeString: 'Motijheel ⇄ Abdullahpur',
    stops: ['motijheel', 'gulistan', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'malibagh_railgate', 'hazipara', 'rampura_bazar', 'rampura', 'merul', 'badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_mohammadpur',
    name: 'BRTC (Mohammadpur-Motijheel)',
    bnName: 'বি আর টিসি',
    routeString: 'Mohammadpur ⇄ Motijheel',
    stops: ['mohammadpur', 'shankar', 'star_kabab', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_gazipur',
    name: 'BRTC (Gabtoli-Gazipur)',
    bnName: 'বি আর টিসি',
    routeString: 'Gabtoli ⇄ Gazipur',
    stops: ['gabtoli', 'mazar_road', 'technical', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'tongi_college_gate', 'station_road', 'mill_gate', 'board_bazar', 'gazipur_bypass', 'bhogra', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bikalpa_auto',
    name: 'Bikalpa Bus Auto Service',
    bnName: 'বিকল্প বাস অটো সার্ভিস',
    routeString: 'Mirpur 12 ⇄ Motijheel',
    stops: ['mirpur12', 'pallabi', 'purobi', 'mirpur11', 'mirpur1', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'bijoy_sarani', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bikalpa_city_super',
    name: 'Bikalpa Bus City Super Service',
    bnName: 'বিকল্প বাস সিটি সুপার সার্ভিস',
    routeString: 'Mirpur 12 ⇄ Dhakeshwari',
    stops: ['mirpur12', 'pallabi', 'purobi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'dhanmondi27', 'dhanmondi32', 'kalabagan', 'city_college', 'newmarket', 'nilkhet', 'azimpur', 'dhakeshwari'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'swajan',
    name: 'Swajan Paribahan',
    bnName: 'স্বজন পরিবহন',
    routeString: 'Savar ⇄ Sadarghat',
    stops: ['savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'gpo', 'golap_shah_mazar', 'naya_bazar', 'ray_saheb_bazar', 'sadarghat'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'suveccha',
    name: 'Suveccha',
    bnName: 'শুভেচ্ছা',
    routeString: 'Chittagong Road ⇄ Chandra',
    stops: ['chittagong_road', 'signboard', 'matuail', 'rayerbag', 'shonir_akhra', 'kazla', 'jatrabari', 'sayedabad', 'gulistan', 'chankhar_pul', 'bakshi_bazar', 'dhakeshwari', 'azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'dhanmondi32', 'dhanmondi27', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'gabtoli', 'parbat', 'amin_bazar', 'modhumoti', 'boliarpur', 'hemayetpur', 'savar', 'nobinagar', 'baipayl', 'zirani_bazar', 'nandan_park', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'pallabi_super',
    name: 'Pallabi Super',
    bnName: 'পল্লবী সুপার',
    routeString: 'Gabtoli ⇄ Kamarpara',
    stops: ['gabtoli', 'technical', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'kamarpara'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'salsabil',
    name: 'Salsabil',
    bnName: 'ছালছাবিল',
    routeString: 'Postagola ⇄ Gazipur',
    stops: ['postagola', 'dholairpar', 'jatrabari', 'sayedabad', 'mugdapara', 'bashabo', 'khilgaon', 'malibagh_railgate', 'rampura_bazar', 'rampura', 'merul', 'badda', 'uttar_badda', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril_chourasta', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'station_road', 'mill_gate', 'board_bazar', 'gazipur_bypass', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },

  {
    id: 'labbaik',
    name: 'Labbaik',
    bnName: 'লাব্বাইক',
    routeString: 'Savar ⇄ Sign Board',
    stops: ['savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'mogbazar', 'mouchak', 'malibagh', 'rajarbag', 'khilgaon_flyover', 'khidma_hospital', 'bashabo', 'mugdapara', 'maniknagar', 'golapbagh', 'sayedabad', 'janapath_moor', 'jatrabari', 'kazla', 'shonir_akhra', 'rayerbag', 'matuail', 'signboard'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'turag',
    name: 'Turag',
    bnName: 'তুরাগ',
    routeString: 'Jatrabari ⇄ Tongi',
    stops: ['jatrabari', 'sayedabad', 'mugdapara', 'bashabo', 'rampura', 'badda', 'notun_bazar', 'kuril', 'airport', 'uttara', 'tongi'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'welcome',
    name: 'Welcome',
    bnName: 'ওয়েলকাম',
    routeString: 'Nandan Park ⇄ Motijheel',
    stops: ['nandan_park', 'zirani_bazar', 'zirabo', 'baipayl', 'nobinagar', 'savar', 'hemayetpur', 'boliarpur', 'modhumoti', 'amin_bazar', 'parbat', 'gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'bihanga',
    name: 'Bihanga',
    bnName: 'বিহঙ্গ',
    routeString: 'Mirpur 12 ⇄ Notun Bazar',
    stops: ['mirpur12', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan_bridge', 'gulshan1', 'badda', 'notun_bazar'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'shikor',
    name: 'Shikor',
    bnName: 'শিকড়',
    routeString: 'Mirpur 12 ⇄ Jatrabari',
    stops: ['mirpur12', 'pallabi', 'purobi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'bijoy_sarani', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'sayedabad', 'jatrabari'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'dewan',
    name: 'Dewan',
    bnName: 'দেওয়ান',
    routeString: 'Azimpur ⇄ Kuril',
    stops: ['azimpur', 'eden_college', 'nilkhet', 'newmarket', 'science_lab', 'city_college', 'katabon', 'shahbag', 'bangla_motor', 'kawran_bazar', 'farmgate', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'tanjil',
    name: 'Tanjil',
    bnName: 'তানজিল',
    routeString: 'Chiriyakhana ⇄ Sadarghat',
    stops: ['chiriyakhana', 'mirpur1', 'ansar_camp', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'high_court', 'press_club', 'paltan', 'gpo', 'golap_shah_mazar', 'naya_bazar', 'ray_saheb_bazar', 'sadarghat'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'modhumoti',
    name: 'Modhumoti',
    bnName: 'মধুমতি',
    routeString: 'Chiriyakhana ⇄ Demra',
    stops: ['chiriyakhana', 'sony_cinema', 'mirpur2', 'mirpur1', 'ansar_camp', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'agargaon', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda_link_road', 'merul', 'rampura', 'banasree', 'demra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'selfie',
    name: 'Selfie',
    bnName: 'সেলফি',
    routeString: 'Gabtoli ⇄ Paturia',
    stops: ['gabtoli', 'amin_bazar', 'hemayetpur', 'savar', 'nobinagar', 'manikganj', 'paturia'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'elevated_expressway',
    name: 'Elevated Expressway',
    bnName: 'এলিভেটেড এক্সপ্রেসওয়ে',
    routeString: 'Gulistan ⇄ Shib Bari',
    stops: ['gulistan', 'shahbag', 'farmgate', 'airport', 'tongi_college_gate', 'board_bazar', 'bhogra', 'shib_bari'],
    type: 'AC',
    hours: '7:00 AM - 9:00 PM'
  },
  {
    id: 'new_shuktara',
    name: 'New Shuktara',
    bnName: 'নিউ শুকতারা',
    routeString: 'Gabtoli ⇄ Sadarghat',
    stops: ['gabtoli', 'technical', 'kallyanpur', 'shyamoli', 'asad_gate', 'newmarket', 'azimpur', 'gulistan', 'sadarghat'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'faysal',
    name: 'Faysal',
    bnName: 'ফয়সাল',
    routeString: 'Mohammadpur ⇄ Abdullahpur',
    stops: ['mohammadpur', 'shankar', 'dhanmondi15', 'science_lab', 'shahbag', 'farmgate', 'mohakhali', 'banani', 'airport', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'akash',
    name: 'Akash',
    bnName: 'আকাশ',
    routeString: 'Kadamtoli ⇄ Tongi',
    stops: ['kadamtoli', 'keraniganj', 'babubazar', 'naya_bazar', 'gulistan', 'paltan', 'shahbag', 'farmgate', 'mohakhali', 'banani', 'airport', 'uttara', 'tongi'],
    type: 'Semi-Sitting',
    hours: '5:30 AM - 10:30 PM'
  },
  {
    id: 'onabil',
    name: 'Onabil',
    bnName: 'অনাবিল',
    routeString: 'Sign Board ⇄ Gazipur',
    stops: ['signboard', 'shonir_akhra', 'jatrabari', 'sayedabad', 'mugdapara', 'bashabo', 'khilgaon', 'malibagh_railgate', 'hazipara', 'rampura_bazar', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'station_road', 'mill_gate', 'board_bazar', 'gazipur_bypass', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:30 PM'
  },
  {
    id: 'prochesta',
    name: 'Prochesta',
    bnName: 'প্রচেষ্টা',
    routeString: 'Maowa ⇄ Abdullahpur',
    stops: ['maowa', 'keraniganj', 'babubazar', 'naya_bazar', 'ray_saheb_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'malibagh_railgate', 'hazipara', 'rampura_bazar', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'gazipur_paribahan',
    name: 'Gazipur Paribahan',
    bnName: 'গাজীপুর পরিবহন',
    routeString: 'Motijheel ⇄ Shib Bari',
    stops: ['motijheel', 'dainik_bangla_moor', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'mogbazar', 'satrasta', 'nabisco', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'kakali', 'banani', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'tongi_college_gate', 'station_road', 'mill_gate', 'board_bazar', 'gazipur', 'bhogra', 'shib_bari'],
    type: 'Semi-Sitting',
    hours: '5:00 AM - 12:00 AM'
  },
  {
    id: 'ajmeri',
    name: 'Ajmeri Glory',
    bnName: 'আজমেরী গ্লোরী',
    routeString: 'Sadarghat ⇄ Chandra',
    stops: ['sadarghat', 'ray_saheb_bazar', 'naya_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'mogbazar', 'satrasta', 'nabisco', 'mohakhali', 'amtola', 'sainik_club', 'banani', 'kakali', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'tongi_college_gate', 'station_road', 'mill_gate', 'board_bazar', 'gazipur_bypass', 'bhogra', 'konabari', 'chandra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 12:00 AM'
  },
  {
    id: 'vip_27',
    name: 'VIP 27',
    bnName: 'ভিআইপি ২৭',
    routeString: 'Azimpur ⇄ Gazipur',
    stops: ['azimpur', 'nilkhet', 'newmarket', 'city_college', 'kalabagan', 'banani', 'kakali', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'tongi_college_gate', 'station_road', 'mill_gate', 'board_bazar', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'balaka',
    name: 'Balaka',
    bnName: 'বলাকা',
    routeString: 'Sayedabad ⇄ Gazipur',
    stops: ['sayedabad', 'mugdapara', 'bashabo', 'khilgaon', 'khidma_hospital', 'rampura', 'badda', 'kuril', 'kuril_chourasta', 'airport', 'uttara', 'tongi', 'tongi_college_gate', 'gazipur', 'bhogra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'shatabdi',
    name: 'Shatabdi',
    bnName: 'শতাব্দী',
    routeString: 'Motijheel ⇄ Kamarpara',
    stops: ['motijheel', 'dainik_bangla_moor', 'paltan', 'kakrail', 'malibagh', 'mouchak', 'mogbazar', 'satrasta', 'nabisco', 'mohakhali', 'amtola', 'chairman_bari', 'banani', 'kakali', 'post_office_gulshan', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'kamarpara'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'bhuiyan',
    name: 'Bhuiyan',
    bnName: 'ভূঁইয়া',
    routeString: 'Japan Garden City ⇄ Abdullahpur',
    stops: ['japan_garden', 'ring_road', 'adabor', 'shyamoli', 'shishu_mela', 'agargaon', 'zia_uddyan', 'bijoy_sarani', 'old_airport', 'jahangir_gate', 'mohakhali', 'amtola', 'chairman_bari', 'sainik_club', 'kakali', 'banani', 'staff_road', 'post_office_gulshan', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'paristhan',
    name: 'Paristhan',
    bnName: 'পরিস্হান',
    routeString: 'Bosila ⇄ Abdullahpur',
    stops: ['bosila', 'mohammadpur', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'bangla_college', 'tolarbag', 'ansar_camp', 'mirpur1', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },

  {
    id: 'rob_rob',
    name: 'Rob Rob',
    bnName: 'রব রব',
    routeString: 'Gabtoli ⇄ Banasree',
    stops: ['gabtoli', 'mazar_road', 'technical', 'ansar_camp', 'mirpur1', 'mirpur2', 'mirpur10', 'purobi', 'kalshi', 'ecb', 'mes', 'banani', 'kakali', 'post_office_gulshan', 'gulshan2', 'gulshan1', 'badda_link_road', 'merul', 'rampura', 'banasree'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 12:00 PM'
  },
  {
    id: 'akik',
    name: 'Akik',
    bnName: 'আকিক',
    routeString: 'Ansar Camp ⇄ Uttar Badda',
    stops: ['ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'jamuna_future_park', 'bashundhara', 'bashundhara_300_feet', 'nadda', 'notun_bazar', 'bashtola', 'shahjadpur', 'uttar_badda'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'meshkat',
    name: 'Meshkat',
    bnName: 'মেশকাত',
    routeString: 'Mohammadpur ⇄ Chittagong Road',
    stops: ['mohammadpur', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'paltan', 'dainik_bangla_moor', 'motijheel', 'ittefaq_moor', 'jatrabari', 'shonir_akhra', 'rayerbag', 'matuail', 'signboard', 'chittagong_road'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'achia',
    name: 'Achia',
    bnName: 'আছিয়া',
    routeString: 'Gabtoli ⇄ Demra',
    stops: ['gabtoli', 'mazar_road', 'technical', 'ansar_camp', 'mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'jamuna_future_park', 'bashundhara', 'bashundhara_300_feet', 'nadda', 'notun_bazar', 'bashtola', 'shahjadpur', 'uttar_badda', 'badda', 'merul', 'rampura', 'banasree', 'demra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 12:00 PM'
  },
  {
    id: 'midline',
    name: 'Midline',
    bnName: 'মিডলাইন',
    routeString: 'Mohammadpur ⇄ Khilgaon',
    stops: ['mohammadpur', 'star_kabab', 'jigatola', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel', 'dainik_bangla_moor', 'ittefaq_moor', 'arambagh', 'kamalapur', 'bashabo', 'khilgaon', 'khidma_hospital'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:30 PM'
  },
  {
    id: 'tetulia',
    name: 'Tetulia',
    bnName: 'তেতুলিয়া',
    routeString: 'Shia Masjid ⇄ Abdullahpur',
    stops: ['shia_masjid', 'japan_garden', 'ring_road', 'adabor', 'shishu_mela', 'agargaon', 'taltola', 'shewrapara', 'kazipara', 'mirpur10', 'mirpur11', 'purobi', 'pallabi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'airport', 'jashimuddin', 'rajlakshmi', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'transilva',
    name: 'Transilva',
    bnName: 'ট্রান্সিলভা',
    routeString: 'Mirpur 1 ⇄ Jatrabari',
    stops: ['mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'dhanmondi27', 'dhanmondi32', 'kalabagan', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'gpo', 'gulistan', 'motijheel', 'ittefaq_moor', 'sayedabad', 'janapath_moor', 'jatrabari', 'kazla'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: '7_no',
    name: '7 No.',
    bnName: '৭নং',
    routeString: 'Gabtoli ⇄ Sadarghat',
    stops: ['gabtoli', 'mazar_road', 'technical', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'dhanmondi27', 'dhanmondi32', 'kalabagan', 'science_lab', 'katabon', 'shahbag', 'high_court', 'press_club', 'paltan', 'gpo', 'golap_shah_mazar', 'gulistan', 'naya_bazar', 'ray_saheb_bazar', 'sadarghat'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: '8_no',
    name: '8 No.',
    bnName: '৮নং',
    routeString: 'Jatrabari ⇄ Gabtoli',
    stops: ['jatrabari', 'janapath_moor', 'sayedabad', 'motijheel', 'dainik_bangla_moor', 'paltan', 'press_club', 'matsya_bhaban', 'high_court', 'shahbag', 'bangla_motor', 'kawran_bazar', 'bot_tola', 'farmgate', 'khamar_bari', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'technical', 'mazar_road', 'gabtoli'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'winner',
    name: 'Winner',
    bnName: 'উইনার',
    routeString: 'Azimpur ⇄ Kuril',
    stops: ['azimpur', 'eden_college', 'nilkhet', 'newmarket', 'science_lab', 'city_college', 'kalabagan', 'panthapath', 'kawran_bazar', 'bot_tola', 'satrasta', 'nabisco', 'mohakhali', 'amtola', 'wireless', 'gulshan1', 'badda', 'badda_link_road', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'kuril_chourasta'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'falgun',
    name: 'Falgun',
    bnName: 'ফাল্গুন',
    routeString: 'Azimpur ⇄ Uttara',
    stops: ['azimpur', 'nilkhet', 'newmarket', 'science_lab', 'bata_signal', 'katabon', 'shahbag', 'matsya_bhaban', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'malibagh_railgate', 'khidma_hospital', 'rampura_bazar', 'rampura', 'merul', 'madhya_badda', 'badda', 'shahjadpur', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'uttara'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'al_makka',
    name: 'Al Makka',
    bnName: 'আল মক্কা',
    routeString: 'Motijheel ⇄ Mirpur 1',
    stops: ['motijheel', 'dainik_bangla_moor', 'gulistan', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'mogbazar', 'satrasta', 'nabisco', 'mohakhali', 'amtola', 'chairman_bari', 'kakali', 'banani', 'ecb', 'kalshi', 'purobi', 'mirpur10', 'mirpur2', 'mirpur1'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ayath',
    name: 'Ayath',
    bnName: 'আয়াত',
    routeString: 'Chiriyakhana ⇄ Kamalapur',
    stops: ['chiriyakhana', 'sony_cinema', 'mirpur2', 'mirpur10', 'kazipara', 'shewrapara', 'taltola', 'agargaon', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'mogbazar', 'mouchak', 'malibagh', 'rajarbag', 'kamalapur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:30 PM'
  },
  {
    id: 'bahon',
    name: 'Bahon',
    bnName: 'বাহন',
    routeString: 'Mirpur 14 ⇄ Khilgaon',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'mirpur1', 'ansar_camp', 'bangla_college', 'technical', 'mazar_road', 'darussalam', 'kallyanpur', 'shyamoli', 'shishu_mela', 'asad_gate', 'dhanmondi27', 'dhanmondi32', 'science_lab', 'katabon', 'shahbag', 'high_court', 'press_club', 'paltan', 'dainik_bangla_moor', 'motijheel', 'ittefaq_moor', 'arambagh', 'kamalapur', 'bashabo', 'khilgaon', 'khidma_hospital'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'champion',
    name: 'Champion',
    bnName: 'চ্যাম্পিয়ন',
    routeString: 'Vashantek ⇄ Gabtoli',
    stops: ['vashantek', 'mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'gabtoli'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dishari',
    name: 'Dishari',
    bnName: 'দিশারি',
    routeString: 'Chiriyakhana ⇄ Keraniganj',
    stops: ['chiriyakhana', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'kallyanpur', 'shyamoli', 'shishu_mela', 'college_gate', 'asad_gate', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bot_tola', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'golap_shah_mazar', 'naya_bazar', 'ray_saheb_bazar', 'babubazar', 'keraniganj'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'grameen',
    name: 'Grameen',
    bnName: 'গ্রামীণ',
    routeString: 'Mirpur 14 ⇄ Gabtoli',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'sony_cinema', 'mirpur1', 'ansar_camp', 'technical', 'mazar_road', 'gabtoli'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'kanak',
    name: 'Kanak',
    bnName: 'কনক',
    routeString: 'Mirpur 1 ⇄ Abdullahpur',
    stops: ['mirpur1', 'sony_cinema', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'moitri',
    name: 'Moitri',
    bnName: 'মৈত্রী',
    routeString: 'Mohammadpur ⇄ Arambagh',
    stops: ['mohammadpur', 'shankar', 'star_kabab', 'dhanmondi15', 'jigatola', 'city_college', 'science_lab', 'bata_signal', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gpo', 'gulistan', 'motijheel', 'arambagh'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'suprobhat',
    name: 'Suprobhat',
    bnName: 'সুপ্রভাত',
    routeString: 'Sadarghat ⇄ Gazipur',
    stops: ['sadarghat', 'victoria_park', 'ray_saheb_bazar', 'naya_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'mogbazar', 'nabisco', 'mohakhali', 'chairman_bari', 'banani', 'kakali', 'staff_road', 'mes', 'shewra', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'station_road', 'mill_gate', 'board_bazar', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'projapoti',
    name: 'Projapoti',
    bnName: 'প্রজাপতি',
    routeString: 'Bosila ⇄ Kamarpara',
    stops: ['bosila', 'mohammadpur', 'asad_gate', 'college_gate', 'shishu_mela', 'shyamoli', 'kallyanpur', 'darussalam', 'technical', 'mazar_road', 'bangla_college', 'ansar_camp', 'mirpur1', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'shewra', 'kuril', 'kuril_chourasta', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'uttara', 'abdullahpur', 'kamarpara'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  }
];

// Metro Rail Stations (MRT Line 6)
export const METRO_STATIONS: Record<string, MetroStation> = {
  'uttara_north': {
    id: 'uttara_north',
    name: 'Uttara North Metro Station',
    bnName: 'উত্তরা উত্তর',
    lat: 23.8753,
    lng: 90.3956,
    distanceFromStart: 0.0,
    description: 'Near Diabari, residential areas, and local markets'
  },
  'uttara_center': {
    id: 'uttara_center',
    name: 'Uttara Center Metro Station',
    bnName: 'উত্তরা কেন্দ্র',
    lat: 23.8690,
    lng: 90.3967,
    distanceFromStart: 1.2,
    description: 'Central Uttara, close to Rajuk College, commercial areas, and shopping centers'
  },
  'uttara_south': {
    id: 'uttara_south',
    name: 'Uttara South Metro Station',
    bnName: 'উত্তরা দক্ষিণ',
    lat: 23.8627,
    lng: 90.3978,
    distanceFromStart: 2.2,
    description: 'Near Uttara Sector 10 & 12, residential areas, schools, and local markets'
  },
  'pallabi': {
    id: 'pallabi',
    name: 'Pallabi Metro Station',
    bnName: 'পল্লবী',
    lat: 23.8250,
    lng: 90.3600,
    distanceFromStart: 3.8,
    description: 'Pallabi area, residential zones, local markets, and bus stands'
  },
  'mirpur_11': {
    id: 'mirpur_11',
    name: 'Mirpur 11 Metro Station',
    bnName: 'মিরপুর ১১',
    lat: 23.8150,
    lng: 90.3650,
    distanceFromStart: 4.8,
    description: 'Mirpur Section 11, residential areas, markets, and educational institutions'
  },
  'mirpur_10': {
    id: 'mirpur_10',
    name: 'Mirpur 10 Metro Station',
    bnName: 'মিরপুর ১০',
    lat: 23.8071,
    lng: 90.3686,
    distanceFromStart: 5.9,
    description: 'Mirpur Section 10 roundabout, major bus stop, shopping areas, banks, and restaurants'
  },
  'kazipara': {
    id: 'kazipara',
    name: 'Kazipara Metro Station',
    bnName: 'কাজীপাড়া',
    lat: 23.7970,
    lng: 90.3700,
    distanceFromStart: 7.0,
    description: 'Kazipara area, residential zones, local markets, and mosques'
  },
  'shewrapara': {
    id: 'shewrapara',
    name: 'Shewrapara Metro Station',
    bnName: 'শেওড়াপাড়া',
    lat: 23.7900,
    lng: 90.3750,
    distanceFromStart: 8.0,
    description: 'Shewrapara area, residential zones, markets, and bus stops'
  },
  'agargaon': {
    id: 'agargaon',
    name: 'Agargaon Metro Station',
    bnName: 'আগারগাঁও',
    lat: 23.7780,
    lng: 90.3800,
    distanceFromStart: 9.2,
    description: 'Agargaon area, government offices (IDB Bhaban, Election Commission), hospitals (NICVD), and bus stops'
  },
  'bijoy_sarani': {
    id: 'bijoy_sarani',
    name: 'Bijoy Sarani Metro Station',
    bnName: 'বিজয় সরণি',
    lat: 23.7630,
    lng: 90.3880,
    distanceFromStart: 10.8,
    description: 'Near Military Museum, banks, offices, and well-connected road junctions'
  },
  'farmgate': {
    id: 'farmgate',
    name: 'Farmgate Metro Station',
    bnName: 'ফার্মগেট',
    lat: 23.7561,
    lng: 90.3872,
    distanceFromStart: 11.9,
    description: 'Major commercial and transit hub, Farmgate Bus Terminal, shopping malls, banks, hospitals, offices, and restaurants'
  },
  'karwan_bazar': {
    id: 'karwan_bazar',
    name: 'Karwan Bazar Metro Station',
    bnName: 'কারওয়ান বাজার',
    lat: 23.7500,
    lng: 90.3930,
    distanceFromStart: 13.0,
    description: 'Largest wholesale market in Dhaka, corporate offices, banks, shopping complexes, and eateries'
  },
  'shahbagh': {
    id: 'shahbagh',
    name: 'Shahbagh Metro Station',
    bnName: 'শাহবাগ',
    lat: 23.7400,
    lng: 90.3950,
    distanceFromStart: 14.1,
    description: 'Dhaka Medical College Hospital, University of Dhaka vicinity, National Museum, banks, bookstores, cafes, and government offices'
  },
  'dhaka_university': {
    id: 'dhaka_university',
    name: 'Dhaka University Metro Station',
    bnName: 'ঢাকা বিশ্ববিদ্যালয়',
    lat: 23.7350,
    lng: 90.3950,
    distanceFromStart: 15.1,
    description: 'Main campus of University of Dhaka, academic buildings, libraries, cultural centers, bookstores, cafes, and banks'
  },
  'bangladesh_secretariat': {
    id: 'bangladesh_secretariat',
    name: 'Bangladesh Secretariat',
    bnName: 'বাংলাদেশ সচিবালয়',
    lat: 23.7320,
    lng: 90.4050,
    distanceFromStart: 16.3,
    description: 'Government administrative offices, banks, business centers, and nearby shops and eateries'
  },
  'motijheel': {
    id: 'motijheel',
    name: 'Motijheel Metro Station',
    bnName: 'মতিঝিল',
    lat: 23.7330,
    lng: 90.4170,
    distanceFromStart: 17.5,
    description: "Dhaka's central business district, headquarters of major banks, corporate offices, shopping malls, financial institutions, and restaurants"
  }
};

// Metro Lines
export const METRO_LINES: Record<string, MetroLine> = {
  'mrt6': {
    id: 'mrt6',
    name: 'MRT Line 6',
    bnName: 'এমআরটি লাইন ৬',
    stations: [
      'uttara_north',
      'uttara_center',
      'uttara_south',
      'pallabi',
      'mirpur_11',
      'mirpur_10',
      'kazipara',
      'shewrapara',
      'agargaon',
      'bijoy_sarani',
      'farmgate',
      'karwan_bazar',
      'shahbagh',
      'dhaka_university',
      'bangladesh_secretariat',
      'motijheel'
    ],
    color: '#00A651' // Metro green color
  }
};

// Railway Stations
export const RAILWAY_STATIONS: Record<string, MetroStation> = {
  'kamalapur': {
    id: 'kamalapur',
    name: 'Kamalapur Railway Station',
    bnName: 'কমলাপুর রেলওয়ে স্টেশন',
    lat: 23.7333191,
    lng: 90.4265487,
    description: 'Main railway station in Dhaka, connects to all major cities'
  },
  'tejgaon_railway': {
    id: 'tejgaon_railway',
    name: 'Tejgaon Railway Station',
    bnName: 'তেজগাঁও রেলওয়ে স্টেশন',
    lat: 23.7601822,
    lng: 90.3947722,
    description: 'Railway station in Tejgaon industrial area'
  },
  'airport_railway': {
    id: 'airport_railway',
    name: 'Dhaka Airport Railway Station',
    bnName: 'ঢাকা বিমানবন্দর রেলওয়ে স্টেশন',
    lat: 23.8518873,
    lng: 90.4081706,
    description: 'Railway station near Hazrat Shahjalal International Airport'
  },
  'tongi_junction': {
    id: 'tongi_junction',
    name: 'Tongi Junction',
    bnName: 'টঙ্গী জংশন',
    lat: 23.89859,
    lng: 90.4084504,
    description: 'Major railway junction connecting northern routes'
  },
  'banani_railway': {
    id: 'banani_railway',
    name: 'Banani Railway Station',
    bnName: 'বনানী রেলওয়ে স্টেশন',
    lat: 23.79558,
    lng: 90.400856,
    description: 'Railway station in Banani diplomatic zone'
  },
  'cantonment_railway': {
    id: 'cantonment_railway',
    name: 'Dhaka Cantonment Railway Station',
    bnName: 'ঢাকা ক্যান্টনমেন্ট রেলওয়ে স্টেশন',
    lat: 23.81557,
    lng: 90.41036,
    description: 'Railway station in Dhaka Cantonment area'
  },
  'gandaria_railway': {
    id: 'gandaria_railway',
    name: 'Gandaria Railway Station',
    bnName: 'গেন্ডারিয়া রেলওয়ে স্টেশন',
    lat: 23.7014878,
    lng: 90.4289931,
    description: 'Railway station in Gandaria residential area'
  }
};

// Airports
export const AIRPORTS: Record<string, MetroStation> = {
  'tejgaon_airport': {
    id: 'tejgaon_airport',
    name: 'Tejgaon Airport',
    bnName: 'তেজগাঁও বিমানবন্দর',
    lat: 23.7803181,
    lng: 90.3821504,
    description: 'Domestic airport in Tejgaon area'
  },
  'shahjalal_airport': {
    id: 'shahjalal_airport',
    name: 'Hazrat Shahjalal International Airport',
    bnName: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর',
    lat: 23.8434344,
    lng: 90.4029252,
    description: 'Main international airport of Bangladesh'
  }
};
