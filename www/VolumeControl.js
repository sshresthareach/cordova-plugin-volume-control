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
    getRealVolume(
      function(value){
        this.currentVolume = value;
      }.bind(this), 
      function(error){
        console.error("VolumeControl: Failed to initialize volume.", error);
      }, 
      'VolumeControl', 'getVolume', []);
  }
}

function getRealVolume(success, error) {
  if(!isFunction(success)){
    throw new Error('VolumeControl: Success callback is required');
  }
  exec(success, error, 'VolumeControl', 'getVolume', []);
};

VolumeControl.prototype.isMuted = function(success, error) {
  if(!isFunction(success)){
    throw new Error('VolumeControl: Success callback is required');
  }
  exec(function(value){
    if(value === 0){
      success(true);
    } else {
      success(false);
    }
  }, error, 'VolumeControl', 'isMuted', []);
};

VolumeControl.prototype.getVolume = function getVolume(success, failure){
  if(!isFunction(success)){
    throw new Error('VolumeControl: Success callback is required');
  }
  getRealVolume(function(value){
    var volume = Math.round(value * 10);
    success(volume)
  }, failure);
};

VolumeControl.prototype.setVolume = function(volume, success, error) {
  if(!isFunction(success)){
    throw new Error('VolumeControl: Success callback is required');
  }
  volume = volume / 10;
  if (volume > 1) {
    volume /= 100;
  }
  exec(function(){
    setCurrentVolume.call(this, volume);
    success(volume * 10);
  }.bind(this), error, 'VolumeControl', 'setVolume', [volume * 1]);
};

VolumeControl.prototype.toggleMute = function( success, error) {
  if(!isFunction(success)){
    throw new Error('VolumeControl: Success callback is required');
  }
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
function isFunction(value) {
    return (
        value &&
        (Object.prototype.toString.call(value) === '[object Function]' ||
            'function' === typeof value ||
            value instanceof Function)
    );
}