//default binding
function greet() {
  console.log("good morning" + this.name);
}
const name = "anjal";

greet();

//implicity binding
function greetImp() {
  console.log("my age is " + this.age);
}

const myObj = {
  age: 22,
  greet: greetImp,
};

myObj.greet();

//explicity binding
function greetExp() {
  console.log(`hello ${this.name}, this is explicit binding`);
}

const myObj2 = { name: "Ronaldo" };

greetExp.call(myObj2);
greetExp.apply(myObj2);
const greetC = greetExp.bind(myObj2);
greetC();

//new binding
function Shape(type) {
  this.type = type;
}

const newShape = new Shape("Circle");
console.log(newShape);

/////
class Person {
  constructor(name) {
    this.name = name;
  }

  displayName() {
    console.log(`name is ${this.name}`);
  }
}

const person = new Person("Anjal");
const personName = person.displayName;

// personName();

//// arrow in constructor

class ArrowPerson {
  constructor(name) {
    this.name = name;

    this.displayName = () => {
      console.log(`name is ${this.name}`);
    };
  }
}

const personArrow = new ArrowPerson("Ronaldo");
const personArrowName = personArrow.displayName;

personArrowName();

// using bind

class BindPerson {
  constructor(name) {
    this.name = name;
  }

  displayName() {
    console.log(`name is ${this.name} from bind`);
  }
}

const personBind = new BindPerson("Marcelo");
const personBindName = personBind.displayName.bind(personBind);
personBindName();

// class field

class ClassPerson {
  name = "Kroos";

  displayName = () => {
    console.log(`name is ${this.name}`);
  };
}

const personClass = new ClassPerson();
const personClassName = personClass.displayName;
personClassName();

// bindAll(obj)

class Random {
  print() {
    console.log(this);
  }
}

function bindAll(obj) {
  const prototype = Object.getPrototypeOf(obj);
  const methods = Object.getOwnPropertyNames(prototype);

  for (let key of methods) {
    if (typeof prototype[key] === "function" && key !== "constructor") {
      obj[key] = prototype[key].bind(obj);
    }
  }
}
const test = new Random();
bindAll(test);

const randomTest = test.print;
randomTest();

///settimeout

class Animal {
  name = "elephant";
  displayName() {
    console.log(this.name);
  }
}

const elephant = new Animal();

const elephantPrint = elephant.displayName;

try {
  elephantPrint();
} catch (err) {
  console.log(err);
}

class AnimalLion {
  name = "Lion";
  displayName = () => {
    console.log(this.name);
  };
}

const lion = new AnimalLion();

setTimeout(lion.displayName, 3000);
