"use strict";

import { NativeModules, requireNativeComponent } from "react-native";
import { useAbstractLayer } from "../hooks/useAbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNRasterLayer";
const MLRNRasterLayer = requireNativeComponent(NATIVE_MODULE_NAME);
export const RasterLayer = ({
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
  return /*#__PURE__*/_jsx(MLRNRasterLayer, {
    ref: setNativeLayer,
    ...baseProps
  });
};
//# sourceMappingURL=RasterLayer.js.map