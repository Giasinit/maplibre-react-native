"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.MarkerView = void 0;
var _helpers = require("@turf/helpers");
var _react = require("react");
var _reactNative = require("react-native");
var _PointAnnotation = require("./PointAnnotation.js");
var _index = require("../utils/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNMarkerView";
/**
 * MarkerView allows you to place a interactive react native marker to the map.
 *
 * If you have static view consider using PointAnnotation or SymbolLayer they'll offer much better performance
 * .
 * This is based on [MakerView plugin](https://github.com/maplibre/maplibre-plugins-android/tree/main/plugin-markerview) on Android
 * and PointAnnotation on iOS.
 */
const MarkerView = ({
  anchor = {
    x: 0.5,
    y: 0.5
  },
  allowOverlap = false,
  isSelected = false,
  ...rest
}) => {
  const props = {
    anchor,
    allowOverlap,
    isSelected,
    ...rest
  };
  const coordinate = props.coordinate ? (0, _index.toJSONString)((0, _helpers.point)(props.coordinate)) : undefined;
  const idForPointAnnotation = (0, _react.useMemo)(() => {
    lastId = lastId + 1;
    return `MV-${lastId}`;
  }, []);
  if (_reactNative.Platform.OS === "ios") {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PointAnnotation.PointAnnotation, {
      id: idForPointAnnotation,
      ...props
    });
  }
  const propsToSend = {
    ...props,
    coordinate
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNMarkerView, {
    ...propsToSend,
    children: props.children
  });
};
exports.MarkerView = MarkerView;
let lastId = 0;
const MLRNMarkerView = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);
//# sourceMappingURL=MarkerView.js.map