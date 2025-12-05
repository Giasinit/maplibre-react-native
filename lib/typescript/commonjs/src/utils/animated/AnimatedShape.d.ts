import { Animated } from "react-native";
import type { AnimatedCoordinatesArray } from "./AnimatedCoordinatesArray";
import { AnimatedExtractCoordinateFromArray } from "./AnimatedExtractCoordinateFromArray";
import { AnimatedRouteCoordinatesArray } from "./AnimatedRouteCoordinatesArray";
declare const AnimatedWithChildren: any;
type Shape = {
    type: "Point";
    coordinates: AnimatedExtractCoordinateFromArray;
} | {
    type: "LineString";
    coordinates: AnimatedCoordinatesArray | AnimatedRouteCoordinatesArray;
};
/**
 * AnimatedShape can be used to have animated properties inside the shape property
 *
 * Equivalent of AnimatedStyle for shapes
 * https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Animated/nodes/AnimatedStyle.js
 *
 * @example
 * <AnimatedShapeSource ... shape={new AnimatedShape({type:'LineString', coordinates: animatedCoords})} />
 */
export declare class AnimatedShape extends AnimatedWithChildren {
    constructor(shape: Shape);
    _walkShapeAndGetValues(value: any): any;
    __getValue(): GeoJSON.Point | GeoJSON.LineString;
    _walkAndProcess(value: any, cb: (value: Animated.Node) => void): void;
    __attach(): void;
    __detach(): void;
}
export {};
//# sourceMappingURL=AnimatedShape.d.ts.map