#!/usr/bin/env node
/* vim: set expandtab sw=2 ts=2 : */

var io = require('socket.io').listen(8099);
var ChartRoom = require('./ChartRoom.js');

chartroom = new ChartRoom(io);
chartroom.start();
