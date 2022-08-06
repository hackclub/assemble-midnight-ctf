export const INTRO_DURATION_MINS = 0.2;
export const GAME_DURATION_MINS = 1;
// export const POSTGAME_DURATION_MINS = 0.2;

export const FLAG_PREFIX = "a::";

interface FlagData {
  flag: string;
  name: string;
  help?: string;
}

const FLAGDATA: FlagData[] = [
  {
    flag: "92f6cc7389a30529e43d353fb0f777a0",
    name: "SMS Secret",
  },
  {
    // 1
    flag: "alphabetflip",
    name: "Puzzle Problems",
  },
  {
    // 2
    flag: "phelan",
    name: "Music Match",
  },
  {
    // 3
    flag: "978-0-465-00263-4",
    name: "Book Blanks",
  },
  {
    // 4
    flag: "2113858771200",
    name: "Peculiar Primes",
  },
  // {
  //   // 5
  //   flag: "celeste",
  //   name: "Celeste?!?",
  // },
  {
    // 6
    flag: "4783",
    name: "Phone Call",
  },
  {
    // 7
    flag: "89685905732105809",
    name: "Cube Root",
  },
  {
    // 9
    flag: "16-17-10-5-4-12-13-2",
    name: "Room Numbers",
  },
  {
    // 10 (FINAL)
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

Keys may be words, numbers, or strings in the format \`${FLAG_PREFIX}<flag code>\`. Work together, or you won’t succeed.

The Organization appreciates your assistance.
`;

export const POSTGAME_LETTER_WIN = `
The Organization thanks you for locating all keys. The Organization will restore power to your building as soon as possible.

The Organization wishes you a pleasant night.
`;

export const POSTGAME_LETTER_LOSE = `
The Organization is saddened by your failure to locate all the flags. The Organization requires you to recover all keys before power can be restored. Please immediately call any phone numbers you have obtained.
`;
