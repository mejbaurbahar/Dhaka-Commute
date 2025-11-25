

import { BusRoute, Station } from './types';

// Expanded coordinate mapping (Approximate Lat/Lng for Dhaka)
export const STATIONS: Record<string, Station> = {
  'gabtoli': { id: 'gabtoli', name: 'Gabtoli', lat: 23.7831, lng: 90.3475 },
  'technical': { id: 'technical', name: 'Technical', lat: 23.7800, lng: 90.3550 },
  'mirpur1': { id: 'mirpur1', name: 'Mirpur 1', lat: 23.7936, lng: 90.3537 },
  'mirpur2': { id: 'mirpur2', name: 'Mirpur 2', lat: 23.8050, lng: 90.3600 },
  'mirpur6': { id: 'mirpur6', name: 'Mirpur 6', lat: 23.8100, lng: 90.3620 },
  'mirpur7': { id: 'mirpur7', name: 'Mirpur 7', lat: 23.8130, lng: 90.3630 },
  'mirpur10': { id: 'mirpur10', name: 'Mirpur 10', lat: 23.8071, lng: 90.3686 },
  'mirpur11': { id: 'mirpur11', name: 'Mirpur 11', lat: 23.8150, lng: 90.3650 },
  'mirpur12': { id: 'mirpur12', name: 'Mirpur 12', lat: 23.8200, lng: 90.3650 },
  'mirpur13': { id: 'mirpur13', name: 'Mirpur 13', lat: 23.8160, lng: 90.3700 },
  'mirpur14': { id: 'mirpur14', name: 'Mirpur 14', lat: 23.8120, lng: 90.3750 },
  'pallabi': { id: 'pallabi', name: 'Pallabi', lat: 23.8250, lng: 90.3600 },
  'purobi': { id: 'purobi', name: 'Purobi', lat: 23.8210, lng: 90.3620 },
  'kalshi': { id: 'kalshi', name: 'Kalshi', lat: 23.8200, lng: 90.3800 },
  'ecb': { id: 'ecb', name: 'ECB Square', lat: 23.8230, lng: 90.3900 },
  'kuril': { id: 'kuril', name: 'Kuril Bishwa Road', lat: 23.8231, lng: 90.4100 },
  'kuril_flyover': { id: 'kuril_flyover', name: 'Kuril Flyover', lat: 23.8220, lng: 90.4080 },
  'bashundhara': { id: 'bashundhara', name: 'Bashundhara', lat: 23.8120, lng: 90.4250 },
  'notun_bazar': { id: 'notun_bazar', name: 'Notun Bazar', lat: 23.7950, lng: 90.4250 },
  'badda': { id: 'badda', name: 'Badda', lat: 23.7850, lng: 90.4250 },
  'uttar_badda': { id: 'uttar_badda', name: 'Uttar Badda', lat: 23.7880, lng: 90.4250 },
  'madhya_badda': { id: 'madhya_badda', name: 'Madhya Badda', lat: 23.7820, lng: 90.4250 },
  'merul': { id: 'merul', name: 'Merul Badda', lat: 23.7700, lng: 90.4200 },
  'rampura': { id: 'rampura', name: 'Rampura Bridge', lat: 23.7650, lng: 90.4150 },
  'banasree': { id: 'banasree', name: 'Banasree', lat: 23.7600, lng: 90.4300 },
  'demra': { id: 'demra', name: 'Demra Staff Quarter', lat: 23.7200, lng: 90.4500 },
  'airport': { id: 'airport', name: 'Airport', lat: 23.8511, lng: 90.4087 },
  'uttara': { id: 'uttara', name: 'Uttara (House Building)', lat: 23.8700, lng: 90.4000 },
  'abdullahpur': { id: 'abdullahpur', name: 'Abdullahpur', lat: 23.8800, lng: 90.4000 },
  'mohakhali': { id: 'mohakhali', name: 'Mohakhali', lat: 23.7778, lng: 90.4050 },
  'farmgate': { id: 'farmgate', name: 'Farmgate', lat: 23.7561, lng: 90.3872 },
  'shahbag': { id: 'shahbag', name: 'Shahbag', lat: 23.7400, lng: 90.3950 },
  'gulistan': { id: 'gulistan', name: 'Gulistan', lat: 23.7250, lng: 90.4100 },
  'motijheel': { id: 'motijheel', name: 'Motijheel', lat: 23.7330, lng: 90.4170 },
  'sayedabad': { id: 'sayedabad', name: 'Sayedabad', lat: 23.7150, lng: 90.4250 },
  'jatrabari': { id: 'jatrabari', name: 'Jatrabari', lat: 23.7050, lng: 90.4350 },
  'savar': { id: 'savar', name: 'Savar', lat: 23.8450, lng: 90.2600 },
  'hemayetpur': { id: 'hemayetpur', name: 'Hemayetpur', lat: 23.8000, lng: 90.2800 },
  'kallyanpur': { id: 'kallyanpur', name: 'Kallyanpur', lat: 23.7800, lng: 90.3650 },
  'shyamoli': { id: 'shyamoli', name: 'Shyamoli', lat: 23.7750, lng: 90.3700 },
  'dhanmondi27': { id: 'dhanmondi27', name: 'Dhanmondi 27', lat: 23.7550, lng: 90.3750 },
  'dhanmondi32': { id: 'dhanmondi32', name: 'Dhanmondi 32', lat: 23.7500, lng: 90.3750 },
  'dhanmondi15': { id: 'dhanmondi15', name: 'Dhanmondi 15', lat: 23.7450, lng: 90.3700 },
  'newmarket': { id: 'newmarket', name: 'New Market', lat: 23.7330, lng: 90.3850 },
  'azimpur': { id: 'azimpur', name: 'Azimpur', lat: 23.7280, lng: 90.3880 },
  'banani': { id: 'banani', name: 'Banani', lat: 23.7930, lng: 90.4040 },
  'gulshan1': { id: 'gulshan1', name: 'Gulshan 1', lat: 23.7800, lng: 90.4150 },
  'gulshan2': { id: 'gulshan2', name: 'Gulshan 2', lat: 23.7950, lng: 90.4150 },
  'shia_masjid': { id: 'shia_masjid', name: 'Shia Masjid', lat: 23.7660, lng: 90.3580 },
  'adabor': { id: 'adabor', name: 'Adabor', lat: 23.7700, lng: 90.3550 },
  'amin_bazar': { id: 'amin_bazar', name: 'Amin Bazar', lat: 23.7900, lng: 90.3400 },
  'agargaon': { id: 'agargaon', name: 'Agargaon', lat: 23.7780, lng: 90.3800 },
  'fulbaria': { id: 'fulbaria', name: 'Fulbaria', lat: 23.7220, lng: 90.4080 },
  'paltan': { id: 'paltan', name: 'Paltan', lat: 23.7300, lng: 90.4120 },
  'press_club': { id: 'press_club', name: 'Press Club', lat: 23.7290, lng: 90.4030 },
  'kawran_bazar': { id: 'kawran_bazar', name: 'Kawran Bazar', lat: 23.7500, lng: 90.3930 },
  'sadarghat': { id: 'sadarghat', name: 'Sadarghat', lat: 23.7050, lng: 90.4050 },
  'malibagh': { id: 'malibagh', name: 'Malibagh', lat: 23.7500, lng: 90.4150 },
  'mouchak': { id: 'mouchak', name: 'Mouchak', lat: 23.7480, lng: 90.4120 },
  'mogbazar': { id: 'mogbazar', name: 'Mogbazar', lat: 23.7450, lng: 90.4050 },
  'postagola': { id: 'postagola', name: 'Postagola', lat: 23.6950, lng: 90.4300 },
  'science_lab': { id: 'science_lab', name: 'Science Lab', lat: 23.7380, lng: 90.3850 },
  'city_college': { id: 'city_college', name: 'City College', lat: 23.7400, lng: 90.3820 },
  'khilkhet': { id: 'khilkhet', name: 'Khilkhet', lat: 23.8350, lng: 90.4150 },
  'kakali': { id: 'kakali', name: 'Kakali', lat: 23.7950, lng: 90.4050 },
  'nabisco': { id: 'nabisco', name: 'Nabisco', lat: 23.7650, lng: 90.4020 },
  'satrasta': { id: 'satrasta', name: 'Satrasta', lat: 23.7600, lng: 90.3980 },
  'shantinagar': { id: 'shantinagar', name: 'Shantinagar', lat: 23.7410, lng: 90.4150 },
  'tongi': { id: 'tongi', name: 'Tongi', lat: 23.8900, lng: 90.4020 },
  'gazipur': { id: 'gazipur', name: 'Gazipur Chourasta', lat: 23.9900, lng: 90.3950 },
  'kachukhet': { id: 'kachukhet', name: 'Kachukhet', lat: 23.7980, lng: 90.3900 },
  'bijoy_sarani': { id: 'bijoy_sarani', name: 'Bijoy Sarani', lat: 23.7630, lng: 90.3880 },
  'signboard': { id: 'signboard', name: 'Sign Board', lat: 23.6900, lng: 90.4600 },
  'chittagong_road': { id: 'chittagong_road', name: 'Chittagong Road', lat: 23.6800, lng: 90.4700 },
  'shankar': { id: 'shankar', name: 'Shankar', lat: 23.7520, lng: 90.3680 },
  'mohammadpur': { id: 'mohammadpur', name: 'Mohammadpur', lat: 23.7620, lng: 90.3600 },
  'jigatola': { id: 'jigatola', name: 'Jigatola', lat: 23.7420, lng: 90.3750 },
  'madanpur': { id: 'madanpur', name: 'Madanpur', lat: 23.6700, lng: 90.5200 },
  'chandra': { id: 'chandra', name: 'Chandra', lat: 24.0300, lng: 90.2300 },
  'kamalapur': { id: 'kamalapur', name: 'Kamalapur', lat: 23.7310, lng: 90.4250 },
  'high_court': { id: 'high_court', name: 'High Court', lat: 23.7270, lng: 90.4020 },
  'sony_cinema': { id: 'sony_cinema', name: 'Sony Cinema Hall', lat: 23.8030, lng: 90.3620 },
  'ansar_camp': { id: 'ansar_camp', name: 'Ansar Camp', lat: 23.7900, lng: 90.3520 },
  'kazipara': { id: 'kazipara', name: 'Kazipara', lat: 23.7970, lng: 90.3700 },
  'shewrapara': { id: 'shewrapara', name: 'Shewrapara', lat: 23.7900, lng: 90.3750 },
  'idb': { id: 'idb', name: 'IDB Bhaban', lat: 23.7750, lng: 90.3820 },
  'wireless': { id: 'wireless', name: 'Wireless Gate', lat: 23.7820, lng: 90.4000 },
  'chairman_bari': { id: 'chairman_bari', name: 'Chairman Bari', lat: 23.7880, lng: 90.4020 },
  'mes': { id: 'mes', name: 'MES', lat: 23.8150, lng: 90.4000 },
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
  'shibur_market': { id: 'shibur_market', name: 'Shibur Market', lat: 23.6500, lng: 90.4800 },
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
  'dhaleshwar': { id: 'dhaleshwar', name: 'Dhaleshwar', lat: 23.6500, lng: 90.3000 }, // Approx
};

