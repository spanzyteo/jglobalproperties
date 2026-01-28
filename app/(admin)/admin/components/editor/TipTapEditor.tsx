/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================
// FILE: src/components/Editor.tsx
// ============================================
"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useEditor, EditorContent } from "@tiptap/react";
// Import the custom CSS for proper image sizing
// Make sure to create this file: src/styles/tiptap-editor.css
// import '../styles/tiptap-editor.css';
import "../../../../styles/tiptap-editor.css"
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  ImagePlus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Table2,
  Minus,
  Undo,
  Redo,
  Type,
  Palette,
} from "lucide-react";
import { MediaLibraryModal } from "./media/MediaLibraryModal";
import { ImageInsertConfig } from "./media/types";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg",
        },
        inline: true,
        allowBase64: true,
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[400px] max-h-[600px] overflow-y-auto p-6 bg-white border-t border-[#E5E7EB] focus:outline-none prose prose-lg max-w-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const handleImageInsert = (config: ImageInsertConfig) => {
    if (!editor) return;

    try {
      // Create image with proper attributes and styles
      const alignStyle =
        config.alignment === "left"
          ? "text-align: left;"
          : config.alignment === "right"
            ? "text-align: right;"
            : "text-align: center;";

      const imgStyle =
        config.alignment === "left"
          ? "margin-right: 1rem; margin-bottom: 0.5rem;"
          : config.alignment === "right"
            ? "margin-left: 1rem; margin-bottom: 0.5rem;"
            : "margin-bottom: 0.5rem;";

      // Insert a paragraph with the image
      const imageHTML = `<p style="${alignStyle}"><img src="${config.url}" alt="${config.alt}" width="${config.width}" height="${config.height}" style="width: ${config.width}px; height: ${config.height}px; max-width: none; object-fit: cover; border-radius: 8px; ${imgStyle}" /></p>`;

      // Insert the image
      editor.chain().focus().insertContent(imageHTML).run();

      // Add a new paragraph after the image for continued typing
      editor.chain().focus().insertContent("<p></p>").run();
    } catch (error) {
      console.error("Error inserting image:", error);
    }
  };

  if (!editor) return null;

  const colors = [
    "#000000",
    "#374151",
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#EC4899",
    "#FFFFFF",
  ];

  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] p-2">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              title="Bold (Ctrl+B)"
            >
              <Bold size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              title="Italic (Ctrl+I)"
            >
              <Italic size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive("strike")}
              title="Strikethrough"
            >
              <Strikethrough size={18} />
            </ToolbarButton>
          </div>

          {/* Headings */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <select
              onChange={(e) => {
                const level = parseInt(e.target.value);
                level === 0
                  ? editor.chain().focus().setParagraph().run()
                  : editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                      .run();
              }}
              value={
                [1, 2, 3, 4, 5, 6].find((l) =>
                  editor.isActive("heading", { level: l }),
                ) || 0
              }
              className="px-3 py-1 text-sm border border-gray-300 rounded bg-white cursor-pointer focus:outline-none focus:border-blue-500 font-medium"
              style={{ minWidth: "140px" }}
            >
              <option value="0" style={{ fontSize: "14px" }}>
                Paragraph
              </option>
              <option
                value="1"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Heading 1
              </option>
              <option
                value="2"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Heading 2
              </option>
              <option value="3" style={{ fontSize: "15px", fontWeight: "600" }}>
                Heading 3
              </option>
              <option value="4" style={{ fontSize: "14px", fontWeight: "600" }}>
                Heading 4
              </option>
              <option value="5" style={{ fontSize: "14px", fontWeight: "500" }}>
                Heading 5
              </option>
              <option value="6" style={{ fontSize: "13px", fontWeight: "500" }}>
                Heading 6
              </option>
            </select>
          </div>

          {/* Lists */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <List size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
              title="Numbered List"
            >
              <ListOrdered size={18} />
            </ToolbarButton>
          </div>

          {/* Alignment */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            {(["left", "center", "right", "justify"] as const).map((align) => (
              <ToolbarButton
                key={align}
                onClick={() => editor.chain().focus().setTextAlign(align).run()}
                active={editor.isActive({ textAlign: align })}
                title={`Align ${align}`}
              >
                {align === "left" && <AlignLeft size={18} />}
                {align === "center" && <AlignCenter size={18} />}
                {align === "right" && <AlignRight size={18} />}
                {align === "justify" && <AlignJustify size={18} />}
              </ToolbarButton>
            ))}
          </div>

          {/* Blocks */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
              title="Blockquote"
            >
              <Quote size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              active={editor.isActive("codeBlock")}
              title="Code Block"
            >
              <Code size={18} />
            </ToolbarButton>
          </div>

          {/* Link & Image */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => setShowLinkModal(true)}
              active={editor.isActive("link")}
              title="Insert Link"
            >
              <Link2 size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setShowMediaModal(true)}
              title="Insert Image"
            >
              <ImagePlus size={18} />
            </ToolbarButton>
          </div>

          {/* Colors */}
          <div className="flex gap-1 pr-2 border-r border-gray-300 relative">
            <ToolbarButton
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowHighlightPicker(false);
              }}
              title="Text Color"
            >
              <Type size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                setShowHighlightPicker(!showHighlightPicker);
                setShowColorPicker(false);
              }}
              title="Highlight"
            >
              <Palette size={18} />
            </ToolbarButton>

            {/* Color Picker Dropdown */}
            {showColorPicker && (
              <div className="absolute top-full left-0 z-10 mt-1 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="grid grid-cols-5 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        editor.chain().focus().setColor(color).run();
                        setShowColorPicker(false);
                      }}
                      className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Highlight Picker Dropdown */}
            {showHighlightPicker && (
              <div className="absolute top-full left-0 z-10 mt-1 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="grid grid-cols-5 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        editor.chain().focus().setHighlight({ color }).run();
                        setShowHighlightPicker(false);
                      }}
                      className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              title="Insert Table"
            >
              <Table2 size={18} />
            </ToolbarButton>
          </div>

          {/* Horizontal Rule */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal Rule"
            >
              <Minus size={18} />
            </ToolbarButton>
          </div>

          {/* Undo/Redo */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo (Ctrl+Z)"
            >
              <Undo size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo (Ctrl+Y)"
            >
              <Redo size={18} />
            </ToolbarButton>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Link Modal */}
      {showLinkModal && (
        <LinkModal
          editor={editor}
          onClose={() => {
            setShowLinkModal(false);
            setLinkUrl("");
          }}
        />
      )}

      {/* Media Library Modal */}
      {showMediaModal && (
        <MediaLibraryModal
          onClose={() => setShowMediaModal(false)}
          onSelect={(config) => {
            handleImageInsert(config);
            setShowMediaModal(false);
          }}
        />
      )}
    </div>
  );
};

// Toolbar Button Component
const ToolbarButton: React.FC<{
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}> = ({ onClick, active, disabled, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
      active ? "bg-[#941A1A] text-white hover:bg-[#7a1515]" : "text-gray-700"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
  >
    {children}
  </button>
);

// Link Modal Component
const LinkModal: React.FC<{
  editor: any;
  onClose: () => void;
}> = ({ editor, onClose }) => {
  const [url, setUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleInsert = () => {
    if (url.trim()) {
      editor.chain().focus().setLink({ href: url.trim() }).run();
      onClose();
    }
  };

  const handleRemove = () => {
    editor.chain().focus().unsetLink().run();
    onClose();
  };

  if (!mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Cancel
          </button>
          {editor.isActive("link") && (
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Remove Link
            </button>
          )}
          <button
            type="button"
            onClick={handleInsert}
            disabled={!url.trim()}
            className="px-4 py-2 bg-[#941A1A] text-white rounded hover:bg-[#7a1515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Editor;
