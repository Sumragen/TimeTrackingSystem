import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appInnerButtonStyles]'
})
export class InnerButtonStylesDirective {
  @Input('appInnerButtonStyles') color: string;

  constructor(private sanitizer: DomSanitizer) {}

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--background:${this.color}`);
  }
}
