"use strict";

import { Children } from "react";
import { Animated, requireNativeComponent, StyleSheet, Text, View } from "react-native";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const NATIVE_MODULE_NAME = "MLRNCallout";
const styles = StyleSheet.create({
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
export const Callout = props => {
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
  const _hasChildren = Children.count(children) > 0;
  const _renderDefaultCallout = () => {
    return /*#__PURE__*/_jsxs(Animated.View, {
      testID: "container",
      style: [styles.container, style],
      children: [/*#__PURE__*/_jsx(View, {
        testID: "wrapper",
        style: [styles.content, contentStyle],
        children: /*#__PURE__*/_jsx(Text, {
          testID: "title",
          style: [styles.title, textStyle],
          children: title
        })
      }), /*#__PURE__*/_jsx(View, {
        testID: "tip",
        style: [styles.tip, tipStyle]
      })]
    });
  };
  const _renderCustomCallout = () => {
    return /*#__PURE__*/_jsx(Animated.View, {
      testID: "container",
      ...props,
      style: style,
      children: children
    });
  };
  const calloutContent = _hasChildren ? _renderCustomCallout() : _renderDefaultCallout();
  return /*#__PURE__*/_jsx(MLRNCallout, {
    testID: "callout",
    style: _containerStyle,
    children: calloutContent
  });
};
const MLRNCallout = requireNativeComponent(NATIVE_MODULE_NAME);
//# sourceMappingURL=Callout.js.map