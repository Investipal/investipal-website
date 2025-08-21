export interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly author: string;
  readonly date: string;
  readonly image: string;
  readonly category: string;
}

export const blogData: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Future of AI in Financial Advisory',
    excerpt: 'Discover how artificial intelligence is transforming the way financial advisors work with clients and manage portfolios.',
    author: 'Investipal Team',
    date: '2024-01-15',
    image: "https://c.animaapp.com/medefhqzj4Kk73/assets/blog-1.jpg",
    category: 'AI & Technology'
  },
  {
    id: 'blog-2',
    title: 'Streamlining Client Onboarding with Automation',
    excerpt: 'Learn how automated document processing can save hours of manual work and improve client experience.',
    author: 'Sarah Johnson',
    date: '2024-01-10',
    image: "https://c.animaapp.com/medefhqzj4Kk73/assets/blog-2.jpg",
    category: 'Process Improvement'
  },
  {
    id: 'blog-3',
    title: 'Building Personalized Portfolios at Scale',
    excerpt: 'Explore strategies for creating customized investment portfolios while maintaining efficiency and compliance.',
    author: 'Michael Chen',
    date: '2024-01-05',
    image: "https://c.animaapp.com/medefhqzj4Kk73/assets/blog-3.jpg",
    category: 'Portfolio Management'
  },
  {
    id: 'blog-4',
    title: 'Compliance Automation for Modern Advisors',
    excerpt: 'How automated compliance tools are helping advisors stay compliant while focusing on client relationships.',
    author: 'Lisa Rodriguez',
    date: '2023-12-28',
    image: "https://c.animaapp.com/medefhqzj4Kk73/assets/blog-4.jpg",
    category: 'Compliance'
  }
] as const;
