# Component Architecture & Reusability Rules

## 🚨 **CRITICAL: NO CODE DUPLICATION**

**This document enforces the rule: NEVER duplicate code across pages. Always use shared components.**

## 📋 Component Reusability Checklist

Before creating any new page or section, ask yourself:

- [ ] Does this section already exist as a component?
- [ ] Can I make an existing component more configurable?
- [ ] Should I create a new reusable component?
- [ ] Am I about to copy-paste code between pages? (STOP if yes)

## 🏗️ Component Hierarchy

### 1. **Layout Components** (Always Reused)
```
Layout.astro          # Main page wrapper
Header.astro          # Site navigation
Footer.astro          # Site footer
CookieBanner.astro    # Cookie consent
```

### 2. **Section Components** (Always Reused)
```
sections/
├── HeroSection.astro           # Page hero with configurable content
├── TrustedBySection.astro      # Logo carousel
├── FeaturesSection.astro       # Feature grid with configurable features
├── ProductivitySection.astro   # Stats section with configurable metrics
├── SecuritySection.astro       # Security features (standardized)
├── TestimonialSection.astro    # Customer testimonials
├── CTASection.astro           # Call-to-action (standardized)
└── PricingSection.astro       # Pricing tables
```

### 3. **UI Components** (Always Reused)
```
ui/
├── Button.astro               # Standardized buttons
├── Card.astro                 # Content cards
├── Badge.astro               # Status badges
├── Icon.astro                # SVG icons
└── Modal.astro               # Popup modals
```

## 📝 Component Props & Configuration

### HeroSection.astro
```astro
---
interface Props {
  badge?: string;
  title: string;
  description: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}
---
```

### FeaturesSection.astro
```astro
---
interface Props {
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  title?: string;
  subtitle?: string;
}
---
```

### ProductivitySection.astro
```astro
---
interface Props {
  stats: Array<{
    value: string;
    label: string;
  }>;
  title?: string;
  subtitle?: string;
}
---
```

## 🔄 Migration Guide

### Converting Duplicated Code to Components

1. **Identify duplicated sections** across pages
2. **Extract common structure** into a component
3. **Make it configurable** with props
4. **Update all pages** to use the component
5. **Remove duplicated code**

### Example: Converting Hero Sections

**Before (Duplicated):**
```astro
<!-- Page 1 -->
<section class="bg-white py-20">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <div class="text-center mb-12">
      <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-800 mb-4">
        For Advisors & Planners
      </div>
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Parse & Analyze Client Account Statements in Seconds
      </h1>
      <!-- ... more duplicated code -->
    </div>
  </div>
</section>

<!-- Page 2 (Same structure, different content) -->
<section class="bg-white py-20">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <div class="text-center mb-12">
      <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-800 mb-4">
        For Wealth Managers
      </div>
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Different Title Here
      </h1>
      <!-- ... more duplicated code -->
    </div>
  </div>
</section>
```

**After (Component-based):**
```astro
<!-- HeroSection.astro -->
---
interface Props {
  badge?: string;
  title: string;
  description: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

const { badge, title, description, image, ctaText = "Schedule a Demo", ctaLink = "/book-a-demo" } = Astro.props;
---

<section class="bg-white py-20">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <div class="text-center mb-12">
      {badge && (
        <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-800 mb-4">
          {badge}
        </div>
      )}
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        {title}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        {description}
      </p>
      <a href={ctaLink} class="inline-flex items-center px-8 py-4 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors">
        {ctaText}
      </a>
    </div>
    {image && (
      <div class="text-center">
        <img src={image} alt="Hero image" class="max-w-4xl mx-auto" loading="lazy">
      </div>
    )}
  </div>
</section>

<!-- Usage in pages -->
<HeroSection 
  badge="For Advisors & Planners"
  title="Parse & Analyze Client Account Statements in Seconds"
  description="Scan any brokerage statement in any file format—from PDF to PNG—using OCR & AI."
  image="/images/statement-scanner-hero.png"
/>
```

## 📊 Data Management

