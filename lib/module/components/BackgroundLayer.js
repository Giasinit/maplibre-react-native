"use strict";

import { NativeModules, requireNativeComponent } from "react-native";
import { useAbstractLayer } from "../hooks/useAbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNBackgroundLayer";
const MLRNBackgroundLayer = requireNativeComponent(NATIVE_MODULE_NAME);
export const BackgroundLayer = ({
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
  return /*#__PURE__*/_jsx(MLRNBackgroundLayer, {
    testID: "mlrnBackgroundLayer",
    ref: setNativeLayer,
    ...baseProps
  });
};
//# sourceMappingURL=BackgroundLayer.js.map