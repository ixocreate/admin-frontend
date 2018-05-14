import {ApiService} from './api.service';
import {AppInjector} from './app-injector.service';
import {ConfigurationService} from './configuration.service';
import {ResourceService} from './resource/resource.service';

export class DataStoreService {
    /**
     * collection of data/resource services used in this component
     * @type {any[]}
     */
    protected dataServices: {[index: string]: ResourceService} = {};

    /**
     * if a dataService: ResourceService was passed, add it to list of this component's dataservices right away
     * otherwise create a new ResourceService instance, set its key from route param and add that instead
     */
    // if (this.dataService.resourceKey) {
    //     this.dataServices.push(this.dataService);
    // }
    // else {
    //     this.route.params.takeUntil(this.destroyed$)
    //         .subscribe(params => {
    //             this.dataService = ResourceService.create(params.type);
    //             this.dataServices.push(this.dataService);
    //             const test = ResourceService.create('test');
    //             console.warn(this.dataService.resourceKey);
    //             console.warn(test.resourceKey);
    //         });
    // }

    constructor() {
        // this.dataServices.push(mediaService);
        // this.dataServices.push(userService);
    }

    resource(resourceKey: string): ResourceService {
        let dataService = this.dataServices[resourceKey];

        if (!dataService) {
            dataService = new ResourceService(AppInjector.get(ApiService), AppInjector.get(ConfigurationService));
            dataService.resourceKey = resourceKey;
            this.register(dataService);
        }

        return dataService;
    }

    register(resourceService: ResourceService) {
        this.dataServices[resourceService.resourceKey] = resourceService;
        console.warn('registered ' + resourceService.resourceKey);
        console.log(this.dataServices);
    }
}
