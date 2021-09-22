import { GetChildrenFromParentID } from "../components/hierarchy/GetChildrenFromParentID";
export function GetLastChild(parent, property, value) {
  const children = GetChildrenFromParentID(parent.id);
  if (!property) {
    return children.pop();
  }
  for (let i = children.length; i >= 0; i--) {
    const child = children[i];
    if (property in child && (value === void 0 || child[property] === value)) {
      return child;
    }
  }
}
