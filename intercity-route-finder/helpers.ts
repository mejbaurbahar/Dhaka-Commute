export interface ParsedMode {
  id: number;
  icon: string;
  title: string;
  summary: string; // Time/Price
  fullContent: string;
}

export interface ParsedRouteData {
  intro: string;
  modes: ParsedMode[];
  footer: string;
}

export const parseRouteMarkdown = (markdown: string): ParsedRouteData => {
  // 1. Separate the Footer (Booking Links)
  const parts = markdown.split('**Booking Links:**');
  const mainContent = parts[0];
  const footer = parts.length > 1 ? `**Booking Links:**\n${parts[1]}` : '';

  // 2. Separate Header (Intro) from Modes
  // Look for the first occurrence of "**Recommended Modes:**"
  const modeSplit = mainContent.split('**Recommended Modes:**');
  const intro = modeSplit[0].trim();
  const modesContent = modeSplit.length > 1 ? modeSplit[1] : '';

  // 3. Parse individual modes
  // Regex to split by icons like 🚗, 🚌, 🚂, ✈️, 🚢, starting a new line
  // We use a lookahead to keep the icon in the split result or just split manually
  
  const modes: ParsedMode[] = [];
  
  // Clean up newlines and split by double asterisks that likely start a mode with an icon preceding it
  // A simpler approach: Split by double newline, check if line starts with an icon
  const lines = modesContent.split('\n');
  let currentMode: Partial<ParsedMode> | null = null;
  let buffer = '';

  const iconRegex = /^(🚗|🚌|🚂|✈️|🚢)/;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      if (currentMode) buffer += '\n\n';
      return;
    }

    const match = trimmed.match(iconRegex);
    if (match) {
      // Save previous mode
      if (currentMode) {
        currentMode.fullContent = buffer.trim();
        modes.push(currentMode as ParsedMode);
      }

      // Start new mode
      const icon = match[1];
      // Remove icon from text for title
      let text = trimmed.substring(icon.length).trim();
      
      // Extract Title (usually bold **By Bus**)
      const titleMatch = text.match(/\*\*([^*]+)\*\*/);
      const title = titleMatch ? titleMatch[1] : text;
      
      // Extract Summary (Time/Price usually follows the dash)
      // e.g. "**By Bus** – Time: 5h | Price: 500"
      let summary = "";
      if (text.includes('–')) {
        summary = text.split('–')[1].trim();
      } else if (text.includes('-')) {
        summary = text.split('-')[1].trim();
      }

      buffer = line + '\n'; // Start buffer with the header line
      currentMode = {
        id: modes.length + 1,
        icon,
        title,
        summary
      };
    } else {
      // Continuation of current mode
      if (currentMode) {
        buffer += line + '\n';
      }
    }
  });

  // Push last mode
  if (currentMode) {
    currentMode.fullContent = buffer.trim();
    modes.push(currentMode as ParsedMode);
  }

  return {
    intro,
    modes,
    footer
  };
};