"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import FloatingMenuExtension from "@tiptap/extension-floating-menu";
import { useEffect, useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Image as ImageIcon,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      size: {
        default: "large",
        parseHTML: (element) => element.getAttribute("data-size"),
        renderHTML: (attributes) => {
          let classes =
            "rounded-lg border border-slate-200 dark:border-slate-800 transition-all duration-300";
          switch (attributes.size) {
            case "small":
              classes += " !w-1/3 mx-auto block";
              break;
            case "medium":
              classes += " !w-1/2 mx-auto block";
              break;
            case "large":
              classes += " !w-3/4 mx-auto block";
              break;
            default:
              classes += " !w-full block";
          }
          return {
            "data-size": attributes.size,
            class: classes,
          };
        },
      },
    };
  },
});

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
}

export default function TiptapEditor({
  content,
  onChange,
  onImageUpload,
  placeholder = "Start writing your story...",
}: TiptapEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuTop, setMenuTop] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPlus, setShowPlus] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CustomImage.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-blue-600 dark:text-blue-400 underline hover:text-blue-700 cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-slate-400 before:float-left before:pointer-events-none h-full",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      BubbleMenuExtension,
      FloatingMenuExtension,
    ],
    immediatelyRender: false,
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[300px] selection:bg-blue-100 dark:selection:bg-blue-900/30",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      if (editor.getText() === "" && content === "") return;
      if (content === "") {
        editor.commands.setContent("");
      }
    }
  }, [content, editor]);

  // Track cursor position for the Plus button
  useEffect(() => {
    if (!editor) return;

    const updateMenuPos = () => {
      const { selection } = editor.state;
      const { $anchor } = selection;
      
      // Only show if we have a valid selection
      if (!selection.empty) {
        setShowPlus(false);
        return;
      }

      try {
        // Find the start of the current block
        const start = $anchor.start();
        const coords = editor.view.coordsAtPos(start);
        
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          // Calculate top relative to container
          // We add scrollOffset if the container was scrolling, but here the window scrolls
          const relativeTop = coords.top - containerRect.top;
          
          setMenuTop(relativeTop);
          setShowPlus(true);
        }
      } catch (e) {
        setShowPlus(false);
      }
    };

    editor.on("transaction", updateMenuPos);
    editor.on("selectionUpdate", updateMenuPos);
    editor.on("focus", updateMenuPos);
    
    // Initial update
    updateMenuPos();

    return () => {
      editor.off("transaction", updateMenuPos);
      editor.off("selectionUpdate", updateMenuPos);
      editor.off("focus", updateMenuPos);
    };
  }, [editor]);

  const addImage = async () => {
    if (!onImageUpload) {
      const url = window.prompt("Enter image URL:");
      if (url) {
        editor
          ?.chain()
          .focus()
          .setImage({ src: url })
          .createParagraphNear()
          .run();
      }
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const url = await onImageUpload(file);
          editor
            ?.chain()
            .focus()
            .setImage({ src: url })
            .createParagraphNear()
            .run();
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
    input.click();
  };

  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Custom Sidebar Menu */}
      <AnimatePresence>
        {showPlus && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0, top: menuTop }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute left-[-40px] z-20 flex items-start"
            style={{ top: menuTop }}
          >
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-1.5 rounded-full transition-colors ${
                  isMenuOpen
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Plus className={`w-5 h-5 transition-transform ${isMenuOpen ? "rotate-45" : ""}`} />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -10 }}
                    className="absolute left-full ml-2 top-0 flex items-center gap-1 p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl"
                  >
                    <button
                      onClick={() => {
                        editor.chain().focus().toggleHeading({ level: 1 }).run();
                        setIsMenuOpen(false);
                      }}
                      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400"
                      title="Heading 1"
                    >
                      <Heading1 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        editor.chain().focus().toggleBulletList().run();
                        setIsMenuOpen(false);
                      }}
                      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400"
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        editor.chain().focus().toggleOrderedList().run();
                        setIsMenuOpen(false);
                      }}
                      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400"
                      title="Ordered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        editor.chain().focus().toggleBlockquote().run();
                        setIsMenuOpen(false);
                      }}
                      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400"
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        editor.chain().focus().toggleCode().run();
                        setIsMenuOpen(false);
                      }}
                      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400"
                      title="Code"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
                    <button
                      onClick={() => {
                        addImage();
                        setIsMenuOpen(false);
                      }}
                      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400"
                      title="Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Menu - Appears on text selection */}
      {editor && (
        <BubbleMenu
          editor={editor}
          className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 dark:bg-white shadow-xl border border-slate-800 dark:border-slate-200 overflow-hidden"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.isActive("bold") ? "bg-slate-700 dark:bg-slate-200" : ""
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.isActive("italic") ? "bg-slate-700 dark:bg-slate-200" : ""
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.isActive("underline") ? "bg-slate-700 dark:bg-slate-200" : ""
            }`}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.isActive("highlight") ? "bg-slate-700 dark:bg-slate-200" : ""
            }`}
            title="Highlight"
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-700 dark:bg-slate-200 mx-1" />
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.isActive("heading", { level: 1 }) ? "bg-slate-700 dark:bg-slate-200" : ""
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.isActive("heading", { level: 2 }) ? "bg-slate-700 dark:bg-slate-200" : ""
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-700 dark:bg-slate-200 mx-1" />
          <button
            onClick={setLink}
            className={`p-2 rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.isActive("link") ? "bg-slate-700 dark:bg-slate-200" : ""
            }`}
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </BubbleMenu>
      )}

      {/* Image Menu - Appears on image selection */}
      {editor && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor }) => editor.isActive("image")}
          className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 dark:bg-white shadow-xl border border-slate-800 dark:border-slate-200 overflow-hidden"
        >
          <button
            onClick={() =>
              editor.chain().focus().updateAttributes("image", { size: "small" }).run()
            }
            className={`px-3 py-1.5 text-xs font-medium rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.getAttributes("image").size === "small"
                ? "bg-slate-700 dark:bg-slate-200"
                : ""
            }`}
          >
            Small
          </button>
          <button
            onClick={() =>
              editor.chain().focus().updateAttributes("image", { size: "medium" }).run()
            }
            className={`px-3 py-1.5 text-xs font-medium rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.getAttributes("image").size === "medium"
                ? "bg-slate-700 dark:bg-slate-200"
                : ""
            }`}
          >
            Medium
          </button>
          <button
            onClick={() =>
              editor.chain().focus().updateAttributes("image", { size: "large" }).run()
            }
            className={`px-3 py-1.5 text-xs font-medium rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition text-white dark:text-slate-900 ${
              editor.getAttributes("image").size === "large" || !editor.getAttributes("image").size
                ? "bg-slate-700 dark:bg-slate-200"
                : ""
            }`}
          >
            Large
          </button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}

