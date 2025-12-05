"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RasterSource = exports.NATIVE_MODULE_NAME = void 0;
var _reactNative = require("react-native");
var _useAbstractSource = require("../hooks/useAbstractSource.js");
var _useOnce = require("../hooks/useOnce.js");
var _index = require("../utils/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNRasterSource";
const isTileTemplateUrl = url => !!url && (url.includes("{z}") || url.includes("{bbox-") || url.includes("{quadkey}"));
const MLRNRasterSource = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);

/**
 * RasterSource is a map content source that supplies raster image tiles to be shown on the map.
 * The location of and metadata about the tiles are defined either by an option dictionary
 * or by an external file that conforms to the TileJSON specification.
 */
const RasterSource = ({
  id = MLRNModule.StyleSource.DefaultSourceID,
  ...props
}) => {
  (0, _useOnce.useOnce)(() => {
    if (props.url && props.tileUrlTemplates) {
      console.warn(`RasterSource 'url' property contains a Tile URL Template, but is intended for a StyleJSON URL. Please migrate your VectorSource to use: \`tileUrlTemplates=["${props.url}"]\` instead.`);
    }
  });
  const {
    setNativeRef
  } = (0, _useAbstractSource.useAbstractSource)();
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNRasterSource, {
    ref: setNativeRef,
    ...allProps,
    children: (0, _index.cloneReactChildrenWithProps)(props.children, {
      sourceID: id
    })
  });
};
exports.RasterSource = RasterSource;
//# sourceMappingURL=RasterSource.js.map