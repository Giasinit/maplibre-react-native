"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneReactChildrenWithProps = cloneReactChildrenWithProps;
exports.existenceChange = existenceChange;
exports.isAndroid = isAndroid;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isPrimitive = isPrimitive;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.resolveImagePath = resolveImagePath;
exports.runNativeCommand = runNativeCommand;
exports.toJSONString = toJSONString;
var _react = require("react");
var _reactNative = require("react-native");
function isAndroid() {
  return _reactNative.Platform.OS === "android";
}
function existenceChange(cur, next) {
  if (!cur && !next) {
    return false;
  }
  return !cur && next || cur && !next;
}
function isFunction(fn) {
  return typeof fn === "function";
}
function isNumber(num) {
  return typeof num === "number" && !Number.isNaN(num);
}
function isUndefined(obj) {
  return typeof obj === "undefined";
}
function isString(str) {
  return typeof str === "string";
}
function isBoolean(bool) {
  return typeof bool === "boolean";
}
function isPrimitive(value) {
  return isString(value) || isNumber(value) || isBoolean(value);
}
function runNativeCommand(module, name, nativeRef, args = []) {
  const handle = (0, _reactNative.findNodeHandle)(nativeRef);
  if (!handle) {
    throw new Error(`Could not find handle for native ref ${module}.${name}`);
  }
  const managerInstance = isAndroid() ? _reactNative.UIManager.getViewManagerConfig(module) : _reactNative.NativeModules[module];
  if (!managerInstance) {
    throw new Error(`Could not find ${module}`);
  }
  if (isAndroid()) {
    _reactNative.UIManager.dispatchViewManagerCommand(handle, managerInstance.Commands[name], args);

    // Android uses callback instead of return
    return null;
  }
  return managerInstance[name](handle, ...args);
}
function cloneReactChildrenWithProps(children, propsToAdd = {}) {
  if (!children) {
    return undefined;
  }
  let foundChildren = null;
  if (!Array.isArray(children)) {
    foundChildren = [children];
  } else {
    foundChildren = children;
  }
  const filteredChildren = foundChildren.filter(child => !!child); // filter out falsy children, since some can be null
  return _react.Children.map(filteredChildren, child => /*#__PURE__*/(0, _react.cloneElement)(child, propsToAdd));
}
function resolveImagePath(imageRef) {
  const res = _reactNative.Image.resolveAssetSource(imageRef);
  return res.uri;
}
function toJSONString(json = "") {
  return JSON.stringify(json);
}
//# sourceMappingURL=index.js.map