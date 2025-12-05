import { NativeEventEmitter, type EmitterSubscription } from "react-native";
export declare const LocationModuleEventEmitter: NativeEventEmitter;
export interface Location {
    coords: Coordinates;
    timestamp?: number;
}
interface Coordinates {
    heading?: number;
    course?: number;
    speed?: number;
    latitude: number;
    longitude: number;
    accuracy?: number;
    altitude?: number;
}
declare class LocationManager {
    _listeners: ((location: Location) => void)[];
    _lastKnownLocation: Location | null;
    _isListening: boolean;
    subscription: EmitterSubscription | null;
    constructor();
    getLastKnownLocation(): Promise<Location | null>;
    addListener(listener: (location: Location) => void): void;
    removeListener(listener: (location: Location) => void): void;
    removeAllListeners(): void;
    start(displacement?: number): void;
    stop(): void;
    setMinDisplacement(minDisplacement: number): void;
    onUpdate(location: Location): void;
}
declare const locationManager: LocationManager;
export { locationManager as LocationManager };
//# sourceMappingURL=LocationManager.d.ts.map