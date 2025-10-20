# Development Workflow & Component Rules

## 🚨 **MANDATORY: Component Reusability Rules**

**Every developer MUST follow these rules. No exceptions.**

### Rule #1: NEVER Duplicate Code
- ❌ Don't copy-paste sections between pages
- ❌ Don't create page-specific versions of common sections
- ✅ Always use shared components
- ✅ Make components configurable with props

### Rule #2: Always Check Existing Components First
Before writing any new code:
1. Check `src/components/sections/` for existing components
2. Check if an existing component can be made more configurable
3. Only create new components if absolutely necessary

### Rule #3: Centralize Data
- Store all content in `src/data/` files
- Never hardcode content in components
- Use TypeScript interfaces for data structures

## 🔄 Development Workflow

### Step 1: Planning New Features
1. **Identify the feature requirements**
2. **Check existing components** in `src/components/sections/`
3. **Plan component structure** - what can be reused?
4. **Design data structure** - what needs to be configurable?

### Step 2: Component Development
1. **Create/update components** in `src/components/sections/`
2. **Make them configurable** with TypeScript props
3. **Add to centralized data** in `src/data/`
4. **Test across multiple pages**

### Step 3: Page Development
1. **Use the standard page template**
2. **Import existing components**
3. **Configure with page-specific data**
4. **Never duplicate component code**

### Step 4: Quality Assurance
1. **Test across all screen sizes**
2. **Verify consistency across pages**
3. **Check for code duplication**
4. **Validate component reusability**

## 📋 Pre-Development Checklist

Before starting any new page or feature:

- [ ] **Component Audit**: What components already exist?
- [ ] **Data Planning**: What content needs to be configurable?
- [ ] **Reusability Check**: Can this be used across multiple pages?
- [ ] **Design System**: Are we using consistent colors/typography?
- [ ] **Performance**: Will this component be efficient?

## 🛠️ Component Development Guidelines

### Creating New Components

1. **File Location**: `src/components/sections/ComponentName.astro`
2. **Props Interface**: Always define TypeScript interface
3. **Default Values**: Provide sensible defaults
4. **Documentation**: Add JSDoc comments

```astro
---
/**
 * HeroSection - Reusable hero section for feature pages
 * @param badge - Optional badge text
 * @param title - Main heading
 * @param description - Subtitle text
 * @param image - Hero image URL
 * @param ctaText - Call-to-action button text
 * @param ctaLink - Call-to-action button link
 */
interface Props {
  badge?: string;
  title: string;
  description: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

const { 
  badge, 
  title, 
  description, 
  image, 
  ctaText = "Schedule a Demo", 
  ctaLink = "/book-a-demo" 
} = Astro.props;
---

<section class="bg-white py-20">
  <!-- Component content -->
</section>
```

### Updating Existing Components

1. **Backward Compatibility**: Don't break existing usage
2. **Add New Props**: Make them optional with defaults
3. **Update Documentation**: Reflect new capabilities
4. **Test All Pages**: Ensure existing pages still work

### Data Management

1. **Create Data Files**: `src/data/featureNameData.ts`
2. **TypeScript Interfaces**: Define data structures
3. **Export Functions**: For computed data if needed
4. **Import in Pages**: Use centralized data

```typescript
// src/data/statementScannerData.ts
export interface StatementScannerFeature {
  icon: string;
  title: string;
  description: string;
}

export const statementScannerFeatures: StatementScannerFeature[] = [
  {
    icon: "parse-icon",
    title: "Parse",
    description: "Let OCR & Gen-AI instantly convert PDFs, images, faxes..."
  },
  // ... more features
];

export const statementScannerStats = [
  { value: "95%", label: "Time saved" },
  { value: "3-5", label: "Hours saved per document" }
];
```

## 🎯 Page Development Template

### Standard Feature Page Structure

```astro
---
// 1. Import Layout Components
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import CookieBanner from '../../components/ui/CookieBanner.astro';

// 2. Import Section Components
import HeroSection from '../../components/sections/HeroSection.astro';
import TrustedBySection from '../../components/sections/TrustedBySection.astro';
import FeaturesSection from '../../components/sections/FeaturesSection.astro';
import ProductivitySection from '../../components/sections/ProductivitySection.astro';
import SecuritySection from '../../components/sections/SecuritySection.astro';
import TestimonialSection from '../../components/sections/TestimonialSection.astro';
import CTASection from '../../components/sections/CTASection.astro';

// 3. Import Page-Specific Data
import { statementScannerFeatures } from '../../data/statementScannerData';
import { statementScannerStats } from '../../data/statementScannerData';
---

<Layout title="AI Statement Scanner | Investipal" description="Extract and analyze client account statements instantly with AI.">
  <Header />
  <main id="main">
    <!-- 4. Use Components with Page-Specific Data -->
    <HeroSection 
      badge="For Advisors & Planners"
      title="Parse & Analyze Client Account Statements in Seconds"
      description="Scan any brokerage statement in any file format—from PDF to PNG—using OCR & AI."
      image="/images/statement-scanner-hero.png"
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

## 🔍 Code Review Checklist

### For Component Changes
- [ ] **Props Interface**: Is it well-defined and documented?
- [ ] **Default Values**: Are sensible defaults provided?
- [ ] **Reusability**: Can this be used across multiple pages?
- [ ] **Performance**: Is the component optimized?
- [ ] **Accessibility**: Are ARIA labels and semantic HTML used?
- [ ] **Responsive**: Does it work on all screen sizes?

### For Page Changes
- [ ] **Component Usage**: Are shared components being used?
- [ ] **No Duplication**: Is any code duplicated from other pages?
- [ ] **Data Centralization**: Is content stored in data files?
- [ ] **Consistency**: Does it follow the design system?
- [ ] **SEO**: Are meta tags properly configured?

### For Data Changes
- [ ] **TypeScript**: Are interfaces properly defined?
- [ ] **Organization**: Is data logically grouped?
- [ ] **Reusability**: Can this data be used across pages?
- [ ] **Maintainability**: Is it easy to update content?

## 🚫 Common Anti-Patterns

### ❌ Don't Do This

1. **Copy-pasting sections between pages**
2. **Hardcoding content in components**
3. **Creating page-specific component versions**
4. **Not using TypeScript interfaces**
5. **Ignoring existing components**

### ✅ Do This Instead

1. **Use shared components with props**
2. **Store content in data files**
3. **Make components more configurable**
4. **Define proper TypeScript interfaces**
5. **Check existing components first**

## 🧪 Testing Strategy

### Component Testing
1. **Multiple Configurations**: Test with different props
2. **Responsive Design**: Test on all screen sizes
3. **Accessibility**: Test with screen readers
4. **Performance**: Check bundle size impact

### Page Testing
1. **Cross-Page Consistency**: Ensure components look the same
2. **Data Variations**: Test with different content
3. **Navigation**: Test all links and interactions
4. **SEO**: Validate meta tags and structure

## 📚 Resources

- [Component Architecture](./COMPONENT_ARCHITECTURE.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Astro Documentation](https://docs.astro.build/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Getting Help

If you're unsure about component reusability:

1. **Check existing components** in `src/components/sections/`
2. **Review the architecture docs** in this folder
3. **Ask the team** before duplicating code
4. **Create a proposal** for new component structure

**Remember: It's better to ask than to duplicate code!**