// Expanded Bus Routes
export const BUS_DATA: BusRoute[] = [
  // ... Existing Routes ...
  {
    id: 'raida',
    name: 'Raida',
    bnName: 'রাইদা',
    routeString: 'Postagola ⇄ Diabari',
    stops: ['postagola', 'jurain', 'dayaganj', 'tikatuli', 'maniknagar', 'mugdapara', 'bashabo', 'khilgaon', 'malibagh', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'diabari'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'victor_classic',
    name: 'Victor Classic',
    bnName: 'ভিক্টর ক্লাসিক',
    routeString: 'Sadarghat ⇄ Diabari',
    stops: ['sadarghat', 'victoria_park', 'naya_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'hazipara', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'diabari'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'turag',
    name: 'Turag',
    bnName: 'তুরাগ',
    routeString: 'Jatrabari ⇄ Tongi',
    stops: ['jatrabari', 'sayedabad', 'mugdapara', 'bashabo', 'khilgaon', 'malibagh', 'rampura', 'merul', 'badda', 'uttar_badda', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'akash',
    name: 'Akash',
    bnName: 'আকাশ',
    routeString: 'Kadamtali ⇄ Tongi',
    stops: ['keraniganj', 'babubazar', 'naya_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'hazipara', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'prochesta',
    name: 'Prochesta',
    bnName: 'প্রচেষ্টা',
    routeString: 'Maowa ⇄ Abdullahpur',
    stops: ['maowa', 'keraniganj', 'babubazar', 'naya_bazar', 'golap_shah_mazar', 'gpo', 'paltan', 'kakrail', 'shantinagar', 'malibagh', 'mouchak', 'hazipara', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'onabil',
    name: 'Anabil',
    bnName: 'অনাবিল',
    routeString: 'Signboard ⇄ Gazipur',
    stops: ['signboard', 'shonir_akhra', 'jatrabari', 'sayedabad', 'mugdapara', 'bashabo', 'khilgaon', 'malibagh', 'hazipara', 'rampura', 'merul', 'badda', 'uttar_badda', 'shahjadpur', 'bashtola', 'notun_bazar', 'nadda', 'bashundhara', 'jamuna_future_park', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur', 'tongi', 'station_road', 'mill_gate', 'board_bazar', 'gazipur'],
    type: 'Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'chhayabithi',
    name: 'Chhayabithi',
    bnName: 'ছায়াবীথি',
    routeString: 'Savar ⇄ Jatrabari',
    stops: ['savar', 'hemayetpur', 'gabtoli', 'technical', 'kallyanpur', 'shyamoli', 'asad_gate', 'kalabagan', 'science_lab', 'shahbag', 'press_club', 'gulistan', 'sayedabad', 'jatrabari'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bihanga',
    name: 'Bihanga',
    bnName: 'বিহঙ্গ',
    routeString: 'Mirpur 12 ⇄ Azimpur',
    stops: ['mirpur12', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'newmarket', 'nilkhet', 'azimpur'],
    type: 'Sitting',
    hours: '6:30 AM - 10:30 PM'
  },
  {
    id: 'projapoti',
    name: 'Projapoti',
    bnName: 'প্রজাপতি',
    routeString: 'Bosila ⇄ Abdullahpur',
    stops: ['bosila', 'mohammadpur', 'asad_gate', 'college_gate', 'shyamoli', 'kallyanpur', 'technical', 'mirpur1', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'paristhan',
    name: 'Paristhan',
    bnName: 'পরিস্থান',
    routeString: 'Bosila ⇄ Abdullahpur',
    stops: ['bosila', 'mohammadpur', 'asad_gate', 'college_gate', 'shyamoli', 'kallyanpur', 'technical', 'mirpur1', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'mes', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'alif_mirpur',
    name: 'Alif (Mirpur)',
    bnName: 'আলিফ (মিরপুর)',
    routeString: 'Mirpur 1 ⇄ Banasree',
    stops: ['mirpur1', 'mirpur2', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'wireless', 'gulshan1', 'badda', 'merul', 'rampura', 'banasree'],
    type: 'Local',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'alif_azampur',
    name: 'Alif (Azampur)',
    bnName: 'আলিফ (আজমপুর)',
    routeString: 'Mohammadpur ⇄ Abdullahpur',
    stops: ['mohammadpur', 'adabor', 'shyamoli', 'agargaon', 'bijoy_sarani', 'jahangir_gate', 'mohakhali', 'banani', 'kakali', 'kuril', 'khilkhet', 'airport', 'jashimuddin', 'rajlakshmi', 'azampur', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bahon',
    name: 'Bahon',
    bnName: 'বাহন',
    routeString: 'Mirpur 14 ⇄ Kamlapur',
    stops: ['mirpur14', 'mirpur10', 'mirpur2', 'mirpur1', 'technical', 'kallyanpur', 'shyamoli', 'asad_gate', 'dhanmondi27', 'kalabagan', 'science_lab', 'shahbag', 'press_club', 'paltan', 'motijheel', 'kamalapur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'bikalpa',
    name: 'Bikalpa',
    bnName: 'বিকল্প',
    routeString: 'Mirpur 12 ⇄ Motijheel',
    stops: ['mirpur12', 'pallabi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'khamar_bari', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'press_club', 'paltan', 'motijheel'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'shikhor',
    name: 'Shikhor',
    bnName: 'শিখর',
    routeString: 'Mirpur 12 ⇄ Jatrabari',
    stops: ['mirpur12', 'pallabi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'bijoy_sarani', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'high_court', 'press_club', 'paltan', 'gulistan', 'sayedabad', 'jatrabari'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'himachal',
    name: 'Himachal',
    bnName: 'হিমাচল',
    routeString: 'Mirpur 12 ⇄ Narayanganj',
    stops: ['mirpur12', 'pallabi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'farmgate', 'shahbag', 'gulistan', 'signboard', 'chashara', 'narayanganj'],
    type: 'Sitting',
    hours: '6:30 AM - 9:30 PM'
  },
  {
    id: 'transilva',
    name: 'Transilva',
    bnName: 'ট্রান্সিল্ভা',
    routeString: 'Mirpur 1 ⇄ Jatrabari',
    stops: ['mirpur1', 'technical', 'kallyanpur', 'shyamoli', 'asad_gate', 'dhanmondi27', 'kalabagan', 'science_lab', 'shahbag', 'press_club', 'paltan', 'gulistan', 'sayedabad', 'jatrabari'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'winner',
    name: 'Winner',
    bnName: 'উইনার',
    routeString: 'Azimpur ⇄ Kuril',
    stops: ['azimpur', 'newmarket', 'science_lab', 'kalabagan', 'panthapath', 'kawran_bazar', 'nabisco', 'mohakhali', 'gulshan1', 'badda', 'notun_bazar', 'bashundhara', 'jamuna_future_park', 'kuril'],
    type: 'Local',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'vip27',
    name: 'VIP 27',
    bnName: 'ভিআইপি ২৭',
    routeString: 'Azimpur ⇄ Gazipur',
    stops: ['azimpur', 'newmarket', 'kalabagan', 'asad_gate', 'khamar_bari', 'bijoy_sarani', 'mohakhali', 'banani', 'airport', 'uttara', 'abdullahpur', 'tongi', 'gazipur'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'bhuiyan',
    name: 'Bhuiyan',
    bnName: 'ভূঁইয়া',
    routeString: 'Mohammadpur ⇄ Abdullahpur',
    stops: ['mohammadpur', 'shyamoli', 'agargaon', 'bijoy_sarani', 'mohakhali', 'banani', 'airport', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'brtc_ac_motijheel',
    name: 'BRTC (AC)',
    bnName: 'বিআরটিসি (এসি)',
    routeString: 'Abdullahpur ⇄ Motijheel',
    stops: ['abdullahpur', 'uttara', 'airport', 'khilkhet', 'banani', 'mohakhali', 'farmgate', 'shahbag', 'paltan', 'motijheel'],
    type: 'AC',
    hours: '7:00 AM - 9:00 PM'
  },
  {
    id: 'achim',
    name: 'Achim Paribahan',
    bnName: 'আছিম পরিবহন',
    routeString: 'Gabtoli ⇄ Demra',
    stops: ['gabtoli', 'technical', 'mirpur1', 'mirpur2', 'mirpur10', 'kalshi', 'ecb', 'kuril', 'bashundhara', 'notun_bazar', 'badda', 'rampura', 'banasree', 'demra'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'agradut',
    name: 'Agradut',
    bnName: 'অগ্রদূত',
    routeString: 'Savar ⇄ Notun Bazar',
    stops: ['savar', 'hemayetpur', 'amin_bazar', 'gabtoli', 'technical', 'kallyanpur', 'shyamoli', 'agargaon', 'mohakhali', 'gulshan1', 'badda', 'notun_bazar'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ajmeri',
    name: 'Ajmeri Glory',
    bnName: 'আজমেরী গ্লোরী',
    routeString: 'Sadarghat ⇄ Chandra',
    stops: ['sadarghat', 'gulistan', 'paltan', 'mouchak', 'mohakhali', 'banani', 'airport', 'tongi', 'gazipur', 'chandra'],
    type: 'Local',
    hours: '5:30 AM - 10:00 PM'
  },
  {
    id: 'akik',
    name: 'Akik',
    bnName: 'আকিক',
    routeString: 'Ansar Camp ⇄ Badda',
    stops: ['ansar_camp', 'mirpur1', 'mirpur2', 'mirpur10', 'mirpur11', 'kalshi', 'ecb', 'kuril', 'bashundhara', 'notun_bazar', 'badda', 'uttar_badda'],
    type: 'Local',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'al_makka',
    name: 'Al Makka',
    bnName: 'আল মক্কা',
    routeString: 'Motijheel ⇄ Mirpur 1',
    stops: ['motijheel', 'gulistan', 'paltan', 'kakrail', 'mouchak', 'mogbazar', 'mohakhali', 'banani', 'kalshi', 'mirpur10', 'mirpur1'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'arnob',
    name: 'Arnob',
    bnName: 'অরনব',
    routeString: 'Hemayetpur ⇄ Demra',
    stops: ['hemayetpur', 'amin_bazar', 'gabtoli', 'technical', 'kallyanpur', 'shyamoli', 'agargaon', 'mohakhali', 'gulshan1', 'badda', 'rampura', 'banasree', 'demra'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ashulia_classic',
    name: 'Ashulia Classic',
    bnName: 'আশুলিয়া ক্লাসিক',
    routeString: 'Nobinagar ⇄ Satrasta',
    stops: ['nobinagar', 'baipayl', 'ashulia', 'abdullahpur', 'uttara', 'airport', 'khilkhet', 'kuril', 'kakali', 'mohakhali', 'nabisco', 'satrasta'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'asmani',
    name: 'Asmani',
    bnName: 'আসমানী',
    routeString: 'Dhour ⇄ Madanpur',
    stops: ['dhour', 'abdullahpur', 'uttara', 'airport', 'khilkhet', 'kuril', 'bashundhara', 'notun_bazar', 'badda', 'rampura', 'banasree', 'demra', 'signboard', 'madanpur'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'ayat',
    name: 'Ayat',
    bnName: 'আয়াত',
    routeString: 'Chiriyakhana ⇄ Kamalapur',
    stops: ['chiriyakhana', 'mirpur2', 'mirpur10', 'kazipara', 'agargaon', 'farmgate', 'kawran_bazar', 'mogbazar', 'malibagh', 'kamalapur'],
    type: 'Semi-Sitting',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'baishakhi',
    name: 'Baishakhi',
    bnName: 'বৈশাখী',
    routeString: 'Savar ⇄ Notun Bazar',
    stops: ['savar', 'hemayetpur', 'amin_bazar', 'gabtoli', 'technical', 'kallyanpur', 'shyamoli', 'agargaon', 'mohakhali', 'gulshan1', 'badda', 'notun_bazar'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'balaka',
    name: 'Balaka',
    bnName: 'বলাকা',
    routeString: 'Sayedabad ⇄ Gazipur',
    stops: ['sayedabad', 'kamalapur', 'malibagh', 'mogbazar', 'mohakhali', 'banani', 'airport', 'uttara', 'tongi', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'basumati',
    name: 'Basumati',
    bnName: 'বাসুমতি',
    routeString: 'Gabtoli ⇄ Gazipur',
    stops: ['gabtoli', 'mirpur1', 'mirpur10', 'kalshi', 'ecb', 'kuril', 'airport', 'uttara', 'tongi', 'gazipur'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dewan',
    name: 'Dewan',
    bnName: 'দেওয়ান',
    routeString: 'Azimpur ⇄ Kuril',
    stops: ['azimpur', 'newmarket', 'science_lab', 'shahbag', 'kawran_bazar', 'farmgate', 'mohakhali', 'gulshan1', 'badda', 'notun_bazar', 'kuril'],
    type: 'Local',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'dhaka_paribahan',
    name: 'Dhaka Paribahan',
    bnName: 'ঢাকা পরিবহন',
    routeString: 'Gulistan ⇄ Gazipur',
    stops: ['gulistan', 'shahbag', 'farmgate', 'mohakhali', 'banani', 'uttara', 'gazipur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'falgun',
    name: 'Falgun',
    bnName: 'ফাল্গুন',
    routeString: 'Azimpur ⇄ Uttara',
    stops: ['azimpur', 'newmarket', 'shahbag', 'kakrail', 'malibagh', 'rampura', 'badda', 'notun_bazar', 'kuril', 'airport', 'uttara'],
    type: 'Local',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'gazipur_paribahan',
    name: 'Gazipur Paribahan',
    bnName: 'গাজীপুর পরিবহন',
    routeString: 'Motijheel ⇄ Gazipur',
    stops: ['motijheel', 'paltan', 'kakrail', 'malibagh', 'mohakhali', 'banani', 'airport', 'uttara', 'tongi', 'gazipur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'jabale_noor',
    name: 'Jabale Noor',
    bnName: 'জাবালে নুর',
    routeString: 'Agargaon ⇄ Abdullahpur',
    stops: ['agargaon', 'shewrapara', 'mirpur10', 'pallabi', 'kalshi', 'kuril', 'airport', 'abdullahpur'],
    type: 'Semi-Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'kanak',
    name: 'Kanak',
    bnName: 'কনক',
    routeString: 'Mirpur 1 ⇄ Abdullahpur',
    stops: ['mirpur1', 'mirpur2', 'mirpur10', 'kalshi', 'ecb', 'kuril', 'airport', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:30 AM - 10:30 PM'
  },
  {
    id: 'labbaik',
    name: 'Labbaik',
    bnName: 'লাব্বাইক',
    routeString: 'Savar ⇄ Signboard',
    stops: ['savar', 'hemayetpur', 'gabtoli', 'shyamoli', 'asad_gate', 'farmgate', 'mogbazar', 'malibagh', 'bashabo', 'sayedabad', 'jatrabari', 'signboard'],
    type: 'Sitting',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'manjil',
    name: 'Manjil Express',
    bnName: 'মাঞ্জিল এক্সপ্রেস',
    routeString: 'Chittagong Road ⇄ Abdullahpur',
    stops: ['chittagong_road', 'signboard', 'jatrabari', 'sayedabad', 'gulistan', 'paltan', 'malibagh', 'mohakhali', 'banani', 'airport', 'abdullahpur'],
    type: 'Local',
    hours: '5:30 AM - 10:30 PM'
  },
  {
    id: 'modhumita',
    name: 'Modhumita',
    bnName: 'মধুমিতা',
    routeString: 'Chiriyakhana ⇄ Demra',
    stops: ['chiriyakhana', 'mirpur1', 'technical', 'shyamoli', 'agargaon', 'mohakhali', 'gulshan1', 'rampura', 'banasree', 'demra'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'moitri',
    name: 'Moitri',
    bnName: 'মৈত্রী',
    routeString: 'Mohammadpur ⇄ Arambagh',
    stops: ['mohammadpur', 'jigatola', 'science_lab', 'shahbag', 'press_club', 'gulistan', 'motijheel', 'arambagh'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'moumita',
    name: 'Moumita',
    bnName: 'মৌমিতা',
    routeString: 'Chashara ⇄ Chandra',
    stops: ['chashara', 'signboard', 'jatrabari', 'gulistan', 'azimpur', 'newmarket', 'kalabagan', 'shyamoli', 'technical', 'gabtoli', 'savar', 'nandan_park', 'chandra'],
    type: 'Local',
    hours: '5:30 AM - 10:00 PM'
  },
  {
    id: 'nur_e_makka',
    name: 'Nur E Makka',
    bnName: 'নূর এ মক্কা',
    routeString: 'Chiriyakhana ⇄ Malibagh',
    stops: ['chiriyakhana', 'mirpur2', 'mirpur10', 'kalshi', 'ecb', 'kuril', 'bashundhara', 'notun_bazar', 'badda', 'rampura', 'malibagh'],
    type: 'Sitting',
    hours: '5:30 AM - 10:30 PM'
  },
  {
    id: 'pallabi_super',
    name: 'Pallabi Super',
    bnName: 'পল্লবী সুপার',
    routeString: 'Gabtoli ⇄ Abdullahpur',
    stops: ['gabtoli', 'mirpur1', 'mirpur10', 'kalshi', 'ecb', 'kuril', 'airport', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 10:30 PM'
  },
  {
    id: 'rajanigandha',
    name: 'Rajanigandha',
    bnName: 'রজনীগন্ধা',
    routeString: 'Chittagong Road ⇄ Mohammadpur',
    stops: ['chittagong_road', 'signboard', 'jatrabari', 'gulistan', 'press_club', 'shahbag', 'science_lab', 'jigatola', 'mohammadpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'safety',
    name: 'Safety Druti',
    bnName: 'সেফটি দ্রুতি',
    routeString: 'Mirpur 12 ⇄ Azimpur',
    stops: ['mirpur12', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'khamar_bari', 'dhanmondi27', 'newmarket', 'azimpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'shatabdi',
    name: 'Shatabdi',
    bnName: 'শতাব্দি',
    routeString: 'Motijheel ⇄ Abdullahpur',
    stops: ['motijheel', 'paltan', 'malibagh', 'mohakhali', 'banani', 'airport', 'uttara', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'somoy',
    name: 'Somoy',
    bnName: 'সময়',
    routeString: 'Signboard ⇄ Mirpur 12',
    stops: ['signboard', 'jatrabari', 'gulistan', 'press_club', 'shahbag', 'kawran_bazar', 'farmgate', 'agargaon', 'kazipara', 'mirpur10', 'mirpur12'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'suprobhat',
    name: 'Suprovat',
    bnName: 'সুপ্রভাত',
    routeString: 'Sadarghat ⇄ Tongi',
    stops: ['sadarghat', 'gulistan', 'malibagh', 'rampura', 'badda', 'notun_bazar', 'kuril', 'airport', 'uttara', 'tongi'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'thikana',
    name: 'Thikana',
    bnName: 'ঠিকানা',
    routeString: 'Signboard ⇄ Chandra',
    stops: ['signboard', 'jatrabari', 'gulistan', 'azimpur', 'newmarket', 'shyamoli', 'technical', 'gabtoli', 'savar', 'nandan_park', 'chandra'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'trust',
    name: 'Trust Transport',
    bnName: 'ট্রাষ্ট ট্রান্সপোর্ট',
    routeString: 'Mirpur DOHS ⇄ Motijheel',
    stops: ['mirpur12', 'ecb', 'kachukhet', 'jahangir_gate', 'farmgate', 'shahbag', 'press_club', 'motijheel'],
    type: 'AC',
    hours: '7:00 AM - 9:00 PM'
  },
  {
    id: 'welcome',
    name: 'Welcome',
    bnName: 'ওয়েলকাম',
    routeString: 'Nandan Park ⇄ Motijheel',
    stops: ['nandan_park', 'savar', 'gabtoli', 'technical', 'shyamoli', 'asad_gate', 'farmgate', 'shahbag', 'press_club', 'gulistan', 'motijheel'],
    type: 'Sitting',
    hours: '5:30 AM - 10:30 PM'
  },
  // NEW ROUTES FROM DHAKA METRO FARE CHART VOL 1-5 (2022)
  {
    id: 'raja_city_malancha',
    name: 'Raja City / Malancha',
    bnName: 'রাজা সিটি / মালঞ্চ',
    routeString: 'Ghatarchar ⇄ Mohammadpur ⇄ Demra',
    stops: ['ghatar_char', 'washpur', 'bosila', 'mohammadpur', 'town_hall', 'asad_gate', 'farmgate', 'kawran_bazar', 'bangla_motor', 'shahbag', 'matsya_bhaban', 'kakrail', 'fokirapul', 'motijheel', 'tikatuli', 'kajla', 'konapara', 'demra'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'tanjil_savar',
    name: 'Tanjil / Savar',
    bnName: 'তানজিল / সাভার',
    routeString: 'Jagannath Univ ⇄ Gulistan ⇄ Chandra',
    stops: ['jagannath_university', 'fulbaria', 'paltan', 'kakrail', 'mogbazar', 'mohakhali', 'airport', 'tongi', 'gazipur', 'konabari', 'chandra'],
    type: 'Local',
    hours: '5:30 AM - 10:00 PM'
  },
  {
    id: 'meshkat_new',
    name: 'Meshkat',
    bnName: 'মেসকাত',
    routeString: 'Gabtoli ⇄ Mirpur 10 ⇄ Rampura',
    stops: ['gabtoli', 'technical', 'mirpur1', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'kakali', 'mohakhali', 'gulshan1', 'badda', 'merul', 'rampura'], // Approx based on chart
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'himalay_chart',
    name: 'Himalay',
    bnName: 'হিমালয়',
    routeString: 'Chiriyakhana ⇄ Jatrabari',
    stops: ['chiriyakhana', 'mirpur1', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'kuril', 'notun_bazar', 'badda', 'rampura', 'malibagh', 'mugdapara', 'sayedabad', 'jatrabari'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'ghatarchar_sonargaon',
    name: 'Ghatarchar-Sonargaon',
    bnName: 'ঘাটারচর-সোনারগাঁও',
    routeString: 'Ghatarchar ⇄ Mohammadpur ⇄ Sonargaon',
    stops: ['ghatar_char', 'bosila', 'mohammadpur', 'shankar', 'shyamoli', 'dhanmondi27', 'jigatola', 'science_lab', 'shahbag', 'press_club', 'gulistan', 'sayedabad', 'shonir_akhra', 'rayerbag', 'signboard', 'madanpur'], // Approx
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'uttara_ghatarchar',
    name: 'Uttara-Ghatarchar',
    bnName: 'উত্তরা-ঘাটারচর',
    routeString: 'Uttara (Diabari) ⇄ Mirpur ⇄ Ghatarchar',
    stops: ['diabari', 'uttara', 'abdullahpur', 'kamarpara', 'dhour', 'mirpur1', 'technical', 'shyamoli', 'asad_gate', 'mohammadpur', 'bosila', 'ghatar_char'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'signboard_nobinagar',
    name: 'Signboard-Nobinagar',
    bnName: 'সাইনবোর্ড-নবীনগর',
    routeString: 'Signboard ⇄ Farmgate ⇄ Nobinagar',
    stops: ['signboard', 'jatrabari', 'sayedabad', 'mugdapara', 'khilgaon', 'rajarbag', 'mogbazar', 'bangla_motor', 'farmgate', 'asad_gate', 'kallyanpur', 'gabtoli', 'savar', 'nobinagar'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'kamrangirchar_konabari',
    name: 'Kamrangirchar-Konabari',
    bnName: 'কামরাঙ্গীরচর-কোনাবাড়ী',
    routeString: 'Kamrangirchar ⇄ Mirpur ⇄ Konabari',
    stops: ['kamrangirchar', 'mohammadpur', 'asad_gate', 'technical', 'mirpur1', 'rupnagar', 'diabari', 'dhour', 'zirabo', 'konabari'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'manikdi_azimpur',
    name: 'Manikdi-Azimpur',
    bnName: 'মানিকদি-আজিমপুর',
    routeString: 'Manikdi ⇄ ECB ⇄ Azimpur',
    stops: ['manikdi', 'kalshi', 'mirpur11', 'mirpur10', 'kazipara', 'shewrapara', 'agargaon', 'shishu_mela', 'college_gate', 'shukrabad', 'newmarket', 'azimpur'],
    type: 'Local',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'japan_garden_dhour',
    name: 'Japan Garden-Dhour',
    bnName: 'জাপান গার্ডেন-ধউর',
    routeString: 'Adabor ⇄ Agargaon ⇄ Dhour',
    stops: ['adabor', 'shyamoli', 'agargaon', 'shewrapara', 'mirpur10', 'kalshi', 'ecb', 'airport', 'abdullahpur', 'dhour'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'banasree_savar',
    name: 'Banasree-Savar',
    bnName: 'বনশ্রী-সাভার',
    routeString: 'Banasree ⇄ Mohakhali ⇄ Savar',
    stops: ['banasree', 'rampura', 'gulshan1', 'mohakhali', 'agargaon', 'shyamoli', 'kallyanpur', 'gabtoli', 'amin_bazar', 'savar'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'basila_dhour',
    name: 'Bosila-Dhour',
    bnName: 'বসিলা-ধউর',
    routeString: 'Bosila ⇄ Mirpur ⇄ Dhour',
    stops: ['bosila', 'asad_gate', 'shyamoli', 'kallyanpur', 'technical', 'mirpur1', 'mirpur2', 'mirpur10', 'mirpur11', 'purobi', 'kalshi', 'ecb', 'kuril', 'airport', 'jashimuddin', 'abdullahpur', 'kamarpara', 'dhour'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'vashantek_nandan',
    name: 'Vashantek-Nandan',
    bnName: 'ভাষানটেক-নন্দন',
    routeString: 'Vashantek ⇄ Mirpur ⇄ Nandan Park',
    stops: ['vashantek', 'mirpur14', 'mirpur10', 'mirpur1', 'technical', 'gabtoli', 'hemayetpur', 'savar', 'nobinagar', 'nandan_park'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'kuril_azimpur',
    name: 'Kuril-Azimpur',
    bnName: 'কুড়িল-আজিমপুর',
    routeString: 'Kuril ⇄ Mohakhali ⇄ Azimpur',
    stops: ['kuril', 'notun_bazar', 'badda', 'gulshan1', 'mohakhali', 'farmgate', 'shahbag', 'science_lab', 'newmarket', 'azimpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'azimpur_dhour',
    name: 'Azimpur-Dhour',
    bnName: 'আজিমপুর-ধউর',
    routeString: 'Azimpur ⇄ Farmgate ⇄ Dhour',
    stops: ['azimpur', 'newmarket', 'kalabagan', 'asad_gate', 'shyamoli', 'technical', 'mirpur1', 'mirpur10', 'kalshi', 'kuril', 'airport', 'abdullahpur', 'kamarpara', 'dhour'], // Composite of segments
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dhour_madanpur',
    name: 'Dhour-Madanpur',
    bnName: 'ধউর-মদনপুর',
    routeString: 'Dhour ⇄ Airport ⇄ Madanpur',
    stops: ['dhour', 'abdullahpur', 'airport', 'kuril', 'badda', 'rampura', 'banasree', 'demra', 'signboard', 'madanpur'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'nobinagar_dhour',
    name: 'Nobinagar-Dhour',
    bnName: 'নবীনগর-ধউর',
    routeString: 'Nobinagar ⇄ Mirpur ⇄ Dhour',
    stops: ['nobinagar', 'savar', 'gabtoli', 'mirpur1', 'rupnagar', 'kalshi', 'kuril', 'airport', 'abdullahpur', 'kamarpara', 'dhour'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'signboard_fantasy',
    name: 'Signboard-Fantasy',
    bnName: 'সাইনবোর্ড-ফ্যান্টাসি',
    routeString: 'Signboard ⇄ Farmgate ⇄ Fantasy Kingdom',
    stops: ['signboard', 'jatrabari', 'gulistan', 'paltan', 'shahbag', 'farmgate', 'mohakhali', 'banani', 'airport', 'ashulia', 'fantasy_kingdom'],
    type: 'Sitting',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'gabtoli_rampura',
    name: 'Gabtoli-Rampura',
    bnName: 'গাবতলী-রামপুরা',
    routeString: 'Gabtoli ⇄ Mirpur 10 ⇄ Rampura',
    stops: ['gabtoli', 'technical', 'mirpur1', 'mirpur10', 'kalshi', 'ecb', 'kakali', 'gulshan1', 'merul', 'rampura'],
    type: 'Local',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    id: 'demra_nobinagar',
    name: 'Demra-Nobinagar',
    bnName: 'ডেমরা-নবীনগর',
    routeString: 'Demra ⇄ Banasree ⇄ Nobinagar',
    stops: ['demra', 'banasree', 'rampura', 'mouchak', 'kakrail', 'shahbag', 'science_lab', 'asad_gate', 'kallyanpur', 'gabtoli', 'savar', 'nobinagar'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'shialbari_kamalapur',
    name: 'Shialbari-Kamalapur',
    bnName: 'শিয়ালবাড়ী-কমলাপুর',
    routeString: 'Mirpur 2 ⇄ Farmgate ⇄ Kamalapur',
    stops: ['rupnagar', 'mirpur2', 'mirpur10', 'kazipara', 'agargaon', 'farmgate', 'mogbazar', 'malibagh', 'kamalapur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'gulistan_vulta',
    name: 'Gulistan-Vulta',
    bnName: 'গুলিস্তান-ভুলতা',
    routeString: 'Gulistan ⇄ Demra ⇄ Vulta',
    stops: ['gulistan', 'demra', 'rupganj', 'vulta'], // Simplified
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'madanpur_nandan',
    name: 'Madanpur-Nandan',
    bnName: 'মদনপুর-নন্দন',
    routeString: 'Madanpur ⇄ Signboard ⇄ Nandan Park',
    stops: ['madanpur', 'signboard', 'jatrabari', 'gulistan', 'farmgate', 'gabtoli', 'savar', 'nandan_park'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'kalampur_victoria',
    name: 'Kalampur-Victoria Park',
    bnName: 'কালামপুর-ভিক্টোরিয়া',
    routeString: 'Kalampur ⇄ Savar ⇄ Sadarghat',
    stops: ['dhamrai', 'savar', 'hemayetpur', 'gabtoli', 'technical', 'shyamoli', 'asad_gate', 'farmgate', 'shahbag', 'press_club', 'gulistan', 'victoria_park'],
    type: 'Local',
    hours: '5:30 AM - 9:00 PM'
  },
  {
    id: 'savar_amulia',
    name: 'Savar-Amulia',
    bnName: 'সাভার-আমুলিয়া',
    routeString: 'Savar ⇄ Banasree ⇄ Amulia',
    stops: ['savar', 'gabtoli', 'mirpur1', 'mirpur10', 'mohakhali', 'gulshan1', 'banasree', 'amulia'],
    type: 'Local',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'tongi_dhakeshwari',
    name: 'Tongi-Dhakeshwari',
    bnName: 'টঙ্গী-ঢাকেশ্বরী',
    routeString: 'Tongi ⇄ Mohakhali ⇄ Dhakeshwari',
    stops: ['tongi', 'azampur', 'mohakhali', 'farmgate', 'city_college', 'nilkhet', 'dhakeshwari'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'fulbaria_kapasia',
    name: 'Fulbaria-Kapasia',
    bnName: 'ফুলবাড়িয়া-কাপাসিয়া',
    routeString: 'Fulbaria ⇄ Gazipur ⇄ Kapasia',
    stops: ['fulbaria', 'mogbazar', 'mohakhali', 'banani', 'airport', 'tongi', 'gazipur', 'rajendrapur', 'kapasia'],
    type: 'Local',
    hours: '6:00 AM - 8:00 PM'
  },
  {
    id: 'sayedabad_gazipur',
    name: 'Sayedabad-Gazipur',
    bnName: 'সায়েদাবাদ-গাজীপুর',
    routeString: 'Sayedabad ⇄ Malibagh ⇄ Gazipur',
    stops: ['sayedabad', 'malibagh', 'satrasta', 'mohakhali', 'airport', 'tongi', 'board_bazar', 'gazipur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'kanchpur_tongi',
    name: 'Kanchpur-Tongi',
    bnName: 'কাঁচপুর-টঙ্গী',
    routeString: 'Kanchpur ⇄ Badda ⇄ Tongi',
    stops: ['signboard', 'jatrabari', 'bashabo', 'rampura', 'badda', 'kuril', 'airport', 'tongi'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'dhaleshwar_tongi',
    name: 'Dhaleshwar-Tongi',
    bnName: 'ধলেশ্বর-টঙ্গী',
    routeString: 'Dhaleshwar ⇄ Pragati Sarani ⇄ Tongi',
    stops: ['signboard', 'jatrabari', 'malibagh', 'kuril', 'abdullahpur', 'tongi'], // Approx
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'madanpur_abdullahpur',
    name: 'Madanpur-Abdullahpur',
    bnName: 'মদনপুর-আব্দুল্লাহপুর',
    routeString: 'Madanpur ⇄ Rampura ⇄ Abdullahpur',
    stops: ['madanpur', 'motijheel', 'malibagh', 'mohakhali', 'kakali', 'abdullahpur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'fulbaria_khasia',
    name: 'Fulbaria-Khasiakhali',
    bnName: 'ফুলবাড়িয়া-খাসিয়াখালী',
    routeString: 'Fulbaria ⇄ Paturia ⇄ Khasiakhali',
    stops: ['fulbaria', 'naya_bazar', 'keraniganj', 'maowa', 'paturia'], // Adjusted
    type: 'Local',
    hours: '6:00 AM - 8:00 PM'
  },
  {
    id: 'vulta_science_lab',
    name: 'Vulta-Science Lab',
    bnName: 'ভুলতা-সায়েন্সল্যাব',
    routeString: 'Vulta ⇄ Signboard ⇄ Science Lab',
    stops: ['vulta', 'signboard', 'jatrabari', 'gulistan', 'shahbag', 'science_lab'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'palashi_meghna',
    name: 'Palashi-Meghna',
    bnName: 'পলাশী-মেঘনা',
    routeString: 'Palashi ⇄ Jatrabari ⇄ Meghna Ghat',
    stops: ['palashi', 'eden_college', 'shahbag', 'gulistan', 'jatrabari', 'shonir_akhra', 'signboard', 'meghna_ghat'],
    type: 'Local',
    hours: '6:30 AM - 9:00 PM'
  },
  {
    id: 'mirpur_keraniganj',
    name: 'Mirpur-Keraniganj',
    bnName: 'মিরপুর-কেরানীগঞ্জ',
    routeString: 'Mirpur 1 ⇄ Gabtoli ⇄ Keraniganj',
    stops: ['mirpur1', 'ansar_camp', 'gabtoli', 'babubazar', 'keraniganj'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'basila_kamarpara',
    name: 'Bosila-Kamarpara',
    bnName: 'বসিলা-কামারপাড়া',
    routeString: 'Bosila ⇄ Mirpur ⇄ Kamarpara',
    stops: ['bosila', 'asad_gate', 'shyamoli', 'technical', 'mirpur1', 'mirpur10', 'kalshi', 'airport', 'kamarpara'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'gabtoli_gazipur',
    name: 'Gabtoli-Gazipur',
    bnName: 'গাবতলী-গাজীপুর',
    routeString: 'Gabtoli ⇄ Mirpur 10 ⇄ Gazipur',
    stops: ['gabtoli', 'mirpur1', 'mirpur10', 'kalshi', 'khilkhet', 'airport', 'abdullahpur', 'gazipur'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mirpur_beraid',
    name: 'Mirpur 1-Beraid',
    bnName: 'মিরপুর ১-বেরাইদ',
    routeString: 'Mirpur 1 ⇄ Gulshan ⇄ Beraid',
    stops: ['mirpur1', 'mirpur2', 'kachukhet', 'sainik_club', 'banani', 'mohakhali', 'gulshan1', 'badda', 'notun_bazar', 'beraid'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mirpur_dohs_motijheel',
    name: 'Mirpur DOHS-Motijheel',
    bnName: 'মিরপুর ডিওএইচএস-মতিঝিল',
    routeString: 'Mirpur DOHS ⇄ Farmgate ⇄ Motijheel',
    stops: ['mirpur12', 'ecb', 'kachukhet', 'jahangir_gate', 'farmgate', 'shahbag', 'gulistan', 'motijheel'],
    type: 'AC',
    hours: '7:00 AM - 9:00 PM'
  },
  {
    id: 'mirpur_new_jail',
    name: 'Mirpur-New Jail',
    bnName: 'মিরপুর-নিউ জেল',
    routeString: 'Chiriyakhana ⇄ Gabtoli ⇄ New Jail',
    stops: ['chiriyakhana', 'mirpur1', 'technical', 'gabtoli', 'babubazar', 'new_jail'],
    type: 'Local',
    hours: '6:00 AM - 8:00 PM'
  },
  {
    id: 'mirpur12_narayanganj',
    name: 'Mirpur 12-Narayanganj',
    bnName: 'মিরপুর ১২-নারায়ণগঞ্জ',
    routeString: 'Mirpur 12 ⇄ Farmgate ⇄ Narayanganj',
    stops: ['mirpur12', 'mirpur10', 'kazipara', 'farmgate', 'shahbag', 'gulistan', 'signboard', 'chashara', 'narayanganj'], // Generalized
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'shia_nobinagar',
    name: 'Shia Masjid-Nobinagar',
    bnName: 'শিয়া মসজিদ-নবীনগর',
    routeString: 'Shia Masjid ⇄ Gabtoli ⇄ Nobinagar',
    stops: ['shia_masjid', 'shyamoli', 'agargaon', 'mohakhali', 'banani', 'airport', 'abdullahpur', 'dhour', 'ashulia', 'nobinagar'], // Based on chart
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 'mirpur12_maowa',
    name: 'Mirpur 12-Maowa',
    bnName: 'মিরপুর ১২-মাওয়া',
    routeString: 'Mirpur 12 ⇄ Farmgate ⇄ Maowa',
    stops: ['mirpur12', 'mirpur10', 'farmgate', 'gulistan', 'babubazar', 'maowa'],
    type: 'Local',
    hours: '5:30 AM - 9:00 PM'
  },
  {
    id: 'uttara_sadarghat',
    name: 'Uttara-Sadarghat',
    bnName: 'উত্তরা-সদরঘাট',
    routeString: 'Uttara ⇄ Mohakhali ⇄ Sadarghat',
    stops: ['uttara', 'notun_bazar', 'rampura', 'malibagh', 'kakrail', 'victoria_park', 'sadarghat'],
    type: 'Local',
    hours: '6:00 AM - 10:00 PM'
  }
];