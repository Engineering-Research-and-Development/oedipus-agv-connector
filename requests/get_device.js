module.exports = {
  get_device: function(json){
    var PropertiesReader = require('properties-reader');
    var fs = require('fs');
    var properties = PropertiesReader('./conf/config.properties');
    var crf_data_api=  properties.get('crf_data_api');

    /*var options = {
        name: device_name
     };*/
     var lastInsertId=JSON.parse(fs.readFileSync('lastid.json', 'utf8'));
     var urldata=crf_data_api+lastInsertId;
     var options = {
      uri: urldata,
      method: 'GET'
    };
    return options;
  }
};
