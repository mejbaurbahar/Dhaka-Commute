# UX Issues Fix Guide - All 7 Issues

## Issue 1: Scroll to Top on Search ✅

**Problem**: When user scrolls down and searches, they stay at the bottom and can't see results.

**Solution**: Add scroll to top in `handleSearchCommit` function

**File**: `App.tsx` (around line 524)

```typescript
const handleSearchCommit = () => {
  setSearchQuery(inputValue);
  (document.activeElement as HTMLElement)?.blur();

  // ADD THIS: Scroll to top to show search results
  if (scrollContainerRef.current) {
    scrollContainerRef.current.scrollTop = 0;
  }

  // Generate intelligent route suggestions
  if (inputValue.trim()) {
    const routes = planRoutes(userLocation, inputValue);
    setSuggestedRoutes(routes);
  } else {
    setSuggestedRoutes([]);
  }
};
```

---

## Issue 2: Map Panning Bounds ⚠️

**Problem**: Map can be dragged left/right and auto-returns, causing jarring UX.

**Solution**: Constrain map panning to prevent horizontal overflow

**File**: `components/MapVisualizer.tsx` (around line 146-155)

**Current Code**:
```typescript
const onMouseMove = (e: React.MouseEvent) => {
  if (!isDragging) return;
  const dx = e.clientX - dragStart.x;
  const dy = e.clientY - dragStart.y;
  setOffset({ x: offset.x + dx, y: offset.y + dy });
  setDragStart({ x: e.clientX, y: e.clientY });
};
```

**Fixed Code**:
```typescript
const onMouseMove = (e: React.MouseEvent) => {
  if (!isDragging) return;
  const dx = e.clientX - dragStart.x;
  const dy = e.clientY - dragStart.y;
  
  // Constrain horizontal panning to prevent overflow
  const newX = offset.x + dx;
  const maxX = 100; // Maximum horizontal offset
  const minX = -100; // Minimum horizontal offset
  const constrainedX = Math.max(minX, Math.min(maxX, newX));
  
  setOffset({ x: constrainedX, y: offset.y + dy });
  setDragStart({ x: e.clientX, y: e.clientY });
};
```

---

## Issue 3: Wrong Start/End Display in Route List ✅

**Problem**: When selecting Hemayetpur → Symoli, it shows Symoli → Hemayetpur

**Root Cause**: The fare calculation swaps indices for visualization, but we need to preserve the user's original selection for display.

**Solution**: Store actual user-selected stations separately

**File**: `App.tsx` (around line 320-353)

**Add to useMemo**:
```typescript
const { fareInfo, fareStartIndex, fareEndIndex, isReversed, actualStartStation, actualEndStation } = useMemo(() => {
  if (!selectedBus) return { 
    fareInfo: null, 
    fareStartIndex: -1, 
    fareEndIndex: -1, 
    isReversed: false,
    actualStartStation: null,
    actualEndStation: null 
  };

  const validStopIds = selectedBus.stops.filter(id => !!STATIONS[id]);

  let startIdx = -1;
  let endIdx = -1;
  let info = null;
  let reversed = false;
  let actualStart = null;  // NEW
  let actualEnd = null;    // NEW

  if (fareStart && fareEnd) {
    startIdx = validStopIds.indexOf(fareStart);
    endIdx = validStopIds.indexOf(fareEnd);

    // Store the actual user-selected stations (not swapped)
    actualStart = STATIONS[fareStart];  // NEW
    actualEnd = STATIONS[fareEnd];      // NEW

    if (startIdx !== -1 && endIdx !== -1) {
      info = calculateFare(selectedBus, fareStart, fareEnd);

      if (startIdx > endIdx) {
        reversed = true;
        // Swap for visualization only
        const temp = startIdx;
        startIdx = endIdx;
        endIdx = temp;
      }
    }
  } else {
    info = calculateFare(selectedBus);
  }

  return { 
    fareInfo: info, 
    fareStartIndex: startIdx, 
    fareEndIndex: endIdx, 
    isReversed: reversed,
    actualStartStation: actualStart,  // NEW
    actualEndStation: actualEnd       // NEW
  };
}, [selectedBus, fareStart, fareEnd]);
```

**Then in the Full Route List section** (around line 1316):
```typescript
{/* Use actualStartStation and actualEndStation instead of STATIONS[fareStart] */}
{fareStart && fareEnd && actualStartStation && actualEndStation && (
  <div className="flex items-center gap-2 text-xs">
    <Flag className="w-3 h-3 text-green-600" />
    <span className="font-semibold text-gray-700">
      {actualStartStation.name} → {actualEndStation.name}
    </span>
  </div>
)}
```

---

## Issue 4: Wrong Location Display in Live View & Full Route List ⚠️

**Problem**: Shows incorrect current location

**Solution**: Ensure user location is properly passed to components

**File**: `App.tsx` - Check Live Navigation render (around line 642-676)

Make sure `userLocation` is passed correctly:
```typescript
<LiveTracker
  bus={selectedBus}
  highlightStartIdx={fareStartIndex}
  highlightEndIdx={fareEndIndex}
  userLocation={userLocation}  // Make sure this is passed
  speed={speed}                 // Make sure this is passed
/>
```

---

## Issue 5: Stop-to-Stop Fare Map Not Showing Current Location ⚠️

**Problem**: Live view map updates but doesn't show current location marker

**Solution**: Pass userLocation to MapVisualizer in Bus Details view

