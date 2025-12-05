"use strict";

import debounce from "debounce";
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { View, StyleSheet, NativeModules, requireNativeComponent } from "react-native";
import { useNativeBridge } from "../hooks/useNativeBridge.js";
import { useOnce } from "../hooks/useOnce.js";
import { isFunction, isAndroid } from "../utils/index.js";
import { Logger } from "../utils/Logger.js";
import { getFilter } from "../utils/filterUtils.js";
import { jsx as _jsx } from "react/jsx-runtime";
const MLRNModule = NativeModules.MLRNModule;
if (MLRNModule == null) {
  console.error("Native module of @maplibre/maplibre-react-native library was not registered properly, please consult the docs: https://github.com/maplibre/maplibre-react-native");
}
export const NATIVE_MODULE_NAME = "MLRNMapView";
export const ANDROID_TEXTURE_NATIVE_MODULE_NAME = "MLRNAndroidTextureMapView";
const styles = StyleSheet.create({
  matchParent: {
    flex: 1
  }
});
/**
 * MapView backed by MapLibre Native
 */
export const MapView = /*#__PURE__*/memo(/*#__PURE__*/forwardRef(({
  localizeLabels = false,
  scrollEnabled = true,
  pitchEnabled = true,
  rotateEnabled = true,
  attributionEnabled = true,
  logoEnabled = false,
  surfaceView = false,
  regionWillChangeDebounceTime = 10,
  regionDidChangeDebounceTime = 500,
  ...props
}, ref) => {
  // * exposes the methods of the function component so we don't break projects that depend on calling this methods
  useImperativeHandle(ref, () => ({
    /**
     * Converts a geographic coordinate to a pixel point of the view.
     *
     * @example
     * const pointInView = await mapViewRef.current?.getPointInView([-37.817070, 144.949901]);
     *
     * @param {GeoJSON.Position} coordinate Geographic coordinate
     * @return {[x: number, y: number]} Pixel point
     */
    getPointInView,
    /**
     * Converts a pixel point of the view to a geographic coordinate.
     *
     * @example
     * const coordinate = await mapViewRef.current?.getCoordinateFromView([100, 100]);
     *
     * @param {[x: number, y: number]} point Pixel point
     * @return {GeoJSON.Position} Geographic coordinate
     */
    getCoordinateFromView,
    /**
     * The coordinate bounds(ne, sw) visible in the users’s viewport.
     *
     * @example
     * const visibleBounds = await this._map.getVisibleBounds();
     *
     * @return {Array}
     */
    getVisibleBounds,
    /**
     * Returns an array of rendered map features that intersect with a given point.
     *
     * @example
     * this._map.queryRenderedFeaturesAtPoint([30, 40], ['==', 'type', 'Point'], ['id1', 'id2'])
     *
     * @param  {number[]} coordinate - A point expressed in the map view’s coordinate system.
     * @param  {Array=} filter - A set of strings that correspond to the names of layers defined in the current style. Only the features contained in these layers are included in the returned array.
     * @param  {Array=} layerIDs - A array of layer id's to filter the features by
     * @return {GeoJSON.FeatureCollection}
     */
    queryRenderedFeaturesAtPoint,
    /**
     * Returns an array of rendered map features that intersect with the given rectangle,
     * restricted to the given style layers and filtered by the given predicate.
     *
     * @example
     * this._map.queryRenderedFeaturesInRect([30, 40, 20, 10], ['==', 'type', 'Point'], ['id1', 'id2'])
     *
     * @param  {number[]} bbox - A rectangle expressed in the map view’s coordinate system.
     * @param  {Array=} filter - A set of strings that correspond to the names of layers defined in the current style. Only the features contained in these layers are included in the returned array.
     * @param  {Array=} layerIDs -  A array of layer id's to filter the features by
     * @return {GeoJSON.FeatureCollection}
     */
    queryRenderedFeaturesInRect,
    /**
     * Takes snapshot of map with current tiles and returns a URI to the image
     * @param  {boolean} writeToDisk If true will create a temp file, otherwise it is in base64
     * @return {string}
     */
    takeSnap,
    /**
     * Returns the current zoom of the map view.
     *
     * @example
     * const zoom = await this._map.getZoom();
     *
     * @return {number}
     */
    getZoom,
    /**
     * Returns the map's geographical centerpoint
     *
     * @example
     * const center = await this._map.getCenter();
     *
     * @return {number[]} Coordinates
     */
    getCenter,
    /**
     * Sets the visibility of all the layers referencing the specified `sourceLayerId` and/or `sourceId`
     *
     * @example
     * await this._map.setSourceVisibility(false, 'composite', 'building')
     *
     * @param {boolean} visible - Visibility of the layers
     * @param {string} sourceId - Identifier of the target source (e.g. 'composite')
     * @param {string=} sourceLayerId - Identifier of the target source-layer (e.g. 'building')
     */
    setSourceVisibility,
    /**
     * Show the attribution and telemetry action sheet.
     * If you implement a custom attribution button, you should add this action to the button.
     */
    showAttribution,
    setNativeProps
  }));
  const {
    _runNativeCommand,
    _runPendingNativeCommands,
    _onAndroidCallback
  } = useNativeBridge(NATIVE_MODULE_NAME);
  const logger = useRef(Logger.sharedInstance());
  // * start the logger before anyuseEffect
  useOnce(() => {
    logger.current.start();
  });
  const _nativeRef = useRef();
  const [isReady, setIsReady] = useState(false);

  // Cleanups on unmount
  useEffect(() => {
    const currentLogger = logger.current;
    return () => {
      _onDebouncedRegionWillChange.clear();
      _onDebouncedRegionDidChange.clear();
      currentLogger.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This will run on every render
  // so similar to componentDidMount and UNSAFE_componentWillReceiveProps
  useEffect(() => {
    _setHandledMapChangedEvents(props);
  }, [props]);
  const _setHandledMapChangedEvents = props => {
    if (isAndroid()) {
      const events = [];
      if (props.onRegionWillChange) {
        events.push(MLRNModule.EventTypes.RegionWillChange);
      }
      if (props.onRegionIsChanging) {
        events.push(MLRNModule.EventTypes.RegionIsChanging);
      }
      if (props.onRegionDidChange) {
        events.push(MLRNModule.EventTypes.RegionDidChange);
      }
      if (props.onUserLocationUpdate) {
        events.push(MLRNModule.EventTypes.UserLocationUpdated);
      }
      if (props.onWillStartLoadingMap) {
        events.push(MLRNModule.EventTypes.WillStartLoadingMap);
      }
      if (props.onDidFinishLoadingMap) {
        events.push(MLRNModule.EventTypes.DidFinishLoadingMap);
      }
      if (props.onDidFailLoadingMap) {
        events.push(MLRNModule.EventTypes.DidFailLoadingMap);
      }
      if (props.onWillStartRenderingFrame) {
        events.push(MLRNModule.EventTypes.WillStartRenderingFrame);
      }
      if (props.onDidFinishRenderingFrame) {
        events.push(MLRNModule.EventTypes.DidFinishRenderingFrame);
      }
      if (props.onDidFinishRenderingFrameFully) {
        events.push(MLRNModule.EventTypes.DidFinishRenderingFrameFully);
      }
      if (props.onWillStartRenderingMap) {
        events.push(MLRNModule.EventTypes.WillStartRenderingMap);
      }
      if (props.onDidFinishRenderingMap) {
        events.push(MLRNModule.EventTypes.DidFinishRenderingMap);
      }
      if (props.onDidFinishRenderingMapFully) {
        events.push(MLRNModule.EventTypes.DidFinishRenderingMapFully);
      }
      if (props.onDidFinishLoadingStyle) {
        events.push(MLRNModule.EventTypes.DidFinishLoadingStyle);
      }
      _runNativeCommand("setHandledMapChangedEvents", _nativeRef.current, events);
    }
  };
  const getPointInView = async coordinate => {
    const res = await _runNativeCommand("getPointInView", _nativeRef.current, [coordinate]);
    return res.pointInView;
  };
  const getCoordinateFromView = async point => {
    const res = await _runNativeCommand("getCoordinateFromView", _nativeRef.current, [point]);
    return res.coordinateFromView;
  };
  const getVisibleBounds = async () => {
    const res = await _runNativeCommand("getVisibleBounds", _nativeRef.current);
    return res.visibleBounds;
  };
  const queryRenderedFeaturesAtPoint = async (point, filter, layerIDs = []) => {
    if (!point || point.length < 2) {
      throw new Error("Must pass in valid point in the map view's cooridnate system[x, y]");
    }
    const res = await _runNativeCommand("queryRenderedFeaturesAtPoint", _nativeRef.current, [point, getFilter(filter), layerIDs]);
    if (isAndroid()) {
      return JSON.parse(res.data);
    }
    return res.data;
  };
  const queryRenderedFeaturesInRect = async (bbox, filter, layerIDs = []) => {
    if (!bbox || bbox.length !== 4) {
      throw new Error("Must pass in a valid bounding box[top, right, bottom, left]");
    }
    const res = await _runNativeCommand("queryRenderedFeaturesInRect", _nativeRef.current, [bbox, getFilter(filter), layerIDs]);
    if (isAndroid()) {
      return JSON.parse(res.data);
    }
    return res.data;
  };
  const takeSnap = async (writeToDisk = false) => {
    const res = await _runNativeCommand("takeSnap", _nativeRef.current, [writeToDisk]);
    return res.uri;
  };
  const getZoom = async () => {
    const res = await _runNativeCommand("getZoom", _nativeRef.current);
    return res.zoom;
  };
  const getCenter = async () => {
    const res = await _runNativeCommand("getCenter", _nativeRef.current);
    return res.center;
  };
  const setSourceVisibility = (visible, sourceId, sourceLayerId = null) => {
    _runNativeCommand("setSourceVisibility", _nativeRef.current, [visible, sourceId, sourceLayerId]);
  };
  const showAttribution = async () => {
    _runNativeCommand("showAttribution", _nativeRef.current);
  };
  const _onPress = e => {
    if (isFunction(props.onPress)) {
      props.onPress(e.nativeEvent.payload);
    }
  };
  const _onLongPress = e => {
    if (isFunction(props.onLongPress)) {
      props.onLongPress(e.nativeEvent.payload);
    }
  };
  const _onCameraChangedOnFrame = e => {
    if (isFunction(props.onCameraChangedOnFrame)) {
      props.onCameraChangedOnFrame(e.nativeEvent.payload);
    }
  };
  const _onRegionWillChange = payload => {
    if (isFunction(props.onRegionWillChange)) {
      props.onRegionWillChange(payload);
    }
  };
  const _onRegionDidChange = payload => {
    if (isFunction(props.onRegionDidChange)) {
      props.onRegionDidChange(payload);
    }
  };
  const _onDebouncedRegionWillChange = useCallback(debounce(_onRegionWillChange, regionWillChangeDebounceTime, {
    immediate: true
  }), [_onRegionWillChange]);
  const _onDebouncedRegionDidChange = useCallback(debounce(_onRegionDidChange, regionDidChangeDebounceTime), [_onRegionDidChange]);
  const _onChange = e => {
    const {
      type,
      payload
    } = e.nativeEvent;
    let propName;
    switch (type) {
      case MLRNModule.EventTypes.RegionWillChange:
        if (regionWillChangeDebounceTime && regionWillChangeDebounceTime > 0) {
          if (payload) {
            _onDebouncedRegionWillChange(payload);
          }
        } else {
          propName = "onRegionWillChange";
        }
        break;
      case MLRNModule.EventTypes.RegionIsChanging:
        propName = "onRegionIsChanging";
        break;
      case MLRNModule.EventTypes.RegionDidChange:
        if (regionDidChangeDebounceTime && regionDidChangeDebounceTime > 0) {
          if (payload) {
            _onDebouncedRegionDidChange(payload);
          }
        } else {
          propName = "onRegionDidChange";
        }
        break;
      case MLRNModule.EventTypes.UserLocationUpdated:
        propName = "onUserLocationUpdate";
        break;
      case MLRNModule.EventTypes.WillStartLoadingMap:
        propName = "onWillStartLoadingMap";
        break;
      case MLRNModule.EventTypes.DidFinishLoadingMap:
        propName = "onDidFinishLoadingMap";
        break;
      case MLRNModule.EventTypes.DidFailLoadingMap:
        propName = "onDidFailLoadingMap";
        break;
      case MLRNModule.EventTypes.WillStartRenderingFrame:
        propName = "onWillStartRenderingFrame";
        break;
      case MLRNModule.EventTypes.DidFinishRenderingFrame:
        propName = "onDidFinishRenderingFrame";
        break;
      case MLRNModule.EventTypes.DidFinishRenderingFrameFully:
        propName = "onDidFinishRenderingFrameFully";
        break;
      case MLRNModule.EventTypes.WillStartRenderingMap:
        propName = "onWillStartRenderingMap";
        break;
      case MLRNModule.EventTypes.DidFinishRenderingMap:
        propName = "onDidFinishRenderingMap";
        break;
      case MLRNModule.EventTypes.DidFinishRenderingMapFully:
        propName = "onDidFinishRenderingMapFully";
        break;
      case MLRNModule.EventTypes.DidFinishLoadingStyle:
        propName = "onDidFinishLoadingStyle";
        break;
      default:
        console.warn("Unhandled event callback type", type);
    }
    if (propName) {
      _handleOnChange(propName, payload);
    }
  };
  const _onLayout = () => {
    setIsReady(true);
  };
  const _handleOnChange = (propName, payload) => {
    const callable = props[propName];
    if (callable && isFunction(callable)) {
      callable(payload);
    }
  };
  const contentInsetValue = useMemo(() => {
    if (props.contentInset === undefined) {
      return undefined;
    }
    if (!Array.isArray(props.contentInset)) {
      return [props.contentInset];
    }
    return props.contentInset;
  }, [props.contentInset]);
  const _setNativeRef = nativeRef => {
    _nativeRef.current = nativeRef;
    _runPendingNativeCommands(nativeRef);
  };
  const setNativeProps = props => {
    if (_nativeRef.current) {
      _nativeRef.current.setNativeProps(props);
    }
  };
  const nativeProps = useMemo(() => {
    const {
      mapStyle,
      ...otherProps
    } = props;
    let nativeMapStyle = undefined;
    if (mapStyle) {
      if (typeof mapStyle === "string") {
        nativeMapStyle = mapStyle;
      } else if (typeof mapStyle === "object") {
        nativeMapStyle = JSON.stringify(mapStyle);
      }
    }
    return {
      ...otherProps,
      localizeLabels,
      scrollEnabled,
      pitchEnabled,
      rotateEnabled,
      attributionEnabled,
      logoEnabled,
      surfaceView,
      regionWillChangeDebounceTime,
      regionDidChangeDebounceTime,
      mapStyle: nativeMapStyle,
      contentInset: contentInsetValue,
      style: styles.matchParent
    };
  }, [props, localizeLabels, scrollEnabled, pitchEnabled, rotateEnabled, attributionEnabled, logoEnabled, surfaceView, regionWillChangeDebounceTime, regionDidChangeDebounceTime, contentInsetValue]);
  const callbacks = {
    ref: ref => _setNativeRef(ref),
    onPress: _onPress,
    onLongPress: _onLongPress,
    onMapChange: _onChange,
    onCameraChangedOnFrame: _onCameraChangedOnFrame,
    onAndroidCallback: isAndroid() ? _onAndroidCallback : undefined
  };
  let mapView = null;
  if (isAndroid() && !surfaceView && isReady) {
    mapView = /*#__PURE__*/_jsx(MLRNAndroidTextureMapView, {
      ...nativeProps,
      ...callbacks,
      children: props.children
    });
  } else if (isReady) {
    mapView = /*#__PURE__*/_jsx(MLRNMapView, {
      ...nativeProps,
      ...callbacks,
      children: props.children
    });
  }
  return /*#__PURE__*/_jsx(View, {
    onLayout: _onLayout,
    style: props.style,
    testID: mapView ? undefined : props.testID,
    children: mapView
  });
}));
const MLRNMapView = requireNativeComponent(NATIVE_MODULE_NAME);
let MLRNAndroidTextureMapView;
if (isAndroid()) {
  MLRNAndroidTextureMapView = requireNativeComponent(ANDROID_TEXTURE_NATIVE_MODULE_NAME);
}
//# sourceMappingURL=MapView.js.map