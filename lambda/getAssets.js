var AWS = require('aws-sdk'),

    docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    let scanningParameters = {

        TableName: 'assets',
        Limit: 10
    };

    docClient.scan(scanningParameters,function(err,data){
        if(err){
            callback(err, null);

        }else{
            callback(null,data)
        }

    });
}

