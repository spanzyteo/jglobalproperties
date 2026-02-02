# Blog System - Visual Architecture Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    WordPress REST API                       │
│         https://cms.jglobalproperties.com/wp-json           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│            features/blogs/api.ts                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • getBlogs(page, perPage)                           │   │
│  │ • getBlogBySlug(slug)                               │   │
│  │ • getBlogById(id)                                   │   │
│  │                                                     │   │
│  │ Features:                                           │   │
│  │ ✓ HTML cleaning                                     │   │
│  │ ✓ Image extraction                                  │   │
│  │ ✓ Category handling                                 │   │
│  │ ✓ Server caching (1 hour)                           │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
    ┌────────────────┴────────────────┐
    ▼                                 ▼
┌──────────────────┐          ┌──────────────────┐
│   hooks.ts       │          │   types.ts       │
├──────────────────┤          ├──────────────────┤
│ usePaginatedBlog │          │  FormattedBlog   │
│ useHomepageBlog  │          │  BlogData        │
│                  │          │  BlogCategory    │
│ State mgmt       │          │  BlogAuthor      │
│ Error handling   │          │  etc...          │
└────────┬─────────┘          └──────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Components Layer                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Homepage (/)              Blog Page (/blog)                │
│  ┌─────────────────────┐   ┌────────────────────┐          │
│  │   home/Blogs.tsx    │   │  blog/BlogHero.tsx │          │
│  │  (wrapper)          │   │  blog/BlogBody.tsx │          │
│  └──────────┬──────────┘   └─────────┬──────────┘          │
│             │                        │                      │
│             ▼                        ▼                      │
│  ┌──────────────────────┐   ┌──────────────────────┐      │
│  │ BlogsSection         │   │ BlogBody (with       │      │
│  │ - 8 blogs fixed      │   │ pagination)          │      │
│  │ - useHomepageBlogs   │   │ - 8 per page         │      │
│  │ - No pagination      │   │ - usePaginatedBlogs  │      │
│  └──────────┬───────────┘   │ - Page controls      │      │
│             │                │ - Smart page numbers │      │
│             │                └─────────┬───────────┘      │
│             │                          │                  │
│             └──────────┬───────────────┘                  │
│                        │                                  │
│                        ▼                                  │
│              ┌──────────────────────┐                    │
│              │   BlogCard.tsx       │                    │
│              │ (reusable component) │                    │
│              │                      │                    │
│              │ • Image              │                    │
│              │ • Category           │                    │
│              │ • Title              │                    │
│              │ • Excerpt            │                    │
│              │ • Read more link     │                    │
│              │ • Animations         │                    │
│              └──────────────────────┘                    │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │     BlogSkeleton.tsx (Loading State)                 │  │
│  │     • Shimmer animation                              │  │
│  │     • Grid layout matching BlogCard                  │  │
│  │     • Customizable count                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Homepage Blog Display

```
App loads
    │
    ▼
BlogsSection component mounts
    │
    ▼
useHomepageBlogs hook called
    │
    ├─ Show BlogSkeleton (loading=true)
    │
    ▼
fetch getBlogs(1, 8) from API
    │
    ▼
Data formatted and returned
    │
    ▼
blogs state updated
    │
    ├─ Hide skeleton (loading=false)
    │
    ▼
BlogCard components render
    │
    ▼
User sees beautiful blog grid
```

### Blog Page with Pagination

```
User navigates to /blog
    │
    ▼
BlogBody component mounts
    │
    ▼
usePaginatedBlogs hook called (page=1)
    │
    ├─ Show BlogSkeleton (loading=true)
    │
    ▼
fetch getBlogs(1, 8) from API
    │
    ▼
Data formatted with totalPages info
    │
    ▼
State updated: blogs[], currentPage, totalPages
    │
    ├─ Hide skeleton (loading=false)
    │
    ▼
Render 8 blogs + pagination controls
    │
    ▼
User clicks page 2
    │
    ▼
goToPage(2) called
    │
    ├─ Show skeleton again
    │
    ▼
Fetch page 2 data
    │
    ▼
Scroll to top smoothly
    │
    ▼
Render new blogs
```

