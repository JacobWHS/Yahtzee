var scoreboard = [["Ones",0],["Twos",0],["Threes",0],["Fours",0],["Fives",0],["Sixes",0],["Upper Section Bonus",0],["Three Of a Kind",0],["Four Of a Kind",0],["Full House",0],["Small Straight",0],["Large Straight",0],["Chance",0],["Yahtzee",0]];
var rounds = 2; // should be 14 when done testing

/* Class definition for DiceCup */
class DiceCup{
    constructor(name){
        this.name = name;
        this.hand = [0, 0, 0, 0, 0];
        this.hold = [];
    }
    
    /* toggle hold state based on index, so die 1 is at index 0 */
    toggleHold(index){
        let position = this.hold.indexOf(index);
        if (position != -1){
            this.hold.splice(position);
        }
        else{
            this.hold.push(index);
        }
    }
    
    /* roll held dice 
     * @param: none;
     * @return: none;
     */
    roll(){
        let d = 0;
        for (let die = 0; die < 5; die++){
            if (!this.isHeld(die)){
                d = Math.floor(Math.random() * 6) + 1;
                this.hand[die] = d; // this
            }
        }
        console.log(this.hand.toString());
    }
    
    /* check if die is being held 
     * @param: index;
     * @return: none;
     */
    isHeld(index){
        return this.hold.includes(index);
    }

    /* determine dice to reroll with user input 
     * @param: none;
     * @return: none;
     */
    reroll(){
    }
    
    /* clear all holds 
     * @param: none;
     * @return: none;
     */
    function reset() {  // To Do
    }

    /* store hand in scoreboard
     * @param: none;
     * @return: none;
     */
    function storeHand() {  // To Do
    }
    
} // End of Class Definition

/* Runs the game */
function main(){
    const jacob = new DiceCup("jacob"); // Proper syntax = const if we always point to the same object
    // If multiplayer, need to define a collection for the objects; leave off for now 
    for (let round = 1; round <= rounds; round++){ 
        playRound(round);
    }

    function playRound(round) {  // Note: defining function inside Main to provide access to objects
    alert("Round " + round + " of " + rounds + ": \n");
    jacob.reset();
    jacob.roll();
    jacob.reroll();
    jacob.reroll();
    jacob.storeHand();   
    }
    
}


/**  rollDice
 * Rolls one die, stores value
 * @param: array of indices
 * @return: none
 */

// function rollDice(indices){
//     let d = 0;
//     for (let die = 0; die < indices.length; die++){
//         d = Math.floor(Math.random() * 6) + 1;
//         hand[indices[die]] = d; // this
//     }
// }

// function selRerolls(roll){
//     indices = [];
//     let rerolls = prompt("Reroll "+ roll + " of 2: Which dice? (<dice1>, <dice2>");
//     let temp = rerolls.split(",");
//     for (let die = 0; die < temp.length; die++){
//         indices.push(parseInt(temp[die]) - 1);
//     }
//     console.log("rerolls " + indices.toString());
//     return indices;
// }

