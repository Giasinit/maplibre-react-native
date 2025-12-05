import { OfflineCreatePackOptions } from "./OfflineCreatePackOptions";
export type OfflinePackStatus = {
    name: string;
    state: number;
    percentage: number;
    completedResourceCount: number;
    completedResourceSize: number;
    completedTileCount: number;
    completedTileSize: number;
    requiredResourceCount: number;
};
export declare class OfflinePack {
    private pack;
    private _metadata;
    constructor(pack: OfflineCreatePackOptions);
    get name(): string | null;
    get bounds(): string;
    get metadata(): Record<string, any> | null;
    status(): Promise<OfflinePackStatus>;
    resume(): Promise<void>;
    pause(): Promise<void>;
}
//# sourceMappingURL=OfflinePack.d.ts.map