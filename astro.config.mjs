// @ts-nocheck
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    sitemap({
      customPages: [
        // Segment Pages
        'https://investipal.co/segments/financial-planners',
        'https://investipal.co/segments/wealth-managers',
        'https://investipal.co/segments/wealth-firms',
        'https://investipal.co/segments/insurance',
        // Feature Pages
        'https://investipal.co/features/automated-statement-scanner',
        'https://investipal.co/features/asset-allocation',
        'https://investipal.co/features/ai-driven-engagement',
        'https://investipal.co/features/client-acquisition',
        'https://investipal.co/features/regulation-best-interest-generator',
        'https://investipal.co/features/investment-policy-statements',
        'https://investipal.co/features/risk-management',
        'https://investipal.co/features/custom-security-builder',
        'https://investipal.co/features/iul-annuity-modeling',
        'https://investipal.co/features/roi-calculator',
        'https://investipal.co/features/automated-statement-scanner-new',
      ],
    }),
    partytown(),
  ],
  site: 'https://investipal.co',
  trailingSlash: 'never',
  build: {
    assets: '_astro',
    inlineStylesheets: 'auto',
  },
  // Enable image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [{ protocol: 'https' }],
  },

  // Enable compression
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'dev-sanitize-svg-href',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            try {
              const url = req.url || '';
              if (
                /^\/<path\b/i.test(url) ||
                /^\/<svg\b/i.test(url) ||
                /^\/<[^\s>]+\b/i.test(url)
              ) {
                res.statusCode = 204; // No Content
                return res.end();
              }
            } catch {}
            next();
          });
        },
      },
    ],
    define: {
      // Fix cssesc module compatibility
      global: 'globalThis',
      module: '{}',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'],
          },
        },
      },
      // leave minify to Astro defaults
    },
    ssr: {
      noExternal: ['*'],
    },
  },
});
