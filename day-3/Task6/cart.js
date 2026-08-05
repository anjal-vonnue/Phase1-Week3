//link: https://stackoverflow.com/questions/3396088/how-do-i-remove-an-object-from-an-array-with-javascript

class Cart {
  constructor(items, coupon) {
    this.items = items;
    this.coupon = coupon;
  }

  addItem(name, price) {
    let newItems = [...this.items, { name, price, number: 1 }];

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
    this.coupon = Number(code);
    let newCart = new Cart(this.items, this.coupon);
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
  let newCart;
  if (productName && productQuantity) {
    console.log("product name:", productName);
    console.log("product q:", productQuantity);
    newCart = cart.updateQuantity(productName, productQuantity);
    console.log("addQuantity: ", newCart);
  }

  logCart(newCart);

  updatePrice();
  render();
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
    cart = history.pop();
    console.log("history cart: ", cart);
  }

  updatePrice();
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
