"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAbstractLayer = useAbstractLayer;
var _react = require("react");
var _reactNative = require("react-native");
var _StyleValue = require("../utils/StyleValue.js");
var _filterUtils = require("../utils/filterUtils.js");
function useAbstractLayer(props) {
  const nativeLayer = (0, _react.useRef)(null);
  const baseProps = (0, _react.useMemo)(() => {
    return {
      ...props,
      id: props.id,
      sourceID: props.sourceID,
      reactStyle: (0, _StyleValue.transformStyle)(props.style),
      minZoomLevel: props.minZoomLevel,
      maxZoomLevel: props.maxZoomLevel,
      aboveLayerID: props.aboveLayerID,
      belowLayerID: props.belowLayerID,
      layerIndex: props.layerIndex,
      filter: (0, _filterUtils.getFilter)(props.filter),
      style: undefined
    };
  }, [props]);
  const setNativeLayer = instance => {
    nativeLayer.current = instance;
  };
  const getStyleTypeFormatter = styleType => {
    return styleType === "color" ? _reactNative.processColor : undefined;
  };
  const setNativeProps = nativeProps => {
    if (nativeLayer.current) {
      let propsToPass = nativeProps;
      if (nativeProps.style) {
        propsToPass = {
          ...nativeProps,
          reactStyle: (0, _StyleValue.transformStyle)(props.style)
        };
      }
      nativeLayer.current.setNativeProps(propsToPass);
    }
  };
  return {
    baseProps,
    setNativeLayer,
    getStyleTypeFormatter,
    setNativeProps
  };
}
//# sourceMappingURL=useAbstractLayer.js.map