"use strict";

import { useMemo, useRef } from "react";
import { processColor } from "react-native";
import { transformStyle } from "../utils/StyleValue.js";
import { getFilter } from "../utils/filterUtils.js";
export function useAbstractLayer(props) {
  const nativeLayer = useRef(null);
  const baseProps = useMemo(() => {
    return {
      ...props,
      id: props.id,
      sourceID: props.sourceID,
      reactStyle: transformStyle(props.style),
      minZoomLevel: props.minZoomLevel,
      maxZoomLevel: props.maxZoomLevel,
      aboveLayerID: props.aboveLayerID,
      belowLayerID: props.belowLayerID,
      layerIndex: props.layerIndex,
      filter: getFilter(props.filter),
      style: undefined
    };
  }, [props]);
  const setNativeLayer = instance => {
    nativeLayer.current = instance;
  };
  const getStyleTypeFormatter = styleType => {
    return styleType === "color" ? processColor : undefined;
  };
  const setNativeProps = nativeProps => {
    if (nativeLayer.current) {
      let propsToPass = nativeProps;
      if (nativeProps.style) {
        propsToPass = {
          ...nativeProps,
          reactStyle: transformStyle(props.style)
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