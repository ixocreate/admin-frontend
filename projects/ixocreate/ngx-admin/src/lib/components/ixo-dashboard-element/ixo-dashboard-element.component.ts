import { AfterViewInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'ixo-dashboard-element',
  templateUrl: './ixo-dashboard-element.component.html',
})
export class IxoDashboardElementComponent implements AfterViewInit {
  @ViewChild('element', {read: ViewContainerRef}) element: any;
  @Input() data;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dashboard: DashboardService) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadComponent();
    }, 0);
  }

  loadComponent() {
    this.element.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.dashboard.getComponent(this.data.type));
    const componentRef = this.element.createComponent(factory);
    (componentRef.instance).data = this.data.data;
  }

}
