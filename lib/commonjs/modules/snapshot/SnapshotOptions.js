"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotOptions = void 0;
var _helpers = require("@turf/helpers");
var _reactNative = require("react-native");
var _index = require("../../utils/index.js");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
class SnapshotOptions {
  constructor(options) {
    if (!options.centerCoordinate && !options.bounds) {
      throw new Error("Center coordinate or bounds must be supplied in order to take a snapshot");
    }
    this.styleURL = options.styleURL || MLRNModule.StyleURL.Default;
    this.heading = options.heading || 0.0;
    this.pitch = options.pitch || 0.0;
    this.zoomLevel = options.zoomLevel || 16.0;
    this.width = options.width || 50.0;
    this.height = options.height || 50.0;
    this.writeToDisk = options.writeToDisk || false;
    this.withLogo = options.withLogo === undefined ? true : options.withLogo;
    if (options.centerCoordinate) {
      this.centerCoordinate = this._createCenterCoordPoint(options.centerCoordinate);
    }
    if (options.bounds) {
      this.bounds = this._createBoundsCollection(options.bounds);
    }
  }
  toJSON() {
    return {
      styleURL: this.styleURL,
      heading: this.heading,
      pitch: this.pitch,
      zoomLevel: this.zoomLevel,
      width: this.width,
      height: this.height,
      writeToDisk: this.writeToDisk,
      centerCoordinate: this.centerCoordinate,
      bounds: this.bounds,
      withLogo: this.withLogo
    };
  }
  _createCenterCoordPoint(centerCoordinate) {
    return (0, _index.toJSONString)((0, _helpers.point)(centerCoordinate));
  }
  _createBoundsCollection(bounds) {
    const features = [];
    for (const bound of bounds) {
      features.push((0, _helpers.point)(bound));
    }
    return (0, _index.toJSONString)((0, _helpers.featureCollection)(features));
  }
}
exports.SnapshotOptions = SnapshotOptions;
//# sourceMappingURL=SnapshotOptions.js.map