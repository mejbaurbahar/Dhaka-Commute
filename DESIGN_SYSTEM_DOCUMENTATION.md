# Dhaka Commute - Design System Documentation

**Project:** Dhaka Commute  
**Last Updated:** 2025-12-17  
**Version:** 1.0

---

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components Styling](#components-styling)
5. [Animations](#animations)
6. [Shadows & Effects](#shadows--effects)
7. [Responsive Breakpoints](#responsive-breakpoints)
8. [Dark Mode](#dark-mode)

---

## 1. Color Palette

### Brand Colors
```css
/* Primary Red */
--dhaka-red: #EF4444;
rgb(239, 68, 68)

/* Primary Green */
--dhaka-green: #10B981;
rgb(16, 185, 129)

/* Primary Dark */
--dhaka-dark: #1F2937;
rgb(31, 41, 55)
```

### Background Colors

#### Light Mode
```css
/* Main Background */
background-color: #f8fafc;
rgb(248, 250, 252)

/* Gradient Backgrounds */
from-emerald-50: rgb(236, 253, 245)
via-blue-50: rgb(239, 246, 255)
to-purple-50: rgb(250, 245, 255)

/* Card/Panel Backgrounds */
white: #FFFFFF
rgb(255, 255, 255)

/* Secondary Backgrounds */
gray-100: rgb(243, 244, 246)
gray-50: rgb(249, 250, 251)
```

#### Dark Mode
```css
/* Main Background */
from-slate-900: rgb(15, 23, 42)
via-slate-800: rgb(30, 41, 59)
to-indigo-950: rgb(23, 23, 46)

/* Card/Panel Backgrounds */
slate-900: rgb(15, 23, 42)
slate-800: rgb(30, 41, 59)

/* Secondary Backgrounds */
slate-700: rgb(51, 65, 85)
```

### Text Colors

#### Light Mode
```css
/* Primary Text */
gray-800: rgb(31, 41, 55)
gray-900: rgb(17, 24, 39)

/* Secondary Text */
gray-600: rgb(75, 85, 99)
gray-500: rgb(107, 114, 128)

/* Tertiary Text */
gray-400: rgb(156, 163, 175)
```

#### Dark Mode
```css
/* Primary Text */
gray-100: rgb(243, 244, 246)
white: rgb(255, 255, 255)

/* Secondary Text */
gray-300: rgb(209, 213, 219)
gray-400: rgb(156, 163, 175)
```

### Accent Colors
```css
/* Blue Accent */
blue-500: rgb(59, 130, 246)
blue-600: rgb(37, 99, 235)
blue-700: rgb(29, 78, 216)

/* Emerald Accent */
emerald-500: rgb(16, 185, 129)
emerald-600: rgb(5, 150, 105)

/* Orange Accent */
orange-500: rgb(249, 115, 22)
orange-600: rgb(234, 88, 12)

/* Purple Accent */
purple-500: rgb(168, 85, 247)
purple-600: rgb(147, 51, 234)

/* Pink Accent */
pink-500: rgb(236, 72, 153)
pink-600: rgb(219, 39, 119)

/* Indigo Accent */
indigo-500: rgb(99, 102, 241)
indigo-600: rgb(79, 70, 229)

/* Yellow Accent */
yellow-300: rgb(253, 224, 71)
yellow-400: rgb(250, 204, 21)
```

### Transport Mode Colors
```css
/* Plane/Flight */
blue-500: rgb(59, 130, 246)
blue-600: rgb(37, 99, 235)

/* Bus */
emerald-500: rgb(16, 185, 129)
emerald-600: rgb(5, 150, 105)

/* Train */
orange-500: rgb(249, 115, 22)
orange-600: rgb(234, 88, 12)

/* Metro */
purple-600: rgb(147, 51, 234)

/* Ship/Boat */
teal-500: rgb(20, 184, 166)
```

### Scrollbar Colors
```css
/* Light Mode */
--scrollbar-thumb: #cbd5e1;
--scrollbar-thumb-hover: #94a3b8;
--scrollbar-track: rgba(0, 0, 0, 0.05);

/* Dark Mode */
--scrollbar-thumb-dark: rgba(255, 255, 255, 0.2);
--scrollbar-thumb-hover-dark: rgba(255, 255, 255, 0.3);
--scrollbar-track-dark: rgba(255, 255, 255, 0.05);
```

---

## 2. Typography

### Font Families
```css
/* Primary Font (English) */
font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;

/* Bengali Font */
font-family: 'Noto Sans Bengali', Arial, sans-serif;

/* Font Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap');
```

### Font Sizes
```css
/* Headings */
--text-4xl: 2.25rem;      /* 36px - Mobile: 2.5rem/40px */
--text-3xl: 1.875rem;     /* 30px */
--text-2xl: 1.5rem;       /* 24px */
--text-xl: 1.25rem;       /* 20px */
--text-lg: 1.125rem;      /* 18px */

/* Body Text */
--text-base: 1rem;        /* 16px */
--text-sm: 0.875rem;      /* 14px - Mobile: 0.8125rem/13px for small screens */
--text-xs: 0.75rem;       /* 12px - Mobile: 0.6875rem/11px for small screens */

/* Mobile Optimized (max-width: 768px) */
body {
  font-size: 14px;
}

/* Very Small Screens (max-width: 375px) */
.text-sm: 0.8125rem;  /* 13px */
.text-xs: 0.6875rem;  /* 11px */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--line-height-none: 1;
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

### Letter Spacing
```css
--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

---

## 3. Spacing & Layout

### Spacing Scale (Tailwind)
```css
/* Padding/Margin Values */
--space-0: 0px;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### Border Radius
```css
--rounded-none: 0px;
--rounded-sm: 0.125rem;     /* 2px */
--rounded: 0.25rem;         /* 4px */
--rounded-md: 0.375rem;     /* 6px */
--rounded-lg: 0.5rem;       /* 8px */
--rounded-xl: 0.75rem;      /* 12px */
--rounded-2xl: 1rem;        /* 16px */
--rounded-3xl: 1.5rem;      /* 24px */
--rounded-full: 9999px;
```

### Container Widths
```css
/* Max Widths */
--max-w-xs: 20rem;      /* 320px */
--max-w-sm: 24rem;      /* 384px */
--max-w-md: 28rem;      /* 448px */
--max-w-lg: 32rem;      /* 512px */
--max-w-xl: 36rem;      /* 576px */
--max-w-2xl: 42rem;     /* 672px */
--max-w-3xl: 48rem;     /* 768px */
--max-w-4xl: 56rem;     /* 896px */
--max-w-5xl: 64rem;     /* 1024px */
--max-w-6xl: 72rem;     /* 1152px */
--max-w-7xl: 80rem;     /* 1280px */
```

### Z-Index Layers
```css
--z-0: 0;
--z-10: 10;
--z-20: 20;
--z-30: 30;
--z-40: 40;
--z-50: 50;
--z-header: 5000;
--z-menu: 6000;
```

### Safe Area Insets (for notched devices)
```css
.safe-top {
  padding-top: env(safe-area-inset-top);
}

.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-left {
  padding-left: env(safe-area-inset-left);
}

.safe-right {
  padding-right: env(safe-area-inset-right);
}
```

---

## 4. Components Styling

### Buttons
```css
/* Minimum Touch Target Size */
min-height: 44px;
min-width: 44px;

/* Primary Button */
background: emerald-600 / rgb(5, 150, 105);
color: white;
padding: 0.75rem 1.5rem;
border-radius: 1rem; /* rounded-xl */
font-weight: 600;

/* Secondary Button */
background: gray-100 / rgb(243, 244, 246);
color: gray-700 / rgb(55, 65, 81);
```

### Cards
```css
/* Standard Card */
background: white / rgba(255, 255, 255, 0.9);
backdrop-filter: blur(12px);
border-radius: 1rem; /* rounded-xl */
border: 1px solid rgba(255, 255, 255, 0.5);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

/* Dark Mode Card */
background: rgba(30, 41, 59, 0.9); /* slate-800/90 */
border: 1px solid rgba(51, 65, 85, 0.5);
```

### Glassmorphism Effect
```css
background: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.5);

/* Dark Mode */
background: rgba(30, 41, 59, 0.9);
border: 1px solid rgba(51, 65, 85, 0.5);
```

### Header
```css
/* Height */
height: 80px; /* Desktop: h-20 */
height: auto; /* Mobile with safe-top */

/* Background */
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(24px);

/* Dark Mode */
background: rgba(15, 23, 42, 0.7); /* slate-900/70 */

/* Border */
border-bottom: 1px solid rgba(229, 231, 235, 0.5);
```

### Scrollbar
```css
/* Width/Height */
width: 6px;
height: 6px;

/* Track */
background: rgba(0, 0, 0, 0.05); /* Light */
background: rgba(255, 255, 255, 0.05); /* Dark */
border-radius: 10px;

/* Thumb */
background: rgba(0, 0, 0, 0.2); /* Light */
background: rgba(255, 255, 255, 0.2); /* Dark */
border-radius: 10px;

/* Hover */
background: rgba(0, 0, 0, 0.3); /* Light */
background: rgba(255, 255, 255, 0.3); /* Dark */
```

---

## 5. Animations

### Custom Animations

#### Pulse Slow
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

#### Cloud Movement
```css
@keyframes cloud-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100vw);
  }
}

/* Cloud 1 */
animation: cloud-move 60s linear infinite;

/* Cloud 2 */
animation: cloud-move 45s linear infinite;
```

#### Plane Flying
```css
@keyframes plane-fly {
  0% {
    transform: translateX(-10vw) translateY(0);
  }
  100% {
    transform: translateX(110vw) translateY(0);
  }
}

animation: plane-fly 45s linear infinite;
```

#### Bubble Float
```css
@keyframes bubble-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  25% {
    opacity: 0;
  }
  35%, 90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

animation: bubble-float 6s ease-in-out infinite;
```

#### Metro Movement
```css
@keyframes metro-move {
  0% {
    transform: translateX(110vw);
  }
  100% {
    transform: translateX(-250%);
  }
}

animation: metro-move 12s linear infinite;
```

#### Bus Movement
```css
@keyframes bus-move {
  0% {
    transform: translateX(-20vw);
  }
  100% {
    transform: translateX(120vw);
  }
}

animation: bus-move 20s linear infinite;
```

#### CNG Movement
```css
@keyframes cng-move {
  0% {
    transform: translateX(120vw);
  }
  100% {
    transform: translateX(-20vw);
  }
}

animation: cng-move 25s linear infinite;
```

#### Boat Movement
```css
@keyframes boat-move {
  0% {
    transform: translateX(-10vw);
  }
  100% {
    transform: translateX(110vw);
  }
}

animation: boat-move 35s linear infinite;
```

#### Boat Rocking
```css
@keyframes boat-rock {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(2deg);
  }
  75% {
    transform: rotate(-2deg);
  }
}

