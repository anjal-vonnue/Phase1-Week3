// prediction was nothing but it was wrong, the type is actually object, identified that it was bug and it is not fixed because of the web compatibility
console.log(`the type of null is: ${typeof(null)}`);

//prediction was correct: object
console.log(`the type of [] is: ${typeof []}`)

//prediction was correct: number
console.log(`the type of NaN is: ${typeof NaN}`)

//prediction was correct: function
console.log(typeof function(){});


//prediction was correct: true
console.log(0 == false);

//prediction was correct true
console.log("" == false);

//prediction: true was wrong, it is actually false, it is true because loosly equal
console.log(null == undefined);

//prediction was correct: false
console.log(null === undefined);

//prediction: true was wrong, IEEE 754 spec says that NaNs are never equal
console.log(NaN === NaN);

//prediction was correct: 12
console.log(1+'2');

//prediction was correct: 2
console.log('3'-1);

//prediction was correct: 2
console.log(true + true);

//prediction was wrong: object, the js converts empty arrays to string
console.log([]+[]);

//prediction was correct
console.log([]+{});




// 8 primitives

let numberValue = 1;
console.log(typeof(numberValue));

let bigNumber = 10n;
console.log(typeof(bigNumber));

let stringValue = "anjal";
console.log(typeof(stringValue));

let booleanValue = true;
console.log(typeof(booleanValue));

let nullPrimitive = null;
console.log(typeof(null));

let undefinedValue = undefined;
console.log(typeof(undefinedValue));

let symbolValue = Symbol("id");
console.log(typeof(symbolValue));

function greet(name){
    console.log(`hello ${name}`);
}
console.log(typeof(greet))

let nameObject ={
    name: "anjal",
    age: 22
}
console.log(typeof(nameObject));
