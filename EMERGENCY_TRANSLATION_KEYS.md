# ✅ EMERGENCY HELPLINES - TRANSLATION KEYS TO ADD

## 📋 **Translation Keys for Emergency Helplines Modal**

Add these keys to `i18n/translations.ts` after the `liveNav` section:

### **Bangla (বাংলা) - Add to bn object:**

```typescript
// Emergency Helplines
emergency: {
    title: 'জরুরি হেল্পলাইন',
    near: 'কাছাক্ছি',
    nationalEmergencyNumbers: 'জাতীয় জরুরি নম্বর',
    nearestPoliceStations: 'নিকটতম থানা',
    nearestHospitals: 'নিকটতম হাসপাতাল',
    nearestFireStations: 'নিকটতম ফায়ার স্টেশন',
    away: 'দূরে',
    call: 'কল করুন',
    locationNotAvailable: 'অবস্থান উপলব্ধ নেই',
    enableLocation: 'নিকটবর্তী জরুরি সেবা দেখতে অবস্থান সক্ষম করুন',
    emergencyFooter: 'জরুরি অবস্থায়, অবিলম্বে',
    immediately: 'কল করুন',
    close: 'বন্ধ করুন',
},
```

### **English - Add to en object:**

```typescript
// Emergency Helplines
emergency: {
    title: 'Emergency Helplines',
    near: 'Near',
    nationalEmergencyNumbers: 'National Emergency Numbers',
    nearestPoliceStations: 'Nearest Police Stations',
    nearestHospitals: 'Nearest Hospitals',
    nearestFireStations: 'Nearest Fire Stations',
    away: 'away',
    call: 'Call',
    locationNotAvailable: 'Location not available',
    enableLocation: 'Enable location to see nearby emergency services',
    emergencyFooter: 'In case of emergency, call',
    immediately: 'immediately',
    close: 'Close',
},
```

### **Elements to Translate in EmergencyHelplineModal.tsx:**

| Line | Current Text | Translation Key |
|------|-------------|-----------------|
| 103 | "Emergency Helplines" | `t('emergency.title')` |
| 108 | "Near" | `t('emergency.near')` |
| 127 | "National Emergency Numbers" | `t('emergency.nationalEmergencyNumbers')` |
| 160 | "Nearest Police Stations" | `t('emergency.nearestPoliceStations')` |
| 173 | "Nearest Hospitals" | `t('emergency.nearestHospitals')` |
| 186 | "Nearest Fire Stations" | `t('emergency.nearestFireStations')` |
| 77 | "away" | `t('emergency.away')` |
| 115 | "Close" | `t('common.close')` |
| 199 | "Location not available" | `t('emergency.locationNotAvailable')` |
| 200 | "Enable location to see nearby emergency services" | `t('emergency.enableLocation')` |
| 208 | "In case of emergency, call" | `t('emergency.emergencyFooter')` |
| 208 | "immediately" | `t('emergency.immediately')` |

### **Total:** 12 translation keys

---

**Next Step:** Apply these translations to `components/EmergencyHelplineModal.tsx`
