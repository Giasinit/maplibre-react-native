"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShapeSource = exports.NATIVE_MODULE_NAME = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _useNativeBridge = require("../hooks/useNativeBridge.js");
var _index = require("../utils/index.js");
var _filterUtils = require("../utils/filterUtils.js");
var _jsxRuntime = require("react/jsx-runtime");
const MLRNModule = _reactNative.NativeModules.MLRNModule;
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNShapeSource";
/**
 * ShapeSource is a map content source that supplies vector shapes to be shown on the map.
 * The shape may be a url or a GeoJSON object
 */
const ShapeSource = exports.ShapeSource = /*#__PURE__*/(0, _react.memo)(/*#__PURE__*/(0, _react.forwardRef)(({
  id: shapeId = MLRNModule.StyleSource.DefaultSourceID,
  ...props
}, ref) => {
  (0, _react.useImperativeHandle)(ref, () => ({
    ..._nativeRef.current,
    /**
     * Returns all features from the source that match the query parameters regardless of whether or not the feature is
     * currently rendered on the map.
     *
     * @example
     * shapeSource.features()
     *
     * @param  {Array=} filter - an optional filter statement to filter the returned Features.
     * @return {GeoJSON.FeatureCollection}
     */
    features,
    /**
     * Returns the zoom needed to expand the cluster.
     *
     * @example
     * const zoom = await shapeSource.getClusterExpansionZoom(clusterId);
     *
     * @param  {GeoJSON.Feature} feature - The feature cluster to expand.
     * @return {number}
     */
    getClusterExpansionZoom,
    /**
     * Returns the FeatureCollection from the cluster.
     *
     * @example
     * const collection = await shapeSource.getClusterLeaves(clusterId, limit, offset);
     *
     * @param  {GeoJSON.Feature} feature - The feature cluster to expand.
     * @param  {number} limit - The number of points to return.
     * @param  {number} offset - The amount of points to skip (for pagination).
     * @return {GeoJSON.FeatureCollection}
     */
    getClusterLeaves,
    /**
     * Returns the FeatureCollection from the cluster (on the next zoom level).
     *
     * @example
     * const collection = await shapeSource.getClusterChildren(clusterId);
     *
     * @param  {GeoJSON.Feature} feature - The feature cluster to expand.
     * @return {GeoJSON.FeatureCollection}
     */
    getClusterChildren,
    setNativeProps,
    onPress,
    _nativeRef: _nativeRef.current
  }));
  const _nativeRef = (0, _react.useRef)();
  const {
    _runNativeCommand,
    _runPendingNativeCommands,
    _onAndroidCallback
  } = (0, _useNativeBridge.useNativeBridge)(NATIVE_MODULE_NAME);
  const _setNativeRef = nativeRef => {
    _nativeRef.current = nativeRef;
    _runPendingNativeCommands(nativeRef);
  };
  async function features(filter) {
    const res = await _runNativeCommand("features", _nativeRef.current, [(0, _filterUtils.getFilter)(filter)]);
    if ((0, _index.isAndroid)()) {
      return JSON.parse(res.data);
    }
    return res.data;
  }
  async function getClusterExpansionZoom(feature) {
    const res = await _runNativeCommand("getClusterExpansionZoom", _nativeRef.current, [JSON.stringify(feature)]);
    return res.data;
  }
  async function getClusterLeaves(feature, limit, offset) {
    const res = await _runNativeCommand("getClusterLeaves", _nativeRef.current, [JSON.stringify(feature), limit, offset]);
    if ((0, _index.isAndroid)()) {
      return JSON.parse(res.data);
    }
    return res.data;
  }
  async function getClusterChildren(feature) {
    const res = await _runNativeCommand("getClusterChildren", _nativeRef.current, [JSON.stringify(feature)]);
    if ((0, _index.isAndroid)()) {
      return JSON.parse(res.data);
    }
    return res.data;
  }
  function setNativeProps(nativeProps) {
    if (!_nativeRef.current) {
      return;
    }
    const shallowProps = Object.assign({}, nativeProps);

    // Adds support for Animated
    if (shallowProps.shape && typeof shallowProps.shape !== "string") {
      shallowProps.shape = JSON.stringify(shallowProps.shape);
    }
    _nativeRef.current.setNativeProps(shallowProps);
  }
  function _getShape() {
    if (!props.shape) {
      return undefined;
    }
    return (0, _index.toJSONString)(props.shape);
  }
  function onPress(event) {
    const {
      nativeEvent: {
        payload: {
          features,
          coordinates,
          point
        }
      }
    } = event;
    if (props.onPress) {
      props.onPress({
        features,
        coordinates,
        point
      });
    }
  }
  const shapeProps = {
    id: shapeId,
    url: props.url,
    shape: _getShape(),
    hitbox: props.hitbox,
    hasPressListener: (0, _index.isFunction)(props.onPress),
    onMapboxShapeSourcePress: onPress.bind(void 0),
    cluster: props.cluster ? 1 : 0,
    clusterRadius: props.clusterRadius,
    clusterMinPoints: props.clusterMinPoints,
    clusterMaxZoomLevel: props.clusterMaxZoomLevel,
    clusterProperties: props.clusterProperties,
    maxZoomLevel: props.maxZoomLevel,
    buffer: props.buffer,
    tolerance: props.tolerance,
    lineMetrics: props.lineMetrics,
    onPress: undefined,
    ref: _setNativeRef,
    onAndroidCallback: (0, _index.isAndroid)() ? _onAndroidCallback : undefined
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNShapeSource, {
    ...shapeProps,
    children: (0, _index.cloneReactChildrenWithProps)(props.children, {
      sourceID: shapeId
    })
  });
}));
const MLRNShapeSource = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);
//# sourceMappingURL=ShapeSource.js.map