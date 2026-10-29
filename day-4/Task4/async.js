//link: https://stackoverflow.com/questions/69829254/problem-with-async-await-while-using-foreach

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
    const details = user.orders.find((order) => order.orderId === orderId);

    setTimeout(() => {
      resolve(details);
    }, 3000);
  });
}

// used async await in previous chained promises

async function getDetails() {
  const userId = await getUser();
  console.log("userId: ", userId);

  const orders = await getOrders(userId);
  console.log("orders: ", orders);

  const orderDetails = await getOrderDetails(orders[0].orderId);
  console.log("details: ", orderDetails);
}

getDetails();

///load Dashboard
const url = "https://jsonplaceholder.typicode.com";

async function fetchUser() {
  const response = await fetch(`${url}/users?id=1`);
  const user = await response.json();
  return user;
}

async function fetchPosts() {
  const response = await fetch(`${url}/users/1/posts`);
  const posts = await response.json();
  return posts;
}

async function fetchTodos() {
  const response = await fetch(`${url}/users/1/todos`);
  const todos = await response.json();
  return todos;
}

async function loadDashoard(userId) {
  try {
    const [user, posts, todos] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchTodos(),
    ]);

    // console.log("user: ", user);

    try {
      const response = await fetch(`${url}/posts/${posts[0].id}/comments`);
      const result = await response.json();
      const firstPostComment = result[0];
      //   console.log("first comment: ", firstPostComment);
    } catch (err) {
      console.log("error while loading first comment: ", err);
    }
  } catch (err) {
    console.log("error while loading dashboard data: ", err);
  }
}

loadDashoard();

//// sequential vs parallel

async function seq() {
  console.time("seq");
  await fetchUser();
  await fetchPosts();
  await fetchTodos();
  console.timeEnd("seq");
}
seq();

async function para() {
  console.time("para");
  Promise.all([fetchUser(), fetchPosts(), fetchTodos()]);
  console.timeEnd("para");
}

para();

const names = ["ronaldo", "messi", "neymar"];

async function forEachBug() {
  names.forEach(async (name) => {
    await new Promise((resolve) => {
      resolve(name);
    });

    console.log(name);
  });

  console.log("completed bug");
}

forEachBug();

async function bugFix() {
  for (const name of names) {
    await new Promise((resolve) => {
      resolve(name);
    });
    console.log(name);
  }
  console.log("completed fix");
}

bugFix();

async function mapPromiseFix() {
  const promises = names.map(async (name) => {
    return await new Promise((resolve) => {
      console.log(name);

      resolve(name);
    });
  });

  await Promise.all(promises);

  console.log("completed promise all");
}

mapPromiseFix();
