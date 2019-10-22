export interface Media {
  basePath: string;
  id: string;
  description: string;
  filename: string;
  mimeType: string;
  size: number;
  title: string;
  type: string;
  url: string;
  thumb: string;
  original: string;
}

export interface AnnotatedMedia {
  media: Media;
  annotations: Annotation[];
}

export interface Annotation {
  content: any;
}

export interface ImageAnnotation extends Annotation {
  x: number;
  y: number;
}
