let head = document.getElementsByTagName("head")[0];
head.innerHTML += /*html*/`
    <link rel="stylesheet" type="text/css" href="../css/card.css">
`;
class Card {
    constructor(house, value, symbol = value) {
        this.suit = Card.suit.find(element => element.name == house);
        this.value = value;
        this.symbol = symbol;
    }

    static suit = [
        { name: "heart", symbol: "\u2665" },
        { name: "diamond", symbol: "\u2666" },
        { name: "spade", symbol: "\u2660" },
        { name: "club", symbol: "\u2663" }
    ]

}

export default Card