import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, filter, first, map } from 'rxjs/internal/operators';

export class RxService {

  static getData(observable: Observable<any>): Promise<any> {
    return observable.pipe(
      filter((data) => data !== null),
      first(),
      map(data => JSON.parse(JSON.stringify(data))),
    ).toPromise();
  }

  static distinctUntilChanged(observable: Observable<any>): Observable<any> {
    return observable.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)));
  }

}
