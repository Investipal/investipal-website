# Investipal Development Workflow

## 🔀 Branch Strategy

**ALWAYS work in staging first, only push to production when explicitly instructed.**

### Branch Structure
- **`staging`** → [Staging Site](https://red-water-01e2a8910.1.azurestaticapps.net/)
- **`main`** → [Production Site](https://polite-sea-03d4d3510.1.azurestaticapps.net/)

## 📋 Development Workflow

### 1. Daily Development (Default)
```bash
# Always start here - work in staging branch
git checkout staging
git pull origin staging

# Make your changes
# Edit content via Pages CMS or code directly

# Commit and push to staging
git add .
git commit -m "feat: your changes"
git push origin staging
```
**Result**: Changes appear on [staging site](https://red-water-01e2a8910.1.azurestaticapps.net/)

### 2. Production Release (Only when explicitly instructed)
```bash
# ONLY do this when ready for production
git checkout main
git pull origin main
git merge staging
git push origin main
```
**Result**: Changes appear on [production site](https://polite-sea-03d4d3510.1.azurestaticapps.net/)

## 🎯 Pages CMS Configuration

### Content Editing Workflow
1. **Edit content** via [Pages CMS](https://app.pagescms.org/)
2. **Changes auto-commit** to `staging` branch
3. **Review changes** on [staging site](https://red-water-01e2a8910.1.azurestaticapps.net/)
4. **Promote to production** only when approved

### CMS Branch Settings
- **Default branch**: `staging`
- **Auto-deploy**: Staging only
- **Production**: Manual promotion only

## ⚠️ Important Rules

### ✅ Always Do
- **Start in staging branch** for all development
- **Test changes** on staging site before production
- **Review with team** before promoting to production
- **Use descriptive commit messages**

### ❌ Never Do
- **Don't commit directly to main** (production)
- **Don't skip staging** for any changes
- **Don't force push** to production
- **Don't merge untested code**

## 🚀 Deployment Pipeline

```
Developer → staging branch → Staging Site → Review → main branch → Production Site
    ↓              ↓              ↓            ↓           ↓              ↓
   Code         Auto-Deploy    Test/QA    Approval    Manual Push   Live Site
```

## 🔧 Branch Protection Rules

### Main Branch (Production)
- ✅ **Require pull request reviews**
- ✅ **Require status checks to pass**
- ✅ **Require branches to be up to date**
- ✅ **Restrict pushes to administrators only**

### Staging Branch
- ✅ **Allow direct pushes for development**
- ✅ **Auto-deploy to staging environment**
- ✅ **Pages CMS integration enabled**

## 📞 Emergency Procedures

### Hotfix for Production
```bash
# Create hotfix branch from main
git checkout main
git checkout -b hotfix/urgent-fix

# Make minimal fix
# Test locally

# Push to staging first
git checkout staging
git merge hotfix/urgent-fix
git push origin staging

# Verify on staging, then promote to production
git checkout main
git merge hotfix/urgent-fix
git push origin main
```

## 🎨 Pages CMS Integration

### Staging Content Editing
- **URL**: [Pages CMS - Staging](https://app.pagescms.org/)
- **Branch**: `staging`
- **Auto-deploys to**: [Staging Site](https://red-water-01e2a8910.1.azurestaticapps.net/)

### Content Promotion Process
1. **Edit content** in Pages CMS (saves to staging)
2. **Review changes** on staging site
3. **Approve content** with team
4. **Manually promote** staging → production

## 📊 Site URLs

| Environment | URL | Branch | Purpose |
|-------------|-----|--------|---------|
| **Staging** | [red-water-01e2a8910.1.azurestaticapps.net](https://red-water-01e2a8910.1.azurestaticapps.net/) | `staging` | Development & Testing |
| **Production** | [polite-sea-03d4d3510.1.azurestaticapps.net](https://polite-sea-03d4d3510.1.azurestaticapps.net/) | `main` | Live Site |

---

**Remember**: When in doubt, always work in staging first! 🚀
