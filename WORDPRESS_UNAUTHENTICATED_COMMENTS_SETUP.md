# Fix: Enable Unauthenticated Comments on WordPress REST API

## Problem

WordPress REST API requires authentication to create comments by default. You're getting "must be logged in" error.

## Solution

Add code to your WordPress theme or create a custom plugin to enable unauthenticated comment creation.

## Option 1: Add to Theme functions.php (Recommended for quick fix)

1. Go to WordPress Admin Dashboard
2. Navigate to **Appearance → Theme File Editor** (or use an FTP client)
3. Find `functions.php` file in your theme
4. Add this code at the end:

```php
<?php
// Enable unauthenticated comment creation via REST API
add_filter( 'rest_allow_anonymous_comments', '__return_true' );

// Register comment creation endpoint for unauthenticated users
add_action( 'rest_api_init', function() {
    register_rest_route( 'wp/v2', '/comments', array(
        'methods'             => 'POST',
        'callback'            => 'create_comment_unauthenticated',
        'permission_callback' => '__return_true',
        'args'                => array(
            'post'         => array(
                'type'     => 'integer',
                'required' => true,
            ),
            'author_name'  => array(
                'type'     => 'string',
                'required' => true,
            ),
            'author_email' => array(
                'type'     => 'string',
                'required' => true,
                'format'   => 'email',
            ),
            'content'      => array(
                'type'     => 'string',
                'required' => true,
            ),
            'parent'       => array(
                'type'     => 'integer',
                'default'  => 0,
            ),
        ),
    ) );
} );

// Handle the comment creation
function create_comment_unauthenticated( $request ) {
    $params = $request->get_json_params();

    // Validate post exists
    $post = get_post( $params['post'] );
    if ( ! $post ) {
        return new WP_Error(
            'post_not_found',
            'The requested post was not found',
            array( 'status' => 404 )
        );
    }

    // Check if comments are open
    if ( ! comments_open( $post->ID ) ) {
        return new WP_Error(
            'comments_closed',
            'Comments are closed for this post',
            array( 'status' => 403 )
        );
    }

    // Prepare comment data
    $comment_data = array(
        'comment_post_ID'      => $params['post'],
        'comment_author'       => sanitize_text_field( $params['author_name'] ),
        'comment_author_email' => sanitize_email( $params['author_email'] ),
        'comment_content'      => wp_kses_post( $params['content'] ),
        'comment_type'         => 'comment',
        'comment_parent'       => isset( $params['parent'] ) ? intval( $params['parent'] ) : 0,
    );

    // Insert comment
    $comment_id = wp_insert_comment( $comment_data );

    if ( is_wp_error( $comment_id ) ) {
        return $comment_id;
    }

    if ( ! $comment_id ) {
        return new WP_Error(
            'comment_creation_failed',
            'Failed to create comment',
            array( 'status' => 500 )
        );
    }

    // Return the created comment
    $comment = get_comment( $comment_id );
    return rest_ensure_response( $comment );
}
?>
```

## Option 2: Create a Custom Plugin

1. Connect via FTP or use WordPress File Manager
2. Go to `/wp-content/plugins/`
3. Create a new folder: `jglobal-unauthenticated-comments`
4. Create file: `jglobal-unauthenticated-comments.php`
5. Add this code:

