const PI = 3.14159;

class Shape {
  constructor(name, colour) {
    this.name = name;
    this.colour = colour;
  }
  describe() {
    console.log(`this is a ${this.name} with ${this.colour} colour`);
  }

  static compare(a, b) {
    return a.area() - b.area();
  }
}

class Circle extends Shape {
  constructor(radius) {
    super("Circle", "Red");
    this.radius = radius;
  }

  describe() {
    super.describe();
    console.log(`it has a raduis of ${this.radius}`);
  }

  area() {
    return PI * this.radius * this.radius;
  }

  perimeter() {
    return 2 * PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(w, h) {
    super("Rectangle", "Blue");
    this.w = w;
    this.h = h;
  }

  describe() {
    super.describe();
    console.log(`it has a width of ${this.w} and height of ${this.h}`);
  }

  area() {
    return this.w * this.h;
  }

  perimeter() {
    return 2(this.w * this.h);
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super("Triangle", "Green");
    this.base = base;
    this.height = height;
  }

  describe() {
    super.describe();
    console.log(`it has a base of ${this.base} and height of ${this.height}`);
  }

  area() {
    return (this.base * this.height) / 2;
  }
}

let circle = new Circle(5);
circle.describe();
console.log("Circle Area: ", circle.area());

let rectangle = new Rectangle(5, 10);
rectangle.describe();
console.log("Reactangle Area: ", rectangle.area());

let triangle = new Triangle(10, 10);
triangle.describe();
console.log("Triangle Area: ", triangle.area());

class ShapeCollection {
  collections = [];

  add(item) {
    this.collections.push(item);
  }

  removeById(id) {
    this.collections.splice(id, 1);
  }

  getByType(type) {
    for (let item of this.collections) {
      if (item.name === type) return item;
    }
  }

  sortByArea() {
    this.collections.sort(Shape.compare);
  }

  getTotalArea() {
    let totalArea = 0;
    for (let item of this.collections) {
      totalArea = totalArea + item.area();
    }
    console.log("total area: ", totalArea);

    return totalArea;
  }

  display() {
    for (let item of this.collections) {
      console.log(item);
    }
  }
}

const shapes = new ShapeCollection();
shapes.add(circle);
shapes.add(rectangle);
shapes.add(triangle);
console.log("===========");
shapes.display();
shapes.removeById(1);
console.log("===========");
shapes.display();
console.log("===========");
shapes.getTotalArea();
console.log("===========");
shapes.sortByArea();
shapes.display();
console.log("===========");
console.log(shapes.getByType("Circle"));
console.log("===========");
console.log(circle instanceof Shape);
console.log(circle instanceof Circle);
console.log("===========");
console.log(Object.getPrototypeOf(Circle));
console.log(Object.getPrototypeOf(circle));
console.log("===========");
console.log(circle.constructor.name);
console.log(rectangle.constructor.name);
