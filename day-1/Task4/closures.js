//closures

function createCounter() {
  let count = 0;

  function increment() {
    count++;
    console.log(`count incremented now the value is: ${count}`);
    return count;
  }

  function decrement() {
    count--;
    console.log(`count decremented now the value is: ${count}`);
    return count;
  }

  function getCount() {
    console.log(`count: ${count}`);
    return count;
  }

  function reset() {
    count = 0;
    console.log(`count resetted to ${count}`);
    return count;
  }

  return { increment, decrement, getCount, reset };
}

const counter = createCounter();

counter.increment();
counter.increment();
counter.decrement();
counter.increment();
counter.getCount();
counter.reset();

// memoize

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function fibonacci(num) {
  if (num == 1) {
    return 0;
  }

  if (num == 2) {
    return 1;
  }

  return fibonacci(num - 1) + fibonacci(num - 2);
}

const memoFibonacci = memoize(fibonacci);

console.log("hello");

console.time("first");
const first = memoFibonacci(30);
console.timeEnd("first");
console.log("first time: ", first);

console.time("second");
const second = memoFibonacci(30);
console.timeEnd("second");
console.log("second time: ", second);

// Once(fn)

function once(fn) {
  let calledOnce = false;
  let result;

  return function (...args) {
    if (!calledOnce) {
      result = fn.apply(this, args);
    }
    calledOnce = true;
    return result;
  };
}

function greet(name) {
  return "good morning, " + name;
}

const onceGreet = once(greet);

console.log(onceGreet("anjal"));
console.log(onceGreet("yasin"));
console.log(onceGreet("christo"));

// rate limiter

function createRateLimiter(fn, maxCalls, windowMs) {
  let count = 0;
  let initialTime = Date.now();

  return function (...args) {
    let currentTime = Date.now();
    if (currentTime - initialTime >= windowMs) {
      count = 0;
      initialTime = currentTime;
    }

    if (count < maxCalls) {
      count++;
      return fn.apply(this, args);
    }
    return new Error("rate limit reached");
  };
}

const limitFn = createRateLimiter(greet, 3, 5000);

console.log(limitFn("name 1"));
console.log(limitFn("name 2"));
console.log(limitFn("name 3"));
console.log(limitFn("name 4"));
console.log(limitFn("name 5"));
console.log(limitFn("name 6"));
setTimeout(() => {
  console.log(limitFn("name 6"));
}, 6000);
