// Hand-authored "things to do" for tourist/historical destinations.
// Works offline — no network needed. Keyed by Place.id from bangladeshPlaces.ts.

export interface ThingToDo {
  en: string;
  bn: string;
}

export const DESTINATION_THINGS_TO_DO: Record<string, ThingToDo[]> = {
  ahsan_manzil: [
    { en: 'Tour the Nawab-era palace museum rooms', bn: 'নবাব আমলের প্রাসাদ যাদুঘরের কক্ষগুলো ঘুরে দেখুন' },
    { en: 'Photograph the iconic pink facade from the river side', bn: 'নদীর পাশ থেকে আইকনিক গোলাপি সম্মুখভাগের ছবি তুলুন' },
    { en: 'Visit the Dhaka gallery and antique furniture sections', bn: 'ঢাকা গ্যালারি ও প্রাচীন আসবাবপত্র অংশ দেখুন' },
    { en: 'Take a Buriganga river boat ride from the nearby ghat', bn: 'কাছের ঘাট থেকে বুড়িগঙ্গা নদীতে নৌকায় চড়ুন' },
  ],
  lalbagh_fort: [
    { en: 'Walk the Mughal-era gardens and central mosque', bn: 'মুঘল আমলের বাগান ও কেন্দ্রীয় মসজিদে ঘুরুন' },
    { en: 'See the tomb of Pari Bibi', bn: 'পরি বিবির সমাধি দেখুন' },
    { en: 'Visit the museum inside the fort (Tue-Sun)', bn: 'কেল্লার ভেতরের যাদুঘর দেখুন (মঙ্গল-রবি)' },
    { en: 'Go early morning to avoid crowds', bn: 'ভিড় এড়াতে ভোরে যান' },
  ],
  pori_bibi_tomb: [
    { en: 'View the 17th-century Mughal marble tomb', bn: '১৭শ শতকের মুঘল মার্বেল সমাধি দেখুন' },
    { en: 'Combine with the main Lalbagh Fort ticket', bn: 'লালবাগ কেল্লার মূল টিকিটের সাথে একত্রে দেখুন' },
  ],
  shaheed_minar: [
    { en: 'Pay respects at the Language Movement martyrs monument', bn: 'ভাষা আন্দোলনের শহীদদের স্মৃতিস্তম্ভে শ্রদ্ধা জানান' },
    { en: 'Visit at night when the minar is illuminated', bn: 'আলোকিত অবস্থায় রাতে দেখতে যান' },
    { en: 'Walk through Dhaka University campus nearby', bn: 'কাছের ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাসে হাঁটুন' },
    { en: 'Visit on 21 February (Ekushey) for the grand procession', bn: '২১ ফেব্রুয়ারি (একুশে) শহীদ দিবসে প্রভাতফেরি দেখুন' },
  ],
  museum_of_independence: [
    { en: 'Explore six galleries covering 1905-1971 history', bn: '১৯০৫-১৯৭১ ইতিহাসের ছয়টি গ্যালারি ঘুরে দেখুন' },
    { en: 'See the preserved Pakistani military surrender documents', bn: 'সংরক্ষিত পাকিস্তানি সেনা আত্মসমর্পণের দলিল দেখুন' },
    { en: 'Watch the 3D mapping show', bn: '৩ডি ম্যাপিং শো দেখুন' },
    { en: 'Visit the glass tower monument at Sohrawardi Udyan', bn: 'সোহরাওয়ার্দী উদ্যানের কাচের টাওয়ার স্মৃতিস্তম্ভ দেখুন' },
  ],
  ramna_park: [
    { en: 'Morning jog around the 68-acre green park', bn: '৬৮ একর সবুজ পার্কে সকালে জগিং করুন' },
    { en: 'Birdwatch by the central lake', bn: 'কেন্দ্রীয় লেকের পাশে পাখি দেখুন' },
    { en: 'Visit the Ramna Kali Mandir on the east side', bn: 'পূর্ব পাশের রমনা কালী মন্দির দেখুন' },
    { en: 'Picnic with family on weekends', bn: 'সাপ্তাহিক ছুটিতে পরিবার নিয়ে পিকনিক করুন' },
  ],
  ruplal_house: [
    { en: 'Photograph the 19th-century Indo-Saracenic mansion', bn: '১৯শ শতকের ইন্দো-সারাসেনিক প্রাসাদটির ছবি তুলুন' },
    { en: 'Walk the old Wari neighborhood lanes', bn: 'পুরনো ওয়ারী এলাকার গলিগুলোতে হাঁটুন' },
    { en: 'Enjoy the Buriganga river view from the balcony', bn: 'বারান্দা থেকে বুড়িগঙ্গা নদীর দৃশ্য উপভোগ করুন' },
  ],
  star_mosque: [
    { en: 'Admire the star-and-mosaic-tile decorated dome', bn: 'তারকা ও মোজাইক টালিতে সজ্জিত গম্বুজ দেখুন' },
    { en: 'Visit after Asr prayer for fewer visitors', bn: 'আসরের পর কম দর্শক থাকলে যান' },
    { en: 'Combine with nearby Armanitola sights', bn: 'কাছের আরমানিটোলার দর্শনীয় স্থানগুলো একসাথে দেখুন' },
  ],
  national_museum_dhaka: [
    { en: 'Browse galleries: history, art, natural history, world civilizations', bn: 'গ্যালারি দেখুন: ইতিহাস, শিল্প, প্রাকৃতিক ইতিহাস, বিশ্ব সভ্যতা' },
    { en: 'See the Shilpacharya Zainul Abedin art collection', bn: 'শিল্পাচার্য জয়নুল আবেদিনের শিল্প সংগ্রহ দেখুন' },
    { en: 'Visit the planetarium hall inside', bn: 'ভেতরের প্ল্যানেটোরিয়াম হল দেখুন' },
    { en: 'Budget 2-3 hours for a full tour', bn: 'সম্পূর্ণ ভ্রমণে ২-৩ ঘণ্টা রাখুন' },
  ],
  liberation_war_museum: [
    { en: 'Tour galleries covering the 1971 liberation war', bn: '১৯৭১ সালের মুক্তিযুদ্ধের গ্যালারিগুলো ঘুরে দেখুন' },
    { en: 'See photographs, documents and personal items of freedom fighters', bn: 'মুক্তিযোদ্ধাদের ছবি, দলিল ও ব্যক্তিগত জিনিস দেখুন' },
    { en: 'Watch the documentary screening', bn: 'প্রামাণ্যচিত্র প্রদর্শনী দেখুন' },
    { en: 'Visit the Heroes\' Gallery with martyred intellectuals', bn: 'শহীদ বুদ্ধিজীবীদের হিরোস গ্যালারি দেখুন' },
  ],
  national_parliament: [
    { en: 'Photograph Louis Kahn\'s iconic architecture from the lake side', bn: 'লেকের পাশ থেকে লুই কানের আইকনিক স্থাপত্যের ছবি তুলুন' },
    { en: 'Take the guided tour inside (registration required)', bn: 'ভেতরে গাইডেড ট্যুর নিন (রেজিস্ট্রেশন লাগবে)' },
    { en: 'View the parliament building illuminated at night', bn: 'রাতে আলোকিত সংসদ ভবন দেখুন' },
    { en: 'Walk the surrounding Crescent Lake area', bn: 'পাশের ক্রিসেন্ট লেক এলাকায় হাঁটুন' },
  ],
  hatirjheel: [
    { en: 'Walk or cycle the lakefront promenade', bn: 'লেকের পাশের হাঁটার পথে হাঁটুন বা সাইকেল চালান' },
    { en: 'Cross the iconic curved bridge over the lake', bn: 'লেকের ওপর আইকনিক বাঁকানো সেতু পার হন' },
    { en: 'Evening light show and fountain views', bn: 'সন্ধ্যায় আলোর শো ও ফোয়ারার দৃশ্য দেখুন' },
    { en: 'Street food around the area', bn: 'এলাকার স্ট্রিট ফুড খান' },
  ],
  dhaka_zoo: [
    { en: 'See the Royal Bengal Tiger and lions', bn: 'রয়েল বেঙ্গল টাইগার ও সিংহ দেখুন' },
    { en: 'Elephant ride and children\'s corner', bn: 'হাতির পিঠে চড়া ও শিশুদের কর্নার' },
    { en: 'Visit the reptile house and aviary', bn: 'সরীসৃপ ঘর ও পাখির ঘর দেখুন' },
    { en: 'Go early morning (opens 9am)', bn: 'ভোরে যান (সকাল ৯টায় খোলে)' },
  ],
  national_botanical_garden: [
    { en: 'Explore 80+ hectares of plants, including a bonsai garden', bn: '৮০+ হেক্টর উদ্ভিদ, বনসাই বাগানসহ ঘুরে দেখুন' },
    { en: 'Birdwatch in the wetland areas', bn: 'জলাভূমি এলাকায় পাখি দেখুন' },
    { en: 'Visit the orchid house', bn: 'অর্কিড হাউস দেখুন' },
    { en: 'Picnic on the open lawns', bn: 'খোলা লনে পিকনিক করুন' },
  ],
  baldha_garden: [
    { en: 'See rare plant species in a 19th-century garden', bn: '১৯শ শতকের বাগানে বিরল প্রজাতির উদ্ভিদ দেখুন' },
    { en: 'Photograph the old mansion ruins', bn: 'পুরনো প্রাসাদের ধ্বংসাবশেষের ছবি তুলুন' },
    { en: 'Visit during bloom seasons (spring)', bn: 'ফুলের মৌসুমে (বসন্ত) যান' },
  ],
  dhaka_university: [
    { en: 'Walk the historic Curzon Hall campus', bn: 'ঐতিহাসিক কার্জন হল ক্যাম্পাসে হাঁটুন' },
    { en: 'Visit the Aparajeyo Bangla sculpture', bn: 'অপরাজেয় বাংলা ভাস্কর্য দেখুন' },
    { en: 'See the Teacher-Student Centre (TSC) area', bn: 'শিক্ষক-শিক্ষার্থী কেন্দ্র (টিএসসি) এলাকা দেখুন' },
    { en: 'Try the street food at TSC crossing', bn: 'টিএসসি মোড়ের স্ট্রিট ফুড খান' },
  ],
  coxs_bazar: [
    { en: 'Walk the 120 km world\'s longest natural sea beach', bn: 'বিশ্বের দীর্ঘতম ১২০ কিমি প্রাকৃতিক সমুদ্র সৈকতে হাঁটুন' },
    { en: 'Watch sunset at Laboni or Sugandha point', bn: 'লাবণী বা সুগন্ধা পয়েন্টে সূর্যাস্ত দেখুন' },
    { en: 'Horse riding on the beach', bn: 'সৈকতে ঘোড়ায় চড়ুন' },
    { en: 'Seafood dinner at the beach-side restaurants', bn: 'সৈকতের রেস্টুরেন্টে সামুদ্রিক খাবারের ডিনার করুন' },
    { en: 'Visit Himchari waterfall and national park (12 km)', bn: 'হিমছড়ি ঝরনা ও জাতীয় উদ্যান দেখুন (১২ কিমি)' },
  ],
  inani_beach: [
    { en: 'Swim in the calm water away from Cox\'s Bazar crowds', bn: 'কক্সবাজারের ভিড় থেকে দূরে শান্ত পানিতে গোসল করুন' },
    { en: 'Collect seashells on the rocky shore', bn: 'পাথুরে তীরে ঝিনুক সংগ্রহ করুন' },
    { en: 'Photograph the golden sunset', bn: 'সোনালি সূর্যাস্তের ছবি তুলুন' },
    { en: 'Stay at a beach resort for a quiet getaway', bn: 'শান্ত অবকাশের জন্য বিচ রিসোর্টে থাকুন' },
  ],
  saint_martin: [
    { en: 'Swim and snorkel at the clear-water beaches', bn: 'স্বচ্ছ পানির সৈকতে সাঁতার কাটুন ও স্নরকেলিং করুন' },
    { en: 'See the coral island\'s only village and lighthouse', bn: 'প্রবাল দ্বীপের গ্রাম ও বাতিঘর দেখুন' },
    { en: 'Sunset boat ride around the island', bn: 'দ্বীপের চারপাশে সূর্যাস্তের নৌকাভ্রমণ করুন' },
    { en: 'Buy fresh fish from the local fishermen', bn: 'স্থানীয় জেলেদের কাছ থেকে টাটকা মাছ কিনুন' },
    { en: 'Take the Teknaf ferry (2-3 hrs, seasonal)', bn: 'টেকনাফ ফেরিতে যান (২-৩ ঘণ্টা, মৌসুমি)' },
  ],
  sundarbans: [
    { en: 'Cruise the mangrove waterways on a tour boat', bn: 'ট্যুর বোটে ম্যানগ্রোভ জলপথে ক্রুজ করুন' },
    { en: 'Spot the Royal Bengal Tiger (rare — look for pugmarks)', bn: 'রয়েল বেঙ্গল টাইগার দেখার চেষ্টা করুন (দুর্লভ — পায়ের ছাপ দেখুন)' },
    { en: 'Visit the Karamjal deer & monkey sanctuary', bn: 'করমজল হরিণ ও বানর অভয়ারণ্য দেখুন' },
    { en: 'See the Hiron Point lighthouse view', bn: 'হিরণ পয়েন্টের বাতিঘর দৃশ্য দেখুন' },
    { en: 'Tour the Katka forest camps and eco-tour zones', bn: 'কটকা বন ক্যাম্প ও ইকো-ট্যুর অঞ্চল ঘুরে দেখুন' },
  ],
  ratargul: [
    { en: 'Boat ride through the flooded swamp forest', bn: 'ডুবে যাওয়া জলাভূমি বনে নৌকায় ঘুরুন' },
    { en: 'See submerged tree trunks in the lake water', bn: 'লেকের পানিতে ডুবে থাকা গাছের গুঁড়ি দেখুন' },
    { en: 'Birdwatch — herons, kingfishers and more', bn: 'পাখি দেখুন — বক, মাছরাঙাসহ আরও অনেক' },
    { en: 'Best visited in monsoon (July-September) when flooded', bn: 'বর্ষায় (জুলাই-সেপ্টেম্বর) প্লাবিত অবস্থায় দেখুন' },
  ],
  jaflong: [
    { en: 'See the Khasia hills and stone collection riverbank', bn: 'খাসিয়া পাহাড় ও পাথর সংগ্রহকারীদের নদীতীর দেখুন' },
    { en: 'Boat ride on the Piyain river', bn: 'পিয়াইন নদীতে নৌকায় ঘুরুন' },
    { en: 'Photograph the waterfalls and the river view', bn: 'ঝরনা ও নদীর দৃশ্যের ছবি তুলুন' },
    { en: 'Buy Jaflong shidol (dried fish) from the market', bn: 'জাফলংয়ের শুঁটকি (শুকনা মাছ) কিনুন' },
  ],
  srimangal: [
    { en: 'Walk endless tea gardens at sunrise', bn: 'সূর্যোদয়ে অফুরন্ত চা বাগানে হাঁটুন' },
    { en: 'Tour the Tea Museum and research centre', bn: 'চা জাদুঘর ও গবেষণা কেন্দ্র দেখুন' },
    { en: 'See the Manipuri weaving and culture', bn: 'মণিপুরি শাড়ি বুনন ও সংস্কৃতি দেখুন' },
    { en: 'Trek the Lawachara forest trails', bn: 'লাউয়াছড়া বনের পথে ট্রেক করুন' },
    { en: 'Taste seven-layer tea at local cafes', bn: 'স্থানীয় ক্যাফেতে সেভেন-লেয়ার চা খান' },
  ],
  lawachara: [
    { en: 'Canopy walk through the rainforest (entry fee applies)', bn: 'রেইনফরেস্টে ক্যানোপি ওয়াক করুন (প্রবেশ ফি লাগে)' },
    { en: 'Spot gibbons, langurs and hornbills', bn: 'গিবন, লেঙ্গুর ও হর্নবিল দেখুন' },
    { en: 'Trek to the tribal village viewpoints', bn: 'উপজাতীয় গ্রামের ভিউপয়েন্টে ট্রেক করুন' },
    { en: 'Hire a local guide for the forest trails', bn: 'বনের পথে স্থানীয় গাইড নিন' },
  ],
  bandarban: [
    { en: 'Ride to Nilgiri for sunrise over the hills', bn: 'নীলগিরিতে সূর্যোদয় দেখতে যান' },
    { en: 'Visit the highest peak trail at Tahjindong', bn: 'তাজিংডং চূড়ার পথ দেখুন' },
    { en: 'See the Buddhist temple at Ujani Marma village', bn: 'উজানী মারমা গ্রামের বৌদ্ধ মন্দির দেখুন' },
    { en: 'Bamboo rafting on the Sangu river', bn: 'সাঙ্গু নদীতে বাঁশের ভেলা চড়ুন' },
    { en: 'Explore the Marma and Tripura tribal markets', bn: 'মারমা ও ত্রিপুরা উপজাতীয় হাট দেখুন' },
  ],
  nilgiri: [
    { en: 'Watch the famous Nilgiri sunrise', bn: 'নীলগিরির বিখ্যাত সূর্যোদয় দেখুন' },
    { en: 'Stay at the hilltop resort cabins', bn: 'পাহাড়চূড়ার রিসোর্ট কেবিনে থাকুন' },
    { en: 'Photograph the layered hill views', bn: 'স্তরে স্তরে পাহাড়ের দৃশ্যের ছবি তুলুন' },
    { en: 'Drive the winding Thanchi road', bn: 'থানচি যাওয়ার পথচক্কর দিয়ে ড্রাইভ করুন' },
  ],
  rangamati: [
    { en: 'Boat trip on the vast Kaptai Lake', bn: 'বিশাল কাপ্তাই হ্রদে বোট ট্রিপ করুন' },
    { en: 'Visit the traditional Rajbari (King\'s Palace)', bn: 'ঐতিহ্যবাহী রাজবাড়ি দেখুন' },
    { en: 'See the Buddhist pagodas of the Chakma people', bn: 'চাকমা জনগোষ্ঠীর বৌদ্ধ প্যাগোডা দেখুন' },
    { en: 'Handloom market for traditional textiles', bn: 'ঐতিহ্যবাহী তাঁতের কাপড়ের হাট দেখুন' },
    { en: 'Evening lake-side walk at the town ghat', bn: 'শহরের ঘাটে সন্ধ্যায় লেকের পাশে হাঁটুন' },
  ],
  kaptai_lake: [
    { en: 'Day-long boat cruise on the lake', bn: 'হ্রদে সারাদিনের বোট ক্রুজ করুন' },
    { en: 'Visit the submerged Shuvolong waterfall area', bn: 'ডুবে যাওয়া সুবলং ঝরনা এলাকা দেখুন' },
    { en: 'Stop at the floating fish farms', bn: 'ভাসমান মাছের খামার দেখুন' },
    { en: 'Fishing with local boatmen', bn: 'স্থানীয় নৌকার সাথে মাছ ধরুন' },
  ],
  kuakata: [
    { en: 'Watch both sunrise and sunset over the Bay of Bengal', bn: 'বঙ্গোপসাগরে সূর্যোদয় ও সূর্যাস্ত দুটোই দেখুন' },
    { en: 'Walk the 30 km sea beach', bn: '৩০ কিমি সমুদ্র সৈকতে হাঁটুন' },
    { en: 'See the Buddhist temples of the Rakhine community', bn: ' রাখাইন সম্প্রদায়ের বৌদ্ধ মন্দির দেখুন' },
    { en: 'Shrimp curry at the beach restaurants', bn: 'সৈকতের রেস্টুরেন্টে চিংড়ি কারি খান' },
    { en: 'Boat ride to the Gangamati reserve forest', bn: 'গঙ্গামতী সংরক্ষিত বনে নৌকায় যান' },
  ],
  bagerhat_mosque: [
    { en: 'Marvel at the 60-dome Unesco-listed mosque (15th century)', bn: '১৫শ শতকের ৬০ গম্বুজ ইউনেস্কো তালিকাভুক্ত মসজিদ দেখুন' },
    { en: 'Explore the Shait Gumbad mosque complex ruins', bn: 'শাইত গুম্বদ মসজিদ কমপ্লেক্সের ধ্বংসাবশেষ ঘুরে দেখুন' },
    { en: 'Visit nearby Ghora Dighi pond and mausoleums', bn: 'কাছের ঘোড়া দিঘি ও সমাধিসৌধ দেখুন' },
    { en: 'Photograph the brickwork in golden hour light', bn: 'গোল্ডেন আওয়ারে ইটের কারুকার্যের ছবি তুলুন' },
  ],
  paharpur: [
    { en: 'Explore the largest Buddhist vihara in South Asia (Unesco)', bn: 'দক্ষিণ এশিয়ার বৃহত্তম বৌদ্ধ বিহার দেখুন (ইউনেস্কো)' },
    { en: 'Walk the central cruciform temple mound', bn: 'কেন্দ্রীয় ক্রুশাকৃতি মন্দিরের ঢিবিতে হাঁটুন' },
    { en: 'Visit the onsite museum with terracotta plaques', bn: 'টেরাকোটা ফলকসহ অনসাইট জাদুঘর দেখুন' },
    { en: 'Sunset view over the ancient ruins', bn: 'প্রাচীন ধ্বংসাবশেষের ওপর সূর্যাস্ত দেখুন' },
  ],
  mahasthangarh: [
    { en: 'Walk the 2,500-year-old fortified city remains', bn: '২,৫০০ বছর পুরনো দুর্গ শহরের ধ্বংসাবশেষে হাঁটুন' },
    { en: 'Visit the museum with Pala-era artifacts', bn: 'পাল যুগের নিদর্শনসহ জাদুঘর দেখুন' },
    { en: 'See the Govinda Bhita temple site', bn: 'গোবিন্দ ভিটা মন্দির স্থান দেখুন' },
    { en: 'Explore the surrounding village and river', bn: 'আশপাশের গ্রাম ও নদী ঘুরে দেখুন' },
  ],
  kusumba_mosque: [
    { en: 'Admire the mid-16th century Mughal-style mosque', bn: '১৬শ শতকের মাঝামাঝি মুঘল-শৈলীর মসজিদ দেখুন' },
    { en: 'Photograph the stone-carved terracotta plaques', bn: 'পাথরে খোদাই করা টেরাকোটা ফলকের ছবি তুলুন' },
    { en: 'Combine with a Naogaon village tour', bn: 'নওগাঁ গ্রাম ভ্রমণের সাথে মিলিয়ে নিন' },
  ],
  mainamati: [
    { en: 'Explore the Buddhist archaeological ruins of Shalban Vihara', bn: 'শালবন বিহারের বৌদ্ধ ধ্বংসাবশেষ ঘুরে দেখুন' },
    { en: 'Visit the Mainamati Museum with bronze artifacts', bn: 'ব্রোঞ্জ নিদর্শনসহ ময়নামতি জাদুঘর দেখুন' },
    { en: 'Climb the Kutila Mura stupa mound', bn: 'কুটিলা মুরা স্তূপের ঢিবিতে উঠুন' },
    { en: 'Day-trip from Cumilla town (10 km)', bn: 'কুমিল্লা শহর থেকে দিনের ভ্রমণ করুন (১০ কিমি)' },
  ],
  kantajew_temple: [
    { en: 'Admire the ornate terracotta Hindu temple (1752)', bn: '১৭৫২ সালের কারুকাজে ভরা হিন্দু মন্দির দেখুন' },
    { en: 'Photograph the elaborate wall panels', bn: 'দেয়ালের বিস্তৃত ফলকের ছবি তুলুন' },
    { en: 'Visit the adjacent pond and ruins', bn: 'পাশের পুকুর ও ধ্বংসাবশেষ দেখুন' },
    { en: 'Combine with Dinajpur town tour', bn: 'দিনাজপুর শহর ভ্রমণের সাথে মিলিয়ে নিন' },
  ],
  sylhet_shrine: [
    { en: 'Pay respects at Hazrat Shah Jalal\'s dargah', bn: 'হযরত শাহজালাল (রহ.)-এর দরগায় শ্রদ্ধা জানান' },
    { en: 'Visit the sacred pond with fish', bn: 'পবিত্র মাছের পুকুরটি দেখুন' },
    { en: 'Walk the surrounding mosque complex', bn: 'আশপাশের মসজিদ কমপ্লেক্সে হাঁটুন' },
    { en: 'Best visited after Asr for quieter atmosphere', bn: 'আসরের পর শান্ত পরিবেশে যান' },
  ],
  nijhum_dwip: [
    { en: 'Walk the silent island\'s green mangrove forests', bn: 'শান্ত দ্বীপের সবুজ ম্যানগ্রোভ বনে হাঁটুন' },
    { en: 'See spotted deer roaming free', bn: 'স্বাধীনভাবে ঘোরাফেরা করা চিত্রা হরিণ দেখুন' },
    { en: 'Watch birds at the sanctuary', bn: 'অভয়ারণ্যে পাখি দেখুন' },
    { en: 'Overnight stay at the island guesthouse', bn: 'দ্বীপের গেস্টহাউসে রাত কাটান' },
    { en: 'Boat crossing from Hatia (1-2 hrs)', bn: 'হাটিয়া থেকে নৌকায় পারাপার (১-২ ঘণ্টা)' },
  ],
  teknaf: [
    { en: 'Visit the Teknaf wildlife sanctuary forests', bn: 'টেকনাফ বন্যপ্রাণী অভয়ারণ্যের বন দেখুন' },
    { en: 'Take the ferry jetty to Saint Martin\'s', bn: 'সেন্ট মার্টিন যাওয়ার ফেরি ঘাটে যান' },
    { en: 'See the Naf river border area', bn: 'নাফ নদীর সীমান্ত এলাকা দেখুন' },
    { en: 'Sunset at the river mouth', bn: 'নদীর মোহনায় সূর্যাস্ত দেখুন' },
  ],
};
