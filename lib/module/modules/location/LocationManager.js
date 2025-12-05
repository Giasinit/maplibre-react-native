"use strict";

import { NativeModules, NativeEventEmitter } from "react-native";
const MLRNModule = NativeModules.MLRNModule;
const MLRNLocationModule = NativeModules.MLRNLocationModule;
export const LocationModuleEventEmitter = new NativeEventEmitter(MLRNLocationModule);

/*
 * Location sent by LocationManager
 */

/*
 * Coordinates sent by LocationManager
 */

class LocationManager {
  constructor() {
    this._listeners = [];
    this._lastKnownLocation = null;
    this._isListening = false;
    this.onUpdate = this.onUpdate.bind(this);
    this.subscription = null;
  }
  async getLastKnownLocation() {
    if (!this._lastKnownLocation) {
      let lastKnownLocation;

      // as location can be brittle it might happen,
      // that we get an exception from native land
      // let's silently catch it and simply log out
      // instead of throwing an exception
      try {
        lastKnownLocation = await MLRNLocationModule.getLastKnownLocation();
      } catch (error) {
        console.log("LocationManager Error: ", error);
      }
      if (!this._lastKnownLocation && lastKnownLocation) {
        this._lastKnownLocation = lastKnownLocation;
      }
    }
    return this._lastKnownLocation;
  }
  addListener(listener) {
    if (!this._isListening) {
      this.start();
    }
    if (!this._listeners.includes(listener)) {
      this._listeners.push(listener);
      if (this._lastKnownLocation) {
        listener(this._lastKnownLocation);
      }
    }
  }
  removeListener(listener) {
    this._listeners = this._listeners.filter(l => l !== listener);
    if (this._listeners.length === 0) {
      this.stop();
    }
  }
  removeAllListeners() {
    this._listeners = [];
    this.stop();
  }
  start(displacement = 0) {
    if (!this._isListening) {
      MLRNLocationModule.start(displacement);
      this.subscription = LocationModuleEventEmitter.addListener(MLRNModule.LocationCallbackName.Update, this.onUpdate);
      this._isListening = true;
    }
  }
  stop() {
    MLRNLocationModule.stop();
    if (this._isListening) {
      this.subscription?.remove();
    }
    this._isListening = false;
  }
  setMinDisplacement(minDisplacement) {
    MLRNLocationModule.setMinDisplacement(minDisplacement);
  }
  onUpdate(location) {
    this._lastKnownLocation = location;
    this._listeners.forEach(l => l(location));
  }
}
const locationManager = new LocationManager();
export { locationManager as LocationManager };
//# sourceMappingURL=LocationManager.js.map