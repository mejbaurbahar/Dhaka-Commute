# 🚌 BRTC Routes Analysis & Integration Plan

**Date:** December 19, 2025  
**Source:** Bangladesh Road Transport Corporation Official Schedule

---

## 📊 **DATASET OVERVIEW**

### **Total Depots:** 20+ BRTC Depots
### **Estimated Routes:** 200-300+ routes
### **Coverage:** Nationwide (Dhaka, Divisions, Districts, Upazilas)

---

## 🏢 **DEPOT BREAKDOWN**

### **1. DHAKA METRO AREA DEPOTS** (Local & Intercity)

#### **Motijheel Depot (মতিঝিল)**
- **Intercity Routes:**
  - Dhaka-Khulna (AC)
  - Dhaka-Daudkandi (AC)
  - Dhaka-Araihazar (AC)
  - Dhaka-Ramganj-Lakshmipur (AC)
  - Dhaka-Madan (Non-AC)
  - Dhaka-Tarakanda (Non-AC)
  - Dhaka-Netrokona (Non-AC)
  - Dhaka-Katiadi (Non-AC)

- **Local Routes:**
  - Mugda-Tongi (Double Decker)
  - Mugda-Board Bazar (Double Decker)
  - Taltola-Secretariat (Women's Service)
  - Coca Cola-Secretariat (Women's)
  - Rampora-Banasree-Secretariat (Women's)

- **International:**
  - Dhaka-Kolkata
  - Dhaka-Agartala
  - Agartala-Dhaka-Kolkata

#### **Narayanganj Depot (নারায়ণগঞ্জ)**
- Gulistan-Gosairhat (AC)
- Gulistan-Madhukhali (AC)
- Kamalapur-Sakhipur (AC)
- Ghatarchar-Nalitabari (AC)
- Narayanganj-Gulistan (Double Decker)
- Ghatarchar-Kanchpur (Double Decker)

#### **Jatrabari Depot (যাত্রাবাড়ি)**
- Gulistan-Gauripur (AC & Daihatsu)
- Gulistan-Nabab ganj (Double Decker)
- Gulistan-Faridpur (AC)
- Jurain-Tongi (Double Decker)

#### **Gabtali Depot (গাবতলী)**
- Dhaka-Khulna (AC Intercity)
- Dhaka-Shyamnagar (AC City)
- Dhaka-Nalshiti (TATA)
- Mirpur-Kadomtoli (Double Decker City Service)

#### **Mirpur Depot (মিরপুর)**
- Barbar-Motijheel (Double Decker)
- Mirpur-Motijheel-Station Road
- Mirpur-Motijheel
- Gulistan-Mirzapur (AC)
- Kuril Bishwaroad-Bishnondi Ferry Ghat (AC)
- Dhaka-Lakshmipur (AC)
- Gulistan-Gosairhat (AC)
- Rayer Bag-Motijheel-Station Road
- Women's Bus Service (Multiple routes)
- Nagar Paribahan Route 26
- Elevated Expressway Service

#### **Kalyanpur Depot (কল্যাণপুর)**
- Dhaka (Kamalapur)-Lakshmipur (AC)
- Dhaka (Gulistan)-Khulna (AC)
- Mirpur-Kadomtoli (Double Decker & China CNG)

#### **Joarsahara Depot (জোয়ারসাহারা)**
- Kuril Bishwaroad-Itakhola (Daihatsu AC & Ashok AC)
- Kuril Bishwaroad-Bishnondi Ferry Ghat (AC)
- Dhaka (Kamalapur)-Lakshmipur (AC)
- Diabari-Uttara-Abdullahpur (Metro Rail Shuttle)
- Tongi-Motijheel (Double Decker)
- Jasimuddin-Khejur Bagan (Elevated Expressway)

#### **Mohammadpur Depot (মোহাম্মদপুর)**
- Mohammadpur-Kuril Bishwaroad via Farmgate
- Mohammadpur-Jigatola-Science Lab-Motijheel (Women's)
- Mohammadpur-Tongi-Motijheel
- Mirpur 10-Kadomtoli
- Ghatarchar-Kanchpur (City Service)
- Gulistan-Gosairhat
- Gulistan-Faridpur

---

### **2. DIVISIONAL DEPOT ROUTES**

#### **Khulna Depot (খুলনা)**
- 18 Routes including:
  - Khulna-Betagy, Khulna-Barguna, Khulna-Kuakata
  - Khulna-Barisal, Khulna-Chittagong
  - Khulna-Munshiganj, Khulna-Paharghata
  - Khulna-Shyamnagar, Jashore-Kuakata

#### **Chittagong Depot (চট্টগ্রাম)**
- 14+ Routes including:
  - Chittagong-Companiganj, Chittagong-Rangamati
  - Chittagong-Khagrachari, Chittagong-Tablachari
  - Chittagong-Sylhet, Chittagong-Sunamganj
  - City Service & School Bus Service
  - Tourist Bus (Open Top Double Decker to Sabrang)

#### **Barisal Depot (বারিশাল)**
- 26+ Routes including:
  - Barisal-Amuya, Barisal-Paharghata
  - Barisal-Kuakata (Multiple services)
  - Barisal-Khulna, Barisal-Rangpur
  - Barisal-Chapainawabganj
  - Barisal-Dhaka (AC)
  - Kuakata-Dhaka (AC)

#### **Sylhet Depot (সিলেট)**
- Sylhet-Jakiganj (TATA)
- Sylhet-Bholaganj (Double Decker)
- Sylhet-Tarakandi (TATA)
- Sylhet-Lakshmipur (AC)
- Sylhet-Azmeri ganj (TATA)
- Sunamganj-Dhaka (AC)
- Narsingdi-Dhaka (AC)

#### **Rangpur Depot (রংপুর)**
- 17+ Routes including:
  - Rangpur-Shyamnagar (Nightly)
  - Kurigram-Shyamnagar (Day)
  - Panchagarh-Mongla (Nightly)
  - Panchagarh-Chapai (AC Day)
  - Panchagarh-Pirojpur (Nightly)
  - Rangpur-Gopalganj
  - Multiple local routes

#### **Dinajpur Depot (দিনাজপুর)**
- 9 Routes including:
  - Dinajpur-Kuakata (AC)
  - Dinajpur-Benapole (AC)
  - Panchagarh-Lokshipasha (TATA)
  - Dinajpur-Chapainawabganj
  - Dinajpur-Rangpur

#### **Bogra Depot (বগুড়া)**
- 20+ Routes including:
  - Panchagarh-Patuakhali (Nightly AC)
  - Bhurunagamari-Gopalganj (Nightly AC)
  - Kurigram-Pirojpur (Nightly AC)
  - Bogra-Dinajpur (AC)
  - Panchagarh-Khulna (TATA)
  - Nitpur-Dhaka (Nightly AC)

#### **Mymensingh Depot (ময়মনসিংহ)**
- Ghatail-Maulvibazar (TATA Non-AC)
- Mymensingh-Bholaganj (TATA Non-AC)
- Dhaka-Lakshmipur (Ashok AC)
- Dhobaura-Dhaka (Ashok AC)
- Netrokona-Mongla (TATA Non-AC)
- Mymensingh-Nandail (Ashok Double Decker)

#### **Pabna Depot (পাসনা)**
- 20 Routes including:
  - Rajshahi-Amuya, Pabna-Kuakata
  - Rajshahi-Naogaon (AC), Pabna-Pathorghata
  - Kansat-Shyamnagar
  - Multiple local routes

#### **Sonapur Depot (সোনাপুর - Noakhali)**
- Sonapur-Sylhet-Chatak (TATA Non-AC)
- Sonapur-Sylhet-Jaflong (TATA Non-AC)
- Chandpur-Faridganj-Cox's Bazar (Ashok AC Intercity)
- Sonapur-Feni (Double Decker)

#### **Narsingdi Depot (নরসিংদী)**
- 18 Routes including:
  - Narsingdi-Dhaka (Gulistan) AC
  - Bhairab-Dhaka (Gulistan)
  - Tongi-Motijheel (Double Decker)
  - Abdullapur-Diabari (Metro shuttle)
  - Itakhola-Kuril (Daihatsu AC)
  - Mirpur-Sarupkathi (AC)
  - Bhairab-Dream Holiday Park-Kanchpur

#### **Tungipara Depot (টুঙ্গিপাড়া - Gopalganj)**
- Mujibnagar-Tungipara (TATA)
- Barisal-Khulna (via Gopalganj) AC
- Dhaka-Khulna (AC)
- Dhaka-Faridpur (AC)
- Dhaka-Chitalmari (AC)
- Mujibnagar-Rajshahi (AC)

---

## 🎯 **ROUTE CATEGORIES**

### **A. DHAKA LOCAL/CITY ROUTES** (Need to add to BUS_DATA)
- Double Decker city services
- Women's services
- Metro Rail shuttle services
- Elevated Expressway services
- Nagar Paribahan routes
- Total: ~30-40 local routes

### **B. DHAKA INTERCITY ROUTES** (Need to add to INTERCITY data)
- Dhaka to all divisions
- Dhaka to major districts
- AC & Non-AC services
- Total: ~50-70 intercity routes from Dhaka

### **C. REGIONAL INTERCITY ROUTES** (Need to add to INTERCITY data)
- Division to division routes
- District to district routes
- Long-distance nightly services
- Total: ~150-200 routes

---

## 📍 **MISSING STATIONS TO ADD**

Based on the BRTC data, these stations/stops are likely missing:

### **Dhaka Area:**
- Nagda (নগদা)
- CBS-2 (সিবিএস-২)
- Atir Bazar (আটির বাজার)
- Ful baria (ফুলবাড়িয়া)
- Sheikh Russel Park (শেখ রাসেল পার্ক)
- Golap Shah Mazar (গোলাপ শাহ মাজার)
- Toll Plaza (টোল প্লাজা)

### **Other Major Terminals:**
- Khulna New Market (খুলনা নিউমার্কেট)
- Khulna Fulbari Gate (খুলনা ফুলবাড়ী গেইট)
- Barisal Nothullabad (বরিশাল নথুল্লাবাদ)
- Chittagong CBT (চট্টগ্রাম সিবিটি)
- Sylhet Kadamtoli (সিলেট কদমতলী)
- Rangpur Medical More (রংপুর মেডিকেল মোড়)

And many more district terminals...

---

## ⚠️ **CHALLENGES & RECOMMENDATIONS**

### **Challenge 1: Volume**
- This dataset contains **200-300+ routes**
- Adding all manually would take **10-20 hours**
- File size would increase significantly

### **Challenge 2: Data Structure**
- BRTC routes have multiple service types (AC, Non-AC, Double Decker)
- Same route may have multiple timings
- Need to decide how to represent this

### **Challenge 3: Categorization**
- Need to separate **Dhaka local** vs **intercity**
- Need to handle **depot-based** routing

---

## 🎯 **RECOMMENDED APPROACH**

### **Option 1: Phased Implementation** ⭐ RECOMMENDED
1. **Phase 1:** Add only Dhaka local routes (~30-40 routes)
2. **Phase 2:** Add Dhaka intercity routes (~50-70 routes)
3. **Phase 3:** Add major regional routes (~100 routes)
4. **Phase 4:** Add remaining routes

### **Option 2: Priority Routes Only**
- Add only **AC routes** (premium service)
- Add only routes **> 100km**
- Skip duplicate services

### **Option 3: Full Import**
- Create automated parser
- Import all routes
- May require database restructuring

---

## 📋 **IMMEDIATE NEXT STEPS**

Please choose one:

### **A) Start with Dhaka Local Routes** (Recommended for quick win)
- ~30-40 routes
- Can complete in 2-3 hours
- Immediate value for Dhaka users

### **B) Start with Top 50 Intercity Routes**
- Focus on AC routes
- Popular destinations
- Can complete in 3-4 hours

### **C) Full Import (All Routes)**
- Requires automated approach
- Will take 1-2 days
- Most comprehensive

---

## 📊 **CURRENT STATUS**

- ✅ **Analysis Complete**
- ✅ **Missing stations identified**
- ⏳ **Awaiting user decision on implementation approach**

---

**What would you like to do?**
1. Start with Dhaka local routes only?
2. Start with top intercity routes?
3. Attempt full import?
4. Focus on specific depots/regions?

