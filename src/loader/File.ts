import { Loader } from './Loader';

export class File <TData = any, TConfig = any>
{
    key: string;
    url: string;
    responseType: XMLHttpRequestResponseType = 'text';
    crossOrigin: string | undefined = undefined;

    data: TData;

    error: ErrorEvent | undefined;
    config: TConfig;
    skipCache: boolean = false;
    hasLoaded: boolean = false;
    loader: Loader;
    load: () => Promise<File<TData>>;

    constructor (key: string, url: string, config?: TConfig)
    {
        this.key = key;
        this.url = url;
        this.config = config;
    }
}
