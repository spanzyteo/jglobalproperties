# Blog Features Documentation

## Overview

The blog system is built with a clean, modular architecture that handles fetching, displaying, and managing blog content from the WordPress REST API.

## Folder Structure

```
app/(main)/
├── features/
│   └── blogs/                 # Core blog API logic
│       ├── api.ts             # API calls and formatting
│       ├── hooks.ts           # React hooks for blog data
│       ├── types.ts           # TypeScript types
│       └── index.ts           # Barrel export
├── components/
│   ├── blogs/                 # Blog display components
│   │   ├── BlogCard.tsx       # Individual blog card
│   │   ├── BlogsSection.tsx   # Blog grid for homepage
│   │   └── index.ts           # Barrel export
│   ├── blog/                  # Blog page components
│   │   ├── BlogBody.tsx       # Blog list with pagination
│   │   ├── BlogHero.tsx       # Hero section
│   │   └── BlogIdContent.tsx  # Single blog display
│   └── skeletons/
│       └── BlogSkeleton.tsx   # Loading skeleton
└── utils/
    └── blogs.ts               # Deprecated - use features/blogs instead
```

## Features

### 1. **API Integration** (`features/blogs/api.ts`)

- `getBlogs(page, perPage)` - Fetch paginated blogs from WordPress
- `getBlogBySlug(slug)` - Fetch a single blog by slug
- `getBlogById(id)` - Fetch a single blog by ID

**Features:**

- Automatic data formatting and HTML cleaning
- Image extraction from featured media
- Category and author information
- Smart excerpt truncation
- Server-side caching (1 hour revalidation)

### 2. **React Hooks** (`features/blogs/hooks.ts`)

#### `usePaginatedBlogs(perPage = 8)`

Used for blog list pages with pagination.

```typescript
const { blogs, loading, error, currentPage, totalPages, goToPage } =
  usePaginatedBlogs(8);
```

**Returns:**

- `blogs[]` - Array of formatted blog posts
- `loading` - Boolean indicating loading state
- `error` - Error message if fetch failed
- `currentPage` - Current page number
- `totalPages` - Total number of pages
- `goToPage(number)` - Function to navigate to a page
- `refetch()` - Manually refetch current page

#### `useHomepageBlogs(limit = 8)`

Used for homepage blog display (fixed count, no pagination).

```typescript
const { blogs, loading, error } = useHomepageBlogs(8);
```

**Returns:**

- `blogs[]` - Array of latest blog posts
- `loading` - Boolean indicating loading state
- `error` - Error message if fetch failed

### 3. **Components**

#### BlogCard (`components/blogs/BlogCard.tsx`)

Displays a single blog post card with:

- Featured image with hover animation
- Category badge (conditionally rendered if available)
- Title with line clamping
- Excerpt
- Read more link
- Scroll-triggered animations

**Props:**

```typescript
interface BlogCardProps {
  blog: FormattedBlog;
  index: number; // For staggered animations
}
```

#### BlogsSection (`components/blogs/BlogsSection.tsx`)

Homepage blog grid component that:

- Displays 8 latest blogs
- Shows skeleton loaders while fetching
- Handles errors gracefully
- Links to individual blog pages

#### BlogBody (`components/blog/BlogBody.tsx`)

Blog listing page with:

- 8 blogs per page
- Beautiful pagination controls
- Smooth page transitions
- Page info display
- Responsive design

**Pagination Features:**

- Smart page number generation (ellipsis for large ranges)
- Previous/Next buttons
- Direct page number navigation
- Disabled state for edge pages
- Smooth scroll to top on page change

#### BlogSkeleton (`components/skeletons/BlogSkeleton.tsx`)

Loading skeleton with:

- Shimmer animation
- Matches BlogCard layout
- Responsive grid
- Customizable count

### 4. **Data Types** (`features/blogs/types.ts`)

```typescript
interface FormattedBlog {
  id: number;
  date: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image: string;
  category?: string;
  categories?: string[];
  author?: string;
}
```

## Usage Examples

### Homepage

```tsx
import { BlogsSection } from "@/app/(main)/components/blogs";

export default function Home() {
  return <BlogsSection />;
}
```

### Blog List Page

```tsx
import BlogBody from "@/app/(main)/components/blog/BlogBody";

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogBody />
    </>
  );
}
```

### Using API Directly

```tsx
import { getBlogs, getBlogBySlug } from "@/app/(main)/features/blogs";

// Get paginated blogs
const { blogs, totalPages } = await getBlogs(1, 10);

// Get single blog by slug
const blog = await getBlogBySlug("how-to-scale-from-one-property");
```

## Styling Features

- **Custom Shimmer Animation** - Added to `globals.css`
- **Responsive Grid** - 1 column mobile, 2 tablet, 3 desktop, 4 large screens
- **Color Theme** - Uses brand color `#941A1A` for accents
- **Smooth Transitions** - Hover effects and animations throughout
- **Line Clamping** - Prevents text overflow with elegant truncation

## API Integration

### WordPress REST API Endpoints

The system uses these WordPress endpoints:

```
GET /wp-json/wp/v2/posts                    # List posts
GET /wp-json/wp/v2/posts?per_page=8&page=1 # Paginated posts
GET /wp-json/wp/v2/posts?slug={slug}        # Get by slug
GET /wp-json/wp/v2/posts/{id}               # Get by ID
```

**Query Parameters Used:**

- `_embed=true` - Include embedded data (categories, author, featured image)
- `per_page` - Items per page
- `page` - Page number
- `slug` - Post slug

## Performance Optimizations

1. **Server-side Caching** - 1 hour revalidation on API calls
2. **Image Optimization** - Uses Next.js Image component with lazy loading
3. **Skeleton Loaders** - Smooth loading experience
4. **Selective Prioritization** - First 4 blog images prioritized
5. **Error Handling** - Graceful fallbacks for failed requests

## Error Handling

All components include error handling:

- API failures display user-friendly messages
- Empty states with contextual text
- Fallback images for missing featured media
- Validation for optional fields (categories, author)

## Future Enhancements

Planned features for the blog system:

1. Search functionality
2. Category filtering
3. Author filtering
4. Read time estimation
5. Related posts
6. Comment integration
7. Social sharing
8. Blog post analytics

## Maintenance Notes

- Update `revalidate` time in `api.ts` if caching behavior needs adjustment
- The `cleanHtml` function handles various HTML entities - add more if needed
- Adjust `ITEMS_PER_PAGE` in `BlogBody.tsx` for different pagination sizes
- Image fallback path can be customized in `api.ts`
