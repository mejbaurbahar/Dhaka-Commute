// Simple loader that works around GitHub Pages MIME type issues
(async function () {
  try {
    // Dynamically import the main module
    const module = await import('./src/main.tsx');
    console.log('Application loaded successfully!');
  } catch (error) {
    console.error('Failed to load application:', error);

    // Show error to user
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #f3f4f6; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px; text-align: center;">
            <div style="width: 64px; height: 64px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
              <svg style="width: 32px; height: 32px; color: #dc2626;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h1 style="font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 12px;">Loading Error</h1>
            <p style="color: #6b7280; margin-bottom: 20px;">The application failed to load. This might be due to browser compatibility or network issues.</p>
            <div style="background: #f3f4f6; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
              <code style="font-size: 12px; color: #dc2626; word-break: break-all;">${error.message}</code>
            </div>
            <button onclick="window.location.reload()" style="background: #dc2626; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">
              Reload Page
            </button>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
              If the problem persists, try clearing your browser cache or using a different browser.
            </p>
          </div>
        </div>
      `;
    }
  }
})();
