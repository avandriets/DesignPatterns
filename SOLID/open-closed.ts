//
// Oped for extension close for modification
//

enum Color {
  red = 'red',
  blue = 'blued',
  green = 'green'
}

enum Size {
  small = 'small',
  middle = 'middle',
  large = 'large'
}

class Product {

  public name: string;
  public color: Color;
  public size: Size;

  public constructor(name: string, color: Color, size: Size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }

}

//
// Old approach
//
class ProductFilter {

  filterByColor(products: Product[], color: Color): Product[] {
    return products.filter(p => p.color === color);
  }

  // extend functionality by modification (adding new filter method)
  filterBySize(products: Product[], size: Size): Product[] {
    return products.filter(p => p.size === size);
  }

  // For each filtering method we have add new function
}

const apple: Product = new Product('apple', Color.red, Size.small);
const car: Product = new Product('car', Color.green, Size.middle);
const building: Product = new Product('building', Color.red, Size.large);

const products = [apple, car, building];

console.log('## Initial products list:');
products.forEach(p => console.log(`Product: ${p.name}, Color: ${p.color}, Size: ${p.size}`));

const productFilter = new ProductFilter();
let productsFiltered = productFilter.filterByColor(products, Color.red);

console.log('\n## Filtered by color products list:');
productsFiltered.forEach(p => console.log(`Product: ${p.name}, Color: ${p.color}, Size: ${p.size}`));

// New approach
abstract class Specification {
  public abstract isSatisfied(item: Product): boolean;
}

class ColorSpecification extends Specification {

  public color: Color;

  public constructor(color: Color) {
    super();
    this.color = color;
  }

  public isSatisfied(item: Product): boolean {
    return item.color === this.color;
  }

}

class MultiSpec extends Specification {

  public color: Color;
  public size: Size;

  public constructor(color: Color, size: Size) {
    super();

    this.color = color;
    this.size = size;
  }

  public isSatisfied(item: Product): boolean {
    return item.color === this.color && item.size === this.size;
  }

}

class SuperFilter {

  filter(items: Product[], specification: Specification): Product[] {
    return items.filter(i => specification.isSatisfied(i));
  }

}

const sf = new SuperFilter();
productsFiltered = sf.filter(products, new ColorSpecification(Color.green));

console.log('\n## Filtered products list by Super Filter color:');
productsFiltered.forEach(p => console.log(`Product: ${p.name}, Color: ${p.color}, Size: ${p.size}`));

productsFiltered = sf.filter(products, new MultiSpec(Color.red, Size.small));

console.log('\n## Filter product list by Multi Filter color & size:');
productsFiltered.forEach(p => console.log(`Product: ${p.name}, Color: ${p.color}, Size: ${p.size}`));
