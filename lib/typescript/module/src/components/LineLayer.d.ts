import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type LineLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNLineLayer";
export interface LineLayerProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: LineLayerStyle;
}
/**
 * LineLayer is a style layer that renders one or more stroked polylines on the map.
 */
export declare const LineLayer: ({ sourceID, ...props }: LineLayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LineLayer.d.ts.map