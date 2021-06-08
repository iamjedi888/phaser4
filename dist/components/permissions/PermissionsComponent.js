import { Types, defineComponent } from "bitecs";
const Permissions = defineComponent({
  visible: Types.ui8,
  visibleChildren: Types.ui8,
  willUpdate: Types.ui8,
  willUpdateChildren: Types.ui8,
  willRender: Types.ui8,
  willRenderChildren: Types.ui8,
  willCacheChildren: Types.ui8,
  willTransformChildren: Types.ui8
});
export const PermissionsComponent = Permissions;