**File**: `App.tsx` (around line 1248)

**Current**:
```typescript
<MapVisualizer
  route={selectedBus}
  userStationIndex={nearestStopIndex}
  userDistance={nearestStopDistance}
  highlightStartIdx={fareStartIndex}
  highlightEndIdx={fareEndIndex}
  isReversed={isReversed}
  // userLocation is missing!
/>
```

**Fixed**:
```typescript
<MapVisualizer
  route={selectedBus}
  userStationIndex={nearestStopIndex}
  userDistance={nearestStopDistance}
  highlightStartIdx={fareStartIndex}
  highlightEndIdx={fareEndIndex}
  isReversed={isReversed}
  userLocation={userLocation}  // ADD THIS
/>
```

---

## Issue 6: Map Layers Not Showing Airport & Railway Stations ⚠️

**Problem**: Only metro stations show, not airports or railway stations

**Solution**: Check MapVisualizer layer rendering logic

**File**: `components/MapVisualizer.tsx` (search for "showAirports" and "showRailway")

**Verify this code exists and is working**:
```typescript
{/* Airport Markers */}
{showAirports && Object.values(AIRPORTS).map(airport => (
  <div
    key={airport.id}
    className="absolute"
    style={{
      left: `${((airport.lng - minLng) / (maxLng - minLng)) * 100}%`,
      top: `${((maxLat - airport.lat) / (maxLat - minLat)) * 100}%`,
      transform: 'translate(-50%, -50%)'
    }}
  >
    <div className="relative group">
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
        <Plane className="w-3 h-3 text-white" />
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {airport.name}
      </div>
    </div>
  </div>
))}

{/* Railway Station Markers */}
{showRailway && Object.values(RAILWAY_STATIONS).map(station => (
  <div
    key={station.id}
    className="absolute"
    style={{
      left: `${((station.lng - minLng) / (maxLng - minLng)) * 100}%`,
      top: `${((maxLat - station.lat) / (maxLat - minLat)) * 100}%`,
      transform: 'translate(-50%, -50%)'
    }}
  >
    <div className="relative group">
      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
        <Train className="w-3 h-3 text-white" />
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {station.name}
      </div>
    </div>
  </div>
))}
```

---

## Issue 7: Live View Not Showing Current Location & Connection Line ⚠️

**Problem**: Live view doesn't show where user is or connection to nearest stop

**Solution**: Update LiveTracker component to show user marker and connection line

**File**: `components/LiveTracker.tsx`

**Add user location marker** (after bus route rendering):
```typescript
{/* User Location Marker */}
{userLocation && (
  <div
    className="absolute z-30"
    style={{
      left: `${((userLocation.lng - minLng) / (maxLng - minLng)) * 100}%`,
      top: `${((maxLat - userLocation.lat) / (maxLat - minLat)) * 100}%`,
      transform: 'translate(-50%, -50%)'
    }}
  >
    <div className="relative">
      {/* Pulsing circle */}
      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
      {/* Main marker */}
      <div className="relative w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg"></div>
      {/* Label */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded whitespace-nowrap">
        You are here
      </div>
    </div>
  </div>
)}

{/* Connection Line to Nearest Stop */}
{userLocation && nearestStopIndex >= 0 && validStops[nearestStopIndex] && (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
    <line
      x1={`${((userLocation.lng - minLng) / (maxLng - minLng)) * 100}%`}
      y1={`${((maxLat - userLocation.lat) / (maxLat - minLat)) * 100}%`}
      x2={`${((validStops[nearestStopIndex].lng - minLng) / (maxLng - minLng)) * 100}%`}
      y2={`${((maxLat - validStops[nearestStopIndex].lat) / (maxLat - minLat)) * 100}%`}
      stroke="#3b82f6"
      strokeWidth="2"
      strokeDasharray="5,5"
      opacity="0.6"
    />
  </svg>
)}
```

---

## Summary of Changes Needed

### App.tsx
1. ✅ Add scroll to top in `handleSearchCommit`
2. ✅ Add `actualStartStation` and `actualEndStation` to fare calculation useMemo
3. ✅ Use actual stations in route list display
4. ✅ Pass `userLocation` to MapVisualizer in Bus Details

### components/MapVisualizer.tsx
1. ⚠️ Constrain horizontal panning
2. ⚠️ Verify airport and railway station rendering

### components/LiveTracker.tsx
1. ⚠️ Add user location marker
2. ⚠️ Add connection line to nearest stop

---

## Testing Checklist

After implementing fixes:

- [ ] Issue 1: Search from bottom of list → should scroll to top
- [ ] Issue 2: Drag map left/right → should stay within bounds
- [ ] Issue 3: Select Hemayetpur → Symoli → should show correctly
- [ ] Issue 4: Check location display accuracy
- [ ] Issue 5: Select fare stops → map should show your location
- [ ] Issue 6: Enable airports/railway in layers → should appear
- [ ] Issue 7: Open live view → should show blue marker + connection line

---

## Priority Order

**High Priority** (User-facing bugs):
1. Issue 3 - Wrong station order display
2. Issue 1 - Scroll to top on search
3. Issue 7 - Show current location in live view

**Medium Priority** (UX improvements):
4. Issue 5 - Show location in fare map
5. Issue 6 - Show all map layers

**Low Priority** (Polish):
6. Issue 2 - Map panning bounds
7. Issue 4 - Location display verification
