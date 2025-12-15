import { TravelOption, TransportMode, RouteStep } from '../types';

export const parseMarkdownToOptions = (markdown: string, origin: string, destination: string): TravelOption[] => {
    const options: TravelOption[] = [];

    console.log('🔍 Starting Markdown parsing...');
    console.log('📄 Markdown length:', markdown.length);

    // Clean up markdown
    const cleanMarkdown = markdown.replace(/\r\n/g, '\n');

    // Try multiple parsing strategies

    // Strategy 1: Numbered lists (1. Title, 2. Title)
    const sectionRegex = /(?:^|\n)\s*(?:\*{0,2})(\d+)[\.\)]\s+(?:\*{0,2})([^\n]+)/g;
    let match;
    const indices: number[] = [];

    while ((match = sectionRegex.exec(cleanMarkdown)) !== null) {
        indices.push(match.index);
    }

    console.log(`📊 Found ${indices.length} numbered sections`);

    // Strategy 2: If no numbered lists, try headers (## Title or ### Title)
    if (indices.length === 0) {
        console.log('🔄 No numbered lists found, trying headers...');
        const headerRegex = /(?:^|\n)(#{2,3})\s+([^\n]+)/g;
        const headerIndices: number[] = [];

        while ((match = headerRegex.exec(cleanMarkdown)) !== null) {
            headerIndices.push(match.index);
        }

        console.log(`📊 Found ${headerIndices.length} header sections`);

        if (headerIndices.length > 0) {
            headerIndices.forEach((startIndex, i) => {
                const endIndex = headerIndices[i + 1] || cleanMarkdown.length;
                const section = cleanMarkdown.slice(startIndex, endIndex);

                const titleMatch = section.match(/(?:^|\n)(#{2,3})\s+([^\n]+)/);
                if (!titleMatch) return;

                let rawTitle = titleMatch[2].trim();
                rawTitle = rawTitle.replace(/\*\*/g, '').replace(/\*/g, '');

                const { type, mode } = determineTransportMode(rawTitle);
                const { steps, pros, cons } = extractSectionDetails(section, mode, origin, destination);
                const { duration, cost } = extractMetadata(section, rawTitle);

                if (steps.length > 0 || pros.length > 0 || section.length > 50) {
                    options.push(createTravelOption(i, type, rawTitle, duration, cost, steps, pros, cons));
                }
            });
        }
    } else {
        // Process numbered sections
        indices.forEach((startIndex, i) => {
            const endIndex = indices[i + 1] || cleanMarkdown.length;
            const section = cleanMarkdown.slice(startIndex, endIndex);

            const titleMatch = section.match(/(?:^|\n)\s*(?:\*{0,2})(\d+)[\.\)]\s+(?:\*{0,2})([^\n]+)/);
            if (!titleMatch) return;

            let rawTitle = titleMatch[2].trim();
            rawTitle = rawTitle.replace(/\*\*/g, '').replace(/\*/g, '');

            const { type, mode } = determineTransportMode(rawTitle);
            const { steps, pros, cons } = extractSectionDetails(section, mode, origin, destination);
            const { duration, cost } = extractMetadata(section, rawTitle);

            options.push(createTravelOption(i, type, rawTitle, duration, cost, steps, pros, cons));
        });
    }

    // Strategy 3: If still no options, create a single generic option from the whole text
    if (options.length === 0) {
        console.log('⚠️ No structured sections found, creating generic option');
        const preview = cleanMarkdown.substring(0, 200).trim();
        options.push({
            id: 'generic_0',
            type: 'BUS',
            title: 'Route Information',
            summary: 'AI-generated route details',
            totalDuration: 'Varies',
            totalCostRange: 'See details',
            recommended: true,
            steps: [{
                mode: TransportMode.BUS,
                from: origin,
                to: destination,
                instruction: preview,
                duration: '',
                cost: ''
            }],
            enhancedData: {
                tips: {
                    best_option: 'See full details below'
                }
            }
        } as any);
    }

    console.log(`✅ Parser finished with ${options.length} options`);
    return options;
};

// Helper function to determine transport mode
function determineTransportMode(title: string): { type: TravelOption['type'], mode: TransportMode } {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('train') || lowerTitle.includes('rail')) {
        return { type: 'TRAIN', mode: TransportMode.TRAIN };
    } else if (lowerTitle.includes('flight') || lowerTitle.includes('air') || lowerTitle.includes('plane')) {
        return { type: 'AIR', mode: TransportMode.AIR };
    } else if (lowerTitle.includes('car') || lowerTitle.includes('drive') || lowerTitle.includes('private') || lowerTitle.includes('taxi') || lowerTitle.includes('uber')) {
        return { type: 'BUS', mode: TransportMode.CNG };
    } else if (lowerTitle.includes('ferry') || lowerTitle.includes('launch') || lowerTitle.includes('boat')) {
        return { type: 'FERRY', mode: TransportMode.FERRY };
    }

    return { type: 'BUS', mode: TransportMode.BUS };
}

