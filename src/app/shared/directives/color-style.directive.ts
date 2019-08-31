import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[appColorStyle]'
})
export class ColorStyleDirective {
  @Input('appColorStyle') color: string;

  constructor(private sanitizer: DomSanitizer) {}

  @HostBinding('attr.style')
  public get valueAsStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`--background:${this.color};`);
  }
}
