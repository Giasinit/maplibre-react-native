import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type FillExtrusionLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNFillExtrusionLayer";
export interface FillExtrusionLayerProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: FillExtrusionLayerStyle;
}
/**
 * FillExtrusionLayer is a style layer that renders one or more 3D extruded polygons on the map.
 */
export declare const FillExtrusionLayer: ({ sourceID, ...props }: FillExtrusionLayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FillExtrusionLayer.d.ts.map