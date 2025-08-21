# Investipal Design System

This document outlines the standardized design system for the Investipal website, ensuring consistent colors, typography, and component styling across all pages.

## Color System

### Primary Brand Colors

The Investipal brand uses a purple/violet color palette as its primary brand identity:

- **Primary**: `#7c3aed` (investipal-600) - Main brand color
- **Primary Hover**: `#6d28d9` (investipal-700) - Hover states
- **Primary Light**: `#ede9fe` (investipal-100) - Backgrounds, highlights
- **Primary Dark**: `#5b21b6` (investipal-800) - Darker accents

### Usage Guidelines

#### Text Colors
```html
<!-- Primary brand text -->
<span class="text-investipal-600">Brand text</span>

<!-- Hover states -->
<a class="text-investipal-600 hover:text-investipal-700">Link</a>

<!-- Light brand text -->
<span class="text-investipal-400">Subtle brand text</span>
```

#### Background Colors
```html
<!-- Primary brand background -->
<div class="bg-investipal-600">Primary background</div>

<!-- Light brand background -->
<div class="bg-investipal-100">Light background</div>

<!-- Gradient backgrounds -->
<div class="bg-gradient-to-r from-investipal-600 to-investipal-700">Gradient</div>
```

#### Buttons
```html
<!-- Primary button -->
<button class="bg-investipal-600 hover:bg-investipal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
  Primary Button
</button>

<!-- Secondary button -->
<button class="bg-investipal-100 hover:bg-investipal-200 text-investipal-700 font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
  Secondary Button
</button>
```

## Design System Usage

### Import the Design System

```typescript
import { designSystem } from '../data/designSystem';

// Use predefined styles
const { buttons, links, text } = designSystem;
```

### Predefined Component Classes

#### Buttons
- `buttonStyles.primary` - Primary brand button
- `buttonStyles.secondary` - Secondary button
- `buttonStyles.outline` - Outline button
- `buttonStyles.ghost` - Ghost button

#### Links
- `linkStyles.primary` - Primary brand link
- `linkStyles.secondary` - Secondary link
- `linkStyles.underline` - Underlined link

#### Text
- `textColors.primary` - Primary text color
- `textColors.secondary` - Secondary text color
- `textColors.brand` - Brand text color

## Migration Guide

### Replacing Blue Colors

All blue colors should be replaced with the appropriate Investipal purple:

```html
<!-- Before -->
<div class="text-blue-600">Blue text</div>
<button class="bg-blue-600">Blue button</button>

<!-- After -->
<div class="text-investipal-600">Brand text</div>
<button class="bg-investipal-600">Brand button</button>
```

### Common Replacements

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `text-blue-600` | `text-investipal-600` | Primary text, links |
| `bg-blue-600` | `bg-investipal-600` | Primary buttons, backgrounds |
| `border-blue-600` | `border-investipal-600` | Primary borders |
| `hover:text-blue-700` | `hover:text-investipal-700` | Hover states |
| `hover:bg-blue-700` | `hover:bg-investipal-700` | Button hover states |

## CSS Custom Properties

The design system includes CSS custom properties for advanced usage:

```css
/* Using CSS custom properties */
.brand-element {
  color: var(--investipal-600);
  background-color: var(--investipal-100);
}

/* Utility classes */
.brand-primary { color: var(--investipal-600); }
.brand-primary-bg { background-color: var(--investipal-600); }
```

## Dark Mode Support

The design system includes dark mode support through CSS custom properties:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary: var(--investipal-400);
    /* Other dark mode adjustments */
  }
}
```

## Best Practices

1. **Always use the design system constants** instead of hardcoding colors
2. **Use semantic color names** (primary, secondary, success, etc.) when possible
3. **Maintain consistency** across all components and pages
4. **Test hover states** and ensure they use the correct brand colors
5. **Use the predefined component classes** for common UI elements

## File Structure

```
src/
├── data/
│   └── designSystem.ts          # Design system constants
├── styles/
│   └── global.css              # CSS custom properties and utilities
└── src/styles/global.css       # Tailwind v4 configuration with brand colors (@theme directive)
```

## Updating Colors

To update the brand colors:

1. Update the color values in `src/styles/global.css` within the `@theme` directive
2. Update the CSS custom properties in `global.css`
3. Update the design system constants in `designSystem.ts`
4. Test all components to ensure consistency

This ensures that all color changes are centralized and consistent across the entire application.
