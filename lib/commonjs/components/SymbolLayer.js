"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SymbolLayer = exports.NATIVE_MODULE_NAME = void 0;
var _reactNative = require("react-native");
var _useAbstractLayer = require("../hooks/useAbstractLayer.js");
var _jsxRuntime = require("react/jsx-runtime");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNSymbolLayer";
const MLRNSymbolLayer = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);

/**
 * SymbolLayer is a style layer that renders icon and text labels at points or along lines on the map.
 */
const SymbolLayer = ({
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
  const updatedProps = {
    ...baseProps
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNSymbolLayer, {
    ref: setNativeLayer,
    ...updatedProps
  });
};
exports.SymbolLayer = SymbolLayer;
//# sourceMappingURL=SymbolLayer.js.map