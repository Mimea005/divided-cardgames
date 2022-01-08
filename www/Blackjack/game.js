import Card from "../modules/Card.js";
import Player from "../modules/Player.js";
import * as Random from "../modules/Random.js";
import * as Display from "../modules/Display.js";

//PART Globals
//DOM Elements
let dealerAreaDiv = document.getElementById("dealer");
let playerAreaDiv = document.getElementById("player");
let buttonsDiv = document.getElementById("buttonsDiv");

let testBtn = document.getElementById("testBtn");
testBtn.onclick = start;

let defaultStackValues = [];
//Generer generel kortstokk (Er for lat for å manuelt skrive alle kortene)
for (let h = 0; h < Card.suit.length; h++) {
    for (let v = 1; v <= 13; v++) {
        if (v == 11) {
            defaultStackValues.push(
                new Card(Card.suit[h].name, 10, 'J')
            );
            continue;
        } else if (v == 12) {
            defaultStackValues.push(
                new Card(Card.suit[h].name, 10, 'Q')
            );
            continue;
        } else if (v == 13) {
            defaultStackValues.push(
                new Card(Card.suit[h].name, 10, 'K')
            );
            continue;
        }

        defaultStackValues.push(
            new Card(Card.suit[h].name, v)
        );
    }
}

let cardDeck = []; //Should only be populated with Card objects

let player;
let dealer;
let turn;

//PART Fases

function start() {
    console.log(cardDeck.length);
    if (cardDeck.length < defaultStackValues.length) {
        cardDeck = generateDeck(3);
        alert("We are using a new deck of cards");
    }

    player = new Player();
    dealer = new Player();

    player.getCards(cardDeck, 2);
    dealer.getCards(cardDeck, 2);

    playerAreaDiv.innerHTML = Display.drawCards(player.cards);
    dealerAreaDiv.innerHTML = Display.drawCards(dealer.cards, [0])

    showPlayerBtn();

}

function showPlayerBtn() {
    buttonsDiv.innerHTML = /*html*/`
        <button>Hit</button>
        <button>Hold</button>
    `;

    buttonsDiv.children[0].addEventListener("click", hit);
    buttonsDiv.children[1].addEventListener("click", hold);
}

function hit() {
    player.getCards(cardDeck, 1);
    playerAreaDiv.innerHTML = Display.drawCards(player.cards);
    checkPlayerCards();
}

function checkPlayerCards() {
    let score = player.sumCardValues();
    if (score == 21 || score > 21) {
        hold();
    }
}

function hold() {
    buttonsDiv.innerHTML = "";
    playDealer();
}

function playDealer() {

    buttonsDiv.innerHTML = /* html */`
        <button>Next</button>
    `;
    buttonsDiv.children[0].addEventListener("click", dealerNext)

    dealerAreaDiv.innerHTML = Display.drawCards(dealer.cards);
}

function dealerNext() {
    if (dealer.sumCardValues() < 17) {
        dealer.getCards(cardDeck, 1);
        dealerAreaDiv.innerHTML = Display.drawCards(dealer.cards);
    } else if (dealer.sumCardValues() >= 17) {
        evaluateGame()

    }
}

function evaluateGame() {
    buttonsDiv.innerHTML = "";
    let playerScore = player.sumCardValues();
    let dealerScore = dealer.sumCardValues();
    if (playerScore == dealerScore || (playerScore > 21 && dealerScore > 21)) {
        tie()
    } else if (playerScore > 21) {
        loose()
    } else if (dealerScore > 21) {
        win()
    } else {
        playerScore > dealerScore ? win() : loose();
    }
}

function win() {
    buttonsDiv.innerHTML = "";

    let message = "You won with the cards:\n";
    player.cards.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}\n`;
    });
    message += `for a total of ${player.sumCardValues()}\n`;
    message += "Against the dealer with the cards:\n"
    dealer.cards.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}\n`;
    });
    message += `for a total of ${dealer.sumCardValues()}\n`;
    alert(message);

    continueGame();

}

function loose() {
    buttonsDiv.innerHTML = "";

    let message = "You lost with the cards:\n";
    player.cards.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}\n`;
    });
    message += `for a total of ${player.sumCardValues()}\n`;
    message += "Against the dealer with the cards:\n"
    dealer.cards.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}\n`;
    });
    message += `for a total of ${dealer.sumCardValues()}\n`;
    alert(message);

    continueGame();
}

function tie() {
    buttonsDiv.innerHTML = "";

    let message = "It's a tie!\nYou:\n";
    player.cards.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}\n`;
    });
    message += `for a total of ${player.sumCardValues()}\n`;
    message += "Against the dealer with the cards:\n"
    dealer.cards.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}\n`;
    });
    message += `for a total of ${dealer.sumCardValues()}\n`;
    alert(message);

    continueGame();
}

function continueGame() {
    buttonsDiv.innerHTML = /*html*/`
        <button>Start new game</button>
    `;
    buttonsDiv.children[0].addEventListener("click", start);
}

//PART Functions

function generateDeck(amount = 1) {
    let stack = [];

    for (let i = 0; i < amount; i++) {
        let choices = [...defaultStackValues];
        while (choices.length != 0) {
            stack.push(Random.randomPop(choices));
        }
    }

    return stack;
}

function drawCard(cards) {
    let message = ""
    cards.forEach((card) => {
        message += `  - ${card.suit.symbol} ${card.symbol}\n`;
    })

    return message
}
