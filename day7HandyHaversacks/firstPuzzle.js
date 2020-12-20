const inputReader = require('./inputReader.js');

let allBags = inputReader.readAllBags();

exports.allBags = allBags;

let desiredBags = new Set(["shiny#gold"]);

while (true) {
    let currentDesiredBagsSize = desiredBags.size; 
    for (const candidateBag in allBags) {
        let subBags = allBags[candidateBag];
        let filteredBags = subBags.map(subBag => Object.keys(subBag)[0])
                                  .filter(subBag => desiredBags.has(subBag));

        if (filteredBags.length) {
            desiredBags.add(candidateBag);
            delete allBags[candidateBag];
        }
    }
    if (currentDesiredBagsSize === desiredBags.size) { break; }
}


console.log("first puzzle solution:");
console.log(desiredBags.size - 1);
