"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.FillExtrusionLayer = void 0;
var _reactNative = require("react-native");
var _useAbstractLayer = require("../hooks/useAbstractLayer.js");
var _jsxRuntime = require("react/jsx-runtime");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNFillExtrusionLayer";
const MLRNFillExtrusionLayer = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);

/**
 * FillExtrusionLayer is a style layer that renders one or more 3D extruded polygons on the map.
 */
const FillExtrusionLayer = ({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNFillExtrusionLayer, {
    ref: setNativeLayer,
    ...baseProps
  });
};
exports.FillExtrusionLayer = FillExtrusionLayer;
//# sourceMappingURL=FillExtrusionLayer.js.map