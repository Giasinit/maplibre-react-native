"use strict";

import { point } from "@turf/helpers";
import { useMemo } from "react";
import { Platform, requireNativeComponent } from "react-native";
import { PointAnnotation } from "./PointAnnotation.js";
import { toJSONString } from "../utils/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const NATIVE_MODULE_NAME = "MLRNMarkerView";
/**
 * MarkerView allows you to place a interactive react native marker to the map.
 *
 * If you have static view consider using PointAnnotation or SymbolLayer they'll offer much better performance
 * .
 * This is based on [MakerView plugin](https://github.com/maplibre/maplibre-plugins-android/tree/main/plugin-markerview) on Android
 * and PointAnnotation on iOS.
 */
export const MarkerView = ({
  anchor = {
    x: 0.5,
    y: 0.5
  },
  allowOverlap = false,
  isSelected = false,
  ...rest
}) => {
  const props = {
    anchor,
    allowOverlap,
    isSelected,
    ...rest
  };
  const coordinate = props.coordinate ? toJSONString(point(props.coordinate)) : undefined;
  const idForPointAnnotation = useMemo(() => {
    lastId = lastId + 1;
    return `MV-${lastId}`;
  }, []);
  if (Platform.OS === "ios") {
    return /*#__PURE__*/_jsx(PointAnnotation, {
      id: idForPointAnnotation,
      ...props
    });
  }
  const propsToSend = {
    ...props,
    coordinate
  };
  return /*#__PURE__*/_jsx(MLRNMarkerView, {
    ...propsToSend,
    children: props.children
  });
};
let lastId = 0;
const MLRNMarkerView = requireNativeComponent(NATIVE_MODULE_NAME);
//# sourceMappingURL=MarkerView.js.map