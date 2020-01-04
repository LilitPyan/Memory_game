const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
  // allow us only flip two card at the same time
  if (lockBoard) return;

  //add flip class to an existing class to rotate card
  this.classList.add('flip');

  //if hasFlippedCard variable is true we attribute firstCard to this /clicked element/
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  //selects the second card
  secondCard = this;

  // calls checkForMatch function
  checkForMatch();
}

//if firstCard data-framework matches secondCard data-framework we disabled cards, else they are closed after 1,5 seconds
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unFlipCards();
}

//if firstCard and secondCard are equal, we remove flipCard function from them
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

//if two opened card aren't equal they are closed after 1,5 second
function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

//reset our data
function resetBoard() {
  [ hasFlippedCard, lockBoard, firstCard, secondCard ] = [ false, false, null, null ];
}

//add flipCard function on each card
cards.forEach(card => card.addEventListener('click', flipCard));
