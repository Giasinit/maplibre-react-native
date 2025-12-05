import { type ReactNode } from "react";
import { type ViewProps, type NativeSyntheticEvent } from "react-native";
import { type Location } from "../modules/location/LocationManager";
import { type BaseProps } from "../types/BaseProps";
import { type FilterExpression } from "../types/MapLibreRNStyles";
export declare const NATIVE_MODULE_NAME = "MLRNMapView";
export declare const ANDROID_TEXTURE_NATIVE_MODULE_NAME = "MLRNAndroidTextureMapView";
export interface RegionPayload {
    zoomLevel: number;
    heading: number;
    animated: boolean;
    isUserInteraction: boolean;
    visibleBounds: VisibleBounds;
    pitch: number;
}
export interface FramePayload {
    zoomLevel: number;
    heading: number;
    pitch: number;
    timestamp: number;
    visibleBounds: VisibleBounds;
}
type RegionPayloadFeature = GeoJSON.Feature<GeoJSON.Point, RegionPayload>;
type FramePayloadFeature = GeoJSON.Feature<GeoJSON.Point, FramePayload>;
type VisibleBounds = [northEast: GeoJSON.Position, southWest: GeoJSON.Position];
interface MapViewProps extends BaseProps {
    /**
     * The distance from the edges of the map view’s frame to the edges of the map view’s logical viewport.
     */
    contentInset?: number[] | number;
    /**
     * Style for wrapping React Native View
     */
    style?: ViewProps["style"];
    /**
     * Style for map - either a URL or a Style JSON (https://maplibre.org/maplibre-style-spec/). Default: `StyleURL.Default`
     */
    mapStyle?: string | object;
    /**
     * iOS: The preferred frame rate at which the map view is rendered.
     * The default value for this property is MLNMapViewPreferredFramesPerSecondDefault,
     * which will adaptively set the preferred frame rate based on the capability of
     * the user’s device to maintain a smooth experience. This property can be set to arbitrary integer values.
     *
     * Android: The maximum frame rate at which the map view is rendered, but it can't excess the ability of device hardware.
     * This property can be set to arbitrary integer values.
     */
    preferredFramesPerSecond?: number;
    /**
     * Automatically change the language of the map labels to the system’s preferred language,
     * this is not something that can be toggled on/off
     */
    localizeLabels?: boolean;
    /**
     * Enable/Disable zoom on the map
     */
    zoomEnabled?: boolean;
    /**
     * Enable/Disable scroll on the map
     */
    scrollEnabled?: boolean;
    /**
     * Enable/Disable pitch on map
     */
    pitchEnabled?: boolean;
    /**
     * Enable/Disable rotation on map
     */
    rotateEnabled?: boolean;
    /**
     * Enable/Disable attribution on map
     */
    attributionEnabled?: boolean;
    /**
     * Adds attribution offset, e.g. `{top: 8, left: 8}` will put attribution button in top-left corner of the map
     */
    attributionPosition?: {
        top?: number;
        left?: number;
    } | {
        top?: number;
        right?: number;
    } | {
        bottom?: number;
        left?: number;
    } | {
        bottom?: number;
        right?: number;
    };
    /**
     * MapView's tintColor
     */
    tintColor?: string | unknown[];
    /**
     * Enable/Disable the logo on the map.
     */
    logoEnabled?: boolean;
    /**
     * Adds logo offset, e.g. `{top: 8, left: 8}` will put the logo in top-left corner of the map
     */
    logoPosition?: {
        top?: number;
        left?: number;
    } | {
        top?: number;
        right?: number;
    } | {
        bottom?: number;
        left?: number;
    } | {
        bottom?: number;
        right?: number;
    };
    /**
     * Enable/Disable the compass from appearing on the map
     */
    compassEnabled?: boolean;
    /**
     * Change corner of map the compass starts at. 0: TopLeft, 1: TopRight, 2: BottomLeft, 3: BottomRight
     */
    compassViewPosition?: number;
    /**
     * Add margins to the compass with x and y values
     */
    compassViewMargins?: object;
    /**
     * [Android only] Enable/Disable use of GLSurfaceView instead of TextureView
     */
    surfaceView?: boolean;
    /**
     * Map press listener, gets called when a user presses the map
     */
    onPress?: (feature: GeoJSON.Feature) => void;
    /**
     * Map long press listener, gets called when a user long presses the map
     */
    onLongPress?: (feature: GeoJSON.Feature) => void;
    /**
     * Triggered when the currently displayed map region is about to change
     */
    onRegionWillChange?: (feature: RegionPayloadFeature) => void;
    /**
     * Triggered when the currently displayed map region is changing
     */
    onRegionIsChanging?: (feature: RegionPayloadFeature) => void;
    /**
     * Triggered when the currently displayed map region finished changing
     */
    onRegionDidChange?: (feature: RegionPayloadFeature) => void;
    /**
     * Triggered when the map is about to start loading a new map style
     */
    onWillStartLoadingMap?: () => void;
    /**
     * This is triggered when the map has successfully loaded a new map style
     */
    onDidFinishLoadingMap?: () => void;
    /**
     * Triggered when the map has failed to load a new map style
     */
    onDidFailLoadingMap?: () => void;
    /**
     * Triggered when the map will start rendering a frame
     */
    onWillStartRenderingFrame?: () => void;
    /**
     * Triggered when the map finished rendering a frame
     */
    onDidFinishRenderingFrame?: () => void;
    /**
     * Triggered when the map fully finished rendering a frame
     */
    onDidFinishRenderingFrameFully?: () => void;
    /**
     * Triggered when the map will start rendering the map
     */
    onWillStartRenderingMap?: () => void;
    /**
     * Triggered when the map finished rendering the map
     */
    onDidFinishRenderingMap?: () => void;
    /**
     * Triggered when the map fully finished rendering the map
     */
    onDidFinishRenderingMapFully?: () => void;
    /**
     * Triggered when the user location is updated
     */
    onUserLocationUpdate?: (location: Location) => void;
    /**
     * Triggered when a style has finished loading
     */
    onDidFinishLoadingStyle?: () => void;
    /**
     * Enable ultra-high-frequency frame updates (≈60 FPS).
     * When enabled, onCameraChangedOnFrame will be called every rendering frame.
     * Use this for smooth animations that need to track camera position in real-time.
     * Note: This is an iOS-only feature.
     */
    frameUpdateEnabled?: boolean;
    /**
     * Callback invoked every rendering frame (≈60 FPS) with current camera state.
     * Only fires when frameUpdateEnabled is true.
     * Note: This is an iOS-only feature.
     */
    onCameraChangedOnFrame?: (feature: FramePayloadFeature) => void;
    /**
     * Emitted frequency of regionWillChange events
     */
    regionWillChangeDebounceTime?: number;
    /**
     * Emitted frequency of regionDidChange events
     */
    regionDidChangeDebounceTime?: number;
    children?: ReactNode;
}
interface NativeProps extends Omit<MapViewProps, "onPress" | "onLongPress" | "onCameraChangedOnFrame"> {
    mapStyle?: string;
    onPress(event: NativeSyntheticEvent<{
        payload: GeoJSON.Feature;
    }>): void;
    onLongPress(event: NativeSyntheticEvent<{
        payload: GeoJSON.Feature;
    }>): void;
    onCameraChangedOnFrame?(event: NativeSyntheticEvent<{
        payload: FramePayloadFeature;
    }>): void;
}
export interface MapViewRef {
    getPointInView: (coordinate: GeoJSON.Position) => Promise<[x: number, y: number]>;
    getCoordinateFromView: (point: [x: number, y: number]) => Promise<GeoJSON.Position>;
    getVisibleBounds: () => Promise<VisibleBounds>;
    queryRenderedFeaturesAtPoint: (point: [screenPointX: number, screenPointY: number], filter: FilterExpression | undefined, layerIDs: string[]) => Promise<GeoJSON.FeatureCollection>;
    queryRenderedFeaturesInRect: (bbox: GeoJSON.BBox, filter: FilterExpression | undefined, layerIDs: string[]) => Promise<GeoJSON.FeatureCollection>;
    takeSnap: (writeToDisk?: boolean) => Promise<string>;
    getZoom: () => Promise<number>;
    getCenter: () => Promise<GeoJSON.Position>;
    setSourceVisibility: (visible: boolean, sourceId: string, sourceLayerId?: string | null) => void;
    showAttribution: () => Promise<void>;
    setNativeProps: (props: NativeProps) => void;
}
/**
 * MapView backed by MapLibre Native
 */
export declare const MapView: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<MapViewProps & import("react").RefAttributes<MapViewRef>>>;
export {};
//# sourceMappingURL=MapView.d.ts.map