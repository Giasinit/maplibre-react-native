import { Component, type ReactNode } from "react";
import { type NativeMethods, type NativeSyntheticEvent } from "react-native";
import { type BaseProps } from "../types/BaseProps";
import { type ExpressionField, type FilterExpression } from "../types/MapLibreRNStyles";
import { type OnPressEvent } from "../types/OnPressEvent";
export declare const NATIVE_MODULE_NAME = "MLRNShapeSource";
interface NativeProps {
    shape?: object | string;
}
type MLRNShapeSourceRefType = Component<NativeProps> & Readonly<NativeMethods>;
export interface ShapeSourceProps extends BaseProps {
    /**
     * A string that uniquely identifies the source.
     */
    id: string;
    /**
     * An HTTP(S) URL, absolute file URL, or local file URL relative to the current application’s resource bundle.
     */
    url?: string;
    /**
     * The contents of the source. A shape can represent a GeoJSON geometry, a feature, or a feature colllection.
     */
    shape?: GeoJSON.GeometryCollection | GeoJSON.Feature | GeoJSON.FeatureCollection | GeoJSON.Geometry;
    /**
     * Enables clustering on the source for point shapes.
     */
    cluster?: boolean;
    /**
     * Specifies the radius of each cluster if clustering is enabled.
     * A value of 512 produces a radius equal to the width of a tile.
     * The default value is 50.
     */
    clusterRadius?: number;
    /**
     * Specifies minimum number of points to form a cluster if clustering is enabled.
     * The default value is 2.
     */
    clusterMinPoints?: number;
    /**
     * Specifies the maximum zoom level at which to cluster points if clustering is enabled.
     * Defaults to one zoom level less than the value of maxZoomLevel so that, at the maximum zoom level,
     * the shapes are not clustered.
     */
    clusterMaxZoomLevel?: number;
    /**
     * Specifies custom properties on the generated clusters if clustering
     * is enabled, aggregating values from clustered points.
     *
     * Has the form `{ "property_name": [operator, map_expression]}`, where
     *  `operator` is a custom reduce expression that references a special `["accumulated"]` value -
     *   it accumulates the property value from clusters/points the cluster contains
     *  `map_expression` produces the value of a single point
     *
     * @example `{ "resultingSum": [["+", ["accumulated"], ["get", "resultingSum"]], ["get", "scalerank"]] }`
     *
     */
    clusterProperties?: {
        [propertyName: string]: ExpressionField;
    };
    /**
     * Specifies the maximum zoom level at which to create vector tiles.
     * A greater value produces greater detail at high zoom levels.
     * The default value is 18.
     */
    maxZoomLevel?: number;
    /**
     * Specifies the size of the tile buffer on each side.
     * A value of 0 produces no buffer. A value of 512 produces a buffer as wide as the tile itself.
     * Larger values produce fewer rendering artifacts near tile edges and slower performance.
     * The default value is 128.
     */
    buffer?: number;
    /**
     * Specifies the Douglas-Peucker simplification tolerance.
     * A greater value produces simpler geometries and improves performance.
     * The default value is 0.375.
     */
    tolerance?: number;
    /**
     * Whether to calculate line distance metrics.
     * This is required for line layers that specify lineGradient values.
     * The default value is false.
     */
    lineMetrics?: boolean;
    /**
     * Source press listener, gets called when a user presses one of the children layers only if that layer has a higher z-index than another source layers.
     */
    onPress?: (event: OnPressEvent) => void;
    /**
     * Overrides the default touch hitbox (44x44 pixels) for the source layers
     */
    hitbox?: {
        /**
         * `width` of hitbox
         */
        width: number;
        /**
         * `height` of hitbox
         */
        height: number;
    };
    children?: ReactNode;
}
export interface ShapeSourceRef {
    features(filter?: FilterExpression): Promise<GeoJSON.FeatureCollection>;
    getClusterExpansionZoom(feature: GeoJSON.Feature): Promise<number>;
    getClusterLeaves(feature: GeoJSON.Feature, limit: number, offset: number): Promise<GeoJSON.FeatureCollection>;
    getClusterChildren(feature: GeoJSON.Feature): Promise<GeoJSON.FeatureCollection>;
    setNativeProps: (props: NativeProps) => void;
    onPress: (event: NativeSyntheticEvent<{
        payload: OnPressEvent;
    }>) => void;
    _nativeRef: MLRNShapeSourceRefType | undefined;
}
/**
 * ShapeSource is a map content source that supplies vector shapes to be shown on the map.
 * The shape may be a url or a GeoJSON object
 */
export declare const ShapeSource: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<ShapeSourceProps & import("react").RefAttributes<ShapeSourceRef>>>;
export {};
//# sourceMappingURL=ShapeSource.d.ts.map