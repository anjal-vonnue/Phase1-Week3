// different types of fucntions declarations

function greetFn(name, greeting = "Hello") {
  console.log(`${greeting}, ${name}`);
}

const greetExp = function (name, greeting = "Hello") {
  console.log(`${greeting}, ${name}`);
};

const greetArrow = (name, greeting = "Hello") => {
  console.log(`${greeting}, ${name}`);
};

const greetObject = {
  greet(name, greeting = "Hello") {
    console.log(`${greeting}, ${name}`);
  },
};

// calculator object

const calculator = {
  add(a, b) {
    return a + b;
  },

  sub(a, b) {
    return a - b;
  },

  mul(a, b) {
    return a * b;
  },

  div(a, b) {
    if (b === 0) {
      console.log("division by zero is not possible.");
      return;
    }

    return a / b;
  },
};

// a factory returning a function

function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}
console.log(createMultiplier(3)(7) === 21);

// arguments object function
// arrow functions can't access arguments because it doesn't have an arguments object
function argumentsFn() {
  const arrLength = arguments.length;
  for (let i = 0; i < arrLength; i++) {
    console.log(`Number: ${arguments[i]}`);
  }
}

argumentsFn(1, 2, 3, 4, 5);

// rest parameters

function restFn(...nums) {
  const numsLength = nums.length;
  for (let i = 0; i < numsLength; i++) {
    console.log(`Number: ${nums[i]}`);
  }
}

restFn(1, 2, 3, 4);
