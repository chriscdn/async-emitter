class AsyncEmitter<
    Events extends Record<string, (...args: any[]) => any>,
> {
    private listeners = new Map<keyof Events, Set<Events[keyof Events]>>();

    // Register an event listener
    on<K extends keyof Events>(event: K, listener: Events[K]): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        this.listeners.get(event)!.add(listener);
    }

    // Remove an event listener
    off<K extends keyof Events>(event: K, listener: Events[K]): void {
        this.listeners.get(event)?.delete(listener);
    }

    // Emit an event and await all async listeners
    async emit<K extends keyof Events>(
        event: K,
        ...args: Parameters<Events[K]>
    ): Promise<ReturnType<Events[K]>[]> {
        const handlers = this.listeners.get(event) ?? [];

        return await Promise.all(
            [...handlers].map((handler) => handler(...args)),
        );
    }

    // Remove all listeners for an event
    removeAllListeners<K extends keyof Events>(event: K): void {
        this.listeners.delete(event);
    }
}

export { AsyncEmitter };
