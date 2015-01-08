#!/usr/bin/env node
/* vim: set expandtab sw=2 ts=2 : */

var ChartRoomTalker = require('./ChartRoom-talker.js');
var randomAccessFile = require('random-access-file');
var crypto = require('crypto');

var downloader = new ChartRoomTalker('http://182.92.212.237:8099', '000');
downloader.onError = function(error) {
  console.log(error);
};
downloader.onMessage = function(sUid, message) {
  var isHashCorrect
    = message.blockhash
    === crypto.createHash('md5').update(message.data).digest('hex');

  if(isHashCorrect) {
    var file = randomAccessFile('xingxing2.mp3', filesize);
    file.write(
      message.blockindex*message.blocksize,
      message.data
    );
    file.close();
  }
  else {
    console.log('hash incorrect');
  }
};

var filehash = '123456';
var filesize = 1208143; 
var blocksize = 1024*1024;
for(var blockindex = 0; blockindex < Math.ceil(filesize/blocksize); blockindex++) {
  downloader.send('123', {
    filehash: filehash,
    filesize: filesize,
    blockindex: blockindex,
    blocksize: blocksize
  });
}


