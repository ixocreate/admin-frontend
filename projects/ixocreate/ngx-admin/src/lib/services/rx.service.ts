import { Observable } from 'rxjs/observable';
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

}
