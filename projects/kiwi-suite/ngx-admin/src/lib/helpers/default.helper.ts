export class DefaultHelper {

  static windowVar(key: string): any {
    if (typeof window === 'undefined') {
      return;
    }
    if (typeof window[key] === 'undefined') {
      return;
    }
    return window[key];
  }

}
