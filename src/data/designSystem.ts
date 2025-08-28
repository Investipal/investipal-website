/**
 * Investipal Design System
 * 
 * This file defines the design tokens and color system for the Investipal brand.
 * Use these constants to ensure consistent styling across the application.
 * 
 * Note: With Tailwind v4, colors are defined in global.css using @theme directive.
 * These constants provide programmatic access to the design tokens.
 */

// Brand Colors
export const brandColors = {
  // Primary Brand Color
  primary: '#7c3aed', // investipal-600
  
  // Full Color Palette
  investipal: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed', // Primary brand color
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  
  // Semantic Colors
  success: '#10b981', // green-500
  warning: '#f59e0b', // amber-500
  error: '#ef4444',   // red-500
  info: '#3b82f6',    // blue-500
} as const;

// Text Colors
export const textColors = {
  primary: 'text-gray-900',
  secondary: 'text-gray-600',
  tertiary: 'text-gray-500',
  muted: 'text-gray-400',
  inverse: 'text-white',
  brand: 'text-investipal-600',
  brandHover: 'text-investipal-700',
} as const;

// Background Colors
export const backgroundColors = {
  primary: 'bg-white',
  secondary: 'bg-gray-50',
  tertiary: 'bg-gray-100',
  brand: 'bg-investipal-600',
  brandLight: 'bg-investipal-100',
  brandDark: 'bg-investipal-700',
} as const;

// Border Colors
export const borderColors = {
  primary: 'border-gray-200',
  secondary: 'border-gray-300',
  brand: 'border-investipal-600',
  brandLight: 'border-investipal-200',
} as const;

// Button Styles
export const buttonStyles = {
  primary: 'bg-investipal-600 hover:bg-investipal-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200',
  secondary: 'bg-investipal-100 hover:bg-investipal-200 text-investipal-700 font-semibold px-6 py-3 rounded-lg transition-colors duration-200',
  outline: 'border border-investipal-600 text-investipal-600 hover:bg-investipal-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200',
  ghost: 'text-investipal-600 hover:bg-investipal-100 font-semibold px-6 py-3 rounded-lg transition-colors duration-200',
} as const;

// Link Styles
export const linkStyles = {
  primary: 'text-investipal-600 hover:text-investipal-700 font-medium transition-colors duration-200',
  secondary: 'text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200',
  underline: 'text-investipal-600 hover:text-investipal-700 underline font-medium transition-colors duration-200',
} as const;

// Icon Colors
export const iconColors = {
  primary: 'text-gray-900',
  secondary: 'text-gray-600',
  brand: 'text-investipal-600',
  brandLight: 'text-investipal-400',
  success: 'text-green-600',
  warning: 'text-amber-600',
  error: 'text-red-600',
} as const;

// Status Colors
export const statusColors = {
  success: {
    text: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-200',
  },
  warning: {
    text: 'text-amber-600',
    bg: 'bg-amber-100',
    border: 'border-amber-200',
  },
  error: {
    text: 'text-red-600',
    bg: 'bg-red-100',
    border: 'border-red-200',
  },
  info: {
    text: 'text-blue-600',
    bg: 'bg-blue-100',
    border: 'border-blue-200',
  },
} as const;

// Gradient Classes
export const gradients = {
  brand: 'bg-gradient-to-r from-investipal-600 to-investipal-700',
  brandLight: 'bg-gradient-to-r from-investipal-100 to-investipal-200',
  brandDark: 'bg-gradient-to-r from-investipal-700 to-investipal-800',
} as const;

// Common Component Classes
export const componentClasses = {
  card: 'bg-white rounded-lg shadow-sm border border-gray-200',
  cardHover: 'bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200',
  input: 'border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-investipal-500 focus:border-investipal-500',
  badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  
  // Standardized UI Elements - Feature Page Style (OFFICIAL STANDARD)
  iconContainer: 'inline-flex items-center justify-center w-12 h-12 bg-investipal-100 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-500 ease-out',
  iconContainerLarge: 'inline-flex items-center justify-center w-16 h-16 bg-investipal-100 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-500 ease-out',
  iconContainerSmall: 'inline-flex items-center justify-center w-10 h-10 bg-investipal-100 rounded-lg shadow-sm hover:scale-[1.02] transition-all duration-500 ease-out',
  
  // Icon Sizes (OFFICIAL STANDARD - Feature Page Style)
  icon: 'w-5 h-5 text-investipal-600', // DEFAULT - use with iconContainer
  iconLarge: 'w-6 h-6 text-investipal-600', // For iconContainerLarge
  iconSmall: 'w-4 h-4 text-investipal-600', // For iconContainerSmall
  
  // Checkmark Standardization
  checkmark: 'flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center',
  checkmarkIcon: 'w-4 h-4 text-green-600',
  
  // Badge Standardization
  standardBadge: 'inline-flex items-center bg-investipal-50 rounded-full px-6 py-2 mb-6',
  standardBadgeInner: 'bg-investipal-600 text-white px-3 py-1 rounded-full text-sm font-medium',
} as const;

