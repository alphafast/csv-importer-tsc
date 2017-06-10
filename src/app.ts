const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

import * as readFile from "./controllers/readfile";
import * as csvModel from "./models/csv";

var app = express();

var storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, 'uploads/')
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

app.post('/upload/getdata',upload.single('csvfile'), function (req:any, res: any, next: any) {
  var csvFileName = req.file.originalname;
  console.log(csvFileName);

  readFile.getData(`./uploads/${csvFileName}`,(error: string, result: Array<string>) => {
    if (error){
      //console.log(error);
      res.send(error).end;
    }else{
      //console.log(result);
      res.send(result).end();
    }
  });
  
});

app.post('/upload/getheader',upload.single('csvfile'), function (req:any, res: any, next: any) {
  var csvFileName = req.file.originalname;
  console.log(csvFileName);

  readFile.getHeader(`./uploads/${csvFileName}`, (error: string, result: Array<string>) => {
    if (error){
      //console.log(error);
      res.send(error).end;
    }else{
      //console.log(result);
      res.send(result).end();
    }
  });
  
});

app.post('/upload/getdatainarrayobject',upload.single('csvfile'), function (req:any, res: any, next: any) {
  var csvFileName = req.file.originalname;
  console.log(csvFileName);

  readFile.getDataInArrayObject(`./uploads/${csvFileName}`, (error: string, result: Array<object>) => {
    if (error){
      res.send(error).end();
    }else{
      res.send(result).end();
    }
  });
  
});

app.post('/upload/savecsvbyarraypbject',upload.single('csvfile'), function (req:any, res: any, next: any) {
  var csvFileName = req.file.originalname;

  if(req.file && req.body.database && req.body.collection){
    readFile.getDataInArrayObject(`./uploads/${csvFileName}`, (error: string, result: Array<object>) => {
      if (error){
        res.send(error).end();
      }else{
        csvModel.insertCSVListByArrayObject(req.body.database, req.body.collection, result, (error: any, result: any) => {
          if(error){
            //console.log(error);
            res.send(error).end();
          }else{
            result.result.insertedTo = {
              bd: req.body.database,
              collection: req.body.collection
            }
            res.send(result).end();
          }
        })
      }
    });
  }else{
    res.send("Error: missing some request parameters.").end();
  }
  
});

app.listen(3001, () => {
  console.log('Express server is up on port 3001');
})