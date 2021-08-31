export function IsAbsoluteURI (url: string): boolean
{
    return (/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/).test(url);
}
