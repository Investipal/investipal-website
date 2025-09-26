import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FrontmatterFixer {
  constructor() {
    this.blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  }

  async fixAllFrontmatter() {
    console.log('🔧 Fixing frontmatter issues in all blog posts...');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const filePath = path.join(this.blogDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Fix broken frontmatter start
      if (content.startsWith('**---')) {
        content = content.replace(/^\*\*---/, '---');
        console.log(`✅ Fixed frontmatter start in: ${file}`);
      }
      
      // Fix date formats (add timezone if missing)
      content = content.replace(/publishedDate: (\d{4}-\d{2}-\d{2})$/gm, 'publishedDate: $1T00:00:00Z');
      content = content.replace(/updatedDate: (\d{4}-\d{2}-\d{2})$/gm, 'updatedDate: $1T00:00:00Z');
      
      // Fix boolean values
      content = content.replace(/draft: "false"/g, 'draft: false');
      content = content.replace(/draft: "true"/g, 'draft: true');
      
      // Write back the fixed content
      fs.writeFileSync(filePath, content);
    }
    
    console.log('✅ All frontmatter issues fixed!');
  }
}

const fixer = new FrontmatterFixer();
fixer.fixAllFrontmatter().catch(console.error);





