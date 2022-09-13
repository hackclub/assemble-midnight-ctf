# Assemble Midnight CTF

This event was run at the first midnight of Assemble on Saturday.

TODO add some photos

## The Puzzles

**NOTE: a few additional clues/modifications were added to the drives (along with other physical clues) before the event began that are not reflected in this repo. Unfortunately, these are probably lost to time.**

This CTF was composed of a simple web app along with a series of approximately 10 puzzles (a mix of physical ones involving jigsaw puzzles, invisible ink and rubiks cubes, and technical ones involving prime numbers, encryption and more). These puzzles were hidden throughout the Assemble venue prior to the event, and a description plus files from each puzzle can be found the READMEs for each folder in `clues/puzzles`.

The web app was designed as a simple Next.js app with a websocket server. When the event began, participants were directed to `hack.af/midnight` via a mysterious slide. From there, they were introduced to the CTF and were then able to enter flags as the puzzles were solved.

## Post Mortem

This event wasn't a complete failure (mostly due to @sampoder's heroic improv), but it was mostly derailed from the start. Here are some of the reasons it went wrong, and lessons learned in puzzle-making.

1. **The wrong puzzle for the wrong group** - I think the main reason this didn't work at Assemble is because I simply didn't think this through enough from the participant perspective. There were simply too many people in too big of a space working on the puzzle at once. This resulted in a situation where no one knew what was going on, and small isolated teams formed such that each team lacked context and clues known by the other teams. Thus, most of the puzzles were practically unsolvable, and we were forced to abort the event.
2. **Lack of preparation** - many of the puzzles for this event came together in the two days before the event, and thus we didn't get the opportunity to properly test this on people who knew nothing about the event. This is a big mistake on my part as a lot of issues likely could have been identified and fixed beforehand. Additionally, most of staff were not familiar with the event and thus weren't able to help keep it on track.
3. **A rough start and mass confusion** - we accidentally triggered the start of the event before the final production of the event site finished deploying and went live on Heroku. This meant that the server was running an in-progress game that had started several minutes previously, which most people visited on their phones when the event began. This meant that no one saw the opening letter and instructions at first, so everyone was just confused. This was resolved about two minutes later, but by that point most people had no idea what was going on, had lost patience, and thus never even saw the opening instructions. I think I took the mysterious, sudden vibe of the event a bit too seriously, and this wouldn't have been such a critical mistake if we had provided more extensive and straightforward instructions to participants before the event even began to avoid the confusion that followed.
4. **Other unexpected issues** - turns out many peoples' phones weren't working during the event, including Ced's. One of the most important clues required participants to call Ced to receive clues. Thus, even though participants found his phone number very quickly, they couldn't contact him. A couple other smaller things went wrong as well, for example, participants found the clues in the wrong order and a flag labelled "Final Flag" was, ironically, found first (I'm still not quite sure how this even happpened). This led to a lot of confusion. All these little flukes compounded to create a situation which was realistically impossible to recover from.

Thanks to Sam Poder, Ganning Xu, Khaleel Gibran, and everyone else who helped make these puzzles.
