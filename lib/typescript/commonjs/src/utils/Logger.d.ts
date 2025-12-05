export type LogLevel = "error" | "warning" | "info" | "debug" | "verbose";
interface Log {
    message: string;
    level: LogLevel;
    tag?: string;
}
type LogCallback = (log: Log) => boolean;
export declare class Logger {
    static instance: Logger | null;
    static sharedInstance(): Logger;
    private loggerEmitter;
    private startedCount;
    private logCallback;
    private subscription;
    constructor();
    /**
     * Set custom logger function.
     * @param {Logger~logCallback} logCallback - callback taking a log object as param. If callback return falsy value then
     * default logging will take place.
     */
    static setLogCallback(logCallback: LogCallback): void;
    /**
     * Set custom logger function.
     * @param {Logger~logCallback} logCallback - callback taking a log object as param. If callback return falsy value then
     * default logging will take place.
     */
    setLogCallback(logCallback: LogCallback): void;
    /**
     * This callback is displayed as part of the Requester class.
     * @callback Logger~logCallback
     * @param {object} log
     * @param {string} log.message - the message of the log
     * @param {string} log.level - log level
     * @param {string} log.tag - optional tag used on android
     */
    /**
     * setLogLevel
     * @param {LogLevel} level
     */
    static setLogLevel(level: LogLevel): void;
    /**
     * @type {('error'|'warning'|'info'|'debug'|'verbose')} LogLevel - Supported log levels
     */
    start(): void;
    stop(): void;
    subscribe(): void;
    unsubscribe(): void;
    effectiveLevel({ level, message, tag }: Log): LogLevel;
    onLog(log: Log): void;
}
export {};
//# sourceMappingURL=Logger.d.ts.map