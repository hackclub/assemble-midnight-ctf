export const INTRO_DURATION_MINS = 0.2;
export const POSTGAME_DURATION_MINS = 1;
export const GAME_DURATION_MINS = 45;

export const FLAG_PREFIX = "a::";

interface FlagData {
  flag: string;
  name: string;
  help?: string;
}

const FLAGDATA: FlagData[] = [
  {
    flag: "6e59fb2479a2153e33c35755f0594f47",
    name: "First Flag",
  },
  {
    flag: "92f6cc7389a30529e43d353fb0f777a0",
    name: "Secret Screenshot",
  },
  {
    flag: "77",
    name: "Counting Characters",
  },
];
export const FLAGS = FLAGDATA.map((flag) => flag.flag);
export const FLAGINFO = Object.fromEntries(
  FLAGDATA.map((flag) => [flag.flag, flag])
);

export const INTRO_LETTER = `
Welcome, Hacker,

Due to mysterious circumstances, it seems the building has lost power, and it's up to you to figure out what happened. A strange game is afoot. The Organization encourages you to search the building for clues, and reminds you that things may not be as they seem. 

As you solve this puzzle, you will find flags hidden in ciphers, on servers and USB drives, note cards, and elsewhere. Most flags follow the format of \`${FLAG_PREFIX}<flag code>\`, but some may simply be a number or word.

Unfortunately, your time is running out. You have ${GAME_DURATION_MINS} minutes to find all the flags. Hurry to solve the puzzle and recover the electricity before it's too late! Work together, or _you won't succeed_.

The first flag is \`${FLAG_PREFIX}${FLAGS[0]}\`.

The Organization wishes you good luck.
`;

export const POSTGAME_LETTER_WIN = `
Congratulations, all flags have been found!

Unfortunately, this mystery remains unsolved. It's now up to you to figure out who the real evil mastermind is. 

In order to solve the mystery, the majority of you must agree - so please discuss carefully.

Remember that other teams may have info that you don't.
`;

export const POSTGAME_LETTER_LOSE = `
Oops!

You lost the game.

But it's not over yet...
`;
