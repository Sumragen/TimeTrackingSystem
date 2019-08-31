import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

const POUCH = [
  {
    START: 'mousedown',
    MOVE: 'mousemove',
    STOP: 'mouseup'
  },
  {
    START: 'touchstart',
    MOVE: 'touchmove',
    STOP: 'touchend'
  }
];

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements AfterViewInit {
  @Input() hexColor: string;
  @Output() hexColorChange: EventEmitter<string> = new EventEmitter(false);

  @Output() colorChanged = new EventEmitter<String>();
  @Output() colorTouchStart = new EventEmitter<void>();
  @Output() colorTouchEnd = new EventEmitter<void>();

  @ViewChild('palette', { static: false }) palette: ElementRef;
  @ViewChild('chooser', { static: false }) chooser: ElementRef;

  private ctxPalette: CanvasRenderingContext2D;
  private color: string;
  private colorFromChooser: string;
  private paletteX: number;
  private paletteY: number;
  private chooserX: number;

  public ngAfterViewInit() {
    this.init();
  }

  private init(): void {
    this.initChooserColor();
    this.initChooser();
    this.initPalette();
  }

  private initChooserColor(): void {
    this.colorFromChooser = this.hexColor || '#0000FF';
  }

  private drawSelector(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    this.drawPalette(this.colorFromChooser);
    ctx.beginPath();
    ctx.arc(x, y, 10 * ColorPickerComponent.getPixelRatio(ctx), 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
  }

  private drawChooserSelector(ctx: CanvasRenderingContext2D, x: number): void {
    this.drawPalette(this.colorFromChooser);
    ctx.beginPath();
    ctx.arc(x, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.colorFromChooser;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
  }

  private initPalette(): void {
    let canvasPalette = this.palette.nativeElement;
    this.ctxPalette = canvasPalette.getContext('2d');

    const currentWidth = window.innerWidth;

    const pixelRatio = ColorPickerComponent.getPixelRatio(this.ctxPalette);

    const width = (currentWidth * 90) / 100;
    const height = width * 0.5;

    this.ctxPalette.canvas.width = width * pixelRatio;
    this.ctxPalette.canvas.height = height * pixelRatio;

    this.ctxPalette.canvas.style.width = width + 'px';
    this.ctxPalette.canvas.style.height = height + 'px';

    this.drawPalette(this.colorFromChooser);

    const eventChangeColor = event => {
      this.updateColor(event, canvasPalette, this.ctxPalette);
    };

    POUCH.forEach(pouch => {
      canvasPalette.addEventListener(pouch.START, event => {
        this.colorTouchStart.emit();
        this.drawPalette(this.colorFromChooser);
        canvasPalette.addEventListener(pouch.MOVE, eventChangeColor);
        this.updateColor(event, canvasPalette, this.ctxPalette);
      });

      canvasPalette.addEventListener(pouch.STOP, event => {
        this.colorTouchEnd.emit();
        canvasPalette.removeEventListener(pouch.MOVE, eventChangeColor);
        this.updateColor(event, canvasPalette, this.ctxPalette);
        this.drawSelector(this.ctxPalette, this.paletteX, this.paletteY);
      });
    });
  }

  private drawPalette(endColor: string): void {
    this.ctxPalette.clearRect(0, 0, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height);

    let gradient = this.ctxPalette.createLinearGradient(0, 0, this.ctxPalette.canvas.width, 0);

    // Create color gradient
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(1, endColor);

    // Apply gradient to canvas
    this.ctxPalette.fillStyle = gradient;
    this.ctxPalette.fillRect(0, 0, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height);

    // Create semi transparent gradient (white -> trans. -> black)
    gradient = this.ctxPalette.createLinearGradient(0, 0, 0, this.ctxPalette.canvas.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
    gradient.addColorStop(1, 'rgba(0,     0,   0, 1)');

    // Apply gradient to canvas
    this.ctxPalette.fillStyle = gradient;
    this.ctxPalette.fillRect(0, 0, this.ctxPalette.canvas.width, this.ctxPalette.canvas.height);
  }

  initChooser() {
    let canvasChooser = this.chooser.nativeElement;
    const ctx = canvasChooser.getContext('2d');

    const currentWidth = window.innerWidth;

    const pixelRatio = ColorPickerComponent.getPixelRatio(ctx);

    const width = (currentWidth * 90) / 100;
    const height = width * 0.05;

    ctx.canvas.width = width * pixelRatio;
    ctx.canvas.height = height * pixelRatio;

    ctx.canvas.style.width = width + 'px';
    ctx.canvas.style.height = height + 'px';

    ColorPickerComponent.drawChooser(ctx);

    const eventChangeColorChooser = event => {
      this.updateColorChooser(event, canvasChooser, ctx);
      this.drawSelector(
        this.ctxPalette,
        this.ctxPalette.canvas.width,
        this.ctxPalette.canvas.height / 2
      );
    };

    POUCH.forEach(pouch => {
      canvasChooser.addEventListener(pouch.START, event => {
        ColorPickerComponent.drawChooser(ctx);
        canvasChooser.addEventListener(pouch.MOVE, eventChangeColorChooser);
        this.updateColorChooser(event, canvasChooser, ctx);
        this.drawSelector(
          this.ctxPalette,
          this.ctxPalette.canvas.width,
          this.ctxPalette.canvas.height / 2
        );
      });

      canvasChooser.addEventListener(pouch.STOP, event => {
        canvasChooser.removeEventListener(pouch.MOVE, eventChangeColorChooser);
        this.updateColorChooser(event, canvasChooser, ctx);
        ColorPickerComponent.drawChooser(ctx);
        this.drawChooserSelector(ctx, this.chooserX);
        this.drawSelector(
          this.ctxPalette,
          this.ctxPalette.canvas.width,
          this.ctxPalette.canvas.height / 2
        );
      });
    });
  }

  private static drawChooser(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);

    // Create color gradient
    gradient.addColorStop(0, 'rgb(255,   0,   0)');
    gradient.addColorStop(0.15, 'rgb(255,   0, 255)');
    gradient.addColorStop(0.33, 'rgb(0,     0, 255)');
    gradient.addColorStop(0.49, 'rgb(0,   255, 255)');
    gradient.addColorStop(0.67, 'rgb(0,   255,   0)');
    gradient.addColorStop(0.84, 'rgb(255, 255,   0)');
    gradient.addColorStop(1, 'rgb(255,   0,   0)');

    // Apply gradient to canvas
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private static getPixelRatio(ctx): number {
    const dpr = window.devicePixelRatio || 1;

    const bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;

    return dpr / bsr;
  }

  updateColorChooser(event, canvas, context) {
    this.color = this.colorFromChooser = this.getColor(event, canvas, context, true);
    this.colorChanged.emit(this.color);
    this.hexColorChange.emit(this.color);
    this.drawPalette(this.color);
  }

  updateColor(event, canvas, context) {
    this.color = this.getColor(event, canvas, context, false);
    this.colorChanged.emit(this.color);
    this.hexColorChange.emit(this.color);
  }

  getColor(event, canvas, context, fromChooser: boolean): string {
    const bounding = canvas.getBoundingClientRect(),
      touchX = event.pageX || event.changedTouches[0].pageX || event.changedTouches[0].screenX,
      touchY = event.pageY || event.changedTouches[0].pageY || event.changedTouches[0].screenX;

    const x = (touchX - bounding.left) * ColorPickerComponent.getPixelRatio(context);
    const y = (touchY - bounding.top) * ColorPickerComponent.getPixelRatio(context);

    if (fromChooser) {
      this.chooserX = x;
    } else {
      this.paletteX = x;
      this.paletteY = y;
    }

    const imageData = context.getImageData(x, y, 1, 1);
    const red = imageData.data[0];
    const green = imageData.data[1];
    const blue = imageData.data[2];
    return (
      '#' +
      ColorPickerComponent.toHex(red) +
      ColorPickerComponent.toHex(green) +
      ColorPickerComponent.toHex(blue)
    );
  }

  private static toHex(n): string {
    n = parseInt(n, 10);
    if (isNaN(n)) return '00';
    n = Math.max(0, Math.min(n, 255));
    return '0123456789ABCDEF'.charAt((n - (n % 16)) / 16) + '0123456789ABCDEF'.charAt(n % 16);
  }
}
