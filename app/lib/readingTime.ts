/**
 * Helper to compute word count and estimated reading time from content or HTML string.
 */
export function getReadingStats(content?: string, defaultWords = 1200): { words: number; minutes: number; text: string } {
    if (!content) {
        const words = defaultWords;
        const minutes = Math.max(1, Math.ceil(words / 200));
        return { words, minutes, text: `${minutes} min read · ${words.toLocaleString()} words` };
    }

    // Strip HTML tags & WP comments
    const plainText = content
        .replace(/<!--[\s\S]*?-->/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : defaultWords;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return {
        words,
        minutes,
        text: `${minutes} min read · ${words.toLocaleString()} words`
    };
}
