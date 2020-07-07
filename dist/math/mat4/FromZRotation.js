import '../../utils/base64/Base64ToArrayBuffer.js';
import '../../utils/NOOP.js';
import { Matrix4 } from './Matrix4.js';

function FromZRotation(angle, out = new Matrix4()) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return out.set(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
}

export { FromZRotation };
