/* Runs the game */
function main(){
    let rounds = 2; // should be 14 when done testing
    const cup1 = new DiceCup("cup1"); // Proper syntax = const if we always point to the same object
    const jacob = new ScoreNBoard("jacob");
    // If multiplayer, need to define a collection for the objects; leave off for now 
    for (let round = 1; round <= rounds; round++){ 
        playRound(round);
    }

    function playRound(round) {  // Note: defining function inside Main to provide access to objects
    alert("Round " + round + " of " + rounds + ": \n");
    cup1.reset();
    cup1.roll();
    cup1.reroll();
    cup1.reroll();
    // cup1.storeHand();   
    }
    
}

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
     * @return: boolean;
     */
    isHeld(index){
        return this.hold.includes(index);
    }

    /* determine dice to reroll with user input 
     * @param: none;
     * @return: none;
     */
    reroll(){
        this.reset();
        let toReRoll = prompt("Which dice shall be held? (Ex: 1,3)");
        let preHold = toReRoll.split(",");
        for (let die = 0; die < preHold.length; die++){
            this.hold.push(preHold[die] - 1);
        }
        console.log(" - " + this.hold.toString());
        this.roll();
    }
    
    /* clear all holds 
     * @param: none;
     * @return: none;
     */
    reset() {  // To Do
        this.hold = [];
    }
    
} // End of Class Definition

/* Class Definition for ScoreBoard */
    class ClassB {
      constructor(classA) {
        this.classA = classA;
      }
    
      methodB() {
        // Bind methodA to the instance of ClassA
        const boundMethodA = this.classA.methodA.bind(this.classA);
        return boundMethodA();
      }
    }
    
    const instanceA = new ClassA();
    const instanceB = new ClassB(instanceA);
    console.log(instanceB.methodB()); // Output: Hello from ClassA


class ScoreBoard{
    constructor(name, cupName){
        this.catBoxes = ["Ones","Twos","Threes","Fours","Fives","Sixes","Upper Section Bonus","Three Of a Kind","Four Of a Kind","Full House","Small Straight","Large Straight","Chance","Yahtzee"];
        this.name = name;
        this.board = [];
    }

    /* store hand in scoreboard
     * @param: none;
     * @return: none;
     */
    storeHand(cat) {  // To Do
        let score = 0;
        let target = this.catBoxes.indexOf(cat);
        if (target < 6){
        // Add named values
            target++;
        }
    }
}