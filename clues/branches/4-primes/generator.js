/**
 * Generates a file with a prime number on each line
 * Pattern broken with a non-prime on some lines
 */

const fs = require("fs");

const NUM_LINES = 500;
const ANOMALOUS_LINES = [6, 19, 34, 44, 80, 313, 495];

function getPrimes(c) {
  const primes = [];
  nums: for (let i = 0; ; i++) {
    for (let k = 2; k <= i / 2; k++) {
      if (i / k === Math.trunc(i / k)) continue nums;
    }
    primes.push(i);
    if (primes.length === c) return primes.slice(2);
  }
}

const primes = getPrimes(NUM_LINES);

for (const n of ANOMALOUS_LINES) {
  const primeBefore = primes[n - 2];
  const primeAfter = primes[n - 1];
  const diff = primeAfter - primeBefore - 1;
  const anomaly = primeBefore + 1 + Math.floor(Math.random() * diff);
  primes.splice(n - 1, 0, [anomaly]);
}

fs.writeFileSync(
  "./out.txt",
  primes.reduce((str, n) => `${str}${n}\n`, "")
);
