import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { HLColor } from '../models/colors.models';

@Directive({
  selector: '[appInnerButtonStyles]'
})
export class InnerButtonStylesDirective {
  @Input('appInnerButtonStyles') color: HLColor;

  constructor(private sanitizer: DomSanitizer) {}

  @HostBinding('attr.style')
  public get valueAsStyle(): SafeStyle {
    const color: HLColor = this.color;
    const border = `hsla(${color.hue}, 100%, ${color.luminance}%, 1)`;
    const bg = `hsla(${color.hue}, 100%, ${color.luminance}%, 0.3)`;
    const bgActivated = `hsla(${color.hue}, 100%, ${color.luminance - 10}%, 0.6)`;
    const ripple = `hsla(${color.hue}, 100%, ${color.luminance - 10}%, 0.6)`;

    const style = `
      --border-color:${border};
      --background:${bg};
      --background-activated:${bgActivated};
      --ripple-color:${ripple};
      --color:black;
      --color-activated:black;
    `;

    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
