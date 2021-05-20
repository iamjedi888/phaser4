import { Types, defineComponent } from 'bitecs';

const Permissions = defineComponent({
    willUpdate: Types.ui8,
    willUpdateChildren: Types.ui8,
    willRender: Types.ui8,
    willRenderChildren: Types.ui8,
    willCacheChildren: Types.ui8
});

export const PermissionsComponent = Permissions;