// Typography - SEO Optimized Hierarchy
export const typography = {
  // Page Titles (H1) - Only ONE per page
  pageTitle: 'text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight',
  pageTitleGradient: 'text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-investipal-600 via-investipal-700 to-investipal-800 bg-clip-text text-transparent leading-tight',
  
  // Section Titles (H2) - Main sections
  sectionTitle: 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight',
  sectionTitleGradient: 'text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight',
  
  // Subsection Titles (H3) - Content blocks
  subsectionTitle: 'text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight',
  
  // Feature Titles (H4) - Individual features
  featureTitle: 'text-xl md:text-2xl font-semibold text-gray-900 leading-tight',
  
  // Component Titles (H5) - Small components
  componentTitle: 'text-lg md:text-xl font-semibold text-gray-900 leading-tight',
  
  // Labels (H6) - Form labels, captions
  label: 'text-base md:text-lg font-semibold text-gray-900',
  
  // Body Text
  bodyLarge: 'text-xl text-gray-600 leading-relaxed',
  body: 'text-lg text-gray-600 leading-relaxed',
  bodySmall: 'text-base text-gray-600 leading-relaxed',
  caption: 'text-sm text-gray-500 leading-relaxed',
  
  // Special Text
  heroSubtitle: 'text-lg md:text-xl text-gray-600 leading-relaxed',
  subtitle: 'text-base md:text-lg text-gray-600 leading-relaxed',
  sectionHeader: 'text-sm font-semibold text-investipal-600 tracking-wide',
  badgeText: 'text-sm font-medium',
  badge: 'text-sm font-semibold text-investipal-600 tracking-wide',
} as const;

// Spacing - Standardized Layout
export const spacing = {
  // Section Spacing
  sectionLarge: 'py-20 md:py-24 lg:py-28',
  section: 'py-16 md:py-20 lg:py-24', 
  sectionSmall: 'py-12 md:py-16 lg:py-20',
  
  // Container Spacing
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerWide: 'max-w-8xl mx-auto px-4 sm:px-6 lg:px-8',
  containerNarrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Content Spacing
  contentGap: 'space-y-6',
  contentGapLarge: 'space-y-8',
  contentGapSmall: 'space-y-4',
  
  // Grid Gaps
  gridGap: 'gap-8 lg:gap-12',
  gridGapLarge: 'gap-12 lg:gap-16',
  gridGapSmall: 'gap-6 lg:gap-8',
} as const;

// SEO Structure - Semantic HTML Hierarchy
export const seoStructure = {
  // Page Structure
  pageWrapper: 'Layout component with proper meta tags',
  mainContent: 'main[id="main"]', // Skip link target
  
  // Heading Hierarchy (CRITICAL FOR SEO)
  h1: 'Page title - ONLY ONE per page',
  h2: 'Section titles - Main page sections',
  h3: 'Subsection titles - Content blocks within sections', 
  h4: 'Feature titles - Individual features/items',
  h5: 'Component titles - Small UI components',
  h6: 'Labels - Form labels, captions',
  
  // Content Structure
  section: 'Semantic <section> for each major content area',
  article: '<article> for blog posts, case studies',
  aside: '<aside> for sidebars, related content',
  nav: '<nav> for navigation areas',
  
  // Lists
  ul: 'Unordered lists for feature lists, navigation',
  ol: 'Ordered lists for steps, rankings',
  
  // Text Elements
  p: 'Paragraphs for body text',
  strong: 'Important text emphasis',
  em: 'Stressed text emphasis',
} as const;

// Animation
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  hover: 'transition-all duration-200 hover:scale-105',
  button: 'transition-colors duration-200',
} as const;

// Export all design tokens
export const designSystem = {
  colors: brandColors,
  text: textColors,
  background: backgroundColors,
  border: borderColors,
  buttons: buttonStyles,
  links: linkStyles,
  icons: iconColors,
  status: statusColors,
  gradients,
  components: componentClasses,
  typography,
  spacing,
  seo: seoStructure,
  animations,
} as const;

export default designSystem;
