class Card {
    constructor(suit, value, symbol = value) {
        this.suit = Card.suits.filter(elem => elem.name == suit)[0],
            this.value = value;
        this.symbol = symbol;
    }
}
Card.suits = [
    { name: "heart", symbol: "\u2665" },
    { name: "diamond", symbol: "\u2666" },
    { name: "spade", symbol: "\u2660" },
    { name: "club", symbol: "\u2663" }
];
export { Card };
//# sourceMappingURL=Card.js.map