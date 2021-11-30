let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},

};

function randToRpsInt(){
    let randomCard = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomCard]
}


const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a')



document.querySelector('#blackjack-hit-button').addEventListener('click', buttonHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', buttonDeal);


function buttonHit() {
    let card = randToRpsInt();
    // console.log(card);
    showCard(card, YOU);
    updateSCore(card, YOU)
    
}


function showCard(card, activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();

}

function buttonDeal() {
    let yourImages = document.querySelector("#your-box").querySelectorAll('img');
    let dealerImagers = document.querySelector("#dealer-box").querySelectorAll('img');
    
    for(i=0; i < yourImages.length; i++){
        yourImages[i].remove()
    }

    for(i=0; i < dealerImagers; i++){
        dealerImagers[i].remove()
    }
}






function updateSCore(card, activePlayer){
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function showScore(activePlayer){
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
}