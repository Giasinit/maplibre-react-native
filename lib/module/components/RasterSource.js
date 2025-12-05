"use strict";

import { NativeModules, requireNativeComponent } from "react-native";
import { useAbstractSource } from "../hooks/useAbstractSource.js";
import { useOnce } from "../hooks/useOnce.js";
import { cloneReactChildrenWithProps } from "../utils/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNRasterSource";
const isTileTemplateUrl = url => !!url && (url.includes("{z}") || url.includes("{bbox-") || url.includes("{quadkey}"));
const MLRNRasterSource = requireNativeComponent(NATIVE_MODULE_NAME);

/**
 * RasterSource is a map content source that supplies raster image tiles to be shown on the map.
 * The location of and metadata about the tiles are defined either by an option dictionary
 * or by an external file that conforms to the TileJSON specification.
 */
export const RasterSource = ({
  id = MLRNModule.StyleSource.DefaultSourceID,
  ...props
}) => {
  useOnce(() => {
    if (props.url && props.tileUrlTemplates) {
      console.warn(`RasterSource 'url' property contains a Tile URL Template, but is intended for a StyleJSON URL. Please migrate your VectorSource to use: \`tileUrlTemplates=["${props.url}"]\` instead.`);
    }
  });
  const {
    setNativeRef
  } = useAbstractSource();
  let {
    url,
    tileUrlTemplates
  } = props;

  // Swapping url for tileUrlTemplates to provide backward compatiblity
  // when RasterSource supported only tile url as url prop
  if (isTileTemplateUrl(url)) {
    tileUrlTemplates = [url];
    url = undefined;
  }
  const allProps = {
    ...props,
    id,
    url,
    tileUrlTemplates,
    minZoomLevel: props.minZoomLevel,
    maxZoomLevel: props.maxZoomLevel,
    tileSize: props.tileSize,
    tms: props.tms,
    attribution: props.attribution
  };
  return /*#__PURE__*/_jsx(MLRNRasterSource, {
    ref: setNativeRef,
    ...allProps,
    children: cloneReactChildrenWithProps(props.children, {
      sourceID: id
    })
  });
};
//# sourceMappingURL=RasterSource.js.map