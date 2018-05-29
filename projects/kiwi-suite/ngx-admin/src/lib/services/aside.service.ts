import {Injectable, TemplateRef} from '@angular/core';

@Injectable()
export class AsideService {
    public enabled: boolean = false;
    public content: TemplateRef<any>;

    public enable(content: TemplateRef<any>)
    {
        document.querySelector('body').classList.toggle('aside-menu-hidden');
        this.enabled = true;
        this.content = content;
    }

    public disable()
    {
        document.querySelector('body').classList.toggle('aside-menu-hidden');
        this.enabled = false;
        this.content = null;
    }
}
