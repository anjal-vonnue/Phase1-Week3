window.onerror = function (message, source, lineno, colno, error) {
  console.log("error msg: ", message);
  console.log("source script: ", source);
  console.log("line number: ", lineno);
  overLay(message);

  return true;
};

window.addEventListener("unhandledrejection", function (e) {
  overLay("unhandled promise rejection");
  e.preventDefault();
});
class ValidationError extends Error {
  constructor(message, fieldName, statusCode) {
    super(message);
    this.name = "ValidationError";
    this.fieldName = fieldName;
    this.statusCode = statusCode;
  }
}

//////////////////////////////////////////////////////////////////////////////////
function parseUserInput(input) {
  if (typeof input != "string") {
    throw new TypeError("the input is not string");
  }
}

function ageValidation(age) {
  if (age < 18) {
    throw new ValidationError("age is less than 18", "input.age", 400);
  }
}
function rangeValidation(age) {
  if (age > 60) {
    throw new RangeError("the age should be in a range of 18 to 60");
  }
}

try {
  parseUserInput(1);
} catch (error) {
  console.log(error);
}

try {
  ageValidation(2);
} catch (error) {
  console.log(error);
}

try {
  rangeValidation(79);
} catch (error) {
  console.log(error);
}

function emailValidation(email) {
  const valid = email.includes("@vonnue");
  if (!valid) {
    throw new ValidationError("the email should be company name", "email", 400);
  }
}

const formButton = document.getElementById("button");
formButton.addEventListener("click", () => {
  const emailInput = document.getElementById("email-input");
  const emailValue = emailInput.value;
  const msg = document.getElementById("msg");
  try {
    emailValidation(emailValue);
    msg.textContent = `${emailValue} is valid`;
    msg.style.color = "green";
  } catch (error) {
    msg.textContent = `this is an ${error.name} and ${emailValue} is not valid. enter a valid ${error.fieldName}`;
    msg.style.color = "red";
  }
});

function overLay(message) {
  const overlayDiv = document.getElementById("overlay");
  overlayDiv.style.display = "block";
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = message;
}

setTimeout(() => {
  throw new Error("this is an error");
}, 5000);

setTimeout(() => {
  Promise.reject(new Error("crashed"));
}, 10000);
