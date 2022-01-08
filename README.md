# Prosject Structure

## Section 1 - Core modules

A module or resource should only be included if it is used by multiple games.

| Name |   Type |
| :--- | -----: |
| Card | Module |

## Section 2 - Games

A game resides inn the subdomain "/game/*name*" and contains:
- A *game.html* file
- A *game.css* file
- A script folder and/or a *game.js* file

### Blackjack

Start:
- Create a new deck of cards if there is there isn't enough cards
- Show the player cards and one card from the dealer
- Let the player pick new cards until done or over 21
- Dealer picks cards until the score is over 17
- Compare scores and anounce result
- Give option to start agains