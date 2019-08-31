import { Injectable } from '@angular/core';
import { HLColor } from '../../models/colors.models';

@Injectable()
export class StyleService {
  public static bg(color: string): string {
    return `--background:${color}`;
  }

  public static button(color: HLColor): string {
    const border = `hsla(${color.hue}, 100%, ${color.luminance}%, 1)`;
    const bg = `hsla(${color.hue}, 100%, ${color.luminance}%, 0.3)`;
    const bgActivated = `hsla(${color.hue}, 100%, ${color.luminance - 10}%, 0.6)`;
    const ripple = `hsla(${color.hue}, 100%, ${color.luminance - 10}%, 0.6)`;

    return `
      --border-color:${border};
      --background:${bg};
      --background-activated:${bgActivated};
      --ripple-color:${ripple};
      --color:black;
      --color-activated:black;
    `;
  }

  public static colorPickerRange(): string {
    return `
      --knob-size:20px;
      --bar-height:5px;
      --bar-border-radius:2px;
      --bar-background:#ea1818;
      --knob-background:#bc38ff;
      --bar-background-active:rgba(1,1,1,0);
      --pin-background:#ffdd38;
    `;
  }
}
