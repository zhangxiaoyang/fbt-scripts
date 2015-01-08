#!/usr/bin/env node
/* vim: set expandtab sw=2 ts=2 : */

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

socket.on('ERROR' + uid, function(err) {
  console.log(err);
});
