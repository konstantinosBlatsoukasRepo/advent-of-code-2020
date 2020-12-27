const inputReader = require('./inputReader.js');


let [processedBussIds, offsetDiffs] = getMatricesForCrt(inputReader.busIds);
console.log(crt(processedBussIds, offsetDiffs));

function getMatricesForCrt(busIds) {
    let processedBussIds = [];
    let offsetDiffs = [];
    for (let offset = 0; offset < busIds.length; offset++) {
        if (busIds[offset] !== 'x' && offset === 0) {
            processedBussIds.push(parseInt(busIds[offset]));
            offsetDiffs.push(0);
        } else if (busIds[offset] !== 'x') {
            processedBussIds.push(parseInt(busIds[offset]));
            offsetDiffs.push((parseInt(busIds[offset]) - offset) % parseInt(busIds[offset]));
        }
    }
    return [processedBussIds, offsetDiffs];
}

// from rosetta code
// https://rosettacode.org/wiki/Chinese_remainder_theorem#JavaScript
function crt(num, rem) {
    let sum = 0;
    const prod = num.reduce((a, c) => a * c, 1);

    for (let i = 0; i < num.length; i++) {
      const [ni, ri] = [num[i], rem[i]];
      const p = Math.floor(prod / ni);
      sum += ri * p * mulInv(p, ni);
    }
    return sum % prod;
  }

  function mulInv(a, b) {
    const b0 = b;
    let [x0, x1] = [0, 1];

    if (b === 1) {
      return 1;
    }
    while (a > 1) {
      const q = Math.floor(a / b);
      [a, b] = [b, a % b];
      [x0, x1] = [x1 - q * x0, x0];
    }
    if (x1 < 0) {
      x1 += b0;
    }
    return x1;
  }