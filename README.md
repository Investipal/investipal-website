# Investipal - Astro Website

A modern, responsive website for Investipal built with Astro and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with Astro for optimal performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component-Based**: Modular components for easy maintenance
- **SEO Optimized**: Built-in SEO features and meta tags
- **Fast Loading**: Optimized for performance and Core Web Vitals

## 🏗️ Architecture & Component Rules

### **CRITICAL: Component Reusability Rules**

**NEVER duplicate code across pages. Always use shared components to ensure consistency and maintainability.**

#### ✅ **DO: Use Shared Components**
- Create reusable components in `src/components/sections/`
- Import and use existing components across all pages
- Update one component to update everywhere

#### ❌ **DON'T: Duplicate Code**
- Don't copy-paste sections between pages
- Don't create page-specific versions of common sections
- Don't hardcode content that should be in components

### **Component Structure**

```
src/components/
├── sections/           # Reusable page sections
│   ├── HeroSection.astro
│   ├── TrustedBySection.astro
│   ├── FeaturesSection.astro
│   ├── ProductivitySection.astro
│   ├── SecuritySection.astro
│   ├── TestimonialSection.astro
│   ├── CTASection.astro
│   └── PricingSection.astro
├── ui/                 # UI components
│   ├── CookieBanner.astro
│   └── ...
├── Header.astro        # Site header
└── Footer.astro        # Site footer
```

### **Page Structure Template**

Every feature page should follow this structure:

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
---

<Layout title="Page Title | Investipal" description="Page description">
  <Header />
  <main id="main">
    <HeroSection 
      badge="For Advisors & Planners"
      title="Page-specific title"
      description="Page-specific description"
      image="page-specific-image.png"
    />
    <TrustedBySection />
    <FeaturesSection 
      features={pageSpecificFeatures}
    />
    <ProductivitySection 
      stats={pageSpecificStats}
    />
    <SecuritySection />
    <TestimonialSection />
    <CTASection />
  </main>
  <Footer />
  <CookieBanner />
</Layout>
```

### **Data Management**

Store page-specific data in `src/data/`:
- `featuresData.ts` - Feature configurations
- `testimonialsData.ts` - Testimonial content
- `pricingData.ts` - Pricing information

### **🎨 CRITICAL: Design Consistency Requirements**

**EVERY element must follow the standardized design system. NO exceptions.**

#### **✅ Required Standards:**

**Icon Styling:**
```css
/* ✅ STANDARD: Light purple background */
bg-investipal-100 text-investipal-600
/* ❌ NEVER: Dark purple background */
bg-investipal-600 (too heavy/jarring)
```

**Checkmark Styling:**
```css
/* ✅ STANDARD: Soft green */
bg-green-100 text-green-600 rounded-full
/* ❌ NEVER: Bright green gradients */
bg-gradient-to-r from-green-400 to-green-500 (too vibrant)
```

**Badge Styling:**
```css
/* ✅ STANDARD: Consistent badge pattern */
bg-investipal-50 rounded-full px-6 py-2
inner: bg-investipal-600 text-white px-3 py-1 rounded-full
```

**Button Styling:**
```css
/* ✅ STANDARD: Smooth interactions */
transition-all duration-500 ease-out
:hover:scale-[1.02] (subtle scaling only)
/* ❌ NEVER: Jarring animations */
:hover:scale-105 or higher (too aggressive)
```

#### **🔍 Pre-Flight Design Checklist:**

Before creating or updating ANY component:

- [ ] Does this match the exact styling used on other pages?
- [ ] Are icon backgrounds light purple (`bg-investipal-100`)?
- [ ] Are checkmarks soft green (`bg-green-100 text-green-600`)?
- [ ] Are all hover effects smooth and subtle?
- [ ] Is the color scheme consistent with the design system?
- [ ] Have I tested this component across multiple pages?

#### **🚨 Design Violation Examples:**

**NEVER mix these styles on the same website:**
- Dark purple icons (`bg-investipal-600`) AND light purple icons (`bg-investipal-100`)
- Bright green checkmarks (`from-green-400 to-green-500`) AND soft green checkmarks (`bg-green-100`)
- Heavy hover effects (`scale-105`) AND subtle hover effects (`scale-[1.02]`)

#### **📏 STANDARDIZED SIZING SYSTEM:**

**Icon Sizes (FIXED - NO EXCEPTIONS):**
```css
/* Large Icons - Main section icons */
Container: w-16 h-16 bg-investipal-100 rounded-xl
Icon: w-6 h-6 text-investipal-600

/* Medium Icons - Feature grid icons */  
Container: w-12 h-12 bg-investipal-100 rounded-lg
Icon: w-5 h-5 text-investipal-600

/* Small Icons - List item icons */
Container: w-10 h-10 bg-investipal-100 rounded-lg  
Icon: w-4 h-4 text-investipal-600
```

**Typography Hierarchy (SEO CRITICAL):**
```css
/* H1 - Page Title (ONLY ONE per page) */
text-4xl md:text-5xl lg:text-6xl font-bold

