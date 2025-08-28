// Canonical URL Management
// Handles proper canonical URL generation for SEO optimization

/**
 * Generates the canonical URL for blog pages
 * Filters and pagination should canonicalize to the main blog page
 * Individual posts should use their direct URL
 */
export function generateCanonicalUrl(
  currentUrl: URL,
  siteUrl: string = 'https://investipal.co'
): string {
  const pathname = currentUrl.pathname;
  
  // Individual blog posts - use direct URL
  if (pathname.match(/^\/blog\/[^\/]+$/)) {
    return `${siteUrl}${pathname}`;
  }
  
  // Blog directory page with filters - canonicalize to main blog
  if (pathname === '/blog' && (
    currentUrl.searchParams.has('category') || 
    currentUrl.searchParams.has('tag') ||
    currentUrl.searchParams.has('page') ||
    currentUrl.searchParams.has('search')
  )) {
    return `${siteUrl}/blog`;
  }
  
  // Default - use the clean URL
  return `${siteUrl}${pathname}`;
}

/**
 * Generates pagination URLs for blog listing
 */
export function generatePaginationUrls(
  currentPage: number,
  totalPages: number,
  baseUrl: string,
  filters?: { category?: string; tag?: string; search?: string }
): {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
} {
  const urls: any = {};
  
  // Build query string from filters
  const params = new URLSearchParams();
  if (filters?.category) params.set('category', filters.category);
  if (filters?.tag) params.set('tag', filters.tag);
  if (filters?.search) params.set('search', filters.search);
  
  const queryString = params.toString();
  const separator = queryString ? '&' : '';
  
  // First page
  if (currentPage > 1) {
    urls.first = `${baseUrl}${queryString ? '?' + queryString : ''}`;
  }
  
  // Previous page
  if (currentPage > 1) {
    const prevPage = currentPage - 1;
    if (prevPage === 1) {
      urls.prev = `${baseUrl}${queryString ? '?' + queryString : ''}`;
    } else {
      urls.prev = `${baseUrl}?${queryString}${separator}page=${prevPage}`;
    }
  }
  
  // Next page
  if (currentPage < totalPages) {
    const nextPage = currentPage + 1;
    urls.next = `${baseUrl}?${queryString}${separator}page=${nextPage}`;
  }
  
  // Last page
  if (currentPage < totalPages) {
    urls.last = `${baseUrl}?${queryString}${separator}page=${totalPages}`;
  }
  
  return urls;
}

/**
 * Generates meta tags for pagination
 */
export function generatePaginationMetaTags(
  currentPage: number,
  totalPages: number,
  baseUrl: string,
  filters?: { category?: string; tag?: string; search?: string }
): Array<{ rel: string; href: string }> {
  const urls = generatePaginationUrls(currentPage, totalPages, baseUrl, filters);
  const metaTags: Array<{ rel: string; href: string }> = [];
  
  if (urls.prev) {
    metaTags.push({ rel: 'prev', href: urls.prev });
  }
  
  if (urls.next) {
    metaTags.push({ rel: 'next', href: urls.next });
  }
  
  return metaTags;
}





