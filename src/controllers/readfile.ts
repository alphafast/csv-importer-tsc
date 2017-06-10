//import * as csv from "fast-csv" ;
var csv = require("fast-csv");

export var readCSVFromFile = (filePath: string, callback: any)=> {
    var array: Array<string> = [];
    var arrayCounter: number = 0;
    csv.fromPath(filePath)
     .on("data", function(data: string){
         array[arrayCounter] = data;
         arrayCounter += 1;
     })
     .on("end", function(){
         if (callback){
            callback(array);
         }
     });
}

export var getHeader = (filePath: string, callback: any) => {
    readCSVFromFile(filePath, (result: Array<string>) => {
        if (result.length > 0){
            callback(undefined, result[0]);
        }else{
            callback('Error: not have any data in csv file.', undefined);
        }
    });
}

export var getRowData = (filePath: string, rowNumber: number, callback: any) => {
    readCSVFromFile(filePath, (result: Array<string>) => {
        if (result.length > 0) {
            result.splice(0, 1);
            if (result[rowNumber-1]){
                callback(undefined, result[rowNumber-1]);
            }else{
                callback(`Error: cannot find row ${rowNumber} in "${filePath}" data.`, undefined);
            }
        }else{
            callback(`Error: don't have any row in "${filePath}" file.`, undefined);
        }
    });
}

export var getData = (filePath: string, callback: any) => {
    readCSVFromFile(filePath, (result: Array<string>) => {
        if (result.length > 0) {
            result.splice(0, 1);
            callback(undefined, result);
        }else{
            callback(`Error: don't have any row in "${filePath}" file.`, undefined);
        }
    });
}

export var getDataInArrayObject = (filePath: string, callback: any) => {
    var dataArrayObject: Array<object> = [];
    getHeader(filePath, (error: string, headerDataResult: Array<string>) => {
        if (error) {
            callback(error, undefined);
        }else{
            getData(filePath, (error: string, dataResult: Array<string>) => {
                if (error) {
                    callback(error, undefined);
                }else{
                    for (let row of dataResult){
                        let dummyObject: any = {};
                        let counter:number = 0;

                        for (let header of headerDataResult){
                            dummyObject[header] = row[counter];
                            counter+=1;
                        }
                        dataArrayObject.push(dummyObject);
                    }
                    callback(undefined, dataArrayObject);
                }
            });
        }
    });
}



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



