import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRouteDisplayProps {
    content: string;
    from: string;
    to: string;
    date?: string;
    source?: string;
}

export const MarkdownRouteDisplay: React.FC<MarkdownRouteDisplayProps> = ({
    content,
    from,
    to,
    date,
    source
}) => {
    return (
        <div className="markdown-route-container">
            {/* Header */}
            <div className="route-header">
                <div>
                    <h2 className="route-title">{from} → {to}</h2>
                    {date && <p className="route-date">{date}</p>}
                </div>
                {source === 'memory_cache' && (
                    <span className="cached-badge">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Cached Result
                    </span>
                )}
            </div>

            {/* Markdown Content */}
            <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};
