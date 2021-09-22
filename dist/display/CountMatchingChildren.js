import { GetChildrenFromParentID } from "../components/hierarchy/GetChildrenFromParentID";
export function CountMatchingChildren(parent, property, value) {
  const children = GetChildrenFromParentID(parent.id);
  let total = 0;
  children.forEach((child) => {
    if (property in child && (value === void 0 || child[property] === value)) {
      total++;
    }
  });
  return total;
}
