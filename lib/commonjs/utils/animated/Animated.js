"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedShapeSource = exports.Animated = void 0;
var _reactNative = require("react-native");
var _AnimatedCoordinatesArray = require("./AnimatedCoordinatesArray.js");
var _AnimatedExtractCoordinateFromArray = require("./AnimatedExtractCoordinateFromArray.js");
var _AnimatedRouteCoordinatesArray = require("./AnimatedRouteCoordinatesArray.js");
var _AnimatedShape = require("./AnimatedShape.js");
var _BackgroundLayer = require("../../components/BackgroundLayer.js");
var _CircleLayer = require("../../components/CircleLayer.js");
var _FillExtrusionLayer = require("../../components/FillExtrusionLayer.js");
var _FillLayer = require("../../components/FillLayer.js");
var _ImageSource = require("../../components/ImageSource.js");
var _LineLayer = require("../../components/LineLayer.js");
var _RasterLayer = require("../../components/RasterLayer.js");
var _ShapeSource = require("../../components/ShapeSource.js");
var _SymbolLayer = require("../../components/SymbolLayer.js");
const Animated = exports.Animated = {
  // sources
  ShapeSource: _reactNative.Animated.createAnimatedComponent(_ShapeSource.ShapeSource),
  ImageSource: _reactNative.Animated.createAnimatedComponent(_ImageSource.ImageSource),
  // layers
  FillLayer: _reactNative.Animated.createAnimatedComponent(_FillLayer.FillLayer),
  FillExtrusionLayer: _reactNative.Animated.createAnimatedComponent(_FillExtrusionLayer.FillExtrusionLayer),
  LineLayer: _reactNative.Animated.createAnimatedComponent(_LineLayer.LineLayer),
  CircleLayer: _reactNative.Animated.createAnimatedComponent(_CircleLayer.CircleLayer),
  SymbolLayer: _reactNative.Animated.createAnimatedComponent(_SymbolLayer.SymbolLayer),
  RasterLayer: _reactNative.Animated.createAnimatedComponent(_RasterLayer.RasterLayer),
  BackgroundLayer: _reactNative.Animated.createAnimatedComponent(_BackgroundLayer.BackgroundLayer),
  // values
  CoordinatesArray: _AnimatedCoordinatesArray.AnimatedCoordinatesArray,
  RouteCoordinatesArray: _AnimatedRouteCoordinatesArray.AnimatedRouteCoordinatesArray,
  Shape: _AnimatedShape.AnimatedShape,
  ExtractCoordinateFromArray: _AnimatedExtractCoordinateFromArray.AnimatedExtractCoordinateFromArray
};
/**
 * Manual typing is required for AnimatedShapeSource because the
 * following error:
 * `Type instantiation is excessively deep and possibly infinite.ts(2589)`
 */
const AnimatedShapeSource = exports.AnimatedShapeSource = _reactNative.Animated.createAnimatedComponent(_ShapeSource.ShapeSource);
//# sourceMappingURL=Animated.js.map