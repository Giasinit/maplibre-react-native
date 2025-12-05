"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointAnnotation = exports.NATIVE_MODULE_NAME = void 0;
var _helpers = require("@turf/helpers");
var _react = require("react");
var _reactNative = require("react-native");
var _useNativeBridge = require("../hooks/useNativeBridge.js");
var _index = require("../utils/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNPointAnnotation";
const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  }
});
/**
 * PointAnnotation represents a one-dimensional shape located at a single geographical coordinate.
 *
 * Consider using ShapeSource and SymbolLayer instead, if you have many points, and you have static images,
 * they'll offer much better performance.
 *
 * If you need interactive views please use MarkerView,
 * as with PointAnnotation on Android child views are rendered onto a bitmap for better performance.
 */
const PointAnnotation = exports.PointAnnotation = /*#__PURE__*/(0, _react.forwardRef)(({
  anchor = {
    x: 0.5,
    y: 0.5
  },
  draggable = false,
  ...props
}, ref) => {
  (0, _react.useImperativeHandle)(ref, () => ({
    /**
     * On android point annotation is rendered offscreen with a canvas into an image.
     * To rerender the image from the current state of the view call refresh.
     * Call this for example from Image#onLoad.
     */
    refresh
  }));
  const {
    _runNativeCommand,
    _runPendingNativeCommands
  } = (0, _useNativeBridge.useNativeBridge)(NATIVE_MODULE_NAME);
  const _nativeRef = (0, _react.useRef)();
  function refresh() {
    if (_reactNative.Platform.OS === "android") {
      _runNativeCommand("refresh", _nativeRef.current, []);
    }
  }
  function _onSelected(e) {
    if ((0, _index.isFunction)(props.onSelected)) {
      props.onSelected(e.nativeEvent.payload);
    }
  }
  function _onDeselected(e) {
    if ((0, _index.isFunction)(props.onDeselected)) {
      props.onDeselected(e.nativeEvent.payload);
    }
  }
  function _onDragStart(e) {
    if ((0, _index.isFunction)(props.onDragStart)) {
      props.onDragStart(e.nativeEvent.payload);
    }
  }
  function _onDrag(e) {
    if ((0, _index.isFunction)(props.onDrag)) {
      props.onDrag(e.nativeEvent.payload);
    }
  }
  function _onDragEnd(e) {
    if ((0, _index.isFunction)(props.onDragEnd)) {
      props.onDragEnd(e.nativeEvent.payload);
    }
  }
  function _getCoordinate() {
    if (!props.coordinate) {
      return undefined;
    }
    return (0, _index.toJSONString)((0, _helpers.point)(props.coordinate));
  }
  const _setNativeRef = nativeRef => {
    _nativeRef.current = nativeRef;
    _runPendingNativeCommands(nativeRef);
  };
  const nativeProps = {
    ...props,
    anchor,
    draggable,
    ref: nativeRef => _setNativeRef(nativeRef),
    id: props.id,
    title: props.title,
    snippet: props.snippet,
    selected: props.selected,
    style: [props.style, styles.container],
    onMapboxPointAnnotationSelected: _onSelected,
    onMapboxPointAnnotationDeselected: _onDeselected,
    onMapboxPointAnnotationDragStart: _onDragStart,
    onMapboxPointAnnotationDrag: _onDrag,
    onMapboxPointAnnotationDragEnd: _onDragEnd,
    coordinate: _getCoordinate()
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNPointAnnotation, {
    ...nativeProps,
    children: props.children
  });
});

// eslint complains about it
// not sure why only in this component
PointAnnotation.displayName = "PointAnnotation";
const MLRNPointAnnotation = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);
//# sourceMappingURL=PointAnnotation.js.map