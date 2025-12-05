import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type HeatmapLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNHeatmapLayer";
export interface HeatmapLayerProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: HeatmapLayerStyle;
}
/**
 * HeatmapLayer is a style layer that renders one or more filled circles on the map.
 */
export declare const HeatmapLayer: ({ sourceID, ...props }: HeatmapLayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HeatmapLayer.d.ts.map