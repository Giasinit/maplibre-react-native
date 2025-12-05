"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OfflineCreatePackOptions = void 0;
var _makeNativeBounds = require("../../utils/makeNativeBounds.js");
class OfflineCreatePackOptions {
  constructor(options) {
    this._assert(options);
    this.name = options.name;
    this.styleURL = options.styleURL;
    this.bounds = (0, _makeNativeBounds.makeNativeBounds)(...options.bounds);
    this.minZoom = options.minZoom;
    this.maxZoom = options.maxZoom;
    this.metadata = this._makeMetadata(options.metadata);
  }
  _assert(options) {
    if (!options.styleURL) {
      throw new Error("Style URL must be provided for creating an offline pack");
    }
    if (!options.name) {
      throw new Error("Name must be provided for creating an offline pack");
    }
    if (!options.bounds) {
      throw new Error("Bounds must be provided for creating an offline pack");
    }
  }
  _makeMetadata(metadata) {
    return JSON.stringify({
      ...metadata,
      name: this.name
    });
  }
}
exports.OfflineCreatePackOptions = OfflineCreatePackOptions;
//# sourceMappingURL=OfflineCreatePackOptions.js.map