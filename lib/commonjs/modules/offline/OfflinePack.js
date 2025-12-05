"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OfflinePack = void 0;
var _reactNative = require("react-native");
const MLRNOfflineModule = _reactNative.NativeModules.MLRNOfflineModule;
class OfflinePack {
  constructor(pack) {
    this.pack = pack;
    this._metadata = null;
  }
  get name() {
    const {
      metadata
    } = this;
    return metadata && metadata.name;
  }
  get bounds() {
    return this.pack.bounds;
  }
  get metadata() {
    if (!this._metadata && this.pack.metadata) {
      this._metadata = JSON.parse(this.pack.metadata);
    }
    return this._metadata;
  }
  status() {
    return MLRNOfflineModule.getPackStatus(this.name);
  }
  resume() {
    return MLRNOfflineModule.resumePackDownload(this.name);
  }
  pause() {
    return MLRNOfflineModule.pausePackDownload(this.name);
  }
}
exports.OfflinePack = OfflinePack;
//# sourceMappingURL=OfflinePack.js.map