```php
<?php
/**
 * Plugin Name: JGlobal Unauthenticated Comments
 * Description: Allow unauthenticated users to submit comments via REST API
 * Version: 1.0
 * Author: JGlobal Properties
 */

// Enable unauthenticated comment creation via REST API
add_filter( 'rest_allow_anonymous_comments', '__return_true' );

// Register custom comment creation endpoint
add_action( 'rest_api_init', function() {
    register_rest_route( 'jglobal/v1', '/comments', array(
        'methods'             => 'POST',
        'callback'            => 'jglobal_create_comment',
        'permission_callback' => '__return_true',
        'args'                => array(
            'post'         => array( 'type' => 'integer', 'required' => true ),
            'author_name'  => array( 'type' => 'string', 'required' => true ),
            'author_email' => array( 'type' => 'string', 'required' => true ),
            'content'      => array( 'type' => 'string', 'required' => true ),
            'parent'       => array( 'type' => 'integer', 'default' => 0 ),
        ),
    ) );
} );

function jglobal_create_comment( $request ) {
    $params = $request->get_json_params();

    // Validate post exists
    $post = get_post( intval( $params['post'] ) );
    if ( ! $post ) {
        return new WP_Error( 'post_not_found', 'Post not found', array( 'status' => 404 ) );
    }

    // Check if comments are open
    if ( ! comments_open( $post->ID ) ) {
        return new WP_Error( 'comments_closed', 'Comments are closed', array( 'status' => 403 ) );
    }

    // Insert comment
    $comment_id = wp_insert_comment( array(
        'comment_post_ID'      => intval( $params['post'] ),
        'comment_author'       => sanitize_text_field( $params['author_name'] ),
        'comment_author_email' => sanitize_email( $params['author_email'] ),
        'comment_content'      => wp_kses_post( $params['content'] ),
        'comment_parent'       => isset( $params['parent'] ) ? intval( $params['parent'] ) : 0,
    ) );

    if ( is_wp_error( $comment_id ) || ! $comment_id ) {
        return new WP_Error( 'comment_failed', 'Failed to create comment', array( 'status' => 500 ) );
    }

    return rest_ensure_response( get_comment( $comment_id ) );
}
?>
```

6. Go to WordPress Admin → Plugins
7. Activate "JGlobal Unauthenticated Comments"

## Option 3: Update Next.js API Route to use Custom Endpoint

If you use Option 2 (custom endpoint), update your `/app/api/comments/route.ts`:

```typescript
// Change this line in the API route:
const response = await fetch(`${wordPressUrl}/comments`, {

// To this:
const response = await fetch(`${wordPressUrl}/jglobal/v1/comments`, {
```

## Verification Checklist

- [ ] Code added to WordPress (functions.php or custom plugin)
- [ ] WordPress plugin activated (if using Option 2)
- [ ] Comments are enabled for the post in WordPress
- [ ] Try submitting a comment from your Next.js app
- [ ] Check WordPress Admin → Comments to verify comment appears

## Troubleshooting

If it still doesn't work:

1. **Check WordPress Error Log**
   - Located at `/wp-content/debug.log` (if debugging is enabled)
   - Enable debugging: Add to `wp-config.php`:
     ```php
     define( 'WP_DEBUG', true );
     define( 'WP_DEBUG_LOG', true );
     define( 'WP_DEBUG_DISPLAY', false );
     ```

2. **Verify Comments are Enabled**
   - Go to WordPress Admin → Posts
   - Edit your blog post
   - Check "Discussion" section → "Allow comments" is checked

3. **Check Console Logs**
   - Open browser Developer Tools (F12)
   - Check Network tab for the API request
   - Look at the response from `/api/comments`

4. **Test with cURL**
   ```bash
   curl -X POST https://cms.jglobalproperties.com/wp-json/wp/v2/comments \
     -H "Content-Type: application/json" \
     -d '{
       "post": 123,
       "author_name": "Test",
       "author_email": "test@example.com",
       "content": "Test comment"
     }'
   ```

## What the Code Does

1. ✅ **Removes authentication requirement** for comment creation
2. ✅ **Validates input** (post exists, comments open)
3. ✅ **Sanitizes user input** (prevents XSS)
4. ✅ **Creates comment** with pending/approved status
5. ✅ **Returns comment data** back to your app

## Environment Variables (Optional)

For added security, you can use WordPress credentials (not recommended for public sites):

Add to `.env.local`:

```
WORDPRESS_USERNAME=your_wp_username
WORDPRESS_PASSWORD=your_wp_app_password
```

Then the API route will use Basic Authentication with WordPress.
