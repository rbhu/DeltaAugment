var validator = require('validator');

// Expected input: String representation of an integer between 2-200 inclusive
// Returns -1 if invalid, userNum otherwise
function augNum(body) {
    if (typeof body.number === 'undefined' || body.number === null) return -1;
    var userNum = body.number;
    var isInt = validator.isInt(userNum, {gt: 1, lt: 20});
    if (isInt === false) return -1;
    return userNum;
}

// Expected input: String representation of comma separated list of Alpha-only substrings
// Returns -1 if invalid, array of tags otherwise
function tags(body) {
    if (typeof body.tags === 'undefined') return -1;
    var userTags = body.tags;
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
function uid(body) {
    if (typeof body.uid === 'undefined' || body.uid === null) return -1;
    var userUid = body.uid;
    var isAlphaNum = validator.isAlphanumeric(userUid);
    if (isAlphaNum === false) return -1;
    if (userUid.length > 20)  return -1;
    return userUid;
}


module.exports.augNum = augNum;
module.exports.tags = tags;
module.exports.uid = uid;
