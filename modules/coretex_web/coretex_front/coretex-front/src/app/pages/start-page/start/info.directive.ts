import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appInfo]'
})
export class InfoDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
