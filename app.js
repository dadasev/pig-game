var scores, roundScore, activePlayer, gamePlaying, prevRoll;
var diceDOM = document.querySelector(".dice");
var dice2DOM = document.querySelector(".dice2");
var winScore = 100;
document.querySelector("#target").value = winScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying){
        // Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //Display the result
        diceDOM.style.display = "block";
        dice2DOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";
        dice2DOM.src = "dice-" + dice2 + ".png";
        //Update the round score IF the rolled number is not a 1
        if (dice !== 1 && dice2 !== 1){
            // if(prevRoll === 6 && dice === 6){
            //     scores[activePlayer] = 0;
            //     document.getElementById("score-" + activePlayer).textContent = "0";
            //     nextPlayer();
            // }
            // prevRoll = dice;
            //add score
            roundScore += dice + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //next player:
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying){
        //Add Current score to the Global score
        scores[activePlayer] += roundScore;
        //update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        //check if the user won the game
        if(!winScore){
            winScore = 100;
            document.querySelector("#target").value = winScore;
            nextPlayer();
        } else if(scores[activePlayer] >= winScore ){
            document.querySelector("#name-" + [activePlayer]).textContent = "Winner!";
            diceDOM.style.display = "none";
            dice2DOM.style.display = "none";
            document.querySelector(".player-" + [activePlayer] + "-panel").classList.add("winner");
            document.querySelector(".player-" + [activePlayer] + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevRoll = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    diceDOM.style.display = "none";
    dice2DOM.style.display = "none";
};

document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector("#target").addEventListener("input", function(){
    winScore = Number(this.value);
});

document.querySelector("#target").addEventListener("newValue", function(){
    winScore = Number(this.value);
});

function init(){
    scores = [0, 0];
    roundScore = 0; 
    activePlayer = 0; // 0 = P1, 1 = P2. 
    prevRoll = 0;
    diceDOM.style.display = "none";
    dice2DOM.style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    gamePlaying = true;
}
























/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/