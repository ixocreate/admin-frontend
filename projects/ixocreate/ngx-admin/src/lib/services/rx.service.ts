import { Observable } from 'rxjs/observable';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
import { first } from 'rxjs/internal/operators/first';
import { map } from 'rxjs/internal/operators/map';

export class RxService {

  static getData(observable: Observable<any>): Promise<any> {
    return observable.pipe(
      filter((data) => data !== null),
      first(),
      map((data) => JSON.parse(JSON.stringify(data))),
    ).toPromise();
  }

  static distinctUntilChanged(observable: Observable<any>): Observable<any> {
    return observable.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)));
  }

}
