import React, { useState, useEffect } from 'react';

interface ApiKeyManagementProps {
    onClose: () => void;
}

export default function ApiKeyManagement({ onClose }: ApiKeyManagementProps) {
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [mode, setMode] = useState<'view' | 'add' | 'edit'>('view');
    const [hasKey, setHasKey] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error' | 'info';
        message: string;
    } | null>(null);

    useEffect(() => {
        loadApiKey();
    }, []);

    const loadApiKey = () => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey && storedKey.trim() !== '') {
            setApiKey(storedKey);
            setHasKey(true);
            setMode('view');
        } else {
            setHasKey(false);
            setMode('add');
        }
    };

    const handleSave = () => {
        const trimmedKey = apiKey.trim();

        if (!trimmedKey) {
            showNotification('error', 'Please enter a valid API key');
            return;
        }

        // Validate API key format (basic check)
        if (!trimmedKey.startsWith('AIzaSy') || trimmedKey.length < 30) {
            showNotification('error', 'Invalid API key format. Gemini API keys start with "AIzaSy"');
            return;
        }

        localStorage.setItem('gemini_api_key', trimmedKey);
        setHasKey(true);
        setMode('view');
        showNotification('success', '✓ API Key saved successfully! You now have unlimited AI Chat and Intercity Bus Search.');
    };

    const handleEdit = () => {
        setMode('edit');
        setShowKey(true);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete your API key?\n\nYou will revert to the default limited API usage (2 AI Chats and 2 Intercity Searches per day).')) {
            localStorage.removeItem('gemini_api_key');
            setApiKey('');
            setHasKey(false);
            setMode('add');
            showNotification('info', 'API Key deleted. You are now using the default limited API.');
        }
    };

    const handleCancel = () => {
        loadApiKey();
        setMode('view');
        setShowKey(false);
    };

    const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const maskApiKey = (key: string) => {
        if (key.length < 15) return '••••••••••••••••';
        return key.substring(0, 12) + '•'.repeat(key.length - 16) + key.substring(key.length - 4);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px',
            animation: 'fadeIn 0.2s ease-in'
        }}>
            {/* Modal Container */}
            <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '16px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                border: '1px solid #333',
                animation: 'slideUp 0.3s ease-out'
            }}>
                {/* Header */}
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{ fontSize: '28px' }}>🔑</span>
                            API Key Management
                        </h2>
                        <p style={{
                            margin: '8px 0 0 0',
                            fontSize: '14px',
                            color: '#888'
                        }}>
                            Manage your Gemini API key for unlimited access
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#888',
                            fontSize: '28px',
                            cursor: 'pointer',
                            padding: '0',
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#333';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#888';
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Notification */}
                {notification && (
                    <div style={{
                        margin: '16px 24px 0',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        backgroundColor: notification.type === 'success' ? '#0f4d2f' :
                            notification.type === 'error' ? '#4d0f0f' : '#1a3a4d',
                        border: `1px solid ${notification.type === 'success' ? '#16a34a' :
                            notification.type === 'error' ? '#dc2626' : '#3b82f6'}`,
                        color: '#fff',
                        fontSize: '14px',
                        animation: 'slideDown 0.3s ease-out'
                    }}>
                        {notification.message}
                    </div>
                )}

                {/* Content */}
                <div style={{ padding: '24px' }}>
                    {/* Info Banner */}
                    <div style={{
                        padding: '16px',
                        backgroundColor: '#0f1f3d',
                        border: '1px solid #1e40af',
                        borderRadius: '12px',
                        marginBottom: '24px'
                    }}>
                        <h3 style={{
                            margin: '0 0 8px 0',
                            fontSize: '16px',
                            color: '#60a5fa',
                            fontWeight: '600'
                        }}>
                            ℹ️ Why add your own API key?
                        </h3>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            fontSize: '14px',
                            color: '#93c5fd',
                            lineHeight: '1.6'
                        }}>
                            <li>🚀 <strong>Unlimited</strong> AI Chat conversations</li>
                            <li>🚌 <strong>Unlimited</strong> Intercity Bus searches</li>
                            <li>⚡ <strong>Faster</strong> response times</li>
                            <li>🔒 <strong>Private</strong> - Your key is stored locally on your device</li>
                        </ul>
                        <div style={{
                            marginTop: '12px',
                            padding: '8px 12px',
                            backgroundColor: '#1e3a5f',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#bfdbfe'
                        }}>
                            💡 <strong>Get your free key:</strong> <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#60a5fa',
                                    textDecoration: 'underline'
                                }}
                            >
                                aistudio.google.com/app/apikey
                            </a>
                        </div>
                    </div>

                    {/* View Mode */}
                    {mode === 'view' && hasKey && (
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#aaa'
                            }}>
                                Your API Key
                            </label>
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center',
                                marginBottom: '16px'
                            }}>
                                <div style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    fontFamily: 'monospace',
                                    fontSize: '14px',
                                    color: '#fff',
                                    letterSpacing: '0.5px'
                                }}>
                                    {showKey ? apiKey : maskApiKey(apiKey)}
                                </div>
                                <button
                                    onClick={() => setShowKey(!showKey)}
                                    style={{
                                        padding: '12px 16px',
                                        backgroundColor: '#333',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        fontSize: '20px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
                                    title={showKey ? 'Hide key' : 'Show key'}
                                >
                                    {showKey ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>

                            <div style={{
                                padding: '12px 16px',
                                backgroundColor: '#0f2f1f',
                                border: '1px solid #16a34a',
                                borderRadius: '8px',
                                marginBottom: '24px'
                            }}>
                                <div style={{ fontSize: '14px', color: '#4ade80', marginBottom: '4px' }}>
                                    ✓ <strong>Active</strong> - You have unlimited access
                                </div>
                                <div style={{ fontSize: '13px', color: '#86efac' }}>
                                    Your personal API key is being used for all requests.
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '12px'
                            }}>
                                <button
                                    onClick={handleEdit}
                                    style={{
                                        flex: 1,
                                        padding: '12px 24px',
                                        backgroundColor: '#3b82f6',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                                >
                                    ✏️ Edit Key
                                </button>
                                <button
                                    onClick={handleDelete}
                                    style={{
                                        flex: 1,
                                        padding: '12px 24px',
                                        backgroundColor: '#dc2626',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                                >
                                    🗑️ Delete Key
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Add/Edit Mode */}
                    {(mode === 'add' || mode === 'edit') && (
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#aaa'
                            }}>
                                {mode === 'add' ? 'Enter' : 'Update'} Your Gemini API Key
                            </label>
                            <input
                                type={showKey ? 'text' : 'password'}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="AIzaSy..."
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontFamily: 'monospace',
                                    marginBottom: '12px',
                                    boxSizing: 'border-box',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#333'}
                            />

                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px',
                                color: '#aaa',
                                cursor: 'pointer',
                                marginBottom: '24px',
                                userSelect: 'none'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={showKey}
                                    onChange={(e) => setShowKey(e.target.checked)}
                                    style={{ cursor: 'pointer' }}
                                />
                                Show API key
                            </label>

                            <div style={{
                                display: 'flex',
                                gap: '12px'
                            }}>
                                <button
                                    onClick={handleSave}
                                    style={{
                                        flex: 1,
                                        padding: '12px 24px',
                                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(22, 163, 74, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
                                    }}
                                >
                                    💾 Save API Key
                                </button>
                                {mode === 'edit' && (
                                    <button
                                        onClick={handleCancel}
                                        style={{
                                            padding: '12px 24px',
                                            backgroundColor: '#333',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* No Key State */}
                    {mode === 'add' && !hasKey && !apiKey && (
                        <div style={{
                            textAlign: 'center',
                            padding: '32px 16px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '12px',
                            border: '2px dashed #333'
                        }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔑</div>
                            <h3 style={{
                                margin: '0 0 8px 0',
                                fontSize: '20px',
                                color: '#fff'
                            }}>
                                No API Key Set
                            </h3>
                            <p style={{
                                margin: '0 0 16px 0',
                                fontSize: '14px',
                                color: '#888',
                                lineHeight: '1.6'
                            }}>
                                You're currently using the default limited API<br />
                                (2 AI Chats + 2 Intercity Searches per day)
                            </p>
                            <p style={{
                                margin: 0,
                                fontSize: '13px',
                                color: '#aaa'
                            }}>
                                Add your own key above to get unlimited access! 🚀
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scrollbar styling */
        div::-webkit-scrollbar {
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        div::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
        </div>
    );
}
