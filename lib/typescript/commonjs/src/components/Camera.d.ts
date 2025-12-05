import { type ViewProps } from "react-native";
import { type BaseProps } from "../types/BaseProps";
import { CameraMode } from "../types/CameraMode";
import { type MapLibreRNEvent } from "../types/MapLibreRNEvent";
export declare const NATIVE_MODULE_NAME = "MLRNCamera";
export declare enum UserTrackingMode {
    Follow = "normal",
    FollowWithHeading = "compass",
    FollowWithCourse = "course"
}
export type UserTrackingModeChangeCallback = (event: MapLibreRNEvent<"usertrackingmodechange", {
    followUserLocation: boolean;
    followUserMode: UserTrackingMode | null;
}>) => void;
export declare function getNativeCameraMode(mode?: CameraAnimationMode): CameraMode;
export interface CameraRef {
    setCamera: (config: CameraStop | CameraStops) => void;
    fitBounds: (ne: GeoJSON.Position, sw: GeoJSON.Position, paddingConfig?: number | number[], animationDuration?: number) => void;
    flyTo: (coordinates: GeoJSON.Position, animationDuration?: number) => void;
    moveTo: (coordinates: GeoJSON.Position, animationDuration?: number) => void;
    zoomTo: (zoomLevel: number, animationDuration?: number) => void;
}
export interface CameraPadding {
    /**
     * Left padding in points
     */
    paddingLeft?: number;
    /**
     * Right padding in points
     */
    paddingRight?: number;
    /**
     * Top padding in points
     */
    paddingTop?: number;
    /**
     * Bottom padding in points
     */
    paddingBottom?: number;
}
export interface CameraBounds {
    /**
     * North east coordinate of bound
     */
    ne: number[];
    /**
     * South west coordinate of bound
     */
    sw: number[];
}
interface CameraBoundsWithPadding extends CameraBounds, Partial<CameraPadding> {
}
export type CameraAnimationMode = "flyTo" | "easeTo" | "linearTo" | "moveTo";
export interface NativeCameraStop extends CameraPadding {
    duration?: number;
    mode?: CameraMode;
    pitch?: number;
    heading?: number;
    zoom?: number;
    centerCoordinate?: string;
    bounds?: string;
}
export interface CameraStop {
    /** The location on which the map should center. */
    centerCoordinate?: GeoJSON.Position;
    /** The corners of a box around which the map should bound. Contains padding props for backwards
     * compatibility; the root `padding` prop should be used instead. */
    bounds?: CameraBoundsWithPadding;
    /** The heading (orientation) of the map. */
    heading?: number;
    /** The pitch of the map. */
    pitch?: number;
    /** The zoom level of the map. */
    zoomLevel?: number;
    /** The viewport padding in points. */
    padding?: CameraPadding;
    /** The duration the map takes to animate to a new configuration. */
    animationDuration?: number;
    /** The easing or path the camera uses to animate to a new configuration. */
    animationMode?: CameraAnimationMode;
}
export type CameraStops = {
    stops: CameraStop[];
};
export interface CameraProps extends BaseProps, CameraStop {
    /**
     * Default view settings applied on camera
     */
    defaultSettings?: CameraStop;
    /**
     * Minimum zoom level of the map
     */
    minZoomLevel?: number;
    /**
     * Maximum zoom level of the map
     */
    maxZoomLevel?: number;
    /**
     * Restrict map panning so that the center is within these bounds
     */
    maxBounds?: CameraBounds;
    /**
     * Should the map orientation follow the user's.
     */
    followUserLocation?: boolean;
    /**
     * The mode used to track the user location on the map. One of; "normal", "compass", "course". Each mode string is also available as a member on the `UserTrackingMode` object. `Follow` (normal), `FollowWithHeading` (compass), `FollowWithCourse` (course). NOTE: `followUserLocation` must be set to `true` for any of the modes to take effect.
     */
    followUserMode?: UserTrackingMode;
    /**
     * The zoomLevel on map while followUserLocation is set to `true`
     */
    followZoomLevel?: number;
    /**
     * The pitch on map while followUserLocation is set to `true`
     */
    followPitch?: number;
    /**
     * The heading on map while followUserLocation is set to `true`
     */
    followHeading?: number;
    /**
     * Triggered when `followUserLocation` or `followUserMode` changes
     */
    onUserTrackingModeChange?: UserTrackingModeChangeCallback;
}
export interface NativeCameraProps extends Omit<CameraProps, "maxBounds">, ViewProps {
    maxBounds?: string;
    stop?: NativeCameraStop;
    defaultStop?: NativeCameraStop;
}
export declare const Camera: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<CameraProps & import("react").RefAttributes<CameraRef>>>;
export {};
//# sourceMappingURL=Camera.d.ts.map