"use strict";

var exec = require('cordova/exec');

// function defaults(object, source) {
//   if(!object) object = {};
//   for(var prop in source) {
//     if(typeof object[prop] === 'undefined') {
//       object[prop] = source[prop];
//     }
//   }
//   return object;
// }

function VolumeControl(){
  this.currentVolume = null;
  initializeVolume.call(this);
}

function initializeVolume(){
  exec(
    function(value){
      this.currentVolume = value;
    }.bind(this), 
    function(error){
      console.error("VolumeControl: Failed to initialize volume.", error);
    }, 
    'VolumeControl', 'getVolume', []);
}

VolumeControl.prototype.isMuted = function(success, error) {
  exec(success, error, 'VolumeControl', 'isMuted', []);
};

VolumeControl.prototype.getVolume = function(success, error) {
  exec(success, error, 'VolumeControl', 'getVolume', []);
};

VolumeControl.prototype.setVolume = function(volume, success, error) {
  if (volume > 1) {
    volume /= 100;
  }
  exec(success, error, 'VolumeControl', 'setVolume', [volume * 1]);
};

VolumeControl.prototype.toggleMute = function( success, error) {
  exec(success, error, 'VolumeControl', 'toggleMute', [this.currentVolume]);
};

module.exports = new VolumeControl();

/*
exports.getCategory = function(success, error) {
  exec(success, error, 'VolumeControl', 'getCategory', []);
};

exports.hideVolume = function(success, error) {
  exec(success, error, 'VolumeControl', 'hideVolume', []);
};
*/
