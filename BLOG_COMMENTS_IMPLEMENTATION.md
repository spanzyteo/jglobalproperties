# Blog Comment System Implementation

## Overview

A complete blog comment integration system using WordPress REST API with form validation and toast notifications.

## API Integration

### Endpoint

- **Base URL**: `https://cms.jglobalproperties.com/wp-json/wp/v2`
- **POST Comments**: `POST /comments`
- **GET Comments**: `GET /comments?post={postId}&status=approve`

### Payload Structure

```json
{
  "post": 123, // Blog post ID (required)
  "author_name": "John Doe", // Commenter name (required)
  "author_email": "john@example.com", // Email (required)
  "content": "Great article!", // Comment text (required)
  "parent": 0 // Parent comment ID (0 for top-level)
}
```

## Files Created

### 1. `/app/(main)/features/blogs/comments/types.ts`

TypeScript interfaces for comment data:

- `CommentPayload`: Form submission payload
- `Comment`: Comment data structure
- `CommentResponse`: API response structure

### 2. `/app/(main)/features/blogs/comments/api.ts`

API functions:

- `submitBlogComment(payload)`: POST comment to WordPress API
- `getBlogComments(postId, page, perPage)`: Fetch approved comments for a blog post
- Error handling and response validation

### 3. `/app/(main)/features/blogs/comments/hooks.ts`

Custom React hook:

- `useSubmitBlogComment()`: Manages comment submission state and loading
  - Returns: `{ loading, error, submitComment }`
  - Handles async submission and error management

### 4. `/app/(main)/features/blogs/comments/index.ts`

Barrel export file for clean imports

## Files Modified

### `/app/(main)/components/blogId/BlogIdContent.tsx`

Integrated comment form with:

**New Imports:**

- `toast` from "sonner"
- `useSubmitBlogComment` from features
- Form state management

**New State:**

```tsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  comment: "",
});
const { loading: submitting, submitComment } = useSubmitBlogComment();
```

**New Functions:**

- `handleFormChange()`: Updates form fields
- `handleSubmitComment()`: Validates and submits comment
  - Validates: name, email format, comment text
  - Sends to API with blog ID
  - Shows success/error toast
  - Clears form on success

**Updated Form Features:**

- Connected all inputs to state (name, email, phone, comment)
- Form validation before submission
- Disabled state during submission
- "Posting..." loading text
- Toast notifications for:
  - Validation errors (name, email, comment required)
  - Success message (with moderation note)
  - API error messages

## Features

✅ **Form Validation**

- Name required
- Email required and must be valid
- Comment content required
- Real-time feedback

✅ **User Feedback**

- Success toast: "Comment posted successfully! It will appear after moderation."
- Error toasts for validation and API errors
- Loading state during submission

✅ **UX Improvements**

- Form fields disabled during submission
- Button text changes to "Posting..." while loading
- Form auto-clears on success
- Phone field kept but not sent to API (optional)

✅ **API Integration**

- Sends comment with blog post ID
- Author name and email captured
- Comment content preserved
- Error handling with meaningful messages

## Usage Flow

1. User fills out comment form on blog detail page
2. User clicks "Post Comment" button
3. Form validates all required fields
4. If valid, submit to WordPress comment API
5. Show loading state ("Posting...")
6. On success: Show confirmation toast and clear form
7. On error: Show error toast with message
8. Comments appear after WordPress moderation approval

## Dependencies

- `sonner`: Toast notifications
- `react`: State management hooks
- Existing features/blogs API structure

## Notes

- Comments require moderation before appearing (WordPress default)
- Phone field is captured in UI but not sent to API (can be added if needed)
- Uses WordPress REST API v2
- Caches comment fetches for 5 minutes
- Full error handling and validation in place
