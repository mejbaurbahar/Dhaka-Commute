# AI Assistant Test Prompts

## Local Dhaka Bus Queries (Existing Functionality)

### Bengali Queries:
1. "মিরপুর ১০ থেকে বনানী যাওয়ার উপায় কি?"
2. "ফার্মগেটের জন্য সেরা বাস কোনটি?"
3. "উত্তরা থেকে মতিঝিল যেতে কোন বাস ধরবো?"
4. "সদরঘাট থেকে মিরপুর যাওয়ার রুট কি?"

### English Queries:
1. "How to go from Farmgate to Banani?"
2. "Which bus goes to Gulshan from Mohakhali?"
3. "Best route from Uttara to Motijheel"
4. "Bus from Dhanmondi to Sadarghat"

---

## Intercity Bus Queries (NEW Functionality)

### Division-wise Queries:

**Chattogram Division:**
1. "How can I go from Dhaka to Chattogram?"
2. "Which buses go to Cox's Bazar from Dhaka?"
3. "Dhaka to Cumilla bus schedule and fare"
4. "Best way to reach Bandarban from Dhaka"

**Rajshahi Division:**
5. "Dhaka to Rajshahi bus operators and cost"
6. "How to go to Chapai Nawabganj from Dhaka?"

**Khulna Division:**
7. "Dhaka to Khulna intercity buses"
8. "Bus from Dhaka to Benapole border"
9. "How to reach Jashore from Dhaka?"

**Sylhet Division:**
10. "Dhaka to Sylhet bus and train options"
11. "How can I visit Sreemangal from Dhaka?"

**Rangpur Division:**
12. "Dhaka to Rangpur travel guide"
13. "Which buses go to Dinajpur from Dhaka?"
14. "How to reach Panchagarh from Dhaka?"

**Barishal Division:**
15. "Dhaka to Barishal bus fare and operators"
16. "How can I go to Kuakata beach from Dhaka?"
17. "Dhaka to Patuakhali transport options"

**Mymensingh Division:**
18. "Dhaka to Mymensingh intercity buses"
19. "How to reach Jamalpur from Dhaka?"

### Special Destinations:
20. "How to go to Teknaf from Dhaka?" (Southernmost point)
21. "Kuakata beach trip from Dhaka" (Tourist destination)
22. "Benapole border crossing from Dhaka" (Land port)
23. "Sreemangal tea garden visit from Dhaka" (Tourist spot)

---

## Train Schedule Queries (NEW Functionality)

1. "Which trains go to Chattogram from Dhaka?"
2. "Dhaka to Sylhet train schedule"
3. "Train timings from Dhaka to Rajshahi"
4. "Cox's Bazar train from Dhaka"
5. "When does Subarna Express leave Dhaka?"
6. "Khulna train schedule from Dhaka"
7. "Rangpur bound trains from Dhaka"
8. "Which train should I take to Mymensingh?"

---

## Mixed/Complex Queries (Testing AI Intelligence)

### Route+Cost:
1. "Cheapest way to go to Chattogram from Dhaka"
2. "AC bus fare from Dhaka to Sylhet"

### Bus+Train Combined:
3. "Should I take bus or train to Chattogram?"
4. "Compare bus and train for Dhaka to Sylhet"

### Operator-Specific:
5. "Green Line contact number for Chattogram"
6. "Hanif Enterprise routes from Dhaka"
7. "Ena Transport intercity services"

### Bengali Intercity:
8. "ঢাকা থেকে চট্টগ্রাম যাওয়ার বাস কোনটি?"
9. "সিলেট যাওয়ার ট্রেনের সময়সূচী কি?"
10. "কক্সবাজার যেতে কত টাকা লাগবে?"

### Return Journey:
11. "What time does the last bus leave from Chattogram to Dhaka?"
12. "Return train schedule from Sylhet to Dhaka"

---

## Expected AI Responses

### For Local Dhaka Bus Query:
```
🚍 **Raida-3** - Mirpur 10 → Farmgate → Banani
🚍 **Projapoti-1** - Mirpur → Mohakhali → Banani
```

### For Intercity Bus Query:
```
🚌 **Green Line** - Dhaka ⇄ Chattogram | ৳680 (Non-AC) / ৳1000-1500 (AC) | Contact: 16557
🚌 **Hanif** - All 64 Districts | Contact: 01713-402641
🚌 **Saudia** - Dhaka ⇄ Chattogram | Contact: 01919-654858
```

### For Train Query:
```
🚆 **Subarna Express** - Departs Dhaka at 16:30 | Off Day: Monday (from Chattogram), Friday (from Dhaka)
🚆 **Sonar Bangla** - Departs Dhaka at 07:00 | Off Day: Tuesday (from Chattogram)
```

### For Mixed Query:
```
You have two options for Dhaka to Chattogram:

**Bus Options:**
🚌 Green Line - ৳680-1500 | Contact: 16557
🚌 Saudia - Contact: 01919-654858

**Train Options:**
🚆 Subarna Express - Departs 16:30
🚆 Mahanagar Provati - Departs 07:45

Train is faster but bus has more departures. For comfort and scenic views, choose train. For flexibility, choose bus.
```

---

## Testing Checklist

- [ ] Local Dhaka bus queries work (at least 3 tests)
- [ ] Intercity bus queries work (test all 8 divisions)
- [ ] Train schedule queries work (at least 3 routes)
- [ ] Bengali queries work for both local and intercity
- [ ] Contact numbers are provided in responses
- [ ] Costs (Non-AC/AC) are mentioned
- [ ] Off days for trains are mentioned
- [ ] AI refuses unrelated questions gracefully
- [ ] AI provides multiple options when available
- [ ] Response format is clean and readable

---

## Success Criteria

✅ AI recognizes local vs intercity queries automatically  
✅ AI provides accurate operator names and contact numbers  
✅ AI mentions fare ranges for buses  
✅ AI includes train timings and off days  
✅ AI responds in Bengali when asked in Bengali  
✅ AI provides helpful suggestions and comparisons  
✅ AI doesn't hallucinate non-existent buses or trains  

---

**Note**: If AI gives incorrect information, check that the data in `data/intercityData.ts` matches the source data provided by the user.
