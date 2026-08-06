const users = [
  [1, "ronaldo", "goat"],
  [2, "messi", "playmaker"],
  [3, "neymar", "magician"],
  [4, "jude", "centermid"],
  [5, "osil", "centermid"],
];

function updateUserImpure(users, id, changes) {
  const user = users.find((u) => u[0] === id);
  if (user) {
    user[1] = changes.name;
    user[2] = changes.position;
  }
  return users;
}

console.log("before impure:", users);

const impureResult = updateUserImpure(users, 2, {
  name: "ramos",
  position: "defender",
});

console.log("after impure:", users);

function updateUserPure(users, id, changes) {
  const newUser = users.map((u) => {
    if (u[0] === id) {
      return [u[0], changes.name, changes.position];
    }
    return u;
  });

  return newUser;
}

console.log("before pure:", users);

const pureResult = updateUserPure(users, 3, {
  name: "zidane",
  position: "legend",
});
console.log("after pure:", users);

console.log("pure result: ", pureResult);

//deep freeze https://dev.to/syed_ammar/javascript-object-deep-freeze-vs-shallow-freeze-4nk8
const freezeObject = {
  name: "Anjal",
  details: { age: 22, city: "Kannur" },
};

function deepFreeze(obj) {
  const propertyNames = Object.getOwnPropertyNames(obj);
  for (const name of propertyNames) {
    const value = obj[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}
console.log("before: ", freezeObject);

deepFreeze(freezeObject);

freezeObject.name = "Ronaldo";
freezeObject.details.age = 30;

console.log("after: ", freezeObject);
