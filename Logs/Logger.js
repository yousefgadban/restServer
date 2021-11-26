const fs = require('fs'); 
//var logger = require('./logger').createLogger(); // logs to STDOUT
//var logger = require('./logger').createLogger('development.log'); // logs to a file

const writeToLogFile = (comp, str) => {

    const print = new Date().toLocaleString() +  ' => ' + comp + ' => ' + str +'\n';

    // fs.appendFile('./Logs/logs.log', print,  'utf8', function (err) {
    //     console.log(print);  
    // });
    
    console.log(print);
}

module.exports = {  

    writeToLogFile
     
};