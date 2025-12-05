import { NativeEventEmitter, type EventSubscription } from "react-native";
import { type OfflineCreatePackInputOptions } from "./OfflineCreatePackOptions";
import { OfflinePack, type OfflinePackStatus } from "./OfflinePack";
export declare const OfflineModuleEventEmitter: NativeEventEmitter;
export type OfflinePackError = {
    name: string;
    message: string;
};
type ErrorEvent = {
    payload: OfflinePackError;
};
type ProgressEvent = {
    payload: OfflinePackStatus;
};
type ProgressListener = (pack: OfflinePack, status: OfflinePackStatus) => void;
type ErrorListener = (pack: OfflinePack, err: OfflinePackError) => void;
/**
 * OfflineManager implements a singleton (shared object) that manages offline packs.
 * All of this class’s instance methods are asynchronous, reflecting the fact that offline resources are stored in a database.
 * The shared object maintains a canonical collection of offline packs.
 */
declare class OfflineManager {
    _hasInitialized: boolean;
    _offlinePacks: Record<string, OfflinePack>;
    _progressListeners: Record<string, ProgressListener>;
    _errorListeners: Record<string, ErrorListener>;
    subscriptionProgress: EventSubscription | null;
    subscriptionError: EventSubscription | null;
    constructor();
    /**
     * Creates and registers an offline pack that downloads the resources needed to use the given region offline.
     *
     * @example
     *
     * const progressListener = (offlineRegion, status) => console.log(offlineRegion, status);
     * const errorListener = (offlineRegion, err) => console.log(offlineRegion, err);
     *
     * await OfflineManager.createPack({
     *   name: 'offlinePack',
     *   styleURL: 'https://demotiles.maplibre.org/tiles/tiles.json',
     *   minZoom: 14,
     *   maxZoom: 20,
     *   bounds: [[neLng, neLat], [swLng, swLat]]
     * }, progressListener, errorListener)
     *
     * @param  {OfflineCreatePackOptions} options Create options for a offline pack that specifices zoom levels, style url, and the region to download.
     * @param  {ProgressListener} progressListener Callback that listens for status events while downloading the offline resource.
     * @param  {ErrorListener} errorListener Callback that listens for status events while downloading the offline resource.
     * @return {void}
     */
    createPack(options: OfflineCreatePackInputOptions, progressListener: ProgressListener, errorListener: ErrorListener): Promise<void>;
    /**
     * Invalidates the specified offline pack. This method checks that the tiles in the specified offline pack match those from the server. Local tiles that do not match the latest version on the server are updated.
     *
     * This is more efficient than deleting the offline pack and downloading it again. If the data stored locally matches that on the server, new data will not be downloaded.
     *
     * @example
     * await OfflineManager.invalidatePack('packName')
     *
     * @param  {string}  name  Name of the offline pack.
     * @return {void}
     */
    invalidatePack(name: string): Promise<void>;
    /**
     * Unregisters the given offline pack and allows resources that are no longer required by any remaining packs to be potentially freed.
     *
     * @example
     * await OfflineManager.deletePack('packName')
     *
     * @param  {string}  name  Name of the offline pack.
     * @return {void}
     */
    deletePack(name: string): Promise<void>;
    /**
     * Forces a revalidation of the tiles in the ambient cache and downloads a fresh version of the tiles from the tile server.
     * This is the recommend method for clearing the cache.
     * This is the most efficient method because tiles in the ambient cache are re-downloaded to remove outdated data from a device.
     * It does not erase resources from the ambient cache or delete the database, which can be computationally expensive operations that may carry unintended side effects.
     *
     * @example
     * await OfflineManager.invalidateAmbientCache();
     *
     * @return {void}
     */
    invalidateAmbientCache(): Promise<void>;
    /**
     * Erases resources from the ambient cache.
     * This method clears the cache and decreases the amount of space that map resources take up on the device.
     *
     * @example
     * await OfflineManager.clearAmbientCache();
     *
     * @return {void}
     */
    clearAmbientCache(): Promise<void>;
    /**
     * Sets the maximum size of the ambient cache in bytes. Disables the ambient cache if set to 0.
     * This method may be computationally expensive because it will erase resources from the ambient cache if its size is decreased.
     *
     * @example
     * await OfflineManager.setMaximumAmbientCacheSize(5000000);
     *
     * @param  {number}  size  Size of ambient cache.
     * @return {void}
     */
    setMaximumAmbientCacheSize(size: number): Promise<void>;
    /**
     * Deletes the existing database, which includes both the ambient cache and offline packs, then reinitializes it.
     *
     * @example
     * await OfflineManager.resetDatabase();
     *
     * @return {void}
     */
    resetDatabase(): Promise<void>;
    /**
     * Retrieves all the current offline packs that are stored in the database.
     *
     * @example
     * const offlinePacks = await OfflineManager.getPacks();
     *
     * @return {Array<OfflinePack>}
     */
    getPacks(): Promise<OfflinePack[]>;
    /**
     * Retrieves an offline pack that is stored in the database by name.
     *
     * @example
     * const offlinePack = await OfflineManager.getPack();
     *
     * @param  {string}  name  Name of the offline pack.
     * @return {OfflinePack}
     */
    getPack(name: string): Promise<OfflinePack | undefined>;
    /**
     * Sideloads offline db
     *
     * @example
     * await OfflineManager.mergeOfflineRegions(path);
     *
     * @param {string} path Path to offline tile db on file system.
     * @return {void}
     */
    mergeOfflineRegions(path: string): Promise<void>;
    /**
     * Sets the maximum number of tiles that may be downloaded and stored on the current device.
     * Consult the Terms of Service for your map tile host before changing this value.
     *
     * @example
     * OfflineManager.setTileCountLimit(1000);
     *
     * @param {number} limit Map tile limit count.
     * @return {void}
     */
    setTileCountLimit(limit: number): void;
    /**
     * Sets the period at which download status events will be sent over the React Native bridge.
     * The default is 500ms.
     *
     * @example
     * OfflineManager.setProgressEventThrottle(500);
     *
     * @param {number} throttleValue event throttle value in ms.
     * @return {void}
     */
    setProgressEventThrottle(throttleValue: number): void;
    /**
     * Subscribe to download status/error events for the requested offline pack.
     * Note that createPack calls this internally if listeners are provided.
     *
     * @example
     * const progressListener = (offlinePack, status) => console.log(offlinePack, status)
     * const errorListener = (offlinePack, err) => console.log(offlinePack, err)
     * OfflineManager.subscribe('packName', progressListener, errorListener)
     *
     * @param  {string} packName           Name of the offline pack.
     * @param  {ProgressListener} progressListener Callback that listens for status events while downloading the offline resource.
     * @param  {ErrorListener} errorListener      Callback that listens for status events while downloading the offline resource.
     * @return {void}
     */
    subscribe(packName: string, progressListener: ProgressListener, errorListener: ErrorListener): Promise<void>;
    /**
     * Unsubscribes any listeners associated with the offline pack.
     * It's a good idea to call this on componentWillUnmount.
     *
     * @example
     * OfflineManager.unsubscribe('packName')
     *
     * @param  {string} packName Name of the offline pack.
     * @return {void}
     */
    unsubscribe(packName: string): void;
    _initialize(): Promise<boolean>;
    _onProgress(e: ProgressEvent): void;
    _onError(e: ErrorEvent): void;
    _hasListeners(name: string, listenerMap: Record<string, ProgressListener> | Record<string, ErrorListener>): boolean;
}
declare const offlineManager: OfflineManager;
export { offlineManager as OfflineManager };
//# sourceMappingURL=OfflineManager.d.ts.map