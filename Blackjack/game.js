import Card from "../modules/Card.js";
import Player from "../modules/Player.js";
import { random, randomPop } from "../modules/Random.js";

//PART Globals

let testBtn = document.getElementById("testBtn");

let defaultStackValues = [];
for (let h = 0; h < Card.houses.length; h++) {
    for (let v = 1; v <= 13; v++) {
        if (v == 11) {
            defaultStackValues.push(
                new Card(Card.houses[h], 10, 'j')
            );
            continue;
        } else if (v == 12) {
            defaultStackValues.push(
                new Card(Card.houses[h], 10, 'q')
            );
            continue;
        } else if (v == 13) {
            defaultStackValues.push(
                new Card(Card.houses[h], 10, 'k')
            );
            continue;
        }

        defaultStackValues.push(
            new Card(Card.houses[h], v)
        );
    }
}

let cardDeck = []; //Should only be populated with Card objects

let player;
let dealer;

//PART Fases

function start() {
    if (cardDeck.length < defaultStackValues.length) {
        cardDeck = generateDeck(3);
        alert("We are using a new card deck")
    }

    player = new Player();
    dealer = new Player();

    game()

}

function game() {
    // Setup game interface
    player.getCards(cardDeck, 2);
    dealer.getCards(cardDeck, 2);

    let playerChoice = true;
    while (playerChoice) {
        let message =
            `You:\n${drawCard(player.cards)} (Total: ${player.sumCardValues()})
Dealer:\n${drawCard([dealer.cards[0]])}  - hidden
Do you want a new card?`
        playerChoice = confirm(message);
        if (playerChoice) { player.getCards(cardDeck, 1) }

        if (player.sumCardValues() > 21) {
            break;
        }
    }

    alert(
        `You:\n${drawCard(player.cards)} (Total: ${player.sumCardValues()})
Dealer:\n${drawCard(dealer.cards)} (Total: ${dealer.sumCardValues()})`
    );

    while (dealer.sumCardValues() < 17) {
        dealer.getCards(cardDeck, 1);
        alert(
            `You:\n${drawCard(player.cards)} (Total: ${player.sumCardValues()})
Dealer:\n${drawCard(dealer.cards)} (Total: ${dealer.sumCardValues()})`
        );
    }

    if (player.sumCardValues() > 21) {
        loose()
    } else if (player.sumCardValues() == 21 || dealer.sumCardValues() > 21) {
        win();
    } else if (player.sumCardValues() == dealer.sumCardValues()) {
        tie();
    } else {
        player.sumCardValues() > dealer.sumCardValues() ? win() : loose();
    }

}



function win() {
    let message = "You won with the cards:\n";
    player.cards.forEach(card => {
        message += `    - ${card.house} ${card.symbol}\n`;
    });
    message += `for a total of ${player.sumCardValues()}\n`;
    message += "Against the dealer with the cards:\n"
    dealer.cards.forEach(card => {
        message += `    - ${card.house} ${card.symbol}\n`;
    });
    message += `for a total of ${dealer.sumCardValues()}\n`;
    alert(message);
    continueGame();

}

function loose() {
    let message = "You lost with the cards:\n";
    player.cards.forEach(card => {
        message += `    - ${card.house} ${card.symbol}\n`;
    });
    message += `for a total of ${player.sumCardValues()}\n`;
    message += "Against the dealer with the cards:\n"
    dealer.cards.forEach(card => {
        message += `    - ${card.house} ${card.symbol}\n`;
    });
    message += `for a total of ${dealer.sumCardValues()}\n`;
    alert(message);
    continueGame();
}

function tie() {
    let message = "It's a tie!\nYou:\n";
    player.cards.forEach(card => {
        message += `    - ${card.house} ${card.symbol}\n`;
    });
    message += `for a total of ${player.sumCardValues()}\n`;
    message += "Against the dealer with the cards:\n"
    dealer.cards.forEach(card => {
        message += `    - ${card.house} ${card.symbol}\n`;
    });
    message += `for a total of ${dealer.sumCardValues()}\n`;
    alert(message);
    continueGame();
}

function continueGame() {
    confirm("Do you want to continue?") ? start() : () => { };
}

//PART Functions

function generateDeck(amount = 1) {
    let stack = [];

    for (let i = 0; i < amount; i++) {
        let choices = [...defaultStackValues];
        while (choices.length != 0) {
            stack.push(randomPop(choices));
        }
    }

    return stack;
}

function drawCard(cards) {
    let message = ""
    cards.forEach((card) => {
        message += `  - ${card.house} ${card.symbol}\n`;
    })

    return message
}

testBtn.onclick = () => {
    start()
}
