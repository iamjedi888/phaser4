import { Material } from '../gameobjects3d/material/Material';

export const WhitePlastic = new Material({
    ambient: [ 0, 0, 0 ],
    diffuse: [ 0.55, 0.55, 0.55 ],
    specular: [ 0.7, 0.7, 0.7 ],
    shine: 0.25
});
