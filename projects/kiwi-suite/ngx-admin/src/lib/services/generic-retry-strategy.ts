import { Observable } from 'rxjs/Observable';
import { finalize, mergeMap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { timer } from 'rxjs/observable/timer';

export interface GenericRetryStrategyInterface {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
}

export const genericRetryStrategy = (config: GenericRetryStrategyInterface = {}) => {
  config = Object.assign({}, {
    maxRetryAttempts: 3,
    scalingDuration: 1000,
    excludedStatusCodes: [401, 403, 404],
  }, config);

  return (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        if (retryAttempt > config.maxRetryAttempts || config.excludedStatusCodes.find(e => e === error.status)) {
          return _throw(error);
        }
        console.log(`Retry Attempt ${retryAttempt}: retrying in ${retryAttempt * config.scalingDuration}ms`);
        return timer(retryAttempt * config.scalingDuration);
      }),
      finalize(() => console.log('Retry done!')),
    );
  };
};
