import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type FillLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNFillLayer";
export interface FillLayerProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: FillLayerStyle;
}
/**
 * FillLayer is a style layer that renders one or more filled (and optionally stroked) polygons on the map.
 */
export declare const FillLayer: ({ sourceID, ...props }: FillLayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FillLayer.d.ts.map