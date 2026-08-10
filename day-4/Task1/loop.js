//first snippet

console.log("first start");

console.log("first end");

//second snippet

console.log("second start");

setTimeout(() => {
  console.log("timeout in second");
}, 0);

console.log("second end");

//third snippet

console.log("third start");

new Promise((resolve, reject) => {
  resolve("promise in third");
}).then((result) => {
  console.log(result);
});

console.log("third end");

//fourth snippet

console.log("fourth start");

setTimeout(() => {
  console.log("timeout in fourth");
}, 0);

new Promise((resolve, reject) => {
  resolve("promise in fourth");
}).then((result) => console.log(result));

console.log("fourth end");

//fivth snippet

console.log("fivth start");

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("timeout with promise in fivth");
  }, 0);
}).then((result) => console.log(result));

console.log("fivth end");

//sixth snippet

console.log("sixth start");

setTimeout(() => {
  new Promise((resolve, reject) => {
    resolve("promise with timeout in sixth");
  }).then((result) => console.log(result));
});

console.log("sixth end");

//seventh snippet

console.log("seventh start");

setTimeout(() => {
  console.log("timeout in seventh");
}, 0);

queueMicrotask(() => {
  console.log("micro stack in seventh");
});

console.log("seventh end");

// eighth snippet

console.log("eighth start");

setTimeout(() => {
  console.log("timeout in eighth");
}, 0);

queueMicrotask(() => {
  console.log("micro stack inside eighth");
});

Promise.resolve().then(() => {
  console.log("promise inside eighth");
});

console.log("eighth end");

//ninth snippet

console.log("ninth start");

setTimeout(() => {
  console.log("timeout in ninth");
  queueMicrotask(() => {
    console.log("microtask in ninth");

    Promise.resolve().then(() => {
      console.log("promise in ninth");
    });
  });
});

console.log("ninth end");

//tenth snippet

console.log("tenth start");

queueMicrotask(() => {
  setTimeout(() => {
    console.log("timout in tenth");
  }, 0);

  Promise.resolve().then(() => {
    console.log("promise in tenth");
  });

  queueMicrotask(() => {
    console.log("micro task inside a micro task");
  });
});

console.log("tenth end");
