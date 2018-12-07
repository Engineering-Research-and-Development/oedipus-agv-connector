 module.exports = {
  model: function(data, name){

    var tmpDate= data.timestamp.split(" ");
          var newDate = tmpDate[0].split("/").reverse().join("-");
          newDate=newDate+" "+tmpDate[1];
          var event = new Date(newDate);
  

// modello singolo
   var model = {
      "objId":data.objId,
      "value":data.value,
      "loadType": Math.floor(Math.random() * Math.floor(1)),
      "timestamp": event.getTime()
   }

    return model;
  }
}
