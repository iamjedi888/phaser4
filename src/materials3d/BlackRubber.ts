import { Material } from '../gameobjects3d/material/Material';

export const BlackRubber = new Material({
    ambient: [ 0.02, 0.02, 0.02 ],
    diffuse: [ 0.01, 0.01, 0.01 ],
    specular: [ 0.4, 0.4, 0.4 ],
    shine: 0.078125
});
