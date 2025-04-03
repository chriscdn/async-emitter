declare class AsyncEmitter<Events extends Record<string, (...args: any[]) => any>> {
    private listeners;
    on<K extends keyof Events>(event: K, listener: Events[K]): void;
    off<K extends keyof Events>(event: K, listener: Events[K]): void;
    emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): Promise<ReturnType<Events[K]>[]>;
    removeAllListeners<K extends keyof Events>(event: K): void;
}
export { AsyncEmitter };
