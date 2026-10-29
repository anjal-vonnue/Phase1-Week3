console.log("=== hoisting === block scoping ===");

// ==== first pair
console.log(myName);
var myName = "anjal";

console.log(myNameUsingLet); // leads to reference error
let myNameUsingLet = "anjal";

console.log(myName);
console.log(myNameUsingLet);

// ==== second pair
if(1){
    var varInsideIf = "var inside if";
    let letInsideIf = "let inside if";
    const constInsideIf = "const inside if";
}

console.log(varInsideIf);
console.log(letInsideIf); // leads to reference error
console.log(constInsideIf); // leads to reference error

// ==== third pair
var a = 10;
var a = 20;
console.log(a);

let b = 10;
let b = 20;
console.log(b); //syntax error

// ==== Fourth Pair

var companyNameUsingVar = "Vonnue (using var)";
let companyNameUsingLet = "Vonnue (using let)";
console.log(companyNameUsingVar);
console.log(companyNameUsingLet);




console.log("=== temporal deadzone ===");

console.log(deadzoneVariable); // leads to reference error, because it is accessing the variable before definition

let deadzoneVariable = "tdz";

console.log(deadzoneVariableUsingVar); // logged undefined

var deadzoneVariableUsingVar = "tdz using var";


console.log("=== three level nested functions ===");

let outerValue = "hello from the global scope";

function greet(){
    let innerValue = "hello from the greet function"
    function greetInner(){
        let greetInnerValue = "hello from greetInner";
        function greetInnerMost(){
            console.log(outerValue);
            console.log(innerValue);
            console.log(greetInnerValue);
            
        }
        greetInnerMost();
    }
    greetInner();
}

greet();


console.log("=== var in loop error and it fix ===");

for(var i=0; i<5; i++){
    setTimeout(()=>{
        console.log(`Var Loop Number: ${i}`);
        
    },1000)
}

for(let j=0; j<5; j++){
    setTimeout(()=>{
        console.log(`Let Loop Number: ${j}`);
    },1000)
}

