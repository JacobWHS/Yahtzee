var hand = [9, 0, 0, 0, 0];
var indices = [1, 2, 3, 4, 5];

function main(){
    for (let rounds = 1; rounds <= 3; rounds++){
        indices = [1, 2, 3, 4, 5];
        for (let roll = 1; roll <= 3; roll++){
            rollDice();
            selRerolls();
        }
    //     storeHand();
    //     roundReset();
    // }
    // calcScore();
}
}

/**  rollDice
 * Rolls one die, stores value
 * @param: array of indices
 * @return: none
 */

function rollDice(){
    let d = 0;
    for (let die = 1; die <= indices.length; die++){
        d = Math.floor(Math.random() * 6) + 1;
        hand[indices[die - 1]] = d;
    }
    alert(" - curr " + hand.toString());
}

function selRerolls(){
    alert(" - prev " + hand.toString());
    indices = [];
    let reroll = prompt("how many dice");
    for (let roll = 1; roll <= reroll; roll++){
        let which = prompt("which die?");
        indices.push(which);
    }
    alert(hand.toString());
}

function holdDice(){
    alert("holdDice()");
}