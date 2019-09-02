import { Media } from '../../../interfaces/media.interface';

export interface AnnotatedMedia extends Media {
  points?: Point[];
}

interface Point {
  x: number;
  y: number;
  title: string;
  body: string;
}
