import {Component} from '@angular/core';
import {PageAddComponent} from "../page/page-add.component";

@Component({
    selector: 'page-flat-add',
    templateUrl: './page-flat-add.component.html',
})
export class PageFlatAddComponent extends PageAddComponent
{
    protected handle = "";

    ngOnInit() {
        super.ngOnInit();

        this.route.params
            .subscribe(params => {
                this.handle = params.handle;
            });

    }
    onSubmit(): void {
        if (this.form.valid === false) {
            this.toastr.error('An error occurred while saving the page. Are all required fields entered?', 'Error');
            return;
        }
        let value = this.form.getRawValue();
        value['locale'] = this.locale;
        value['sitemapId'] = this.sitemapId;


        this.dataService.addPage(value).subscribe(
            (result: { id: string }) => {
                this.toastr.success('The Page was successfully created', 'Success');
                this.router.navigate(["/page-flat/" + this.handle, result.id, 'edit']);
            }, () => {
                this.toastr.error('There was an error in creating the page', 'Error');
            });
    }
}
