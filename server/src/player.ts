import type { Server, Socket } from "socket.io";
import { FLAGS, FLAG_PREFIX } from "./config";
import Game from "./game";
import {
  getFlags,
  getPlayerName,
  pushFlag,
  setGameState,
  setPlayerName,
} from "./state";

export default class Player {
  playerId: string | null = null;
  playerName: string | null = null;

  constructor(public game: Game, public socket: Socket) {
    this.addListeners();
  }

  addListeners() {
    this.socket.on(
      "join",
      async ({ name, id }: { name: string; id: string }) => {
        // kinda overcomplicated this and could just use name as id
        this.playerId = id;
        this.playerName =
          (await getPlayerName(id)) || name?.trim().slice(0, 20);

        if (!this.playerName) {
          console.log(`❗️ Player ${id} missing name, resetting client`);
          this.socket.emit("client-reset");
          return;
        }

        console.log(
          `✋ ${this.socket.id} joined as ${this.playerName} (${id})`
        );
        await setPlayerName(id, this.playerName || "<Unknown>");
        this.socket.emit("hello");
      }
    );

    this.socket.on("flag", async (rawFlag) => {
      if (!this.playerId) return;
      const flag = (
        rawFlag.startsWith(FLAG_PREFIX)
          ? rawFlag.slice(FLAG_PREFIX.length)
          : rawFlag
      )
        .trim()
        .toLowerCase();

      const isCheatFlag =
        process.env.NODE_ENV !== "production" &&
        flag.startsWith("__secretdevflag");
      if (FLAGS.includes(flag) || isCheatFlag) {
        await pushFlag(this.playerId, flag);
        const flagsFound = await getFlags();
        console.log(
          `✅🛬  [${flagsFound.length}/${FLAGS.length}] ${this.playerName} submitted "${flag}" 🎉`
        );
        await setGameState({
          flagsFound,
          totalFlags: FLAGS.length,
        });
        this.game.emitState();
        this.socket.emit("flag-received", "valid");

        if (flagsFound.length === FLAGS.length || isCheatFlag) {
          await this.game.onGameWon();
        }
      } else {
        console.log(`❌ ${this.playerName} submitted invalid flag "${flag}"`);
        this.socket.emit("flag-received", "invalid");
      }
    });
  }
}
