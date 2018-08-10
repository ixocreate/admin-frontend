import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, filter, first } from 'rxjs/internal/operators';

export class RxService {

  static getData(observable: Observable<any>): Promise<any> {
    return observable.pipe(
      filter((data) => data !== null),
      first()
    ).toPromise();
  }

  static distinctUntilChanged(observable: Observable<any>): Observable<any> {
    return observable.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)));
  }

}
