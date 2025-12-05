import { type ReactNode } from "react";
import { type ImageSourcePropType } from "react-native";
import type { ImageRequireSource, ImageURISource } from "react-native/Libraries/Image/ImageSource";
import { type BaseProps } from "../types/BaseProps";
export declare const NATIVE_MODULE_NAME = "MLRNImages";
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export type ImageSourceWithSdf = {
    source: ImageSourcePropType;
    sdf?: boolean;
};
export type ImageEntry = string | ImageRequireSource | ImageURISource[] | XOR<ImageURISource, ImageSourceWithSdf>;
interface ImagesProps extends BaseProps {
    /**
     * Specifies the external images in key-value pairs required for the shape source.
     * Keys are names - see iconImage expressions, values can be either urls-s objects
     * with format `{uri: 'http://...'}` or `require('image.png')` or `import "image.png"`
     */
    images?: {
        [key: string]: ImageEntry;
    };
    /**
     * If you have an asset under Image.xcassets on iOS and the drawables directory on android
     * you can specify an array of string names with assets as the key `['pin']`.
     */
    nativeAssetImages?: string[];
    /**
     * Gets called when a Layer is trying to render an image whose key is not present in
     * any of the `Images` component of the Map.
     */
    onImageMissing?: (imageKey: string) => void;
    id?: string;
    children?: ReactNode;
}
/**
 * Images defines the images used in Symbol layers
 */
export declare const Images: ({ images, nativeAssetImages, onImageMissing, id, children, }: ImagesProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Images.d.ts.map