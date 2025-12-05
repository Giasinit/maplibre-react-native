import { type ViewProps, type ViewStyle } from "react-native";
export declare const NATIVE_MODULE_NAME = "MLRNCallout";
interface CalloutProps extends Omit<ViewProps, "style"> {
    /**
     * String that get's displayed in the default callout.
     */
    title?: string;
    /**
     * Style property for the Animated.View wrapper, apply animations to this
     */
    style?: ViewStyle;
    /**
     * Style property for the native MLRNCallout container, set at your own risk.
     */
    containerStyle?: ViewStyle;
    /**
     * Style property for the content bubble.
     */
    contentStyle?: ViewStyle;
    /**
     * Style property for the triangle tip under the content.
     */
    tipStyle?: ViewStyle;
    /**
     * Style property for the title in the content bubble.
     */
    textStyle?: ViewStyle;
}
/**
 *  Callout that displays information about a selected annotation near the annotation.
 */
export declare const Callout: (props: CalloutProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Callout.d.ts.map