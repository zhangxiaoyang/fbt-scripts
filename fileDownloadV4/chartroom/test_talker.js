#!/usr/bin/env node
/* vim: set expandtab sw=2 ts=2 : */

var ChartRoomTalker = require('./ChartRoom-talker.js');
var randomAccessFile = require('random-access-file');
var crypto = require('crypto');


// Uploader
var uploader = new ChartRoomTalker('http://127.0.0.1:8099', '123');
uploader.onError = function(error) {
  console.log('Uploader:');
  console.log(error);
};
uploader.onMessage = function(message) {
  console.log('Uploader:');
  console.log(message);
};


// Downloader
var downloader = new ChartRoomTalker('http://127.0.0.1:8090', '000');
downloader.onError = function(error) {
  console.log('Downloader:');
  console.log(error);
};
downloader.onMessage = function(message) {
  console.log('Downloader:');
  console.log(message);
};


// Test downloading file by turnserver
downloader.send('123', 'haha');

/*
  {
    sUid: this.uid,
    dUid: dUid,
    content: {
      filehash: '123',
      filesize: filesize,
      blockindex: blockindex,
      blocksize: blocksize,
    }
  });
};

var serverAddress = 'http://127.0.0.1:8099';
var filehash = '123';
var filesize = 1208143; 
var blocksize = 1024*1024;

socket.emit('LOGIN', uid);
for(var blockindex = 0; blockindex < Math.ceil(filesize/blocksize); blockindex++) {
  socket.emit('SEND', {
    sUid: uid,
    dUid: uploaderUid,
    content: {
      filehash: '123',
      filesize: filesize,
      blockindex: blockindex,
      blocksize: blocksize,
    }
  });
}


socket.on('RECV' + uid, function(msg) {
  var isHashCorrect = msg.content.blockhash === crypto.createHash('md5').update(msg.content.data).digest('hex');

  if(isHashCorrect) {
    var file = randomAccessFile('xingxing2.mp3', filesize);
    file.write(
      msg.content.blockindex*msg.content.blocksize,
      msg.content.data
    );
    file.close();
  }
  else {
    console.log('hash incorrect');
  }
});

socket.on('ERROR' + uid, function(err) {
  console.log(err);
});

var io = require('socket.io-client');
var crypto = require('crypto');
var randomAccessFile = require('random-access-file');


var uid = process.argv[2];
if(!uid) {
  var usage = 'Usage:\n' +
    '  node uploader.js [MY_UID]\n';
  console.log(usage);
  process.exit(1);
}


var serverAddress = 'http://127.0.0.1:8099';
var socket = io.connect(serverAddress);
var DB = {'123': 'xingxing.mp3'}

socket.emit('LOGIN', uid);
socket.on('RECV' + uid, function(msg) {
  var filehash = msg.content.filehash;
  var filesize = msg.content.filesize;
  var blockindex = msg.content.blockindex;
  var blocksize = msg.content.blocksize;

  if(filehash in DB) {
    var file = randomAccessFile(DB[filehash]);
    var isCompleteBlock = filesize-blockindex*blocksize === blocksize;
    var readsize = isCompleteBlock ? blocksize : filesize-blockindex*blocksize;
    file.read(blockindex*blocksize, readsize, function(err, data) {
      if(err) {
        console.log(err)
      }
      socket.emit('SEND', {
        sUid: uid,
        dUid: msg.sUid,
        content: {
          filehash: filehash,
          blockindex: blockindex,
          blocksize: blocksize,
          blockhash: crypto.createHash('md5').update(data).digest('hex'),
          data: data
        }
      });
      file.close();
    });
  }
});

  */
