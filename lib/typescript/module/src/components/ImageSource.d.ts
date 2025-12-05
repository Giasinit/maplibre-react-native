import { type ReactNode } from "react";
import { type BaseProps } from "../types/BaseProps";
export declare const NATIVE_MODULE_NAME = "MLRNImageSource";
export interface ImageSourceProps extends BaseProps {
    /**
     * A string that uniquely identifies the source.
     */
    id: string;
    /**
     * An HTTP(S) URL, absolute file URL, or local file URL to the source image.
     * Gifs are currently not supported.
     */
    url?: number | string;
    /**
     * The top left, top right, bottom right, and bottom left coordinates for the image.
     */
    coordinates?: [
        GeoJSON.Position,
        GeoJSON.Position,
        GeoJSON.Position,
        GeoJSON.Position
    ];
    children?: ReactNode;
}
/**
 * ImageSource is a content source that is used for a georeferenced raster image to be shown on the map.
 * The georeferenced image scales and rotates as the user zooms and rotates the map
 */
export declare const ImageSource: (props: ImageSourceProps) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=ImageSource.d.ts.map