"use strict";

import { requireNativeComponent } from "react-native";
import { useAbstractSource } from "../hooks/useAbstractSource.js";
import { cloneReactChildrenWithProps, isNumber, resolveImagePath } from "../utils/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const NATIVE_MODULE_NAME = "MLRNImageSource";
const MLRNImageSource = requireNativeComponent(NATIVE_MODULE_NAME);

/**
 * ImageSource is a content source that is used for a georeferenced raster image to be shown on the map.
 * The georeferenced image scales and rotates as the user zooms and rotates the map
 */
export const ImageSource = props => {
  const {
    setNativeRef
  } = useAbstractSource();
  const _getURL = () => {
    return isNumber(props.url) ? resolveImagePath(props.url) : props.url;
  };
  if (!props.url || !props.coordinates || !props.coordinates.length) {
    return null;
  }
  const allProps = {
    ...props,
    url: _getURL()
  };
  return /*#__PURE__*/_jsx(MLRNImageSource, {
    ref: setNativeRef,
    ...allProps,
    children: cloneReactChildrenWithProps(allProps.children, {
      sourceID: allProps.id
    })
  });
};
//# sourceMappingURL=ImageSource.js.map