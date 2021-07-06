import { File } from './File';

export function XHRLoader (file: File): Promise<File>
{
    const xhr = new XMLHttpRequest();

    xhr.open('GET', file.url, true);

    xhr.responseType = file.responseType;

    return new Promise((resolve, reject) =>
    {
        xhr.onload = (): void =>
        {
            const type = file.responseType;

            file.data = (type === 'text' || type === '') ? xhr.responseText : xhr.response;
            file.hasLoaded = true;

            resolve(file);
        };

        xhr.onerror = (): void =>
        {
            file.hasLoaded = true;

            reject(file);
        };

        xhr.send();
    });
}
