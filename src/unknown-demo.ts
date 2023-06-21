import axios from "axios";


/////
//// TYPESCRIPT UNKNOWN
///


const CARDS_API_URL = "https://deckofcardsapi.com/api/deck/new/draw/";

// our main function, where we need to use data from the API
async function main() {
    console.log("Hello, user!");

    const randomCard = await getRandomCard();
    console.log("Here is a random card for you: ", randomCard);
}

main();

















// ⚠️ BAD CODE: ⚠️

async function getRandomCard() {
    const result = await axios.get(CARDS_API_URL);

    // ^ is the same as same as:
    // const result = await axios.get<any>(CARDS_API_URL);

    // implicit any? YECK!


    // This trainwreck is perfectly legal:
    const bad = result.data.some_field_i_made_up_that_absolutely_does_not_exist;


    const card = result.data.cards[0];
    return `${card.value} of ${card.suit}`;
}























//////////////////////////////////////////////////////////////////

// BETTER:


interface DrawCardResult {
    cards: Card[],
}

interface Card {
    value: number,
    suit: string,
}

async function getRandomCardBetter(): Promise<string> {

    // axios.get() is a generic function

    // we tell axios that our result is of type 'unknown'
    const result = await axios.get<unknown>(CARDS_API_URL);



    // so the following would be an error, because TS isn't sure what we can do
    // with something of type 'unknown':
    // const card = result.data.cards[0];

    // this being an error is a good thing!


    // solution: we are forced to 'cast' the variable with the 'as' keyword

    const data = result.data as DrawCardResult;
    /* we are telling the compiler
            "hey, I have more information - I know what I'm doing. "
    */


    const { value, suit } = data.cards[0];

    return `${value} of ${suit}`;
}













//////////////////////////////////////////////////////////////////


// Control flow with unknown

async function schrodinger() {
    const schrodingersVar: unknown = Math.random() > 0.5
        ? "alive" : 21;

    // console.log(schrodingersVar * 2); // error

    let stateOfCat: string = "";

    if (typeof schrodingersVar === "string") {
        stateOfCat = schrodingersVar;
    }

    if (typeof schrodingersVar === "number") {
        console.log("we can do math!", schrodingersVar * 2);
        stateOfCat = ("dead :(");
    }

    console.log("The cat is", stateOfCat.toUpperCase());
}

// schrodinger();