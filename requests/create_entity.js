module.exports = {
  create_entity: function(json){
    var PropertiesReader = require('properties-reader');
    var properties = PropertiesReader('./conf/config.properties');
    var fiware_service = properties.get('fiware-service');
    var fiware_service_path = properties.get('fiware-service-path');
    var cb_host = properties.get('context-broker-host');
    var cb_port = properties.get('context-broker-port');

    var options = {
      uri: 'http://'+cb_host+':'+cb_port+'/v2/entities?options=keyValues',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Fiware-Service': fiware_service,
        'Fiware-ServicePath': fiware_service_path
      },
      json: json
    };
    return options;
  }
};
