import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[jhiContentContainer]'
})
export class ContentContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
