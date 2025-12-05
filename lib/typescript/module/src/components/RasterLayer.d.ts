import { type BaseLayerProps } from "../hooks/useAbstractLayer";
import { type BaseProps } from "../types/BaseProps";
import { type RasterLayerStyle } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNRasterLayer";
export interface RasterLayerProps extends BaseProps, BaseLayerProps {
    /**
     * Customizable style attributes
     */
    style?: RasterLayerStyle;
}
export declare const RasterLayer: ({ sourceID, ...props }: RasterLayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RasterLayer.d.ts.map