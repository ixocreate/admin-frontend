export interface Page {
  pages: { [key: string]: PageElement };
  sitemap: Sitemap;
  pageType: PageType;
  children: Array<Page>;
}

export interface PageElement {
  id: string;
  sitemapId: string;
  locale: string;
  name: string;
  slug: string;
  publishedFrom?: Date;
  publishedUntil?: any;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Sitemap {
  id: string;
  parentId: string;
  nestedLeft: number;
  nestedRight: number;
  pageType: string;
  handle: string;
}

export interface PageType {
  name: string;
  handle?: any;
  label: string;
  allowedChildren: string[];
  isRoot: boolean;
}
