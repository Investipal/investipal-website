# Webflow to Astro Migration Guide

## 🎯 **Migration Plan**

We need to migrate these key content types from your Webflow site (www.investipal.co):

### **1. Blog Posts**
- Location: `/blog` section on Webflow
- Target: `src/content/blog/*.md` in Astro
- Media: Featured images → `Media/` folder in Pages CMS

### **2. Podcasts** 
- Location: Podcast collection in Webflow
- Target: `src/content/podcasts/*.md` in Astro (new collection)
- Media: Podcast covers → `Media/podcasts/` folder

### **3. Media Assets**
- Images from blog posts
- Podcast cover art
- Hero images
- Target: `Media/` folder in Pages CMS

## 🚀 **Migration Steps**

### **Step 1: Download Media Assets**
```bash
# Create media folders
mkdir -p Media/blog
mkdir -p Media/podcasts
mkdir -p Media/general
```

### **Step 2: Export Content**
1. **Blog Posts**: Copy content from Webflow CMS
2. **Podcasts**: Export podcast data
3. **Images**: Download and organize in Media folders

### **Step 3: Create Astro Content**
1. Convert blog posts to Markdown
2. Create podcast collection
3. Update image paths to use Media folder

## 📝 **Next Actions**
1. Manually download key images from your Webflow site
2. Create blog post markdown files
3. Set up podcast collection in Astro
4. Test everything on staging branch



