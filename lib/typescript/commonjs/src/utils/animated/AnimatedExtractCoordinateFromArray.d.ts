import type { AnimatedCoordinates } from "./AbstractAnimatedCoordinates";
import { AnimatedRouteCoordinatesArray } from "./AnimatedRouteCoordinatesArray";
declare const AnimatedWithChildren: any;
export declare class AnimatedExtractCoordinateFromArray extends AnimatedWithChildren {
    _array: AnimatedRouteCoordinatesArray;
    _index: number;
    constructor(array: AnimatedRouteCoordinatesArray, index: number);
    __getValue(): AnimatedCoordinates;
    __attach(): void;
    __detach(): void;
}
export {};
//# sourceMappingURL=AnimatedExtractCoordinateFromArray.d.ts.map