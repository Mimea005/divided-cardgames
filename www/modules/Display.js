function drawCard(card) {
    return /* html */ `
        <div class="card">
            <div class="card-row">
                <p class="card-symbol">${card.suit.symbol} ${card.symbol}</p>
                <p class="card-symbol">${card.suit.symbol} ${card.symbol}</p>
            </div>
            <div class="card-row card-middle">
            <h2 class="card-symbol">${card.suit.symbol} ${card.symbol}</h2>
            </div>
            <div class="card-row">
                <p class="card-symbol">${card.suit.symbol} ${card.symbol}</p>
                <p class="card-symbol">${card.suit.symbol} ${card.symbol}</p>
            </div>
        </div>
    `;
}
function drawCardBack() {
    return /* html */ `
        <div class="card card-back"></div>
    `;
}
function drawCards(cards, visible) {
    let result = "";
    if (!visible) {
        for (let card of cards) {
            result += drawCard(card);
        }
    }
    else {
        if (visible.length < cards.length) {
            for (let i = 0; i < (cards.length - visible.length); i++) {
                visible.push(1);
            }
        }
        for (let i in cards) {
            visible[i] ? result += drawCard(cards[i]) : result += drawCardBack();
        }
    }
    return result;
}
export { drawCard, drawCardBack, drawCards };
//# sourceMappingURL=Display.js.map