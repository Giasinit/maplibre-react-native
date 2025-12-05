"use strict";

import { NativeModules } from "react-native";
const MLRNOfflineModule = NativeModules.MLRNOfflineModule;
export class OfflinePack {
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
//# sourceMappingURL=OfflinePack.js.map