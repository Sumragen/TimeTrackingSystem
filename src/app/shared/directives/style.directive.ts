import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {
  @Input('appStyle') style: string;

  constructor(private sanitizer: DomSanitizer) {}


  @HostBinding('attr.style')
  public get valueAsStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.style);
  }
}
