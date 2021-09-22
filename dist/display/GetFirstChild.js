import { GetChildrenFromParentID } from "../components/hierarchy/GetChildrenFromParentID";
export function GetFirstChild(parent, property, value) {
  const children = GetChildrenFromParentID(parent.id);
  if (!property) {
    return children[0];
  }
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (property in child && (value === void 0 || child[property] === value)) {
      return child;
    }
  }
}
