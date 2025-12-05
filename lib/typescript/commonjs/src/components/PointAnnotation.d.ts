import { type ReactElement } from "react";
import { type ViewProps } from "react-native";
export declare const NATIVE_MODULE_NAME = "MLRNPointAnnotation";
type FeaturePayload = GeoJSON.Feature<GeoJSON.Point, {
    screenPointX: number;
    screenPointY: number;
}>;
export interface PointAnnotationProps {
    /**
     * A string that uniquely identifies the annotation
     */
    id: string;
    /**
     * The string containing the annotation’s title. Note this is required to be set if you want to see a callout appear on iOS.
     */
    title?: string;
    /**
     * The string containing the annotation’s snippet(subtitle). Not displayed in the default callout.
     */
    snippet?: string;
    /**
     * Manually selects/deselects annotation
     */
    selected?: boolean;
    /**
     * Enable or disable dragging. Defaults to false.
     */
    draggable?: boolean;
    /**
     * The center point (specified as a map coordinate) of the annotation.
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
         * See anchor
         */
        x: number;
        /**
         * See anchor
         */
        y: number;
    };
    /**
     * This callback is fired once this annotation is selected. Returns a Feature as the first param.
     */
    onSelected?: (payload: FeaturePayload) => void;
    /**
     * This callback is fired once this annotation is deselected.
     */
    onDeselected?: (payload: FeaturePayload) => void;
    /**
     * This callback is fired once this annotation has started being dragged.
     */
    onDragStart?: (payload: FeaturePayload) => void;
    /**
     * This callback is fired once this annotation has stopped being dragged.
     */
    onDragEnd?: (payload: FeaturePayload) => void;
    /**
     * This callback is fired while this annotation is being dragged.
     */
    onDrag?: (payload: FeaturePayload) => void;
    /**
     * Expects one child, and an optional callout can be added as well
     */
    children: ReactElement | [ReactElement, ReactElement];
    style?: ViewProps["style"];
}
export interface PointAnnotationRef {
    refresh(): void;
}
/**
 * PointAnnotation represents a one-dimensional shape located at a single geographical coordinate.
 *
 * Consider using ShapeSource and SymbolLayer instead, if you have many points, and you have static images,
 * they'll offer much better performance.
 *
 * If you need interactive views please use MarkerView,
 * as with PointAnnotation on Android child views are rendered onto a bitmap for better performance.
 */
export declare const PointAnnotation: import("react").ForwardRefExoticComponent<PointAnnotationProps & import("react").RefAttributes<PointAnnotationRef>>;
export {};
//# sourceMappingURL=PointAnnotation.d.ts.map