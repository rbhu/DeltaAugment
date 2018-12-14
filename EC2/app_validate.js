var validator = require('validator');

// Expected input: String representation of an integer between 2-200 inclusive
// Returns -1 if invalid, userNum otherwise
function augNum(userNum) {
    if (userNum === null || userNum === undefined) return -1;
    var isInt = validator.isInt(userNum, {gt: 1, lt: 20});
    if (isInt === false) return -1;
    return userNum;
}

// Expected input: String representation of comma separated list of Alpha-only substrings
// Returns -1 if invalid, array of tags otherwise
function tags(userTags) {
    if (userTags === null || userTags === undefined) return -1;
    var tags = userTags.split(",");
    var outputTags = [];
    for (var i = 0; i < tags.length; i++) {
        var x = tags[i].trim();
        var isAlphaNum = validator.isAlpha(x);
        if (isAlphaNum === false)    return -1;
        if (x.split(" ").length > 1) return -1;
        if (x.length > 20)           return -1;
        outputTags.push(x);
    }
    return outputTags;
}

// Expected input: AlphaNumeric string
// Returns -1 if invalid, userUid otherwise
function uid(userUid) {
    if (userUid === null || userUid === undefined) return -1;
    var isAlphaNum = validator.isAlphanumeric(userUid);
    if (isAlphaNum === false) return -1;
    if (userUid.length > 20)  return -1;
    return userUid;
}


module.exports.augNum = augNum;
module.exports.tags = tags;
module.exports.uid = uid;
