import type { Server } from "socket.io";
import {
  FLAGS,
  GAME_DURATION_MINS,
  INTRO_DURATION_MINS,
  INTRO_LETTER,
  POSTGAME_DURATION_MINS,
  POSTGAME_LETTER_LOSE,
  POSTGAME_LETTER_WIN,
} from "./config";
import Player from "./player";
import { getGameState, setGameState } from "./state";

const minToMs = (time: number) => time * 60 * 1000;
export default class Game {
  // TODO START TIME NOT DEPENDENT ON SERVER START TIME
  gameStartTime = Date.now() + minToMs(INTRO_DURATION_MINS);
  gameEndTime = this.gameStartTime + minToMs(GAME_DURATION_MINS);

  players: Player[] = [];

  constructor(public io: Server) {
    setInterval(() => this.loop(), 1000);

    io.on("connection", async (socket) => {
      console.log(`🔌 Connected ${socket.id}`);

      this.emitState();

      this.players.push(new Player(this, socket));
    });

    this.initState();

    console.log(`🤖 Initialized server`);
  }

  private async initState() {
    const s = await getGameState();
    if (!s)
      setGameState({
        stage: "intro",
        endTime: this.gameStartTime,
        content: INTRO_LETTER,
      });
  }

  public async emitState() {
    const s = await getGameState();

    this.io.emit("update", {
      ...s,
      time: Date.now(),
    });
  }

  private async loop() {
    const s = await getGameState();
    const n = Date.now();

    if (n > this.gameEndTime && s?.stage === "game") this.moveToPostGame();
    else if (n > this.gameStartTime && s?.stage === "intro") this.beginGame();
  }

  private async beginGame() {
    console.log(`🟨🟨🟨 Starting game 🟨🟨🟨`);
    await setGameState({
      stage: "game",
      endTime: this.gameEndTime,
      flagsFound: [],
      totalFlags: FLAGS.length,
    });
    this.emitState();
  }

  private async moveToPostGame() {
    const s = await getGameState();
    const won = s.flagsFound.length >= FLAGS.length;
    console.log(`🟨🟨🟨 GAME OVER 🟨🟨🟨 : PLAYERS ${won ? "WIN" : "LOSE"}`);

    const postgameEndTime = Date.now() + POSTGAME_DURATION_MINS * 60 * 1000;
    await setGameState({
      stage: "postgame",
      content: won ? POSTGAME_LETTER_WIN : POSTGAME_LETTER_LOSE,
      endTime: postgameEndTime,
      game_won: won,
    });
    this.emitState();
  }

  public onGameWon() {
    setTimeout(() => {
      this.moveToPostGame();
    }, 5000);
  }
}
