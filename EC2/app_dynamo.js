var AWS = require('aws-sdk');
var util = require('util');

async function checkDuplicate(UID) {
    AWS.config.loadFromPath('./config_dynamo.json');
    var dynamoClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    var params = {
        TableName: "image-store",
        Key: {
            "image-uid": { S: UID }
        }
    };
    console.log(`Checking for duplicate with UID: ${UID}`);

    var getRequest = dynamoClient.getItem(params).promise();

    return getRequest.then( (data) => {
        if (Object.keys(data).length === 0 && data.constructor === Object){
            return true;
        } else {
            return false;
        }
    }, (error) => {
        console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
        return false;
    });
}


async function addDynamoEntry(UID, tags, url, augNum) {
    AWS.config.loadFromPath('./config_dynamo.json');
    var dynamoClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    var params = {
        TableName: "image-store",
        Item: {
            "image-uid": {
                S: UID
            },
            "image-tags": {
                S: tags
            },
            "source-url": {
                S: url
            },
            "image-augs": {
                N: augNum
            }
        }
    };

    var putRequest = dynamoClient.putItem(params).promise();

    return putRequest.then( (data) => {
        return true;
    }, (error) => {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        return false;
    });
};


module.exports.addDynamoEntry = addDynamoEntry;
module.exports.checkDuplicate = checkDuplicate;
