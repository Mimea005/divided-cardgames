import { randomPop } from "../modules/Random.js";

class Player {
    constructor(cards = []) {
        this.cards = cards;
    }

    sumCardValues() {
        let aces = []
        let score = this.cards.reduce((result, card) => {
            if (card.value == 1) {
                aces.push(card)
                return result
            }
            return result += card.value;
        }, 0)
        aces.forEach((card) => {
            score + 11 <= 21 ? score += 11 : score += 1;
        })
        return score;
    }

    getCards(cards, amount) {
        for (let i = 1; i <= amount; i++) {
            this.cards.push(randomPop(cards))
        }
    }
}

export default Player