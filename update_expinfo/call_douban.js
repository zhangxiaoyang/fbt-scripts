var fs = require('fs');
var path = require('path');
var douban = require('./douban');

// config douban apikey
douban.apikey = '';
inputfile = process.argv[2];
outputfile = process.argv[3];

var lines = fs.readFileSync(inputfile).toString().split('\n');

function sleep(milliSecond) {  
    var startTime = new Date().getTime();  
    console.log(startTime);  
    while(new Date().getTime() <= milliSecond + startTime) {  
    }  
    console.log(new Date().getTime());  
} 

function me(lines) {
    if(lines.length) {
        var arr = lines.pop().split('\t');
        var id = arr[0];
        var title = arr[1];
        var new_title = arr[2];
        douban.getInfo(new_title, function(info){
            fs.appendFileSync(outputfile, id + '\t' + new_title + '\t' + JSON.stringify(info) + "\n");
            me(lines);

            sleep(1500);
        });
    }
}

me(lines);
