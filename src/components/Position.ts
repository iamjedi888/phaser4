import { Types, defineComponent } from 'bitecs';

const PositionComponent = defineComponent({ x: Types.f32, y: Types.f32 });

console.log('pos created');

export const Position = PositionComponent;
