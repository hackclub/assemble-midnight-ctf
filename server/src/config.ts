export const INTRO_DURATION_MINS = 1;
export const GAME_DURATION_MINS = 45;
export const POSTGAME_DURATION_MINS = 0.2;

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
  {
    // 4
    flag: "2113858771200",
    name: "Peculiar Primes",
  },
];
export const FLAGS = FLAGDATA.map((flag) => flag.flag);
export const FLAGINFO = Object.fromEntries(
  FLAGDATA.map((flag) => [flag.flag, flag])
);

export const INTRO_LETTER = `
_Confidential // Level 7 clearance_

**Attention, Humans:**

The Organization has detected an anomaly resulting in the loss of power to your building. The Organization requires your assistance to restore electricity. The Organization has reason to believe that the keys needed to restore electricity are located within your vicinity. Locate and recover all keys. Failure to comply may result in consequences. You have T-${GAME_DURATION_MINS} minutes.

Keys may be words, numbers, or strings in the format \`${FLAG_PREFIX}<flag code>\`. Work together or you won’t succeed.

The Organization appreciates your assistance.
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
