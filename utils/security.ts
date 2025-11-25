/**
 * Security utilities for input sanitization
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * Removes HTML tags, script tags, and potentially dangerous characters
 * @param input - The user input string to sanitize
 * @returns Sanitized string safe for display
 */
export const sanitizeInput = (input: string): string => {
    if (!input || typeof input !== 'string') return '';

    return input
        // Remove HTML tags
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Remove script tags and their content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove event handlers
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        // Remove javascript: protocol
        .replace(/javascript:/gi, '')
        // Remove data: protocol (can be used for XSS)
        .replace(/data:text\/html/gi, '')
        // Limit length to prevent DoS
        .slice(0, 200)
        // Trim whitespace
        .trim();
};

/**
 * Validates and sanitizes station/route selection input
 * Only allows alphanumeric characters, underscores, and hyphens
 * @param input - The station/route ID to validate
 * @returns Sanitized ID or empty string if invalid
 */
export const sanitizeId = (input: string): string => {
    if (!input || typeof input !== 'string') return '';

    // Only allow alphanumeric, underscore, and hyphen
    const sanitized = input.replace(/[^a-zA-Z0-9_-]/g, '');

    // Limit length
    return sanitized.slice(0, 50);
};

/**
 * Escapes special regex characters in user input
 * Prevents regex injection attacks
 * @param input - The string to escape
 * @returns Escaped string safe for use in regex
 */
export const escapeRegex = (input: string): string => {
    if (!input || typeof input !== 'string') return '';

    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
