import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type LightLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNLight";
interface LightProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: LightLayerStyle;
}
/**
 * Light represents the light source for extruded geometries
 */
export declare const Light: (props: LightProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Light.d.ts.map