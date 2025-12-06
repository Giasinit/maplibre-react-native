"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.MapView = exports.ANDROID_TEXTURE_NATIVE_MODULE_NAME = void 0;
var _debounce = _interopRequireDefault(require("debounce"));
var _react = require("react");
var _reactNative = require("react-native");
var _useNativeBridge = require("../hooks/useNativeBridge.js");
var _useOnce = require("../hooks/useOnce.js");
var _index = require("../utils/index.js");
var _Logger = require("../utils/Logger.js");
var _filterUtils = require("../utils/filterUtils.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MLRNModule = _reactNative.NativeModules.MLRNModule;
if (MLRNModule == null) {
  console.error("Native module of @maplibre/maplibre-react-native library was not registered properly, please consult the docs: https://github.com/maplibre/maplibre-react-native");
}
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNMapView";
const ANDROID_TEXTURE_NATIVE_MODULE_NAME = exports.ANDROID_TEXTURE_NATIVE_MODULE_NAME = "MLRNAndroidTextureMapView";
const styles = _reactNative.StyleSheet.create({
  matchParent: {
    flex: 1
  }
});
/**
 * MapView backed by MapLibre Native
 */
const MapView = exports.MapView = /*#__PURE__*/(0, _react.memo)(/*#__PURE__*/(0, _react.forwardRef)(({
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
  (0, _react.useImperativeHandle)(ref, () => ({
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
  } = (0, _useNativeBridge.useNativeBridge)(NATIVE_MODULE_NAME);
  const logger = (0, _react.useRef)(_Logger.Logger.sharedInstance());
  // * start the logger before anyuseEffect
  (0, _useOnce.useOnce)(() => {
    logger.current.start();
  });
  const _nativeRef = (0, _react.useRef)();
  const [isReady, setIsReady] = (0, _react.useState)(false);

  // Cleanups on unmount
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
    _setHandledMapChangedEvents(props);
  }, [props]);
  const _setHandledMapChangedEvents = props => {
    if ((0, _index.isAndroid)()) {
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
    const res = await _runNativeCommand("queryRenderedFeaturesAtPoint", _nativeRef.current, [point, (0, _filterUtils.getFilter)(filter), layerIDs]);
    if ((0, _index.isAndroid)()) {
      return JSON.parse(res.data);
    }
    return res.data;
  };
  const queryRenderedFeaturesInRect = async (bbox, filter, layerIDs = []) => {
    if (!bbox || bbox.length !== 4) {
      throw new Error("Must pass in a valid bounding box[top, right, bottom, left]");
    }
    const res = await _runNativeCommand("queryRenderedFeaturesInRect", _nativeRef.current, [bbox, (0, _filterUtils.getFilter)(filter), layerIDs]);
    if ((0, _index.isAndroid)()) {
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
    if ((0, _index.isFunction)(props.onPress)) {
      props.onPress(e.nativeEvent.payload);
    }
  };
  const _onLongPress = e => {
    if ((0, _index.isFunction)(props.onLongPress)) {
      props.onLongPress(e.nativeEvent.payload);
    }
  };
  const _onCameraChangedOnFrame = e => {
    if ((0, _index.isFunction)(props.onCameraChangedOnFrame)) {
      props.onCameraChangedOnFrame(e.nativeEvent.payload);
    }
  };
  const _onMapResize = e => {
    if ((0, _index.isFunction)(props.onMapResize)) {
      props.onMapResize(e.nativeEvent.payload);
    }
  };
  const _onMapMove = e => {
    if ((0, _index.isFunction)(props.onMapMove)) {
      props.onMapMove(e.nativeEvent.payload);
    }
  };
  const _onRegionWillChange = payload => {
    if ((0, _index.isFunction)(props.onRegionWillChange)) {
      props.onRegionWillChange(payload);
    }
  };
  const _onRegionDidChange = payload => {
    if ((0, _index.isFunction)(props.onRegionDidChange)) {
      props.onRegionDidChange(payload);
    }
  };
  const _onDebouncedRegionWillChange = (0, _react.useCallback)((0, _debounce.default)(_onRegionWillChange, regionWillChangeDebounceTime, {
    immediate: true
  }), [_onRegionWillChange]);
  const _onDebouncedRegionDidChange = (0, _react.useCallback)((0, _debounce.default)(_onRegionDidChange, regionDidChangeDebounceTime), [_onRegionDidChange]);
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
    if (callable && (0, _index.isFunction)(callable)) {
      callable(payload);
    }
  };
  const contentInsetValue = (0, _react.useMemo)(() => {
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
  const nativeProps = (0, _react.useMemo)(() => {
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
    onMapResize: _onMapResize,
    onMapMove: _onMapMove,
    onAndroidCallback: (0, _index.isAndroid)() ? _onAndroidCallback : undefined
  };
  let mapView = null;
  if ((0, _index.isAndroid)() && !surfaceView && isReady) {
    mapView = /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNAndroidTextureMapView, {
      ...nativeProps,
      ...callbacks,
      children: props.children
    });
  } else if (isReady) {
    mapView = /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNMapView, {
      ...nativeProps,
      ...callbacks,
      children: props.children
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    onLayout: _onLayout,
    style: props.style,
    testID: mapView ? undefined : props.testID,
    children: mapView
  });
}));
const MLRNMapView = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);
let MLRNAndroidTextureMapView;
if ((0, _index.isAndroid)()) {
  MLRNAndroidTextureMapView = (0, _reactNative.requireNativeComponent)(ANDROID_TEXTURE_NATIVE_MODULE_NAME);
}
//# sourceMappingURL=MapView.js.map