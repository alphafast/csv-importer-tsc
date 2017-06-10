const mongo = require('mongodb').MongoClient;

var urlMongodbServer: string = 'mongodb://localhost:27017/test';
var collectionName: string = 'csvimporttest';

export var connect = (mongodbServerURL: string,callback: any) => {
    mongo.connect(mongodbServerURL, (error: any, db: any) => {
        if (error){
            callback(error, undefined);
        }else{
            callback(undefined, db);
        }
        db.close();
    });
}

export var insertCSVListByArrayObject = (databaseName: string, collectionName: string, csvArrayObjectList: Array<object>, callback: any) => {
    connect(urlMongodbServer, (error: any, dbObject: any) => {
        if (csvArrayObjectList.length > 0){
            var collection = dbObject.collection(collectionName);
            collection.insertMany(csvArrayObjectList, (error: any, result: any) => {
                if (error){
                    callback(error, undefined);
                }else{
                    callback(undefined, result);
                }
            });
        }else{

        }
    });
}