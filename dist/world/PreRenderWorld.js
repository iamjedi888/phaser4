import { ClearDirtyChildColor } from "../components/dirty/ClearDirtyChildColor";
import { ClearDirtyChildTransform } from "../components/dirty/ClearDirtyChildTransform";
import { Emit } from "../events/Emit";
import { GetFirstChildID } from "../components/hierarchy/GetFirstChildID";
import { GetNextSiblingID } from "../components/hierarchy/GetNextSiblingID";
import { HasCustomDisplayList } from "../components/permissions/HasCustomDisplayList";
import { HasDirtyChildColor } from "../components/dirty/HasDirtyChildColor";
import { HasDirtyChildTransform } from "../components/dirty/HasDirtyChildTransform";
import { ProcessNode } from "./ProcessNode";
import { UpdateNode } from "./UpdateNode";
import { WorldPreRenderEvent } from "./events/WorldPreRenderEvent";
export function PreRenderWorld(world, gameFrame) {
  const start = performance.now();
  const id = world.id;
  const renderData = world.renderData;
  renderData.gameFrame = gameFrame;
  const camera = world.camera;
  const cameraUpdated = camera.preRender();
  Emit(world, WorldPreRenderEvent, world);
  const checkColor = HasDirtyChildColor(id);
  const checkTransform = HasDirtyChildTransform(id) || cameraUpdated;
  if (!checkColor && !checkTransform) {
    return false;
  }
  const cx = camera.getBoundsX();
  const cy = camera.getBoundsY();
  const cright = camera.getBoundsRight();
  const cbottom = camera.getBoundsBottom();
  const stack = world.stack;
  stack[0] = id;
  let stackIndex = 1;
  let parentNode = id;
  let node = GetFirstChildID(id);
  let isDisplayList = HasCustomDisplayList(node);
  stackBlock: {
    while (stackIndex > 0) {
      UpdateNode(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);
      while (ProcessNode(node, cameraUpdated, isDisplayList)) {
        stack[stackIndex++] = node;
        parentNode = node;
        isDisplayList = HasCustomDisplayList(node);
        node = GetFirstChildID(node);
        UpdateNode(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);
      }
      let next = GetNextSiblingID(node);
      let climb = true;
      while (next && climb) {
        if (ProcessNode(next, cameraUpdated, isDisplayList)) {
          climb = false;
          break;
        } else {
          UpdateNode(next, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);
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
        parentNode = stack[stackIndex - 1];
        isDisplayList = HasCustomDisplayList(parentNode);
      }
      node = next;
    }
  }
  ClearDirtyChildColor(id);
  ClearDirtyChildTransform(id);
  world.getNumChildren();
  renderData.preRenderMs = performance.now() - start;
  return true;
}