## Component Reusability

```
┌────────────────────────┐
│     BlogCard           │
│   (Pure Component)     │
└────────┬───────────────┘
         │
    ┌────┴───────┐
    │             │
    ▼             ▼
BlogsSection   BlogBody
(Homepage)     (Blog Page)
```

## Error Handling Flow

```
Fetch fails
    │
    ├─ catch error
    │
    ▼
setError(message)
    │
    ▼
Component checks error state
    │
    ├─ Show error message to user
    ├─ Provide helpful feedback
    ├─ Option to retry
    │
    ▼
User sees friendly error UI
```

## Pagination Logic

```
totalPages = 8

Scenario A: Pages 1-5
┌─────────────────────┐
│ 1  2  3  4  5 ... 8 │
└─────────────────────┘

Scenario B: Pages 3-5 (viewing page 4)
┌──────────────────┐
│ 1 ... 3  4  5 8  │
└──────────────────┘
         ↑
      Current page highlighted

Scenario C: Only 3 pages
┌──────────┐
│ 1  2  3  │
└──────────┘
```

## Loading State Progression

```
Empty state (no data)
    │
    ▼
[Skeleton Loader] ◄──── Beautiful shimmer animation
    │ (1-3 seconds typically)
    ▼
[Real Content] ◄────── Smooth transition
```

## Responsive Behavior

### Mobile (< 640px)

```
┌─────────┐
│ Blog 1  │
├─────────┤
│ Blog 2  │
├─────────┤
│ Blog 3  │
└─────────┘
```

### Tablet (640px - 1024px)

```
┌──────────┬──────────┐
│ Blog 1   │ Blog 2   │
├──────────┼──────────┤
│ Blog 3   │ Blog 4   │
├──────────┼──────────┤
│ Blog 5   │ Blog 6   │
└──────────┴──────────┘
```

### Desktop (1024px - 1536px)

```
┌────────┬────────┬────────┐
│Blog 1  │ Blog 2 │ Blog 3 │
├────────┼────────┼────────┤
│Blog 4  │ Blog 5 │ Blog 6 │
├────────┼────────┼────────┤
│Blog 7  │ Blog 8 │        │
└────────┴────────┴────────┘
```

### Large (1536px+)

```
┌────────┬────────┬────────┬────────┐
│Blog 1  │ Blog 2 │ Blog 3 │ Blog 4 │
├────────┼────────┼────────┼────────┤
│Blog 5  │ Blog 6 │ Blog 7 │ Blog 8 │
└────────┴────────┴────────┴────────┘
```

## Caching Strategy

```
Initial Request
    │
    ▼
fetch getBlogs()
    │
    ├─ next: { revalidate: 3600 }
    │
    ▼
Data cached for 1 hour
    │
    ▼
Subsequent requests (within 1 hour)
    │
    ├─ Served from cache
    │
    ▼
After 1 hour
    │
    ├─ New fetch on next request
    │
    ▼
Data re-cached
```

## Integration Points

```
┌─────────────────────────────────────────┐
│          Entire Application             │
├─────────────────────────────────────────┤
│                                         │
│ ┌──────────┐      ┌──────────┐        │
│ │ Homepage │      │ Blog Lst │        │
│ │    /     │      │  /blog   │        │
│ └────┬─────┘      └────┬─────┘        │
│      │                 │              │
│      └─────┬───────────┘              │
│            │                          │
│            ▼                          │
│     ┌─────────────────┐               │
│     │ Blog Features   │               │
│     │  System         │               │
│     │ (Modular & Ext) │               │
│     └─────────────────┘               │
│                                         │
└─────────────────────────────────────────┘

✓ Ready to add:
  - Blog detail page (/blog/[slug])
  - Category filtering
  - Search functionality
  - Author pages
```

---

**This architecture ensures:**

- ✅ Clean separation of concerns
- ✅ Reusable components
- ✅ Easy to maintain
- ✅ Simple to extend
- ✅ Excellent performance
- ✅ Great user experience
