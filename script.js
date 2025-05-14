var hand = [9, 0, 0, 0, 0];
var rounds = 2; // should be 14 when done testing
function main(){
    for (let round = 1; round <= rounds; round++){ 
        playRound(round)
    //     storeHand();
    //     roundReset();
    // }
    // calcScore();
    }
}

function playRound(round) {
    let indices = [0, 1, 2, 3, 4]; // first roll
    alert("Round " + round + " of " + rounds + ": \n");
    for (let roll = 1; roll <= 3; roll++){
        rollDice(indices);
        alert("Your hand is: " + hand.toString());
        if (roll < 3 ) indices = selRerolls(roll);
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
    let rerolls = prompt("Reroll "+ roll + " of 2: how many dice?");
    for (let roll = 1; roll <= rerolls; roll++){
        let which = prompt("Die " + roll + " of " + rerolls + ": Which die?");
        indices.push(which-1);
    }
    return indices;
}

function holdDice(){
    alert("holdDice()");
}