import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Media} from '../../models';
import {ResourceEditComponent} from '../resource';

@Component({
    selector: 'app-media-edit',
    templateUrl: './media-edit.component.html',
})
export class MediaEditComponent extends ResourceEditComponent implements OnInit {

    protected pathPrefix = '';

    model: Media;

    initForm() {
        this.form = this.formBuilder.group({
            title: new FormControl(this.model.title, [
                Validators.required,
                Validators.minLength(4),
            ]),
            description: new FormControl(this.model.description, []),
        });
    }
}
