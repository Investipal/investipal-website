# Feature Page Layout System

This system ensures all feature pages follow the same standardized layout while allowing for customization where needed.

## Overview

The feature page system consists of:

1. **`FeaturePageLayout.astro`** - The standardized layout component
2. **`featurePagesData.ts`** - Centralized content management
3. **Individual feature pages** - Use the layout with optional custom sections

## Standardized Layout Structure

Every feature page follows this exact structure:

```
1. Hero Section (with audience badge + feature name)
2. Trusted By Section
3. Features Section (2x2 grid + dashboard image)
4. Productivity Section (purple background with stats)
5. [Custom Sections via slot] 
6. Security Section
7. Testimonial Section
8. CTA Section
```

## How to Create/Update Feature Pages

### 1. Add Content to Data File

First, add your feature page data to `src/data/featurePagesData.ts`:

```typescript
export const featurePages = {
  'your-feature-name': {
    // SEO Meta
    pageTitle: 'Your Feature | Investipal',
    pageDescription: 'Description for SEO',

    // Hero Section
    audienceText: 'For Your Target Audience',
    featureName: 'Your Feature Name',
    title: 'Your Main Headline',
    subtitle: 'Your subtitle description',
    heroImage: 'https://your-image-url.com/image.png',
    heroImageAlt: 'Alt text for your image',

    // Features Section (2x2 grid)
    features: [
      {
        icon: icons.yourIcon, // Use predefined icons
        title: 'Feature Title',
        description: 'Feature description'
      },
      // ... 3 more features
    ],
    dashboardImage: 'https://your-dashboard-image.com/image.png',
    dashboardImageAlt: 'Dashboard alt text',

    // Productivity Section
    productivityTitle: 'Your productivity headline',
    productivityDescription: 'Your productivity description',
    stats: [
      { value: '95%', label: 'Your stat label' },
      { value: '8', label: 'Your second stat label' }
    ]
  }
}
```

### 2. Create the Feature Page

Create your feature page file in `src/pages/features/your-feature-name.astro`:

```astro
---
import FeaturePageLayout from '../../components/layouts/FeaturePageLayout.astro';
import { featurePages } from '../../data/featurePagesData';

const pageData = featurePages['your-feature-name'];
---

<FeaturePageLayout {...pageData}>
  <!-- Optional: Add custom sections here -->
  <!-- These will appear between Productivity and Security sections -->
  
  <!-- Example: Custom pricing section -->
  <section class="bg-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Your custom content -->
    </div>
  </section>
</FeaturePageLayout>
```

### 3. For Pages Without Custom Sections

If your page doesn't need custom sections, it's even simpler:

```astro
---
import FeaturePageLayout from '../../components/layouts/FeaturePageLayout.astro';
import { featurePages } from '../../data/featurePagesData';

const pageData = featurePages['your-feature-name'];
---

<FeaturePageLayout {...pageData} />
```

## Available Icons

Pre-defined icons in `featurePagesData.ts`:

- `icons.document` - Document icon
- `icons.upload` - Upload icon  
- `icons.analytics` - Analytics/chart icon
- `icons.download` - Download icon
- `icons.shield` - Security/shield icon
- `icons.speed` - Speed/lightning icon
- `icons.portfolio` - Portfolio icon
- `icons.optimization` - Settings/optimization icon
- `icons.analysis` - Analysis icon
- `icons.monitoring` - Monitoring/check icon

To add new icons, add them to the `icons` object in `featurePagesData.ts`.

## Updating the Layout

To change the layout for ALL feature pages:

1. **Structure changes**: Edit `src/components/layouts/FeaturePageLayout.astro`
2. **Content changes**: Edit `src/data/featurePagesData.ts`
3. **Styling changes**: Update the CSS classes in the layout component

## Benefits of This System

✅ **Consistency** - All feature pages look identical
✅ **Maintainability** - Change layout once, affects all pages  
✅ **Content Management** - All content in one centralized location
✅ **Flexibility** - Custom sections via slot system
✅ **Type Safety** - TypeScript interfaces ensure data integrity
✅ **SEO Optimized** - Proper meta tags for each page
✅ **Performance** - Shared components and optimized loading

## Examples

- **Standard page**: `automated-statement-scanner-new.astro` (with custom pricing)
- **Simple page**: Just import layout + data, no custom sections

This system ensures that when you want to update the layout in the future, you only need to modify the layout component and all feature pages will automatically inherit the changes.


