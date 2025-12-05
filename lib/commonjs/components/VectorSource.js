"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VectorSource = exports.NATIVE_MODULE_NAME = void 0;
var _helpers = require("@turf/helpers");
var _react = require("react");
var _reactNative = require("react-native");
var _useAbstractSource = require("../hooks/useAbstractSource.js");
var _useNativeBridge = require("../hooks/useNativeBridge.js");
var _index = require("../utils/index.js");
var _filterUtils = require("../utils/filterUtils.js");
var _jsxRuntime = require("react/jsx-runtime");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNVectorSource";
const MLRNVectorSource = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);

/**
 * VectorSource is a map content source that supplies tiled vector data in Mapbox Vector Tile format to be shown on the map.
 * The location of and metadata about the tiles are defined either by an option dictionary or by an external file that conforms to the TileJSON specification.
 */
const VectorSource = exports.VectorSource = /*#__PURE__*/(0, _react.memo)(/*#__PURE__*/(0, _react.forwardRef)(({
  id = MLRNModule.StyleSource.DefaultSourceID,
  ...props
}, ref) => {
  // * exposes the methods of the function component so we don't break projects that depend on calling this methods
  (0, _react.useImperativeHandle)(ref, () => ({
    /**
     * Returns all features that match the query parameters regardless of whether or not the feature is
     * currently rendered on the map. The domain of the query includes all currently-loaded vector tiles
     * and GeoJSON source tiles. This function does not check tiles outside of the visible viewport.
     *
     * @example
     * vectorSource.features(['id1', 'id2'])
     *
     * @param  {Array=} layerIDs - A set of strings that correspond to the names of layers defined in the current style. Only the features contained in these layers are included in the returned array.
     * @param  {Array=} filter - an optional filter statement to filter the returned Features.
     * @return {GeoJSON.FeatureCollection}
     */
    features,
    onPress
  }));
  const {
    _runNativeCommand,
    //  _runPendingNativeCommands,
    _onAndroidCallback
  } = (0, _useNativeBridge.useNativeBridge)(NATIVE_MODULE_NAME);
  const {
    setNativeRef,
    _nativeRef
  } = (0, _useAbstractSource.useAbstractSource)();

  // const _setNativeRef = (
  //   nativeRef: (Component<NativeProps> & Readonly<NativeMethods>) | null,
  // ): void => {
  //   if (nativeRef) {
  //     setNativeRef(nativeRef);
  //     _runPendingNativeCommands(nativeRef);
  //   }
  // };

  const features = async (layerIDs = [], filter) => {
    if (!_nativeRef) {
      return (0, _helpers.featureCollection)([]);
    }
    const res = await _runNativeCommand("features", _nativeRef, [[[layerIDs, (0, _filterUtils.getFilter)(filter)]]]);
    if ((0, _index.isAndroid)()) {
      return JSON.parse(res?.data);
    }
    return res.data;
  };
  const onPress = event => {
    const {
      onPress
    } = props;
    if (!onPress) {
      return;
    }
    const {
      nativeEvent: {
        payload: {
          features,
          coordinates,
          point
        }
      }
    } = event;
    onPress({
      features,
      coordinates,
      point
    });
  };
  const allProps = {
    id,
    url: props.url,
    tileUrlTemplates: props.tileUrlTemplates,
    minZoomLevel: props.minZoomLevel,
    maxZoomLevel: props.maxZoomLevel,
    tms: props.tms,
    attribution: props.attribution,
    hitbox: props.hitbox,
    hasPressListener: (0, _index.isFunction)(props.onPress),
    onMapboxVectorSourcePress: onPress,
    onPress: undefined,
    onAndroidCallback: (0, _index.isAndroid)() ? _onAndroidCallback : undefined
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNVectorSource, {
    ref: setNativeRef,
    ...allProps,
    children: (0, _index.cloneReactChildrenWithProps)(props.children, {
      sourceID: id
    })
  });
}));
//# sourceMappingURL=VectorSource.js.map