#!/usr/bin/env node
/* vim: set expandtab sw=2 ts=2 : */

var ChartRoomTalker = require('./ChartRoom-talker.js');
var randomAccessFile = require('random-access-file');
var crypto = require('crypto');

var DB = {
  '123456': 'xingxing.mp3',
  '234567': '../turnserver/qinghuaci.mp3',
  '345678': '/home/zhy/FBT-linux-32.zip'
};

var uploader = new ChartRoomTalker('http://182.92.212.237:8099', '123');
uploader.onError = function(error) {
  console.log(error);
};
uploader.onMessage = function(sUid, message) {
  var filehash = message.filehash;
  var filesize = message.filesize;
  var pieceindex = message.pieceindex;
  var piecesize = message.piecesize;

  if(filehash in DB) {
    var file = randomAccessFile(DB[filehash]);
    var isLastPiece = (filesize-pieceindex*piecesize < piecesize);
    var readsize = isLastPiece ? filesize-pieceindex*piecesize : piecesize;

    if(readsize <= 0) {
      uploader.send(sUid, {
        filehash: filehash,
        filesize: filesize,
        pieceindex: pieceindex,
        piecesize: readsize,
        piecehash: null,
        data: null //EOF
      });
      return;
    }

    file.read(pieceindex*piecesize, readsize, function(error, data) {
      if(error) {
        console.log(error)
        return process.exit(1);
      }

      uploader.send(sUid, {
        filehash: filehash,
        filesize: filesize,
        pieceindex: pieceindex,
        piecesize: readsize,
        piecehash: crypto.createHash('md5').update(data).digest('hex'),
        data: data
      });
      file.close();
    });
  }
};
