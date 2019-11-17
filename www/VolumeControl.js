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
  setCurrentVolume.call(this);
}

function setCurrentVolume(value){
  if(value){
    this.currentVolume = value;
  } else {
    getVolume(
      function(value){
        this.currentVolume = value;
      }.bind(this), 
      function(error){
        console.error("VolumeControl: Failed to initialize volume.", error);
      }, 
      'VolumeControl', 'getVolume', []);
  }
}

function getVolume(success, error) {
  exec(success, error, 'VolumeControl', 'getVolume', []);
};

VolumeControl.prototype.isMuted = function(success, error) {
  exec(function(value){
    if(value === 0){
      success(true);
    } else {
      success(false);
    }
  }, error, 'VolumeControl', 'isMuted', []);
};

VolumeControl.prototype.getVolume = getVolume;

VolumeControl.prototype.setVolume = function(volume, success, error) {
  if (volume > 1) {
    volume /= 100;
  }
  exec(function(){
    setCurrentVolume(volume);
    success(volume);
  }, error, 'VolumeControl', 'setVolume', [volume * 1]);
};

VolumeControl.prototype.toggleMute = function( success, error) {
  exec(function(value){
    if(value === 0){
      console.info('VolumeControl: Muted.');
      success(true);
    } else {
      console.info('VolumeControl: Unmuted.');
      success(false);
    }
  }, error, 'VolumeControl', 'toggleMute', [this.currentVolume]);
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
