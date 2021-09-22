import { Loader } from './Loader';
export declare class File<TData = any, TConfig = any> {
    key: string;
    url: string;
    responseType: XMLHttpRequestResponseType;
    crossOrigin: string | undefined;
    data: TData;
    error: ErrorEvent | undefined;
    config: TConfig;
    skipCache: boolean;
    hasLoaded: boolean;
    loader: Loader;
    load: () => Promise<File<TData>>;
    constructor(key: string, url: string, config?: TConfig);
}
//# sourceMappingURL=File.d.ts.map