const one = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("one resolved");
  }, 1000);
});

const two = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("two rejected");
  }, 2000);
});

const three = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("three resolved");
    reject("three rejected");
  }, 3000);
});

const four = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("four rejected");
    resolve("four resolved");
  }, 4000);
});

const five = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("five resolve");
  }, 5000);

  reject("five rejected");
});

const six = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("six rejected");
  }, 6000);

  resolve("six resolved");
});

one
  .then((result) => console.log(result))
  .catch((error) => console.error("one error: ", error));

two
  .then((result) => console.log(result))
  .catch((error) => console.error("two error: ", error));

three
  .then((result) => console.log(result))
  .catch((error) => console.error("three error: ", error));

four
  .then((result) => console.log(result))
  .catch((error) => console.error("four error: ", error));
five
  .then((result) => console.log(result))
  .catch((error) => console.log("five error: ", error));
six
  .then((result) => console.log(result))
  .catch((error) => console.error("six erro: ", error));

// chaining

const user = {
  userId: 1,
  name: "anjal",
  orders: [{ orderId: 111, product: "keyboard" }],
};

function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user.userId);
      //   resolve(undefined);
    }, 3000);
  });
}

function getOrders(userId) {
  return new Promise((resolve, reject) => {
    if (userId === undefined) {
      reject("user id is undefined");
      return;
    }
    setTimeout(() => {
      let orders = user.orders;

      resolve(orders);
    }, 2000);
  });
}

function getOrderDetails(orderId) {
  return new Promise((resolve, reject) => {
    const details = user.orders.filter((order) => order.orderId === orderId);

    setTimeout(() => {
      resolve(details);
    }, 3000);
  });
}

getUser()
  .then((result) => getOrders(result))
  .then((result) => getOrderDetails(result[0].orderId))
  .then((result) => console.log(result))
  .catch((err) => console.error(err));

/// promise api

Promise.all([
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("first");
    }, 3000);
  }),

  new Promise((resolve) => {
    setTimeout(() => {
      resolve("second");
    }, 2000);
  }),

  new Promise((resolve) => {
    setTimeout(() => {
      resolve("third");
    }, 1000);
  }),
])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

Promise.allSettled([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("resolved successfully");
    }, 3000);
  }),

  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("rejected successfully");
    }, 2000);
  }),
]).then((result) => console.log(result));

Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("chest number: 1");
    }, 2000);
  }),

  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("chest number: 2");
    }, 1000);
  }),
]).then((result) => console.log(result));
