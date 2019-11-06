import { BehaviorSubject } from 'rxjs';

export class ImageHelper {

  private static image$ = new BehaviorSubject<string>(null);

  static setImage(src: string): any {
    ImageHelper.image$.next(src);
  }

  static getImage() {
    return ImageHelper.image$.asObservable();
  }

}
