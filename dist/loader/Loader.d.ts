import { EventEmitter } from '../events/EventEmitter';
import { IFile } from './IFile';
import { RequestFileType } from './RequestFileType';
export declare class Loader extends EventEmitter {
    baseURL: string;
    path: string;
    crossOrigin: string;
    maxParallelDownloads: number;
    isLoading: boolean;
    progress: number;
    queue: Set<RequestFileType>;
    inflight: Set<RequestFileType>;
    completed: Set<IFile>;
    onComplete: Function;
    onError: Function;
    constructor();
    reset(): void;
    add(...file: RequestFileType[]): this;
    start(): Promise<Loader>;
    nextFile(): void;
    stop(): void;
    private updateProgress;
    private fileComplete;
    private fileError;
    totalFilesToLoad(): number;
    setBaseURL(url?: string): this;
    setPath(path?: string): this;
    setCORS(crossOrigin: string): this;
    setMaxParallelDownloads(max: number): this;
}
//# sourceMappingURL=Loader.d.ts.map