module.exports = {
  model: function(name){
          var model =  {
                  	"id": name,
                    "type": "DeviceAgv",
                    "address": {
                      "streetAddress": "Campus - Melfi",
                      "addressLocality": "Basilicata",
                      "addressCountry": "IT"
                    },
                    "objId":"",
                    "value":"",
                    "loadType":"",
                    "timestamp": ""
               };
           return model;
      }
    }

/*
module.exports = {
  model: function(name, date){
          var model =  {
                  	"id": name,
                    "type": "Device",
                    "address": {
                      "streetAddress": "Campus - Melfi",
                      "addressLocality": "Basilicata",
                      "addressCountry": "IT"
                    },
                    "dateObserved": date,
                    "velocityPosition": {
                        "type": "Text",
                        "value": ""+date+"",
                        "metadata": {
                            "v": {
                                "type": "Float",
                                "value": "10.4"
                            }
                        }
                    },
                    "accelerataionPosition": {
                        "type": "Text",
                        "value": ""+date+"",
                        "metadata": {
                            "v": {
                                "type": "Float",
                                "value": "12.2"
                            }
                        }
                    },
                    "peaktopeakPosition": {
                        "type": "Text",
                        "value": ""+date+"",
                        "metadata": {
                            "v": {
                                "type": "Float",
                                "value": "11.2"
                            }
                        }
                    }
                  };
           return model;
      }
    }
*/
