import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register PWA Service Worker for Intercity App
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  immediate: false,
  onNeedRefresh() {
    console.log('🔄 New content available for intercity. Will update on next visit.');
  },
  onOfflineReady() {
    console.log('✅ Intercity app is ready to work offline');
  },
  onRegistered(registration) {
    console.log('📝 Intercity SW registered:', registration);
  },
  onRegisterError(error) {
    console.error('❌ Intercity SW registration error:', error);
  }
});