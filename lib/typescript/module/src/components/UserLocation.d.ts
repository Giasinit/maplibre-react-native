import { type ReactNode } from "react";
import { type Location } from "../modules/location/LocationManager";
interface UserLocationProps {
    /**
     * Whether location icon is animated between updates
     */
    animated?: boolean;
    /**
     * Which render mode to use.
     * Can either be `normal` or `native`
     */
    renderMode?: "normal" | "native";
    /**
     * native/android only render mode
     *
     *  - normal: just a circle
     *  - compass: triangle with heading
     *  - gps: large arrow
     *
     * @platform android
     */
    androidRenderMode?: "normal" | "compass" | "gps";
    /**
     * Whether location icon is visible
     */
    visible?: boolean;
    /**
     * Callback that is triggered on location icon press
     */
    onPress?: () => void;
    /**
     * Callback that is triggered on location update
     */
    onUpdate?: (location: Location) => void;
    /**
     * Show or hide small arrow which indicates direction the device is pointing relative to north.
     */
    showsUserHeadingIndicator?: boolean;
    /**
     * Minimum amount of movement before GPS location is updated in meters
     */
    minDisplacement?: number;
    /**
     * Android only. Set max FPS at which location animators can output updates. Use this setting to limit animation rate of the location puck on higher zoom levels to decrease the stress on the device's CPU which can directly improve battery life, without sacrificing UX.
     *
     * @platform android
     */
    androidPreferredFramesPerSecond?: number;
    /**
     * Custom location icon of type mapbox-gl-native components
     *
     * NOTE: Forking maintainer does not understand the above comment.
     */
    children?: ReactNode;
}
export declare enum UserLocationRenderMode {
    Native = "native",
    Normal = "normal"
}
export interface UserLocationRef {
    setLocationManager: (props: {
        running: boolean;
    }) => Promise<void>;
    needsLocationManagerRunning: () => boolean;
    _onLocationUpdate: (location: Location | null) => void;
}
export declare const UserLocation: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<UserLocationProps & import("react").RefAttributes<UserLocationRef>>>;
export {};
//# sourceMappingURL=UserLocation.d.ts.map