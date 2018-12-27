import { Directive, ElementRef, HostListener, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[kiwiDropdown]',
})
export class DropdownDirective implements OnInit {

  private isOpen = false;
  private button: HTMLElement;

  @HostListener('document:click.out-zone', ['$event']) clickOutside(event) {
    if (event.target !== this.button && event.target.parentElement !== this.button) {
      if (this.isOpen) {
        this.zone.run(() => {
          this.close();
        });
      }
    }
  }

  constructor(private element: ElementRef, private zone: NgZone) {
  }

  ngOnInit() {
    this.button = this.element.nativeElement.querySelector('.dropdown-btn');

    this.button.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    });
  }

  open() {
    this.isOpen = true;
    this.element.nativeElement.querySelector('.dropdown-menu').classList.add('show');
  }

  close() {
    this.isOpen = false;
    this.element.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
  }
}
