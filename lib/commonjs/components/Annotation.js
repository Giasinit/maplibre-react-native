"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Annotation = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _SymbolLayer = require("./SymbolLayer.js");
var _Animated = require("../utils/animated/Animated.js");
var _AnimatedPoint = require("../utils/animated/AnimatedPoint.js");
var _jsxRuntime = require("react/jsx-runtime");
function getShapeFromProps(props = {}) {
  const lng = props.coordinates?.[0] || 0;
  const lat = props.coordinates?.[1] || 0;
  const point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  if (props.animated) {
    return new _AnimatedPoint.AnimatedPoint(point);
  }
  return point;
}
function isShapeAnimated(shape) {
  return shape instanceof _AnimatedPoint.AnimatedPoint;
}
const Annotation = exports.Annotation = /*#__PURE__*/(0, _react.forwardRef)(({
  animated = false,
  animationDuration = 1000,
  animationEasingFunction = _reactNative.Easing.linear,
  ...otherProps
}, ref) => {
  const props = {
    ...otherProps,
    animated,
    animationDuration,
    animationEasingFunction
  };
  (0, _react.useImperativeHandle)(ref, () => ({
    onPress,
    symbolStyle
  }));
  const [shape, setShape] = (0, _react.useState)(getShapeFromProps(props));

  // this will run useEffect only when actual coordinates values change
  const coordinateDeps = props.coordinates?.join(",");
  (0, _react.useEffect)(() => {
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
  const _onPress = (0, _react.useCallback)(event => {
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
    children.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_SymbolLayer.SymbolLayer, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Animated.AnimatedShapeSource, {
    id: props.id,
    onPress: _onPress,
    shape: shape,
    children: children
  });
});
Annotation.displayName = "Annotation";
//# sourceMappingURL=Annotation.js.map