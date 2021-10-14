import { Card } from "modules/Card";
import { Player } from "modules/Player";
import * as Random from "modules/Random";
import * as Display from "modules/Display";

let dealerAreaDiv = document.getElementById("dealerAreaDiv");
let playerAreaDiv = document.getElementById("playerAreaDiv");
let buttonsDiv = document.getElementById("buttonsDiv");

let defaultDeck = Array<Card>();
// Generate default a default deck (Too lazy to write out manualy)
for (let s = 0; s < Card.suits.length; s++) {
    for (let v = 1; v <= 10; v++) {
        defaultDeck.push(new Card(Card.suits[s].name, v));
    }
    defaultDeck.push(new Card(Card.suits[s].name, 10, 'J'))
    defaultDeck.push(new Card(Card.suits[s].name, 10, 'Q'))
    defaultDeck.push(new Card(Card.suits[s].name, 10, 'K'))
}

let cardDeck = Array<Card>();

let player: Player;
let dealer: Player;

function continueGame(): void {
    buttonsDiv!.innerHTML = /* html */`
        <button>Start new game</button>
    `;
    buttonsDiv.children[0].addEventListener("click", start);
}

function start(): void {
    if (cardDeck.length < defaultDeck.length) {
        cardDeck = generateDeck(3);
        alert("we are using a new deck of cards");
    }

    player = new Player();
    dealer = new Player();

    player.drawCards(cardDeck, 2);
    dealer.drawCards(cardDeck, 2);

    playerAreaDiv.innerHTML = Display.drawCards(player.deck);
    dealerAreaDiv.innerHTML = Display.drawCards(dealer.deck);

    showPlayerBtn();
}

function showPlayerBtn(): void {
    buttonsDiv.innerHTML = /* html */`
        <button>Hit</button>
        <button>Hold</button>
    `;

    buttonsDiv.children[0].addEventListener("click", hit);
    buttonsDiv.children[1].addEventListener("click", hold);
}

function hit(): void {
    player.drawCards(cardDeck, 1);
    playerAreaDiv.innerHTML = Display.drawCards(player.deck);
    checkPlayerCards();
}

function checkPlayerCards(): void {
    let score = player.getCardSum();
    if (score >= 21) {
        hold();
    }
}

function hold() {
    buttonsDiv.innerHTML = "";
    playDealer();
}

function playDealer(): void {
    buttonsDiv.innerHTML = /* html */`
        <button>Next</button>
    `;
    buttonsDiv.children[0].addEventListener("click", dealerNext);

    dealerAreaDiv!.innerHTML = Display.drawCards(dealer.deck);
}

function dealerNext(): void {
    if (dealer.getCardSum() < 17) {
        dealer.drawCards(cardDeck, 1);
        dealerAreaDiv!.innerHTML = Display.drawCards(dealer.deck);
    } else {
        evaluategame();
    }
}

function evaluategame(): void {
    buttonsDiv.innerHTML = "";

    let playerScore = player.getCardSum();
    let dealerScore = dealer.getCardSum();

    if (playerScore == dealerScore || (playerScore > 21 && dealerScore > 21)) {
        tie();
    } else if (playerScore > 21) {
        loose();
    } else if (dealerScore > 21) {
        win();
    } else {
        playerScore > dealerScore ? win() : loose();
    }
}

function tie() {
    buttonsDiv.innerHTML = "";

    let message = "It's a tie!\n You:\n";
    player.deck.forEach(card => {
        message += `    -${card.suit.symbol} ${card.symbol}\n`;
    })
    message += `for a total of ${player.getCardSum()}.\n`;

    message += `Against the dealer with the cards:\n`;
    dealer.deck.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}`;
    })
    message += `for a total of ${dealer.getCardSum()}.\n`;

    alert(message);

    continueGame();
}

function loose() {
    buttonsDiv.innerHTML = "";

    let message = "You lost with the cards:\n";
    player.deck.forEach(card => {
        message += `    -${card.suit.symbol} ${card.symbol}\n`;
    })
    message += `for a total of ${player.getCardSum()}.\n`;

    message += `Against the dealer with the cards:\n`;
    dealer.deck.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}`;
    })
    message += `for a total of ${dealer.getCardSum()}.\n`;

    alert(message);

    continueGame();
}

function win() {
    buttonsDiv.innerHTML = "";

    let message = "You won with the cards:\n";
    player.deck.forEach(card => {
        message += `    -${card.suit.symbol} ${card.symbol}\n`;
    })
    message += `for a total of ${player.getCardSum()}.\n`;

    message += `Against the dealer with the cards:\n`;
    dealer.deck.forEach(card => {
        message += `    - ${card.suit.symbol} ${card.symbol}`;
    })
    message += `for a total of ${dealer.getCardSum()}.\n`;

    alert(message);

    continueGame();
}

function generateDeck(amount = 1): Array<Card> {
    let result = Array<Card>();

    for (let i = 0; i < amount; i++) {
        let choices = [...defaultDeck];
        while (choices.length != 0) {
            result.push(Random.randomPop(choices));
        }
    }

    return result;
}
