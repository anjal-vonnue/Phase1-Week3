let orders = [
  { id: 1, items: ["apple", "orange"] },
  { id: 2, items: ["mango", "grapes"] },
  { id: 1, items: ["banana", "coconut"] },
];

const itemsList = orders.flatMap((cart) => {
  if (cart.id === 1) {
    console.log("id: ", cart.id);
    console.log("items: ", cart.items);
    return cart.items;
  }
  return [];
});

console.log("items list: ", itemsList);

let logs = [
  { id: 1, name: "login", status: "success" },
  { id: 2, name: "data fetch", status: "error" },
  { id: 3, name: "database", status: "error" },
];

const lastError = logs.findLast((log) => log.status === "error");
console.log("last error: ", lastError);

const lastErrorIndex = logs.findLastIndex((log) => log.status === "error");
console.log("last error index: ", lastErrorIndex);

// link: https://medium.com/@matt.readout/chunking-an-array-in-javascript-831150bb6c7

let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

function chunk(arr, size) {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArray.push(arr.slice(i, i + size));
  }
  return chunkedArray;
}

const letterChunks = chunk(letters, 2);
console.log("lette chunks: ", letterChunks);

//link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/zip
//link: https://stackoverflow.com/questions/22015684/zip-arrays-in-javascript

let numbers = [1, 2, 3, 4, 5];

function zip(...arrays) {
  return arrays[0].map((e, i) => arrays.map((arr) => arr[i]));
}
const zippedArr = zip(letterChunks, numbers);
console.log("zipped Arr", zippedArr);

// link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy

const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

function checkStock(obj) {
  return obj.quantity < 6 ? "restock" : "sufficient";
}

function groupBy(arr, keyFn) {
  const newArr = {};
  arr.forEach((element) => {
    let key = keyFn(element);
    if (!newArr[key]) newArr[key] = [];
    newArr[key].push(element);
  });

  return newArr;
}
const result = groupBy(inventory, checkStock);

// const result = Object.groupBy(inventory, ({ quantity }) =>
//   quantity < 6 ? "restock" : "sufficient",
// );

console.log(result);

//link: https://dev.to/shafiemoji/create-an-array-of-months-with-javascript-2cpj

const months = Array.from({ length: 12 }, (item, i) => {
  return new Date(0, i).toLocaleString("en-US", { month: "long" });
});

console.log("months: ", months);
