"use strict";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Easing } from "react-native";
import { SymbolLayer } from "./SymbolLayer.js";
import { AnimatedShapeSource } from "../utils/animated/Animated.js";
import { AnimatedPoint } from "../utils/animated/AnimatedPoint.js";
import { jsx as _jsx } from "react/jsx-runtime";
function getShapeFromProps(props = {}) {
  const lng = props.coordinates?.[0] || 0;
  const lat = props.coordinates?.[1] || 0;
  const point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  if (props.animated) {
    return new AnimatedPoint(point);
  }
  return point;
}
function isShapeAnimated(shape) {
  return shape instanceof AnimatedPoint;
}
export const Annotation = /*#__PURE__*/forwardRef(({
  animated = false,
  animationDuration = 1000,
  animationEasingFunction = Easing.linear,
  ...otherProps
}, ref) => {
  const props = {
    ...otherProps,
    animated,
    animationDuration,
    animationEasingFunction
  };
  useImperativeHandle(ref, () => ({
    onPress,
    symbolStyle
  }));
  const [shape, setShape] = useState(getShapeFromProps(props));

  // this will run useEffect only when actual coordinates values change
  const coordinateDeps = props.coordinates?.join(",");
  useEffect(() => {
    if (!Array.isArray(props.coordinates)) {
      setShape(null);
      return;
    }
    if (shape && isShapeAnimated(shape)) {
      shape.stopAnimation();
      shape.timing({
        coordinates: props.coordinates,
        easing: animationEasingFunction,
        duration: animationDuration
      }).start();
      return;
    }
    if (!shape || !isShapeAnimated(shape)) {
      const newShape = getShapeFromProps(props);
      setShape(newShape);
    }
  }, [coordinateDeps]);
  const onPressProp = props.onPress;
  const _onPress = useCallback(event => {
    if (onPressProp) {
      onPressProp(event);
    }
  }, [onPressProp]);

  // This function is needed to correctly generate Annotation.md doc
  function onPress(event) {
    _onPress(event);
  }
  if (!props.coordinates) {
    return null;
  }
  const children = [];
  const symbolStyle = props.icon ? {
    ...props.style,
    iconImage: typeof props.icon === "string" ? props.icon : undefined
  } : undefined;
  if (symbolStyle) {
    children.push(/*#__PURE__*/_jsx(SymbolLayer, {
      id: `${props.id}-symbol`,
      style: symbolStyle
    }));
  }
  if (props.children) {
    if (Array.isArray(props.children)) {
      children.push(...props.children);
    } else {
      children.push(props.children);
    }
  }
  return /*#__PURE__*/_jsx(AnimatedShapeSource, {
    id: props.id,
    onPress: _onPress,
    shape: shape,
    children: children
  });
});
Annotation.displayName = "Annotation";
//# sourceMappingURL=Annotation.js.map