export interface OfflineCreatePackInputOptions {
    name: string;
    styleURL: string;
    bounds: [GeoJSON.Position, GeoJSON.Position];
    minZoom?: number;
    maxZoom?: number;
    metadata?: Record<string, any>;
}
export declare class OfflineCreatePackOptions {
    name: string;
    styleURL: string;
    bounds: string;
    minZoom?: number;
    maxZoom?: number;
    metadata: string;
    constructor(options: OfflineCreatePackInputOptions);
    _assert(options: OfflineCreatePackInputOptions): void;
    _makeMetadata(metadata?: Record<string, any>): string;
}
//# sourceMappingURL=OfflineCreatePackOptions.d.ts.map