### Centralized Data Storage
```typescript
// src/data/featuresData.ts
export const statementScannerFeatures = [
  {
    icon: "parse-icon",
    title: "Parse",
    description: "Let OCR & Gen-AI instantly convert PDFs, images, faxes..."
  },
  // ... more features
];

// src/data/testimonialsData.ts
export const testimonials = [
  {
    quote: "We're deeply committed to integrating cutting-edge technology...",
    author: "Lauren M. Williams",
    title: "CEO. ProsperPlan Wealth",
    avatar: "/images/lauren-williams.png",
    company: "/images/prosperplan-logo.png"
  }
];

// src/data/pricingData.ts
export const pricingPlans = [
  {
    name: "Usage-based",
    price: "$15",
    period: "/statement",
    features: ["PDF Brokerage Statements", "Ticker Enrichment", "Image Scans"]
  }
];
```

## 🎯 Page Template

### Standard Feature Page Structure
```astro
---
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import CookieBanner from '../../components/ui/CookieBanner.astro';
import HeroSection from '../../components/sections/HeroSection.astro';
import TrustedBySection from '../../components/sections/TrustedBySection.astro';
import FeaturesSection from '../../components/sections/FeaturesSection.astro';
import ProductivitySection from '../../components/sections/ProductivitySection.astro';
import SecuritySection from '../../components/sections/SecuritySection.astro';
import TestimonialSection from '../../components/sections/TestimonialSection.astro';
import CTASection from '../../components/sections/CTASection.astro';
import { statementScannerFeatures } from '../../data/featuresData';
import { statementScannerStats } from '../../data/statsData';
---

<Layout title="AI Statement Scanner | Investipal" description="Extract and analyze client account statements instantly with AI.">
  <Header />
  <main id="main">
    <HeroSection 
      badge="For Advisors & Planners"
      title="Parse & Analyze Client Account Statements in Seconds"
      description="Scan any brokerage statement in any file format—from PDF to PNG—using OCR & AI. First 3 statements are free, then only pay for what you use."
      image="https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/66cf592dcb1be92d31050903_Account%20Statement%20Scanning%20for%20Financial%20Advisors%201.png"
    />
    <TrustedBySection />
    <FeaturesSection features={statementScannerFeatures} />
    <ProductivitySection stats={statementScannerStats} />
    <SecuritySection />
    <TestimonialSection />
    <CTASection />
  </main>
  <Footer />
  <CookieBanner />
</Layout>
```

## 🔍 Quality Assurance

### Before Committing Code
- [ ] No duplicated sections between pages
- [ ] All pages use shared components
- [ ] Components are properly configured with props
- [ ] Data is stored in centralized files
- [ ] Brand colors and typography are consistent
- [ ] Components work across all screen sizes

### Testing Checklist
- [ ] Test component across multiple pages
- [ ] Verify responsive behavior
- [ ] Check accessibility
- [ ] Validate HTML structure
- [ ] Test with different data configurations

## 🚫 Anti-Patterns to Avoid

### ❌ Don't Do This
```astro
<!-- DON'T: Duplicate sections between pages -->
<!-- Page 1 -->
<section class="bg-violet-600 py-20">
  <div class="max-w-7xl mx-auto px-4 md:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">See Investipal in Action</h2>
    <!-- ... duplicated code -->
  </div>
</section>

<!-- Page 2 -->
<section class="bg-violet-600 py-20">
  <div class="max-w-7xl mx-auto px-4 md:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">See Investipal in Action</h2>
    <!-- ... same duplicated code -->
  </div>
</section>
```

### ✅ Do This Instead
```astro
<!-- DO: Use shared components -->
<!-- CTASection.astro -->
<section class="bg-violet-600 py-20">
  <div class="max-w-7xl mx-auto px-4 md:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
    <p class="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">{description}</p>
    <div class="flex justify-center">
      <a href={ctaLink} class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-violet-600 bg-white hover:bg-violet-50 transition-colors">
        {ctaText}
      </a>
    </div>
  </div>
</section>

<!-- Usage in pages -->
<CTASection 
  title="See Investipal in Action"
  description="Curious how Investipal can help accelerate your firm's growth?"
  ctaText="Schedule a Demo"
  ctaLink="/book-a-demo"
/>
```

## 📚 Resources

- [Astro Component Documentation](https://docs.astro.build/en/core-concepts/astro-components/)
- [Design System Guidelines](./DESIGN_SYSTEM.md)
- [Component Examples](./src/components/sections/)
