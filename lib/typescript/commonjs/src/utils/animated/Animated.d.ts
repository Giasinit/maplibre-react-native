import { type ForwardRefExoticComponent, type MemoExoticComponent, type RefAttributes } from "react";
import { Animated as RNAnimated } from "react-native";
import { AnimatedCoordinatesArray } from "./AnimatedCoordinatesArray";
import { AnimatedExtractCoordinateFromArray } from "./AnimatedExtractCoordinateFromArray";
import { AnimatedRouteCoordinatesArray } from "./AnimatedRouteCoordinatesArray";
import { AnimatedShape } from "./AnimatedShape";
import { type ShapeSourceProps, type ShapeSourceRef } from "../../components/ShapeSource";
export declare const Animated: {
    ShapeSource: RNAnimated.AnimatedComponent<MemoExoticComponent<ForwardRefExoticComponent<ShapeSourceProps & RefAttributes<ShapeSourceRef>>>>;
    ImageSource: RNAnimated.AnimatedComponent<(props: import("../../components/ImageSource").ImageSourceProps) => import("react/jsx-runtime").JSX.Element | null>;
    FillLayer: RNAnimated.AnimatedComponent<({ sourceID, ...props }: import("../../components/FillLayer").FillLayerProps) => import("react/jsx-runtime").JSX.Element>;
    FillExtrusionLayer: RNAnimated.AnimatedComponent<({ sourceID, ...props }: import("../../components/FillExtrusionLayer").FillExtrusionLayerProps) => import("react/jsx-runtime").JSX.Element>;
    LineLayer: RNAnimated.AnimatedComponent<({ sourceID, ...props }: import("../../components/LineLayer").LineLayerProps) => import("react/jsx-runtime").JSX.Element>;
    CircleLayer: RNAnimated.AnimatedComponent<({ sourceID, ...props }: import("../../components/CircleLayer").CircleLayerProps) => import("react/jsx-runtime").JSX.Element>;
    SymbolLayer: RNAnimated.AnimatedComponent<({ sourceID, ...props }: import("../../components/SymbolLayer").SymbolLayerProps) => import("react/jsx-runtime").JSX.Element>;
    RasterLayer: RNAnimated.AnimatedComponent<({ sourceID, ...props }: import("../../components/RasterLayer").RasterLayerProps) => import("react/jsx-runtime").JSX.Element>;
    BackgroundLayer: RNAnimated.AnimatedComponent<({ sourceID, ...props }: import("../../components/BackgroundLayer").BackgroundLayerProps) => import("react/jsx-runtime").JSX.Element>;
    CoordinatesArray: typeof AnimatedCoordinatesArray;
    RouteCoordinatesArray: typeof AnimatedRouteCoordinatesArray;
    Shape: typeof AnimatedShape;
    ExtractCoordinateFromArray: typeof AnimatedExtractCoordinateFromArray;
};
type ShapeSourcePropsWithRef = ShapeSourceProps & RefAttributes<ShapeSourceRef>;
type BaseShapeSourceComponent = ForwardRefExoticComponent<ShapeSourcePropsWithRef>;
type AnimatedShapeSourceType = RNAnimated.AnimatedComponent<BaseShapeSourceComponent> & MemoExoticComponent<BaseShapeSourceComponent>;
/**
 * Manual typing is required for AnimatedShapeSource because the
 * following error:
 * `Type instantiation is excessively deep and possibly infinite.ts(2589)`
 */
export declare const AnimatedShapeSource: AnimatedShapeSourceType;
export {};
//# sourceMappingURL=Animated.d.ts.map