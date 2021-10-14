type Suit = {
    name: string,
    symbol: string
}

interface Card {
    suit: Suit,
    value: number,
    symbol: string | number
}

class Card {
    constructor(suit: string, value: number, symbol?: any) {
        this.suit = Card.suits.filter(elem => elem.name == suit)[0],
            this.value = value;
        this.symbol = symbol;
    }

    static suits = [
        { name: "heart", symbol: "\u2665" },
        { name: "diamond", symbol: "\u2666" },
        { name: "spade", symbol: "\u2660" },
        { name: "club", symbol: "\u2663" }
    ]
}

export { Card }