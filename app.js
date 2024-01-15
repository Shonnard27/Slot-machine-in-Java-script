

// Slot machine game





const prompt = require("prompt-sync")(); // package that allows user inputs

const ROWS = 3; // global variable represent the amount of rows
const COLS = 3; // gobal varable represent the amount of column 

const SYMBOLS_COUNT = { // the count of letter that appear in the slot machine.
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const Symbol_Values = { // Multiply the bet by the value displayed if user gets a line of one letter(example line of A multiply there bet by 5). 
    A: 5,
    B: 4,
    C: 3,
    D: 2
}



const deposit = () => {
    while(true) { // looping until user enters a valid number
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount); // allows user to enter decimal number value

    if (isNaN(numberDepositAmount)  || numberDepositAmount <= 0) { // checking if its a positive integer number, if not it will print invalid. 
        console.log("Invalid deposit amount, try again");
    } else {
        return numberDepositAmount; 
    }
    } 
};

const getNumberOfLines = () => {
    while(true) { // looping until user enters a valid number 
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberofLines = parseFloat(lines);
    
        if (isNaN(numberofLines)  || numberofLines <= 0 || numberofLines > 3)  { // checking if the user has given responce between 1 - 3
            console.log("Invalid number of lines, try again"); // pints if user inputs an invalid number
        } else {
            return numberofLines;
        }
        } 
};
// Taking the input of the users bet amount
const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter the bet per lines: ");
        const numberBet = parseFloat(bet);
    
        if (isNaN(numberBet)  ||    numberBet <= 0 || numberBet > balance / lines)  { // taking the user bet by the number of lines they bet. ( example if user has a balance of 20  and bets 3 lines, then the user can only add as maximum of 6 since 6 *3(lines) = 18 )
            console.log("Invalid bet, try again"); // is amount is over or invalid character
        } else {
            return numberBet;
        }
        } 
};

const spin = () => {  //Spinning slot machine 
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){ // loops through every possible entry in the SYMBOLS_COUNT
       for (let i = 0; i < count; i++) { // inserting a new element into the array 
            symbols.push(symbol);
   
       }
    }
    
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols]; // copy each avaivable symbol of reels into another array.
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math. random() * reelSymbols.length); // generate a random flooting number between 0 and 1, then it multiplies by the length of the symbol. 
            const selectedSymbol = reelSymbols[randomIndex]; // randomly selects an index in the array ([A,B,C])
            reels[i].push(selectedSymbol);  
            reelSymbols.splice(randomIndex, 1); // removing the index to not select it again.
        }
    }
    return reels;
};
const transpose = (reels) => {
    const rows = [];

    for ( let i = 0; i < ROWS; i++) { // accessing each element in 
        rows.push ([]);
            for (let j = 0; j < COLS; j++){
                rows[i].push(reels[j][i])
            }
    }
    return rows
};

const printRows = (rows) => { // printing out each row for the user
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol 
             if (i != row.length - 1) {
                rowString += " | "


            }

        }
        console.log(rowString)
    }


};

const getWinnings = (rows, bet, lines) => { // give user there winnings
    let winning = 0

    for (let row = 0; row < lines; row++) { //looking for 
        const symbols = rows [row]
        let allsame = true; // if  user has all rows the same

        for (const symbol of symbols) {
            if (symbol != symbols[0]) { // if all rows not the same then all same is false(user did not win)
                allsame = false;
                break; // stops the for loop after each row is not the same.
            }


        }

        if (allsame){
            winning += bet * Symbol_Values[symbols[0]] // if user wins user bet gets multiplies by symbol value.
        
        }

    }
return winning;

};


const game  = () => {
    let balance = deposit(); // "let" lets me change value of the variable
while (true) { // while loop that continouus game until user decides to stop playing
console.log("You have a balance of $" + balance); // displays users balance

const numberofLines = getNumberOfLines();
const bet = getBet(balance, numberofLines);
balance -= bet * numberofLines;
const reels = spin();
const rows = transpose (reels);
printRows(rows);
const winning = getWinnings(rows,  bet, numberofLines)
balance += winning; // adds the  earining from the previous bets to the balance
console.log("you won, $" + winning.toString()); // telling the user how much he won by betting
if (balance <= 0) {
    console.log("You ran out of money!"); // print if user has no more money to bet.
    break;
}
    const playAgain = prompt("do you want to play again (y/n)? ");
    if (playAgain != "y" ) break ; // if user says anyting that is not y then the while loop will stop,

}
};

game();