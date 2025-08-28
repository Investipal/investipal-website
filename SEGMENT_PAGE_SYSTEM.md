# Segment Page System Documentation

## Overview

The segment page system provides a standardized, maintainable approach for all segment-specific pages (Financial Planners, Wealth Managers, Wealth Firms, Insurance). This system ensures 1:1 alignment with the live Investipal website while providing centralized content management and consistent styling.

## Architecture

### Components

1. **`SegmentPageLayout.astro`** - The main layout component that handles the structure and styling
2. **`segmentPagesData.ts`** - Centralized data store for all segment page content
3. **Individual segment pages** - Simple files that import and use the standardized system

### Key Features

- ✅ **1:1 Live Website Matching** - Exact content and structure replication
- ✅ **Proper Brand Colors** - Uses `investipal` colors instead of `violet`
- ✅ **Centralized Content Management** - All content in one TypeScript file
- ✅ **Type Safety** - Full TypeScript interfaces for content structure
- ✅ **Consistent Layout** - Same structure across all segment pages
- ✅ **Easy Maintenance** - Update content in one place, applies everywhere

## File Structure

```
src/
├── components/
│   └── layouts/
│       └── SegmentPageLayout.astro       # Main layout component
├── data/
│   └── segmentPagesData.ts              # Centralized content
└── pages/
    └── segments/
        ├── financial-planners.astro      # Uses standardized system
        ├── wealth-managers.astro         # Uses standardized system
        ├── wealth-firms.astro            # Uses standardized system
        └── insurance.astro               # Uses standardized system
```

## Content Structure

Each segment page follows this standardized content structure:

### Hero Section
- Simple badge with segment name
- Large, impactful headline
- Descriptive subtitle
- CTA button
- Hero image

### Main Content Sections (3 sections typically)
Each section includes:
- Section header (e.g., "Portfolios", "Sales", "Compliance")
- Section title
- Description paragraph
- 3 bullet points with bold key phrases
- Dashboard/mockup image
- Configurable image position (left/right)

### Standard Footer Sections
- Productivity stats section
- Security section
- Testimonial section
- CTA section

## Usage

### Adding a New Segment Page

1. **Add data to `segmentPagesData.ts`:**
```typescript
'new-segment': {
  pageTitle: 'New Segment - Investipal',
  pageDescription: 'Description for SEO',
  segmentName: 'New Segment',
  title: 'Main Hero Title',
  subtitle: 'Hero subtitle description',
  heroImage: 'https://cdn.prod.website-files.com/...',
  heroImageAlt: 'Alt text for hero image',
  sections: [
    {
      id: 'section1',
      sectionHeader: 'Section Header',
      title: 'Section Title',
      description: 'Section description with <strong>bold</strong> text',
      bulletPoints: [
        { text: '<strong>Key phrase</strong> – Description' },
        // ... more bullet points
      ],
      image: 'https://cdn.prod.website-files.com/...',
      imageAlt: 'Alt text',
      imagePosition: 'right'
    }
    // ... more sections
  ],
  productivityStats: [
    { value: '4x', label: 'Benefit description' },
    { value: '70%', label: 'Another benefit' }
  ]
}
```

2. **Create the page file:**
```astro
---
import SegmentPageLayout from '../../components/layouts/SegmentPageLayout.astro';
import { segmentPages } from '../../data/segmentPagesData';

const pageData = segmentPages['new-segment'];
---

<SegmentPageLayout {...pageData} />
```

### Updating Existing Content

Simply modify the content in `segmentPagesData.ts`. Changes automatically apply to all pages using that data.

### Customizing Layout

The `SegmentPageLayout.astro` component can be modified to adjust:
- Overall page structure
- Section layouts
- Styling and spacing
- Component order

## Content Guidelines

### Writing Style
- Use **bold tags** for key phrases in bullet points
- Keep descriptions concise but impactful
- Include specific benefits and value propositions
- Match the tone and style of the live website

### Images
- Use high-quality dashboard mockups from the live site
- Ensure proper alt text for accessibility
- Alternate image positions (left/right) for visual variety

### Bullet Points
- Start with bold key phrase
- Follow with em dash (–) and description
- Keep descriptions focused and benefit-oriented
- Typically 3 bullet points per section

## Benefits of This System

1. **Consistency** - All segment pages follow the same proven structure
2. **Maintainability** - Content updates in one place apply everywhere
3. **Scalability** - Easy to add new segment pages
4. **Type Safety** - TypeScript interfaces prevent content errors
5. **Live Site Alignment** - Ensures 1:1 matching with production website
6. **Brand Compliance** - Proper use of Investipal brand colors and styling

## Related Systems

This segment page system complements the existing **Feature Page System** (`FeaturePageLayout.astro` and `featurePagesData.ts`), providing consistent patterns across all page types in the Investipal website.

## Migration Notes

All segment pages have been migrated from the old custom layout system to this standardized approach. The old files contained:
- Inconsistent `violet` colors (now fixed to `investipal`)
- Custom layouts that were hard to maintain
- Content not matching the live website
- Duplicate code across pages

The new system addresses all these issues while providing a solid foundation for future updates.


