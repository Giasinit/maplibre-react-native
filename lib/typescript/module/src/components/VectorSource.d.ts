import { type ReactNode } from "react";
import { type BaseProps } from "../types/BaseProps";
import { type OnPressEvent } from "../types/OnPressEvent";
export declare const NATIVE_MODULE_NAME = "MLRNVectorSource";
interface VectorSourceProps extends BaseProps {
    /**
     * A string that uniquely identifies the source.
     */
    id: string;
    /**
     * A URL to a TileJSON configuration file describing the source’s contents and other metadata.
     */
    url?: string;
    /**
     * An array of tile URL templates. If multiple endpoints are specified, clients may use any combination of endpoints.
     * Example: https://example.com/vector-tiles/{z}/{x}/{y}.pbf
     */
    tileUrlTemplates?: string[];
    /**
     * An unsigned integer that specifies the minimum zoom level at which to display tiles from the source.
     * The value should be between 0 and 22, inclusive, and less than
     * maxZoomLevel, if specified. The default value for this option is 0.
     */
    minZoomLevel?: number;
    /**
     * An unsigned integer that specifies the maximum zoom level at which to display tiles from the source.
     * The value should be between 0 and 22, inclusive, and less than
     * minZoomLevel, if specified. The default value for this option is 22.
     */
    maxZoomLevel?: number;
    /**
     * Influences the y direction of the tile coordinates. (tms inverts y axis)
     */
    tms?: boolean;
    /**
     * An HTML or literal text string defining the buttons to be displayed in an action sheet when the
     * source is part of a map view’s style and the map view’s attribution button is pressed.
     */
    attribution?: string;
    /**
     * Source press listener, gets called when a user presses one of the children layers only
     * if that layer has a higher z-index than another source layers
     */
    onPress?: (event: OnPressEvent) => void;
    /**
     * Overrides the default touch hitbox(44x44 pixels) for the source layers
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
/**
 * VectorSource is a map content source that supplies tiled vector data in Mapbox Vector Tile format to be shown on the map.
 * The location of and metadata about the tiles are defined either by an option dictionary or by an external file that conforms to the TileJSON specification.
 */
export declare const VectorSource: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<VectorSourceProps & import("react").RefAttributes<unknown>>>;
export {};
//# sourceMappingURL=VectorSource.d.ts.map