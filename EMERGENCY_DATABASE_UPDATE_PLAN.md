# 🚨 Emergency Database Update Implementation Plan

## Current Status
- **Current file:** `data/emergencyHelplines.ts` (1050 lines, 66 services)
- **Target:** Add 180+ new services (total 246+)
- **Backup created:** `data/emergencyHelplines.ts.backup` ✅

## Strategy

Due to the large scope (246+ services with coordinates and Bengali names), I'll implement this in phases:

### PHASE 1: Create Structured Service Addition Script ✅
Create a TypeScript file with all new services in proper format

### PHASE 2: Add High-Priority Services (Immediately)
1. **Dhaka City Expansions** (34 new hospitals)
2. **Greater Dhaka Fire Stations** (Gazipur, Narsingdi, etc.)
3. **Police Stations** (GMP Gazipur, district stations)

### PHASE 3: Optimize & Test
1. Update proximity search algorithm for larger dataset
2. Test Emergency Modal performance
3. Add lazy loading if needed

## File Size Considerations

- Current: ~31KB (66 services)
- After update: ~150KB (246 services)
- This is acceptable for emergency data
- Can optimize with code splitting later if needed

## Bengali Name Translation Map

I'll use Google Translate API patterns for consistency:
- Hospital → হাসপাত

াল
- Police Station → থানা
- Fire Station → ফায়ার স্টেশন
- General Hospital → জেনারেল হাসপাতাল

## Implementation Approach

**Option A: Full Rewrite (Recommended)**
- Create complete new file with all 246+ services
- Ensures consistency and proper structure
- Time: ~2-3 hours of careful work

**Option B: Incremental Addition**
- Add services in batches
- Higher risk of errors/duplicates
- Time: ~4-5 hours with testing between batches

**Chosen: Option A** - I'll create a comprehensive new file systematically.

---

**User chose to proceed with Option A. Starting implementation...**
