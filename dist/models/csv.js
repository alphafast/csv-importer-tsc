"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require('mongodb').MongoClient;
var urlMongodbServer = 'mongodb://localhost:27017/test';
var collectionName = 'csvimporttest';
exports.connect = (mongodbServerURL, callback) => {
    mongo.connect(mongodbServerURL, (error, db) => {
        if (error) {
            callback(error, undefined);
        }
        else {
            callback(undefined, db);
        }
        db.close();
    });
};
exports.insertCSVListByArrayObject = (databaseName, collectionName, csvArrayObjectList, callback) => {
    exports.connect(urlMongodbServer, (error, dbObject) => {
        if (csvArrayObjectList.length > 0) {
            var collection = dbObject.collection(collectionName);
            collection.insertMany(csvArrayObjectList, (error, result) => {
                if (error) {
                    callback(error, undefined);
                }
                else {
                    callback(undefined, result);
                }
            });
        }
        else {
        }
    });
};
//# sourceMappingURL=csv.js.map