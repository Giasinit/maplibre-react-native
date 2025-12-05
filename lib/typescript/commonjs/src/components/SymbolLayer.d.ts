import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type SymbolLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNSymbolLayer";
export interface SymbolLayerProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: SymbolLayerStyle;
}
/**
 * SymbolLayer is a style layer that renders icon and text labels at points or along lines on the map.
 */
export declare const SymbolLayer: ({ sourceID, ...props }: SymbolLayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SymbolLayer.d.ts.map