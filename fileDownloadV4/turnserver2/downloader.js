#!/usr/bin/env node
/* vim: set expandtab sw=2 ts=2 : */

var io = require('socket.io-client');
var crypto = require('crypto');
var randomAccessFile = require('random-access-file');

var uid = process.argv[2];
var uploaderUid = process.argv[3];
if(!uid || !uploaderUid) {
  var usage = 'Usage:\n' +
    '  node sender.js [MY_UID] [RECEIVER_UID]\n';
  console.log(usage);
  process.exit(1);
}

var serverAddress = 'http://127.0.0.1:8099';
var socket = io.connect(serverAddress);
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
