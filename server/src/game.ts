import type { Server } from "socket.io";
import {
  FLAGINFO,
  FLAGS,
  GAME_DURATION_MINS,
  INTRO_DURATION_MINS,
  INTRO_LETTER,
  POSTGAME_DURATION_MINS,
  POSTGAME_LETTER_LOSE,
  POSTGAME_LETTER_WIN,
} from "./config";
import Player from "./player";
import { getFlagFinderNames, getGameState, setGameState } from "./state";

// 2022-07-25T17:52:00
const START_TIME = process.env.EVENT_START_TIME;

const minToMs = (time: number) => time * 60 * 1000;
export default class Game {
  eventStartTime = START_TIME
    ? new Date(START_TIME).getTime()
    : Date.now() + 4000;
  gameStartTime = this.eventStartTime + minToMs(INTRO_DURATION_MINS);
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
    console.log(
      `🕓 Starting ${new Date(this.eventStartTime)} (${
        this.eventStartTime - Date.now()
      } ms)`
    );
  }

  private async initState() {
    const s = await getGameState();
    if (!s)
      setGameState({
        stage: null,
        eventStarted: false,
      });
  }

  public async emitState() {
    const s = await getGameState();

    const finderNames = await getFlagFinderNames();
    this.io.emit("update", {
      ...s,
      // Include additional info with flags
      flagsFound: s.flagsFound?.map((flag) => ({
        ...FLAGINFO[flag],
        finder: finderNames[flag] || "",
      })),
      time: Date.now(),
    });
  }

  private async loop() {
    const s = await getGameState();
    const n = Date.now();

    if (n > this.gameEndTime && s?.stage === "game") this.moveToPostGame();
    else if (n > this.gameStartTime && s?.stage === "intro") this.beginGame();
    else if (n > this.eventStartTime && !s?.stage) this.beginEvent();
  }

  private async beginEvent() {
    console.log(`⏰⚡️ MIDNIGHT`);
    await setGameState({
      stage: "intro",
      eventStarted: true,
      endTime: this.gameStartTime,
      content: INTRO_LETTER,
    });
    this.emitState();
  }

  private async beginGame() {
    console.log(`🟢🟢🟢 Starting game 🟢🟢🟢`);
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

    const won =
      s.flagsFound.length >= FLAGS.length ||
      s.flagsFound.includes(`__secretdevflag_win`);

    console.log(
      `🔴🔴🔴 GAME OVER 🔴🔴🔴 : Players ${won ? "win 🥳🥳🥳" : "lose 🪦"}`
    );

    const postgameStartTime = Date.now() + minToMs(POSTGAME_DURATION_MINS);
    await setGameState({
      stage: "postgame",
      content: won ? POSTGAME_LETTER_WIN : POSTGAME_LETTER_LOSE,
      // endTime: postgameStartTime,
      game_won: won,
    });
    // setTimeout(() => this.beginEndgame(), minToMs(POSTGAME_DURATION_MINS));
    this.emitState();
  }

  private async beginEndgame() {
    console.log(`❓❓ ENDGAME`);
    await setGameState({
      stage: "endgame",
    });
    this.emitState();
  }

  public onGameWon() {
    setTimeout(() => {
      this.moveToPostGame();
    }, 5000);
  }
}
