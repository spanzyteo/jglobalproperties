export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface BlogAuthor {
  id: number;
  name: string;
  avatar_urls: {
    [key: string]: string;
  };
}

export interface BlogFeaturedImage {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface BlogData {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  categories?: number[];
  _embedded?: {
    "wp:featuredmedia"?: BlogFeaturedImage[];
    "wp:term"?: [BlogCategory[]];
    author?: BlogAuthor[];
  };
}

export interface FormattedBlog {
  id: number;
  date: string;
  title: string;
  content: string;
  fullContent: string; // Full HTML content (not truncated)
  excerpt: string;
  slug: string;
  image: string;
  category?: string;
  categories?: string[];
  author?: string;
}
