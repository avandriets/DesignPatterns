interface UIToolkit {
  drawBorder(): void;
  drawImage(src: string): void;
  drawText(text: string): void;
}

class SampleToolKit implements UIToolkit {

  public drawBorder(): void {
    console.log('Draw border');
  }

  public drawImage(src: string): void {
    console.log('Draw image');
  }

  public drawText(text: string): void {
    console.log('Draw text');
  }

}

abstract class UIElement {

  protected constructor(public toolkit: UIToolkit) {
  }

  public abstract render(): void;
}

class TextElement extends UIElement {

  public constructor(public text: string, toolkit: UIToolkit) {
    super(toolkit);
  }

  public render(): void {
    this.toolkit.drawText(this.text);
  }

}

class ImageElement extends UIElement {

  public constructor(public src: string, toolkit: UIToolkit) {
    super(toolkit);
  }

  public render(): void {
    this.toolkit.drawImage(this.src);
  }

}

const toolkit: UIToolkit = new SampleToolKit();

const imageElement = new ImageElement('foo.jpg', toolkit);
const textElement = new TextElement('Some text', toolkit);

imageElement.render();
textElement.render();
