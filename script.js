var scoreboard = [["Ones",0],["Twos",0],["Threes",0],["Fours",0],["Fives",0],["Sixes",0],["Upper Section Bonus",0],["Three Of a Kind",0],["Four Of a Kind",0],["Full House",0],["Small Straight",0],["Large Straight",0],["Chance",0],["Yahtzee",0]];
var rounds = 2; // should be 14 when done testing
function main(){
    for (let round = 1; round <= rounds; round++){ 
        playRound(round);
    //     storeHand();
    //     roundReset();
    // }
    // calcScore();
    }
}

class DiceCup{
    constructor(name){
        this.name = name;
        this.hand = [0, 0, 0, 0, 0];
        this.hold = [];
    }
    toggleHold(index){
        let position = this.hold.indexOf(index);
        if (position != -1){
            this.hold.splice(position);
        }
        else{
            this.hold.push(index);
        }
    }
    roll(){
        let d = 0;
        for (let die = 0; die < 5; die++){
            if (!this.isHeld(die)){
                d = Math.floor(Math.random() * 6) + 1;
                this.hand[die] = d; // this
            }

        }
    }
    isHeld(index){
        return this.hold.includes(index);
    }
}

function playRound(round) {
    alert("Round " + round + " of " + rounds + ": \n");
    const DiceCup round = new DiceCup(round);
    for (let roll = 1; roll <= 3; roll++){
        rollDice(indices);
        alert("Your hand is: " + hand.toString());
        if (roll < 3 ) indices = selRerolls(roll); // you do not reroll the third roll
    }
    alert(" Where will you score:  " + hand.toString());
}

/**  rollDice
 * Rolls one die, stores value
 * @param: array of indices
 * @return: none
 */

function rollDice(indices){
    let d = 0;
    for (let die = 0; die < indices.length; die++){
        d = Math.floor(Math.random() * 6) + 1;
        hand[indices[die]] = d; // this
    }
}

function selRerolls(roll){

    indices = [];
    let rerolls = prompt("Reroll "+ roll + " of 2: Which dice? (<dice1>, <dice2>");
    let temp = rerolls.split(",");
    for (let die = 0; die < temp.length; die++){
        indices.push(parseInt(temp[die]) - 1);
    }
    console.log("rerolls " + indices.toString());
    return indices;
}

function holdDice(){
    alert("holdDice()");
}