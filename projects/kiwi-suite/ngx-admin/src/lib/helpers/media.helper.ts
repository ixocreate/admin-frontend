export class MediaHelper {

  static isImage(mimeType: string): boolean {
    if (!mimeType || mimeType.length < 6) {
      return false;
    }
    return mimeType.substr(0, 6) === 'image/';
  }

  static isSVG(mimeType: string): boolean {
    if (!mimeType || mimeType.length < 6) {
      return false;
    }
    return mimeType.indexOf('svg') !== -1;
  }

  static mimeTypeIcon(mimeType: string): string {
    let icon = 'fa-file';
    if (mimeType.indexOf('pdf') > -1) {
      icon = 'fa-file-pdf-o';
    }
    if (mimeType.indexOf('image') > -1) {
      icon = 'fa-file-image-o';
    }
    return icon;
  }

}
