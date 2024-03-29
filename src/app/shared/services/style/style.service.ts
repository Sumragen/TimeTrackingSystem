import { Injectable } from '@angular/core';
import { HSLColor } from '../../models/colors.models';

@Injectable()
export class StyleService {
  public static bg(color: string): string {
    return `--background:${color}`;
  }

  public static button(color: HSLColor): string {
    const border = `hsla(${color.hue}, ${color.saturation}%, ${color.luminance}%, 1)`;
    const bg = `hsla(${color.hue}, ${color.saturation}%, ${color.luminance}%, 0.3)`;
    const bgActivated = `hsla(${color.hue}, ${color.saturation}%, ${color.luminance - 10}%, 0.6)`;
    const ripple = `hsla(${color.hue}, ${color.saturation}%, ${color.luminance - 10}%, 0.6)`;

    return `
      --border-color:${border};
      --background:${bg};
      --background-activated:${bgActivated};
      --ripple-color:${ripple};
      --color:black;
      --color-activated:black;
    `;
  }

  public static colorPickerHueRange(color: HSLColor): string {
    return `
      --knob-size: 30px;
      --bar-height: 10px;
      --bar-border-radius: 5px;
      --height: 52px;
      --bar-background:linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
      --knob-background:hsla(${color.hue}, 100%, 50%, 1);
      --bar-background-active:rgba(1,1,1,0);
      --pin-background:hsla(${color.hue}, 100%, 50%, 1);
    `;
  }

  public static colorPickerLuminanceRange(color: HSLColor): string {
    return `
      --knob-size: 30px;
      --bar-height: 10px;
      --bar-border-radius: 5px;
      --height: 52px;
      --bar-background:linear-gradient(to right, hsla(${color.hue}, 100%, 0%, 1) 0%, hsla(${color.hue}, 100%, 50%, 1) 50%, hsla(${color.hue}, 100%, 100%, 1) 100%);
      --knob-background:hsla(${color.hue}, 100%, ${color.luminance}%, 1);
      --bar-background-active:rgba(1,1,1,0);
      --pin-background:hsla(${color.hue}, 100%, ${color.luminance}%, 1);
    `;
  }

  public static colorPickerSaturationRange(color: HSLColor): string {
    return `
      --knob-size: 30px;
      --bar-height: 10px;
      --bar-border-radius: 5px;
      --height: 52px;
      --bar-background:linear-gradient(to right, hsla(${color.hue}, 0%, 50%, 1) 0%, hsla(${color.hue}, 50%, 50%, 1) 50%, hsla(${color.hue}, 100%, 50%, 1) 100%);
      --knob-background:hsla(${color.hue}, ${color.saturation}%, 50%, 1);
      --bar-background-active:rgba(1,1,1,0);
      --pin-background:hsla(${color.hue}, ${color.saturation}%, 50%, 1);
    `;
  }
}
