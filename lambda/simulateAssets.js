var AWS = require('aws-sdk'),

docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'assets';

exports.handler = function (event, context) {

    let scanningParameters = {
        TableName: tableName,
        Limit: 100
    };

    docClient.scan(scanningParameters, function(err, data){

        if (err) {
            console.log("Error getting data", err);
        } else {

            console.log("Success getting data", data);

            data.Items.forEach(function(item) {
                updateAsset(item);
            });

        }

    });
}

var updateAsset = function(asset) {

    var params = {
        TableName: tableName,
        Key:{
            "assetId": asset.assetId,
        },
        UpdateExpression: "set lat = :lat, lng = :lng",
        ExpressionAttributeValues:{
            ":lat": parseFloat(Number(asset.lat + 1).toFixed(4)),
            ":lng": parseFloat(Number(asset.lng + 1).toFixed(4))
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating asset " + asset.assetId);

    docClient.update(params, function(err, data) {
        if (err) {
            console.log("Error updating data", err);
        } else {
            console.log("Success updating data", data);
        }
    });

}




