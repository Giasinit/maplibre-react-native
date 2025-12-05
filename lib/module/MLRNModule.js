"use strict";

import { NativeModules } from "react-native";
const MLRNModule = Object.create(NativeModules.MLRNModule);
export const {
  CameraModes,
  OfflinePackDownloadState,
  StyleSource,
  StyleURL,
  setAccessToken,
  getAccessToken,
  addCustomHeader,
  removeCustomHeader,
  setConnected
} = MLRNModule;
//# sourceMappingURL=MLRNModule.js.map