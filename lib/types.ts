import type { PortableTextBlock } from "@portabletext/types";

export interface BlogPost {
  title: string;
  titleImage: {
    asset: {
      url: string;
      alt?: string;
    };
  };
  content: PortableTextBlock[];
  _createdAt: string;
  _updatedAt: string;
  category: string;
  author: string;
  smallDescription?: string;
  keywords?: string[];
  slug: {
    current: string;
  };
}
