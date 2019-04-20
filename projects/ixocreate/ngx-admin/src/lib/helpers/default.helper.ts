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

  static isDescendant(parent: any, child: any) {
    let node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

}