animation: boat-rock 3s ease-in-out infinite;
```

#### Wave Flow
```css
@keyframes wave-flow {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

animation: wave-flow 10s linear infinite;
```

#### Police Arm Wave
```css
@keyframes police-arm-wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(50deg);
  }
}

animation: police-arm-wave 2s ease-in-out infinite;
```

#### Rain Fall
```css
@keyframes rain-fall {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(100vh);
  }
}

animation: rain-fall 1s linear infinite;
```

#### Fog Drift
```css
@keyframes fog-drift {
  0% {
    transform: translateX(-10%);
  }
  50% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(-10%);
  }
}

animation: fog-drift 20s ease-in-out infinite;
```

#### Spin
```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

animation: spin 6s linear infinite;
```

#### Spin Reverse
```css
@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

animation: spin-reverse 6s linear infinite;
```

#### Float
```css
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

animation: float 3s ease-in-out infinite;
```

### Transition Durations
```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;
```

### Transition Timing Functions
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 6. Shadows & Effects

### Box Shadows
```css
/* Card Shadow */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

/* Small Shadow */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Medium Shadow */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Large Shadow */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
            0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* XL Shadow */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
            0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* 2XL Shadow */
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Colored Shadows */
box-shadow: 0 0 50px rgba(59, 130, 246, 0.2); /* blue-500/20 */
box-shadow: 0 0 50px rgba(99, 102, 241, 0.2); /* indigo-500/20 */
```

### Backdrop Blur
```css
--blur-none: 0;
--blur-sm: 4px;
--blur-md: 8px;
--blur-lg: 12px;
--blur-xl: 16px;
--blur-2xl: 24px;
--blur-3xl: 64px;

backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
```

### Opacity Values
```css
--opacity-0: 0;
--opacity-5: 0.05;
--opacity-10: 0.1;
--opacity-20: 0.2;
--opacity-30: 0.3;
--opacity-40: 0.4;
--opacity-50: 0.5;
--opacity-60: 0.6;
--opacity-70: 0.7;
--opacity-80: 0.8;
--opacity-90: 0.9;
--opacity-100: 1;
```

---

## 7. Responsive Breakpoints

### Tailwind Breakpoints
```css
/* Small (sm) */
@media (min-width: 640px) { }

/* Medium (md) */
@media (min-width: 768px) { }

/* Large (lg) */
@media (min-width: 1024px) { }

/* Extra Large (xl) */
@media (min-width: 1280px) { }

/* 2XL */
@media (min-width: 1536px) { }
```

### Custom Mobile Breakpoints
```css
/* Mobile Optimizations */
@media (max-width: 768px) {
  body {
    font-size: 14px;
    line-height: 1.5;
  }
}

/* Very Small Screens */
@media (max-width: 375px) {
  .text-sm {
    font-size: 0.8125rem; /* 13px */
  }
  
  .text-xs {
    font-size: 0.6875rem; /* 11px */
  }
}
```

---

## 8. Dark Mode

### Implementation
```css
/* Dark Mode Toggle */
darkMode: 'class'

