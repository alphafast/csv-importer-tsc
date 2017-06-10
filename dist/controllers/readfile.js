"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as csv from "fast-csv" ;
var csv = require("fast-csv");
//var filePath: string = "../sample_csv_empty.csv";
exports.readCSVFromFile = (filePath, callback) => {
    var array = [];
    var arrayCounter = 0;
    csv.fromPath(filePath)
        .on("data", function (data) {
        array[arrayCounter] = data;
        arrayCounter += 1;
    })
        .on("end", function () {
        if (callback) {
            callback(array);
        }
    });
};
exports.getHeader = (filePath, callback) => {
    exports.readCSVFromFile(filePath, (result) => {
        if (result.length > 0) {
            callback(undefined, result[0]);
        }
        else {
            callback('Error: not have any data in csv file.', undefined);
        }
    });
};
exports.getRowData = (filePath, rowNumber, callback) => {
    exports.readCSVFromFile(filePath, (result) => {
        if (result.length > 0) {
            result.splice(0, 1);
            if (result[rowNumber - 1]) {
                callback(undefined, result[rowNumber - 1]);
            }
            else {
                callback(`Error: cannot find row ${rowNumber} in "${filePath}" data.`, undefined);
            }
        }
        else {
            callback(`Error: don't have any row in "${filePath}" file.`, undefined);
        }
    });
};
exports.getData = (filePath, callback) => {
    exports.readCSVFromFile(filePath, (result) => {
        if (result.length > 0) {
            result.splice(0, 1);
            callback(undefined, result);
        }
        else {
            callback(`Error: don't have any row in "${filePath}" file.`, undefined);
        }
    });
};
exports.getDataInArrayObject = (filePath, callback) => {
    var dataArrayObject = [];
    exports.getHeader(filePath, (error, headerDataResult) => {
        if (error) {
            callback(error, undefined);
        }
        else {
            exports.getData(filePath, (error, dataResult) => {
                if (error) {
                    callback(error, undefined);
                }
                else {
                    for (let row of dataResult) {
                        let dummyObject = {};
                        let counter = 0;
                        for (let header of headerDataResult) {
                            dummyObject[header] = row[counter];
                            counter += 1;
                        }
                        dataArrayObject.push(dummyObject);
                    }
                    callback(undefined, dataArrayObject);
                }
            });
        }
    });
};
// getHeader(filePath, (error: string, result: Array<string>) => {
//     if(error){
//         console.log(error);
//     }else{
//         console.log(result);
//     }
// })
// getRowData(filePath, 50, (error?: string, result?: Array<string>) => {
//     if(error){
//         console.log(error);
//     }else{
//         console.log(result);
//     }
// });
// getData(filePath, (error: string ,result: Array<string> ) => {
//     if(error){
//         console.log(error);
//     }else{
//         console.log(result);
//     }
// });
//# sourceMappingURL=readfile.js.map