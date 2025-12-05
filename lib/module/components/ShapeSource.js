"use strict";

import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { NativeModules, requireNativeComponent } from "react-native";
import { useNativeBridge } from "../hooks/useNativeBridge.js";
import { cloneReactChildrenWithProps, isAndroid, isFunction, toJSONString } from "../utils/index.js";
import { getFilter } from "../utils/filterUtils.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
export const NATIVE_MODULE_NAME = "MLRNShapeSource";
/**
 * ShapeSource is a map content source that supplies vector shapes to be shown on the map.
 * The shape may be a url or a GeoJSON object
 */
export const ShapeSource = /*#__PURE__*/memo(/*#__PURE__*/forwardRef(({
  id: shapeId = MLRNModule.StyleSource.DefaultSourceID,
  ...props
}, ref) => {
  useImperativeHandle(ref, () => ({
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
  const _nativeRef = useRef();
  const {
    _runNativeCommand,
    _runPendingNativeCommands,
    _onAndroidCallback
  } = useNativeBridge(NATIVE_MODULE_NAME);
  const _setNativeRef = nativeRef => {
    _nativeRef.current = nativeRef;
    _runPendingNativeCommands(nativeRef);
  };
  async function features(filter) {
    const res = await _runNativeCommand("features", _nativeRef.current, [getFilter(filter)]);
    if (isAndroid()) {
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
    if (isAndroid()) {
      return JSON.parse(res.data);
    }
    return res.data;
  }
  async function getClusterChildren(feature) {
    const res = await _runNativeCommand("getClusterChildren", _nativeRef.current, [JSON.stringify(feature)]);
    if (isAndroid()) {
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
    return toJSONString(props.shape);
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
    hasPressListener: isFunction(props.onPress),
    onMapboxShapeSourcePress: onPress.bind(this),
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
    onAndroidCallback: isAndroid() ? _onAndroidCallback : undefined
  };
  return /*#__PURE__*/_jsx(MLRNShapeSource, {
    ...shapeProps,
    children: cloneReactChildrenWithProps(props.children, {
      sourceID: shapeId
    })
  });
}));
const MLRNShapeSource = requireNativeComponent(NATIVE_MODULE_NAME);
//# sourceMappingURL=ShapeSource.js.map