import { CreateWorkerURL } from './CreateWorkerURL';

export function CreateWorker (src: string | Function): Worker
{
    return new Worker(CreateWorkerURL(src));
}
