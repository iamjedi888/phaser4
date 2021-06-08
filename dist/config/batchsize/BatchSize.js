import { SetBatchSize } from "./SetBatchSize";
export function BatchSize(size) {
  return () => {
    SetBatchSize(size);
  };
}
