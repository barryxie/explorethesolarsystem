
const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let twoCardChecked = false;
let cardCount = 0;
let yourCount = document.querySelector("#score");
let scoreCount = 0;
let bestScore = null;
const startWrapper = document.querySelector("#startwrapper");
const restart = document.querySelector("#restart");
let postScore = document.querySelector('#bestscore');
bestScore = JSON.parse(localStorage.getItem("bestScore"));
postScore.innerText = bestScore;


const startBtn = document.querySelector("#startbtn");
startBtn.addEventListener("click", function(){
 
  startWrapper.classList.add("hidestartwrapper");
})


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(twoCardChecked) return
  if(event.target.classList.contains("cardchecked")) return;
  // you can use event.target to see which element was clicked
  scoreCount ++
  yourCount.innerHTML = scoreCount;
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  if(!card1 || !card2){
    currentCard.classList.add("cardchecked");
    card1 = card1 || currentCard;
    card2 = currentCard === card1? null : currentCard;
    
  }

  if(card1 && card2){
    twoCardChecked = true;
    let card1Color = card1.className;
    let card2Color = card2.className;;
    if(card1Color === card2Color){
      cardCount +=2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      twoCardChecked = false;
    }else{
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("cardchecked");
        card2.classList.remove("cardchecked");
        card1 = null;
        card2 = null;
        twoCardChecked = false;
      }, 1000);
    }
  }
  if(cardCount === COLORS.length){
      if(!bestScore){
        bestScore = scoreCount;
        postScore.innerText = bestScore
      }

      if(scoreCount<= bestScore){
          bestScore = scoreCount;
          console.log(bestScore);
          
          postScore.innerText = bestScore

          
          
          
      }
      localStorage.setItem("bestScore", bestScore.toString());
  }
}

restart.addEventListener('click', function(){
  card1 = null;
  card2 = null;
  twoCardChecked = false;
  cardCount = 0;
  scoreCount = 0;
  yourCount.innerHTML = scoreCount;
  const allDiv = document.querySelectorAll("#game div");
  for(let i=0; i< allDiv.length; i++){
    allDiv[i].style.backgroundColor = "";
    allDiv[i].classList.remove("cardchecked");
    allDiv[i].addEventListener('click', handleCardClick);
  }
  startWrapper.classList.remove("hidestartwrapper");
})

// when the DOM loads
createDivsForColors(shuffledColors);
