"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConnected = exports.setAccessToken = exports.removeCustomHeader = exports.getAccessToken = exports.addCustomHeader = exports.StyleURL = exports.StyleSource = exports.OfflinePackDownloadState = exports.CameraModes = void 0;
var _reactNative = require("react-native");
const MLRNModule = Object.create(_reactNative.NativeModules.MLRNModule);
const {
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
exports.setConnected = setConnected;
exports.removeCustomHeader = removeCustomHeader;
exports.addCustomHeader = addCustomHeader;
exports.getAccessToken = getAccessToken;
exports.setAccessToken = setAccessToken;
exports.StyleURL = StyleURL;
exports.StyleSource = StyleSource;
exports.OfflinePackDownloadState = OfflinePackDownloadState;
exports.CameraModes = CameraModes;
//# sourceMappingURL=MLRNModule.js.map