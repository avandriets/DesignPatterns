interface Product {
  operation(): string;
}

class Concrete implements Product {

  public operation(): string {
    return '{Result of the Concrete}';
  }

}

class Brick implements Product {

  public operation(): string {
    return '{Result of the Brick}';
  }

}

abstract class Creator {

  public abstract factoryMethod(): Product;

  public someOperation(): string {
    const product = this.factoryMethod();
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }

}

class ConcreteCreator extends Creator {

  public factoryMethod(): Product {
    return new Concrete();
  }

}

class BrickCreator extends Creator {

  public factoryMethod(): Product {
    return new Brick();
  }

}

function testCode(creator: Creator) {
  console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
  console.log(creator.someOperation());
}

console.log('## Test Start ##');

testCode(new BrickCreator());
testCode(new ConcreteCreator());

console.log('## Test End ##');
