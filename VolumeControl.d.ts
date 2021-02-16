// Type definitions for cordova.plugins.VolumeControl

/// <reference types="cordova"/>

interface VolumeControl {
    setVolume(
        volume: number,
        successCallback: (volume: number) => void,
        errorCallback: (error) => void
    ),
    getVolume(
        successCallback: (volume: number) => void,
        errorCallback: (error) => void
    ),
    isMuted(
        successCallback: (isMuted: boolean) => void,
        errorCallback: (error) => void
    ),
    toggleMute(
        successCallback: (isMuted: boolean) => void,
        errorCallback: (error) => void
    )
}

interface CordovaPlugins {
    VolumeControl: VolumeControl
}
