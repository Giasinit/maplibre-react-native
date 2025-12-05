"use strict";

import { NativeModules, requireNativeComponent } from "react-native";
import { useAbstractLayer } from "../hooks/useAbstractLayer.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNSymbolLayer";
const MLRNSymbolLayer = requireNativeComponent(NATIVE_MODULE_NAME);

/**
 * SymbolLayer is a style layer that renders icon and text labels at points or along lines on the map.
 */
export const SymbolLayer = ({
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
  const updatedProps = {
    ...baseProps
  };
  return /*#__PURE__*/_jsx(MLRNSymbolLayer, {
    ref: setNativeLayer,
    ...updatedProps
  });
};
//# sourceMappingURL=SymbolLayer.js.map