"use strict";

import { NativeModules, requireNativeComponent } from "react-native";
import { useAbstractLayer } from "../hooks/useAbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNFillLayer";
const MLRNFillLayer = requireNativeComponent(NATIVE_MODULE_NAME);

/**
 * FillLayer is a style layer that renders one or more filled (and optionally stroked) polygons on the map.
 */
export const FillLayer = ({
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
  return /*#__PURE__*/_jsx(MLRNFillLayer, {
    ref: setNativeLayer,
    ...baseProps
  });
};
//# sourceMappingURL=FillLayer.js.map