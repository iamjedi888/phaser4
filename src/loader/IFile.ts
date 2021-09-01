export interface IFile
{
    key: string;
    url: string;
    skipCache: boolean;
    data?: unknown;
    error?: Error | unknown;
    response?: Response;
}