/* Activating Dark Mode */
document.documentElement.classList.add('dark');

/* Deactivating Dark Mode */
document.documentElement.classList.remove('dark');
```

### Dark Mode Color Mappings

#### Backgrounds
```css
/* Light → Dark */
bg-white → dark:bg-slate-900
bg-gray-50 → dark:bg-slate-800
bg-gray-100 → dark:bg-slate-700
```

#### Text
```css
/* Light → Dark */
text-gray-900 → dark:text-gray-100
text-gray-800 → dark:text-gray-200
text-gray-600 → dark:text-gray-400
text-gray-500 → dark:text-gray-400
```

#### Borders
```css
/* Light → Dark */
border-gray-200 → dark:border-gray-700
border-gray-300 → dark:border-gray-600
```

#### Gradients
```css
/* Light Mode */
from-emerald-50 via-blue-50 to-purple-50

/* Dark Mode */
dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950
```

---

## 9. Additional Styles

### Touch Optimizations
```css
/* Smooth momentum scrolling */
-webkit-overflow-scrolling: touch;

/* Tap highlight */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);

/* Touch action */
touch-action: manipulation;

/* User select */
user-select: none;
-webkit-user-select: none;
```

### Text Size Adjustment
```css
/* Prevent text resize on orientation change */
-webkit-text-size-adjust: 100%;
-moz-text-size-adjust: 100%;
-ms-text-size-adjust: 100%;
text-size-adjust: 100%;
```

### Hardware Acceleration
```css
/* For smooth animations */
-webkit-transform: translateZ(0);
transform: translateZ(0);
will-change: transform;
backface-visibility: hidden;
-webkit-backface-visibility: hidden;
```

### Scroll Behavior
```css
/* Smooth scrolling */
scroll-behavior: smooth;
-webkit-overflow-scrolling: touch;

/* Overscroll behavior */
overscroll-behavior-x: none;
```

### Reduced Motion
```css
/* For users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Icon Sizes

### Lucide React Icons
```css
/* Extra Small */
w-3 h-3: 12px

/* Small */
w-4 h-4: 16px

/* Medium */
w-5 h-5: 20px

/* Default */
w-6 h-6: 24px

/* Large */
w-8 h-8: 32px

/* Extra Large */
w-10 h-10: 40px
w-12 h-12: 48px
w-14 h-14: 56px
w-16 h-16: 64px
w-20 h-20: 80px
```

---

## 11. Usage Notes

### Best Practices

1. **Colors**: Always use the defined color palette for consistency
2. **Typography**: Use Inter for English, Noto Sans Bengali for Bengali text
3. **Spacing**: Use the Tailwind spacing scale (multiples of 4px)
4. **Dark Mode**: Always define both light and dark mode styles
5. **Accessibility**: Maintain minimum 44x44px touch targets on mobile
6. **Performance**: Use hardware acceleration for animations
7. **Responsiveness**: Test on mobile (< 768px) and desktop (>= 1024px)

### File Locations
- **Main CSS**: `/src/index.css`
- **Intercity CSS**: `/intercity/index.css`
- **Tailwind Config**: `/tailwind.config.js`, `/intercity/tailwind.config.js`

---

**End of Documentation**
