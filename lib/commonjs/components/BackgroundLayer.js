"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.BackgroundLayer = void 0;
var _reactNative = require("react-native");
var _useAbstractLayer = require("../hooks/useAbstractLayer.js");
var _jsxRuntime = require("react/jsx-runtime");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNBackgroundLayer";
const MLRNBackgroundLayer = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);
const BackgroundLayer = ({
  sourceID = MLRNModule.StyleSource.DefaultSourceID,
  ...props
}) => {
  const {
    baseProps,
    setNativeLayer
  } = (0, _useAbstractLayer.useAbstractLayer)({
    ...props,
    sourceID
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNBackgroundLayer, {
    testID: "mlrnBackgroundLayer",
    ref: setNativeLayer,
    ...baseProps
  });
};
exports.BackgroundLayer = BackgroundLayer;
//# sourceMappingURL=BackgroundLayer.js.map