import { Animated } from "react-native";
declare const AnimatedWithChildren: any;
export declare class AnimatedPoint extends AnimatedWithChildren {
    constructor(point?: {
        type: string;
        coordinates: number[];
    });
    setValue(point?: {
        type: string;
        coordinates: number[];
    }): void;
    setOffset(point?: {
        type: string;
        coordinates: number[];
    }): void;
    flattenOffset(): void;
    stopAnimation(cb?: (value: GeoJSON.Point) => void): void;
    addListener(cb?: (value: GeoJSON.Point) => void): string;
    removeListener(id: string): void;
    spring(config?: Partial<Animated.TimingAnimationConfig> & {
        coordinates: GeoJSON.Position;
    }): Animated.CompositeAnimation;
    timing(config?: Partial<Animated.TimingAnimationConfig> & {
        coordinates: GeoJSON.Position;
    }): Animated.CompositeAnimation;
    __getValue(): GeoJSON.Point;
    __attach(): void;
    __detach(): void;
}
export {};
//# sourceMappingURL=AnimatedPoint.d.ts.map