class Card {
    constructor(house, value, symbol = value) {
        this.house = house;
        this.value = value;
        this.symbol = symbol;
    }

    static houses = [
        'heart',
        'diamond',
        'spade',
        'tree'
    ]
}

export default Card