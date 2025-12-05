import { CameraMode } from "./types/CameraMode";
export declare const CameraModes: {
    Flight: CameraMode.Flight;
    Ease: CameraMode.Ease;
    Linear: CameraMode.Linear;
    None: CameraMode.None;
}, OfflinePackDownloadState: {
    Inactive: string | number;
    Active: string | number;
    Complete: string | number;
    Unknown?: string | number;
}, StyleSource: {
    DefaultSourceID: string;
}, StyleURL: {
    Default: string;
}, setAccessToken: (accessToken: string | null) => Promise<string | null>, getAccessToken: () => Promise<string>, addCustomHeader: (headerName: string, headerValue: string) => void, removeCustomHeader: (headerName: string) => void, setConnected: (connected: boolean) => void;
//# sourceMappingURL=MLRNModule.d.ts.map