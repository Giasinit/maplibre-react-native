"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.CircleLayer = void 0;
var _reactNative = require("react-native");
var _useAbstractLayer = require("../hooks/useAbstractLayer.js");
var _jsxRuntime = require("react/jsx-runtime");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNCircleLayer";
const MLRNCircleLayer = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);

/**
 * CircleLayer is a style layer that renders one or more filled circles on the map.
 */
const CircleLayer = ({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNCircleLayer, {
    testID: "mlrnCircleLayer",
    ref: setNativeLayer,
    ...baseProps
  });
};
exports.CircleLayer = CircleLayer;
//# sourceMappingURL=CircleLayer.js.map