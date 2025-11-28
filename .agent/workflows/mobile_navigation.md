---
description: Mobile Navigation Implementation
---

# Mobile Navigation

The mobile navigation system includes a hamburger menu for accessing secondary features (Settings, About, Terms) and a bottom navigation bar for primary views (Routes, AI Help, About).

## Components

1.  **Hamburger Menu**:
    *   Located in the top header (Colorful Header) on mobile.
    *   Toggles an overlay menu with links to Settings, About, and Terms.
    *   State: `isMenuOpen`.

2.  **Bottom Navigation**:
    *   Fixed at the bottom of the screen on mobile.
    *   Visible on Home, AI Assistant, and About views.
    *   Hidden on Bus Details and Live Nav views.

## Implementation Details

*   **State**: `const [isMenuOpen, setIsMenuOpen] = useState(false);`
*   **Icons**: Uses `Menu` and `X` from `lucide-react`.
*   **Overlay**: A fixed-position div with a backdrop blur and slide-in animation.

## Usage

*   Click the Menu icon in the top right of the home screen header to open.
*   Click the X icon or the backdrop to close.
*   Selecting an item closes the menu and navigates to the view.
