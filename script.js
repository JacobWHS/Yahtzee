const categories = ["ones","twos","threes","fours","fives","sixes","upper section bonus","three of a kind","four of a kind","full house","small straight","large straight","chance","yahtzee"];

/* Runs the game */
function main(){
    let rounds = 1; // should be 14 when done testing
    const cup1 = new DiceCup("cup1"); // Proper syntax = const if we always point to the same object
    // const cup2 = new DiceCup("cup2"); 
    const jacob = new ScoreBoard("jacob", cup1);
    // const bram = new ScoreBoard("bram", cup2);
    // If multiplayer, need to define a collection for the objects; leave off for now 
    for (let round = 1; round <= rounds; round++){ 
        playRound(round,cup1,jacob);
        // playRound(round,cup2,bram);
    }

    function playRound(round, cup, board) {  // Note: defining function inside Main to provide access to objects
        console.log("Round " + round + " of " + rounds + " \n");
        console.log(board.getName() + " roll 1: "+ cup.roll());
        console.log(board.getName() + " reroll 1: "+ cup.getHolds());
        console.log(board.getName() + " reroll 2: "+ cup.getHolds());
        cup.resetHolds();
        console.log("Your hand to score: "+ cup.getHand().toString());  
        let category = prompt("Which category? ones, etc");
        while (!categories.includes(category)){
            category = prompt("Invalid category, please try again.");
        }
        while (!jacob.scoreHand(category)){
            category = prompt("This category has already been scored, try another.");
        }
    }
    
}

/* Class definition for DiceCup */
class DiceCup{
    constructor(name){
        this.name = name;
        this.hand = [0, 0, 0, 0, 0];
        this.hold = [];
    }
    /* get Hand 
     * @param: none;
     * @return: hand array;
     */
    getHand(){
        return this.hand;
    }
    
    /* roll all dice 
     * @param: none;
     * @return: none;
     */
    roll(){
        for (let die = 0; die < 5; die++){
            this.hand[die] = Math.floor(Math.random() * 6) + 1;
        }
        return this.hand.toString();
    }

     /* roll held dice 
     * @param: none;
     * @return: none;
     */
    reroll(){
        for (let die = 0; die < 5; die++){
            if (!this.isHeld(die)){
                this.hand[die] = Math.floor(Math.random() * 6) + 1;
            }
        }
        return this.hand.toString();
    }
    
    /* check if die is being held 
     * @param: index;
     * @return: none;
     */
    isHeld(index){
        let held = this.hold.includes(index+1);
        return held;
    }

    /* determine dice to reroll with user input 
     * @param: none;
     * @return: none;
     */
    getHolds(){
        this.resetHolds();
        let which = prompt("Hold which? 1,2,4 or 0");
        let holds = which.split(',').map(Number);
        if (holds[0]!= 0 || holds.length>0) {
            this.hold = holds;
            console.log("Holding: "+this.hold.toString());
        }
        else console.log("No holds.")
        return this.reroll();
    }
    
    /* clear all holds 
     * @param: none;
     * @return: none;
     */
    resetHolds() { 
        for (let holds = 0; holds < this.hold.length; holds++){
           this.hold.splice(holds,1); 
        }
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

} // End of Class Definition

/* Class Definition for ScoreBoard */
class ScoreBoard{
        constructor(name, cup){
        this.name = name;
        this.cup = cup;
        this.getHand = this.getHand.bind(this);
        this.board = [];
     }

    getName(){
        return this.name;
    }

    getHand(){
        return this.cup.getHand();
    }

    scoreHand(category){
        let hand = this.getHand();
        let score = 0;
        if (this.board.hasCategory(category)){
            return false;
        }
        else if (categories.indexOf(category)<6) {
            let counting = categories.indexOf(category)+1;
            for (let die = 0; die < 6; die++){
                if (hand[die] == counting) score += counting;
            }
        }
        let newScore = [category, score];
        this.board.push(newScore);
        let latest = this.board.length-1;
        console.log("Scored: "+ this.board[latest].toString());
        return true;
    }
    hasCategory(category){
        for (let i = 0; i < this.board.length; i++){ // i = index
            if (board[i].includes(category)) return true;
        } 
        return false;
    }
} // End of Class Definition
