import { CreateWorkerURL } from "./CreateWorkerURL";
export function CreateWorker(src) {
  return new Worker(CreateWorkerURL(src));
}
