# Intercity UI Modernization

## Overview
The Intercity search results UI has been modernized to ensure a consistent Split View (List + Details/Map) experience, even when the backend returns unstructured Markdown data.

## Changes Implemented

### 1. Markdown Parsing Utility
- Created `intercity/utils/markdownParser.ts`.
- Implemented logic to parse Markdown route descriptions into structured `TravelOption` objects.
- Extracts:
  - Transport Mode (Bus, Train, Air, etc.)
  - Title and Summary
  - Step-by-step instructions (from bullet points)
  - Estimated Cost and Duration

### 2. Service Layer Update
- Updated `intercity/services/geminiService.ts`.
- Integrated the `parseMarkdownToOptions` utility.
- When the backend returns a Markdown response, the service now attempts to parse it into structured options.
- If parsing is successful, it returns a `RoutingResponse` with `options`, triggering the modern UI in `App.tsx`.
- If parsing fails, it gracefully falls back to the text-based Markdown display.

### 3. UI Impact
- **Before**: Markdown responses were shown as plain text blocks.
- **After**: Markdown responses are converted into interactive cards.
  - **Left Panel**: List of routes (e.g., "By Bus", "By Train").
  - **Right Panel**: Detailed timeline of steps and a Map view connecting Origin to Destination.

## Verification
- The code handles the "1. Title ... * Step" format shown in the user's screenshot.
- Types have been adjusted to ensure compatibility with the existing `TravelOption` interface.
