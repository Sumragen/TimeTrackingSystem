interface Hue {
  hue: number;
}
interface Luminance {
  luminance: number;
}
export interface HLColor extends Hue, Luminance {}
