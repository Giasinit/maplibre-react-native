"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.Callout = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNCallout";
const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    zIndex: 9999999
  },
  content: {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 3,
    borderWidth: 1,
    flex: 1,
    padding: 8,
    position: "relative"
  },
  tip: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
    borderLeftColor: "transparent",
    borderLeftWidth: 8,
    borderRightColor: "transparent",
    borderRightWidth: 8,
    borderTopColor: "white",
    borderTopWidth: 16,
    elevation: 0,
    marginTop: -2,
    zIndex: 1000
  },
  title: {
    color: "black",
    textAlign: "center"
  }
});
/**
 *  Callout that displays information about a selected annotation near the annotation.
 */
const Callout = props => {
  const {
    title,
    style,
    containerStyle,
    contentStyle,
    tipStyle,
    textStyle,
    children
  } = props;
  const _containerStyle = [{
    position: "absolute",
    zIndex: 999,
    backgroundColor: "transparent",
    ...containerStyle
  }];
  const _hasChildren = _react.Children.count(children) > 0;
  const _renderDefaultCallout = () => {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
      testID: "container",
      style: [styles.container, style],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        testID: "wrapper",
        style: [styles.content, contentStyle],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          testID: "title",
          style: [styles.title, textStyle],
          children: title
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        testID: "tip",
        style: [styles.tip, tipStyle]
      })]
    });
  };
  const _renderCustomCallout = () => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      testID: "container",
      ...props,
      style: style,
      children: children
    });
  };
  const calloutContent = _hasChildren ? _renderCustomCallout() : _renderDefaultCallout();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNCallout, {
    testID: "callout",
    style: _containerStyle,
    children: calloutContent
  });
};
exports.Callout = Callout;
const MLRNCallout = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);
//# sourceMappingURL=Callout.js.map