/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previous;

init();

document.querySelector(".btn-roll").addEventListener("click",function(){

 if (gamePlaying){
     //1.Random number
     var dice1 = Math.floor(Math.random() * 6 + 1);
     var dice2 = Math.floor(Math.random() * 6 + 1);

     //Display the result
     document.getElementById("dice-1").style.display = "block";
     document.getElementById("dice-2").style.display = "block";
     document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
     document.getElementById("dice-1").src = "dice-" + dice2 + ".png";

     //3.Update the round score if rolled dice not equals to 1
     if (dice1 !== 1 && dice2!=1) {
        //  previous = dice ;
         roundScore += dice1 + dice2;
         document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //  }else if( dice === 6){
    //      if (previous!=6){
    //          previous = 6;
    //          roundScore += dice;
    //          document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //      }else{
    //          previous = 0;
    //          scores[activePlayer] = 0;
    //          document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //          nextPlayer();
    //      }
     }else {
         nextPlayer();
     }
 }
        
    });

document.querySelector(".btn-hold").addEventListener("click", function () {

    if (gamePlaying){
        previous = 0;
        scores[activePlayer] += roundScore;

        var input = document.querySelector(".finalScore").value;
        var finalScore;
        //undefined, 0 , null "" Are COERSED TO FALSE

        if(input){
            finalScore = input;
        }
        else{
            finalScore = 100;
        }



        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= finalScore) {

            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});



document.querySelector(".btn-new").addEventListener("click", init);


function nextPlayer(){

    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    //document.querySelector(".player-0-panel".classList.remove("active"));
        //document.querySelector(".player-0-panel".classList.add("active"));

}

function init(){
    scores = [0, 0];
    roundScore = 0;
    gamePlaying =true;
    activePlayer = 0;
    previous = 0;
    
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

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


}
