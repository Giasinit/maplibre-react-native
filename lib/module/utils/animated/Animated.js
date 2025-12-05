"use strict";

import { Animated as RNAnimated } from "react-native";
import { AnimatedCoordinatesArray } from "./AnimatedCoordinatesArray.js";
import { AnimatedExtractCoordinateFromArray } from "./AnimatedExtractCoordinateFromArray.js";
import { AnimatedRouteCoordinatesArray } from "./AnimatedRouteCoordinatesArray.js";
import { AnimatedShape } from "./AnimatedShape.js";
import { BackgroundLayer } from "../../components/BackgroundLayer.js";
import { CircleLayer } from "../../components/CircleLayer.js";
import { FillExtrusionLayer } from "../../components/FillExtrusionLayer.js";
import { FillLayer } from "../../components/FillLayer.js";
import { ImageSource } from "../../components/ImageSource.js";
import { LineLayer } from "../../components/LineLayer.js";
import { RasterLayer } from "../../components/RasterLayer.js";
import { ShapeSource } from "../../components/ShapeSource.js";
import { SymbolLayer } from "../../components/SymbolLayer.js";
export const Animated = {
  // sources
  ShapeSource: RNAnimated.createAnimatedComponent(ShapeSource),
  ImageSource: RNAnimated.createAnimatedComponent(ImageSource),
  // layers
  FillLayer: RNAnimated.createAnimatedComponent(FillLayer),
  FillExtrusionLayer: RNAnimated.createAnimatedComponent(FillExtrusionLayer),
  LineLayer: RNAnimated.createAnimatedComponent(LineLayer),
  CircleLayer: RNAnimated.createAnimatedComponent(CircleLayer),
  SymbolLayer: RNAnimated.createAnimatedComponent(SymbolLayer),
  RasterLayer: RNAnimated.createAnimatedComponent(RasterLayer),
  BackgroundLayer: RNAnimated.createAnimatedComponent(BackgroundLayer),
  // values
  CoordinatesArray: AnimatedCoordinatesArray,
  RouteCoordinatesArray: AnimatedRouteCoordinatesArray,
  Shape: AnimatedShape,
  ExtractCoordinateFromArray: AnimatedExtractCoordinateFromArray
};
/**
 * Manual typing is required for AnimatedShapeSource because the
 * following error:
 * `Type instantiation is excessively deep and possibly infinite.ts(2589)`
 */
export const AnimatedShapeSource = RNAnimated.createAnimatedComponent(ShapeSource);
//# sourceMappingURL=Animated.js.map