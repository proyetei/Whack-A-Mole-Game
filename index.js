/* JavaScript Logic
 * A function to create a random amount of time that the mole will peep for.
 * A function to choose the random hole from which the mole will peep.
 * A function to make the mole pop from the random hole using the two above functions.
 * A function to start the game.
 * A function to “prevent” cheating , once the mole is whacked it should hide again and to set the score.
*/
const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.hole'); //matches all the CSS selector hole
const scoreBoard = document.querySelector('.score'); //matches the CSS selector score
let lastHole; 
let timeUp = false;
let score = 0;

//Function to create a random amount of time that the mole will peep for
//Using math.random

function peepTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//A function to choose the random hole from which the mole will peep

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      console.log('duplicate hole');
      return randomHole(holes);
    } //if current hole matches last hole it will return a random hole
    lastHole = hole; //sets lasthole as the current hole everytime it passes
    return hole; 
}


function peep() {

    const time = peepTime(500, 1500); //peeps for a random time from 0.5 seconds to 1.5s
    const hole = randomHole(holes);
    //adds a up class
    hole.classList.add('up'); //classList manipulates and allows for styling the CSS classes of the hole element
    setTimeout(() => {
      hole.classList.remove('up'); //up means when the mole moves up
      if (!timeUp) peep();
    }, time); //removes the up class after a given amount of "time" which is to be declared later

}

//keeps track of whether the game started or not
//sets everything to 0 from the start
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 60000) //starts the game and runs it for 60s
}

/* This is where things get interesting!
 * the isTrusted is a JS property that returns true if the event that was executed was done by the user, 
 * false if it was through a script or dispatched via EventTarget.dispatchEvent() */

function whack(e) {
    if(!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  moles.forEach(mole => mole.addEventListener('click', whack));


