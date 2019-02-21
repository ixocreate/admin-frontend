import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { DefaultStore } from '../../store/default.store';
import { tap } from 'rxjs/internal/operators';

export abstract class DataServiceAbstract {
  protected loadingKeys = [];

  protected constructor(protected store: Store<AppState>) {
  }

  protected saveToDefaultStore(actionName: string, data: any) {
    this.store.dispatch(DefaultStore.Actions.Set(actionName, data));
  }

  protected loadFromStore(storeKey: string, request: () => Promise<any>) {
    return this.store.select(storeKey).pipe(
      tap((data: any) => {
        this.loadIfNoData(data, request);
      }),
    );
  }

  protected loadIfNoData(data: any, request: () => Promise<any>) {
    if (!data) {
      this.runSingle(request);
    }
  }

  protected runSingle(request: () => Promise<any>) {
    const index = this.loadingKeys.indexOf(request);
    if (index === -1) {
      this.loadingKeys.push(request);
      request.call(this)
        .then(() => this.loadingKeys.splice(index, 1))
        .catch(() => this.loadingKeys.splice(index, 1));
    }
  }
}
