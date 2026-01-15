# @uiw/React Markdown Editor - Complete Guide

## Overview

The `@uiw/react-markdown-editor` is a modern, feature-rich markdown editor that supports text formatting, links, images, code blocks, and more.

## Installation (Already Done)

```bash
npm install @uiw/react-markdown-editor
```

---

## Basic Usage

### Simple Implementation

```tsx
import MDEditor from "@uiw/react-markdown-editor";
import { useState } from "react";

export default function MyComponent() {
  const [content, setContent] = useState("");

  return (
    <MDEditor
      value={content}
      onChange={(val) => setContent(val || "")}
      height={300}
      preview="edit" // Shows both editor and preview side-by-side
    />
  );
}
```

---

## Key Props/Options

### Essential Props

| Prop             | Type     | Description                                                                 |
| ---------------- | -------- | --------------------------------------------------------------------------- |
| `value`          | string   | Current markdown content                                                    |
| `onChange`       | function | Callback when content changes: `(val) => setContent(val \|\| "")`           |
| `height`         | number   | Editor height in pixels (default: 200)                                      |
| `preview`        | string   | Preview mode: `"edit"` (both), `"preview"` (right side), `"live"` (default) |
| `visibleDragbar` | boolean  | Show/hide divider between editor and preview (default: true)                |
| `hideToolbar`    | boolean  | Hide the toolbar (default: false)                                           |
| `textareaProps`  | object   | HTML textarea attributes                                                    |
| `enableScroll`   | boolean  | Enable scroll in preview (default: true)                                    |

---

## Markdown Features Supported

### 1. **Text Formatting**

```markdown
**Bold text** - Use double asterisks or underscores
_Italic text_ - Use single asterisks
~~Strikethrough~~ - Use double tildes
`Inline code` - Use backticks
```

### 2. **Headings**

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

### 3. **Lists**

```markdown
# Unordered List

- Item 1
- Item 2
  - Nested item
  - Another nested

# Ordered List

1. First item
2. Second item
3. Third item
```

