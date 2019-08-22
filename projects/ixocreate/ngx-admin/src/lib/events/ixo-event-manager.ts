import { Inject, Injectable, NgZone } from '@angular/core';
import { EVENT_MANAGER_PLUGINS, EventManager } from '@angular/platform-browser';

/* used for performance issues when running some events inside zone */

/* tslint:disable:ban-types */
@Injectable()
export class IxoEventManager extends EventManager {
  constructor(@Inject(EVENT_MANAGER_PLUGINS) plugins: any[], private zone: NgZone) {
    super(plugins, zone);
  }

  addGlobalEventListener(element: string, eventName: string, handler: Function): Function {
    if (eventName.endsWith('out-zone')) {
      eventName = eventName.split('.')[0];
      return this.zone.runOutsideAngular(() => super.addGlobalEventListener(element, eventName, handler));
    }

    return super.addGlobalEventListener(element, eventName, handler);
  }
}
