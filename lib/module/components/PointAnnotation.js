"use strict";

import { point } from "@turf/helpers";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Platform, StyleSheet, requireNativeComponent } from "react-native";
import { useNativeBridge } from "../hooks/useNativeBridge.js";
import { isFunction, toJSONString } from "../utils/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const NATIVE_MODULE_NAME = "MLRNPointAnnotation";
const styles = StyleSheet.create({
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
export const PointAnnotation = /*#__PURE__*/forwardRef(({
  anchor = {
    x: 0.5,
    y: 0.5
  },
  draggable = false,
  ...props
}, ref) => {
  useImperativeHandle(ref, () => ({
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
  } = useNativeBridge(NATIVE_MODULE_NAME);
  const _nativeRef = useRef();
  function refresh() {
    if (Platform.OS === "android") {
      _runNativeCommand("refresh", _nativeRef.current, []);
    }
  }
  function _onSelected(e) {
    if (isFunction(props.onSelected)) {
      props.onSelected(e.nativeEvent.payload);
    }
  }
  function _onDeselected(e) {
    if (isFunction(props.onDeselected)) {
      props.onDeselected(e.nativeEvent.payload);
    }
  }
  function _onDragStart(e) {
    if (isFunction(props.onDragStart)) {
      props.onDragStart(e.nativeEvent.payload);
    }
  }
  function _onDrag(e) {
    if (isFunction(props.onDrag)) {
      props.onDrag(e.nativeEvent.payload);
    }
  }
  function _onDragEnd(e) {
    if (isFunction(props.onDragEnd)) {
      props.onDragEnd(e.nativeEvent.payload);
    }
  }
  function _getCoordinate() {
    if (!props.coordinate) {
      return undefined;
    }
    return toJSONString(point(props.coordinate));
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
  return /*#__PURE__*/_jsx(MLRNPointAnnotation, {
    ...nativeProps,
    children: props.children
  });
});

// eslint complains about it
// not sure why only in this component
PointAnnotation.displayName = "PointAnnotation";
const MLRNPointAnnotation = requireNativeComponent(NATIVE_MODULE_NAME);
//# sourceMappingURL=PointAnnotation.js.map