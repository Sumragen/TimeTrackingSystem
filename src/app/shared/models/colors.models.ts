interface Hue {
  hue: number;
}
interface Saturation {
  saturation: number;
}
interface Luminance {
  luminance: number;
}
export interface HSLColor extends Hue, Saturation, Luminance {}
