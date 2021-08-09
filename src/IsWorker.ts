export const IsWorker: boolean = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
