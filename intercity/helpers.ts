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
  const footerHeaders = ['**Booking Links:**', '**বুকিং লিংক:**'];
  let mainContent = markdown;
  let footer = '';

  for (const header of footerHeaders) {
    if (markdown.includes(header)) {
      const parts = markdown.split(header);
      mainContent = parts[0];
      footer = `${header}\n${parts[1]}`;
      break;
    }
  }

  // 2. Separate Header (Intro) from Modes
  // Look for "Recommended Modes:" or "প্রস্তাবিত যাতায়াত মাধ্যম:"
  const modeHeaders = ['**Recommended Modes:**', '**প্রস্তাবিত যাতায়াত মাধ্যম:**'];
  let intro = mainContent.trim();
  let modesContent = '';

  for (const header of modeHeaders) {
    if (mainContent.includes(header)) {
      const split = mainContent.split(header);
      intro = split[0].trim();
      modesContent = split[1].trim();
      break;
    }
  }

  // 3. Parse individual modes
  const modes: ParsedMode[] = [];

  const lines = modesContent.split('\n');
  let currentMode: Partial<ParsedMode> | null = null;
  let buffer = '';

  const iconRegex = /^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u;

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