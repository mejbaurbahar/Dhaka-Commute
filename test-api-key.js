// Quick Test Script for Gemini API
// Run this in browser console to test if your API key works

async function testGeminiAPI() {
    const apiKey = localStorage.getItem('gemini_api_key');

    console.log('=== Gemini API Test ===');
    console.log('1. API Key Check:');
    console.log('   - Exists:', !!apiKey);
    console.log('   - Length:', apiKey ? apiKey.length : 0);
    console.log('   - Starts with AIzaSy:', apiKey ? apiKey.startsWith('AIzaSy') : false);

    if (!apiKey || apiKey.trim() === '') {
        console.error('❌ NO API KEY FOUND!');
        console.log('Please add your API key in Settings first.');
        return;
    }

    console.log('\n2. Testing API Call...');

    try {
        // Import the SDK
        const { GoogleGenAI } = await import('https://esm.sh/@google/genai@1.30.0');

        console.log('   - SDK loaded ✓');

        // Initialize client
        const ai = new GoogleGenAI({ apiKey });
        console.log('   - Client initialized ✓');

        // Make a simple test call
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Say "Hello from Dhaka!" in one sentence.',
            config: {
                temperature: 0.7
            }
        });

        console.log('   - API call successful ✓');
        console.log('\n3. Response:', response.text);
        console.log('\n✅ API KEY IS WORKING!');

    } catch (error) {
        console.error('\n❌ API ERROR:', error);
        console.error('Error details:', error.message);

        if (error.message.includes('API_KEY_INVALID')) {
            console.log('\n💡 Your API key might be invalid. Please:');
            console.log('   1. Go to https://aistudio.google.com/app/apikey');
            console.log('   2. Create a new API key');
            console.log('   3. Save it in Settings');
        }
    }
}

// Run the test
testGeminiAPI();
