import { Types, defineComponent } from 'bitecs';

//  Array structure:
//  x, y, width, height, right, bottom

//  local = bounds of Game Object in local space (calculated dynamically, on request)
//  global = bounds of Game Object in global space (calcuated in UpdatedVertexPositionSystem)
//  world = bounds of Game Object, factoring in all children, in global space (calculated in BaseWorld)

const Bounds = defineComponent({
    local: [ Types.f32, 6 ],
    global: [ Types.f32, 6 ],
    world: [ Types.f32, 6 ]
});

export const BoundsComponent = Bounds;
