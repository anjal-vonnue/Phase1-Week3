//link: https://stackoverflow.com/questions/3396088/how-do-i-remove-an-object-from-an-array-with-javascript
//link: https://stackoverflow.com/questions/22844560/check-if-object-value-exists-within-a-javascript-array-of-objects-and-if-not-add
//link: https://refactoring.guru/design-patterns/observer
//link: https://www.geeksforgeeks.org/system-design/observer-pattern-set-1-introduction/

let observer = [];
function addObserver(fn) {
  observer.push(fn);
}

function notifyObservers() {
  observer.forEach((fn) => fn());
}
class Cart {
  constructor(items, coupon) {
    this.items = items;
    this.coupon = coupon;
  }

  addItem(name, price) {
    const hasItem = this.items.some((item) => item.name === name);
    let newItems;
    if (hasItem) {
      // newItems = [...this.items, { name, price, number: number + 1 }];

      newItems = this.items.map((item) => {
        if (item.name === name) {
          console.log("item name:", item.name);
          console.log("item number:", item.number);

          return {
            name: item.name,
            price: item.price,
            number: item.number + 1,
          };
        } else {
          return item;
        }
      });
    } else {
      newItems = [...this.items, { name, price, number: 1 }];
    }

    return new Cart(newItems, this.coupon);
  }

  removeItem(name) {
    let newItem = this.items.filter((item) => item.name !== name);
    return new Cart(newItem, this.coupon);
  }

  updateQuantity(name, number) {
    console.log("name: " + name + " number: " + number);

    let newItem = this.items.map((item) => {
      console.log("item: ", item);

      if (item.name === name) {
        console.log("inside if");

        return { name: item.name, price: item.price, number: number };
      } else {
        console.log("inside else");
        return item;
      }
    });
    // console.log("updateQuanity newItem: ", newItem);

    return new Cart(newItem, this.coupon);
  }

  applyCoupon(code) {
    // console.log("number: ", Number(code));
    // this.coupon = Number(code);
    let newCart = new Cart(this.items, Number(code));
    // console.log("code: ", this.coupon);

    return newCart;
  }

  getTotal() {
    let total = 0;
    // console.log("lenght: ", this.items.length);

    for (const item of this.items) {
      // console.log("item: ", Number(item.price));

      total = total + Number(item.price) * Number(item.number);
      // console.log("total: ", total);
    }

    let afterDiscount = total - (total * this.coupon) / 100;

    return afterDiscount;
  }
}

let cart = new Cart([], 0);
let history = [];

function logCart(newCart) {
  history.push(cart);
  cart = newCart;

  // console.log("histroy: ", history);
  // console.log("=================");
  // render();
}

function addItem(name, price) {
  const newCart = cart.addItem(name, price);
  console.log(newCart);
  // console.log("=================");
  logCart(newCart);
  updatePrice();
  render();
}

function addQuantity() {
  const productName = document.getElementById("product-name").value;
  const productQuantity = document.getElementById("product-quantity").value;

  if (productName && productQuantity) {
    console.log("product name:", productName);
    console.log("product q:", productQuantity);
    const newCart = cart.updateQuantity(productName, productQuantity);
    console.log("addQuantity: ", newCart);
    logCart(newCart);

    updatePrice();
    render();
  }
}

function removeItem(name) {
  console.log("removeItem: ", name);

  const newCart = cart.removeItem(name);
  logCart(newCart);

  updatePrice();
  render();
}

function applyCoupon() {
  const codeValue = document.getElementById("coupon-input").value;
  console.log("codeValue: ", codeValue);

  const newCart = cart.applyCoupon(codeValue);
  logCart(newCart);
  document.getElementById("coupon-input").value = "";

  console.log(cart);

  updatePrice();
  render();
}

function undo() {
  if (history.length > 0) {
    console.log("before undo: ", cart);

    cart = history.pop();
    console.log("history cart: ", cart);
  }

  updatePrice();
  console.log("undo cart:", cart);

  render();
}

// addItem("banana", 250);
// addItem("apple", 50);
// applyCoupon(50);
// addItem("orange", 130);
// applyCoupon(30);

// addQuantity("banana", 4);
// console.log("afterupdate:", cart);

// removeItem("banana");
// console.log("after remove:", cart);

// console.log("stack history: ", history);
console.log("getTotal", cart.getTotal());

function updatePrice() {
  const priceSpan = document.getElementById("total-price");
  priceSpan.textContent = cart.getTotal();
}

function render() {
  console.log(cart.items);
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  for (const item of cart.items) {
    cartContainer.innerHTML += ` <div class="item">
            <p class="item-name">${item.name}</p>
            <p class="item-quantity">Quantity: ${item.number}</p>
            <button onclick="removeItem('${item.name}')">Remove</button>
          </div>`;
  }
}
