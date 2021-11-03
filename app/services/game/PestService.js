import { sample } from "lodash";
import { NumberUtil } from "../../util/NumberUtil";
import {
  HIGHER_LOWER_INIT_PHRASE,
  HIGHER_LOWER_CORRECT_CONTINUE,
  HIGHER_LOWER_WRONG_LOSE,
  HIGHER_LOWER_WTF_PHRASE,
  HIGHER_LOWER_SKIP,
  HIGHER_LOWER_WRONG_END,
} from "../../answers/game/HigherLower";

class PestService {
  numberUtil = new NumberUtil();

  players = []; // { player, cards } 
  playerScores = []; // // { player, score }
  playerMoves = []; // { player, card }
  playerMove;
  nextPlayer;

  rounds = []; // { round: 0, card: any }
  currentRound = 0;

  constructor(players) {
    // todo generate boek kaarten in plak van randoms
    this.players.forEach((player) => {
        const cards = [];
        for(var i = 0; i < 5, i++) { // todo geef ieder 5 kaart - var input
            const card = this.numberUtil.generateRandom(1, 13); 
            this.cards.push(card);
        }
        this.players.push({ player, cards});
    });
    this.rounds.push({round: this.currentRound++, card: this.numberUtil.generateRandom(1, 13)})
    this.nextPlayer = players[0];
  }

  init() {
        return `start kaartje is ${this.rounds[currentRound].card}. Beurt ${nextPlayer}`;
        // todo stuur visible only bericht met kaarts 
  }

  play(playerInput, init) {
    if (init) {
      return this.init();
    }

    // Prepare current turn
    this.setCurrentPlayerTag(this.nextPlayerTag);
    console.log("set current player to ", this.nextPlayerTag);
    do {
      if (this.players.length - 1 > this.nextPlayerIndex) {
        this.nextPlayerIndex++;
      } else {
        this.nextPlayerIndex = 0;
      }
    } while (this.playerLostFlag.get(this.players[this.nextPlayerIndex]));

    console.log("set next player to ", this.players[this.nextPlayerIndex]);
    this.setNextPlayerTag(this.players[this.nextPlayerIndex]);
    this.playerFirstTurn.set(this.getCurrentPlayerTag, false);

    // Game
    let maggiePick;
    do {
      maggiePick = this.numberUtil.generateRandom(1, 100);
    } while (maggiePick === this.lastPick);

    let response;
    console.log(
      "Maggie picked ",
      maggiePick,
      "for ",
      this.getCurrentPlayerTag(),
      ".",
      this.getCurrentPlayerTag(),
      "said ",
      playerInput,
      "."
    );

    if (this.playerWon(playerInput, maggiePick)) {
      console.log(this.getCurrentPlayerTag(), "wins");
      let currentScore = this.scores.get(this.getCurrentPlayerTag());
      let newScore = currentScore + 1;
      this.scores.set(this.getCurrentPlayerTag(), newScore);
      this.lastPick = maggiePick;
      response = this.respond(sample(HIGHER_LOWER_CORRECT_CONTINUE));
    } else if (this.playerLost(playerInput, maggiePick)) {
      console.log(this.getCurrentPlayerTag(), "loses");
      this.playerLostFlag.set(this.getCurrentPlayerTag(), true);
      this.lastPick = maggiePick;
      if (this.gameHasEnded()) {
        response = this.respond(sample(HIGHER_LOWER_WRONG_END));
        this.players.forEach((player) => {
          response += player + ": " + this.scores.get(player) + " punt. ";
        });
      } else {
        response = this.respond(sample(HIGHER_LOWER_WRONG_LOSE));
      }
    } else if (this.playerSkip(playerInput, maggiePick)) {
      response = this.respond(sample(HIGHER_LOWER_SKIP));
    } else {
      response = this.respond(sample(HIGHER_LOWER_WTF_PHRASE));
    }

    return response;
  }

  respond(response) {
    let score = this.scores.get(this.getCurrentPlayerTag());
    let higherLower = {
      "%number%": this.lastPick,
      "%score%": score,
      "%currentPlayerTag%": this.getCurrentPlayerTag(),
      "%nextPlayerTag%": this.getNextPlayerTag(),
    };
    return response.replace(/%\w+%/g, function (all) {
      return higherLower[all] || all;
    });
  }

  playerWon(playerInput, maggiePick) {
    return (
      (this.playerSaidHigher(playerInput) &&
        !this.playerSaidLower(playerInput) &&
        maggiePick > this.lastPick) ||
      (this.playerSaidLower(playerInput) &&
        !this.playerSaidHigher(playerInput) &&
        maggiePick < this.lastPick)
    );
  }

  playerLost(playerInput, maggiePick) {
    return (
      (this.playerSaidHigher(playerInput) &&
        !this.playerSaidLower(playerInput) &&
        maggiePick < this.lastPick) ||
      (this.playerSaidLower(playerInput) &&
        !this.playerSaidHigher(playerInput) &&
        maggiePick > this.lastPick)
    );
  }

  playerSaidHigher(playerInput) {
    return playerInput.includes("hoger") || playerInput.includes("higher");
  }

  playerSaidLower(playerInput) {
    return playerInput.includes("lager") || playerInput.includes("lower");
  }

  playerSkip(playerInput) {
    return playerInput.includes("skip");
  }

  getPlayer1Tag() {
    return this.player1Tag;
  }

  setNextPlayerTag(nextPlayerTag) {
    this.nextPlayerTag = nextPlayerTag;
  }

  setCurrentPlayerTag(currentPlayerTag) {
    this.currentPlayerTag = currentPlayerTag;
  }

  getNextPlayerTag() {
    return this.nextPlayerTag;
  }

  getCurrentPlayerTag() {
    return this.currentPlayerTag;
  }

  gameHasEnded() {
    let playerStillPlaying = false;
    this.players.forEach((player) => {
      if (!this.playerLostFlag.get(player)) {
        return (playerStillPlaying = true);
      }
    });

    return !playerStillPlaying;
  }
}

export { PestService };
