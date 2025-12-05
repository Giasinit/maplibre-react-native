import { type Component } from "react";
import { processColor, type NativeMethods } from "react-native";
import { type BaseProps } from "../types/BaseProps";
import { type AllLayerStyle, type FilterExpression } from "../types/MapLibreRNStyles";
import { type StyleValue } from "../utils/StyleValue";
export interface BaseLayerProps {
    /**
     * A string that uniquely identifies the source in the style to which it is added.
     */
    id: string;
    /**
     * The source from which to obtain the data to style.
     * If the source has not yet been added to the current style, the behavior is undefined.
     * Inferred from parent source only if the layer is a direct child to it.
     */
    sourceID?: string;
    /**
     * Identifier of the layer within the source identified by the sourceID property from which the receiver obtains the data to style.
     */
    sourceLayerID?: string;
    /**
     * Inserts a layer above aboveLayerID.
     */
    aboveLayerID?: string;
    /**
     * Inserts a layer below belowLayerID
     */
    belowLayerID?: string;
    /**
     * Inserts a layer at a specified index
     */
    layerIndex?: number;
    /**
     *  Filter only the features in the source layer that satisfy a condition that you define
     */
    /**
     * The minimum zoom level at which the layer gets parsed and appears.
     */
    minZoomLevel?: number;
    /**
     * The maximum zoom level at which the layer gets parsed and appears.
     */
    maxZoomLevel?: number;
    filter?: FilterExpression;
    /**
     * Customizable style attributes
     */
    style?: AllLayerStyle;
}
export interface NativeBaseProps {
    reactStyle?: {
        [key: string]: StyleValue;
    };
}
export declare function useAbstractLayer<Props extends BaseProps, NativeProps extends NativeBaseProps>(props: Props & BaseLayerProps): {
    baseProps: Props & BaseLayerProps;
    setNativeLayer: (instance: (Component<NativeProps> & Readonly<NativeMethods>) | null) => void;
    getStyleTypeFormatter: (styleType: string) => typeof processColor | undefined;
    setNativeProps: (nativeProps: {
        [key: string]: unknown;
    }) => void;
};
//# sourceMappingURL=useAbstractLayer.d.ts.map