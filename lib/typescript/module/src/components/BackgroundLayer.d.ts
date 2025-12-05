import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type BackgroundLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNBackgroundLayer";
export interface BackgroundLayerProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: BackgroundLayerStyle;
}
export declare const BackgroundLayer: ({ sourceID, ...props }: BackgroundLayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BackgroundLayer.d.ts.map