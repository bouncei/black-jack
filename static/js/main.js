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
const winSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aww.mp3')




document.querySelector('#blackjack-hit-button').addEventListener('click', buttonHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', buttonDeal);


function buttonHit() {
    let card = randToRpsInt();
    // console.log(card);
    showCard(card, YOU);
    updateSCore(card, YOU)
    showScore(YOU)
    
}


function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;  // Fomatting in js
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();

    }

    

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

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector('#your-blackjack-result'). style.color = "#ffffff"
    document.querySelector('#dealer-blackjack-result'). style.color = "#ffffff"

}






function updateSCore(card, activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];

    }
    console.log(activePlayer['score'])
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";

    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];


    }
}




function dealerLogic() {
    let card = randToRpsInt();
    showCard(card, DEALER);
    updateSCore(card, DEALER);
    showScore(DEALER);
    showResult()

}


// computes winner and returns who won

function computeWinner() {
    let winner;
    
    if (YOU[score] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            alert('You Won!');
            winner = YOU;
    
        }else if (YOU['score'] < DEALER['score']){
            alert('Lost Bruh!');
            winner = DEALER;
    
        }else if (YOU['score'] === DEALER['score']){
            alert('Drew!');
    
        }

    // condition: when user busts but dealer doesn't
    }else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        alert('You Lost');
        winner = DEALER;            

    // condition: When Both user and dealer busts
    }else if (YOU['score'] > 21 && DEALER['score'] > 21){
        alert('Drew!');
    }

    console.log('winner is', winner)
    return winner
    

    
}

// Display the winner on the Frontend
function showResult(winner){

    let messaage, messaageColor;
    if (winner === YOU){
        messaage = 'You Won!';
        messaageColor = 'green';
        winSound.play();

    }

    else if (winner === DEALER){
        messaage = 'You Lost!';
        messaageColor = 'red';
        lossSound.play();

    }
    else{
        messaage = 'You Drew!';
        messaageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = messaage;
    document.querySelector('#blackjack-result').style.color = messaageColor;


}