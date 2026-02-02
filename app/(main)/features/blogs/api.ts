import { BlogData, FormattedBlog } from "./types";

const BASE_URL = "https://cms.jglobalproperties.com/wp-json/wp/v2";

const cleanHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
};

const sanitizeHtml = (html: string): string => {
  // Keep HTML formatting but remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .trim();
};

const truncateText = (text: string, words: number = 20): string => {
  const wordArray = text.split(" ");
  return wordArray.length > words
    ? wordArray.slice(0, words).join(" ") + "..."
    : text;
};

const formatBlog = (blog: BlogData): FormattedBlog => {
  let image = "";
  let category: string | undefined;
  let categories: string[] | undefined;

  // Extract featured image - prefer medium size for better performance
  if (blog._embedded?.["wp:featuredmedia"]?.[0]) {
    const media = blog._embedded["wp:featuredmedia"][0];
    // Try to use medium-large or large size for better balance of quality/speed
    if (media.media_details?.sizes?.["medium_large"]?.source_url) {
      image = media.media_details.sizes["medium_large"].source_url;
    } else if (media.media_details?.sizes?.["large"]?.source_url) {
      image = media.media_details.sizes["large"].source_url;
    } else if (media.media_details?.sizes?.["medium"]?.source_url) {
      image = media.media_details.sizes["medium"].source_url;
    } else {
      image = media.source_url;
    }
  }

  // Extract categories
  if (blog._embedded?.["wp:term"]?.[0]) {
    const categoryArray = blog._embedded["wp:term"][0];
    if (categoryArray.length > 0) {
      category = categoryArray[0].name;
      categories = categoryArray.map((cat) => cat.name);
    }
  }

  // Extract author
  const author = blog._embedded?.author?.[0]?.name;

  const cleanedExcerpt = cleanHtml(blog.excerpt.rendered);
  const cleanedContent = cleanHtml(blog.content.rendered);
  const fullHtmlContent = sanitizeHtml(blog.content.rendered);

  return {
    id: blog.id,
    date: new Date(blog.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    title: cleanHtml(blog.title.rendered),
    content: truncateText(cleanedContent, 20),
    fullContent: fullHtmlContent,
    excerpt: truncateText(cleanedExcerpt, 30),
    slug: blog.slug,
    image: image || "/blogs/default-blog.jpg",
    category,
    categories,
    author,
  };
};

export const getBlogs = async (
  page: number = 1,
  perPage: number = 10,
): Promise<{
  blogs: FormattedBlog[];
  total: number;
  totalPages: number;
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}/posts?_embed=true&per_page=${perPage}&page=${page}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const blogs: BlogData[] = await response.json();
    const total = parseInt(response.headers.get("x-wp-total") || "0", 10);
    const totalPages = parseInt(
      response.headers.get("x-wp-totalpages") || "0",
      10,
    );

    const formattedBlogs = blogs.map(formatBlog);

    return { blogs: formattedBlogs, total, totalPages };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogBySlug = async (
  slug: string,
): Promise<FormattedBlog | null> => {
  try {
    const response = await fetch(`${BASE_URL}/posts?slug=${slug}&_embed=true`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const blogs: BlogData[] = await response.json();
    if (blogs.length === 0) return null;

    return formatBlog(blogs[0]);
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    throw error;
  }
};

export const getBlogById = async (
  id: number,
): Promise<FormattedBlog | null> => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}?_embed=true`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const blog: BlogData = await response.json();
    return formatBlog(blog);
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};
