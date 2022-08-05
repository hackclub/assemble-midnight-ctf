export const INTRO_DURATION_MINS = 1;
export const GAME_DURATION_MINS = 25;
export const POSTGAME_DURATION_MINS = 0.2;

export const FLAG_PREFIX = "a::";

interface FlagData {
  flag: string;
  name: string;
  help?: string;
}

const FLAGDATA: FlagData[] = [
  // {
  //   flag: "6e59fb2479a2153e33c35755f0594f47",
  //   name: "First Flag",
  // },
  {
    flag: "77",
    name: "Counting Characters",
  },
  {
    // 1
    flag: "alphabetflip",
    name: "Puzzle Problems",
  },
  {
    // 2
    flag: "figma",
    name: "Anagram Assembly",
  },
  {
    // 4
    flag: "2113858771200",
    name: "Peculiar Primes",
  },
  {
    // 5
    flag: "celeste",
    name: "Celeste?!?",
  },
  {
    // 9
    flag: "16-17-10-5-4-12-13-2",
    name: "Room Numbers",
  },
  {
    // 12
    flag: "923448647",
    name: "Cube Cardinals",
  },
  {
    // 13 (FINAL)
    flag: "cc989e73fcc2f0724e35fc71305d86b7",
    name: "Final Flag",
  },
  {
    // Horcrux
    flag: "49e54eefa67eeeae7ebbe6919727223b",
    name: "Horcrux",
  },
];

export const FLAGS = FLAGDATA.map((flag) => flag.flag);
export const FLAGINFO = Object.fromEntries(
  FLAGDATA.map((flag) => [flag.flag, flag])
);

export const INTRO_LETTER = `
![CLASSIFIED](/theorg_classified.png)

**Attention, Humans:**

The Organization has detected an anomaly resulting in the loss of power to your building. The Organization requires your assistance to restore electricity. The Organization has reason to believe that the keys needed to restore electricity are located within your vicinity. Locate and recover all keys. Failure to comply may result in consequences. You have T-${GAME_DURATION_MINS} minutes.

Keys may be words, numbers, or strings in the format \`${FLAG_PREFIX}<flag code>\`. Work together or you won’t succeed.

The Organization appreciates your assistance.
`;

export const POSTGAME_LETTER_WIN = `
The Organization thanks you for locating all keys. The Organization has restored power to your building.

The Organization wishes you a pleasant night.
`;

export const POSTGAME_LETTER_LOSE = `
The Organization is saddened by your failure to locate all the flags. The Organization has restored power to your building.
`;
