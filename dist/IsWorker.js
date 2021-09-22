export const IsWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
