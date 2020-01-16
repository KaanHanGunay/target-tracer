import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Tab } from 'app/components/tabs/tab.model';
import { ContentContainerDirective } from 'app/components/tabs/content-container.directive';

@Component({
  selector: 'jhi-tab-content',
  template: '<ng-template jhiContentContainer></ng-template>'
})
export class TabContentComponent implements OnInit {
  @Input() tab?: Tab;
  @ViewChild(ContentContainerDirective, { static: true })
  contentContainer?: ContentContainerDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    const tab: Tab = this.tab!;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tab.component!);
    const componentRef = this.contentContainer!.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.tabData = tab.tabData;
  }
}
