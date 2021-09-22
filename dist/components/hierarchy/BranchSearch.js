import { GetFirstChildID } from "./GetFirstChildID";
import { GetNextSiblingID } from "./GetNextSiblingID";
export function BranchSearch(id, processCallback) {
  const stack = [id];
  let stackIndex = 1;
  let node = GetFirstChildID(id);
  const results = [];
  stackBlock: {
    while (stackIndex > 0) {
      results.push(node);
      while (processCallback(node)) {
        stack[stackIndex++] = node;
        node = GetFirstChildID(node);
        results.push(node);
      }
      let next = GetNextSiblingID(node);
      let climb = true;
      while (next && climb) {
        if (processCallback(next)) {
          climb = false;
          break;
        } else {
          results.push(next);
          next = GetNextSiblingID(next);
        }
      }
      if (climb) {
        while (next === 0) {
          node = stack[--stackIndex];
          if (!node) {
            break stackBlock;
          }
          next = GetNextSiblingID(node);
        }
      }
      node = next;
    }
  }
  return results;
}
