import { Observable } from 'rxjs/Observable';

export class RxService {

  static getData(observable: Observable<any>): Promise<any> {
    return observable.filter((data) => {
      return data !== null;
    }).first().toPromise();
  }

  static distinctUntilChanged(observable: Observable<any>): Observable<any> {
    return observable.distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b));
  }

}
