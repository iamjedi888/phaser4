import { Types, defineComponent } from 'bitecs';

export const PERMISSION = {
    VISIBLE: 0,
    VISIBLE_CHILDREN: 1,
    WILL_UPDATE: 2,
    WILL_UPDATE_CHILDREN: 3,
    WILL_RENDER: 4,
    WILL_RENDER_CHILDREN: 5,
    WILL_CACHE_CHILDREN: 6,
    WILL_TRANSFORM_CHILDREN: 7,
    WILL_COLOR_CHILDREN: 8
};

export const PermissionsComponent = defineComponent({
    data: [ Types.ui8, 9 ]
});
