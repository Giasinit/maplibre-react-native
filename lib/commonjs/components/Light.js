"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.Light = void 0;
var _reactNative = require("react-native");
var _useAbstractLayer = require("../hooks/useAbstractLayer.js");
var _jsxRuntime = require("react/jsx-runtime");
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNLight";
const MLRNLight = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);

/**
 * Light represents the light source for extruded geometries
 */
const Light = props => {
  const {
    baseProps,
    setNativeLayer
  } = (0, _useAbstractLayer.useAbstractLayer)({
    ...props
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNLight, {
    ref: setNativeLayer,
    testID: "mlrnLight",
    ...baseProps
  });
};
exports.Light = Light;
//# sourceMappingURL=Light.js.map