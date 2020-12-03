const inputReader = require('./inputReader.js');

let validPassworrdsCounter = 0;
for (const passwordContext of inputReader.passwordsContexts) {
  if (isValidPassword(passwordContext)) {
    validPassworrdsCounter++;
  }
}
// second puzzle solution
console.log(validPassworrdsCounter);

function isValidPassword(passwordContext) {
  let firstOperand = passwordContext.password[passwordContext.minOccurencesOrFirstPosition - 1] === passwordContext.charUnderPolicy;
  let secondOperand = passwordContext.password[passwordContext.maxOccurencesOrSecondPosition - 1] === passwordContext.charUnderPolicy;
  return firstOperand !== secondOperand;
}