import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private strokes: { x: number, y: number }[][] = [];
  currentColor: string = '#000'; // el color negro será el valor inicial

  private ctx!: CanvasRenderingContext2D;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    const img = new Image();
    img.src = 'assets/images/plantillawithlogo.png';
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    };
    this.setupCanvas();
  }

  changeColor(color: string): void {
    this.currentColor = color;
    this.ctx.strokeStyle = color; // actualiza el color del trazo
  }

  private setupCanvas(): void {
    // Get the current style of the canvas and set its dimensions to match the style
    const canvasStyle = getComputedStyle(this.canvas.nativeElement);
    this.canvas.nativeElement.width = parseInt(canvasStyle.width);
    this.canvas.nativeElement.height = parseInt(canvasStyle.height);

    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: MouseEvent | TouchEvent): void => {
      // Prevent default touch behavior
      e.preventDefault();

      drawing = true;
      lastX = (e instanceof MouseEvent) ? e.offsetX : e.touches[0].clientX - this.canvas.nativeElement.offsetLeft;
      lastY = (e instanceof MouseEvent) ? e.offsetY : e.touches[0].clientY - this.canvas.nativeElement.offsetTop;
    };

    const draw = (e: MouseEvent | TouchEvent): void => {
      // Prevent default touch behavior
      e.preventDefault();

      if (!drawing) {
        return;
      }

      const currentX = (e instanceof MouseEvent) ? e.offsetX : e.touches[0].clientX - this.canvas.nativeElement.offsetLeft;
      const currentY = (e instanceof MouseEvent) ? e.offsetY : e.touches[0].clientY - this.canvas.nativeElement.offsetTop;

      this.ctx.beginPath();
      this.ctx.moveTo(lastX, lastY);
      this.ctx.lineTo(currentX, currentY);
      this.ctx.strokeStyle = this.currentColor; // actualiza el color del trazo
      this.ctx.stroke();

      // Almacenamos el trazo actual en el arreglo de strokes
      this.strokes.push([{ x: lastX, y: lastY }, { x: currentX, y: currentY }]);

      lastX = currentX;
      lastY = currentY;
    };

    const stopDrawing = (): void => {
      drawing = false;
    };

    // Add event listeners for mouse and touch events
    this.canvas.nativeElement.addEventListener('mousedown', startDrawing);
    this.canvas.nativeElement.addEventListener('touchstart', startDrawing, { passive: false });
    this.canvas.nativeElement.addEventListener('mousemove', draw);
    this.canvas.nativeElement.addEventListener('touchmove', draw, { passive: false });
    this.canvas.nativeElement.addEventListener('mouseup', stopDrawing);
    this.canvas.nativeElement.addEventListener('touchend', stopDrawing);
    this.canvas.nativeElement.addEventListener('mouseout', stopDrawing);
    this.canvas.nativeElement.addEventListener('touchcancel', stopDrawing);
  }

  downloadCanvas(): void {
    const canvas = this.canvas.nativeElement;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = 'myNewDesign.png';
    link.href = image;
    link.click();
  }
}
