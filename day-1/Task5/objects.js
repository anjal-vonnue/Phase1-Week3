const employees = [
  { name: "Emily", dept: "ai engineer", salary: 75000, yearsExp: 5 },
  { name: "anjal", dept: "engineering", salary: 80000, yearsExp: 5 },
  { name: "Jane", dept: "design", salary: 60000, yearsExp: 2 },
  { name: "Alex", dept: "devOps", salary: 30000, yearsExp: 1 },
  { name: "Sarah", dept: "testing", salary: 30000, yearsExp: 2 },
  { name: "Joe", dept: "engineering", salary: 50000, yearsExp: 4 },
  { name: "Smith", dept: "engineering", salary: 90000, yearsExp: 3 },
];

const result = employees
  .filter((emp) => emp.dept == "engineering" && emp.salary > 70000)
  .map((emp) => (emp = { name: emp.name, salary: emp.salary }))
  .sort((a, b) => b.salary - a.salary);

console.log(result);

// destructuring nested object
const config = {
  server: {
    port: 8080,
  },
};

const {
  server: { port },
} = config;

console.log(port);

// spread operator
const profile = {
  name: "anjal",
  age: 22,
};

const address = {
  district: "kannur",
  state: "kerala",
};

const details = { ...profile, ...address };
console.log(Object.entries(details));
console.log(Object.keys(details));
console.log(Object.values(details));

// deepClone

function deepClone(obj) {
  return { ...obj };
}

const cloned = deepClone(profile);

console.log(cloned);
console.log(cloned === profile);
