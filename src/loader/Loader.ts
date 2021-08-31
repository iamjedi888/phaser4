import { Emit } from '../events/Emit';
import { EventEmitter } from '../events/EventEmitter';
import { IFile } from './IFile';
import { ILoaderFile } from './ILoaderFile';
import { IRequestFile } from './IRequestFile';
import { RequestFile } from './RequestFile';

export class Loader extends EventEmitter
{
    baseURL: string = '';
    path: string = '';
    crossOrigin: string = 'anonymous';

    //  -1 means load everything at once (only recommended on http/2 servers)
    maxParallelDownloads: number = -1;

    isLoading: boolean = false;
    progress: number;

    queue: Set<ILoaderFile>;
    inflight: Set<ILoaderFile>;
    completed: Set<IFile>;

    onComplete: Function;
    onError: Function;

    constructor ()
    {
        super();

        this.reset();
    }

    reset (): void
    {
        this.isLoading = false;

        this.queue = new Set();
        this.inflight = new Set();
        this.completed = new Set();

        this.progress = 0;
    }

    add (...file: IRequestFile[]): this
    {
        file.forEach(entity =>
        {
            const file = entity.onstart(this);

            // console.log('Loader.add', entity);

            this.queue.add({ file, preload: entity.preload, onload: entity.onload, fileData: entity.fileData });
        });

        return this;
    }

    start (): Promise<Loader>
    {
        if (this.isLoading)
        {
            return null;
        }

        return new Promise((resolve, reject) =>
        {
            this.completed.clear();
            this.progress = 0;

            if (this.queue.size > 0)
            {
                this.isLoading = true;

                this.onComplete = resolve;
                this.onError = reject;

                // console.log('Loader.start');

                Emit(this, 'start');

                this.nextFile();
            }
            else
            {
                this.progress = 1;

                Emit(this, 'complete');

                resolve(this);
            }
        });
    }

    nextFile (): void
    {
        let limit = this.queue.size;

        if (this.maxParallelDownloads !== -1)
        {
            limit = Math.min(limit, this.maxParallelDownloads) - this.inflight.size;
        }

        // console.log('Loader.nextFile', limit);

        if (limit)
        {
            // console.log('Batching', limit, 'files to download');

            const iterator = this.queue.values();

            while (limit > 0)
            {
                const queueEntry = iterator.next().value;

                this.inflight.add(queueEntry);

                this.queue.delete(queueEntry);

                const { file, preload, onload, fileData } = queueEntry;

                RequestFile(file, preload, onload, fileData)
                    .then((file: IFile) =>
                    {
                        this.fileComplete(file);
                        this.updateProgress(file, queueEntry);
                    })
                    .catch((file: IFile) =>
                    {
                        this.fileError(file);
                        this.updateProgress(file, queueEntry);
                    });

                limit--;
            }
        }
        else if (this.inflight.size === 0)
        {
            // console.log('Loader inflight zero');

            this.stop();
        }
    }

    stop (): void
    {
        if (!this.isLoading)
        {
            return;
        }

        this.isLoading = false;

        Emit(this, 'complete', this.completed);

        this.onComplete();

        this.completed.clear();
    }

    private updateProgress (file: IFile, queueEntry: ILoaderFile): void
    {
        this.inflight.delete(queueEntry);

        this.completed.add(file);

        const totalCompleted = this.completed.size;
        const totalQueued = this.queue.size + this.inflight.size;

        if (totalCompleted > 0)
        {
            this.progress = totalCompleted / (totalCompleted + totalQueued);
        }

        Emit(this, 'progress', this.progress, totalCompleted, totalQueued);

        this.nextFile();
    }

    private fileComplete (file: IFile): void
    {
        Emit(this, 'filecomplete', file);
    }

    private fileError (file: IFile): void
    {
        Emit(this, 'fileerror', file);
    }

    totalFilesToLoad (): number
    {
        return this.queue.size + this.inflight.size;
    }

    setBaseURL (url: string = ''): this
    {
        if (url !== '' && url.substr(-1) !== '/')
        {
            url = url.concat('/');
        }

        this.baseURL = url;

        return this;
    }

    setPath (path: string = ''): this
    {
        if (path !== '' && path.substr(-1) !== '/')
        {
            path = path.concat('/');
        }

        this.path = path;

        return this;
    }

    setCORS (crossOrigin: string): this
    {
        this.crossOrigin = crossOrigin;

        return this;
    }

    setMaxParallelDownloads (max: number): this
    {
        this.maxParallelDownloads = max;

        return this;
    }
}
