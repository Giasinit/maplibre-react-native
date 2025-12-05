"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.LineLayer = void 0;
var _reactNative = require("react-native");
var _useAbstractLayer = require("../hooks/useAbstractLayer.js");
var _jsxRuntime = require("react/jsx-runtime");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNLineLayer";
const MLRNLineLayer = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);

/**
 * LineLayer is a style layer that renders one or more stroked polylines on the map.
 */
const LineLayer = ({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNLineLayer, {
    ref: setNativeLayer,
    ...baseProps
  });
};
exports.LineLayer = LineLayer;
//# sourceMappingURL=LineLayer.js.map