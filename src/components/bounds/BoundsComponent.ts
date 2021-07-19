import { Types, defineComponent } from 'bitecs';

//  Array structure:
//  x, y, right, bottom

//  local = bounds of Game Object in local space (calculated dynamically, on request)
//  global = bounds of Game Object in global space (calcuated in UpdatedVertexPositionSystem)
//  world = bounds of Game Object, factoring in all children, in global space (calculated in BaseWorld)

const Bounds = defineComponent({
    local: [ Types.f32, 4 ],
    global: [ Types.f32, 4 ],
    world: [ Types.f32, 4 ]
});

export const BoundsComponent = Bounds;
