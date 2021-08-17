import { Types, defineComponent } from 'bitecs';

//  local and world Array structure:
//  x, y, right, bottom

//  The direct properties are the global bounds values, calculated in UpdateVertexPositionSystem

//  local = bounds of Game Object in local space (calculated dynamically, on request)
//  world = bounds of Game Object, factoring in all children, in global space (calculated in BaseWorld)

export const BoundsComponent = defineComponent({
    x: Types.f32,
    y: Types.f32,
    right: Types.f32,
    bottom: Types.f32,
    local: [ Types.f32, 4 ],
    global: [ Types.f32, 4 ],
    world: [ Types.f32, 4 ]
});
