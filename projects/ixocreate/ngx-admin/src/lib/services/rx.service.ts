import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

export class RxService {

  static getData(observable: Observable<any>): Promise<any> {
    return observable.pipe(
      filter((data) => data !== null),
      first(),
      map((data) => JSON.parse(JSON.stringify(data))),
    ).toPromise();
  }

}
