import { Animated } from "react-native";
declare const AnimatedWithChildren: any;
export type AnimatedCoordinates = [number, number];
export declare abstract class AbstractAnimatedCoordinates<State, ToValue = AnimatedCoordinates[]> extends AnimatedWithChildren {
    constructor(coordinates: AnimatedCoordinates[]);
    /**
     * Subclasses can override to calculate initial state
     *
     * @returns {object} - the state object
     * @param coordinates
     */
    abstract onInitialState(coordinates: AnimatedCoordinates[]): State;
    /**
     * Calculates state based on startingState and progress, returns a new state
     *
     * @param {object} state - state object from initialState and/or from calculate
     * @param {number} progress - value between 0 and 1
     * @returns {object} next state
     */
    abstract onCalculate(state: State, progress: number): State;
    animate(progressValue: Animated.Value, progressAnimation: Animated.CompositeAnimation, config: Omit<Animated.TimingAnimationConfig | Animated.SpringAnimationConfig | Animated.DecayAnimationConfig, "toValue"> & {
        toValue: ToValue;
    }): Animated.CompositeAnimation;
    timing(config: Omit<Animated.TimingAnimationConfig, "toValue" | "useNativeDriver"> & {
        toValue: ToValue;
    }): Animated.CompositeAnimation;
    spring(config: Omit<Animated.SpringAnimationConfig, "toValue"> & {
        toValue: ToValue;
    }): Animated.CompositeAnimation;
    decay(config: Omit<Animated.DecayAnimationConfig, "toValue"> & {
        toValue: ToValue;
    }): Animated.CompositeAnimation;
    __getValue(): AnimatedCoordinates[];
}
export {};
//# sourceMappingURL=AbstractAnimatedCoordinates.d.ts.map