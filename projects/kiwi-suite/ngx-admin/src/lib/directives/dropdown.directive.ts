import { Directive, ElementRef, HostListener, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[kiwiDropdown]',
})
export class DropdownDirective implements OnInit {

  private isOpen = false;

  @HostListener('document:click.out-zone') clickOutside() {
    if (this.isOpen) {
      this.zone.run(() => {
        this.close();
      });
    }
  }

  constructor(private element: ElementRef, private zone: NgZone) {
  }

  ngOnInit() {
    this.element.nativeElement.querySelector('.dropdown-btn').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
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
