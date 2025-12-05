import { type ReactElement } from "react";
import { type ViewProps } from "react-native";
export declare const NATIVE_MODULE_NAME = "MLRNMarkerView";
interface MarkerViewProps extends ViewProps {
    /**
     * The center point (specified as a map coordinate) of the marker.
     * See also #anchor.
     */
    coordinate: number[];
    /**
     * Specifies the anchor being set on a particular point of the annotation.
     * The anchor point is specified in the continuous space [0.0, 1.0] x [0.0, 1.0],
     * where (0, 0) is the top-left corner of the image, and (1, 1) is the bottom-right corner.
     * Note this is only for custom annotations not the default pin view.
     * Defaults to the center of the view.
     */
    anchor?: {
        /**
         * `x` of anchor
         */
        x: number;
        /**
         * `y` of anchor
         */
        y: number;
    };
    allowOverlap?: boolean;
    isSelected?: boolean;
    /**
     * Expects one child - can be container with multiple elements
     */
    children: ReactElement;
}
/**
 * MarkerView allows you to place a interactive react native marker to the map.
 *
 * If you have static view consider using PointAnnotation or SymbolLayer they'll offer much better performance
 * .
 * This is based on [MakerView plugin](https://github.com/maplibre/maplibre-plugins-android/tree/main/plugin-markerview) on Android
 * and PointAnnotation on iOS.
 */
export declare const MarkerView: ({ anchor, allowOverlap, isSelected, ...rest }: MarkerViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MarkerView.d.ts.map