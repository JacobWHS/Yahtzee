const categories = ["ones","twos","threes","fours","fives","sixes","upper section bonus","three of a kind","four of a kind","full house","small straight","large straight","chance","yahtzee"];

/* Runs the game */
function main(){
    let rounds = 14; // should be 14 when done testing
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
        console.log(" - " + board.getName() + " roll 1: "+ cup.roll());
        console.log(" - " + board.getName() + " reroll 1: "+ cup.getHolds());
        console.log(" - " + board.getName() + " reroll 2: "+ cup.getHolds());
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
     * @return: string;
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
     * @return: boolean;
     */
    isHeld(index){
        let held = this.hold.includes(index+1);
        return held;
    }

    /* determine dice to reroll with user input 
     * @param: none;
     * @return: string;
     */
    getHolds(){
        this.resetHolds();
        let which = prompt("Hold which? (Format: 1,2,4 or 0 to reroll all)");
        let holds = which.split(',').map(Number);
        if (holds[0]!= 0 || holds.length>0) {
            this.hold = holds;
            // console.log("Holding: "+this.hold.toString());
        }
        // else console.log("No holds.")
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
        this.scored = [];
    }

    getName(){
        return this.name;
    }

    getHand(){
        return this.cup.getHand();
    }
    // Score Validity Methods
    valSmStraight(){
        let hand = this.getHand().sort();
        hand = hand.toString();
        switch (hand){
            case hand.includes("1,2,3,4"):
            case hand.includes("2,3,4,5"):
            case hand.includes("3,4,5,6"):
                return true;
        }
        return false;
    }
    valLgStraight(){
        let hand = this.getHand().sort();
        hand = hand.toString();
        if (hand.includes("1,2,3,4,5")) return true;
        else if (hand.includes("2,3,4,5,6")) return true;
        return false;
    }
    valFullHouse(){
        let hand = this.getHand().sort();
        let fullHouse = [0, 0];
        let die1 = hand[0];
        let die2 = hand[4];
        //hand = hand.toString(); // should be "1,1,2,2,2" etc
        for (let i = 0; i < 5; i++){
            if (hand[i] == die1) fullHouse[0]++;
            else if (hand[i] == die2) fullHouse[1]++;
        }
        // let test = fullHouse.sort();
        if (fullHouse.sort() == "2,3") return true;
        return false;
    }
    valOfAKind(count){
        let hand = this.getHand().sort();
        let matchCnt = 0;
        let die = hand[0];
        switch (count){
            case 5: // YAHTZEE!!! or 5 of a kind (same thing)
                for (let i = 0; i < 5; i++){
                    if (hand[i] == die) matchCnt++;
                }
                if (matchCnt == 5) return true;
                return false;
            default:
                for (let c = 0; c < 5; c++){
                    matchCnt = 0;
                    die = hand[c];
                    for (let i = 0; i < 5; i++){
                        if (hand[i] == die) matchCnt++;
                    }
                }
                case 3:
                    if (matchCnt == 3) return true;
                    return false;
                case 4:
                    if (matchCnt == 4) return true;
                    return false;
        }
    }
    // Scoring
    scoreHand(category){
        let hand = this.getHand();
        let score = 0;
        if (this.hasCategory(category)){
            return false;
        }
        else if (categories.indexOf(category) < 6) {
            let counting = categories.indexOf(category)+1;
            for (let die = 0; die < 5; die++){
                if (hand[die] == counting) score += counting;
            }
        }
        else {
            console.log(" - Selected category " + category);
            if (this.scored.includes(category)){
                score = -1;
                console.log("A " + category + " has already been scored.");
            }
            if (score != -1){
                switch (category){
                    case "full house":
                        if (this.valFullHouse()) {
                            score = 25;
                            this.scored.push(category);
                        }
                        else {
                            score = 0;
                            console.log("Not a " + category + ".");
                        }
                        break;
                    case "small straight":
                        if (this.valSmStraight()) {
                            score = 30;
                            this.scored.push(category);
                        }
                        else {
                            score = 0;
                            console.log("Not a " + category + ".");
                        }
                        break;
                    case "large straight":
                        if (this.valLgStraight()) {
                            score = 40;
                            this.scored.push(category);
                        }
                        else {
                            score = 0;
                            console.log("Not a " + category + ".");
                        }
                        break;
                    case "yahtzee":
                        score = 50;
                        break;
                    case "three of a kind":
                        let ofAK = 3;
                    case "four of a kind":
                        ofAK = 4;
                        if (this.valOfAKind(ofAK)) {
                            score = this.addUpDice(hand);
                            this.scored.push(category);
                        }
                        else {
                            score = 0;
                            console.log("Not a " + category + ".");
                        }
                    case "chance":
                        score = this.addUpDice(hand);
                        this.scored.push(category);
                }
            }
        }
        let newScore = [category, score];
        console.log("Scoring: " + category + " Score: " + score);
        this.board.push(newScore);
        let latest = this.board.length-1;
        console.log("Scored: " + this.board[latest].toString());
        return true;
    }
    hasCategory(category){
        for (let i = 0; i < this.board.length; i++){ // i = index
            if (this.board[i].includes(category)) return true;
        } 
        return false;
    }
    addUpDice(hand){
        let score = 0;
        console.log("addUpDice():");
        for (let die = 0; die < 5; die++){
            console.log(" - addUpDice() for loop");
            console.log(" - add Up Dice " + die + " - " + hand[die]);
            score += hand[die];
        }
        return score;
    }
} // End of Class Definition