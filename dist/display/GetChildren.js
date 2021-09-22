import { GetChildrenFromParentID } from "../components/hierarchy/GetChildrenFromParentID";
export function GetChildren(parent, property, value) {
  const children = GetChildrenFromParentID(parent.id);
  if (!property) {
    return [...children];
  }
  return children.filter((child) => {
    return property in child && (value === void 0 || child[property] === value);
  });
}
