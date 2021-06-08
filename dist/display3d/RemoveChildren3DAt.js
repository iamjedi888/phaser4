import { RemoveChild3DAt } from "./RemoveChild3DAt";
export function RemoveChildren3DAt(parent, ...index) {
  const removed = [];
  index.sort((a, b) => a - b);
  index.reverse().forEach((i) => {
    const child = RemoveChild3DAt(parent, i);
    if (child) {
      removed.push(child);
    }
  });
  return removed;
}
