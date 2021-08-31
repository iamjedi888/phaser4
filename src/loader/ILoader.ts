export interface ILoader
{
    baseURL: string;
    path: string;
    crossOrigin: string;

    isLoading: boolean;
    progress: number;
}
