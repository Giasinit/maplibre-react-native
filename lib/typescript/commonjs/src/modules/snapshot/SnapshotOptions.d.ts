export interface SnapshotInputOptions {
    centerCoordinate?: GeoJSON.Position;
    bounds?: GeoJSON.Position[];
    styleURL?: string;
    heading?: number;
    pitch?: number;
    zoomLevel?: number;
    width?: number;
    height?: number;
    writeToDisk?: boolean;
    withLogo?: boolean;
}
interface SnapshotJsonOptions {
    centerCoordinate?: string;
    bounds?: string;
    styleURL: string;
    heading: number;
    pitch: number;
    zoomLevel: number;
    width: number;
    height: number;
    writeToDisk: boolean;
    withLogo: boolean;
}
export declare class SnapshotOptions {
    centerCoordinate?: string;
    bounds?: string;
    styleURL: string;
    heading: number;
    pitch: number;
    zoomLevel: number;
    width: number;
    height: number;
    writeToDisk: boolean;
    withLogo: boolean;
    constructor(options: SnapshotInputOptions);
    toJSON(): SnapshotJsonOptions;
    _createCenterCoordPoint(centerCoordinate: GeoJSON.Position): string;
    _createBoundsCollection(bounds: GeoJSON.Position[]): string;
}
export {};
//# sourceMappingURL=SnapshotOptions.d.ts.map