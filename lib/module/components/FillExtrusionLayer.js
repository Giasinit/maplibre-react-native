"use strict";

import { NativeModules, requireNativeComponent } from "react-native";
import { useAbstractLayer } from "../hooks/useAbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNFillExtrusionLayer";
const MLRNFillExtrusionLayer = requireNativeComponent(NATIVE_MODULE_NAME);

/**
 * FillExtrusionLayer is a style layer that renders one or more 3D extruded polygons on the map.
 */
export const FillExtrusionLayer = ({
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
  return /*#__PURE__*/_jsx(MLRNFillExtrusionLayer, {
    ref: setNativeLayer,
    ...baseProps
  });
};
//# sourceMappingURL=FillExtrusionLayer.js.map