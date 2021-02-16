"use strict";

var exec = require('cordova/exec');
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
    success(volume);
  }, failure);
};

VolumeControl.prototype.setVolume = function(paramVolume, success, error) {
  if(!isFunction(success)){
    throw new Error('VolumeControl: Success callback is required');
  }
  var volume = paramVolume;
  volume = volume / 10;
  if (volume > 1) {
    volume /= 100;
  }
  exec(function(){
    setCurrentVolume.call(this, volume);
    success(paramVolume);
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
  }, error, 'VolumeControl', 'toggleMute', [parseFloat(this.currentVolume) || 0.1]);
};

module.exports = new VolumeControl();

function isFunction(value) {
    return (
        value &&
        (Object.prototype.toString.call(value) === '[object Function]' ||
            'function' === typeof value ||
            value instanceof Function)
    );
}
