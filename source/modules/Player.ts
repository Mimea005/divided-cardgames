import * as Random from "./Random.js";
import { Card } from "./Card.js";

interface Player {
    deck: Array<Card>;
}
class Player {
    constructor(cards: Array<Card> = []) {
        this.deck = cards;
    }

    getCardSum(): number {
        let aces = Array<Card>();
        let result: number;

        result = this.deck.reduce((score: number, card: Card) => {
            // Separate aces since they can have two values
            if (card.value == 1) {
                aces.push(card);
                return score
            }
            return score += card.value;
        }, 0);

        aces.forEach((card) => {
            result + 11 < 21 ? result += 21 : result += 1;
        });

        return result;
    }

    drawCards(deck: Array<Card>, amount: number = 1): void {
        for (let i = 0; i < amount; i++) {
            this.deck.push(Random.randomPop(deck));
        }
    }
}

export { Player }