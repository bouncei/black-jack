let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins' : 0,
    'losses': 0,
    'draws': 0,
    'turnOver': false,
    'isStand': false,

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

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)

document.querySelector('#blackjack-deal-button').addEventListener('click', buttonDeal);


function buttonHit() {
    if (blackjackGame['isStand'] === false){

        let card = randToRpsInt();
        // console.log(card);
        showCard(card, YOU);
        updateSCore(card, YOU);
        showScore(YOU);
    }

    
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

    if (blackjackGame['turnOver'] === true ){

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector("#your-box").querySelectorAll('img');
        let dealerImagers = document.querySelector("#dealer-box").querySelectorAll('img');
        
    
        for(i=0; i < yourImages.length; i++){
            yourImages[i].remove()
        }
    
        for(i=0; i < dealerImagers.length; i++){
            dealerImagers[i].remove()
        }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector("#your-blackjack-result").textContent = 0;
        document.querySelector("#dealer-blackjack-result").textContent = 0;
    
        document.querySelector('#your-blackjack-result').style.color = "#ffffff";
        document.querySelector('#dealer-blackjack-result').style.color = "#ffffff";
    
        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = "#000000";

        blackjackGame['turnOver'] = false;
    }


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
    blackjackGame['isStand'] = true; 

    if (DEALER['score'] <= 15){
        let card = randToRpsInt();
        showCard(card, DEALER);
        updateSCore(card, DEALER);
        showScore(DEALER);

        if (DEALER['score'] > 15){
            blackjackGame['turnOver'] = true;
            let winner = computeWinner()
            showResult(winner)
    
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            document.querySelector('#draws').textContent = blackjackGame['draws'];
    
    
        }
    }else {
        console.log("You're a boss my gee!")
    }
    
    

    console.log(blackjackGame)

}


// computes winner and returns who won

function computeWinner() {
    let winner;
    
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            // console.log('You Won!');
            blackjackGame['wins']++;
            winner = YOU;
    
        }else if (YOU['score'] < DEALER['score']){
            // console.log('Lost Bruh!');
            blackjackGame['losses']++;

            winner = DEALER;
    
        }else if (YOU['score'] === DEALER['score']){
            // console.log('Drew!');
            blackjackGame['draws']++;

    
        }

    // condition: when user busts but dealer doesn't
    }else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        // console.log('You Lost');
        blackjackGame['losses']++;

        winner = DEALER;            

    // condition: When Both user and dealer busts
    }else if (YOU['score'] > 21 && DEALER['score'] > 21){
        // console.log('Drew!');
        blackjackGame['draws']++;

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