//var request = require('request');

var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var path = require("path");


var xml2js  = require('xml2js');

var request = require('request');


var device_Model_create = require('./model/device_model_create');
var device_Model_update = require('./model/device_model_update');
var create_entity = require('./requests/create_entity');
var update_entity = require('./requests/update_entity');

 var get_device = require('./requests/get_device');

var date = require('date-and-time');
var device_subscriptions = require('./requests/device_subscriptions');

var optionsDevice=get_device.get_device();


var options_device_Subscriptions = device_subscriptions.subscriptions();

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./conf/config.properties');
var subscriptions = properties.get('subscriptions');
var asyncload = properties.get('async_load');
var update_interval = properties.get('update-interval');
var read_timeout= properties.get('read_timeout');
var device_name=  properties.get('device_name');

var lastInsertId=JSON.parse(fs.readFileSync('lastid.json', 'utf8'));
var count = 0;
var count2 = 0;
var k=0;


function callbackCreate(error, response, body) {
  if (!error) {
    if(response.body!=null){
      console.log("Entity " + response.body.description);

    }
    else{
      console.log("Entity created");
    }
  }
  else {
    console.log('Error: '+ error);
  }
}

function IsJsonString(str) {
  if(str ===undefined){
    return false;

  }else
    {
      try {
          JSON.parse(str.body);
      } catch (e) {
          return false;
      }
      return true;
    }

}

function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }

function insertValue(dato){

    }




function callbackAgv(error, responseW) {

 var errordata=IsJsonString(responseW);

  if (!error && errordata) {
    console.log("Fetching agv data...");

    var agvdata = JSON.parse(responseW.body);
    console.log("Dati letti da chiamata rest, dimensione array: "+agvdata.length);
    if(count == 0){
      console.log("Trying to create entity");

       var optionsCreate = create_entity.create_entity(device_Model_create.model(device_name));
      request(optionsCreate, callbackCreate);
      if(subscriptions==true){
        request(options_device_Subscriptions, function(err){
          if(err)
          console.log(err);
        });
      }

    }
    count = 1;
    //passo tutto l'intero array di dati per l'update in batch
    lastInsertId=JSON.parse(fs.readFileSync('lastid.json', 'utf8'));


    if(agvdata.length>=1){


        if(agvdata[0].id>lastInsertId){

               var insert=  agvdata[0];
               console.log("Carico AGV data id: "+insert.id);
               var data = device_Model_update.model(insert,device_name);
               var optionsUpdate = update_entity.update_entity(data,device_name);


                  request(optionsUpdate, function callbackupdate(error) {
                               if(error){
                                 console.log(error);
                               }
                               else{
                                 //salvo ultimo record se i dati sono stati inseriti
                                 console.log("AGV Data Updated...");
                                }
               });


           var lastInsertId = agvdata[0].id;
           console.log("Salvo id: "+lastInsertId);
           fs.writeFileSync('lastid.json', JSON.stringify(lastInsertId, null, 2) , 'utf-8');
           k++;
      }else{
            console.log("No data to update");
          }
      }else{
        console.log("No data to update");
      }


}
else {
  console.log('Error: '+ error);
  console.log('Error in rest service call. Check remote service is working ');
}
}



setInterval(function(){
  optionsDevice=get_device.get_device();
    request(optionsDevice, callbackAgv);
}, update_interval);
