function gradeToLetterIf(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }

  return "invaid mark";
}

function gradeToLetterSwitch(score) {
  switch (score) {
    case score >= 90 && score <= 100:
      return "A";
      break;
    case score >= 80 && score < 90:
      return "B";
      break;
    case score >= 70 && score < 80:
      return "C";
      break;
    case score >= 60 && score < 70:
      return "D";
      break;
    case score < 60:
      return "F";
      break;
    default:
      return "invalid mark";
  }
}

function gradeToLetterTernary(score) {
  let result =
    score >= 90
      ? "A"
      : score >= 80
        ? "B"
        : score >= 70
          ? "C"
          : score >= 60
            ? "D"
            : "F";

  return result;
}

let scoreObj = {};
for (let i = 90; i <= 100; i++) {
  scoreObj[i] = "A";
}
for (let i = 80; i < 90; i++) {
  scoreObj[i] = "B";
}
for (let i = 70; i < 80; i++) {
  scoreObj[i] = "C";
}
for (let i = 60; i < 70; i++) {
  scoreObj[i] = "D";
}
for (let i = 0; i < 60; i++) {
  scoreObj[i] = "F";
}

function gradeToLetterLook(score) {
  return scoreObj[score];
}

console.time("if");
for (let i = 0; i < 1_000_000; i++) {
  gradeToLetterIf(i);
}
console.timeEnd("if");

console.time("switch");
for (let i = 0; i < 1_000_000; i++) {
  gradeToLetterSwitch(i);
}
console.timeEnd("switch");

console.time("ternary");
for (let i = 0; i < 1_000_000; i++) {
  gradeToLetterTernary(i);
}
console.timeEnd("ternary");

console.time("look");
for (let i = 0; i < 1_000_000; i++) {
  gradeToLetterLook(i);
}
console.timeEnd("look");

////////////////////////////////////////////////////////////////////////////////////
let userAge = new Map([
  ["anjal", 22],
  ["john", 30],
  ["bale", 51],
  ["ramos", 37],
  ["neymar", 35],
]);
function processQueueWhile(item) {
  console.log("=====inside while");
  let keys = item.keys();
  while (item.size != 0) {
    let key = keys.next();
    console.log(key.value);

    item.delete(key.value);
  }
}
processQueueWhile(userAge);

userAge = new Map([
  ["anjal", 22],
  ["john", 30],
  ["bale", 51],
  ["ramos", 37],
  ["neymar", 35],
]);
console.log(userAge);
function processQueueDoWhile(item) {
  console.log("=====inside do while");
  let keys = item.keys();
  do {
    let key = keys.next();
    console.log(key.value);
    item.delete(key.value);
  } while (item.size != 0);
}
processQueueDoWhile(userAge);
userAge = new Map([
  ["anjal", 22],
  ["john", 30],
  ["bale", 51],
  ["ramos", 37],
  ["neymar", 35],
]);

function processQueueFor(item) {
  for ([key, value] of item) {
    console.log(key, value);
  }
}
processQueueFor(userAge);

////////////////////////////////////////////////////////////////////////////////////
function validateUser(user) {
  return (
    user && user.email && user.email.includes("@") && user.role === "admin"
  );
}
console.log(
  validateUser({ name: "anjal", email: "anjal@vonnue.com", role: "admin" }),
);

console.log(
  validateUser({ name: "anjal", email: "anjal.vonnue.com", role: "user" }),
);

////////////////////////////////////////////////////////////////////////////////////
function deepNested(user) {
  if (user) {
    if (user.email) {
      if (user.email.includes("@")) {
        if (user.role === "admin") {
          return "success";
        }
        return "not an admin";
      }
      return "invalid email";
    }
    return "no email";
  }
  return "no user";
}

function notNested(user) {
  if (!user) return "no user";
  if (!user.email) return "no email";
  if (!user.email.includes("@")) return "invalid email";
  if (!user.role === "admin") return "not an admin";
  return "success";
}
