/* vim: set expandtab sw=2 ts=2 : */

var fs = require('fs');

/*
var fileInfo = {
  file_to_save: 'out.mp3',
  hash: '123456',
  size: 1208143
};
*/
var fileInfo = {
  file_to_save: 'out.mp3',
  hash: '234567',
  size: 9593727
};
/*
var fileInfo = {
  file_to_save: 'out.mp3',
  hash: '345678',
  size: 51908351
};
*/

var my_uid = '000';
var uploaderUidList = ['112', '113', '114', '123'];
var e = null;
var downloadOverCallback = function(that) {
  console.log('Done parts: ' + that.done_parts);
  console.log('Done piece: ' + that.pieceindex);

  if(fs.existsSync(that.filenametmp)) {
    fs.rename(that.filenametmp, that.filename);
  }

  ENDTIME = new Date().getTime();
  console.log('Used ' + (ENDTIME-STARTTIME)/1000 + ' seconds');
};
var downloadProgressCallback = function(that) {
  console.log('Done parts: ' + that.done_parts);
  console.log('Done piece: ' + that.pieceindex);
};

var forwardDownloader = require('./forwardDownloader.js');
forwardDownloader = new forwardDownloader(
  fileInfo, my_uid, uploaderUidList, e, downloadOverCallback, downloadProgressCallback
);

/*
 * Tests
 */
function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}
function startFileDownloadTest() {
  console.log('startFileDownloadTest...');

  var parts_left = [];
  var blocksize = 1024*1024; //1M
  for(var i = 0; i < Math.ceil(fileInfo.size/blocksize); i++) {
    parts_left.push(i);
  }
  forwardDownloader.startFileDownload(parts_left);
}

function pauseFileDownloadTest() {
  console.log('pauseFileDownloadTest...');

  var parts_left = [];
  var blocksize = 1024*1024; //1M
  for(var i = 0; i < Math.ceil(fileInfo.size/blocksize); i++) {
    parts_left.push(i);
  }
  forwardDownloader.startFileDownload(parts_left);

  sleep(5000);
  console.log('Pausing...');
  forwardDownloader.emit('pause');
  console.log('Done parts: ' + forwardDownloader.done_parts);
  console.log('Done piece: ' + forwardDownloader.pieceindex);
}

function resumeFileDownloadTest() {
  console.log('resumeFileDownloadTest...');

  var parts_left = [];
  var blocksize = 1024*1024; //1M
  for(var i = 0; i < Math.ceil(fileInfo.size/blocksize); i++) {
    parts_left.push(i);
  }
  forwardDownloader.startFileDownload(parts_left);
  sleep(5000);
  console.log('Pausing...');
  forwardDownloader.emit('pause');
  console.log('Done parts: ' + forwardDownloader.done_parts);
  console.log('Done piece: ' + forwardDownloader.pieceindex);

  sleep(10);
  console.log('Resuming...');
  forwardDownloader.emit('resume');
  console.log('Done parts: ' + forwardDownloader.done_parts);
  console.log('Done piece: ' + forwardDownloader.pieceindex);

  sleep(10000);
  console.log('Pausing...');
  forwardDownloader.emit('pause');
  console.log('Done parts: ' + forwardDownloader.done_parts);
  console.log('Done piece: ' + forwardDownloader.pieceindex);
  
  sleep(2000);
  console.log('Resuming...');
  forwardDownloader.emit('resume');
  console.log('Done parts: ' + forwardDownloader.done_parts);
  console.log('Done piece: ' + forwardDownloader.pieceindex);
}

function cancelFileDownloadTest() {
  forwardDownloader.cancelFileDownload();
}

/*
 * Main entrance
 */
STARTTIME = new Date().getTime();
startFileDownloadTest();
//pauseFileDownloadTest();
//resumeFileDownloadTest();
//cancelFileDownloadTest();