/* H2 - Section Titles */
text-3xl md:text-4xl lg:text-5xl font-bold

/* H3 - Subsection Titles */
text-2xl md:text-3xl lg:text-4xl font-bold

/* H4 - Feature Titles */
text-xl md:text-2xl font-semibold

/* Hero Subtitle - Below main title */
text-lg md:text-xl text-gray-600

/* Body Large - Section introductions */
text-xl text-gray-600

/* Body - Standard text */
text-lg text-gray-600

/* Subtitle - General use */
text-base md:text-lg text-gray-600

/* Section Headers/Badges - Category labels */
text-sm font-semibold text-investipal-600 tracking-wide
```

**Badge Standards (CRITICAL FOR CONSISTENCY):**
```css
/* RULE: All badges must use proper case, NEVER ALL CAPS */
/* Examples: "Portfolios", "Compliance", "Productivity" NOT "PORTFOLIOS", "COMPLIANCE" */

/* Standard badge container */
bg-investipal-50 rounded-full px-4 py-2 mb-6

/* Badge text (NO uppercase class) */
text-sm font-semibold text-investipal-600 tracking-wide

/* Badge with dot indicator */
w-2 h-2 bg-investipal-600 rounded-full mr-2

/* Hero page badges */
bg-investipal-600 text-white px-3 py-1 rounded-full text-sm font-medium
```

**Spacing System (MANDATORY):**
```css
/* Section Spacing */
py-16 md:py-20 lg:py-24 (standard)
py-20 md:py-24 lg:py-28 (large sections)

/* Container */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

/* Grid Gaps */
gap-8 lg:gap-12 (standard)

``` 

#### **🔍 SEO Structure Requirements:**

**Heading Hierarchy (CRITICAL):**
- **H1**: Page title - EXACTLY ONE per page
- **H2**: Main section titles (Hero, Features, etc.)
- **H3**: Content block titles within sections
- **H4**: Individual feature/item titles
- **H5**: Component titles  
- **H6**: Labels and captions

**Semantic HTML:**
- Use `<section>` for major content areas
- Use `<main id="main">` for main content
- Use `<nav>` for navigation
- Use `<article>` for blog posts
- Use proper list elements (`<ul>`, `<ol>`)

#### **✅ Standard Design Elements:**

- **Colors**: Always use design system colors from `src/data/designSystem.ts`
- **Typography**: Use exact typography classes from design system
- **Spacing**: Use standardized spacing classes only
- **Icons**: Exact sizes and colors as specified above
- **Checkmarks**: `w-6 h-6 bg-green-100` with `w-4 h-4 text-green-600` icon
- **Animations**: Smooth, subtle, 500ms duration with `ease-out`

## 📁 Project Structure

```
investipal-astro/
├── src/
│   ├── components/
│   │   ├── sections/          # Reusable page sections
│   │   ├── ui/               # UI components
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── data/                 # Data and configurations
│   ├── layouts/              # Page layouts
│   ├── pages/                # Page routes
│   └── styles/               # Global styles
├── public/                   # Static assets
└── package.json
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🔧 Development Guidelines

### **Adding New Pages**
1. Create the page in `src/pages/`
2. Use the standard page structure template
3. Import and use existing section components
4. Add page-specific data to `src/data/` if needed

### **Updating Components**
1. Modify the component in `src/components/sections/`
2. Changes automatically apply to all pages using that component
3. Test across multiple pages to ensure consistency

### **Adding New Sections**
1. Create new component in `src/components/sections/`
2. Make it configurable with props for different content
3. Update existing pages to use the new component
4. Document the component's props and usage

## 🎨 Design System

All design tokens are defined in `src/data/designSystem.ts`:
- Colors (violet-600, gray-900, etc.)
- Typography scales
- Spacing values
- Component variants

## 📝 Content Management

- **Static content**: Store in `src/data/` files
- **Dynamic content**: Use CMS or API integration
- **Images**: Store in `public/images/` with descriptive names
- **SEO**: Update meta tags in Layout component

## 🔍 SEO & Performance

- All pages include proper meta tags
- Images use lazy loading
- Components are optimized for Core Web Vitals
- Semantic HTML structure throughout

## 🧪 Testing

- Test components across different screen sizes
- Verify consistency across all pages
- Check accessibility with screen readers
- Validate HTML and CSS

## 📚 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Design System Guidelines](./docs/project/DESIGN_SYSTEM.md)

---

## 📚 Repository Navigation
- `docs/README.md` — Documentation index
- `docs/ai-cmo/README.md` — AI CMO docs index
- `scripts/README.md` — Scripts index
- `reports/README.md` — Reports index
- `reports/audits/README.md` — Consolidated audits index
- `src/README.md` — Source overview
- `api/README.md` — API functions
