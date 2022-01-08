import Card from "./Card.js";

export function drawCard(card) {
    return /* html */`
        <div class="card">
            <div class="card-row card-top">
                <p class="card-symbol">${card.suit.symbol} ${card.symbol}</p>
                <p class="card-symbol">${card.suit.symbol} ${card.symbol}</p>
            </div>
            <div class="card-row card-middle">
                <h2 class="card-symbol">${card.suit.symbol} ${card.symbol}</h2>
            </div>
            <div class="card-row card-bottom">
                <p class="card-symbol">${card.suit.symbol} ${card.symbol}</p>
                <p class="card-symbol">${card.suit.symbol} ${card.symbol}</p>
            </div>
        </div>
    `;
}

export function drawBack() {
    return /* html */`
        <div class="card card-back"></div>
    `;
}

export function drawCards(cards, visible = []) {
    let cardDivs = "";
    if (visible.length > 0) {
        if (visible.length < cards.length) {
            let lengthDiff = cards.length - visible.length;
            for (let i = 0; i < lengthDiff; i++) {
                visible.push(1);
            }
        }

        for (let i = 0; i < cards.length; i++) {
            //If visible draw the card, else draw the back of the card
            visible[i] ? cardDivs += drawCard(cards[i]) : cardDivs += drawBack();
        }

        return cardDivs;
    }

    for (let card of cards) {
        cardDivs += drawCard(card);
    }
    return cardDivs;
}

export default { drawCard }