

/////
//// TYPESCRIPT NEVER
///


// (return type?)
function neverEndingFun() {
    while (true) {
        42;
    }
}

function main() {
    neverEndingFun();
    console.log("well this is awkward"); // <-- will this ever execute?
    // the compiler seems to think it might.
}














function definitelyNeverEndingFun(): never {
    while (true) {
        42;
    }
}


function main2() {
    definitelyNeverEndingFun();
    console.log("well this is awkward"); // <-- grayed-out because it ain't gonna happen
}













const alwaysThrowsNeverReturns = () => {
    throw new Error(":{");
};












// A short TS interlude...


// What's a type union?


type StateOfMind = "flustered" | "panicking" | "content" | "new york";


const myStateOfMind: StateOfMind = "content";


// const impossibleStateOfMind: StateOfMind = "dazed and confused"












// How about an intersection?

interface Named {
    name: string;
}

interface Aged {
    yearsOld: number;
}

const myPetWorm: Named & Aged = {
    name: "fred",
    yearsOld: 0.2,
    // favoriteFood: "dirt"
};

// console.log(`${myPetWorm.name} is ${myPetWorm.yearsOld} years old.`);









// and now back to never...




type enigma = "flustered" & "confused";

// what is the effective type of enigma?















// copied from above:
// type StateOfMind = "flustered" | "panicking" | "content" | "new york";

function handleStateOfMind1(stateOfMind: StateOfMind) {
    if (stateOfMind === "flustered") {
        console.log("take a deep breath");
    }
    else if (stateOfMind === "panicking") {
        console.log("don't");
    }
    else if (stateOfMind === "content") {
        console.log("carry on");
    }
    else if (stateOfMind === "new york") {
        // what if we forget about new york?
        console.log("don't forget about NY");
    }
    else {
        const exhaustiveCheck: never = stateOfMind;
    }
}










// Other pattern with the same logic:

function handleStateOfMind2(stateOfMind: StateOfMind) {
    switch (stateOfMind) {
        case "flustered":
            console.log("take a deep breath");
            break;
        case "panicking":
            console.log("don't");
            break;
        case "content":
            console.log("carry on");
            break;
        // if we forget about new york...
        case "new york":
            console.log("don't forget about NY");
            break;

        default:
            const exhaustiveCheck: never = stateOfMind;
    }
}