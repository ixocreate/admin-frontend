import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'error.component.html',
})
export class ErrorComponent {
  reload() {
    window.location.reload();
  }
}