### 4. **Links**

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Link Title")
```

### 5. **Images**

```markdown
![Alt text](https://example.com/image.jpg)
![Alt text with title](https://example.com/image.jpg "Image Title")
```

### 6. **Code Blocks**

````markdown
```javascript
function hello() {
  console.log("Hello World");
}
```

```python
def hello():
    print("Hello World")
```

```html
<div class="container">
  <p>HTML code example</p>
</div>
```
````

### 7. **Blockquotes**

```markdown
> This is a blockquote
> It can span multiple lines
>
> > Nested blockquotes are also supported
```

### 8. **Horizontal Rules**

```markdown
---

---

---
```

### 9. **Tables**

```markdown
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### 10. **Line Breaks & Paragraphs**

```markdown
Use blank lines to separate paragraphs.

Single newline doesn't create paragraph break.

Double newline does.
```

---

## Advanced Configuration for Your Use Case

### Full-Featured Example for Blog/House/Land Descriptions

```tsx
import MDEditor, { MDEditorProps } from "@uiw/react-markdown-editor";
import { useState } from "react";

export default function DescriptionEditor() {
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<MDEditorProps["preview"]>("edit");

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Preview Mode:
          <select
            value={preview}
            onChange={(e) => setPreview(e.target.value as any)}
            style={{ marginLeft: "10px" }}
          >
            <option value="edit">Edit & Preview (Side-by-side)</option>
            <option value="live">Live Preview</option>
            <option value="preview">Preview Only</option>
          </select>
        </label>
      </div>

      <MDEditor
        value={description}
        onChange={(val) => setDescription(val || "")}
        height={400}
        preview={preview}
        visibleDragbar={true}
        enableScroll={true}
        textareaProps={{
          placeholder:
            "Describe your property in detail. Supports markdown formatting, links, images, and more...",
        }}
      />

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h3>Preview:</h3>
        <div
          style={{
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          {/* This is where your rendered markdown would appear */}
          {description && (
            <p>Content saved: {description.substring(0, 50)}...</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## For Image Upload (Key Feature)

Since you want users to upload images, here's how to handle it:

### Option 1: Upload & Get URL, Then Insert Link

```tsx
import MDEditor from "@uiw/react-markdown-editor";
import { useState } from "react";

export default function BlogEditor() {
  const [content, setContent] = useState("");

  const handleImageUpload = async (file: File) => {
    // Upload file to your server/cloud storage
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      // Insert markdown image syntax at cursor position
      const imageMarkdown = `![${file.name}](${data.url})`;
      setContent(content + "\n" + imageMarkdown);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
        style={{ marginBottom: "10px" }}
      />
      <MDEditor
        value={content}
        onChange={(val) => setContent(val || "")}
        height={400}
        preview="edit"
      />
    </div>
  );
}
```

### Option 2: Separate Image Management (Recommended)

```tsx
// In your form, keep images separate from description
const [description, setDescription] = useState("");
const [images, setImages] = useState<File[]>([]);

// Store images separately, then reference them in markdown like:
// ![Image Name](image_id_or_url)
```

---

## Rendering Markdown Content

When displaying saved content, you can use:

```tsx
import MDEditor from "@uiw/react-markdown-editor";

export default function DisplayBlog({ blogContent }: { blogContent: string }) {
  return (
    <MDEditor.Markdown
      source={blogContent}
      style={{
        backgroundColor: "#fff",
        color: "#000",
        padding: "16px",
      }}
    />
  );
}
```

---

## Common Patterns for Your Admin Panel

### Pattern 1: Blog Description

```tsx
<MDEditor
  value={blogContent}
  onChange={(val) => setBlogContent(val || "")}
  height={400}
  preview="edit"
  textareaProps={{
    placeholder: "Write your blog post. Use markdown for formatting.",
  }}
/>
```

### Pattern 2: Property Overview (House/Land)

```tsx
<MDEditor
  value={propertyOverview}
  onChange={(val) => setPropertyOverview(val || "")}
  height={300}
  preview="edit"
  textareaProps={{
    placeholder:
      "Describe the property features, amenities, location details...",
  }}
/>
```

### Pattern 3: Custom Styling

```tsx
<div className="editor-container">
  <MDEditor
    value={content}
    onChange={(val) => setContent(val || "")}
    height={350}
    preview="edit"
    style={{
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
    }}
  />
</div>

<style jsx>{`
  .editor-container :global(.w-md-editor) {
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
`}</style>
```

---

## Tips for Your Use Case

1. **For Descriptions**: Use `preview="edit"` so admins can see both markdown and preview
2. **For Long Content**: Use `height={400}` or higher
3. **For Images**: Either:
   - Upload separately and store URLs, then insert markdown links
   - Or use a drag-and-drop image plugin (see documentation for extensions)
4. **For Storing**: Save the markdown string as-is in your database
5. **For Displaying**: Use `MDEditor.Markdown` component or a markdown renderer like `react-markdown`

---

## Custom Toolbar (Optional)

You can customize what tools appear in the toolbar:

```tsx
import MDEditor, { MDEditorProps } from "@uiw/react-markdown-editor";

<MDEditor
  value={content}
  onChange={(val) => setContent(val || "")}
  height={300}
  preview="edit"
  visibleToolbar={true}
/>;
```

---

## Resources

- **Official Docs**: https://uiwjs.org/react-markdown-editor/
- **GitHub**: https://github.com/uiwjs/react-markdown-editor
- **Markdown Guide**: https://www.markdownguide.org/

---

## Quick Keyboard Shortcuts

| Action  | Shortcut        |
| ------- | --------------- |
| Bold    | Ctrl+B or Cmd+B |
| Italic  | Ctrl+I or Cmd+I |
| Code    | Ctrl+`          |
| Link    | Ctrl+L or Cmd+L |
| Heading | Ctrl+H or Cmd+H |
