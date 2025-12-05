"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.ImageSource = void 0;
var _reactNative = require("react-native");
var _useAbstractSource = require("../hooks/useAbstractSource.js");
var _index = require("../utils/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNImageSource";
const MLRNImageSource = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);

/**
 * ImageSource is a content source that is used for a georeferenced raster image to be shown on the map.
 * The georeferenced image scales and rotates as the user zooms and rotates the map
 */
const ImageSource = props => {
  const {
    setNativeRef
  } = (0, _useAbstractSource.useAbstractSource)();
  const _getURL = () => {
    return (0, _index.isNumber)(props.url) ? (0, _index.resolveImagePath)(props.url) : props.url;
  };
  if (!props.url || !props.coordinates || !props.coordinates.length) {
    return null;
  }
  const allProps = {
    ...props,
    url: _getURL()
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNImageSource, {
    ref: setNativeRef,
    ...allProps,
    children: (0, _index.cloneReactChildrenWithProps)(allProps.children, {
      sourceID: allProps.id
    })
  });
};
exports.ImageSource = ImageSource;
//# sourceMappingURL=ImageSource.js.map