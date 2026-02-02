# Blog System - Quick Reference Guide

## 🚀 Quick Start

### Using in Homepage

```tsx
import { BlogsSection } from "@/app/(main)/components/blogs";

export default function Home() {
  return <BlogsSection />; // Displays 8 latest blogs
}
```

### Using in Blog Page

```tsx
import BlogBody from "@/app/(main)/components/blog/BlogBody";
import BlogHero from "@/app/(main)/components/blog/BlogHero";

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogBody />
    </>
  );
}
```

## 📦 Exported Components

### From `@/app/(main)/components/blogs`

```typescript
export { BlogCard }; // Individual blog card
export { BlogsSection }; // Homepage blog grid
```

### From `@/app/(main)/features/blogs`

```typescript
export { getBlogs }; // API function
export { getBlogBySlug }; // API function
export { getBlogById }; // API function
export { usePaginatedBlogs }; // React hook
export { useHomepageBlogs }; // React hook
export type { FormattedBlog }; // Type definition
export type { BlogData }; // Type definition
```

## 🪝 React Hooks Reference

### `usePaginatedBlogs(perPage = 8)`

```tsx
const {
  blogs, // FormattedBlog[]
  loading, // boolean
  error, // string | null
  currentPage, // number
  totalPages, // number
  total, // number (total posts)
  goToPage, // (page: number) => void
  refetch, // () => void
} = usePaginatedBlogs(8);
```

### `useHomepageBlogs(limit = 8)`

```tsx
const {
  blogs, // FormattedBlog[]
  loading, // boolean
  error, // string | null
} = useHomepageBlogs(8);
```

## 🎯 Common Use Cases

### Get all blogs for a page

```tsx
const { blogs, loading } = useHomepageBlogs(12);
```

### Handle pagination

```tsx
const { blogs, currentPage, totalPages, goToPage } = usePaginatedBlogs(10);

// Go to page 2
goToPage(2);
```

### Manual API call

```tsx
import { getBlogs } from "@/app/(main)/features/blogs";

// Get page 1 with 20 items per page
const { blogs, totalPages } = await getBlogs(1, 20);
```

### Get single blog

```tsx
import { getBlogBySlug } from "@/app/(main)/features/blogs";

const blog = await getBlogBySlug("my-blog-post");
```

## 🎨 Customization

### Change items per page

Edit `ITEMS_PER_PAGE` in `app/(main)/components/blog/BlogBody.tsx`:

```tsx
const ITEMS_PER_PAGE = 10; // Change from 8 to 10
```

### Change homepage blog count

Update hook call in `app/(main)/components/blogs/BlogsSection.tsx`:

```tsx
const { blogs, loading, error } = useHomepageBlogs(12); // Change from 8 to 12
```

### Change cache duration

Edit `api.ts`:

```tsx
// Change 3600 to your desired seconds
next: {
  revalidate: 7200;
} // 2 hours instead of 1 hour
```

### Change colors

Search and replace `#941A1A` with your brand color:

- `BlogCard.tsx` - Category badge background
- `BlogBody.tsx` - Active page number background

## 📊 Data Structure

### FormattedBlog

```typescript
{
  id: number;
  date: string;           // "Jan 31, 2026"
  title: string;
  content: string;        // Truncated to 20 words
  excerpt: string;        // Truncated to 30 words
  slug: string;           // URL-friendly slug
  image: string;          // Featured image URL
  category?: string;      // First category name
  categories?: string[];  // All category names
  author?: string;        // Author name
}
```

## 🔍 API Response Format (WordPress)

The system automatically converts WordPress REST API response to `FormattedBlog`.

**WordPress endpoint:** `GET /wp-json/wp/v2/posts?_embed=true&per_page=8&page=1`

**Query Parameters:**

- `_embed=true` - Include embedded data (required)
- `per_page` - Items per page (default: 10)
- `page` - Page number (default: 1)
- `slug` - Filter by slug (optional)

## ⚙️ Configuration

### API Base URL

Located in `app/(main)/features/blogs/api.ts`:

```typescript
const BASE_URL = "https://cms.jglobalproperties.com/wp-json/wp/v2";
```

### Cache Duration

Located in `app/(main)/features/blogs/api.ts`:

```typescript
next: {
  revalidate: 3600;
} // 1 hour in seconds
```

### Items Per Page

Located in `app/(main)/components/blog/BlogBody.tsx`:

```typescript
const ITEMS_PER_PAGE = 8;
```

### Default Image

Located in `app/(main)/features/blogs/api.ts`:

```typescript
image: image || "/blogs/default-blog.jpg",
```

## 🛠️ Troubleshooting

### Blogs not loading?

1. Check network tab - API might be down
2. Check console for errors
3. Verify API URL in `features/blogs/api.ts`

### Categories not showing?

- This is intentional - they only show if post has categories
- Check WordPress post has categories assigned

### Pagination not working?

- Check `currentPage` and `totalPages` values
- Verify `goToPage()` is being called correctly

### Images not showing?

- Check WordPress featured media is assigned
- Verify image URLs are accessible
- Check fallback to `/blogs/default-blog.jpg`

### Performance issues?

- Increase cache duration in `api.ts`
- Reduce `ITEMS_PER_PAGE` if needed
- Check WordPress server response time

## 📚 Component Tree

```
App
├── HomePage
│   └── BlogsSection
│       └── BlogCard[] (8 blogs)
│
├── BlogPage
│   ├── BlogHero
│   └── BlogBody
│       ├── BlogCard[] (8 blogs per page)
│       ├── Pagination Controls
│       └── BlogSkeleton (while loading)
│
└── BlogDetailPage
    ├── BlogHero
    └── BlogIdContent (implement next)
```

## 🚀 Performance Tips

1. **Use `useHomepageBlogs` for fixed counts** - No pagination overhead
2. **Use `usePaginatedBlogs` for multiple pages** - Efficient state management
3. **Increase cache duration** - Less API calls = faster responses
4. **Lazy load images** - Already optimized in BlogCard
5. **Limit homepage blogs** - 8 is ideal for performance

## 📝 Best Practices

1. ✅ Always use hooks instead of direct API calls in components
2. ✅ Handle loading and error states
3. ✅ Use TypeScript types for type safety
4. ✅ Keep blog count reasonable (8-12 per page)
5. ✅ Use proper image alt text (already implemented)
6. ✅ Validate data before rendering
7. ✅ Test pagination thoroughly
8. ✅ Monitor API response times

## 🔗 Related Files

```
app/(main)/
├── features/blogs/
│   ├── api.ts               ← Core API logic
│   ├── hooks.ts             ← React hooks
│   ├── types.ts             ← TypeScript types
│   ├── index.ts             ← Barrel export
│   └── README.md            ← Full documentation
├── components/
│   ├── blogs/
│   │   ├── BlogCard.tsx     ← Blog card component
│   │   ├── BlogsSection.tsx ← Homepage section
│   │   └── index.ts         ← Barrel export
│   ├── blog/
│   │   ├── BlogBody.tsx     ← Blog list page
│   │   ├── BlogHero.tsx     ← Hero section
│   │   └── BlogIdContent.tsx ← Single blog (next)
│   ├── skeletons/
│   │   └── BlogSkeleton.tsx ← Loading skeleton
│   └── Blogs.tsx            ← Deprecated (forwards)
└── app/globals.css          ← Shimmer animation
```

---

**Need help?** Check the full documentation in `BLOG_IMPLEMENTATION.md` or `BLOG_ARCHITECTURE.md`
