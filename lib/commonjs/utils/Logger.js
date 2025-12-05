"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;
var _reactNative = require("react-native");
const MLRNLogging = _reactNative.NativeModules.MLRNLogging;
class Logger {
  static instance = null;
  static sharedInstance() {
    if (this.instance === null) {
      this.instance = new Logger();
    }
    return this.instance;
  }
  constructor() {
    this.loggerEmitter = new _reactNative.NativeEventEmitter(MLRNLogging);
    this.startedCount = 0;
    this.logCallback = null;
    this.subscription = null;
  }

  /**
   * Set custom logger function.
   * @param {Logger~logCallback} logCallback - callback taking a log object as param. If callback return falsy value then
   * default logging will take place.
   */
  static setLogCallback(logCallback) {
    this.sharedInstance().setLogCallback(logCallback);
  }

  /**
   * Set custom logger function.
   * @param {Logger~logCallback} logCallback - callback taking a log object as param. If callback return falsy value then
   * default logging will take place.
   */
  setLogCallback(logCallback) {
    this.logCallback = logCallback;
  }

  /**
   * This callback is displayed as part of the Requester class.
   * @callback Logger~logCallback
   * @param {object} log
   * @param {string} log.message - the message of the log
   * @param {string} log.level - log level
   * @param {string} log.tag - optional tag used on android
   */

  /**
   * setLogLevel
   * @param {LogLevel} level
   */
  static setLogLevel(level) {
    MLRNLogging.setLogLevel(level);
  }

  /**
   * @type {('error'|'warning'|'info'|'debug'|'verbose')} LogLevel - Supported log levels
   */

  start() {
    if (this.startedCount === 0) {
      this.subscribe();
    }
    this.startedCount += 1;
  }
  stop() {
    this.startedCount -= 1;
    if (this.startedCount === 0) {
      this.unsubscribe();
    }
  }
  subscribe() {
    this.subscription = this.loggerEmitter.addListener("LogEvent", log => {
      this.onLog(log);
    });
  }
  unsubscribe() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }
  effectiveLevel({
    level,
    message,
    tag
  }) {
    if (level === "warning") {
      if (tag === "Mbgl-HttpRequest" && message.startsWith("Request failed due to a permanent error: Canceled")) {
        // this seems to happening too much to show a warning every time
        return "info";
      }
    }
    return level;
  }
  onLog(log) {
    if (!this.logCallback || !this.logCallback(log)) {
      const {
        message
      } = log;
      const level = this.effectiveLevel(log);
      if (level === "error") {
        console.error("MapLibre error", message, log);
      } else if (level === "warning") {
        console.warn("MapLibre warning", message, log);
      } else {
        console.log(`MapLibre [${level}]`, message, log);
      }
    }
  }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map