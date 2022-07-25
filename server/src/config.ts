export const INTRO_DURATION_MINS = 0.3;
export const POSTGAME_DURATION_MINS = 0.3;
export const GAME_DURATION_MINS = 1;

export const FLAG_PREFIX = "a:";
export const FLAGS = ["cheese", "bacon"].map((f) => f.trim().toLowerCase());

export const INTRO_LETTER = `
Welcome, hacker,

You've found my secret puzzle.

Good luck,
M
`;

export const POSTGAME_LETTER_WIN = `
Congratulations on finding all the flags!

Unfortunately, this mystery remains unsolved. It's now up to you to figure out who the real evil mastermind is. In order to solve the mystery, the majority of you must agree on all solutions. Please carefully discuss your solutions.

Remember that other teams may have info that you don't.
`;

export const POSTGAME_LETTER_LOSE = `
Oops!

You lost the game.

But it's not over yet...
`;
