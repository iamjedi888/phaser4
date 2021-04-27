import { Emit, EventEmitter } from '../events';

import { File } from './File';

export class Loader extends EventEmitter
{
    baseURL: string = '';
    path: string = '';
    crossOrigin: string = 'anonymous';

    //  -1 means load everything at once (only recommended on http/2 servers)
    maxParallelDownloads: number = -1;

    isLoading: boolean = false;
    progress: number;

    queue: Set<File>;
    inflight: Set<File>;
    completed: Set<File>;

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

    add (...file: File[]): this
    {
        file.forEach(entity =>
        {
            entity.loader = this;

            this.queue.add(entity);
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
                // onComplete();
            }
        });

        /*
        if (this.isLoading)
        {
            return this;
        }

        this.completed.clear();
        this.progress = 0;

        if (this.queue.size > 0)
        {
            this.isLoading = true;

            this.onComplete = onComplete;

            // console.log('Loader.start');

            Emit(this, 'start');

            this.nextFile();
        }
        else
        {
            this.progress = 1;

            Emit(this, 'complete');

            onComplete();
        }

        return this;
        */
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
                const file = iterator.next().value;

                // console.log('Loader.nextFile', file.key, '=>', file.url);

                this.inflight.add(file);

                this.queue.delete(file);

                file.load()
                    .then(
                        (file: File) => this.fileComplete(file)
                    )
                    .catch(
                        (file: File) => this.fileError(file)
                    );

                limit--;
            }
        }
        else if (this.inflight.size === 0)
        {
            // console.log('Loader inflight zero');

            this.stop();

            // window.setTimeout(() => this.stop(), 0);
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

    private updateProgress (file: File): void
    {
        this.inflight.delete(file);
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

    private fileComplete (file: File): void
    {
        Emit(this, 'filecomplete', file);

        this.updateProgress(file);
    }

    private fileError (file: File): void
    {
        Emit(this, 'fileerror', file);

        this.updateProgress(file);
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
