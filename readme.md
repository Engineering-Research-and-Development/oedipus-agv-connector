### AGV data to OCB connector
A simple connector that reads data from a REST service
about AGV data sensors and sends them to OCB, in order to test Quantum-leap behaviour (using CrateDB) and Grafana tools.

### Install from source

    $ git clone "address"
    $ cd "root folder"
    $ npm install

### Start   
    $ node connector.js
    
### Edit config.properties in config folder
    Here you can set:
        - OCB host and port
        - Quantum-leap port=8668
        - fiware service
        - fiware service path
        - subscriptions=false/true to disable or enable Quantum-leap subscriptions
        - update-interval in ms to choose the update data interval