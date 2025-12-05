"use strict";

import { requireNativeComponent } from "react-native";
import { useAbstractLayer } from "../hooks/useAbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const NATIVE_MODULE_NAME = "MLRNLight";
const MLRNLight = requireNativeComponent(NATIVE_MODULE_NAME);

/**
 * Light represents the light source for extruded geometries
 */
export const Light = props => {
  const {
    baseProps,
    setNativeLayer
  } = useAbstractLayer({
    ...props
  });
  return /*#__PURE__*/_jsx(MLRNLight, {
    ref: setNativeLayer,
    testID: "mlrnLight",
    ...baseProps
  });
};
//# sourceMappingURL=Light.js.map