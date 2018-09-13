export interface Page {
  pages: { [key: string]: PageInfo };
  sitemap: Sitemap;
  pageType: PageType;
  children: Array<Page>;
  childrenAllowed: boolean;
  handle: string;
}

export interface PageInfo {
  page: PageElement;
  url: string;
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
  handle: string;
  isRoot: boolean;
  label: string;
  name: string;
  allowedChildren: string[];
}
