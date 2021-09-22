import { AddChild } from "./AddChild";
import { AddChildAfter } from "./AddChildAfter";
import { AddChildAt } from "./AddChildAt";
import { AddChildBefore } from "./AddChildBefore";
import { AddChildren } from "./AddChildren";
import { AddChildrenAt } from "./AddChildrenAt";
import { BringChildToTop } from "./BringChildToTop";
import { ConsoleTreeChildren } from "./ConsoleTreeChildren";
import { Container } from "../gameobjects/container/Container";
import { CountMatchingChildren } from "./CountMatchingChildren";
import { DepthFirstSearch } from "./DepthFirstSearch";
import { DepthFirstSearchRecursive } from "./DepthFirstSearchRecursive";
import { DestroyChildren } from "./DestroyChildren";
import { FindChildrenByName } from "./FindChildrenByName";
import { GetAllChildren } from "./GetAllChildren";
import { GetBounds } from "./GetBounds";
import { GetChildAt } from "./GetChildAt";
import { GetChildIndex } from "./GetChildIndex";
import { GetChildren } from "./GetChildren";
import { GetClosestChild } from "./GetClosestChild";
import { GetFirstChild } from "./GetFirstChild";
import { GetFirstChildByName } from "./GetFirstChildByName";
import { GetFurthestChild } from "./GetFurthestChild";
import { GetLastChild } from "./GetLastChild";
import { GetParentID } from "../components/hierarchy/GetParentID";
import { GetParents } from "./GetParents";
import { GetRandomChild } from "./GetRandomChild";
import { GetTexture } from "../textures/GetTexture";
import { IsValidParent } from "./IsValidParent";
import { MoveChildDown } from "./MoveChildDown";
import { MoveChildUp } from "./MoveChildUp";
import { RemoveChild } from "./RemoveChild";
import { RemoveChildAt } from "./RemoveChildAt";
import { RemoveChildren } from "./RemoveChildren";
import { RemoveChildrenAt } from "./RemoveChildrenAt";
import { RemoveChildrenBetween } from "./RemoveChildrenBetween";
import { RemoveWorld } from "./RemoveWorld";
import { ReparentChildren } from "./ReparentChildren";
import { ReplaceChild } from "./ReplaceChild";
import { RotateChildrenLeft } from "./RotateChildrenLeft";
import { RotateChildrenRight } from "./RotateChildrenRight";
import { SendChildToBack } from "./SendChildToBack";
import { SetChildrenValue } from "./SetChildrenValue";
import { SetName } from "./SetName";
import { SetOrigin } from "./SetOrigin";
import { SetPosition } from "./SetPosition";
import { SetRotation } from "./SetRotation";
import { SetScale } from "./SetScale";
import { SetSize } from "./SetSize";
import { SetSkew } from "./SetSkew";
import { SetValue } from "./SetValue";
import { SetVisible } from "./SetVisible";
import { SetWorld } from "./SetWorld";
import { ShuffleChildren } from "./ShuffleChildren";
import { SortChildren } from "./SortChildren";
import { Sprite } from "../gameobjects/sprite/Sprite";
import { SwapChildren } from "./SwapChildren";
import { TextureManagerInstance } from "../textures/TextureManagerInstance";
export function DisplayDebugTools(world) {
  const logHelp = [
    "%cPhaser 4 Display Debug Tools Help:",
    "%c"
  ];
  const logCSS = [
    "color: red;",
    "color: white;"
  ];
  const logCommands = [
    "%cPhaser 4 Display Debug Tools Commands:",
    "%c"
  ];
  const logCommandsCSS = [
    "color: red;",
    "color: white;"
  ];
  const addHelp = (command, description = "") => {
    logHelp.push(`%c${command}  %c${description}`);
    logCSS.push("color: blue");
    logCSS.push("color: black");
  };
  const addCommand = (command, description = "") => {
    logCommands.push(`%c${command}  %c${description}`);
    logCommandsCSS.push("color: blue");
    logCommandsCSS.push("color: black");
  };
  const top = window.parent.top;
  top["world"] = world;
  addHelp("world", "A reference to the World instance");
  top["List"] = (parent = world) => {
    ConsoleTreeChildren(parent);
  };
  addHelp("List(parent?)", "Dump the Display List to the console");
  top["Container"] = (x, y) => {
    return new Container(x, y);
  };
  addHelp("Container(x, y)", "Create and return a new Container Game Object");
  top["Sprite"] = (x, y, key, frame) => {
    return new Sprite(x, y, key, frame);
  };
  addHelp("Sprite(x, y, key, frame?)", "Create and return a new Sprite Game Object");
  top["Textures"] = () => {
    for (const key of TextureManagerInstance.get().textures.keys()) {
      console.log(key);
    }
  };
  addHelp("Textures()", "List all of the textures loaded into the Texture Manager");
  top["Frames"] = (texture) => {
    for (const key of GetTexture(texture).frames.keys()) {
      console.log(key);
    }
  };
  addHelp("Frames(textureKey)", "List all of the frames in the given Texture");
  top["GetParentID"] = (child) => {
    return GetParentID(child.id);
  };
  addHelp("GetParentID(child)", "Return the Parent ID");
  top["SaveList"] = (name) => {
    const entries = DepthFirstSearch(world);
    console.log(entries);
  };
  top["LoadList"] = (name) => {
  };
  addHelp("");
  top["AddChild"] = (parent, child) => {
    return AddChild(parent, child);
  };
  addCommand("AddChild(parent, child)", "Add the child to the parent");
  top["AddChildAfter"] = (after, child) => {
    return AddChildAfter(after, child);
  };
  addCommand("AddChildAfter(after, child)", "Add the child after the other");
  top["AddChildAt"] = (parent, child, index = 0) => {
    return AddChildAt(parent, child, index);
  };
  addCommand("AddChildAt(parent, child, index?)", "Add the child to the parent at the given index");
  top["AddChildBefore"] = (before, child) => {
    return AddChildBefore(before, child);
  };
  addCommand("AddChildBefore(before, child)", "Add the child before the other");
  top["AddChildren"] = (parent = world, ...children) => {
    return AddChildren(parent, ...children);
  };
  addCommand("AddChildren(parent, ...children)", "Add all children to the parent");
  top["AddChildrenAt"] = (parent = world, index = 0, ...children) => {
    return AddChildrenAt(parent, index, ...children);
  };
  addCommand("AddChildrenAt(parent, index, ...children)", "Add all children to the parent at the given index");
  top["BringChildToTop"] = (child) => {
    return BringChildToTop(child);
  };
  addCommand("BringChildToTop(child)", "Moves the child to the top of its parents display list");
  top["CountMatchingChildren"] = (parent, property, value) => {
    return CountMatchingChildren(parent, property, value);
  };
  addCommand("CountMatchingChildren(parent, property, value?)", "How many children match the property and value");
  top["DepthFirstSearch"] = (parent = world) => {
    return DepthFirstSearch(parent);
  };
  addCommand("DepthFirstSearch(parent?)", "Return all children from a DFS of the parent");
  top["DepthFirstSearchRecursive"] = (parent = world) => {
    return DepthFirstSearchRecursive(parent);
  };
  addCommand("DepthFirstSearchRecursive(parent?)", "Return all children from a recursive DFS of the parent");
  top["DestroyChildren"] = (parent = world, beginIndex = 0, endIndex) => {
    return DestroyChildren(parent, beginIndex, endIndex);
  };
  addCommand("DestroyChildren(parent?, beginIndex?, endIndex?)", "Destroy all children optionally between the indexes");
  top["FindChildrenByName"] = (parent, searchString) => {
    return FindChildrenByName(parent, searchString);
  };
  addCommand("FindChildrenByName(parent, searchString)", "Return all children with a name matching the string or regexp");
  top["GetAllChildren"] = (parent, property, value) => {
    return GetAllChildren(parent, property, value);
  };
  addCommand("GetAllChildren(parent, property?, value?)", "Return all children of the parent in a deep scan");
  top["GetBounds"] = (children) => {
    return GetBounds(...children);
  };
  addCommand("GetBounds(...children)", "Get the bounds of all children added together");
  top["GetChildAt"] = (parent, index) => {
    return GetChildAt(parent, index);
  };
  addCommand("GetChildAt(parent, index)", "Return the child at the given index");
  top["GetChildIndex"] = (child) => {
    return GetChildIndex(child);
  };
  addCommand("GetChildIndex(child)", "Get the index of the child within the parent display list");
  top["GetChildren"] = (parent, property, value) => {
    return GetChildren(parent, property, value);
  };
  addCommand("GetChildren(parent, property?, value?)", "Return all direct children of the parent");
  top["GetClosestChild"] = (parent, point) => {
    return GetClosestChild(parent, point);
  };
  addCommand("GetClosestChild(parent, IVec2Like point)", "Return the child closest to the given vector point");
  top["GetFirstChild"] = (parent, property, value) => {
    return GetFirstChild(parent, property, value);
  };
  addCommand("GetFirstChild(parent, property?, value?)", "Return the first child, optionally matching the given property and value");
  top["GetFirstChildByName"] = (parent, searchString) => {
    return GetFirstChildByName(parent, searchString);
  };
  addCommand("GetFirstChildByName(parent, searchString)", "Return the first child matching the string or regexp");
  top["GetFurthestChild"] = (parent, point) => {
    return GetFurthestChild(parent, point);
  };
  addCommand("GetFurthestChild(parent, IVec2Like point)", "Return the child furthest away from the given vector point");
  top["GetLastChild"] = (parent, property, value) => {
    return GetLastChild(parent, property, value);
  };
  addCommand("GetLastChild(parent, property?, value?)", "Return the last child, optionally matching the given property and value");
  top["GetParents"] = (child) => {
    return GetParents(child);
  };
  addCommand("GetParents(child)", "Get all parents of the child in an array, recursively searching up");
  top["GetRandomChild"] = (parent, startIndex = 0, length) => {
    return GetRandomChild(parent, startIndex, length);
  };
  addCommand("GetRandomChild(parent, startIndex?, length?)", "Get a random child from the parent, optionally between the indexes");
  top["IsValidParent"] = (parent, child) => {
    return IsValidParent(parent, child);
  };
  addCommand("IsValidParent(parent, child)", "Is the parent a valid candidate for the child?");
  top["MoveChildDown"] = (child) => {
    return MoveChildDown(child);
  };
  addCommand("MoveChildDown(child)", "Moves the child one index down the display list");
  top["MoveChildUp"] = (child) => {
    return MoveChildUp(child);
  };
  addCommand("MoveChildUp(child)", "Moves the child one index up the display list");
  top["RemoveChild"] = (parent, child) => {
    return RemoveChild(parent, child);
  };
  addCommand("RemoveChild(parent, child)", "Removes a single child from its parent");
  top["RemoveChildAt"] = (parent, index) => {
    return RemoveChildAt(parent, index);
  };
  addCommand("RemoveChildAt(parent, index)", "Removes the child at the given index from the parent");
  top["RemoveChildren"] = (parent, ...children) => {
    return RemoveChildren(parent, ...children);
  };
  addCommand("RemoveChildren(parent, ...children)", "Removes all given children from the parent");
  top["RemoveChildrenAt"] = (parent, ...index) => {
    return RemoveChildrenAt(parent, ...index);
  };
  addCommand("RemoveChildrenAt(parent, ...index)", "Removes the children at the given indexes from the parent");
  top["RemoveChildrenBetween"] = (parent, beginIndex = 0, endIndex) => {
    return RemoveChildrenBetween(parent, beginIndex, endIndex);
  };
  addCommand("RemoveChildrenBetween(parent, beginIndex, endIndex)", "Removes the children from the parent between the start and end indexes");
  top["RemoveWorld"] = (world2, ...children) => {
    return RemoveWorld(world2, ...children);
  };
  addCommand("RemoveWorld(world, ...children)", "Removes the World component from the given children");
  top["ReparentChildren"] = (parent, newParent, beginIndex = 0, endIndex) => {
    return ReparentChildren(parent, newParent, beginIndex, endIndex);
  };
  addCommand("ReparentChildren(parent, newParent, beginIndex?, endIndex?)", "Removes the children from parent and adds them to newParent");
  top["ReplaceChild"] = (target, source) => {
    return ReplaceChild(target, source);
  };
  addCommand("ReplaceChild(target, source)", "Replaces the target with the source child within the parent");
  top["RotateChildrenLeft"] = (parent, total = 1) => {
    return RotateChildrenLeft(parent, total);
  };
  addCommand("RotateChildrenLeft(parent, total?)", 'Rotates the parent display list "total" places to the left');
  top["RotateChildrenRight"] = (parent, total = 1) => {
    return RotateChildrenRight(parent, total);
  };
  addCommand("RotateChildrenRight(parent, total?)", 'Rotates the parent display list "total" places to the right');
  top["SendChildToBack"] = (child) => {
    return SendChildToBack(child);
  };
  addCommand("SendChildToBack(child)", "Sends the given child to the back of the parent display list");
  top["SetChildrenValue"] = (parent, property, value) => {
    return SetChildrenValue(parent, property, value);
  };
  addCommand("SetChildrenValue(parent, property, value)", "Sets the property to value on all children of the parent");
  top["SetName"] = (name, ...children) => {
    return SetName(name, ...children);
  };
  addCommand("SetName(name, ...children)", "Sets the name property on all given children");
  top["SetOrigin"] = (originX, originY, ...children) => {
    return SetOrigin(originX, originY, ...children);
  };
  addCommand("SetOrigin(originX, originY, ...children)", "Sets the origin on all given children");
  top["SetPosition"] = (x, y, ...children) => {
    return SetPosition(x, y, ...children);
  };
  addCommand("SetPosition(x, y, ...children)", "Sets the position on all given children");
  top["SetRotation"] = (rotation, ...children) => {
    return SetRotation(rotation, ...children);
  };
  addCommand("SetRotation(rotation, ...children)", "Sets the rotation on all given children");
  top["SetScale"] = (scaleX, scaleY, ...children) => {
    return SetScale(scaleX, scaleY, ...children);
  };
  addCommand("SetScale(scaleX, scaleY, ...children)", "Sets the scale on all given children");
  top["SetSize"] = (width, height, ...children) => {
    return SetSize(width, height, ...children);
  };
  addCommand("SetSize(width, height, ...children)", "Sets the size on all given children");
  top["SetSkew"] = (skewX, skewY, ...children) => {
    return SetSkew(skewX, skewY, ...children);
  };
  addCommand("SetSkew(skewX, skewY, ...children)", "Sets the skew on all given children");
  top["SetValue"] = (property, value, ...children) => {
    return SetValue(property, value, ...children);
  };
  addCommand("SetValue(property, value, ...children)", "Sets the property to the value on all given children");
  top["SetVisible"] = (visible, ...children) => {
    return SetVisible(visible, ...children);
  };
  addCommand("SetVisible(visible, ...children)", "Sets the visible state on all given children");
  top["SetWorld"] = (world2, ...children) => {
    return SetWorld(world2, ...children);
  };
  addCommand("SetWorld(world, ...children)", "Sets the World on all given children");
  top["ShuffleChildren"] = (parent) => {
    return ShuffleChildren(parent);
  };
  addCommand("ShuffleChildren(parent)", "Shuffles all of the children of the given parent");
  top["SortChildren"] = (parent, getter) => {
    return SortChildren(parent, getter);
  };
  addCommand("SortChildren(parent, getter)", "Sorts all of the children based on the given getter function");
  top["SwapChildren"] = (child1, child2) => {
    SwapChildren(child1, child2);
  };
  addCommand("SwapChildren(child1, child2)", "Swaps the position of the 2 children of the same parent");
  top["DDHelp"] = () => {
    console.log(logHelp.join("\n"), ...logCSS);
  };
  top["DDCommands"] = () => {
    console.log(logCommands.join("\n"), ...logCommandsCSS);
  };
  console.log("%cDisplay Debug Tools Installed%c See DDHelp() and DDCommands() for command list", "padding: 4px 16px; color: #fff; background: linear-gradient(#81003e 40%, #c3bc00)", "");
}