// Helper function to extract section details
function extractSectionDetails(section: string, mode: TransportMode, origin: string, destination: string) {
    const steps: RouteStep[] = [];
    const pros: string[] = [];
    const cons: string[] = [];

    const lines = section.split('\n');
    let currentSection = 'steps';

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        const lowerLine = trimmed.toLowerCase();
        if (lowerLine.includes('why choose') || lowerLine.includes('pros:') || lowerLine.includes('advantages')) {
            currentSection = 'pros';
            return;
        }
        if (lowerLine.includes('considerations') || lowerLine.includes('cons:') || lowerLine.includes('disadvantages') || lowerLine.includes('drawbacks')) {
            currentSection = 'cons';
            return;
        }

        const bulletMatch = trimmed.match(/^[\*\-\+]\s+(.+)/);
        if (bulletMatch) {
            let content = bulletMatch[1].trim().replace(/\*\*/g, '');

            if (currentSection === 'pros') {
                pros.push(content);
            } else if (currentSection === 'cons') {
                cons.push(content);
            } else {
                if (content.toLowerCase().startsWith('distance:')) return;
                if (content.toLowerCase().startsWith('time:')) return;
                if (content.toLowerCase().startsWith('cost:')) return;

                steps.push({
                    mode: mode,
                    from: origin,
                    to: destination,
                    instruction: content,
                    duration: '',
                    cost: ''
                });
            }
        }
    });

    if (steps.length === 0) {
        steps.push({
            mode: mode,
            from: origin,
            to: destination,
            instruction: `Travel by ${mode}`,
            duration: 'N/A',
            cost: 'N/A'
        });
    }

    return { steps, pros, cons };
}

// Helper function to extract metadata
function extractMetadata(section: string, rawTitle: string) {
    let duration = 'N/A';
    let cost = 'N/A';

    const durationMatch = section.match(/(?:Time|Duration|Est\. Time):\s*([^\n\(\)]+)/i);
    if (durationMatch) duration = durationMatch[1].trim();

    const costMatch = section.match(/(?:Cost|Price|Fare|Est\. Cost):\s*([^\n\(\)]+)/i);
    if (costMatch) cost = costMatch[1].trim();

    if (duration === 'N/A') {
        const titleDuration = rawTitle.match(/(\d+\s*(?:hr|hour|min|m))/i);
        if (titleDuration) duration = titleDuration[1];
    }

    return { duration, cost };
}

// Helper function to create a travel option
function createTravelOption(index: number, type: TravelOption['type'], title: string, duration: string, cost: string, steps: RouteStep[], pros: string[], cons: string[]): TravelOption {
    return {
        id: `parsed_${index}`,
        type: type,
        title: title,
        summary: `${duration} • ${cost}`,
        totalDuration: duration,
        totalCostRange: cost,
        recommended: index === 0,
        steps: steps,
        enhancedData: {
            tips: {
                best_option: index === 0 ? 'Recommended' : undefined,
                pros: pros.length > 0 ? pros : undefined,
                cons: cons.length > 0 ? cons : undefined
            }
        }
    } as any;
}
