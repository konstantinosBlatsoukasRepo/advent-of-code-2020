const inputReader = require('./inputReader.js');


let validPassworrdsCounter = 0;
for (const passwordContext of inputReader.passwordsContexts) {
  if (isValidPassword(passwordContext)) {
    validPassworrdsCounter++;
  }
}

// puzzle output
console.log(validPassworrdsCounter);

function isValidPassword(passwordContext) {
  let charactersFrequencies = computeCharactersFrequencies(passwordContext.password);
  return charactersFrequencies.get(passwordContext.charUnderPolicy) >= passwordContext.minOccurencesOrFirstPosition &&
  charactersFrequencies.get(passwordContext.charUnderPolicy) <= passwordContext.maxOccurencesOrSecondPosition
}

function computeCharactersFrequencies(password) {
  let charFrequencies = new Map();
  for (const currentCharacter of password) {
    if (charFrequencies.has(currentCharacter)) {
      let currentFrequency = charFrequencies.get(currentCharacter);
      charFrequencies.set(currentCharacter, currentFrequency + 1);
    } else {
      charFrequencies.set(currentCharacter, 1);
    }
  }
  return charFrequencies;
}