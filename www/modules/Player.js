import * as Random from "./Random.js";
class Player {
    constructor(cards = []) {
        this.deck = cards;
    }
    getCardSum() {
        let aces = Array();
        let result;
        result = this.deck.reduce((score, card) => {
            // Separate aces since they can have two values
            if (card.value == 1) {
                aces.push(card);
                return score;
            }
            return score += card.value;
        }, 0);
        aces.forEach((card) => {
            result + 11 < 21 ? result += 21 : result += 1;
        });
        return result;
    }
    drawCards(deck, amount = 1) {
        for (let i = 0; i < amount; i++) {
            this.deck.push(Random.randomPop(deck));
        }
    }
}
export { Player };
//# sourceMappingURL=Player.js.map