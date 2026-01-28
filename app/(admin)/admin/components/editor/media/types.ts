export type MediaItem = {
  id: string;
  url: string;
  publicId: string;
  filename: string;
  mimetype: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string | null;
  caption: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MediaResponse = {
  data: MediaItem[];
  meta: {
    page: number;
    total: number;
  };
};

export type ImageInsertConfig = {
  url: string;
  alt: string;
  width: number;
  height: number;
  alignment: "left" | "center" | "right";
};
