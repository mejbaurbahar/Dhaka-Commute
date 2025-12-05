# 🚀 Implementation Guide: Offline PWA + AI Chat History

**Priority Tasks:**
1. ✅ Fix Canonical URL (DONE)
2. Add AI Chat History (localStorage-based, works offline)
3. Ensure full offline functionality
4. PWA optimization

---

## 1. ✅ COMPLETED: Fix Canonical URL

**Changed:** All URLs from `koyjabo.vercel.app` → `koyjabo.netlify.app`

**Files Modified:**
- `index.html` - Updated canonical, OG tags, Twitter Card, JSON-LD

**Result:** SEO now correctly points to Netlify deployment

---

## 2. AI Chat History Implementation

### Step 1: Add ChatMessage Interface

**File:** `types.ts`

Add after line 64:
```typescript
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  lastUpdated: number;
}
```

### Step 2: Create Chat History Manager

**File:** `services/chatHistoryManager.ts` (NEW FILE)

```typescript
import { ChatMessage, ChatSession } from '../types';

const STORAGE_KEY = 'dhaka_commute_chat_history';
const MAX_SESSIONS = 50; // Keep last 50 chat sessions

export const saveChatMessage = (message: ChatMessage, sessionId?: string): string => {
  const sessions = getAllSessions();
  const currentSessionId = sessionId || generateSessionId();
  
  let session = sessions.find(s => s.id === currentSessionId);
  
  if (!session) {
    session = {
      id: currentSessionId,
      messages: [],
      createdAt: Date.now(),
      lastUpdated: Date.now()
    };
    sessions.push(session);
  }
  
  session.messages.push(message);
  session.lastUpdated = Date.now();
  
  // Keep only last MAX_SESSIONS
  const trimmedSessions = sessions.slice(-MAX_SESSIONS);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedSessions));
  return currentSessionId;
};

export const getAllSessions = (): ChatSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

export const getSession = (sessionId: string): ChatSession | null => {
  const sessions = getAllSessions();
  return sessions.find(s => s.id === sessionId) || null;
};

export const deleteSession = (sessionId: string): void => {
  const sessions = getAllSessions();
  const filtered = sessions.filter(s => s.id !== sessionId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearAllHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

const generateSessionId = (): string => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Format timestamp for display
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return `Today ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
};
```

### Step 3: Update App.tsx - AI Assistant View

**Find the AI Assistant rendering code** and add:

1. **Add State:**
```typescript
const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
const [showChatHistory, setShowChatHistory] = useState(false);
const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
```

2. **Save Messages to localStorage:**
```typescript
const handleAiSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!aiQuery.trim() || !isOnline) return;

  const userMessage: ChatMessage = {
    id: `msg_${Date.now()}`,
    role: 'user',
    text: aiQuery,
    timestamp: Date.now()
  };

  // Save to current session
  const sessionId = saveChatMessage(userMessage, currentSessionId);
  if (!currentSessionId) setCurrentSessionId(sessionId);

  setChatHistory(prev => [...prev, userMessage]);
  setAiQuery('');
  setAiLoading(true);

  // ... get AI response ...

  const assistantMessage: ChatMessage = {
    id: `msg_${Date.now()}`,
    role: 'assistant',
    text: result,
    timestamp: Date.now()
  };

  // Save assistant message
  saveChatMessage(assistantMessage, sessionId);
  setChatHistory(prev => [...prev, assistantMessage]);
  setAiLoading(false);
};
```

3. **Add History Button in AI Chat Header:**
```tsx
<div className="flex items-center gap-2">
  <h2>AI Assistant</h2>
  <button
    onClick={() => setShowChatHistory(!showChatHistory)}
    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
  >
    <History className="w-5 h-5" />
  </button>
