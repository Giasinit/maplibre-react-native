"use strict";

import { NativeModules, requireNativeComponent } from "react-native";
import { useAbstractLayer } from "../hooks/useAbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNLineLayer";
const MLRNLineLayer = requireNativeComponent(NATIVE_MODULE_NAME);

/**
 * LineLayer is a style layer that renders one or more stroked polylines on the map.
 */
export const LineLayer = ({
  sourceID = MLRNModule.StyleSource.DefaultSourceID,
  ...props
}) => {
  const {
    baseProps,
    setNativeLayer
  } = useAbstractLayer({
    ...props,
    sourceID
  });
  return /*#__PURE__*/_jsx(MLRNLineLayer, {
    ref: setNativeLayer,
    ...baseProps
  });
};
//# sourceMappingURL=LineLayer.js.map