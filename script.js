const categories = ["ones","twos","threes","fours","fives","sixes","three of a kind","four of a kind","full house","small straight","large straight","chance","yahtzee"];

/* Runs the game */
function main(){
    let rounds = 13;
    let pcount = parseInt(prompt("How many people will be playing?"));
    let players = [];
    for (let p = 0; p < pcount; p++){
        players.push(new ScoreBoard(prompt("What's player" + (p + 1) + "'s name?")));
    }
    // If multiplayer, need to define a collection for the objects; leave off for now 
    for (let round = 1; round <= rounds; round++){ 
        for (let p = 0; p < pcount; p++){
            playRound(round, players[p]);
        }
    }

    function playRound(round, board) {  // Note: defining function inside Main to provide access to objects
        let cup = board.cup;
        console.log("Round " + round + " of " + rounds + " \n");
        console.log(" - " + board.getName() + " roll 1: " + cup.roll());
        console.log(" - " + board.getName() + " reroll 1: " + cup.getHolds());
        console.log(" - " + board.getName() + " reroll 2: " + cup.getHolds());
        cup.resetHolds();
        console.log("Your hand to score: " + cup.getHand().toString());  
        let category = prompt("Which category? ones, etc");
        while (!categories.includes(category)){
            category = prompt("Invalid category, please try again.");
        }
        // swap below to player soon
        while (!board.scoreHand(category) && category != "yahtzee"){
            category = prompt("This category has already been scored, try another.");
        }
    let scores = [];
    for (let p = 0; p < pcount; p++){ // sorting attempt ????
        scores.push(board.getScore()); // this doesn't work, tried ScoreBoard(players[p]) but it cannot be called w/o a new... stumped here.
    }
    console.log("SORTED SCORES " + scores.sort(function(a, b){return b-a})); // this is supposedly greatest to least sorted? unsure...
    // maybe get position 0 and their name, then declare who won idk
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
        return [5,5,5,5,5]; // UNCOMMENT ONLY FOR TESTING PURPOSES, USED TO DEBUG THREE OF A KIND AND FOUR OF A KIND (5,5,5,5,5 WAS USED FOR YAHTZEE)
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
        let held = this.hold.includes(index + 1);
        return held;
    }

    /* determine dice to reroll with user input 
     * @param: none;
     * @return: none;
     */
    getHolds(){
        this.resetHolds();
        let which = prompt(this.name.toUpperCase() + ", Hold which? (Format: 1,2,4. 0 to reroll all, n to reroll none.)");
        let holds = which.split(',').map(Number);
        if (which == "n") holds = [1,2,3,4,5];
        if (holds[0] != 0 || holds.length > 0) {
            this.hold = holds;
            // console.log("Holding: " + this.hold.toString());
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
           this.hold.splice(holds, 1); 
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
    constructor(name){
        this.name = name;
        this.cup = new DiceCup(name);
        this.getHand = this.getHand.bind(this);
        this.board = [];
        this.yahtzees = 0;
        this.getScore = 0;
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
        if (hand.includes("1,2,3,4")) return true;
        else if (hand.includes("2,3,4,5")) return true;
        else if (hand.includes("3,4,5,6")) return true;
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
        let test = fullHouse.sort();
        if (test == "2,3") return true;
        return false;
        // if (hand[0] == hand[1] == hand[2]) {let hasThree = true;}
        // else if (hand[0] == hand[1]) {let hasTwo = true;}
        // if (hand[3] == hand[4]) {let hasTwo = true;}
        // else if (hand[2] == hand[3] == hand[4]) {let hasThree = true;}
        // if (hasThree && hasTwo) return true;
        // return false;
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
                if (count == 3){
                    if (matchCnt <= 3) return true;
                    return false;
                }
                if (count == 4){
                    if (matchCnt <= 4) return true;
                    return false;
                }
                break;
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
            let counting = categories.indexOf(category) + 1;
            for (let die = 0; die < 5; die++){
                if (hand[die] == counting) {
                    
                    score += counting;
                }
            }
        }
        else {
            switch (category){
                case "full house":
                    if (this.valFullHouse()) score = 25;
                    else {
                        score = 0;
                        console.log("Not a " + category + ".");
                    }
                    break;
                case "small straight":
                    if (this.valSmStraight()) {
                        score = 30;
                    }
                    else {
                        score = 0;
                        console.log("Not a " + category + ".");
                    }
                    break;
                case "large straight":
                    if (this.valLgStraight()) score = 40;
                    else {
                        score = 0;
                        console.log("Not a " + category + ".");
                    }
                    break;
                case "yahtzee":
                    if (this.valOfAKind(5)) {
                        score = 50;
                        if (this.yahtzees > 0) {
                            score += 100; 
                            console.log("%c+100 BONUS!", "color: blue; font-size:15px;");
                        }
                        this.yahtzees++;
                    }
                    else {
                        score = 0;
                        console.log("Not a " + category + ".");
                    }
                    break;
                case "four of a kind": 
                    if (this.valOfAKind(4)) score = this.addUpDice(hand);
                    else {
                        score = 0;
                        console.log("Not a " + category + ".");
                    }
                    break;
                case "three of a kind": 
                    if (this.valOfAKind(3)) score = this.addUpDice(hand);
                    else {
                        score = 0;
                        console.log("Not a " + category + ".");
                    }
                    break;
                case "chance":
                    score = this.addUpDice(hand);
            }
        }
        let newScore = [category, score];
        this.getScore += score
        this.board.push(newScore);
        let latest = this.board.length - 1;
        console.log("Scored: " + this.board[latest].toString());
        console.log(this.name.toUpperCase() + " " + this.getScore + "pts.");
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
        for (let die = 0; die < 5; die++){
            // console.log(" - addUpDice() for loop");
            // console.log(" - add Up Dice " + die + " - " + hand[die]);
            score += hand[die];
        }
        return score;
    }
} // End of Class Definition