class Rectangle {
  public width: number;
  public height: number;

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public get area(): number {
    return this.height * this.width;
  }

  public toString(): string {
    return `height: ${this.height}*width${this.width}`;
  }

}

class Square extends Rectangle {

  public constructor(size: number) {
    super(size, size);
  }

}

const rc = new Rectangle(10,5);
console.log(`RC ${rc.toString()} ${rc.area}`);

const square = new Square(10);
console.log(`Square ${square.toString()} ${square.area}`);
