import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type CircleLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNCircleLayer";
export interface CircleLayerProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: CircleLayerStyle;
}
/**
 * CircleLayer is a style layer that renders one or more filled circles on the map.
 */
export declare const CircleLayer: ({ sourceID, ...props }: CircleLayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CircleLayer.d.ts.map