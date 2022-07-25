export const INTRO_DURATION_MINS = 0.2;
export const POSTGAME_DURATION_MINS = 1;
export const GAME_DURATION_MINS = 45;

export const FLAG_PREFIX = "a::";
export const FLAGS = [
  "6e59fb2479a2153e33c35755f0594f47", // Intro letter
  "92f6cc7389a30529e43d353fb0f777a0", // iOS app
  "77", // Number of characters in one of error messages
].map((f) => f.trim().toLowerCase());

export const INTRO_LETTER = `
Welcome, hacker,

Due to mysterious circumstances, it seems the building has lost power, and it's up to you to figure out what happened and bring it back.

As you start to uncover clues and unravel the mystery, you will find flags hidden in ciphers, on servers and USB drives, note cards, and who knows where else. Most flags follow the format of \`${FLAG_PREFIX}<flag code>\`, but some may simply be a number or word.

Unfortunately, your time is running out. You have 45 minutes to find all the flags. Hurry to solve the mystery and recover the electricity before it's too late! Work together, or you won't succeed.

Your first flag is \`${FLAG_PREFIX}${FLAGS[0]}\`.

Good luck.
`;

export const POSTGAME_LETTER_WIN = `
Congratulations, you've found all the flags!

Unfortunately, this mystery remains unsolved. It's now up to you to figure out who the real evil mastermind is. In order to solve the mystery, the majority of you must agree on all solutions. Please carefully discuss your solutions.

Remember that other teams may have info that you don't.
`;

export const POSTGAME_LETTER_LOSE = `
Oops!

You lost the game.

But it's not over yet...
`;
