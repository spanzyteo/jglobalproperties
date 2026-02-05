export interface CommentPayload {
  post: number; // Blog post ID
  author_name: string; // Commenter name
  author_email: string; // Commenter email
  content: string; // Comment text
  parent?: number; // Parent comment ID (0 for top-level, optional for replies)
}

export interface Comment {
  id: number;
  post: number;
  parent: number;
  author_name: string;
  author_email: string;
  author_url?: string;
  content: {
    rendered: string;
  };
  date: string;
  status: string;
}

export interface CommentResponse {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_email: string;
  author_url?: string;
  content: {
    rendered: string;
  };
  date: string;
  status: string;
}
