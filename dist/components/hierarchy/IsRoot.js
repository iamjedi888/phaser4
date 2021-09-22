import { GetParentID } from "./GetParentID";
import { GetWorldID } from "./GetWorldID";
export function IsRoot(id) {
  return GetWorldID(id) === GetParentID(id);
}
