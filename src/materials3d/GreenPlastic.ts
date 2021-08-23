import { Material } from '../gameobjects3d/material/Material';

export const GreenPlastic = new Material({
    ambient: [ 0, 0, 0 ],
    diffuse: [ 0.1, 0.35, 0.1 ],
    specular: [ 0.45, 0.55, 0.45 ],
    shine: 0.25
});
