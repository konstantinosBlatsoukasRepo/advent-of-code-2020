const fs = require('fs')

try {
  const data = fs.readFileSync('input.txt', 'utf8');
  let passwordsContexts = [];
  for (const line of data.split('\n')) {

    let policyLimits, charUnderPolicWithColon, password;
    [policyLimits, charUnderPolicWithColon, password] = line.split(' ');

    let charUnderPolicy = charUnderPolicWithColon.substring(0, 1);

    let minOccurencesChar, maxOccurencesChar;
    [minOccurencesChar, maxOccurencesChar] = policyLimits.split('-');

    let passwordContext = {
      password: password.replace('\r', ''),
      minOccurencesOrFirstPosition: parseInt(minOccurencesChar),
      maxOccurencesOrSecondPosition: parseInt(maxOccurencesChar),
      charUnderPolicy: charUnderPolicy
    };

    passwordsContexts.push(passwordContext);
  }
  exports.passwordsContexts = passwordsContexts;
} catch (err) {
  console.error(err);
}