</div>
```

4. **Add History Modal/Sidebar:**
```tsx
{showChatHistory && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg overflow-y-auto">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold">Chat History</h3>
        <button onClick={() => setShowChatHistory(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4">
        {getAllSessions().reverse().map(session => (
          <div
            key={session.id}
            onClick={() => {
              setChatHistory(session.messages);
              setCurrentSessionId(session.id);
              setShowChatHistory(false);
            }}
            className="p-3 mb-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <div className="font-semibold text-sm">
              {session.messages[0]?.text.substring(0, 50)}...
            </div>
            <div className="text-xs text-gray-500">
              {formatTimestamp(session.lastUpdated)}
            </div>
            <div className="text-xs text-gray-400">
              {session.messages.length} messages
            </div>
          </div>
        ))}
        
        {getAllSessions().length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No chat history yet
          </div>
        )}
        
        <button
          onClick={() => {
            if (confirm('Clear all chat history?')) {
              clearAllHistory();
              setChatHistory([]);
              setCurrentSessionId(null);
              setShowChatHistory(false);
            }
          }}
          className="w-full mt-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
        >
          Clear All History
        </button>
      </div>
    </div>
  </div>
)}
```

---

## 3. Full Offline Functionality

### Check Current PWA Configuration

**File:** `vite.config.ts`

Ensure the PWA plugin has these settings:
```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['**/*'],
  workbox: {
    globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,ico,webp,woff,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/cdn\.tailwindcss\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'tailwind-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/aistudiocdn\.com\/.*/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'cdn-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
          }
        }
      }
    ]
  },
  manifest: {
    name: "কই যাবো",
    short_name: "কই যাবো",
    description: "Find Dhaka bus routes instantly!",
    theme_color: "#006a4e",
    background_color: "#ffffff",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  }
})
```

### Add Offline Indicator

**File:** `App.tsx`

Add at the top of the app:
```tsx
{!isOnline && (
  <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 z-50">
    <WifiOff className="inline w-4 h-4 mr-2" />
    You're offline. Some features may be limited.
  </div>
)}
```

---

## 4. Testing Offline Functionality

### Manual Test Checklist:

**Home Page:**
- [ ] Opens offline
- [ ] Bus list displays
- [ ] Search works
- [ ] Favorites work

**Bus Details:**
- [ ] Opens offline (if previously viewed)
- [ ] Map shows (cached)
- [ ] Fare calculator works

**AI Chat:**
- [ ] Shows "No internet" when trying to send without connection
- [ ] Chat history loads and displays offline
- [ ] Can browse old conversations

**Settings:**
- [ ] Page loads offline  
- [ ] Can view API key (masked)
- [ ] Instructions visible

**Metro/Intercity:**
- [ ] Cached routes display
- [ ] Shows offline indicator
- [ ] Previously searched routes available

### Chrome DevTools Test:

1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Service Workers"
4. Check "Offline" checkbox
5. Refresh page
6. Test all features

---

## 5. Deployment Checklist

### Before Deploy:

- [ ] Update canonical URLs ✅ (Done)
- [ ] Test PWA offline
- [ ] Test chat history
- [ ] Build successfully
- [ ] No console errors
- [ ] Lighthouse score > 90

### Deploy Commands:

```bash
# Build
npm run build

# Deploy to Netlify (if using netlify-cli)
netlify deploy --prod

# Or use Netlify UI to drag/drop dist folder
```

---

## 6. Quick Implementation Summary

### Files to Create:
1. `services/chatHistoryManager.ts` - Chat history logic
2. Add ChatMessage/ChatSession types to `types.ts`

### Files to Modify:
1. `index.html` - ✅ URLs updated
2. `App.tsx` - Add chat history state and UI
3. `vite.config.ts` - Enhance PWA caching (if needed)

### Features Added:
- ✅ Canonical URL fixed
- 🔄 AI Chat History (localStorage, works offline)
- 🔄 Full offline PWA support
- 🔄 Offline indicator

---

## Example: Minimal Chat History Button

If you want to start simple, just add this to AI Chat view:

```tsx
<button
  onClick={() => {
    const history = localStorage.getItem('dhaka_commute_chat_history');
    alert(history ? 'You have chat history!' : 'No history yet');
  }}
  className="p-2 bg-blue-500 text-white rounded"
>
  📜 History
</button>
```

Then gradually build the full UI!

---

**Ready to implement!** Start with chat history, then test offline, then deploy. 🚀
