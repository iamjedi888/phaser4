(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Phaser = {}));
}(this, (function (exports) { 'use strict';

    var instance$2;
    var frame = 0;
    var elapsed = 0;
    var GameInstance = {
        get: function () {
            return instance$2;
        },
        set: function (game) {
            instance$2 = game;
        },
        getFrame: function () {
            return frame;
        },
        setFrame: function (current) {
            frame = current;
        },
        getElapsed: function () {
            return elapsed;
        },
        setElapsed: function (current) {
            elapsed = current;
        }
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    function GetMat4Determinant(matrix) {
        var _a = __read(matrix.data, 16), m00 = _a[0], m01 = _a[1], m02 = _a[2], m03 = _a[3], m10 = _a[4], m11 = _a[5], m12 = _a[6], m13 = _a[7], m20 = _a[8], m21 = _a[9], m22 = _a[10], m23 = _a[11], m30 = _a[12], m31 = _a[13], m32 = _a[14], m33 = _a[15];
        var det22x33 = m22 * m33 - m32 * m23;
        var det21x33 = m21 * m33 - m31 * m23;
        var det21x32 = m21 * m32 - m31 * m22;
        var det20x33 = m20 * m33 - m30 * m23;
        var det20x32 = m20 * m32 - m22 * m30;
        var det20x31 = m20 * m31 - m30 * m21;
        var cofact00 = +(m11 * det22x33 - m12 * det21x33 + m13 * det21x32);
        var cofact01 = -(m10 * det22x33 - m12 * det20x33 + m13 * det20x32);
        var cofact02 = +(m10 * det21x33 - m11 * det20x33 + m13 * det20x31);
        var cofact03 = -(m10 * det21x32 - m11 * det20x32 + m12 * det20x31);
        return m00 * cofact00 + m01 * cofact01 + m02 * cofact02 + m03 * cofact03;
    }

    function GetMat4Frobenius(matrix) {
        var _a = __read(matrix.data, 16), m00 = _a[0], m01 = _a[1], m02 = _a[2], m03 = _a[3], m10 = _a[4], m11 = _a[5], m12 = _a[6], m13 = _a[7], m20 = _a[8], m21 = _a[9], m22 = _a[10], m23 = _a[11], m30 = _a[12], m31 = _a[13], m32 = _a[14], m33 = _a[15];
        return Math.hypot(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    }

    function RoundAwayFromZero(value) {
        return (value > 0) ? Math.ceil(value) : Math.floor(value);
    }

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var lookup = new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
    }

    function NOOP$1() {
    }

    var Matrix4 = (function () {
        function Matrix4(src) {
            var data = new Float32Array(16);
            this.data = data;
            this.onChange = NOOP$1;
            if (src) {
                if (Array.isArray(src)) {
                    this.fromArray(src);
                }
                else {
                    this.fromArray(src.data);
                }
            }
            else {
                data[0] = 1;
                data[5] = 1;
                data[10] = 1;
                data[15] = 1;
            }
        }
        Matrix4.prototype.set = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
            var data = this.data;
            data[0] = m00;
            data[1] = m01;
            data[2] = m02;
            data[3] = m03;
            data[4] = m10;
            data[5] = m11;
            data[6] = m12;
            data[7] = m13;
            data[8] = m20;
            data[9] = m21;
            data[10] = m22;
            data[11] = m23;
            data[12] = m30;
            data[13] = m31;
            data[14] = m32;
            data[15] = m33;
            this.onChange(this);
            return this;
        };
        Matrix4.prototype.toArray = function (dst, index) {
            if (dst === void 0) { dst = []; }
            if (index === void 0) { index = 0; }
            var data = this.data;
            for (var i = 0; i < 16; i++) {
                dst[index + i] = data[i];
            }
            return dst;
        };
        Matrix4.prototype.fromArray = function (src, index) {
            if (index === void 0) { index = 0; }
            var data = this.data;
            for (var i = 0; i < 16; i++) {
                data[i] = src[index + i];
            }
            this.onChange(this);
            return this;
        };
        Matrix4.prototype.toString = function () {
            return '[ mat4=' + this.data.join(', ') + ' ]';
        };
        Matrix4.prototype.destroy = function () {
            this.onChange = NOOP$1;
            this.data = null;
        };
        return Matrix4;
    }());

    function Mat4Add(a, b, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(a.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        var _b = __read(b.data, 16), b00 = _b[0], b01 = _b[1], b02 = _b[2], b03 = _b[3], b10 = _b[4], b11 = _b[5], b12 = _b[6], b13 = _b[7], b20 = _b[8], b21 = _b[9], b22 = _b[10], b23 = _b[11], b30 = _b[12], b31 = _b[13], b32 = _b[14], b33 = _b[15];
        return out.set(a00 + b00, a01 + b01, a02 + b02, a03 + b03, a10 + b10, a11 + b11, a12 + b12, a13 + b13, a20 + b20, a21 + b21, a22 + b22, a23 + b23, a30 + b30, a31 + b31, a32 + b32, a33 + b33);
    }

    function Mat4AddTranslationFromFloats(matrix, x, y, z) {
        var data = matrix.data;
        data[12] += x;
        data[13] += y;
        data[14] += z;
        matrix.onChange(matrix);
        return matrix;
    }

    function Mat4Adjoint(matrix, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(matrix.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        var b00 = a00 * a11 - a01 * a10;
        var b01 = a00 * a12 - a02 * a10;
        var b02 = a00 * a13 - a03 * a10;
        var b03 = a01 * a12 - a02 * a11;
        var b04 = a01 * a13 - a03 * a11;
        var b05 = a02 * a13 - a03 * a12;
        var b06 = a20 * a31 - a21 * a30;
        var b07 = a20 * a32 - a22 * a30;
        var b08 = a20 * a33 - a23 * a30;
        var b09 = a21 * a32 - a22 * a31;
        var b10 = a21 * a33 - a23 * a31;
        var b11 = a22 * a33 - a23 * a32;
        return out.set(a11 * b11 - a12 * b10 + a13 * b09, a02 * b10 - a01 * b11 - a03 * b09, a31 * b05 - a32 * b04 + a33 * b03, a22 * b04 - a21 * b05 - a23 * b03, a12 * b08 - a10 * b11 - a13 * b07, a00 * b11 - a02 * b08 + a03 * b07, a32 * b02 - a30 * b05 - a33 * b01, a20 * b05 - a22 * b02 + a23 * b01, a10 * b10 - a11 * b08 + a13 * b06, a01 * b08 - a00 * b10 - a03 * b06, a30 * b04 - a31 * b02 + a33 * b00, a21 * b02 - a20 * b04 - a23 * b00, a11 * b07 - a10 * b09 - a12 * b06, a00 * b09 - a01 * b07 + a02 * b06, a31 * b01 - a30 * b03 - a32 * b00, a20 * b03 - a21 * b01 + a22 * b00);
    }

    function Mat4Clone(src) {
        return new Matrix4(src);
    }

    function Mat4CopyFrom(src, dest) {
        return dest.fromArray(src.data);
    }

    function Mat4CopyPosition(src, dest) {
        var srcData = src.data;
        var destData = dest.data;
        destData[12] = srcData[12];
        destData[13] = srcData[13];
        destData[14] = srcData[14];
        dest.onChange(dest);
        return dest;
    }

    function Mat4Equals(a, b) {
        var _a = __read(a.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        var _b = __read(b.data, 16), b00 = _b[0], b01 = _b[1], b02 = _b[2], b03 = _b[3], b10 = _b[4], b11 = _b[5], b12 = _b[6], b13 = _b[7], b20 = _b[8], b21 = _b[9], b22 = _b[10], b23 = _b[11], b30 = _b[12], b31 = _b[13], b32 = _b[14], b33 = _b[15];
        return (a00 === b00 &&
            a01 === b01 &&
            a02 === b02 &&
            a03 === b03 &&
            a10 === b10 &&
            a11 === b11 &&
            a12 === b12 &&
            a13 === b13 &&
            a20 === b20 &&
            a21 === b21 &&
            a22 === b22 &&
            a23 === b23 &&
            a30 === b30 &&
            a31 === b31 &&
            a32 === b32 &&
            a33 === b33);
    }

    function Mat4FromQuat(q, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var yx = y * x2;
        var yy = y * y2;
        var zx = z * x2;
        var zy = z * y2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        return out.set(1 - yy - zz, yx + wz, zx - wy, 0, yx - wz, 1 - xx - zz, zy + wx, 0, zx + wy, zy - wx, 1 - xx - yy, 0, 0, 0, 0, 1);
    }

    function Mat4FromRotation(angle, axis, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = axis.x, y = axis.y, z = axis.z;
        var len = Math.hypot(x, y, z);
        if (len < 0.00001) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1 - c;
        return out.set(x * x * t + c, y * x * t + z * s, z * x * t - y * s, 0, x * y * t - z * s, y * y * t + c, z * y * t + x * s, 0, x * z * t + y * s, y * z * t - x * s, z * z * t + c, 0, 0, 0, 0, 1);
    }

    function Mat4FromRotationTranslation(q, v, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        var vx = v.x, vy = v.y, vz = v.z;
        return out.set(1 - (yy + zz), xy + wz, xz - wy, 0, xy - wz, 1 - (xx + zz), yz + wx, 0, xz + wy, yz - wx, 1 - (xx + yy), 0, vx, vy, vz, 1);
    }

    function Mat4FromRotationTranslationScale(q, v, s, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        var sx = s.x, sy = s.y, sz = s.z;
        var vx = v.x, vy = v.y, vz = v.z;
        return out.set((1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0, (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0, (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0, vx, vy, vz, 1);
    }

    function Mat4FromRotationTranslationScaleOrigin(q, v, s, o, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;
        var sx = s.x, sy = s.y, sz = s.z;
        var ox = o.x, oy = o.y, oz = o.z;
        var vx = v.x, vy = v.y, vz = v.z;
        var out0 = (1 - (yy + zz)) * sx;
        var out1 = (xy + wz) * sx;
        var out2 = (xz - wy) * sx;
        var out4 = (xy - wz) * sy;
        var out5 = (1 - (xx + zz)) * sy;
        var out6 = (yz + wx) * sy;
        var out8 = (xz + wy) * sz;
        var out9 = (yz - wx) * sz;
        var out10 = (1 - (xx + yy)) * sz;
        return out.set(out0, out1, out2, 0, out4, out5, out6, 0, out8, out9, out10, 0, vx + ox - (out0 * ox + out4 * oy + out8 * oz), vy + oy - (out1 * ox + out5 * oy + out9 * oz), vz + oz - (out2 * ox + out6 * oy + out10 * oz), 1);
    }

    function Mat4FromRotationXYTranslation(rotation, position, translateFirst, out) {
        if (translateFirst === void 0) { translateFirst = true; }
        if (out === void 0) { out = new Matrix4(); }
        var x = position.x, y = position.y, z = position.z;
        var sx = Math.sin(rotation.x);
        var cx = Math.cos(rotation.x);
        var sy = Math.sin(rotation.y);
        var cy = Math.cos(rotation.y);
        var a30 = x;
        var a31 = y;
        var a32 = z;
        var b21 = -sx;
        var c01 = 0 - b21 * sy;
        var c02 = 0 - cx * sy;
        var c21 = b21 * cy;
        var c22 = cx * cy;
        if (!translateFirst) {
            a30 = cy * x + sy * z;
            a31 = c01 * x + cx * y + c21 * z;
            a32 = c02 * x + sx * y + c22 * z;
        }
        return out.set(cy, c01, c02, 0, 0, cx, sx, 0, sy, c21, c22, 0, a30, a31, a32, 1);
    }

    function Mat4FromScaling(vec3, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = vec3.x, y = vec3.y, z = vec3.z;
        return out.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    }

    function Mat4FromTranslation(vec3, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = vec3.x, y = vec3.y, z = vec3.z;
        return out.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1);
    }

    function Mat4FromXRotation(angle, out) {
        if (out === void 0) { out = new Matrix4(); }
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return out.set(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
    }

    function Mat4FromYRotation(angle, out) {
        if (out === void 0) { out = new Matrix4(); }
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return out.set(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
    }

    function Mat4FromZRotation(angle, out) {
        if (out === void 0) { out = new Matrix4(); }
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return out.set(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    function Mat4Frustum(left, right, bottom, top, near, far, out) {
        if (out === void 0) { out = new Matrix4(); }
        var rl = 1 / (right - left);
        var tb = 1 / (top - bottom);
        var nf = 1 / (near - far);
        return out.set(near * 2 * rl, 0, 0, 0, 0, near * 2 * tb, 0, 0, (right + left) * rl, (top + bottom) * tb, (far + near) * nf, -1, 0, 0, far * near * 2 * nf, 0);
    }

    var Vec3 = (function () {
        function Vec3(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.set(x, y, z);
        }
        Vec3.prototype.set = function (x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        Vec3.prototype.toArray = function (dst, index) {
            if (dst === void 0) { dst = []; }
            if (index === void 0) { index = 0; }
            var _a = this, x = _a.x, y = _a.y, z = _a.z;
            dst[index] = x;
            dst[index + 1] = y;
            dst[index + 2] = z;
            return dst;
        };
        Vec3.prototype.fromArray = function (src, index) {
            if (index === void 0) { index = 0; }
            return this.set(src[index], src[index + 1], src[index + 2]);
        };
        Vec3.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y, z = _a.z;
            return "{ x=" + x + ", y=" + y + ", z=" + z + " }";
        };
        return Vec3;
    }());

    function Mat4GetScaling(matrix, out) {
        if (out === void 0) { out = new Vec3(); }
        var _a = __read(matrix.data, 11), m00 = _a[0], m01 = _a[1], m02 = _a[2]; _a[3]; var m10 = _a[4], m11 = _a[5], m12 = _a[6]; _a[7]; var m20 = _a[8], m21 = _a[9], m22 = _a[10];
        return out.set(Math.hypot(m00, m01, m02), Math.hypot(m10, m11, m12), Math.hypot(m20, m21, m22));
    }

    var Quaternion = (function () {
        function Quaternion(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
            this.onChange = NOOP$1;
        }
        Quaternion.prototype.set = function (x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
            this.onChange(this);
            return this;
        };
        Object.defineProperty(Quaternion.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                var prev = this._x;
                this._x = value;
                if (value !== prev) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                var prev = this._y;
                this._y = value;
                if (value !== prev) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                var prev = this._z;
                this._z = value;
                if (value !== prev) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "w", {
            get: function () {
                return this._w;
            },
            set: function (value) {
                var prev = this._w;
                this._w = value;
                if (value !== prev) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Quaternion.prototype.toArray = function (dst, index) {
            if (dst === void 0) { dst = []; }
            if (index === void 0) { index = 0; }
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            dst[index] = x;
            dst[index + 1] = y;
            dst[index + 2] = z;
            dst[index + 3] = w;
            return dst;
        };
        Quaternion.prototype.fromArray = function (src, index) {
            if (index === void 0) { index = 0; }
            return this.set(src[index], src[index + 1], src[index + 2], src[index + 3]);
        };
        Quaternion.prototype.destroy = function () {
            this.onChange = NOOP$1;
        };
        Quaternion.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            return "{ x=" + x + ", y=" + y + ", z=" + z + ", w=" + w + " }";
        };
        return Quaternion;
    }());

    function Mat4GetRotation(matrix, out) {
        if (out === void 0) { out = new Quaternion(); }
        var scaling = Mat4GetScaling(matrix);
        var is1 = 1 / scaling.x;
        var is2 = 1 / scaling.y;
        var is3 = 1 / scaling.z;
        var _a = __read(matrix.data, 11), m00 = _a[0], m01 = _a[1], m02 = _a[2]; _a[3]; var m10 = _a[4], m11 = _a[5], m12 = _a[6]; _a[7]; var m20 = _a[8], m21 = _a[9], m22 = _a[10];
        var sm11 = m00 * is1;
        var sm12 = m01 * is2;
        var sm13 = m02 * is3;
        var sm21 = m10 * is1;
        var sm22 = m11 * is2;
        var sm23 = m12 * is3;
        var sm31 = m20 * is1;
        var sm32 = m21 * is2;
        var sm33 = m22 * is3;
        var trace = sm11 + sm22 + sm33;
        var S = 0;
        if (trace > 0) {
            S = Math.sqrt(trace + 1) * 2;
            return out.set((sm23 - sm32) / S, (sm31 - sm13) / S, (sm12 - sm21) / S, 0.25 * S);
        }
        else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            return out.set(0.25 * S, (sm12 + sm21) / S, (sm31 + sm13) / S, (sm23 - sm32) / S);
        }
        else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            return out.set((sm12 + sm21) / S, 0.25 * S, (sm23 + sm32) / S, (sm31 - sm13) / S);
        }
        else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            return out.set((sm31 + sm13) / S, (sm23 + sm32) / S, 0.25 * S, (sm12 - sm21) / S);
        }
    }

    function Mat4GetTranslation(matrix, out) {
        if (out === void 0) { out = new Vec3(); }
        var data = matrix.data;
        return out.set(data[12], data[13], data[14]);
    }

    function Mat4Identity(matrix) {
        if (matrix === void 0) { matrix = new Matrix4(); }
        return matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    function Mat4Invert(matrix, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(matrix.data, 16), m00 = _a[0], m01 = _a[1], m02 = _a[2], m03 = _a[3], m10 = _a[4], m11 = _a[5], m12 = _a[6], m13 = _a[7], m20 = _a[8], m21 = _a[9], m22 = _a[10], m23 = _a[11], m30 = _a[12], m31 = _a[13], m32 = _a[14], m33 = _a[15];
        var det22x33 = m22 * m33 - m32 * m23;
        var det21x33 = m21 * m33 - m31 * m23;
        var det21x32 = m21 * m32 - m31 * m22;
        var det20x33 = m20 * m33 - m30 * m23;
        var det20x32 = m20 * m32 - m22 * m30;
        var det20x31 = m20 * m31 - m30 * m21;
        var cofact00 = +(m11 * det22x33 - m12 * det21x33 + m13 * det21x32);
        var cofact01 = -(m10 * det22x33 - m12 * det20x33 + m13 * det20x32);
        var cofact02 = +(m10 * det21x33 - m11 * det20x33 + m13 * det20x31);
        var cofact03 = -(m10 * det21x32 - m11 * det20x32 + m12 * det20x31);
        var det = m00 * cofact00 + m01 * cofact01 + m02 * cofact02 + m03 * cofact03;
        if (det === 0) {
            return out;
        }
        var detInv = 1 / det;
        var det12x33 = m12 * m33 - m32 * m13;
        var det11x33 = m11 * m33 - m31 * m13;
        var det11x32 = m11 * m32 - m31 * m12;
        var det10x33 = m10 * m33 - m30 * m13;
        var det10x32 = m10 * m32 - m30 * m12;
        var det10x31 = m10 * m31 - m30 * m11;
        var det12x23 = m12 * m23 - m22 * m13;
        var det11x23 = m11 * m23 - m21 * m13;
        var det11x22 = m11 * m22 - m21 * m12;
        var det10x23 = m10 * m23 - m20 * m13;
        var det10x22 = m10 * m22 - m20 * m12;
        var det10x21 = m10 * m21 - m20 * m11;
        var cofact10 = -(m01 * det22x33 - m02 * det21x33 + m03 * det21x32);
        var cofact11 = +(m00 * det22x33 - m02 * det20x33 + m03 * det20x32);
        var cofact12 = -(m00 * det21x33 - m01 * det20x33 + m03 * det20x31);
        var cofact13 = +(m00 * det21x32 - m01 * det20x32 + m02 * det20x31);
        var cofact20 = +(m01 * det12x33 - m02 * det11x33 + m03 * det11x32);
        var cofact21 = -(m00 * det12x33 - m02 * det10x33 + m03 * det10x32);
        var cofact22 = +(m00 * det11x33 - m01 * det10x33 + m03 * det10x31);
        var cofact23 = -(m00 * det11x32 - m01 * det10x32 + m02 * det10x31);
        var cofact30 = -(m01 * det12x23 - m02 * det11x23 + m03 * det11x22);
        var cofact31 = +(m00 * det12x23 - m02 * det10x23 + m03 * det10x22);
        var cofact32 = -(m00 * det11x23 - m01 * det10x23 + m03 * det10x21);
        var cofact33 = +(m00 * det11x22 - m01 * det10x22 + m02 * det10x21);
        return out.set(cofact00 * detInv, cofact10 * detInv, cofact20 * detInv, cofact30 * detInv, cofact01 * detInv, cofact11 * detInv, cofact21 * detInv, cofact31 * detInv, cofact02 * detInv, cofact12 * detInv, cofact22 * detInv, cofact32 * detInv, cofact03 * detInv, cofact13 * detInv, cofact23 * detInv, cofact33 * detInv);
    }

    function Mat4LookAt(eye, center, up, out) {
        if (out === void 0) { out = new Matrix4(); }
        var eyex = eye.x, eyey = eye.y, eyez = eye.z;
        var upx = up.x, upy = up.y, upz = up.z;
        var centerx = center.x, centery = center.y, centerz = center.z;
        if (Math.abs(eyex - centerx) < 0.00001 && Math.abs(eyey - centery) < 0.00001 && Math.abs(eyez - centerz) < 0.00001) {
            return Mat4Identity(out);
        }
        var z0 = eyex - centerx;
        var z1 = eyey - centery;
        var z2 = eyez - centerz;
        var len = 1 / Math.hypot(z0, z1, z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        var x0 = upy * z2 - upz * z1;
        var x1 = upz * z0 - upx * z2;
        var x2 = upx * z1 - upy * z0;
        len = Math.hypot(x0, x1, x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        }
        else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }
        var y0 = z1 * x2 - z2 * x1;
        var y1 = z2 * x0 - z0 * x2;
        var y2 = z0 * x1 - z1 * x0;
        len = Math.hypot(y0, y1, y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        }
        else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }
        return out.set(x0, y0, z0, 0, x1, y1, z1, 0, x2, y2, z2, 0, -(x0 * eyex + x1 * eyey + x2 * eyez), -(y0 * eyex + y1 * eyey + y2 * eyez), -(z0 * eyex + z1 * eyey + z2 * eyez), 1);
    }

    function Mat4Multiply(a, b, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(a.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        var _b = __read(b.data, 16), b00 = _b[0], b01 = _b[1], b02 = _b[2], b03 = _b[3], b10 = _b[4], b11 = _b[5], b12 = _b[6], b13 = _b[7], b20 = _b[8], b21 = _b[9], b22 = _b[10], b23 = _b[11], b30 = _b[12], b31 = _b[13], b32 = _b[14], b33 = _b[15];
        return out.set(b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30, b01 * a01 + b01 * a11 + b02 * a21 + b03 * a31, b02 * a02 + b01 * a12 + b02 * a22 + b03 * a32, b03 * a03 + b01 * a13 + b02 * a23 + b03 * a33, b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30, b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31, b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32, b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33, b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30, b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31, b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32, b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33, b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30, b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31, b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32, b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33);
    }

    function Mat4MultiplyScalar(matrix, scalar, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(matrix.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        return out.set(a00 * scalar, a01 * scalar, a02 * scalar, a03 * scalar, a10 * scalar, a11 * scalar, a12 * scalar, a13 * scalar, a20 * scalar, a21 * scalar, a22 * scalar, a23 * scalar, a30 * scalar, a31 * scalar, a32 * scalar, a33 * scalar);
    }

    function Mat4MultiplyScalarAndAdd(a, b, scalar, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(a.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        var _b = __read(b.data, 16), b00 = _b[0], b01 = _b[1], b02 = _b[2], b03 = _b[3], b10 = _b[4], b11 = _b[5], b12 = _b[6], b13 = _b[7], b20 = _b[8], b21 = _b[9], b22 = _b[10], b23 = _b[11], b30 = _b[12], b31 = _b[13], b32 = _b[14], b33 = _b[15];
        return out.set(a00 + b00 * scalar, a01 + b01 * scalar, a02 + b02 * scalar, a03 + b03 * scalar, a10 + b10 * scalar, a11 + b11 * scalar, a12 + b12 * scalar, a13 + b13 * scalar, a20 + b20 * scalar, a21 + b21 * scalar, a22 + b22 * scalar, a23 + b23 * scalar, a30 + b30 * scalar, a31 + b31 * scalar, a32 + b32 * scalar, a33 + b33 * scalar);
    }

    function Mat4Ortho(left, right, bottom, top, near, far, out) {
        if (out === void 0) { out = new Matrix4(); }
        var lr = 1 / (left - right);
        var bt = 1 / (bottom - top);
        var nf = 1 / (near - far);
        return out.set(-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1);
    }

    function Mat4Perspective(fovY, aspect, near, far, out) {
        if (out === void 0) { out = new Matrix4(); }
        var f = 1 / Math.tan(fovY / 2);
        var m22 = -1;
        var m32 = -2 * near;
        if (far !== null && far !== Infinity) {
            var nf = 1 / (near - far);
            m22 = (far + near) * nf;
            m32 = 2 * far * near * nf;
        }
        return out.set(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, m22, -1, 0, 0, m32, 0);
    }

    function Mat4PerspectiveFromFieldOfView(fov, near, far, out) {
        if (out === void 0) { out = new Matrix4(); }
        var upTan = Math.tan((fov.upDegrees * Math.PI) / 180);
        var downTan = Math.tan((fov.downDegrees * Math.PI) / 180);
        var leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180);
        var rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180);
        var xScale = 2 / (leftTan + rightTan);
        var yScale = 2 / (upTan + downTan);
        return out.set(xScale, 0, 0, 0, 0, yScale, 0, 0, -((leftTan - rightTan) * xScale * 0.5), (upTan - downTan) * yScale * 0.5, far / (near - far), -1, 0, 0, (far * near) / (near - far), 0);
    }

    function Mat4Rotate(matrix, angle, axis, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = axis.x, y = axis.y, z = axis.z;
        var len = Math.hypot(x, y, z);
        if (len < 0.00001) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1 - c;
        var _a = __read(matrix.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        var b00 = x * x * t + c;
        var b01 = y * x * t + z * s;
        var b02 = z * x * t - y * s;
        var b10 = x * y * t - z * s;
        var b11 = y * y * t + c;
        var b12 = z * y * t + x * s;
        var b20 = x * z * t + y * s;
        var b21 = y * z * t - x * s;
        var b22 = z * z * t + c;
        return out.set(a00 * b00 + a10 * b01 + a20 * b02, a01 * b00 + a11 * b01 + a21 * b02, a02 * b00 + a12 * b01 + a22 * b02, a03 * b00 + a13 * b01 + a23 * b02, a00 * b10 + a10 * b11 + a20 * b12, a01 * b10 + a11 * b11 + a21 * b12, a02 * b10 + a12 * b11 + a22 * b12, a03 * b10 + a13 * b11 + a23 * b12, a00 * b20 + a10 * b21 + a20 * b22, a01 * b20 + a11 * b21 + a21 * b22, a02 * b20 + a12 * b21 + a22 * b22, a03 * b20 + a13 * b21 + a23 * b22, a30, a31, a32, a33);
    }

    function Mat4RotateX(matrix, angle, out) {
        if (out === void 0) { out = new Matrix4(); }
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var _a = __read(matrix.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        return out.set(a00, a01, a02, a03, a10 * c + a20 * s, a11 * c + a21 * s, a12 * c + a22 * s, a13 * c + a23 * s, a20 * c - a10 * s, a21 * c - a11 * s, a22 * c - a12 * s, a23 * c - a13 * s, a30, a31, a32, a33);
    }

    function Mat4RotateY(matrix, angle, out) {
        if (out === void 0) { out = new Matrix4(); }
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var _a = __read(matrix.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        return out.set(a00 * c - a20 * s, a01 * c - a21 * s, a02 * c - a22 * s, a03 * c - a23 * s, a10, a11, a12, a13, a00 * s + a20 * c, a01 * s + a21 * c, a02 * s + a22 * c, a03 * s + a23 * c, a30, a31, a32, a33);
    }

    function Mat4RotateZ(matrix, angle, out) {
        if (out === void 0) { out = new Matrix4(); }
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var _a = __read(matrix.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        return out.set(a00 * c + a10 * s, a01 * c + a11 * s, a02 * c + a12 * s, a03 * c + a13 * s, a10 * c - a00 * s, a11 * c - a01 * s, a12 * c - a02 * s, a13 * c - a03 * s, a20, a21, a22, a23, a30, a31, a32, a33);
    }

    function Mat4Scale(matrix, v, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(matrix.data, 16), m00 = _a[0], m01 = _a[1], m02 = _a[2], m03 = _a[3], m10 = _a[4], m11 = _a[5], m12 = _a[6], m13 = _a[7], m20 = _a[8], m21 = _a[9], m22 = _a[10], m23 = _a[11], m30 = _a[12], m31 = _a[13], m32 = _a[14], m33 = _a[15];
        var x = v.x, y = v.y, z = v.z;
        return out.set(m00 * x, m01 * x, m02 * x, m03 * x, m10 * y, m11 * y, m12 * y, m13 * y, m20 * z, m21 * z, m22 * z, m23 * z, m30, m31, m32, m33);
    }

    function Mat4SetTranslation(matrix, vec3) {
        var data = matrix.data;
        var x = vec3.x, y = vec3.y, z = vec3.z;
        data[12] = x;
        data[13] = y;
        data[14] = z;
        matrix.onChange(matrix);
        return matrix;
    }

    function Mat4SetTranslationFromFloats(matrix, x, y, z) {
        var data = matrix.data;
        data[12] = x;
        data[13] = y;
        data[14] = z;
        matrix.onChange(matrix);
        return matrix;
    }

    function Mat4Subtract(a, b, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(a.data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        var _b = __read(b.data, 16), b00 = _b[0], b01 = _b[1], b02 = _b[2], b03 = _b[3], b10 = _b[4], b11 = _b[5], b12 = _b[6], b13 = _b[7], b20 = _b[8], b21 = _b[9], b22 = _b[10], b23 = _b[11], b30 = _b[12], b31 = _b[13], b32 = _b[14], b33 = _b[15];
        return out.set(a00 - b00, a01 - b01, a02 - b02, a03 - b03, a10 - b10, a11 - b11, a12 - b12, a13 - b13, a20 - b20, a21 - b21, a22 - b22, a23 - b23, a30 - b30, a31 - b31, a32 - b32, a33 - b33);
    }

    function Mat4TargetTo(eye, target, up, out) {
        if (out === void 0) { out = new Matrix4(); }
        var eyex = eye.x, eyey = eye.y, eyez = eye.z;
        var upx = up.x, upy = up.y, upz = up.z;
        var targetx = target.x, targety = target.y, targetz = target.z;
        var z0 = eyex - targetx;
        var z1 = eyey - targety;
        var z2 = eyez - targetz;
        var len = z0 * z0 + z1 * z1 + z2 * z2;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            z0 *= len;
            z1 *= len;
            z2 *= len;
        }
        var x0 = upy * z2 - upz * z1;
        var x1 = upz * z0 - upx * z2;
        var x2 = upx * z1 - upy * z0;
        len = x0 * x0 + x1 * x1 + x2 * x2;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }
        return out.set(x0, x1, x2, 0, z1 * x2 - z2 * x1, z2 * x0 - z0 * x2, z0 * x1 - z1 * x0, 0, z0, z1, z2, 0, eyex, eyey, eyez, 1);
    }

    function Mat4Translate(matrix, vec3, out) {
        if (out === void 0) { out = new Matrix4(); }
        var x = vec3.x, y = vec3.y, z = vec3.z;
        var data = matrix.data;
        var _a = __read(data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        if (matrix === out) {
            data[12] = a00 * x + a10 * y + a20 * z + a30;
            data[13] = a01 * x + a11 * y + a21 * z + a31;
            data[14] = a02 * x + a12 * y + a22 * z + a32;
            data[15] = a03 * x + a13 * y + a23 * z + a33;
        }
        else {
            out.set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a00 * x + a10 * y + a20 * z + a30, a01 * x + a11 * y + a21 * z + a31, a02 * x + a12 * y + a22 * z + a32, a03 * x + a13 * y + a23 * z + a33);
        }
        return out;
    }

    function Mat4TranslateFromFloats(matrix, x, y, z, out) {
        if (out === void 0) { out = new Matrix4(); }
        var data = matrix.data;
        var _a = __read(data, 16), a00 = _a[0], a01 = _a[1], a02 = _a[2], a03 = _a[3], a10 = _a[4], a11 = _a[5], a12 = _a[6], a13 = _a[7], a20 = _a[8], a21 = _a[9], a22 = _a[10], a23 = _a[11], a30 = _a[12], a31 = _a[13], a32 = _a[14], a33 = _a[15];
        if (matrix === out) {
            data[12] = a00 * x + a10 * y + a20 * z + a30;
            data[13] = a01 * x + a11 * y + a21 * z + a31;
            data[14] = a02 * x + a12 * y + a22 * z + a32;
            data[15] = a03 * x + a13 * y + a23 * z + a33;
        }
        else {
            out.set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a00 * x + a10 * y + a20 * z + a30, a01 * x + a11 * y + a21 * z + a31, a02 * x + a12 * y + a22 * z + a32, a03 * x + a13 * y + a23 * z + a33);
        }
        return out;
    }

    function Mat4Transpose(matrix, out) {
        if (out === void 0) { out = new Matrix4(); }
        var _a = __read(matrix.data, 16), m00 = _a[0], m01 = _a[1], m02 = _a[2], m03 = _a[3], m10 = _a[4], m11 = _a[5], m12 = _a[6], m13 = _a[7], m20 = _a[8], m21 = _a[9], m22 = _a[10], m23 = _a[11], m30 = _a[12], m31 = _a[13], m32 = _a[14], m33 = _a[15];
        return out.set(m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33);
    }

    function Mat4Zero(matrix) {
        return matrix.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    var index$13 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetMat4Determinant: GetMat4Determinant,
        GetMat4Frobenius: GetMat4Frobenius,
        Mat4Add: Mat4Add,
        Mat4AddTranslationFromFloats: Mat4AddTranslationFromFloats,
        Mat4Adjoint: Mat4Adjoint,
        Mat4Clone: Mat4Clone,
        Mat4CopyFrom: Mat4CopyFrom,
        Mat4CopyPosition: Mat4CopyPosition,
        Mat4Equals: Mat4Equals,
        Mat4FromQuat: Mat4FromQuat,
        Mat4FromRotation: Mat4FromRotation,
        Mat4FromRotationTranslation: Mat4FromRotationTranslation,
        Mat4FromRotationTranslationScale: Mat4FromRotationTranslationScale,
        Mat4FromRotationTranslationScaleOrigin: Mat4FromRotationTranslationScaleOrigin,
        Mat4FromRotationXYTranslation: Mat4FromRotationXYTranslation,
        Mat4FromScaling: Mat4FromScaling,
        Mat4FromTranslation: Mat4FromTranslation,
        Mat4FromXRotation: Mat4FromXRotation,
        Mat4FromYRotation: Mat4FromYRotation,
        Mat4FromZRotation: Mat4FromZRotation,
        Mat4Frustum: Mat4Frustum,
        Mat4GetRotation: Mat4GetRotation,
        Mat4GetScaling: Mat4GetScaling,
        Mat4GetTranslation: Mat4GetTranslation,
        Mat4Identity: Mat4Identity,
        Mat4Invert: Mat4Invert,
        Mat4LookAt: Mat4LookAt,
        Mat4Multiply: Mat4Multiply,
        Mat4MultiplyScalar: Mat4MultiplyScalar,
        Mat4MultiplyScalarAndAdd: Mat4MultiplyScalarAndAdd,
        Mat4Ortho: Mat4Ortho,
        Mat4Perspective: Mat4Perspective,
        Mat4PerspectiveFromFieldOfView: Mat4PerspectiveFromFieldOfView,
        Mat4Rotate: Mat4Rotate,
        Mat4RotateX: Mat4RotateX,
        Mat4RotateY: Mat4RotateY,
        Mat4RotateZ: Mat4RotateZ,
        Mat4Scale: Mat4Scale,
        Mat4SetTranslation: Mat4SetTranslation,
        Mat4SetTranslationFromFloats: Mat4SetTranslationFromFloats,
        Mat4Subtract: Mat4Subtract,
        Mat4TargetTo: Mat4TargetTo,
        Mat4Translate: Mat4Translate,
        Mat4TranslateFromFloats: Mat4TranslateFromFloats,
        Mat4Transpose: Mat4Transpose,
        Mat4Zero: Mat4Zero,
        Matrix4: Matrix4
    });

    var Matrix2D = (function () {
        function Matrix2D(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.set(a, b, c, d, tx, ty);
        }
        Matrix2D.prototype.set = function (a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
        };
        Matrix2D.prototype.identity = function () {
            return this.set();
        };
        Matrix2D.prototype.toArray = function () {
            var _a = this, a = _a.a, b = _a.b, c = _a.c, d = _a.d, tx = _a.tx, ty = _a.ty;
            return [a, b, c, d, tx, ty];
        };
        Matrix2D.prototype.fromArray = function (src) {
            return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
        };
        return Matrix2D;
    }());

    function RectangleContains(rect, x, y) {
        if (rect.width <= 0 || rect.height <= 0) {
            return false;
        }
        return (rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y);
    }

    var Rectangle$1 = (function () {
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.set(x, y, width, height);
        }
        Rectangle.prototype.set = function (x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        };
        Rectangle.prototype.contains = function (x, y) {
            return RectangleContains(this, x, y);
        };
        Object.defineProperty(Rectangle.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            set: function (value) {
                if (value <= this.x) {
                    this.width = 0;
                }
                else {
                    this.width = value - this.x;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            set: function (value) {
                if (value <= this.y) {
                    this.height = 0;
                }
                else {
                    this.height = value - this.y;
                }
            },
            enumerable: false,
            configurable: true
        });
        return Rectangle;
    }());

    var Vec2Callback = (function () {
        function Vec2Callback(onChange, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._x = x;
            this._y = y;
            this.onChange = onChange;
        }
        Vec2Callback.prototype.destroy = function () {
            this.onChange = NOOP$1;
        };
        Vec2Callback.prototype.set = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._x = x;
            this._y = y;
            if (this.onChange) {
                this.onChange(this);
            }
            return this;
        };
        Object.defineProperty(Vec2Callback.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                var prev = this._x;
                this._x = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec2Callback.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                var prev = this._y;
                this._y = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Vec2Callback.prototype.toArray = function (dst, index) {
            if (dst === void 0) { dst = []; }
            if (index === void 0) { index = 0; }
            var _a = this, x = _a.x, y = _a.y;
            dst[index] = x;
            dst[index + 1] = y;
            return dst;
        };
        Vec2Callback.prototype.fromArray = function (src, index) {
            if (index === void 0) { index = 0; }
            return this.set(src[index], src[index + 1]);
        };
        Vec2Callback.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y;
            return "{ x=" + x + ", y=" + y + " }";
        };
        return Vec2Callback;
    }());

    function AngleBetween(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    function AngleBetweenY(x1, y1, x2, y2) {
        return Math.atan2(x2 - x1, y2 - y1);
    }

    var MATH_CONST = {
        PI2: Math.PI * 2,
        HALF_PI: Math.PI * 0.5,
        EPSILON: 1.0e-6,
        DEG_TO_RAD: Math.PI / 180,
        RAD_TO_DEG: 180 / Math.PI,
        MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER || -9007199254740991,
        MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991
    };

    function CounterClockwise(angle) {
        if (angle > Math.PI) {
            angle -= MATH_CONST.PI2;
        }
        return Math.abs((((angle + MATH_CONST.HALF_PI) % MATH_CONST.PI2) - MATH_CONST.PI2) % MATH_CONST.PI2);
    }

    function NormalizeAngle(angle) {
        angle = angle % MATH_CONST.PI2;
        if (angle >= 0) {
            return angle;
        }
        else {
            return angle + MATH_CONST.PI2;
        }
    }

    function ReverseAngle(angle) {
        return NormalizeAngle(angle + Math.PI);
    }

    function RotateAngleTo(currentAngle, targetAngle, lerp) {
        if (lerp === void 0) { lerp = 0.05; }
        if (currentAngle === targetAngle) {
            return currentAngle;
        }
        if (Math.abs(targetAngle - currentAngle) <= lerp || Math.abs(targetAngle - currentAngle) >= (MATH_CONST.PI2 - lerp)) {
            currentAngle = targetAngle;
        }
        else {
            if (Math.abs(targetAngle - currentAngle) > Math.PI) {
                if (targetAngle < currentAngle) {
                    targetAngle += MATH_CONST.PI2;
                }
                else {
                    targetAngle -= MATH_CONST.PI2;
                }
            }
            if (targetAngle > currentAngle) {
                currentAngle += lerp;
            }
            else if (targetAngle < currentAngle) {
                currentAngle -= lerp;
            }
        }
        return currentAngle;
    }

    function ShortestAngleBetween(angle1, angle2) {
        var difference = angle2 - angle1;
        if (difference === 0) {
            return 0;
        }
        var times = Math.floor((difference - (-180)) / 360);
        return difference - (times * 360);
    }

    function Wrap(value, min, max) {
        var range = max - min;
        return (min + ((((value - min) % range) + range) % range));
    }

    function WrapAngle(angle) {
        return Wrap(angle, -Math.PI, Math.PI);
    }

    function WrapAngleDegrees(angle) {
        return Wrap(angle, -180, 180);
    }

    var index$12 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AngleBetween: AngleBetween,
        AngleBetweenY: AngleBetweenY,
        CounterClockwise: CounterClockwise,
        NormalizeAngle: NormalizeAngle,
        ReverseAngle: ReverseAngle,
        RotateAngleTo: RotateAngleTo,
        ShortestAngleBetween: ShortestAngleBetween,
        WrapAngle: WrapAngle,
        WrapAngleDegrees: WrapAngleDegrees
    });

    var Camera = (function () {
        function Camera() {
            var _this = this;
            this._rotation = 0;
            this.type = 'Camera';
            this.dirtyRender = true;
            var game = GameInstance.get();
            this.renderer = game.renderer;
            this.matrix = Mat4Identity();
            this.bounds = new Rectangle$1();
            this.worldTransform = new Matrix2D();
            this.position = new Vec2Callback(function () { return _this.updateTransform(); }, 0, 0);
            this.scale = new Vec2Callback(function () { return _this.updateTransform(); }, 1, 1);
            this.origin = new Vec2Callback(function () { return _this.updateTransform(); }, 0.5, 0.5);
            this.reset();
        }
        Camera.prototype.updateTransform = function () {
            var matrix = this.matrix.data;
            var px = this.position.x;
            var py = this.position.y;
            var sx = this.scale.x;
            var sy = this.scale.y;
            var ox = -px + (this.width * this.origin.x);
            var oy = -py + (this.height * this.origin.y);
            var z = Math.sin(this.rotation);
            var w = Math.cos(this.rotation);
            var z2 = z + z;
            var zz = z * z2;
            var wz = w * z2;
            var out0 = (1 - zz) * sx;
            var out1 = wz * sx;
            var out4 = -wz * sy;
            var out5 = (1 - zz) * sy;
            matrix[0] = out0;
            matrix[1] = out1;
            matrix[4] = out4;
            matrix[5] = out5;
            matrix[12] = px + ox - (out0 * ox + out4 * oy);
            matrix[13] = py + oy - (out1 * ox + out5 * oy);
            this.worldTransform.set(w * sx, z * sx, -z * sy, w * sy, -px, -py);
            var bw = this.width * (1 / sx);
            var bh = this.height * (1 / sy);
            this.bounds.set(ox - (bw / 2), oy - (bh / 2), bw, bh);
            this.dirtyRender = true;
        };
        Camera.prototype.reset = function () {
            var width = this.renderer.width;
            var height = this.renderer.height;
            this.width = width;
            this.height = height;
            this.bounds.set(0, 0, width, height);
        };
        Object.defineProperty(Camera.prototype, "rotation", {
            get: function () {
                return this._rotation;
            },
            set: function (value) {
                if (value !== this._rotation) {
                    this._rotation = WrapAngle(value);
                    this.updateTransform();
                }
            },
            enumerable: false,
            configurable: true
        });
        Camera.prototype.destroy = function () {
            this.position.destroy();
            this.scale.destroy();
            this.origin.destroy();
            this.world = null;
            this.worldTransform = null;
            this.renderer = null;
            this.matrix = null;
            this.bounds = null;
        };
        return Camera;
    }());

    var StaticCamera = (function () {
        function StaticCamera() {
            this.type = 'StaticCamera';
            this.dirtyRender = true;
            var game = GameInstance.get();
            this.renderer = game.renderer;
            this.matrix = Mat4Identity();
            this.bounds = new Rectangle$1();
            this.worldTransform = new Matrix2D();
            this.reset();
        }
        StaticCamera.prototype.reset = function () {
            var renderer = this.renderer;
            if (renderer) {
                var width = renderer.width;
                var height = renderer.height;
                this.width = width;
                this.height = height;
            }
            this.bounds.set(0, 0, this.width, this.height);
        };
        StaticCamera.prototype.destroy = function () {
            this.world = null;
            this.worldTransform = null;
            this.renderer = null;
            this.matrix = null;
            this.bounds = null;
        };
        return StaticCamera;
    }());

    var index$11 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Camera: Camera,
        StaticCamera: StaticCamera
    });

    function QuatDot(a, b) {
        return (a.x * b.x) + (a.y * b.y) + (a.z * b.z) + (a.w * b.w);
    }

    function GetQuatAngle(a, b) {
        var dot = QuatDot(a, b);
        return Math.acos(2 * dot * dot - 1);
    }

    function Clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function GetQuatAngleTo(a, b) {
        return 2 * Math.acos(Math.abs(Clamp(QuatDot(a, b), -1, 1)));
    }

    function GetQuatAreClose(a, b) {
        return (QuatDot(a, b) >= 0);
    }

    function GetQuatAxisAngle(a, out) {
        if (out === void 0) { out = new Quaternion(); }
        var rad = Math.acos(a.w) * 2;
        var s = Math.sin(rad / 2);
        var epsilon = 0.000001;
        if (s > epsilon) {
            out.set(a.x / s, a.y / s, a.z / s);
        }
        else {
            out.set(1, 0, 0);
        }
        return rad;
    }

    function GetQuatLength(a) {
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    function GetQuatLengthSquared(a) {
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return x * x + y * y + z * z + w * w;
    }

    function QuatAdd(a, b, out) {
        if (out === void 0) { out = new Quaternion(); }
        return out.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }

    function QuatAddScalar(a, scalar, out) {
        if (out === void 0) { out = new Quaternion(); }
        return out.set(a.x + scalar, a.y + scalar, a.z + scalar, a.w + scalar);
    }

    function QuatClone(source) {
        var x = source.x, y = source.y, z = source.z, w = source.w;
        return new Quaternion(x, y, z, w);
    }

    function QuatConjugate(a, out) {
        if (out === void 0) { out = new Quaternion(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(x * -1, y * -1, z * -1, w);
    }

    function QuatCopyFrom(source, dest) {
        var x = source.x, y = source.y, z = source.z, w = source.w;
        return dest.set(x, y, z, w);
    }

    function QuatEquals(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
    }

    function QuatRotationYawPitchRoll(yaw, pitch, roll, out) {
        if (out === void 0) { out = new Quaternion(); }
        var halfRoll = roll * 0.5;
        var halfPitch = pitch * 0.5;
        var halfYaw = yaw * 0.5;
        var sinRoll = Math.sin(halfRoll);
        var cosRoll = Math.cos(halfRoll);
        var sinPitch = Math.sin(halfPitch);
        var cosPitch = Math.cos(halfPitch);
        var sinYaw = Math.sin(halfYaw);
        var cosYaw = Math.cos(halfYaw);
        return out.set((cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll), (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll), (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll), (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll));
    }

    function QuatFromEulerAngles(x, y, z, out) {
        if (out === void 0) { out = new Quaternion(); }
        return QuatRotationYawPitchRoll(y, x, z, out);
    }

    function QuatFromEulerVector(v, out) {
        if (out === void 0) { out = new Quaternion(); }
        return QuatRotationYawPitchRoll(v.y, v.x, v.z, out);
    }

    function Vec3Backward() {
        return new Vec3(0, 0, -1);
    }

    function Vec3Down() {
        return new Vec3(0, -1, 0);
    }

    function Vec3Forward() {
        return new Vec3(0, 0, 1);
    }

    function Vec3Left() {
        return new Vec3(-1, 0, 0);
    }

    function Vec3Right() {
        return new Vec3(1, 0, 0);
    }

    function Vec3Up() {
        return new Vec3(0, 1, 0);
    }

    function Vec3Zero() {
        return new Vec3(0, 0, 0);
    }

    var UP = Vec3Up();
    var DOWN = Vec3Down();
    var LEFT = Vec3Left();
    var RIGHT = Vec3Right();
    var FORWARD = Vec3Forward();
    var BACKWARD = Vec3Backward();
    var ZERO = Vec3Zero();

    function Vec3Dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    function GetVec3Angle(a, b) {
        var ax = a.x, ay = a.y, az = a.z;
        var bx = b.x, by = b.y, bz = b.z;
        var mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
        var mag2 = Math.sqrt(bx * bx + by * by + bz * bz);
        var mag = mag1 * mag2;
        var c = mag && Vec3Dot(a, b) / mag;
        return Math.acos(Math.min(Math.max(c, -1), 1));
    }

    function GetVec3DistanceSquared(a, b) {
        var x = a.x - b.x;
        var y = a.y - b.y;
        var z = a.z - b.z;
        return (x * x) + (y * y) + (z * z);
    }

    function GetVec3Distance(a, b) {
        return Math.sqrt(GetVec3DistanceSquared(a, b));
    }

    function GetVec3Length(a) {
        var x = a.x, y = a.y, z = a.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    function GetVec3LengthSquared(a) {
        var x = a.x, y = a.y, z = a.z;
        return x * x + y * y + z * z;
    }

    function GetVec3ManhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
    }

    function GetVec3ManhattanLength(a) {
        return Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);
    }

    var Vec3Callback = (function () {
        function Vec3Callback(onChange, x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this._x = x;
            this._y = y;
            this._z = z;
            this.onChange = onChange;
        }
        Vec3Callback.prototype.destroy = function () {
            this.onChange = NOOP$1;
        };
        Vec3Callback.prototype.set = function (x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this._x = x;
            this._y = y;
            this._z = z;
            if (this.onChange) {
                this.onChange(this);
            }
            return this;
        };
        Object.defineProperty(Vec3Callback.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                var prev = this._x;
                this._x = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec3Callback.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                var prev = this._y;
                this._y = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec3Callback.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                var prev = this._z;
                this._z = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Vec3Callback.prototype.toArray = function (dst, index) {
            if (dst === void 0) { dst = []; }
            if (index === void 0) { index = 0; }
            var _a = this, x = _a.x, y = _a.y, z = _a.z;
            dst[index] = x;
            dst[index + 1] = y;
            dst[index + 2] = z;
            return dst;
        };
        Vec3Callback.prototype.fromArray = function (src, index) {
            if (index === void 0) { index = 0; }
            return this.set(src[index], src[index + 1], src[index + 2]);
        };
        Vec3Callback.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y, z = _a.z;
            return "{ x=" + x + ", y=" + y + ", z=" + z + " }";
        };
        return Vec3Callback;
    }());

    var RGBCallback = (function (_super) {
        __extends(RGBCallback, _super);
        function RGBCallback(onChange, r, g, b) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            return _super.call(this, onChange, r, g, b) || this;
        }
        Object.defineProperty(RGBCallback.prototype, "r", {
            get: function () {
                return this.x;
            },
            set: function (value) {
                this.x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RGBCallback.prototype, "g", {
            get: function () {
                return this.y;
            },
            set: function (value) {
                this.y = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RGBCallback.prototype, "b", {
            get: function () {
                return this.z;
            },
            set: function (value) {
                this.z = value;
            },
            enumerable: false,
            configurable: true
        });
        RGBCallback.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y, z = _a.z;
            return "[ r=" + x + ", g=" + y + ", b=" + z + " ]";
        };
        return RGBCallback;
    }(Vec3Callback));

    function Vec3Abs(a, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(Math.abs(a.x), Math.abs(a.y), Math.abs(a.z));
    }

    function Vec3Add(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    function Vec3AddScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x + scalar, a.y + scalar, a.z + scalar);
    }

    function Bezier(a, b, c, d, t) {
        var inverseFactor = 1 - t;
        var inverseFactorTimesTwo = inverseFactor * inverseFactor;
        var factorTimes2 = t * t;
        var factor1 = inverseFactorTimesTwo * inverseFactor;
        var factor2 = 3 * t * inverseFactorTimesTwo;
        var factor3 = 3 * factorTimes2 * inverseFactor;
        var factor4 = factorTimes2 * t;
        return a * factor1 + b * factor2 + c * factor3 + d * factor4;
    }

    function Vec3Bezier(a, b, c, d, t, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(Bezier(t, a.x, b.x, c.x, d.x), Bezier(t, a.y, b.y, c.y, d.y), Bezier(t, a.z, b.z, c.z, d.z));
    }

    function CatmullRom(t, p0, p1, p2, p3) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        var t2 = t * t;
        var t3 = t * t2;
        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }

    function Vec3CatmullRom(p1, p2, p3, p4, t, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(CatmullRom(t, p1.x, p2.x, p3.x, p4.x), CatmullRom(t, p1.y, p2.y, p3.y, p4.y), CatmullRom(t, p1.z, p2.z, p3.z, p4.z));
    }

    function Vec3Ceil(a, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(Math.ceil(a.x), Math.ceil(a.y), Math.ceil(a.z));
    }

    function Vec3Scale(a, scalar, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x * scalar, a.y * scalar, a.z * scalar);
    }

    function Vec3Center(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        Vec3Add(a, b, out);
        return Vec3Scale(out, 0.5, out);
    }

    function Vec3Clamp(a, min, max, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y), Clamp(a.z, min.z, max.z));
    }

    function Vec3DivideScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec3(); }
        var x = a.x, y = a.y, z = a.z;
        return out.set(x / scalar, y / scalar, z / scalar);
    }

    function Vec3ClampLength(a, min, max, out) {
        if (out === void 0) { out = new Vec3(); }
        var length = GetVec3Length(a);
        Vec3DivideScalar(a, length || 1, out);
        return Vec3Scale(out, Clamp(min, max, length), out);
    }

    function Vec3ClampScalar(a, min, max, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max), Clamp(a.z, min, max));
    }

    function Vec3Clone(source) {
        var x = source.x, y = source.y, z = source.z;
        return new Vec3(x, y, z);
    }

    function Vec3CopyFrom(source, dest) {
        var x = source.x, y = source.y, z = source.z;
        return dest.set(x, y, z);
    }

    function Vec3Cross(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        var ax = a.x, ay = a.y, az = a.z;
        var bx = b.x, by = b.y, bz = b.z;
        return out.set(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
    }

    function Vec3CrossNormalize(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        var ax = a.x, ay = a.y, az = a.z;
        var bx = b.x, by = b.y, bz = b.z;
        var x = ay * bz - az * by;
        var y = az * bx - ax * bz;
        var z = ax * by - ay * bx;
        var len = x * x + y * y + z * z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        return out.set(x * len, y * len, z * len);
    }

    function Vec3Divide(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x / b.x, a.y / b.y, a.z / b.z);
    }

    function Vec3Equals(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z;
    }

    function Vec3Floor(a, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(Math.floor(a.x), Math.floor(a.y), Math.floor(a.z));
    }

    function Vec3Fract(a, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x - Math.floor(a.x), a.y - Math.floor(a.y), a.z - Math.floor(a.z));
    }

    function Vec3FromCylindricalCoords(radius, theta, y, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(radius * Math.sin(theta), y, radius * Math.cos(theta));
    }

    function Vec3FromSphericalCoords(radius, phi, theta, out) {
        if (out === void 0) { out = new Vec3(); }
        var sinPhiRadius = Math.sin(phi) * radius;
        return out.set(sinPhiRadius * Math.sin(theta), Math.cos(phi) * radius, sinPhiRadius * Math.cos(theta));
    }

    function FuzzyEqual(a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return Math.abs(a - b) < epsilon;
    }

    function Vec3FuzzyEquals(a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon) && FuzzyEqual(a.z, b.z, epsilon);
    }

    function Hermite(a, b, c, d, t) {
        var squared = t * t;
        var factor1 = squared * (2 * t - 3) + 1;
        var factor2 = squared * (t - 2) + t;
        var factor3 = squared * (t - 1);
        var factor4 = squared * (3 - 2 * t);
        return a * factor1 + b * factor2 + c * factor3 + d * factor4;
    }

    function Vec3Hermite(a, b, c, d, t, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y), Hermite(t, a.z, b.z, c.z, d.z));
    }

    function Vec3Inverse(a, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(1 / a.x, 1 / a.y, 1 / a.z);
    }

    function Vec3IsNonUniform(a) {
        var absX = Math.abs(a.x);
        var absY = Math.abs(a.y);
        var absZ = Math.abs(a.z);
        return (absX !== absY || absX !== absZ || absY !== absZ);
    }

    function Vec3Lerp(a, b, t, out) {
        if (out === void 0) { out = new Vec3(); }
        var x = a.x, y = a.y, z = a.z;
        return out.set(x + t * (b.x - x), y + t * (b.y - y), z + t * (b.z - z));
    }

    function Vec3Max(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        var ax = a.x, ay = a.y, az = a.z;
        var bx = b.x, by = b.y, bz = b.z;
        return out.set(Math.max(ax, bx), Math.max(ay, by), Math.max(az, bz));
    }

    function Vec3Min(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        var ax = a.x, ay = a.y, az = a.z;
        var bx = b.x, by = b.y, bz = b.z;
        return out.set(Math.min(ax, bx), Math.min(ay, by), Math.min(az, bz));
    }

    function Vec3Multiply(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x * b.x, a.y * b.y, a.z * b.z);
    }

    function Vec3MultiplyByFloats(a, x, y, z, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x * x, a.y * y, a.z * z);
    }

    function Vec3Negate(a, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(-a.x, -a.y, -a.z);
    }

    function Vec3Normalize(a, out) {
        if (out === void 0) { out = new Vec3(); }
        var x = a.x, y = a.y, z = a.z;
        var len = x * x + y * y + z * z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        return out.set(x * len, y * len, z * len);
    }

    function Vec3One() {
        return new Vec3(1, 1, 1);
    }

    function Vec3TransformMat4(a, m, out) {
        if (out === void 0) { out = new Vec3(); }
        var _a = __read(m.data, 16), m00 = _a[0], m01 = _a[1], m02 = _a[2], m03 = _a[3], m10 = _a[4], m11 = _a[5], m12 = _a[6], m13 = _a[7], m20 = _a[8], m21 = _a[9], m22 = _a[10], m23 = _a[11], m30 = _a[12], m31 = _a[13], m32 = _a[14], m33 = _a[15];
        var x = a.x, y = a.y, z = a.z;
        var w = m03 * x + m13 * y + m23 * z + m33;
        w = w || 1;
        return out.set((m00 * x + m10 * y + m20 * z + m30) / w, (m01 * x + m11 * y + m21 * z + m31) / w, (m02 * x + m12 * y + m22 * z + m32) / w);
    }

    var tempMatrix1 = new Matrix4();
    var tempMatrix2 = new Matrix4();
    function Vec3Project(v, world, transform, viewport, out) {
        if (out === void 0) { out = new Vec3(); }
        var x = viewport.x, y = viewport.y, width = viewport.width, height = viewport.height;
        tempMatrix1.set(width / 2, 0, 0, 0, 0, -height / 2, 0, 0, 0, 0, 0.5, 0, x + width / 2, height / 2 + y, 0.5, 1);
        Mat4Multiply(world, transform, tempMatrix2);
        Mat4Multiply(tempMatrix2, tempMatrix1, tempMatrix2);
        return Vec3TransformMat4(v, tempMatrix2, out);
    }

    function Vec3Random(a, scale, out) {
        if (scale === void 0) { scale = 1; }
        if (out === void 0) { out = new Vec3(); }
        var r = Math.random() * 2 * Math.PI;
        var z = Math.random() * 2 - 1;
        var zScale = Math.sqrt(1 - z * z) * scale;
        return out.set(Math.cos(r) * zScale, Math.sin(r) * zScale, z * scale);
    }

    function Vec3Subtract(a, b, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    function Vec3Reflect(a, normal, out) {
        if (out === void 0) { out = new Vec3(); }
        Vec3Scale(normal, 2 * Vec3Dot(a, normal), out);
        return Vec3Subtract(a, out, out);
    }

    function Vec3RotateX(a, origin, angle, out) {
        if (out === void 0) { out = new Vec3(); }
        var ax = a.x, ay = a.y, az = a.z;
        var bx = origin.x, by = origin.y, bz = origin.z;
        var px = ax - bx;
        var py = ay - by;
        var pz = az - bz;
        var rx = px;
        var ry = py * Math.cos(angle) - pz * Math.sin(angle);
        var rz = py * Math.sin(angle) + pz * Math.cos(angle);
        return out.set(rx + bx, ry + by, rz + bz);
    }

    function Vec3RotateY(a, origin, angle, out) {
        if (out === void 0) { out = new Vec3(); }
        var ax = a.x, ay = a.y, az = a.z;
        var bx = origin.x, by = origin.y, bz = origin.z;
        var px = ax - bx;
        var py = ay - by;
        var pz = az - bz;
        var rx = pz * Math.sin(angle) + px * Math.cos(angle);
        var ry = py;
        var rz = pz * Math.cos(angle) - px * Math.sin(angle);
        return out.set(rx + bx, ry + by, rz + bz);
    }

    function Vec3RotateZ(a, origin, angle, out) {
        if (out === void 0) { out = new Vec3(); }
        var ax = a.x, ay = a.y, az = a.z;
        var bx = origin.x, by = origin.y, bz = origin.z;
        var px = ax - bx;
        var py = ay - by;
        var pz = az - bz;
        var rx = px * Math.cos(angle) - py * Math.sin(angle);
        var ry = px * Math.sin(angle) + py * Math.cos(angle);
        var rz = pz;
        return out.set(rx + bx, ry + by, rz + bz);
    }

    function Vec3Round(a, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(Math.round(a.x), Math.round(a.y), Math.round(a.z));
    }

    function Vec3RoundToZero(a, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set((a.x < 0) ? Math.ceil(a.x) : Math.floor(a.x), (a.y < 0) ? Math.ceil(a.y) : Math.floor(a.y), (a.z < 0) ? Math.ceil(a.z) : Math.floor(a.z));
    }

    function Vec3ScaleAndAdd(a, b, scalar, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x + b.x * scalar, a.y + b.y * scalar, a.z + b.z * scalar);
    }

    function Vec3SetLength(a, length, out) {
        if (out === void 0) { out = new Vec3(); }
        Vec3Normalize(a, out);
        return Vec3Scale(out, length, out);
    }

    function Vec3SubtractScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec3(); }
        return out.set(a.x - scalar, a.y - scalar, a.z - scalar);
    }

    function Vec3TransformMat4Zero(a, m, out) {
        if (out === void 0) { out = new Vec3(); }
        var _a = __read(m.data, 11), m00 = _a[0], m01 = _a[1], m02 = _a[2]; _a[3]; var m10 = _a[4], m11 = _a[5], m12 = _a[6]; _a[7]; var m20 = _a[8], m21 = _a[9], m22 = _a[10];
        var x = a.x, y = a.y, z = a.z;
        return out.set(m00 * x + m10 * y + m20 * z, m01 * x + m11 * y + m21 * z, m02 * x + m12 * y + m22 * z);
    }

    function Vec3TransformQuat(a, q, out) {
        if (out === void 0) { out = new Vec3(); }
        var qx = q.x, qy = q.y, qz = q.z, qw = q.w;
        var x = a.x, y = a.y, z = a.z;
        var uvx = qy * z - qz * y;
        var uvy = qz * x - qx * z;
        var uvz = qx * y - qy * x;
        var uuvx = qy * uvz - qz * uvy;
        var uuvy = qz * uvx - qx * uvz;
        var uuvz = qx * uvy - qy * uvx;
        var w2 = qw * 2;
        uvx *= w2;
        uvy *= w2;
        uvz *= w2;
        uuvx *= 2;
        uuvy *= 2;
        uuvz *= 2;
        return out.set(x + uvx + uuvx, y + uvy + uuvy, z + uvz + uuvz);
    }

    var matrix = new Matrix4();
    var screenSource = new Vec3();
    function Vec3Unproject(v, viewportWidth, viewportHeight, world, view, projection, out) {
        if (out === void 0) { out = new Vec3(); }
        Mat4Multiply(world, view, matrix);
        Mat4Multiply(matrix, projection, matrix);
        Mat4Invert(matrix, matrix);
        var x = v.x, y = v.y, z = v.z;
        screenSource.set(x / viewportWidth * 2 - 1, -(y / viewportHeight * 2 - 1), 2 * z - 1);
        Vec3TransformMat4(screenSource, matrix, out);
        var data = matrix.data;
        var num = screenSource.x * data[3] + screenSource.y * data[7] + screenSource.z * data[11] + data[15];
        return Vec3Scale(out, 1 / num, out);
    }

    var index$10 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetVec3Angle: GetVec3Angle,
        GetVec3Distance: GetVec3Distance,
        GetVec3DistanceSquared: GetVec3DistanceSquared,
        GetVec3Length: GetVec3Length,
        GetVec3LengthSquared: GetVec3LengthSquared,
        GetVec3ManhattanDistance: GetVec3ManhattanDistance,
        GetVec3ManhattanLength: GetVec3ManhattanLength,
        RGBCallback: RGBCallback,
        Vec3: Vec3,
        Vec3Abs: Vec3Abs,
        Vec3Add: Vec3Add,
        Vec3AddScalar: Vec3AddScalar,
        Vec3Backward: Vec3Backward,
        Vec3Bezier: Vec3Bezier,
        Vec3Callback: Vec3Callback,
        Vec3CatmullRom: Vec3CatmullRom,
        Vec3Ceil: Vec3Ceil,
        Vec3Center: Vec3Center,
        Vec3Clamp: Vec3Clamp,
        Vec3ClampLength: Vec3ClampLength,
        Vec3ClampScalar: Vec3ClampScalar,
        Vec3Clone: Vec3Clone,
        Vec3CopyFrom: Vec3CopyFrom,
        Vec3Cross: Vec3Cross,
        Vec3CrossNormalize: Vec3CrossNormalize,
        Vec3Divide: Vec3Divide,
        Vec3DivideScalar: Vec3DivideScalar,
        Vec3Dot: Vec3Dot,
        Vec3Down: Vec3Down,
        Vec3Equals: Vec3Equals,
        Vec3Floor: Vec3Floor,
        Vec3Forward: Vec3Forward,
        Vec3Fract: Vec3Fract,
        Vec3FromCylindricalCoords: Vec3FromCylindricalCoords,
        Vec3FromSphericalCoords: Vec3FromSphericalCoords,
        Vec3FuzzyEquals: Vec3FuzzyEquals,
        Vec3Hermite: Vec3Hermite,
        Vec3Inverse: Vec3Inverse,
        Vec3IsNonUniform: Vec3IsNonUniform,
        Vec3Left: Vec3Left,
        Vec3Lerp: Vec3Lerp,
        Vec3Max: Vec3Max,
        Vec3Min: Vec3Min,
        Vec3Multiply: Vec3Multiply,
        Vec3MultiplyByFloats: Vec3MultiplyByFloats,
        Vec3Negate: Vec3Negate,
        Vec3Normalize: Vec3Normalize,
        Vec3One: Vec3One,
        Vec3Project: Vec3Project,
        Vec3Random: Vec3Random,
        Vec3Reflect: Vec3Reflect,
        Vec3Right: Vec3Right,
        Vec3RotateX: Vec3RotateX,
        Vec3RotateY: Vec3RotateY,
        Vec3RotateZ: Vec3RotateZ,
        Vec3Round: Vec3Round,
        Vec3RoundToZero: Vec3RoundToZero,
        Vec3Scale: Vec3Scale,
        Vec3ScaleAndAdd: Vec3ScaleAndAdd,
        Vec3SetLength: Vec3SetLength,
        Vec3Subtract: Vec3Subtract,
        Vec3SubtractScalar: Vec3SubtractScalar,
        Vec3TransformMat4: Vec3TransformMat4,
        Vec3TransformMat4Zero: Vec3TransformMat4Zero,
        Vec3TransformQuat: Vec3TransformQuat,
        Vec3Unproject: Vec3Unproject,
        Vec3Up: Vec3Up,
        Vec3Zero: Vec3Zero,
        BACKWARD: BACKWARD,
        DOWN: DOWN,
        FORWARD: FORWARD,
        LEFT: LEFT,
        RIGHT: RIGHT,
        UP: UP,
        ZERO: ZERO
    });

    function QuatFromRotationAxis(axis, angle, out) {
        if (out === void 0) { out = new Quaternion(); }
        var sin = Math.sin(angle / 2);
        Vec3Normalize(axis, axis);
        var x = axis.x, y = axis.y, z = axis.z;
        return out.set(x * sin, y * sin, z * sin, Math.cos(angle / 2));
    }

    function QuatFromRotationMatrix(matrix, out) {
        if (out === void 0) { out = new Quaternion(); }
        var _a = __read(matrix.data, 11), m11 = _a[0], m21 = _a[1], m31 = _a[2]; _a[3]; var m12 = _a[4], m22 = _a[5], m32 = _a[6]; _a[7]; var m13 = _a[8], m23 = _a[9], m33 = _a[10];
        var trace = m11 + m22 + m33;
        var s;
        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1);
            return out.set((m32 - m23) * s, (m13 - m31) * s, (m21 - m12) * s, 0.25 / s);
        }
        else if (m11 > m22 && m11 > m33) {
            s = 2 * Math.sqrt(1 + m11 - m22 - m33);
            return out.set(0.25 * s, (m12 + m21) / s, (m13 + m31) / s, (m32 - m23) / s);
        }
        else if (m22 > m33) {
            s = 2 * Math.sqrt(1 + m22 - m11 - m33);
            return out.set((m12 + m21) / s, 0.25 * s, (m23 + m32) / s, (m13 - m31) / s);
        }
        else {
            s = 2 * Math.sqrt(1 + m33 - m11 - m22);
            return out.set((m13 + m31) / s, (m23 + m32) / s, 0.25 * s, (m21 - m12) / s);
        }
    }

    function QuatFuzzyEquals(a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return (FuzzyEqual(a.x, b.x, epsilon) &&
            FuzzyEqual(a.y, b.y, epsilon) &&
            FuzzyEqual(a.z, b.z, epsilon) &&
            FuzzyEqual(a.w, b.w, epsilon));
    }

    function QuatHermite(a, b, c, d, t, out) {
        if (out === void 0) { out = new Quaternion(); }
        return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y), Hermite(t, a.z, b.z, c.z, d.z), Hermite(t, a.w, b.w, c.w, d.w));
    }

    function QuatInvert(a, out) {
        if (out === void 0) { out = new Quaternion(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        var dot = x * x + y * y + z * z + w * w;
        var invDot = dot ? 1 / dot : 0;
        return out.set(-x * invDot, -y * invDot, -z * invDot, w * invDot);
    }

    function QuatMultiply(a, b, out) {
        if (out === void 0) { out = new Quaternion(); }
        var ax = a.x, ay = a.y, az = a.z, aw = a.w;
        var bx = b.x, by = b.y, bz = b.z, bw = b.w;
        return out.set(ax * bw + aw * bx + ay * bz - az * by, ay * bw + aw * by + az * bx - ax * bz, az * bw + aw * bz + ax * by - ay * bx, aw * bw - ax * bx - ay * by - az * bz);
    }

    function QuatMultiplyByFloats(a, x, y, z, w, out) {
        if (out === void 0) { out = new Quaternion(); }
        return out.set(a.x * x, a.y * y, a.z * z, a.w * w);
    }

    function QuatScale(a, scalar, out) {
        if (out === void 0) { out = new Quaternion(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(x * scalar, y * scalar, z * scalar, w * scalar);
    }

    function QuatNormalize(a, out) {
        if (out === void 0) { out = new Quaternion(); }
        var length = GetQuatLength(a);
        if (length === 0) {
            return out.set(0, 0, 0, 1);
        }
        else {
            return QuatScale(a, length, out);
        }
    }

    function QuatSlerp(a, b, t, out) {
        if (out === void 0) { out = new Quaternion(); }
        if (t === 0) {
            return QuatCopyFrom(a, out);
        }
        else if (t === 1) {
            return QuatCopyFrom(b, out);
        }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        var bx = b.x, by = b.y, bz = b.z, bw = b.w;
        var cosHalfTheta = w * bw + x * bx + y * by + z * bz;
        if (cosHalfTheta < 0) {
            out.set(-bx, -by, -bz, -bw);
            cosHalfTheta = -cosHalfTheta;
        }
        else {
            QuatCopyFrom(b, out);
        }
        if (cosHalfTheta >= 1) {
            return out.set(x, y, z, w);
        }
        var sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;
        if (sqrSinHalfTheta <= Number.EPSILON) {
            var s = 1 - t;
            out.set(s * x + t * out.x, s * y + t * out.y, s * z + t * out.z, s * w + t * out.w);
            return QuatNormalize(out, out);
        }
        var sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
        var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
        var ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        return out.set((x * ratioA + out.x * ratioB), (y * ratioA + out.y * ratioB), (z * ratioA + out.z * ratioB), (w * ratioA + out.w * ratioB));
    }

    function QuatRotateTowards(a, b, step, out) {
        if (out === void 0) { out = new Quaternion(); }
        var angle = GetQuatAngle(a, b);
        if (angle === 0) {
            return QuatCopyFrom(a, out);
        }
        var t = Math.min(1, step / angle);
        return QuatSlerp(a, b, t, out);
    }

    function QuatRotateX(a, angle, out) {
        if (out === void 0) { out = new Quaternion(); }
        angle *= 0.5;
        var x = a.x, y = a.y, z = a.z, w = a.w;
        var bx = Math.sin(angle);
        var bw = Math.cos(angle);
        return out.set(x * bw + w * bx, y * bw + z * bx, z * bw - y * bx, w * bw - x * bx);
    }

    function QuatRotateY(a, angle, out) {
        if (out === void 0) { out = new Quaternion(); }
        angle *= 0.5;
        var x = a.x, y = a.y, z = a.z, w = a.w;
        var by = Math.sin(angle);
        var bw = Math.cos(angle);
        return out.set(x * bw - z * by, y * bw + w * by, z * bw + x * by, w * bw - y * by);
    }

    function QuatRotateZ(a, angle, out) {
        if (out === void 0) { out = new Quaternion(); }
        angle *= 0.5;
        var x = a.x, y = a.y, z = a.z, w = a.w;
        var bz = Math.sin(angle);
        var bw = Math.cos(angle);
        return out.set(x * bw + y * bz, y * bw - x * bz, z * bw + w * bz, w * bw - z * bz);
    }

    function QuatRotationAlphaBetaGamma(alpha, beta, gamma, out) {
        if (out === void 0) { out = new Quaternion(); }
        var halfGammaPlusAlpha = (gamma + alpha) * 0.5;
        var halfGammaMinusAlpha = (gamma - alpha) * 0.5;
        var halfBeta = beta * 0.5;
        return out.set(Math.cos(halfGammaMinusAlpha) * Math.sin(halfBeta), Math.sin(halfGammaMinusAlpha) * Math.sin(halfBeta), Math.sin(halfGammaPlusAlpha) * Math.cos(halfBeta), Math.cos(halfGammaPlusAlpha) * Math.cos(halfBeta));
    }

    function QuatScaleAndAdd(a, b, scalar, out) {
        if (out === void 0) { out = new Quaternion(); }
        return out.set(a.x + b.x * scalar, a.y + b.y * scalar, a.z + b.z * scalar, a.w + b.w * scalar);
    }

    function QuatSetAxisAngle(axis, angle, out) {
        if (out === void 0) { out = new Quaternion(); }
        var x = axis.x, y = axis.y, z = axis.z;
        angle *= 0.5;
        var s = Math.sin(angle);
        return out.set(x * s, y * s, z * s, Math.cos(angle));
    }

    function QuatSetFromUnitVectors(a, from, to, out) {
        if (out === void 0) { out = new Quaternion(); }
        var fx = from.x, fy = from.y, fz = from.z;
        var tx = to.x, ty = to.y, tz = to.z;
        var epsilon = 0.000001;
        var r = Vec3Dot(from, to) + 1;
        if (r < epsilon) {
            r = 0;
            if (Math.abs(fx) > Math.abs(fz)) {
                return out.set(-fy, fx, 0, r);
            }
            else {
                return out.set(0, -fz, fy, r);
            }
        }
        else {
            return out.set(fy * tz - fz * ty, fz * tx - fx * tz, fx * ty - fy * tx, r);
        }
    }

    function QuatSubtract(a, b, out) {
        if (out === void 0) { out = new Quaternion(); }
        return out.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    function QuatSubtractScalar(a, scalar, out) {
        if (out === void 0) { out = new Quaternion(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(x - scalar, y - scalar, z - scalar, w - scalar);
    }

    function QuatToEulerAngles(q, out) {
        if (out === void 0) { out = new Vec3(); }
        var x = q.x, y = q.y, z = q.z, w = q.w;
        var sqw = w * w;
        var sqz = z * z;
        var sqx = x * x;
        var sqy = y * y;
        var zAxisY = y * z - x * w;
        var limit = 0.4999999;
        if (zAxisY < -limit) {
            return out.set(Math.PI / 2, 2 * Math.atan2(y, w), 0);
        }
        else if (zAxisY > limit) {
            return out.set(-Math.PI / 2, 2 * Math.atan2(y, w), 0);
        }
        else {
            return out.set(Math.asin(-2.0 * (z * y - x * w)), Math.atan2(2.0 * (z * x + y * w), (sqz - sqx - sqy + sqw)), Math.atan2(2.0 * (x * y + z * w), (-sqz - sqx + sqy + sqw)));
        }
    }

    function QuatZero() {
        return new Quaternion(0, 0, 0, 0);
    }

    var index$$ = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetQuatAngle: GetQuatAngle,
        GetQuatAngleTo: GetQuatAngleTo,
        GetQuatAreClose: GetQuatAreClose,
        GetQuatAxisAngle: GetQuatAxisAngle,
        GetQuatLength: GetQuatLength,
        GetQuatLengthSquared: GetQuatLengthSquared,
        QuatAdd: QuatAdd,
        QuatAddScalar: QuatAddScalar,
        QuatClone: QuatClone,
        QuatConjugate: QuatConjugate,
        QuatCopyFrom: QuatCopyFrom,
        QuatDot: QuatDot,
        QuatEquals: QuatEquals,
        Quaternion: Quaternion,
        QuatFromEulerAngles: QuatFromEulerAngles,
        QuatFromEulerVector: QuatFromEulerVector,
        QuatFromRotationAxis: QuatFromRotationAxis,
        QuatFromRotationMatrix: QuatFromRotationMatrix,
        QuatFuzzyEquals: QuatFuzzyEquals,
        QuatHermite: QuatHermite,
        QuatInvert: QuatInvert,
        QuatMultiply: QuatMultiply,
        QuatMultiplyByFloats: QuatMultiplyByFloats,
        QuatNormalize: QuatNormalize,
        QuatRotateTowards: QuatRotateTowards,
        QuatRotateX: QuatRotateX,
        QuatRotateY: QuatRotateY,
        QuatRotateZ: QuatRotateZ,
        QuatRotationAlphaBetaGamma: QuatRotationAlphaBetaGamma,
        QuatRotationYawPitchRoll: QuatRotationYawPitchRoll,
        QuatScale: QuatScale,
        QuatScaleAndAdd: QuatScaleAndAdd,
        QuatSetAxisAngle: QuatSetAxisAngle,
        QuatSetFromUnitVectors: QuatSetFromUnitVectors,
        QuatSlerp: QuatSlerp,
        QuatSubtract: QuatSubtract,
        QuatSubtractScalar: QuatSubtractScalar,
        QuatToEulerAngles: QuatToEulerAngles,
        QuatZero: QuatZero
    });

    function In$9(v, overshoot) {
        if (overshoot === void 0) { overshoot = 1.70158; }
        return v * v * ((overshoot + 1) * v - overshoot);
    }

    function InOut$9(v, overshoot) {
        if (overshoot === void 0) { overshoot = 1.70158; }
        var s = overshoot * 1.525;
        if ((v *= 2) < 1) {
            return 0.5 * (v * v * ((s + 1) * v - s));
        }
        else {
            return 0.5 * ((v -= 2) * v * ((s + 1) * v + s) + 2);
        }
    }

    function Out$9(v, overshoot) {
        if (overshoot === void 0) { overshoot = 1.70158; }
        return --v * v * ((overshoot + 1) * v + overshoot) + 1;
    }

    var index$_ = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$9,
        InOut: InOut$9,
        Out: Out$9
    });

    function In$8(v) {
        v = 1 - v;
        if (v < 1 / 2.75) {
            return 1 - (7.5625 * v * v);
        }
        else if (v < 2 / 2.75) {
            return 1 - (7.5625 * (v -= 1.5 / 2.75) * v + 0.75);
        }
        else if (v < 2.5 / 2.75) {
            return 1 - (7.5625 * (v -= 2.25 / 2.75) * v + 0.9375);
        }
        else {
            return 1 - (7.5625 * (v -= 2.625 / 2.75) * v + 0.984375);
        }
    }

    function InOut$8(v) {
        var reverse = false;
        if (v < 0.5) {
            v = 1 - (v * 2);
            reverse = true;
        }
        else {
            v = (v * 2) - 1;
        }
        if (v < 1 / 2.75) {
            v = 7.5625 * v * v;
        }
        else if (v < 2 / 2.75) {
            v = 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
        }
        else if (v < 2.5 / 2.75) {
            v = 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
        }
        else {
            v = 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
        }
        if (reverse) {
            return (1 - v) * 0.5;
        }
        else {
            return v * 0.5 + 0.5;
        }
    }

    function Out$8(v) {
        if (v < 1 / 2.75) {
            return 7.5625 * v * v;
        }
        else if (v < 2 / 2.75) {
            return 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
        }
        else if (v < 2.5 / 2.75) {
            return 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
        }
        else {
            return 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
        }
    }

    var index$Z = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$8,
        InOut: InOut$8,
        Out: Out$8
    });

    function In$7(v) {
        return 1 - Math.sqrt(1 - v * v);
    }

    function InOut$7(v) {
        if ((v *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - v * v) - 1);
        }
        else {
            return 0.5 * (Math.sqrt(1 - (v -= 2) * v) + 1);
        }
    }

    function Out$7(v) {
        return Math.sqrt(1 - (--v * v));
    }

    var index$Y = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$7,
        InOut: InOut$7,
        Out: Out$7
    });

    function In$6(v) {
        return v * v * v;
    }

    function InOut$6(v) {
        if ((v *= 2) < 1) {
            return 0.5 * v * v * v;
        }
        else {
            return 0.5 * ((v -= 2) * v * v + 2);
        }
    }

    function Out$6(v) {
        return --v * v * v + 1;
    }

    var index$X = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$6,
        InOut: InOut$6,
        Out: Out$6
    });

    function In$5(v, amplitude, period) {
        if (amplitude === void 0) { amplitude = 0.1; }
        if (period === void 0) { period = 0.1; }
        if (v === 0) {
            return 0;
        }
        else if (v === 1) {
            return 1;
        }
        else {
            var s = period / 4;
            if (amplitude < 1) {
                amplitude = 1;
            }
            else {
                s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
            }
            return -(amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
        }
    }

    function InOut$5(v, amplitude, period) {
        if (amplitude === void 0) { amplitude = 0.1; }
        if (period === void 0) { period = 0.1; }
        if (v === 0) {
            return 0;
        }
        else if (v === 1) {
            return 1;
        }
        else {
            var s = period / 4;
            if (amplitude < 1) {
                amplitude = 1;
            }
            else {
                s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
            }
            if ((v *= 2) < 1) {
                return -0.5 * (amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
            }
            else {
                return amplitude * Math.pow(2, -10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period) * 0.5 + 1;
            }
        }
    }

    function Out$5(v, amplitude, period) {
        if (amplitude === void 0) { amplitude = 0.1; }
        if (period === void 0) { period = 0.1; }
        if (v === 0) {
            return 0;
        }
        else if (v === 1) {
            return 1;
        }
        else {
            var s = period / 4;
            if (amplitude < 1) {
                amplitude = 1;
            }
            else {
                s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
            }
            return (amplitude * Math.pow(2, -10 * v) * Math.sin((v - s) * (2 * Math.PI) / period) + 1);
        }
    }

    var index$W = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$5,
        InOut: InOut$5,
        Out: Out$5
    });

    function In$4(v) {
        return Math.pow(2, 10 * (v - 1)) - 0.001;
    }

    function InOut$4(v) {
        if (v == 0) {
            return 0;
        }
        if (v == 1) {
            return 1;
        }
        if ((v *= 2) < 1) {
            return 0.5 * Math.pow(2, 10 * (v - 1));
        }
        else {
            return 0.5 * (2 - Math.pow(2, -10 * (v - 1)));
        }
    }

    function Out$4(v) {
        return 1 - Math.pow(2, -10 * v);
    }

    var index$V = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$4,
        InOut: InOut$4,
        Out: Out$4
    });

    function In$3(v) {
        return v * v;
    }

    function InOut$3(v) {
        if ((v *= 2) < 1) {
            return 0.5 * v * v;
        }
        else {
            return -0.5 * (--v * (v - 2) - 1);
        }
    }

    function Out$3(v) {
        return v * (2 - v);
    }

    var index$U = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$3,
        InOut: InOut$3,
        Out: Out$3
    });

    function In$2(v) {
        return v * v * v * v;
    }

    function InOut$2(v) {
        if ((v *= 2) < 1) {
            return 0.5 * v * v * v * v;
        }
        else {
            return -0.5 * ((v -= 2) * v * v * v - 2);
        }
    }

    function Out$2(v) {
        return -(--v * v * v * v - 1);
    }

    var index$T = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$2,
        InOut: InOut$2,
        Out: Out$2
    });

    function In$1(v) {
        return v * v * v * v * v;
    }

    function InOut$1(v) {
        if ((v *= 2) < 1) {
            return 0.5 * v * v * v * v * v;
        }
        else {
            return 0.5 * ((v -= 2) * v * v * v * v + 2);
        }
    }

    function Out$1(v) {
        return (v = v - 1) * v * v * v * v + 1;
    }

    var index$S = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In$1,
        InOut: InOut$1,
        Out: Out$1
    });

    function In(v) {
        if (v === 0) {
            return 0;
        }
        else if (v === 1) {
            return 1;
        }
        else {
            return 1 - Math.cos(v * Math.PI / 2);
        }
    }

    function InOut(v) {
        if (v === 0) {
            return 0;
        }
        else if (v === 1) {
            return 1;
        }
        else {
            return 0.5 * (1 - Math.cos(Math.PI * v));
        }
    }

    function Out(v) {
        if (v === 0) {
            return 0;
        }
        else if (v === 1) {
            return 1;
        }
        else {
            return Math.sin(v * Math.PI / 2);
        }
    }

    var index$R = /*#__PURE__*/Object.freeze({
        __proto__: null,
        In: In,
        InOut: InOut,
        Out: Out
    });

    function Linear$1(v) {
        return v;
    }

    var Linear$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Linear: Linear$1
    });

    function Stepped(v, steps) {
        if (steps === void 0) { steps = 1; }
        if (v <= 0) {
            return 0;
        }
        else if (v >= 1) {
            return 1;
        }
        else {
            return (((steps * v) | 0) + 1) * (1 / steps);
        }
    }

    var Stepped$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Stepped: Stepped
    });

    var EaseMap = new Map([
        ['power0', Linear$1],
        ['power1', Out$3],
        ['power2', Out$6],
        ['power3', Out$2],
        ['power4', Out$1],
        ['linear', Linear$1],
        ['quad', Out$3],
        ['cubic', Out$6],
        ['quart', Out$2],
        ['quint', Out$1],
        ['sine', Out],
        ['expo', Out$4],
        ['circ', Out$7],
        ['elastic', Out$5],
        ['back', Out$9],
        ['bounce', Out$8],
        ['stepped', Stepped],
        ['quad.in', In$3],
        ['cubic.in', In$6],
        ['quart.in', In$2],
        ['quint.in', In$1],
        ['sine.in', In],
        ['expo.in', In$4],
        ['circ.in', In$7],
        ['elastic.in', In$5],
        ['back.in', In$9],
        ['bounce.in', In$8],
        ['quad.out', Out$3],
        ['cubic.out', Out$6],
        ['quart.out', Out$2],
        ['quint.out', Out$1],
        ['sine.out', Out],
        ['expo.out', Out$4],
        ['circ.out', Out$7],
        ['elastic.out', Out$5],
        ['back.out', Out$9],
        ['bounce.out', Out$8],
        ['quad.inout', InOut$3],
        ['cubic.inout', InOut$6],
        ['quart.inout', InOut$2],
        ['quint.inout', InOut$1],
        ['sine.inout', InOut],
        ['expo.inout', InOut$4],
        ['circ.inout', InOut$7],
        ['elastic.inout', InOut$5],
        ['back.inout', InOut$9],
        ['bounce.inout', InOut$8]
    ]);
    function GetEase(name) {
        name = name.toLowerCase();
        name = name.replace('ease', '');
        if (EaseMap.has(name)) {
            return EaseMap.get(name);
        }
        else {
            return Linear$1;
        }
    }

    var GetEase$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetEase: GetEase
    });

    var index$Q = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Back: index$_,
        Bounce: index$Z,
        Circular: index$Y,
        Cubic: index$X,
        Elastic: index$W,
        Expo: index$V,
        GetEase: GetEase$1,
        Linear: Linear$2,
        Quadratic: index$U,
        Quartic: index$T,
        Quintic: index$S,
        Sine: index$R,
        Stepped: Stepped$1
    });

    function FuzzyCeil(value, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return Math.ceil(value - epsilon);
    }

    function FuzzyFloor(value, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return Math.floor(value + epsilon);
    }

    function FuzzyGreaterThan(a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return a > b - epsilon;
    }

    function FuzzyLessThan(a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return a < b + epsilon;
    }

    var index$P = /*#__PURE__*/Object.freeze({
        __proto__: null,
        FuzzyCeil: FuzzyCeil,
        FuzzyEqual: FuzzyEqual,
        FuzzyFloor: FuzzyFloor,
        FuzzyGreaterThan: FuzzyGreaterThan,
        FuzzyLessThan: FuzzyLessThan
    });

    function Factorial(value) {
        if (value === 0) {
            return 1;
        }
        var res = value;
        while (--value) {
            res *= value;
        }
        return res;
    }

    function Bernstein(n, i) {
        return Factorial(n) / Factorial(i) / Factorial(n - i);
    }

    function BezierInterpolation(v, k) {
        var b = 0;
        var n = v.length - 1;
        for (var i = 0; i <= n; i++) {
            b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Bernstein(n, i);
        }
        return b;
    }

    function CatmullRomInterpolation(v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor(f = m * (1 + k));
            }
            return CatmullRom(f - i, v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m]);
        }
        else {
            if (k < 0) {
                return v[0] - (CatmullRom(-f, v[0], v[0], v[1], v[1]) - v[0]);
            }
            if (k > 1) {
                return v[m] - (CatmullRom(f - m, v[m], v[m], v[m - 1], v[m - 1]) - v[m]);
            }
            return CatmullRom(f - i, v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2]);
        }
    }

    function P0$1(t, p) {
        var k = 1 - t;
        return k * k * k * p;
    }
    function P1$1(t, p) {
        var k = 1 - t;
        return 3 * k * k * t * p;
    }
    function P2$1(t, p) {
        return 3 * (1 - t) * t * t * p;
    }
    function P3(t, p) {
        return t * t * t * p;
    }
    function CubicBezierInterpolation(t, p0, p1, p2, p3) {
        return P0$1(t, p0) + P1$1(t, p1) + P2$1(t, p2) + P3(t, p3);
    }

    function Linear(p0, p1, t) {
        return (p1 - p0) * t + p0;
    }

    function LinearInterpolation(v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        if (k < 0) {
            return Linear(v[0], v[1], f);
        }
        else if (k > 1) {
            return Linear(v[m], v[m - 1], m - f);
        }
        else {
            return Linear(v[i], v[(i + 1 > m) ? m : i + 1], f - i);
        }
    }

    function P0(t, p) {
        var k = 1 - t;
        return k * k * p;
    }
    function P1(t, p) {
        return 2 * (1 - t) * t * p;
    }
    function P2(t, p) {
        return t * t * p;
    }
    function QuadraticBezierInterpolation(t, p0, p1, p2) {
        return P0(t, p0) + P1(t, p1) + P2(t, p2);
    }

    function SmoothStep(x, min, max) {
        if (x <= min) {
            return 0;
        }
        if (x >= max) {
            return 1;
        }
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    }

    function SmoothStepInterpolation(t, min, max) {
        return min + (max - min) * SmoothStep(t, 0, 1);
    }

    function SmootherStep(x, min, max) {
        x = Math.max(0, Math.min(1, (x - min) / (max - min)));
        return x * x * x * (x * (x * 6 - 15) + 10);
    }

    function SmootherStepInterpolation(t, min, max) {
        return min + (max - min) * SmootherStep(t, 0, 1);
    }

    var index$O = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BezierInterpolation: BezierInterpolation,
        CatmullRomInterpolation: CatmullRomInterpolation,
        CubicBezierInterpolation: CubicBezierInterpolation,
        LinearInterpolation: LinearInterpolation,
        QuadraticBezierInterpolation: QuadraticBezierInterpolation,
        SmoothStepInterpolation: SmoothStepInterpolation,
        SmootherStepInterpolation: SmootherStepInterpolation
    });

    function GetMat2dDeterminant(src) {
        var a = src.a, b = src.b, c = src.c, d = src.d;
        return (a * d) - (b * c);
    }

    function GetMat2dFrobenius(src) {
        return (Math.hypot(src.a, src.b, src.c, src.d, src.tx, src.ty, 1));
    }

    function Mat2dAdd(a, b, out) {
        if (out === void 0) { out = new Matrix2D(); }
        return out.set(a.a + b.a, a.b + b.b, a.c + b.c, a.d + b.d, a.tx + b.tx, a.ty + b.ty);
    }

    function Mat2dAppend(mat1, mat2, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a1 = mat1.a, b1 = mat1.b, c1 = mat1.c, d1 = mat1.d, tx1 = mat1.tx, ty1 = mat1.ty;
        var a2 = mat2.a, b2 = mat2.b, c2 = mat2.c, d2 = mat2.d, tx2 = mat2.tx, ty2 = mat2.ty;
        return out.set((a2 * a1) + (b2 * c1), (a2 * b1) + (b2 * d1), (c2 * a1) + (d2 * c1), (c2 * b1) + (d2 * d1), (tx2 * a1) + (ty2 * c1) + tx1, (tx2 * b1) + (ty2 * d1) + ty1);
    }

    function Mat2dClone(src) {
        return new Matrix2D(src.a, src.b, src.c, src.d, src.tx, src.ty);
    }

    function Mat2dCopyFrom(src, target) {
        var a = src.a, b = src.b, c = src.c, d = src.d, tx = src.tx, ty = src.ty;
        return target.set(a, b, c, d, tx, ty);
    }

    function Mat2dCopyToContext(src, context) {
        var a = src.a, b = src.b, c = src.c, d = src.d, tx = src.tx, ty = src.ty;
        context.transform(a, b, c, d, tx, ty);
        return context;
    }

    function Mat2dEquals(a, b) {
        return (a.a === b.a &&
            a.b === b.b &&
            a.c === b.c &&
            a.d === b.d &&
            a.tx === b.tx &&
            a.ty === b.ty);
    }

    function Mat2dRotate(target, angle, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a = target.a, b = target.b, c = target.c, d = target.d, tx = target.tx, ty = target.ty;
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        return out.set((a * cos) + (c * sin), (b * cos) + (d * sin), (a * -sin) + (c * cos), (b * -sin) + (d * cos), tx, ty);
    }

    function Mat2dFromRotation(angle) {
        var target = new Matrix2D();
        return Mat2dRotate(target, angle, target);
    }

    function Mat2dScale(target, scaleX, scaleY, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a = target.a, b = target.b, c = target.c, d = target.d, tx = target.tx, ty = target.ty;
        return out.set(a * scaleX, b * scaleX, c * scaleY, d * scaleY, tx, ty);
    }

    function Mat2dFromScaling(scaleX, scaleY) {
        if (scaleY === void 0) { scaleY = scaleX; }
        var target = new Matrix2D();
        return Mat2dScale(target, scaleX, scaleY, target);
    }

    function Mat2dTranslate(target, x, y, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a = target.a, b = target.b, c = target.c, d = target.d, tx = target.tx, ty = target.ty;
        out.tx = (a * x) + (c * y) + tx;
        out.ty = (b * x) + (d * y) + ty;
        return out;
    }

    function Mat2dFromTranslation(x, y) {
        var target = new Matrix2D();
        return Mat2dTranslate(target, x, y, target);
    }

    function Mat2dFuzzyEquals(a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.000001; }
        var a0 = a.a, b0 = a.b, c0 = a.c, d0 = a.d, tx0 = a.tx, ty0 = a.ty;
        var a1 = b.a, b1 = b.b, c1 = b.c, d1 = b.d, tx1 = b.tx, ty1 = b.ty;
        return (Math.abs(a0 - a1) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(a1)) &&
            Math.abs(b0 - b1) <= epsilon * Math.max(1, Math.abs(b0), Math.abs(b1)) &&
            Math.abs(c0 - c1) <= epsilon * Math.max(1, Math.abs(c0), Math.abs(c1)) &&
            Math.abs(d0 - d1) <= epsilon * Math.max(1, Math.abs(d0), Math.abs(d1)) &&
            Math.abs(tx0 - tx1) <= epsilon * Math.max(1, Math.abs(tx0), Math.abs(tx1)) &&
            Math.abs(ty0 - ty1) <= epsilon * Math.max(1, Math.abs(ty0), Math.abs(ty1)));
    }

    var Vec2 = (function () {
        function Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.set(x, y);
        }
        Vec2.prototype.set = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
            return this;
        };
        Vec2.prototype.toArray = function (dst, index) {
            if (dst === void 0) { dst = []; }
            if (index === void 0) { index = 0; }
            var _a = this, x = _a.x, y = _a.y;
            dst[index] = x;
            dst[index + 1] = y;
            return dst;
        };
        Vec2.prototype.fromArray = function (src, index) {
            if (index === void 0) { index = 0; }
            return this.set(src[index], src[index + 1]);
        };
        Vec2.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y;
            return "{ x=" + x + ", y=" + y + " }";
        };
        return Vec2;
    }());

    function Mat2dGlobalToLocal(mat, x, y, out) {
        if (out === void 0) { out = new Vec2(); }
        var a = mat.a, b = mat.b, c = mat.c, d = mat.d, tx = mat.tx, ty = mat.ty;
        var id = 1 / ((a * d) + (c * -b));
        return out.set((d * id * x) + (-c * id * y) + (((ty * c) - (tx * d)) * id), (a * id * y) + (-b * id * x) + (((-ty * a) + (tx * b)) * id));
    }

    function Mat2dITRS(target, x, y, angle, scaleX, scaleY) {
        if (angle === 0) {
            return target.set(1, 0, 0, 1, x, y);
        }
        else {
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            return target.set(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        }
    }

    function Mat2dITRSS(target, x, y, angle, scaleX, scaleY, skewX, skewY) {
        if (angle === void 0) { angle = 0; }
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        if (skewX === void 0) { skewX = 0; }
        if (skewY === void 0) { skewY = 0; }
        if (angle === 0) {
            return target.set(1, 0, 0, 1, x, y);
        }
        else {
            return target.set(Math.cos(angle + skewY) * scaleX, Math.sin(angle + skewY) * scaleX, -Math.sin(angle - skewX) * scaleY, Math.cos(angle - skewX) * scaleY, x, y);
        }
    }

    function Mat2dIdentity() {
        return new Matrix2D();
    }

    function Mat2dInvert(target, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a = target.a, b = target.b, c = target.c, d = target.d, tx = target.tx, ty = target.ty;
        var determinant = a * d - b * c;
        if (determinant) {
            determinant = 1 / determinant;
            out.set(d * determinant, -b * determinant, -c * determinant, a * determinant, (c * ty - d * tx) * determinant, (b * tx - a * ty) * determinant);
        }
        return out;
    }

    function Mat2dLocalToGlobal(mat, x, y, out) {
        if (out === void 0) { out = new Vec2(); }
        var a = mat.a, b = mat.b, c = mat.c, d = mat.d, tx = mat.tx, ty = mat.ty;
        return out.set((a * x) + (c * y) + tx, (b * x) + (d * y) + ty);
    }

    function Mat2dMultiply(target, src, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a0 = target.a, b0 = target.b, c0 = target.c, d0 = target.d, tx0 = target.tx, ty0 = target.ty;
        var a1 = src.a, b1 = src.b, c1 = src.c, d1 = src.d, tx1 = src.tx, ty1 = src.ty;
        return out.set(a0 * a1 + c0 * b1, b0 * a1 + d0 * b1, a0 * c1 + c0 * d1, b0 * c1 + d0 * d1, a0 * tx1 + c0 * ty1 + tx0, b0 * tx1 + d0 * ty1 + ty0);
    }

    function Mat2dMultiplyScalar(target, scalar, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a = target.a, b = target.b, c = target.c, d = target.d, tx = target.tx, ty = target.ty;
        return out.set(a * scalar, b * scalar, c * scalar, d * scalar, tx * scalar, ty * scalar);
    }

    function Mat2dMultiplyScalarAndAdd(target, src, scalar, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a = src.a, b = src.b, c = src.c, d = src.d, tx = src.tx, ty = src.ty;
        var ta = target.a, tb = target.b, tc = target.c, td = target.d, ttx = target.tx, tty = target.ty;
        return out.set(ta + (a * scalar), tb + (b * scalar), tc + (c * scalar), td + (d * scalar), ttx + (tx * scalar), tty + (ty * scalar));
    }

    function Mat2dSetToContext(src, context) {
        var a = src.a, b = src.b, c = src.c, d = src.d, tx = src.tx, ty = src.ty;
        context.setTransform(a, b, c, d, tx, ty);
        return context;
    }

    function Mat2dSkew(target, angleX, angleY, out) {
        if (out === void 0) { out = new Matrix2D(); }
        var a = target.a, b = target.b, c = target.c, d = target.d, tx = target.tx, ty = target.ty;
        return out.set(a, b + Math.tan(angleX), c + Math.tan(angleY), d, tx, ty);
    }

    function Mat2dSubtract(a, b, out) {
        if (out === void 0) { out = new Matrix2D(); }
        return out.set(a.a - b.a, a.b - b.b, a.c - b.c, a.d - b.d, a.tx - b.tx, a.ty - b.ty);
    }

    function Mat2dZero(target) {
        return target.set(0, 0, 0, 0, 0, 0);
    }

    var index$N = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetMat2dDeterminant: GetMat2dDeterminant,
        GetMat2dFrobenius: GetMat2dFrobenius,
        Mat2dAdd: Mat2dAdd,
        Mat2dAppend: Mat2dAppend,
        Mat2dClone: Mat2dClone,
        Mat2dCopyFrom: Mat2dCopyFrom,
        Mat2dCopyToContext: Mat2dCopyToContext,
        Mat2dEquals: Mat2dEquals,
        Mat2dFromRotation: Mat2dFromRotation,
        Mat2dFromScaling: Mat2dFromScaling,
        Mat2dFromTranslation: Mat2dFromTranslation,
        Mat2dFuzzyEquals: Mat2dFuzzyEquals,
        Mat2dGlobalToLocal: Mat2dGlobalToLocal,
        Mat2dIdentity: Mat2dIdentity,
        Mat2dInvert: Mat2dInvert,
        Mat2dITRS: Mat2dITRS,
        Mat2dITRSS: Mat2dITRSS,
        Mat2dLocalToGlobal: Mat2dLocalToGlobal,
        Mat2dMultiply: Mat2dMultiply,
        Mat2dMultiplyScalar: Mat2dMultiplyScalar,
        Mat2dMultiplyScalarAndAdd: Mat2dMultiplyScalarAndAdd,
        Mat2dRotate: Mat2dRotate,
        Mat2dScale: Mat2dScale,
        Mat2dSetToContext: Mat2dSetToContext,
        Mat2dSkew: Mat2dSkew,
        Mat2dSubtract: Mat2dSubtract,
        Mat2dTranslate: Mat2dTranslate,
        Mat2dZero: Mat2dZero,
        Matrix2D: Matrix2D
    });

    function GetPowerOfTwo(value) {
        var index = Math.log(value) / 0.6931471805599453;
        return (1 << Math.ceil(index));
    }

    function IsSizePowerOfTwo(width, height) {
        if (width < 1 || height < 1) {
            return false;
        }
        return ((width & (width - 1)) === 0) && ((height & (height - 1)) === 0);
    }

    function IsValuePowerOfTwo(value) {
        return (value > 0 && (value & (value - 1)) === 0);
    }

    var index$M = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetPowerOfTwo: GetPowerOfTwo,
        IsSizePowerOfTwo: IsSizePowerOfTwo,
        IsValuePowerOfTwo: IsValuePowerOfTwo
    });

    function SnapCeil(value, gap, start, divide) {
        if (start === void 0) { start = 0; }
        if (divide === void 0) { divide = false; }
        if (gap === 0) {
            return value;
        }
        value -= start;
        value = gap * Math.ceil(value / gap);
        return (divide) ? (start + value) / gap : start + value;
    }

    function SnapFloor(value, gap, start, divide) {
        if (start === void 0) { start = 0; }
        if (divide === void 0) { divide = false; }
        if (gap === 0) {
            return value;
        }
        value -= start;
        value = gap * Math.floor(value / gap);
        return (divide) ? (start + value) / gap : start + value;
    }

    function SnapTo(value, gap, start, divide) {
        if (start === void 0) { start = 0; }
        if (divide === void 0) { divide = false; }
        if (gap === 0) {
            return value;
        }
        value -= start;
        value = gap * Math.round(value / gap);
        return (divide) ? (start + value) / gap : start + value;
    }

    var index$L = /*#__PURE__*/Object.freeze({
        __proto__: null,
        SnapCeil: SnapCeil,
        SnapFloor: SnapFloor,
        SnapTo: SnapTo
    });

    function GetChebyshevDistance(a, b) {
        return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    }

    function GetVec2DistanceSquared(a, b) {
        var x = a.x - b.x;
        var y = a.y - b.y;
        return (x * x) + (y * y);
    }

    function GetVec2Distance(a, b) {
        return Math.sqrt(GetVec2DistanceSquared(a, b));
    }

    function Vec2Add(a, b, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x + b.x, a.y + b.y);
    }

    function Vec2Dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    function Vec2MultiplyByFloats(a, x, y, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x * x, a.y * y);
    }

    function Vec2Subtract(a, b, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x - b.x, a.y - b.y);
    }

    function GetDistanceFromSegment(p, a, b) {
        var d = GetVec2DistanceSquared(a, b);
        if (d === 0) {
            return GetVec2Distance(p, a);
        }
        var v = Vec2Subtract(b, a);
        Vec2Subtract(p, a, p);
        var t = Math.max(0, Math.min(1, Vec2Dot(p, v) / 12));
        var proj = Vec2Add(a, Vec2MultiplyByFloats(v, t, t, v));
        return GetVec2Distance(p, proj);
    }

    function GetVec2Angle(a, b) {
        return Math.atan2(b.y - a.y, b.x - a.x);
    }

    function GetVec2AngleY(a, b) {
        return Math.atan2(b.x - a.x, b.y - a.y);
    }

    function GetVec2DistancePower(a, b, pow) {
        if (pow === void 0) { pow = 2; }
        return Math.sqrt(Math.pow(b.x - a.x, pow) + Math.pow(b.y - a.y, pow));
    }

    function GetVec2Length(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    }

    function GetVec2LengthSquared(a) {
        return (a.x * a.x + a.y * a.y);
    }

    function GetVec2ManhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    function GetVec2ManhattanLength(a) {
        return Math.abs(a.x) + Math.abs(a.y);
    }

    function Vec2Abs(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(Math.abs(a.x), Math.abs(a.y));
    }

    function Vec2AddScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x + scalar, a.y + scalar);
    }

    function Vec2Bezier(a, b, c, d, t, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(Bezier(t, a.x, b.x, c.x, d.x), Bezier(t, a.y, b.y, c.y, d.y));
    }

    function Vec2CatmullRom(p1, p2, p3, p4, t, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(CatmullRom(t, p1.x, p2.x, p3.x, p4.x), CatmullRom(t, p1.y, p2.y, p3.y, p4.y));
    }

    function Vec2Ceil(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(Math.ceil(a.x), Math.ceil(a.y));
    }

    function Vec2Scale(a, scalar, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x * scalar, a.y * scalar);
    }

    function Vec2Center(a, b, out) {
        if (out === void 0) { out = new Vec2(); }
        Vec2Add(a, b, out);
        return Vec2Scale(out, 0.5, out);
    }

    function Vec2Clamp(a, min, max, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y));
    }

    function Vec2ClampScalar(a, min, max, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max));
    }

    function Vec2Clone(source) {
        return new Vec2(source.x, source.y);
    }

    function Vec2CopyFrom(source, dest) {
        return dest.set(source.x, source.y);
    }

    function Vec2Cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }

    function Vec2Divide(a, b, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x / b.x, a.y / b.y);
    }

    function Vec2DivideScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x / scalar, a.y / scalar);
    }

    function Vec2Equals(a, b) {
        return a.x === b.x && a.y === b.y;
    }

    function Vec2Floor(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(Math.floor(a.x), Math.floor(a.y));
    }

    function Vec2Fract(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x - Math.floor(a.x), a.y - Math.floor(a.y));
    }

    function Vec2FromGridIndex(index, width, height, out) {
        if (out === void 0) { out = new Vec2(); }
        var x = 0;
        var y = 0;
        var total = width * height;
        if (index > 0 && index <= total) {
            if (index > width - 1) {
                y = Math.floor(index / width);
                x = index - (y * width);
            }
            else {
                x = index;
            }
            out.set(x, y);
        }
        return out;
    }

    function Vec2FromTransform(x, y, positionX, positionY, rotation, scaleX, scaleY, out) {
        if (out === void 0) { out = new Vec2(); }
        var sin = Math.sin(rotation);
        var cos = Math.cos(rotation);
        var a = cos * scaleX;
        var b = sin * scaleX;
        var c = -sin * scaleY;
        var d = cos * scaleY;
        var id = 1 / ((a * d) + (c * -b));
        return out.set((d * id * x) + (-c * id * y) + (((positionY * c) - (positionX * d)) * id), (a * id * y) + (-b * id * x) + (((-positionY * a) + (positionX * b)) * id));
    }

    function Vec2FuzzyEquals(a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon);
    }

    function Vec2Hermite(a, b, c, d, t, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y));
    }

    function Vec2Inverse(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(1 / a.x, 1 / a.y);
    }

    function Vec2Lerp(a, b, t, out) {
        if (out === void 0) { out = new Vec2(); }
        var x = a.x;
        var y = a.y;
        return out.set(x + t * (b.x - x), y + t * (b.y - y));
    }

    function Vec2Max(a, b, out) {
        if (out === void 0) { out = new Vec2(); }
        var ax = a.x, ay = a.y;
        var bx = b.x, by = b.y;
        return out.set(Math.max(ax, bx), Math.max(ay, by));
    }

    function Vec2Min(a, b, out) {
        if (out === void 0) { out = new Vec2(); }
        var ax = a.x, ay = a.y;
        var bx = b.x, by = b.y;
        return out.set(Math.min(ax, bx), Math.min(ay, by));
    }

    function Vec2Multiply(a, b, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x * b.x, a.y * b.y);
    }

    function Vec2Negate(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(-a.x, -a.y);
    }

    function Vec2Normalize(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return Vec2DivideScalar(a, GetVec2Length(a) || 1, out);
    }

    function Vec2One() {
        return new Vec2(1, 1);
    }

    function Vec2PerpDot(a, b) {
        return (a.x * b.y) - (a.y * b.x);
    }

    function Vec2Random(a, scale, out) {
        if (scale === void 0) { scale = 1; }
        if (out === void 0) { out = new Vec2(); }
        var r = Math.random() * 2 * Math.PI;
        return out.set(Math.cos(r) * scale, Math.sin(r) * scale);
    }

    function Vec2Rotate(a, origin, angle, out) {
        if (out === void 0) { out = new Vec2(); }
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var x = a.x - origin.x;
        var y = a.y - origin.y;
        return out.set(x * c - y * s + origin.x, x * s + y * c + origin.y);
    }

    function Vec2Round(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(Math.round(a.x), Math.round(a.y));
    }

    function Vec2RoundToZero(a, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set((a.x < 0) ? Math.ceil(a.x) : Math.floor(a.x), (a.y < 0) ? Math.ceil(a.y) : Math.floor(a.y));
    }

    function Vec2ScaleAndAdd(a, b, scalar, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x + b.x * scalar, a.y + b.y * scalar);
    }

    function Vec2SetLength(a, length, out) {
        if (out === void 0) { out = new Vec2(); }
        Vec2Normalize(a, out);
        return Vec2Scale(out, length, out);
    }

    function Vec2SubtractScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(a.x - scalar, a.y - scalar);
    }

    function Vec2Transform(v, positionX, positionY, rotation, scaleX, scaleY, out) {
        if (out === void 0) { out = new Vec2(); }
        return Vec2FromTransform(v.x, v.y, positionX, positionY, rotation, scaleX, scaleY, out);
    }

    function Vec2TransformMat2d(v, m, out) {
        if (out === void 0) { out = new Vec2(); }
        var a = m.a, b = m.b, c = m.c, d = m.d, tx = m.tx, ty = m.ty;
        return out.set(a * v.x + c * v.y + tx, b * v.x + d * v.y + ty);
    }

    function Vec2TransformMat4(v, m, out) {
        if (out === void 0) { out = new Vec2(); }
        var data = m.data;
        return out.set(data[0] * v.x + data[4] * v.y + data[12], data[1] * v.x + data[5] * v.y + data[13]);
    }

    function Vec2Zero() {
        return new Vec2(0, 0);
    }

    var index$K = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetChebyshevDistance: GetChebyshevDistance,
        GetDistanceFromSegment: GetDistanceFromSegment,
        GetVec2ManhattanDistance: GetVec2ManhattanDistance,
        GetVec2ManhattanLength: GetVec2ManhattanLength,
        GetVec2Length: GetVec2Length,
        GetVec2LengthSquared: GetVec2LengthSquared,
        Vec2: Vec2,
        Vec2Abs: Vec2Abs,
        Vec2Add: Vec2Add,
        Vec2AddScalar: Vec2AddScalar,
        GetVec2Angle: GetVec2Angle,
        GetVec2AngleY: GetVec2AngleY,
        Vec2Bezier: Vec2Bezier,
        Vec2Callback: Vec2Callback,
        Vec2CatmullRom: Vec2CatmullRom,
        Vec2Ceil: Vec2Ceil,
        Vec2Center: Vec2Center,
        Vec2Clamp: Vec2Clamp,
        Vec2ClampScalar: Vec2ClampScalar,
        Vec2Clone: Vec2Clone,
        Vec2CopyFrom: Vec2CopyFrom,
        Vec2Cross: Vec2Cross,
        GetVec2Distance: GetVec2Distance,
        GetVec2DistancePower: GetVec2DistancePower,
        GetVec2DistanceSquared: GetVec2DistanceSquared,
        Vec2Divide: Vec2Divide,
        Vec2DivideScalar: Vec2DivideScalar,
        Vec2Dot: Vec2Dot,
        Vec2Equals: Vec2Equals,
        Vec2Floor: Vec2Floor,
        Vec2Fract: Vec2Fract,
        Vec2FromGridIndex: Vec2FromGridIndex,
        Vec2FromTransform: Vec2FromTransform,
        Vec2FuzzyEquals: Vec2FuzzyEquals,
        Vec2Hermite: Vec2Hermite,
        Vec2Inverse: Vec2Inverse,
        Vec2Lerp: Vec2Lerp,
        Vec2Max: Vec2Max,
        Vec2Min: Vec2Min,
        Vec2Multiply: Vec2Multiply,
        Vec2MultiplyByFloats: Vec2MultiplyByFloats,
        Vec2Negate: Vec2Negate,
        Vec2Normalize: Vec2Normalize,
        Vec2One: Vec2One,
        Vec2PerpDot: Vec2PerpDot,
        Vec2Random: Vec2Random,
        Vec2Rotate: Vec2Rotate,
        Vec2Round: Vec2Round,
        Vec2RoundToZero: Vec2RoundToZero,
        Vec2Scale: Vec2Scale,
        Vec2ScaleAndAdd: Vec2ScaleAndAdd,
        Vec2SetLength: Vec2SetLength,
        Vec2Subtract: Vec2Subtract,
        Vec2SubtractScalar: Vec2SubtractScalar,
        Vec2Transform: Vec2Transform,
        Vec2TransformMat2d: Vec2TransformMat2d,
        Vec2TransformMat4: Vec2TransformMat4,
        Vec2Zero: Vec2Zero
    });

    function GetVec4DistanceSquared(a, b) {
        var x = a.x - b.x;
        var y = a.y - b.y;
        var z = a.z - b.z;
        var w = a.w - b.w;
        return (x * x) + (y * y) + (z * z) + (w * w);
    }

    function GetVec4Distance(a, b) {
        return Math.sqrt(GetVec4DistanceSquared(a, b));
    }

    function GetVec4Length(a) {
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    function GetVec4LengthSquared(a) {
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return x * x + y * y + z * z + w * w;
    }

    function GetVec4ManhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w);
    }

    function GetVec4ManhattanLength(a) {
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return Math.abs(x) + Math.abs(y) + Math.abs(z) + Math.abs(w);
    }

    var Vec4Callback = (function () {
        function Vec4Callback(onChange, x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 0; }
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
            this.onChange = onChange;
        }
        Vec4Callback.prototype.destroy = function () {
            this.onChange = NOOP$1;
        };
        Vec4Callback.prototype.set = function (x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 0; }
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
            if (this.onChange) {
                this.onChange(this);
            }
            return this;
        };
        Object.defineProperty(Vec4Callback.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                var prev = this._x;
                this._x = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec4Callback.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                var prev = this._y;
                this._y = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec4Callback.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                var prev = this._z;
                this._z = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vec4Callback.prototype, "w", {
            get: function () {
                return this._w;
            },
            set: function (value) {
                var prev = this._w;
                this._w = value;
                if (prev !== value) {
                    this.onChange(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Vec4Callback.prototype.toArray = function (dst, index) {
            if (dst === void 0) { dst = []; }
            if (index === void 0) { index = 0; }
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            dst[index] = x;
            dst[index + 1] = y;
            dst[index + 2] = z;
            dst[index + 3] = w;
            return dst;
        };
        Vec4Callback.prototype.fromArray = function (src, index) {
            if (index === void 0) { index = 0; }
            return this.set(src[index], src[index + 1], src[index + 2], src[index + 3]);
        };
        Vec4Callback.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            return "{ x=" + x + ", y=" + y + ", z=" + z + ", w=" + w + " }";
        };
        return Vec4Callback;
    }());

    var RGBACallback = (function (_super) {
        __extends(RGBACallback, _super);
        function RGBACallback(onChange, r, g, b, a) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            if (a === void 0) { a = 1; }
            return _super.call(this, onChange, r, g, b, a) || this;
        }
        Object.defineProperty(RGBACallback.prototype, "r", {
            get: function () {
                return this.x;
            },
            set: function (value) {
                this.x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RGBACallback.prototype, "g", {
            get: function () {
                return this.y;
            },
            set: function (value) {
                this.y = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RGBACallback.prototype, "b", {
            get: function () {
                return this.z;
            },
            set: function (value) {
                this.z = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RGBACallback.prototype, "a", {
            get: function () {
                return this.w;
            },
            set: function (value) {
                this.w = value;
            },
            enumerable: false,
            configurable: true
        });
        RGBACallback.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            return "[ r=" + x + ", g=" + y + ", b=" + z + ", a=" + w + " ]";
        };
        return RGBACallback;
    }(Vec4Callback));

    var Vec4 = (function () {
        function Vec4(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            this.set(x, y, z, w);
        }
        Vec4.prototype.set = function (x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
            return this;
        };
        Vec4.prototype.toArray = function (dst, index) {
            if (dst === void 0) { dst = []; }
            if (index === void 0) { index = 0; }
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            dst[index] = x;
            dst[index + 1] = y;
            dst[index + 2] = z;
            dst[index + 3] = w;
            return dst;
        };
        Vec4.prototype.fromArray = function (src, index) {
            if (index === void 0) { index = 0; }
            return this.set(src[index], src[index + 1], src[index + 2], src[index + 3]);
        };
        Vec4.prototype.toString = function () {
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            return "{ x=" + x + ", y=" + y + ", z=" + z + ", w=" + w + " }";
        };
        return Vec4;
    }());

    function Vec4Abs(a, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(Math.abs(a.x), Math.abs(a.y), Math.abs(a.z), Math.abs(a.w));
    }

    function Vec4Add(a, b, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }

    function Vec4AddScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(a.x + scalar, a.y + scalar, a.z + scalar, a.w + scalar);
    }

    function Vec4Bezier(a, b, c, d, t, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(Bezier(t, a.x, b.x, c.x, d.x), Bezier(t, a.y, b.y, c.y, d.y), Bezier(t, a.z, b.z, c.z, d.z), Bezier(t, a.w, b.w, c.w, d.w));
    }

    function Vec4CatmullRom(p1, p2, p3, p4, t, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(CatmullRom(t, p1.x, p2.x, p3.x, p4.x), CatmullRom(t, p1.y, p2.y, p3.y, p4.y), CatmullRom(t, p1.z, p2.z, p3.z, p4.z), CatmullRom(t, p1.w, p2.w, p3.w, p4.w));
    }

    function Vec4Ceil(a, out) {
        if (out === void 0) { out = new Vec4(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(Math.ceil(x), Math.ceil(y), Math.ceil(z), Math.ceil(w));
    }

    function Vec4Scale(a, scalar, out) {
        if (out === void 0) { out = new Vec4(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(x * scalar, y * scalar, z * scalar, w * scalar);
    }

    function Vec4Center(a, b, out) {
        if (out === void 0) { out = new Vec4(); }
        Vec4Add(a, b, out);
        return Vec4Scale(out, 0.5, out);
    }

    function Vec4Clamp(a, min, max, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y), Clamp(a.z, min.z, max.z), Clamp(a.w, min.w, max.w));
    }

    function Vec4DivideScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec4(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(x / scalar, y / scalar, z / scalar, w / scalar);
    }

    function Vec4ClampLength(a, min, max, out) {
        if (out === void 0) { out = new Vec4(); }
        var length = GetVec4Length(a);
        Vec4DivideScalar(a, length || 1, out);
        return Vec4Scale(out, Clamp(min, max, length), out);
    }

    function Vec4ClampScalar(a, min, max, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max), Clamp(a.z, min, max), Clamp(a.w, min, max));
    }

    function Vec4Clone(source) {
        var x = source.x, y = source.y, z = source.z, w = source.w;
        return new Vec4(x, y, z, w);
    }

    function Vec4CopyFrom(source, dest) {
        var x = source.x, y = source.y, z = source.z, w = source.w;
        return dest.set(x, y, z, w);
    }

    function Vec4Cross(u, v, w, out) {
        if (out === void 0) { out = new Vec4(); }
        var ux = u.x, uy = u.y, uz = u.z, uw = u.w;
        var vx = v.x, vy = v.y, vz = v.z, vw = v.w;
        var wx = w.x, wy = w.y, wz = w.z, ww = w.w;
        var A = vx * wy - vy * wx;
        var B = vx * wz - vz * wx;
        var C = vx * ww - vw * wx;
        var D = vy * wz - vz * wy;
        var E = vy * ww - vw * wy;
        var F = vz * ww - vw * wz;
        var G = ux;
        var H = uy;
        var I = uz;
        var J = uw;
        return out.set(H * F - I * E + J * D, -(G * F) + I * C - J * B, G * E - H * C + J * A, -(G * D) + H * B - I * A);
    }

    function Vec4Divide(a, b, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
    }

    function Vec4Dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }

    function Vec4Equals(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
    }

    function Vec4Floor(a, out) {
        if (out === void 0) { out = new Vec4(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(Math.floor(x), Math.floor(y), Math.floor(z), Math.floor(w));
    }

    function Vec4Fract(a, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(a.x - Math.floor(a.x), a.y - Math.floor(a.y), a.z - Math.floor(a.z), a.w - Math.floor(a.w));
    }

    function Vec4FuzzyEquals(a, b, epsilon) {
        if (epsilon === void 0) { epsilon = 0.0001; }
        return (FuzzyEqual(a.x, b.x, epsilon) &&
            FuzzyEqual(a.y, b.y, epsilon) &&
            FuzzyEqual(a.z, b.z, epsilon) &&
            FuzzyEqual(a.w, b.w, epsilon));
    }

    function Vec4Hermite(a, b, c, d, t, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y), Hermite(t, a.z, b.z, c.z, d.z), Hermite(t, a.w, b.w, c.w, d.w));
    }

    function Vec4Lerp(a, b, t, out) {
        if (out === void 0) { out = new Vec4(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(x + t * (b.x - x), y + t * (b.y - y), z + t * (b.z - z), w + t * (b.w - w));
    }

    function Vec4Max(a, b, out) {
        if (out === void 0) { out = new Vec4(); }
        var ax = a.x, ay = a.y, az = a.z, aw = a.w;
        var bx = b.x, by = b.y, bz = b.z, bw = b.w;
        return out.set(Math.max(ax, bx), Math.max(ay, by), Math.max(az, bz), Math.max(aw, bw));
    }

    function Vec4Min(a, b, out) {
        if (out === void 0) { out = new Vec4(); }
        var ax = a.x, ay = a.y, az = a.z, aw = a.w;
        var bx = b.x, by = b.y, bz = b.z, bw = b.w;
        return out.set(Math.min(ax, bx), Math.min(ay, by), Math.min(az, bz), Math.min(aw, bw));
    }

    function Vec4Multiply(a, b, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
    }

    function Vec4MultiplyByFloats(a, x, y, z, w, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(a.x * x, a.y * y, a.z * z, a.w * w);
    }

    function Vec4Negate(a, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(-a.x, -a.y, -a.z, -a.w);
    }

    function Vec4Normalize(a, out) {
        if (out === void 0) { out = new Vec4(); }
        return Vec4DivideScalar(a, GetVec4Length(a) || 1, out);
    }

    function Vec4One() {
        return new Vec4(1, 1, 1, 1);
    }

    function Vec4Random(a, scale, out) {
        if (scale === void 0) { scale = 1; }
        if (out === void 0) { out = new Vec4(); }
        var v1;
        var v2;
        var v3;
        var v4;
        var s1;
        var s2;
        do {
            v1 = Math.random() * 2 - 1;
            v2 = Math.random() * 2 - 1;
            s1 = v1 * v1 + v2 * v2;
        } while (s1 >= 1);
        do {
            v3 = Math.random() * 2 - 1;
            v4 = Math.random() * 2 - 1;
            s2 = v3 * v3 + v4 * v4;
        } while (s2 >= 1);
        var d = Math.sqrt((1 - s1) / s2);
        return out.set(scale * v1, scale * v2, scale * v3 * d, scale * v4 * d);
    }

    function Vec4Round(a, out) {
        if (out === void 0) { out = new Vec4(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(Math.round(x), Math.round(y), Math.round(z), Math.round(w));
    }

    function Vec4RoundToZero(a, out) {
        if (out === void 0) { out = new Vec4(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set((x < 0) ? Math.ceil(x) : Math.floor(x), (y < 0) ? Math.ceil(y) : Math.floor(y), (z < 0) ? Math.ceil(z) : Math.floor(z), (w < 0) ? Math.ceil(w) : Math.floor(w));
    }

    function Vec4ScaleAndAdd(a, b, scalar, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(a.x + b.x * scalar, a.y + b.y * scalar, a.z + b.z * scalar, a.w + b.w * scalar);
    }

    function Vec4SetLength(a, length, out) {
        if (out === void 0) { out = new Vec4(); }
        Vec4Normalize(a, out);
        return Vec4Scale(out, length, out);
    }

    function Vec4Subtract(a, b, out) {
        if (out === void 0) { out = new Vec4(); }
        return out.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    function Vec4SubtractScalar(a, scalar, out) {
        if (out === void 0) { out = new Vec4(); }
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(x - scalar, y - scalar, z - scalar, w - scalar);
    }

    function Vec4TransformMat4(a, m, out) {
        if (out === void 0) { out = new Vec4(); }
        var _a = __read(m.data, 16), m00 = _a[0], m01 = _a[1], m02 = _a[2], m03 = _a[3], m10 = _a[4], m11 = _a[5], m12 = _a[6], m13 = _a[7], m20 = _a[8], m21 = _a[9], m22 = _a[10], m23 = _a[11], m30 = _a[12], m31 = _a[13], m32 = _a[14], m33 = _a[15];
        var x = a.x, y = a.y, z = a.z, w = a.w;
        return out.set(m00 * x + m10 * y + m20 * z + m30 * w, m01 * x + m11 * y + m21 * z + m31 * w, m02 * x + m12 * y + m22 * z + m32 * w, m03 * x + m13 * y + m23 * z + m33 * w);
    }

    function Vec4Zero() {
        return new Vec4(0, 0, 0, 0);
    }

    var index$J = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetVec4Distance: GetVec4Distance,
        GetVec4DistanceSquared: GetVec4DistanceSquared,
        GetVec4Length: GetVec4Length,
        GetVec4LengthSquared: GetVec4LengthSquared,
        GetVec4ManhattanDistance: GetVec4ManhattanDistance,
        GetVec4ManhattanLength: GetVec4ManhattanLength,
        RGBACallback: RGBACallback,
        Vec4: Vec4,
        Vec4Abs: Vec4Abs,
        Vec4Add: Vec4Add,
        Vec4AddScalar: Vec4AddScalar,
        Vec4Bezier: Vec4Bezier,
        Vec4Callback: Vec4Callback,
        Vec4CatmullRom: Vec4CatmullRom,
        Vec4Ceil: Vec4Ceil,
        Vec4Center: Vec4Center,
        Vec4Clamp: Vec4Clamp,
        Vec4ClampLength: Vec4ClampLength,
        Vec4ClampScalar: Vec4ClampScalar,
        Vec4Clone: Vec4Clone,
        Vec4CopyFrom: Vec4CopyFrom,
        Vec4Cross: Vec4Cross,
        Vec4Divide: Vec4Divide,
        Vec4DivideScalar: Vec4DivideScalar,
        Vec4Dot: Vec4Dot,
        Vec4Equals: Vec4Equals,
        Vec4Floor: Vec4Floor,
        Vec4Fract: Vec4Fract,
        Vec4FuzzyEquals: Vec4FuzzyEquals,
        Vec4Hermite: Vec4Hermite,
        Vec4Lerp: Vec4Lerp,
        Vec4Max: Vec4Max,
        Vec4Min: Vec4Min,
        Vec4Multiply: Vec4Multiply,
        Vec4MultiplyByFloats: Vec4MultiplyByFloats,
        Vec4Negate: Vec4Negate,
        Vec4Normalize: Vec4Normalize,
        Vec4One: Vec4One,
        Vec4Random: Vec4Random,
        Vec4Round: Vec4Round,
        Vec4RoundToZero: Vec4RoundToZero,
        Vec4Scale: Vec4Scale,
        Vec4ScaleAndAdd: Vec4ScaleAndAdd,
        Vec4SetLength: Vec4SetLength,
        Vec4Subtract: Vec4Subtract,
        Vec4SubtractScalar: Vec4SubtractScalar,
        Vec4TransformMat4: Vec4TransformMat4,
        Vec4Zero: Vec4Zero
    });

    function Average(values) {
        var sum = 0;
        for (var i = 0; i < values.length; i++) {
            sum += (+values[i]);
        }
        return sum / values.length;
    }

    function Between(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function CeilTo(value, place, base) {
        if (place === void 0) { place = 0; }
        if (base === void 0) { base = 10; }
        var p = Math.pow(base, -place);
        return Math.ceil(value * p) / p;
    }

    function DegToRad(degrees) {
        return degrees * MATH_CONST.DEG_TO_RAD;
    }

    function Difference(a, b) {
        return Math.abs(a - b);
    }

    function FloatBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    function FloorTo(value, place, base) {
        if (place === void 0) { place = 0; }
        if (base === void 0) { base = 10; }
        var p = Math.pow(base, -place);
        return Math.floor(value * p) / p;
    }

    function FromPercent(percent, min, max) {
        percent = Clamp(percent, 0, 1);
        return (max - min) * percent;
    }

    function GetSpeed(distance, time) {
        return (distance / time) / 1000;
    }

    function MaxAdd(value, amount, max) {
        return Math.min(value + amount, max);
    }

    function MinSub(value, amount, min) {
        return Math.max(value - amount, min);
    }

    function Percent(value, min, max, upperMax) {
        if (max === undefined) {
            max = min + 1;
        }
        var percentage = (value - min) / (max - min);
        if (percentage > 1) {
            if (upperMax !== undefined) {
                percentage = ((upperMax - value)) / (upperMax - max);
                if (percentage < 0) {
                    percentage = 0;
                }
            }
            else {
                percentage = 1;
            }
        }
        else if (percentage < 0) {
            percentage = 0;
        }
        return percentage;
    }

    function RadToDeg(radians) {
        return radians * MATH_CONST.RAD_TO_DEG;
    }

    function RoundTo(value, place, base) {
        if (place === void 0) { place = 0; }
        if (base === void 0) { base = 10; }
        var p = Math.pow(base, -place);
        return Math.round(value * p) / p;
    }

    function SinCosTableGenerator(length, sinAmp, cosAmp, frequency) {
        if (sinAmp === void 0) { sinAmp = 1; }
        if (cosAmp === void 0) { cosAmp = 1; }
        if (frequency === void 0) { frequency = 1; }
        frequency *= Math.PI / length;
        var cos = [];
        var sin = [];
        for (var c = 0; c < length; c++) {
            cosAmp -= sinAmp * frequency;
            sinAmp += cosAmp * frequency;
            cos[c] = cosAmp;
            sin[c] = sinAmp;
        }
        return {
            sin: sin,
            cos: cos,
            length: length
        };
    }

    function Within(a, b, tolerance) {
        return (Math.abs(a - b) <= tolerance);
    }

    var index$I = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Angle: index$12,
        Easing: index$Q,
        Average: Average,
        Bernstein: Bernstein,
        Between: Between,
        Bezier: Bezier,
        CatmullRom: CatmullRom,
        CeilTo: CeilTo,
        Clamp: Clamp,
        DegToRad: DegToRad,
        Difference: Difference,
        Factorial: Factorial,
        FloatBetween: FloatBetween,
        FloorTo: FloorTo,
        FromPercent: FromPercent,
        Fuzzy: index$P,
        GetSpeed: GetSpeed,
        Hermite: Hermite,
        Interpolation: index$O,
        Linear: Linear,
        MATH_CONST: MATH_CONST,
        Matrix2D: index$N,
        Matrix4: index$13,
        MaxAdd: MaxAdd,
        MinSub: MinSub,
        Percent: Percent,
        Pow2: index$M,
        Quaternion: index$$,
        RadToDeg: RadToDeg,
        RoundAwayFromZero: RoundAwayFromZero,
        RoundTo: RoundTo,
        SinCosTableGenerator: SinCosTableGenerator,
        SmootherStep: SmootherStep,
        SmoothStep: SmoothStep,
        Snap: index$L,
        Vec2: index$K,
        Vec3: index$10,
        Vec4: index$J,
        Within: Within,
        Wrap: Wrap
    });

    var Camera3D = (function () {
        function Camera3D(x, y, z, fov, near, far) {
            var _this = this;
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (fov === void 0) { fov = 45; }
            if (near === void 0) { near = 0.1; }
            if (far === void 0) { far = 1000; }
            this.dirtyRender = true;
            this.type = 'Camera3D';
            var game = GameInstance.get();
            this.renderer = game.renderer;
            this.position = new Vec3Callback(function () { return _this.update(); }, x, y, z);
            this.direction = new Vec3Callback(function () { return _this.update(); }, 0, 1, 0);
            this._lookAtPosition = new Vec3();
            this._lookAtView = new Matrix4();
            this._axis = new Quaternion();
            this.up = Vec3Up();
            this.left = Vec3Left();
            this._fov = fov;
            this._near = near;
            this._far = far;
            this.aspectRatio = this.renderer.width / this.renderer.height;
            this.viewMatrix = new Matrix4();
            this.projectionMatrix = Mat4Perspective(DegToRad(fov), this.aspectRatio, near, far);
            this.lookAt(new Vec3());
        }
        Camera3D.prototype.updateProjectionMatrix = function () {
            Mat4Perspective(DegToRad(this._fov), this.aspectRatio, this._near, this._far, this.projectionMatrix);
            return this;
        };
        Camera3D.prototype.lookAt = function (point) {
            var pos = this.position;
            var dir = this.direction;
            var left = this.left;
            Vec3Subtract(point, pos, dir);
            Vec3Normalize(dir, dir);
            Vec3CrossNormalize(UP, dir, left);
            Vec3CrossNormalize(dir, left, this.up);
            return this.update();
        };
        Camera3D.prototype.rotateOnAxis = function (axisVec, angle) {
            var dir = this.direction;
            var left = this.left;
            var up = this.up;
            var q = QuatSetAxisAngle(axisVec, angle, this._axis);
            Vec3TransformQuat(dir, q, dir);
            Vec3TransformQuat(left, q, left);
            Vec3TransformQuat(up, q, up);
            Vec3Normalize(up, up);
            Vec3Normalize(left, left);
            Vec3Normalize(dir, dir);
            return this.update();
        };
        Camera3D.prototype.yaw = function (angle) {
            return this.rotateOnAxis(this.up, angle);
        };
        Camera3D.prototype.pitch = function (angle) {
            return this.rotateOnAxis(this.left, angle);
        };
        Camera3D.prototype.roll = function (angle) {
            return this.rotateOnAxis(this.direction, angle);
        };
        Camera3D.prototype.forward = function (s) {
            var pos = this.position;
            var px = pos.x, py = pos.y, pz = pos.z;
            var _a = this.direction, dx = _a.x, dy = _a.y, dz = _a.z;
            pos.set(px - s * dx, py - s * dy, pz - s * dz);
            return this.update();
        };
        Camera3D.prototype.update = function () {
            var lookPosition = this._lookAtPosition;
            var lookView = this._lookAtView;
            var pos = this.position;
            Vec3Add(pos, this.direction, lookPosition);
            Mat4LookAt(pos, lookPosition, this.up, lookView);
            Mat4TranslateFromFloats(lookView, -pos.x, -pos.y, -pos.z, this.viewMatrix);
            return this;
        };
        Camera3D.prototype.reset = function () {
        };
        Camera3D.prototype.destroy = function () {
            this.position.destroy();
            this.direction.destroy();
            this.up = null;
            this.left = null;
            this.viewMatrix = null;
            this.projectionMatrix = null;
            this._lookAtPosition = null;
            this._lookAtView = null;
            this._axis = null;
        };
        Object.defineProperty(Camera3D.prototype, "fov", {
            get: function () {
                return this._fov;
            },
            set: function (value) {
                if (value > 0 && value < 180) {
                    this._fov = value;
                    this.updateProjectionMatrix();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "near", {
            get: function () {
                return this._near;
            },
            set: function (value) {
                if (value > 0) {
                    this._near = value;
                    this.updateProjectionMatrix();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "far", {
            get: function () {
                return this._far;
            },
            set: function (value) {
                if (value > 0) {
                    this._far = value;
                    this.updateProjectionMatrix();
                }
            },
            enumerable: false,
            configurable: true
        });
        return Camera3D;
    }());

    var index$H = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Camera3D: Camera3D
    });

    var CONFIG_DEFAULTS = {
        BACKGROUND_COLOR: 'BackgroundColor',
        BATCH_SIZE: 'BatchSize',
        DEFAULT_ORIGIN: 'DefaultOrigin',
        MAX_TEXTURES: 'MaxTextures',
        PARENT: 'Parent',
        SIZE: 'Size',
        SCENES: 'Scenes',
        RENDERER: 'Renderer',
        AUTO: 'Auto',
        WEBGL: 'WebGL',
        CANVAS: 'Canvas',
        WEBGL_CONTEXT: 'WebGLContext',
        CANVAS_CONTEXT: 'CanvasContext',
        BANNER: 'Banner',
    };

    var ConfigStore = new Map();

    function SetBackgroundColor(color) {
        ConfigStore.set(CONFIG_DEFAULTS.BACKGROUND_COLOR, color);
    }

    function BackgroundColor(color) {
        return function () {
            SetBackgroundColor(color);
        };
    }

    function SetBanner(title, version, url, color, background) {
        if (title === void 0) { title = ''; }
        if (version === void 0) { version = ''; }
        if (url === void 0) { url = ''; }
        if (color === void 0) { color = '#fff'; }
        if (background === void 0) { background = 'linear-gradient(#3e0081 40%, #00bcc3)'; }
        ConfigStore.set(CONFIG_DEFAULTS.BANNER, { title: title, version: version, url: url, color: color, background: background });
    }

    function Banner(title, version, url, color, background) {
        return function () {
            SetBanner(title, version, url, color, background);
        };
    }

    function SetBatchSize(size) {
        ConfigStore.set(CONFIG_DEFAULTS.BATCH_SIZE, size);
    }

    function BatchSize(size) {
        return function () {
            SetBatchSize(size);
        };
    }

    function GetHeight() {
        return ConfigStore.get(CONFIG_DEFAULTS.SIZE).height;
    }

    function GetResolution() {
        return ConfigStore.get(CONFIG_DEFAULTS.SIZE).resolution;
    }

    function GetWidth() {
        return ConfigStore.get(CONFIG_DEFAULTS.SIZE).width;
    }

    function SetSize$1(width, height, resolution) {
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 600; }
        if (resolution === void 0) { resolution = 1; }
        if (resolution === 0) {
            resolution = window.devicePixelRatio;
        }
        ConfigStore.set(CONFIG_DEFAULTS.SIZE, { width: width, height: height, resolution: resolution });
    }

    function Size(width, height, resolution) {
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 600; }
        if (resolution === void 0) { resolution = 1; }
        return function () {
            SetSize$1(width, height, resolution);
        };
    }

    var queue = [];
    var BindingQueue = {
        add: function (texture, glConfig) {
            queue.push({ texture: texture, glConfig: glConfig });
        },
        get: function () {
            return queue;
        },
        clear: function () {
            queue.length = 0;
        }
    };

    function GetBackgroundColor() {
        return ConfigStore.get(CONFIG_DEFAULTS.BACKGROUND_COLOR);
    }

    function GetCanvasContext() {
        return ConfigStore.get(CONFIG_DEFAULTS.CANVAS_CONTEXT);
    }

    var CanvasRenderer = (function () {
        function CanvasRenderer() {
            this.clearBeforeRender = true;
            this.optimizeRedraw = true;
            this.autoResize = true;
            this.width = GetWidth();
            this.height = GetHeight();
            this.resolution = GetResolution();
            this.setBackgroundColor(GetBackgroundColor());
            var canvas = document.createElement('canvas');
            this.canvas = canvas;
            this.initContext();
        }
        CanvasRenderer.prototype.initContext = function () {
            var ctx = this.canvas.getContext('2d', GetCanvasContext());
            this.ctx = ctx;
            this.resize(this.width, this.height, this.resolution);
        };
        CanvasRenderer.prototype.resize = function (width, height, resolution) {
            if (resolution === void 0) { resolution = 1; }
            this.width = width * resolution;
            this.height = height * resolution;
            this.resolution = resolution;
            var canvas = this.canvas;
            canvas.width = this.width;
            canvas.height = this.height;
            if (this.autoResize) {
                canvas.style.width = (this.width / resolution).toString() + 'px';
                canvas.style.height = (this.height / resolution).toString() + 'px';
            }
        };
        CanvasRenderer.prototype.setBackgroundColor = function (color) {
            var r = color >> 16 & 0xFF;
            var g = color >> 8 & 0xFF;
            var b = color & 0xFF;
            var a = (color > 16777215) ? color >>> 24 : 255;
            this.clearColor = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
            return this;
        };
        CanvasRenderer.prototype.reset = function () {
            var ctx = this.ctx;
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        };
        CanvasRenderer.prototype.render = function (renderData) {
            BindingQueue.clear();
            var ctx = this.ctx;
            if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0) {
                return;
            }
            this.reset();
            if (this.clearBeforeRender) {
                ctx.clearRect(0, 0, this.width, this.height);
                ctx.fillStyle = this.clearColor;
                ctx.fillRect(0, 0, this.width, this.height);
            }
        };
        CanvasRenderer.prototype.destroy = function () {
        };
        return CanvasRenderer;
    }());

    function SetRenderer(renderer) {
        ConfigStore.set(CONFIG_DEFAULTS.RENDERER, renderer);
    }

    function Canvas() {
        return function () {
            SetRenderer(CanvasRenderer);
        };
    }

    function SetCanvasContext(contextAttributes) {
        ConfigStore.set(CONFIG_DEFAULTS.CANVAS_CONTEXT, contextAttributes);
    }

    function CanvasContext(contextAttributes) {
        return function () {
            SetCanvasContext(contextAttributes);
        };
    }

    function SetDefaultOrigin(x, y) {
        if (x === void 0) { x = 0.5; }
        if (y === void 0) { y = x; }
        ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, { x: x, y: y });
    }

    function DefaultOrigin(x, y) {
        if (x === void 0) { x = 0.5; }
        if (y === void 0) { y = x; }
        return function () {
            SetDefaultOrigin(x, y);
        };
    }

    function SetMaxTextures(max) {
        ConfigStore.set(CONFIG_DEFAULTS.MAX_TEXTURES, max);
    }

    function MaxTextures(max) {
        if (max === void 0) { max = 0; }
        return function () {
            SetMaxTextures(max);
        };
    }

    function GetElement(target) {
        var element;
        if (target) {
            if (typeof target === 'string') {
                element = document.getElementById(target);
            }
            else if (typeof target === 'object' && target.nodeType === 1) {
                element = target;
            }
        }
        if (!element) {
            element = document.body;
        }
        return element;
    }

    function SetParent$1(parentElement) {
        if (parentElement) {
            ConfigStore.set(CONFIG_DEFAULTS.PARENT, GetElement(parentElement));
        }
    }

    function Parent(parentElement) {
        return function () {
            SetParent$1(parentElement);
        };
    }

    function SetScenes(scenes) {
        ConfigStore.set(CONFIG_DEFAULTS.SCENES, [].concat(scenes));
    }

    function Scenes(scenes) {
        return function () {
            SetScenes(scenes);
        };
    }

    function AddViewport(renderPass, x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var viewport = new Rectangle$1(x, y, width, height);
        renderPass.viewportStack.push(viewport);
        return viewport;
    }

    var gl;
    var GL = {
        get: function () {
            return gl;
        },
        set: function (context) {
            gl = context;
        }
    };

    function BindViewport(renderPass, viewport) {
        if (!viewport) {
            viewport = renderPass.currentViewport;
            if (!viewport) {
                return;
            }
        }
        var glv = gl.getParameter(gl.VIEWPORT);
        if (glv[0] !== viewport.x || glv[1] !== viewport.y || glv[2] !== viewport.width || glv[3] !== viewport.height) {
            gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        }
    }

    function SetViewport(renderPass, x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var entry = AddViewport(renderPass, x, y, width, height);
        BindViewport(renderPass, entry);
        renderPass.currentViewport = entry;
    }

    function BindFramebuffer(renderPass, clear, entry) {
        if (clear === void 0) { clear = true; }
        if (!entry) {
            entry = renderPass.currentFramebuffer;
        }
        var framebuffer = entry.framebuffer, viewport = entry.viewport;
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        if (clear) {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        if (viewport) {
            SetViewport(renderPass, viewport.x, viewport.y, viewport.width, viewport.height);
        }
    }

    function PopViewport(renderPass) {
        var stack = renderPass.viewportStack;
        if (stack.length > 1) {
            stack.pop();
        }
        renderPass.currentViewport = stack[stack.length - 1];
        BindViewport(renderPass);
    }

    function PopFramebuffer(renderPass) {
        var stack = renderPass.framebufferStack;
        if (stack.length > 1) {
            if (renderPass.currentFramebuffer.viewport) {
                PopViewport(renderPass);
            }
            stack.pop();
        }
        renderPass.currentFramebuffer = stack[stack.length - 1];
        BindFramebuffer(renderPass, false);
    }

    function AddFramebuffer(renderPass, framebuffer, viewport) {
        var entry = { framebuffer: framebuffer, viewport: viewport };
        renderPass.framebufferStack.push(entry);
        return entry;
    }

    function SetFramebuffer(renderPass, framebuffer, clear, viewport) {
        if (clear === void 0) { clear = true; }
        var entry = AddFramebuffer(renderPass, framebuffer, viewport);
        BindFramebuffer(renderPass, clear, entry);
        renderPass.currentFramebuffer = entry;
    }

    function Draw(renderPass) {
        var count = renderPass.count;
        if (count === 0) {
            return;
        }
        var currentBuffer = renderPass.currentVertexBuffer;
        var currentShader = renderPass.currentShader;
        var renderToFramebuffer = currentShader.shader.renderToFramebuffer;
        if (renderToFramebuffer) {
            SetFramebuffer(renderPass, currentShader.shader.framebuffer, true);
        }
        if (count === currentBuffer.batchSize) {
            var type = (currentBuffer.isDynamic) ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
            gl.bufferData(gl.ARRAY_BUFFER, currentBuffer.data, type);
        }
        else {
            var subsize = (currentBuffer.indexed) ? count * currentBuffer.entryElementSize : count * currentBuffer.vertexElementSize;
            var view = currentBuffer.vertexViewF32.subarray(0, subsize);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
        }
        if (currentBuffer.indexed) {
            gl.drawElements(gl.TRIANGLES, count * currentBuffer.entryIndexSize, gl.UNSIGNED_SHORT, 0);
        }
        else {
            gl.drawArrays(gl.TRIANGLES, 0, count);
        }
        if (renderToFramebuffer) {
            PopFramebuffer(renderPass);
        }
    }

    function Flush(renderPass, forceCount) {
        if (forceCount) {
            renderPass.count = forceCount;
        }
        var count = renderPass.count;
        if (count === 0) {
            return false;
        }
        Draw(renderPass);
        renderPass.prevCount = count;
        renderPass.count = 0;
        renderPass.flushTotal++;
        return true;
    }

    function End(renderPass) {
        Flush(renderPass);
    }

    function GetRGBArray(color, output) {
        if (output === void 0) { output = []; }
        var r = color >> 16 & 0xFF;
        var g = color >> 8 & 0xFF;
        var b = color & 0xFF;
        var a = (color > 16777215) ? color >>> 24 : 255;
        output[0] = r / 255;
        output[1] = g / 255;
        output[2] = b / 255;
        output[3] = a / 255;
        return output;
    }

    function GetWebGLContext() {
        return ConfigStore.get(CONFIG_DEFAULTS.WEBGL_CONTEXT);
    }

    function CreateGLTexture(binding) {
        var parent = binding.parent, flipY = binding.flipY, unpackPremultiplyAlpha = binding.unpackPremultiplyAlpha, minFilter = binding.minFilter, magFilter = binding.magFilter, wrapS = binding.wrapS, wrapT = binding.wrapT, generateMipmap = binding.generateMipmap, isPOT = binding.isPOT;
        var source = parent.image;
        var width = parent.width;
        var height = parent.height;
        var glTexture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, glTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, unpackPremultiplyAlpha);
        if (source) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
            width = source.width;
            height = source.height;
        }
        else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
        if (generateMipmap && isPOT) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        binding.texture = glTexture;
        return glTexture;
    }

    function DeleteFramebuffer(framebuffer) {
        if (gl && gl.isFramebuffer(framebuffer)) {
            gl.deleteFramebuffer(framebuffer);
        }
    }

    function DeleteGLTexture(texture) {
        if (gl.isTexture(texture)) {
            gl.deleteTexture(texture);
        }
    }

    function SetGLTextureFilterMode(texture, linear) {
        if (linear === void 0) { linear = true; }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        var mode = (linear) ? gl.LINEAR : gl.NEAREST;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
    }

    function UpdateGLTexture(binding) {
        var source = binding.parent.image;
        var width = source.width;
        var height = source.height;
        if (width > 0 && height > 0) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, binding.texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, binding.flipY);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        }
        return binding.texture;
    }

    var GLTextureBinding = (function () {
        function GLTextureBinding(parent, config) {
            if (config === void 0) { config = {}; }
            this.index = 0;
            this.indexCounter = -1;
            this.dirtyIndex = true;
            this.unpackPremultiplyAlpha = true;
            this.flipY = false;
            this.isPOT = false;
            this.generateMipmap = false;
            this.parent = parent;
            this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);
            var _a = config.texture, texture = _a === void 0 ? null : _a, _b = config.framebuffer, framebuffer = _b === void 0 ? null : _b, _c = config.depthbuffer, depthbuffer = _c === void 0 ? null : _c, _d = config.unpackPremultiplyAlpha, unpackPremultiplyAlpha = _d === void 0 ? true : _d, _e = config.minFilter, minFilter = _e === void 0 ? (this.isPOT) ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR : _e, _f = config.magFilter, magFilter = _f === void 0 ? gl.LINEAR : _f, _g = config.wrapS, wrapS = _g === void 0 ? gl.CLAMP_TO_EDGE : _g, _h = config.wrapT, wrapT = _h === void 0 ? gl.CLAMP_TO_EDGE : _h, _j = config.generateMipmap, generateMipmap = _j === void 0 ? this.isPOT : _j, _k = config.flipY, flipY = _k === void 0 ? false : _k;
            this.minFilter = minFilter;
            this.magFilter = magFilter;
            this.wrapS = wrapS;
            this.wrapT = wrapT;
            this.generateMipmap = generateMipmap;
            this.flipY = flipY;
            this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;
            if (framebuffer) {
                this.framebuffer = framebuffer;
            }
            if (depthbuffer) {
                this.depthbuffer = depthbuffer;
            }
            if (texture) {
                this.texture = texture;
            }
            else {
                CreateGLTexture(this);
            }
        }
        GLTextureBinding.prototype.setFilter = function (linear) {
            if (this.texture) {
                SetGLTextureFilterMode(this.texture, linear);
            }
        };
        GLTextureBinding.prototype.create = function () {
            var texture = this.texture;
            if (texture) {
                DeleteGLTexture(texture);
            }
            return CreateGLTexture(this);
        };
        GLTextureBinding.prototype.update = function () {
            var texture = this.texture;
            if (!texture) {
                return CreateGLTexture(this);
            }
            else {
                return UpdateGLTexture(this);
            }
        };
        GLTextureBinding.prototype.setIndex = function (index) {
            this.dirtyIndex = (index !== this.index);
            this.index = index;
        };
        GLTextureBinding.prototype.destroy = function () {
            DeleteGLTexture(this.texture);
            DeleteFramebuffer(this.framebuffer);
            this.parent = null;
            this.texture = null;
            this.framebuffer = null;
        };
        return GLTextureBinding;
    }());

    function ProcessBindingQueue() {
        var queue = BindingQueue.get();
        queue.forEach(function (entry) {
            var texture = entry.texture, glConfig = entry.glConfig;
            if (!texture.binding) {
                texture.binding = new GLTextureBinding(texture, glConfig);
            }
        });
        BindingQueue.clear();
    }

    function GetMaxTextures() {
        return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
    }

    var fragTemplate = [
        'precision mediump float;',
        'void main(void){',
        'float test = 0.1;',
        '%forloop%',
        'gl_FragColor = vec4(0.0);',
        '}'
    ].join('\n');
    function GenerateSrc(maxIfs) {
        var src = '';
        for (var i = 0; i < maxIfs; ++i) {
            if (i > 0) {
                src += '\nelse ';
            }
            if (i < maxIfs - 1) {
                src += "if(test == " + i + ".0){}";
            }
        }
        return src;
    }
    function CheckShaderMaxIfStatements(maxIfs) {
        var shader = gl.createShader(gl.FRAGMENT_SHADER);
        while (true) {
            var fragmentSrc = fragTemplate.replace(/%forloop%/gi, GenerateSrc(maxIfs));
            gl.shaderSource(shader, fragmentSrc);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                maxIfs = (maxIfs / 2) | 0;
            }
            else {
                break;
            }
        }
        return maxIfs;
    }

    function CreateTempTextures(renderPass) {
        var maxGPUTextures = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
        var maxConfigTextures = GetMaxTextures();
        if (maxConfigTextures === 0 || (maxConfigTextures > 0 && maxConfigTextures > maxGPUTextures)) {
            SetMaxTextures(maxGPUTextures);
        }
        else if (maxConfigTextures > 0 && maxConfigTextures < maxGPUTextures) {
            maxGPUTextures = Math.max(8, maxConfigTextures);
        }
        var tempTextures = renderPass.tempTextures;
        if (tempTextures.length) {
            tempTextures.forEach(function (texture) {
                gl.deleteTexture(texture);
            });
        }
        var index = [];
        for (var texturesIndex = 0; texturesIndex < maxGPUTextures; texturesIndex++) {
            var tempTexture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0 + texturesIndex);
            gl.bindTexture(gl.TEXTURE_2D, tempTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
            tempTextures[texturesIndex] = tempTexture;
            index.push(texturesIndex);
        }
        renderPass.maxTextures = maxGPUTextures;
        renderPass.textureIndex = index;
        renderPass.currentActiveTexture = 1;
    }

    function GetBatchSize() {
        return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
    }

    function DeleteGLBuffer(buffer) {
        if (gl.isBuffer(buffer)) {
            gl.deleteBuffer(buffer);
        }
    }

    var VertexBuffer = (function () {
        function VertexBuffer(config) {
            if (config === void 0) { config = {}; }
            this.indexed = false;
            this.isDynamic = false;
            this.count = 0;
            this.offset = 0;
            var _a = config.batchSize, batchSize = _a === void 0 ? 1 : _a, _b = config.dataSize, dataSize = _b === void 0 ? 4 : _b, _c = config.isDynamic, isDynamic = _c === void 0 ? true : _c, _d = config.elementsPerEntry, elementsPerEntry = _d === void 0 ? 4 : _d, _e = config.vertexElementSize, vertexElementSize = _e === void 0 ? 6 : _e;
            this.batchSize = batchSize;
            this.dataSize = dataSize;
            this.vertexElementSize = vertexElementSize;
            this.isDynamic = isDynamic;
            this.elementsPerEntry = elementsPerEntry;
            this.vertexByteSize = vertexElementSize * dataSize;
            this.entryByteSize = this.vertexByteSize * elementsPerEntry;
            this.bufferByteSize = batchSize * this.entryByteSize;
            this.create();
        }
        VertexBuffer.prototype.resize = function (batchSize) {
            this.batchSize = batchSize;
            this.bufferByteSize = batchSize * this.entryByteSize;
            if (this.vertexBuffer) {
                DeleteGLBuffer(this.vertexBuffer);
            }
            this.create();
        };
        VertexBuffer.prototype.create = function () {
            var data = new ArrayBuffer(this.bufferByteSize);
            this.data = data;
            this.vertexViewF32 = new Float32Array(data);
            this.vertexViewU32 = new Uint32Array(data);
            this.vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            var type = (this.isDynamic) ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
            gl.bufferData(gl.ARRAY_BUFFER, data, type);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        };
        VertexBuffer.prototype.add = function (count) {
            this.count += count;
            this.offset += (this.vertexElementSize * count);
        };
        VertexBuffer.prototype.reset = function () {
            this.count = 0;
            this.offset = 0;
        };
        VertexBuffer.prototype.canContain = function (count) {
            return ((this.count + count) <= this.batchSize);
        };
        VertexBuffer.prototype.free = function () {
            return Math.max(0, 1 - (this.count / this.batchSize));
        };
        VertexBuffer.prototype.bind = function () {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        };
        VertexBuffer.prototype.destroy = function () {
            DeleteGLBuffer(this.vertexBuffer);
            this.data = null;
            this.vertexViewF32 = null;
            this.vertexViewU32 = null;
            this.vertexBuffer = null;
        };
        return VertexBuffer;
    }());

    var IndexedVertexBuffer = (function (_super) {
        __extends(IndexedVertexBuffer, _super);
        function IndexedVertexBuffer(config) {
            if (config === void 0) { config = {}; }
            var _this = _super.call(this, config) || this;
            var _a = config.indexSize, indexSize = _a === void 0 ? 4 : _a, _b = config.entryIndexSize, entryIndexSize = _b === void 0 ? 6 : _b, _c = config.indexLayout, indexLayout = _c === void 0 ? null : _c;
            _this.indexed = true;
            _this.indexSize = indexSize;
            _this.entryIndexSize = entryIndexSize;
            _this.entryElementSize = _this.vertexElementSize * _this.elementsPerEntry;
            var seededIndexBuffer = [];
            if (indexLayout) {
                _this.indexLayout = indexLayout;
                for (var i = 0; i < (_this.batchSize * indexSize); i += indexSize) {
                    for (var c = 0; c < indexLayout.length; c++) {
                        seededIndexBuffer.push(i + indexLayout[c]);
                    }
                }
            }
            _this.create();
            _this.createIndexBuffer(seededIndexBuffer);
            return _this;
        }
        IndexedVertexBuffer.prototype.createIndexBuffer = function (seededIndex) {
            this.index = new Uint16Array(seededIndex);
            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            seededIndex = [];
        };
        IndexedVertexBuffer.prototype.bind = function () {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        };
        IndexedVertexBuffer.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            DeleteGLBuffer(this.indexBuffer);
            this.index = null;
            this.indexLayout = null;
            this.indexBuffer = null;
        };
        return IndexedVertexBuffer;
    }(VertexBuffer));

    function CreateAttributes(program, config) {
        var attributes = new Map();
        var defaultSettings = {
            size: 1,
            type: gl.FLOAT,
            normalized: false,
            stride: 0,
            offset: 0
        };
        var total = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < total; i++) {
            var attrib = gl.getActiveAttrib(program, i);
            if (!attrib) {
                break;
            }
            var name_1 = attrib.name;
            var index = gl.getAttribLocation(program, name_1);
            gl.enableVertexAttribArray(index);
            var setting = config.hasOwnProperty(name_1) ? config[name_1] : {};
            var _a = setting.size, size = _a === void 0 ? defaultSettings.size : _a, _b = setting.type, type = _b === void 0 ? defaultSettings.type : _b, _c = setting.normalized, normalized = _c === void 0 ? defaultSettings.normalized : _c, _d = setting.stride, stride = _d === void 0 ? defaultSettings.stride : _d, _e = setting.offset, offset = _e === void 0 ? defaultSettings.offset : _e;
            attributes.set(name_1, { index: index, size: size, type: type, normalized: normalized, stride: stride, offset: offset });
        }
        return attributes;
    }

    function DeleteShaders() {
        var shaders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            shaders[_i] = arguments[_i];
        }
        shaders.forEach(function (shader) {
            gl.deleteShader(shader);
        });
    }

    function CreateProgram() {
        var shaders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            shaders[_i] = arguments[_i];
        }
        var program = gl.createProgram();
        shaders.forEach(function (shader) {
            gl.attachShader(program, shader);
        });
        gl.linkProgram(program);
        var status = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!status) {
            var info = gl.getProgramInfoLog(program);
            console.error("Error linking program: " + info);
            gl.deleteProgram(program);
            DeleteShaders.apply(void 0, __spreadArray([], __read(shaders)));
            return null;
        }
        return program;
    }

    function CreateShader(source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!status) {
            var info = gl.getShaderInfoLog(shader);
            var sourceLines = source.split('\n').map(function (line, index) {
                return index + ": " + line;
            });
            console.error("Error compiling shader: " + info, sourceLines.join('\n'));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function CreateUniformSetter(uniform, location, isArray) {
        if (isArray === void 0) { isArray = false; }
        switch (uniform.type) {
            case gl.INT:
            case gl.BOOL:
                {
                    if (isArray) {
                        return function (v) {
                            gl.uniform1iv(location, v);
                        };
                    }
                    else {
                        return function (v) {
                            gl.uniform1i(location, v);
                        };
                    }
                }
            case gl.INT_VEC2:
            case gl.BOOL_VEC2:
                {
                    return function (v) {
                        gl.uniform2iv(location, v);
                    };
                }
            case gl.INT_VEC3:
            case gl.BOOL_VEC3:
                {
                    return function (v) {
                        gl.uniform3iv(location, v);
                    };
                }
            case gl.INT_VEC4:
            case gl.BOOL_VEC4:
                {
                    return function (v) {
                        gl.uniform4iv(location, v);
                    };
                }
            case gl.FLOAT:
                {
                    if (isArray) {
                        return function (v) {
                            gl.uniform1fv(location, v);
                        };
                    }
                    else {
                        return function (v) {
                            gl.uniform1f(location, v);
                        };
                    }
                }
            case gl.FLOAT_VEC2:
                {
                    return function (v) {
                        gl.uniform2fv(location, v);
                    };
                }
            case gl.FLOAT_VEC3:
                {
                    return function (v) {
                        gl.uniform3fv(location, v);
                    };
                }
            case gl.FLOAT_VEC4:
                {
                    return function (v) {
                        gl.uniform4fv(location, v);
                    };
                }
            case gl.FLOAT_MAT2:
                {
                    return function (v) {
                        gl.uniformMatrix2fv(location, false, v);
                    };
                }
            case gl.FLOAT_MAT3:
                {
                    return function (v) {
                        gl.uniformMatrix3fv(location, false, v);
                    };
                }
            case gl.FLOAT_MAT4:
                {
                    return function (v) {
                        gl.uniformMatrix4fv(location, false, v);
                    };
                }
            case gl.SAMPLER_2D:
            case gl.SAMPLER_CUBE:
                {
                    if (uniform.size > 1) {
                        return function (v) {
                            gl.uniform1iv(location, v);
                        };
                    }
                    else {
                        return function (v) {
                            gl.uniform1i(location, v);
                        };
                    }
                }
        }
    }

    function CreateUniforms(program) {
        var uniforms = new Map();
        var total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < total; i++) {
            var uniform = gl.getActiveUniform(program, i);
            var name_1 = uniform.name;
            if (name_1.startsWith('gl_') || name_1.startsWith('webgl_')) {
                continue;
            }
            var location_1 = gl.getUniformLocation(program, uniform.name);
            if (location_1) {
                var isArray = false;
                if (name_1.substr(-3) === '[0]') {
                    name_1 = name_1.substr(0, name_1.length - 3);
                    isArray = (uniform.size > 1);
                }
                uniforms.set(name_1, CreateUniformSetter(uniform, location_1, isArray));
            }
        }
        return uniforms;
    }

    var UNSIGNED_BYTE = 0x1401;
    var FLOAT = 0x1406;

    var DefaultQuadAttributes = {
        aVertexPosition: { size: 2, type: FLOAT, normalized: false, offset: 0 },
        aTextureCoord: { size: 2, type: FLOAT, normalized: false, offset: 8 },
        aTextureId: { size: 1, type: FLOAT, normalized: false, offset: 16 },
        aTintColor: { size: 4, type: UNSIGNED_BYTE, normalized: true, offset: 20 }
    };

    var DefaultQuadUniforms = {
        uProjectionMatrix: new Float32Array(),
        uCameraMatrix: new Float32Array(),
        uTexture: 0
    };

    function CreateDepthBuffer(framebuffer, textureWidth, textureHeight) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        var depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureWidth, textureHeight);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return depthBuffer;
    }

    function CreateFramebuffer(texture, attachment) {
        if (!attachment) {
            attachment = gl.COLOR_ATTACHMENT0;
        }
        var framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return framebuffer;
    }

    var SINGLE_QUAD_FRAG = "#define SHADER_NAME SINGLE_QUAD_FRAG\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\nvarying float vTextureId;\nvarying vec4 vTintColor;\n\nuniform sampler2D uTexture;\n\nvoid main (void)\n{\n    vec4 color = texture2D(uTexture, vTextureCoord);\n\n    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);\n}";

    var SINGLE_QUAD_VERT = "#define SHADER_NAME SINGLE_QUAD_VERT\n\nprecision highp float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute float aTextureId;\nattribute vec4 aTintColor;\n\nuniform mat4 uProjectionMatrix;\nuniform mat4 uCameraMatrix;\n\nvarying vec2 vTextureCoord;\nvarying float vTextureId;\nvarying vec4 vTintColor;\n\nvoid main (void)\n{\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vTintColor = aTintColor;\n\n    gl_Position = uProjectionMatrix * uCameraMatrix * vec4(aVertexPosition, 0.0, 1.0);\n}";

    var Frame = (function () {
        function Frame(texture, key, x, y, width, height) {
            this.trimmed = false;
            this.texture = texture;
            this.key = key;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.sourceSizeWidth = width;
            this.sourceSizeHeight = height;
            this.updateUVs();
        }
        Frame.prototype.setPivot = function (x, y) {
            this.pivot = { x: x, y: y };
        };
        Frame.prototype.setSize = function (width, height) {
            this.width = width;
            this.height = height;
            this.sourceSizeWidth = width;
            this.sourceSizeHeight = height;
            this.updateUVs();
        };
        Frame.prototype.setSourceSize = function (width, height) {
            this.sourceSizeWidth = width;
            this.sourceSizeHeight = height;
        };
        Frame.prototype.setTrim = function (width, height, x, y, w, h) {
            this.trimmed = true;
            this.sourceSizeWidth = width;
            this.sourceSizeHeight = height;
            this.spriteSourceSizeX = x;
            this.spriteSourceSizeY = y;
            this.spriteSourceSizeWidth = w;
            this.spriteSourceSizeHeight = h;
        };
        Frame.prototype.getExtent = function (originX, originY) {
            var sourceSizeWidth = this.sourceSizeWidth;
            var sourceSizeHeight = this.sourceSizeHeight;
            var left;
            var right;
            var top;
            var bottom;
            if (this.trimmed) {
                left = this.spriteSourceSizeX - (originX * sourceSizeWidth);
                right = left + this.spriteSourceSizeWidth;
                top = this.spriteSourceSizeY - (originY * sourceSizeHeight);
                bottom = top + this.spriteSourceSizeHeight;
            }
            else {
                left = -originX * sourceSizeWidth;
                right = left + sourceSizeWidth;
                top = -originY * sourceSizeHeight;
                bottom = top + sourceSizeHeight;
            }
            return { left: left, right: right, top: top, bottom: bottom };
        };
        Frame.prototype.copyToExtent = function (child) {
            var transform = child.transform;
            var originX = transform.origin.x;
            var originY = transform.origin.y;
            var sourceSizeWidth = this.sourceSizeWidth;
            var sourceSizeHeight = this.sourceSizeHeight;
            var x;
            var y;
            var width;
            var height;
            if (this.trimmed) {
                x = this.spriteSourceSizeX - (originX * sourceSizeWidth);
                y = this.spriteSourceSizeY - (originY * sourceSizeHeight);
                width = this.spriteSourceSizeWidth;
                height = this.spriteSourceSizeHeight;
            }
            else {
                x = -originX * sourceSizeWidth;
                y = -originY * sourceSizeHeight;
                width = sourceSizeWidth;
                height = sourceSizeHeight;
            }
            transform.setExtent(x, y, width, height);
            return this;
        };
        Frame.prototype.copyToVertices = function (vertices, offset) {
            if (offset === void 0) { offset = 0; }
            var _a = this, u0 = _a.u0, u1 = _a.u1, v0 = _a.v0, v1 = _a.v1;
            vertices[offset + 0].setUV(u0, v0);
            vertices[offset + 1].setUV(u0, v1);
            vertices[offset + 2].setUV(u1, v1);
            vertices[offset + 3].setUV(u1, v0);
            return this;
        };
        Frame.prototype.updateUVs = function () {
            var _a = this, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
            var baseTextureWidth = this.texture.width;
            var baseTextureHeight = this.texture.height;
            this.u0 = x / baseTextureWidth;
            this.v0 = y / baseTextureHeight;
            this.u1 = (x + width) / baseTextureWidth;
            this.v1 = (y + height) / baseTextureHeight;
        };
        return Frame;
    }());

    var Texture = (function () {
        function Texture(image, width, height, glConfig) {
            this.key = '';
            if (image) {
                width = image.width;
                height = image.height;
            }
            this.image = image;
            this.width = width;
            this.height = height;
            this.frames = new Map();
            this.data = {};
            this.addFrame('__BASE', 0, 0, width, height);
            BindingQueue.add(this, glConfig);
        }
        Texture.prototype.addFrame = function (key, x, y, width, height) {
            if (this.frames.has(key)) {
                return null;
            }
            var frame = new Frame(this, key, x, y, width, height);
            this.frames.set(key, frame);
            if (!this.firstFrame || this.firstFrame.key === '__BASE') {
                this.firstFrame = frame;
            }
            return frame;
        };
        Texture.prototype.getFrame = function (key) {
            if (!key) {
                return this.firstFrame;
            }
            if (key instanceof Frame) {
                key = key.key;
            }
            var frame = this.frames.get(key);
            if (!frame) {
                console.warn("Frame missing: " + key);
                frame = this.firstFrame;
            }
            return frame;
        };
        Texture.prototype.setSize = function (width, height) {
            this.width = width;
            this.height = height;
            var frame = this.frames.get('__BASE');
            frame.setSize(width, height);
        };
        Texture.prototype.destroy = function () {
            if (this.binding) {
                this.binding.destroy();
            }
            this.frames.clear();
            this.data = null;
            this.image = null;
            this.firstFrame = null;
        };
        return Texture;
    }());

    var Shader = (function () {
        function Shader(config) {
            this.renderToFramebuffer = false;
            this.renderToDepthbuffer = false;
            if (config) {
                this.fromConfig(config);
            }
        }
        Shader.prototype.fromConfig = function (config) {
            var _a = config.attributes, attributes = _a === void 0 ? DefaultQuadAttributes : _a, _b = config.fragmentShader, fragmentShader = _b === void 0 ? SINGLE_QUAD_FRAG : _b, _c = config.height, height = _c === void 0 ? GetHeight() : _c, _d = config.renderToFramebuffer, renderToFramebuffer = _d === void 0 ? false : _d, _e = config.renderToDepthbuffer, renderToDepthbuffer = _e === void 0 ? false : _e, _f = config.resolution, resolution = _f === void 0 ? GetResolution() : _f, _g = config.vertexShader, vertexShader = _g === void 0 ? SINGLE_QUAD_VERT : _g, _h = config.width, width = _h === void 0 ? GetWidth() : _h, _j = config.uniforms, uniforms = _j === void 0 ? DefaultQuadUniforms : _j;
            this.create(fragmentShader, vertexShader, uniforms, attributes);
            if (renderToFramebuffer) {
                this.renderToFramebuffer = true;
                var texture = new Texture(null, width * resolution, height * resolution);
                var binding = new GLTextureBinding(texture);
                texture.binding = binding;
                binding.framebuffer = CreateFramebuffer(binding.texture);
                if (renderToDepthbuffer) {
                    this.renderToDepthbuffer = true;
                    binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
                }
                this.texture = texture;
                this.framebuffer = binding.framebuffer;
            }
        };
        Shader.prototype.create = function (fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
            var e_1, _a;
            var fragmentShader = CreateShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
            var vertexShader = CreateShader(vertexShaderSource, gl.VERTEX_SHADER);
            if (!fragmentShader || !vertexShader) {
                return;
            }
            var program = CreateProgram(fragmentShader, vertexShader);
            if (!program) {
                return;
            }
            var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
            gl.useProgram(program);
            this.program = program;
            this.uniformSetters = CreateUniforms(program);
            this.uniforms = new Map();
            try {
                for (var _b = __values(Object.entries(uniforms)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                    this.uniforms.set(key, value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.attributes = CreateAttributes(program, attribs);
            gl.useProgram(currentProgram);
        };
        Shader.prototype.updateUniforms = function (renderPass) {
        };
        Shader.prototype.bind = function (renderPass) {
            this.updateUniforms(renderPass);
            return this.setUniforms(renderPass);
        };
        Shader.prototype.setUniform = function (key, value) {
            var uniforms = this.uniforms;
            if (uniforms.has(key)) {
                uniforms.set(key, value);
                var setter = this.uniformSetters.get(key);
                setter(value);
            }
        };
        Shader.prototype.setUniforms = function (renderPass) {
            var e_2, _a;
            if (!this.program) {
                return false;
            }
            gl.useProgram(this.program);
            var uniforms = this.uniforms;
            try {
                for (var _b = __values(this.uniformSetters.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), name_1 = _d[0], setter = _d[1];
                    setter(uniforms.get(name_1));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return true;
        };
        Shader.prototype.setAttributes = function (renderPass) {
            if (this.program) {
                var stride_1 = renderPass.currentVertexBuffer.vertexByteSize;
                this.attributes.forEach(function (attrib) {
                    gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride_1, attrib.offset);
                });
            }
        };
        Shader.prototype.destroy = function () {
            DeleteShaders(this.program);
            DeleteGLTexture(this.texture);
            DeleteFramebuffer(this.framebuffer);
            this.uniforms.clear();
            this.uniformSetters.clear();
            this.attributes.clear();
            this.program = null;
            this.texture = null;
            this.framebuffer = null;
        };
        return Shader;
    }());

    var QuadShader = (function (_super) {
        __extends(QuadShader, _super);
        function QuadShader(config) {
            if (config === void 0) { config = {}; }
            var _this = this;
            var shaderConfig = config;
            shaderConfig.attributes = (!shaderConfig.attributes) ? DefaultQuadAttributes : shaderConfig.attributes;
            _this = _super.call(this, shaderConfig) || this;
            return _this;
        }
        QuadShader.prototype.bind = function (renderPass) {
            var uniforms = this.uniforms;
            uniforms.set('uProjectionMatrix', renderPass.projectionMatrix.data);
            uniforms.set('uCameraMatrix', renderPass.cameraMatrix.data);
            return _super.prototype.bind.call(this, renderPass);
        };
        return QuadShader;
    }(Shader));

    ((function (_super) {
        __extends(FXShader, _super);
        function FXShader(config) {
            if (config === void 0) { config = {}; }
            var _this = this;
            var shaderConfig = config;
            shaderConfig.attributes = (!shaderConfig.attributes) ? DefaultQuadAttributes : shaderConfig.attributes;
            shaderConfig.renderToFramebuffer = true;
            _this = _super.call(this, shaderConfig) || this;
            return _this;
        }
        FXShader.prototype.bind = function (renderPass) {
            var renderer = renderPass.renderer;
            this.uniforms.set('uTime', performance.now());
            this.uniforms.set('uResolution', [renderer.width, renderer.height]);
            return _super.prototype.bind.call(this, renderPass);
        };
        return FXShader;
    })(QuadShader));

    var MULTI_QUAD_FRAG = "#define SHADER_NAME MULTI_QUAD_FRAG\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\nvarying float vTextureId;\nvarying vec4 vTintColor;\n\nuniform sampler2D uTexture[%count%];\n\nvoid main (void)\n{\n    vec4 color;\n\n    %forloop%\n\n    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);\n}";

    var MultiTextureQuadShader = (function (_super) {
        __extends(MultiTextureQuadShader, _super);
        function MultiTextureQuadShader(config) {
            if (config === void 0) { config = {}; }
            var _this = this;
            if (!config.fragmentShader) {
                config.fragmentShader = MULTI_QUAD_FRAG;
            }
            _this = _super.call(this, config) || this;
            return _this;
        }
        MultiTextureQuadShader.prototype.create = function (fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
            var maxTextures = GetMaxTextures();
            var src = '';
            for (var i = 1; i < maxTextures; i++) {
                if (i > 1) {
                    src += '\n\telse ';
                }
                if (i < maxTextures - 1) {
                    src += "if (vTextureId < " + i + ".5)";
                }
                src += '\n\t{';
                src += "\n\t\tcolor = texture2D(uTexture[" + i + "], vTextureCoord);";
                src += '\n\t}';
            }
            fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, "" + maxTextures);
            fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);
            _super.prototype.create.call(this, fragmentShaderSource, vertexShaderSource, uniforms, attribs);
        };
        MultiTextureQuadShader.prototype.bind = function (renderPass) {
            this.uniforms.set('uTexture', renderPass.textureIndex);
            return _super.prototype.bind.call(this, renderPass);
        };
        return MultiTextureQuadShader;
    }(QuadShader));

    function SetDefaultBlendMode(renderPass, enable, sfactor, dfactor) {
        var entry = { enable: enable, sfactor: sfactor, dfactor: dfactor };
        renderPass.blendModeStack[0] = entry;
        renderPass.currentBlendMode = entry;
        renderPass.defaultBlendMode = entry;
    }

    function SetDefaultFramebuffer(renderPass, framebuffer, viewport) {
        if (framebuffer === void 0) { framebuffer = null; }
        var entry = { framebuffer: framebuffer, viewport: viewport };
        renderPass.framebufferStack[0] = entry;
        renderPass.currentFramebuffer = entry;
        renderPass.defaultFramebuffer = entry;
    }

    function SetDefaultShader(renderPass, shader, textureID) {
        var entry = { shader: shader, textureID: textureID };
        renderPass.shaderStack[0] = entry;
        renderPass.currentShader = entry;
        renderPass.defaultShader = entry;
    }

    function SetDefaultVertexBuffer(renderPass, buffer) {
        renderPass.vertexBufferStack[0] = buffer;
        renderPass.currentVertexBuffer = buffer;
        renderPass.defaultVertexBuffer = buffer;
    }

    function SetDefaultViewport(renderPass, x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var entry = new Rectangle$1(x, y, width, height);
        renderPass.viewportStack[0] = entry;
        renderPass.currentViewport = entry;
        renderPass.defaultViewport = entry;
    }

    var RenderPass = (function () {
        function RenderPass(renderer) {
            this.count = 0;
            this.prevCount = 0;
            this.flushTotal = 0;
            this.maxTextures = 0;
            this.currentActiveTexture = 0;
            this.startActiveTexture = 0;
            this.tempTextures = [];
            this.textureIndex = [];
            this.framebufferStack = [];
            this.currentFramebuffer = null;
            this.defaultFramebuffer = null;
            this.vertexBufferStack = [];
            this.currentVertexBuffer = null;
            this.defaultVertexBuffer = null;
            this.shaderStack = [];
            this.currentShader = null;
            this.defaultShader = null;
            this.viewportStack = [];
            this.currentViewport = null;
            this.defaultViewport = null;
            this.blendModeStack = [];
            this.currentBlendMode = null;
            this.defaultBlendMode = null;
            this.renderer = renderer;
            this.projectionMatrix = new Matrix4();
            this.reset();
        }
        RenderPass.prototype.reset = function () {
            var gl = this.renderer.gl;
            var indexLayout = [0, 1, 2, 2, 3, 0];
            this.quadShader = new QuadShader();
            this.quadBuffer = new IndexedVertexBuffer({ isDynamic: false, indexLayout: indexLayout });
            this.quadCamera = new StaticCamera();
            CreateTempTextures(this);
            SetDefaultFramebuffer(this);
            SetDefaultBlendMode(this, true, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            SetDefaultVertexBuffer(this, new IndexedVertexBuffer({ batchSize: GetBatchSize(), indexLayout: indexLayout }));
            SetDefaultShader(this, new MultiTextureQuadShader());
        };
        RenderPass.prototype.resize = function (width, height) {
            Mat4Ortho(0, width, height, 0, -1000, 1000, this.projectionMatrix);
            this.quadCamera.reset();
            SetDefaultViewport(this, 0, 0, width, height);
        };
        return RenderPass;
    }());

    function AddShader(renderPass, shader, textureID) {
        var stackEntry = { shader: shader, textureID: textureID };
        renderPass.shaderStack.push(stackEntry);
        return stackEntry;
    }

    function AddVertexBuffer(renderPass, buffer) {
        renderPass.vertexBufferStack.push(buffer);
        return buffer;
    }

    function BindShader(renderPass, entry) {
        if (!entry) {
            entry = renderPass.currentShader;
        }
        var success = entry.shader.bind(renderPass, entry.textureID);
        if (success) {
            entry.shader.setAttributes(renderPass);
        }
    }

    function Begin(renderPass, camera2D) {
        renderPass.current2DCamera = camera2D;
        renderPass.cameraMatrix = camera2D.matrix;
        BindShader(renderPass);
    }

    function BindBlendMode(renderPass, entry) {
        if (!entry) {
            entry = renderPass.currentBlendMode;
        }
        if (entry.enable) {
            gl.enable(gl.BLEND);
            gl.blendFunc(entry.sfactor, entry.dfactor);
        }
        else {
            gl.disable(gl.BLEND);
        }
    }

    function BindTexture(texture, index) {
        if (index === void 0) { index = 0; }
        var binding = texture.binding;
        binding.setIndex(index);
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    }

    function BindVertexBuffer(renderPass, buffer) {
        if (!buffer) {
            buffer = renderPass.currentVertexBuffer;
        }
        var indexBuffer = (buffer.indexed) ? buffer.indexBuffer : null;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
    }

    function PopVertexBuffer(renderPass) {
        var stack = renderPass.vertexBufferStack;
        if (stack.length > 1) {
            stack.pop();
        }
        renderPass.currentVertexBuffer = stack[stack.length - 1];
        BindVertexBuffer(renderPass);
    }

    function SetVertexBuffer(renderPass, buffer) {
        var entry = AddVertexBuffer(renderPass, buffer);
        BindVertexBuffer(renderPass, entry);
        renderPass.currentVertexBuffer = entry;
    }

    function FlushBuffer(renderPass, buffer) {
        SetVertexBuffer(renderPass, buffer);
        renderPass.currentShader.shader.setAttributes(renderPass);
        var result = Flush(renderPass, buffer.count);
        PopVertexBuffer(renderPass);
        return result;
    }

    function GetVertexBufferEntry(renderPass, addToCount) {
        if (addToCount === void 0) { addToCount = 0; }
        var buffer = renderPass.currentVertexBuffer;
        if (renderPass.count + addToCount >= buffer.batchSize) {
            Flush(renderPass);
        }
        var offset = (buffer.indexed) ? renderPass.count * buffer.entryElementSize : renderPass.count * buffer.vertexElementSize;
        renderPass.count += addToCount;
        return {
            buffer: buffer,
            F32: buffer.vertexViewF32,
            U32: buffer.vertexViewU32,
            offset: offset
        };
    }

    function PopShader(renderPass) {
        var stack = renderPass.shaderStack;
        if (stack.length > 1) {
            stack.pop();
        }
        renderPass.currentShader = stack[stack.length - 1];
        BindShader(renderPass);
    }

    function SetShader(renderPass, shader, textureID) {
        var entry = AddShader(renderPass, shader, textureID);
        BindShader(renderPass, entry);
        renderPass.currentShader = entry;
    }

    function SetTexture$2(renderPass, texture) {
        var binding = texture.binding;
        var currentActiveTexture = renderPass.currentActiveTexture;
        if (binding.indexCounter < renderPass.startActiveTexture) {
            binding.indexCounter = renderPass.startActiveTexture;
            if (currentActiveTexture < renderPass.maxTextures) {
                binding.setIndex(currentActiveTexture);
                gl.activeTexture(gl.TEXTURE0 + currentActiveTexture);
                gl.bindTexture(gl.TEXTURE_2D, binding.texture);
                renderPass.currentActiveTexture++;
            }
            else {
                Flush(renderPass);
                renderPass.startActiveTexture++;
                binding.indexCounter = renderPass.startActiveTexture;
                binding.setIndex(1);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, binding.texture);
                renderPass.currentActiveTexture = 2;
            }
        }
        return binding.index;
    }

    function Start(renderPass) {
        renderPass.current2DCamera = renderPass.quadCamera;
        renderPass.cameraMatrix = renderPass.quadCamera.matrix;
        renderPass.count = 0;
        renderPass.flushTotal = 0;
        BindFramebuffer(renderPass, false, renderPass.defaultFramebuffer);
        BindBlendMode(renderPass, renderPass.defaultBlendMode);
        BindViewport(renderPass, renderPass.defaultViewport);
        BindVertexBuffer(renderPass, renderPass.defaultVertexBuffer);
    }

    function UnbindTexture(renderPass, index) {
        if (index === void 0) { index = 0; }
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, renderPass.tempTextures[index]);
        if (index > 0) {
            renderPass.startActiveTexture++;
        }
    }

    var WebGLRenderer = (function () {
        function WebGLRenderer() {
            var _this = this;
            this.clearColor = [0, 0, 0, 1];
            this.clearBeforeRender = true;
            this.optimizeRedraw = false;
            this.autoResize = true;
            this.contextLost = false;
            this.width = GetWidth();
            this.height = GetHeight();
            this.resolution = GetResolution();
            this.setBackgroundColor(GetBackgroundColor());
            var canvas = document.createElement('canvas');
            canvas.addEventListener('webglcontextlost', function (event) { return _this.onContextLost(event); }, false);
            canvas.addEventListener('webglcontextrestored', function () { return _this.onContextRestored(); }, false);
            this.canvas = canvas;
            this.initContext();
            this.renderPass = new RenderPass(this);
            this.resize(this.width, this.height, this.resolution);
        }
        WebGLRenderer.prototype.initContext = function () {
            var gl = this.canvas.getContext('webgl', GetWebGLContext());
            GL.set(gl);
            this.gl = gl;
            gl.disable(gl.DEPTH_TEST);
            gl.disable(gl.CULL_FACE);
        };
        WebGLRenderer.prototype.resize = function (width, height, resolution) {
            if (resolution === void 0) { resolution = 1; }
            var calcWidth = width * resolution;
            var calcHeight = height * resolution;
            this.width = calcWidth;
            this.height = calcHeight;
            this.resolution = resolution;
            var canvas = this.canvas;
            canvas.width = calcWidth;
            canvas.height = calcHeight;
            if (this.autoResize) {
                canvas.style.width = width.toString() + 'px';
                canvas.style.height = height.toString() + 'px';
            }
            this.renderPass.resize(calcWidth, calcHeight);
        };
        WebGLRenderer.prototype.onContextLost = function (event) {
            event.preventDefault();
            this.contextLost = true;
        };
        WebGLRenderer.prototype.onContextRestored = function () {
            this.contextLost = false;
            this.initContext();
        };
        WebGLRenderer.prototype.setBackgroundColor = function (color) {
            GetRGBArray(color, this.clearColor);
            return this;
        };
        WebGLRenderer.prototype.reset = function () {
        };
        WebGLRenderer.prototype.render = function (renderData) {
            if (this.contextLost) {
                return;
            }
            var gl = this.gl;
            var renderPass = this.renderPass;
            ProcessBindingQueue();
            if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0) {
                return;
            }
            if (this.clearBeforeRender) {
                var cls = this.clearColor;
                gl.clearColor(cls[0], cls[1], cls[2], cls[3]);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            var worlds = renderData.worldData;
            Start(renderPass);
            for (var i = 0; i < worlds.length; i++) {
                var world = worlds[i].world;
                world.renderGL(renderPass);
                world.postRenderGL(renderPass);
            }
            End(renderPass);
        };
        WebGLRenderer.prototype.destroy = function () {
        };
        return WebGLRenderer;
    }());

    function WebGL() {
        return function () {
            SetRenderer(WebGLRenderer);
        };
    }

    function SetWebGLContext(contextAttributes) {
        ConfigStore.set(CONFIG_DEFAULTS.WEBGL_CONTEXT, contextAttributes);
    }

    function WebGLContext(contextAttributes) {
        return function () {
            SetWebGLContext(contextAttributes);
        };
    }

    var index$G = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BackgroundColor: BackgroundColor,
        Banner: Banner,
        BatchSize: BatchSize,
        Canvas: Canvas,
        CanvasContext: CanvasContext,
        DefaultOrigin: DefaultOrigin,
        MaxTextures: MaxTextures,
        Parent: Parent,
        Scenes: Scenes,
        Size: Size,
        WebGL: WebGL,
        WebGLContext: WebGLContext
    });

    function AddToDOM(element, parent) {
        var target = GetElement(parent);
        target.appendChild(element);
        return element;
    }

    function DOMContentLoaded(callback) {
        var readyState = document.readyState;
        if (readyState === 'complete' || readyState === 'interactive') {
            callback();
            return;
        }
        var check = function () {
            document.removeEventListener('deviceready', check, true);
            document.removeEventListener('DOMContentLoaded', check, true);
            window.removeEventListener('load', check, true);
            callback();
        };
        if (!document.body) {
            window.setTimeout(check, 20);
        }
        else if (window.hasOwnProperty('cordova')) {
            document.addEventListener('deviceready', check, true);
        }
        else {
            document.addEventListener('DOMContentLoaded', check, true);
            window.addEventListener('load', check, true);
        }
    }

    function ParseXML(data) {
        var xml;
        try {
            var parser = new DOMParser();
            xml = parser.parseFromString(data, 'text/xml');
            if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
                return null;
            }
            else {
                return xml;
            }
        }
        catch (error) {
            return null;
        }
    }

    function RemoveFromDOM(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    var index$F = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AddToDOM: AddToDOM,
        DOMContentLoaded: DOMContentLoaded,
        GetElement: GetElement,
        ParseXML: ParseXML,
        RemoveFromDOM: RemoveFromDOM
    });

    var _audioElement;
    function CanPlayAudioType(type, audioElement) {
        if (!audioElement) {
            if (!_audioElement) {
                _audioElement = document.createElement('audio');
            }
            audioElement = _audioElement;
        }
        return (audioElement && audioElement.canPlayType(type) !== '');
    }

    function CanPlayM4A(audioElement) {
        return (CanPlayAudioType('audio/x-m4a', audioElement) ||
            CanPlayAudioType('audio/aac', audioElement));
    }

    function CanPlayMP3(audioElement) {
        return CanPlayAudioType('audio/mpeg; codecs="mp3"', audioElement);
    }

    function CanPlayOGG(audioElement) {
        return CanPlayAudioType('audio/ogg; codecs="vorbis"', audioElement);
    }

    function CanPlayOpus(audioElement) {
        return (CanPlayAudioType('audio/ogg; codecs="opus"', audioElement) ||
            CanPlayAudioType('audio/webm; codecs="opus"', audioElement));
    }

    function CanPlayWAV(audioElement) {
        return CanPlayAudioType('audio/wav; codecs="1"', audioElement);
    }

    function CanPlayWebM(audioElement) {
        return CanPlayAudioType('audio/webm; codecs="vorbis"', audioElement);
    }

    function HasAudio() {
        return (window && window.hasOwnProperty('Audio'));
    }

    function HasWebAudio() {
        return (window &&
            (window.hasOwnProperty('AudioContext') || window.hasOwnProperty('webkitAudioContext')));
    }

    function GetAudio() {
        var result = {
            audioData: HasAudio(),
            m4a: false,
            mp3: false,
            ogg: false,
            opus: false,
            wav: false,
            webAudio: HasWebAudio(),
            webm: false
        };
        if (result.audioData) {
            result.m4a = CanPlayM4A();
            result.mp3 = CanPlayMP3();
            result.ogg = CanPlayOGG();
            result.opus = CanPlayOpus();
            result.wav = CanPlayWAV();
            result.webm = CanPlayWebM();
        }
        return result;
    }

    var index$E = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CanPlayAudioType: CanPlayAudioType,
        CanPlayM4A: CanPlayM4A,
        CanPlayMP3: CanPlayMP3,
        CanPlayOGG: CanPlayOGG,
        CanPlayOpus: CanPlayOpus,
        CanPlayWAV: CanPlayWAV,
        CanPlayWebM: CanPlayWebM,
        GetAudio: GetAudio,
        HasAudio: HasAudio,
        HasWebAudio: HasWebAudio
    });

    function IsChrome() {
        var chrome = (/Chrome\/(\d+)/).test(navigator.userAgent);
        var chromeVersion = (chrome) ? parseInt(RegExp.$1, 10) : 0;
        return {
            chrome: chrome,
            chromeVersion: chromeVersion
        };
    }

    function IsEdge() {
        var edge = (/Edge\/\d+/).test(navigator.userAgent);
        return {
            edge: edge
        };
    }

    function IsFirefox() {
        var firefox = (/Firefox\D+(\d+)/).test(navigator.userAgent);
        var firefoxVersion = (firefox) ? parseInt(RegExp.$1, 10) : 0;
        return {
            firefox: firefox,
            firefoxVersion: firefoxVersion
        };
    }

    function IsMSIE() {
        var ie = (/MSIE (\d+\.\d+);/).test(navigator.userAgent);
        var ieVersion = (ie) ? parseInt(RegExp.$1, 10) : 0;
        return {
            ie: ie,
            ieVersion: ieVersion
        };
    }

    function IsiOS() {
        var ua = navigator.userAgent;
        var result = {
            iOS: false,
            iOSVersion: 0,
            iPhone: false,
            iPad: false
        };
        if ((/iP[ao]d|iPhone/i).test(ua)) {
            var match = (/OS (\d+)/).exec(navigator.appVersion);
            result.iOS = true;
            result.iOSVersion = parseInt(match[0], 10);
            result.iPhone = (ua.toLowerCase().includes('iphone'));
            result.iPad = (ua.toLowerCase().includes('ipad'));
        }
        return result;
    }

    function IsMobileSafari() {
        var iOS = IsiOS().iOS;
        var mobileSafari = (navigator.userAgent.includes('AppleWebKit') && iOS);
        return {
            mobileSafari: mobileSafari
        };
    }

    function IsOpera() {
        var opera = navigator.userAgent.includes('Opera');
        return {
            opera: opera
        };
    }

    function IsWindowsPhone() {
        var ua = navigator.userAgent;
        return ((/Windows Phone/i).test(ua) || (/IEMobile/i).test(ua));
    }

    function IsSafari() {
        var ua = navigator.userAgent;
        var safari = (ua.includes('Safari') && !IsWindowsPhone());
        var safariVersion = ((/Version\/(\d+)\./).test(ua)) ? parseInt(RegExp.$1, 10) : 0;
        return {
            safari: safari,
            safariVersion: safariVersion
        };
    }

    function IsSilk() {
        var silk = navigator.userAgent.includes('Silk');
        return {
            silk: silk
        };
    }

    function IsTrident() {
        var trident = (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/).test(navigator.userAgent);
        var tridentVersion = (trident) ? parseInt(RegExp.$1, 10) : 0;
        var tridentIEVersion = (trident) ? parseInt(RegExp.$3, 10) : 0;
        return {
            trident: trident,
            tridentVersion: tridentVersion,
            tridentIEVersion: tridentIEVersion
        };
    }

    function GetBrowser() {
        var _a = IsChrome(), chrome = _a.chrome, chromeVersion = _a.chromeVersion;
        var edge = IsEdge().edge;
        var _b = IsFirefox(), firefox = _b.firefox, firefoxVersion = _b.firefoxVersion;
        var _c = IsMSIE(), ie = _c.ie, ieVersion = _c.ieVersion;
        var mobileSafari = IsMobileSafari().mobileSafari;
        var opera = IsOpera().opera;
        var _d = IsSafari(), safari = _d.safari, safariVersion = _d.safariVersion;
        var silk = IsSilk().silk;
        var _e = IsTrident(), trident = _e.trident, tridentVersion = _e.tridentVersion, tridentIEVersion = _e.tridentIEVersion;
        if (trident) {
            ie = true;
            ieVersion = tridentIEVersion;
        }
        var result = {
            chrome: chrome,
            chromeVersion: chromeVersion,
            edge: edge,
            firefox: firefox,
            firefoxVersion: firefoxVersion,
            ie: ie,
            ieVersion: ieVersion,
            mobileSafari: mobileSafari,
            opera: opera,
            safari: safari,
            safariVersion: safariVersion,
            silk: silk,
            trident: trident,
            tridentVersion: tridentVersion
        };
        return result;
    }

    var index$D = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetBrowser: GetBrowser,
        IsChrome: IsChrome,
        IsEdge: IsEdge,
        IsFirefox: IsFirefox,
        IsMobileSafari: IsMobileSafari,
        IsMSIE: IsMSIE,
        IsOpera: IsOpera,
        IsSafari: IsSafari,
        IsSilk: IsSilk,
        IsTrident: IsTrident
    });

    function IsAndroid() {
        return (navigator.userAgent.includes('Android'));
    }

    function IsChromeOS() {
        return (navigator.userAgent.includes('CrOS'));
    }

    function IsCordova() {
        return (window.hasOwnProperty('cordova'));
    }

    function IsCrosswalk() {
        return (navigator.userAgent.includes('Crosswalk'));
    }

    function IsEjecta() {
        return (window.hasOwnProperty('ejecta'));
    }

    function IsKindle() {
        var ua = navigator.userAgent;
        return ((ua.includes('Kindle') || (/\bKF[A-Z][A-Z]+/).test(ua) || (/Silk.*Mobile Safari/).test(ua)));
    }

    function IsLinux() {
        return (navigator.userAgent.includes('Linux'));
    }

    function IsMacOS() {
        var ua = navigator.userAgent;
        return (ua.includes('Mac OS') && !(ua.includes('like Mac OS')));
    }

    function IsNode() {
        return (typeof process !== 'undefined' && typeof process.versions === 'object' && process.versions.hasOwnProperty('node'));
    }

    function IsNodeWebkit() {
        return (IsNode() && !!process.versions.hasOwnProperty('node-webkit'));
    }

    function IsWebApp() {
        return (navigator.hasOwnProperty('standalone'));
    }

    function IsWindows() {
        return (navigator.userAgent.includes('Windows'));
    }

    function GetOS() {
        var ua = navigator.userAgent;
        var _a = IsiOS(), iOS = _a.iOS, iOSVersion = _a.iOSVersion, iPad = _a.iPad, iPhone = _a.iPhone;
        var result = {
            android: IsAndroid(),
            chromeOS: IsChromeOS(),
            cordova: IsCordova(),
            crosswalk: IsCrosswalk(),
            desktop: false,
            ejecta: IsEjecta(),
            iOS: iOS,
            iOSVersion: iOSVersion,
            iPad: iPad,
            iPhone: iPhone,
            kindle: IsKindle(),
            linux: IsLinux(),
            macOS: IsMacOS(),
            node: IsNode(),
            nodeWebkit: IsNodeWebkit(),
            pixelRatio: 1,
            webApp: IsWebApp(),
            windows: IsWindows(),
            windowsPhone: IsWindowsPhone()
        };
        if (result.windowsPhone) {
            result.android = false;
            result.iOS = false;
            result.macOS = false;
            result.windows = true;
        }
        var silk = ua.includes('Silk');
        if (result.windows || result.macOS || (result.linux && !silk) || result.chromeOS) {
            result.desktop = true;
        }
        if (result.windowsPhone || (((/Windows NT/i).test(ua)) && ((/Touch/i).test(ua)))) {
            result.desktop = false;
        }
        return result;
    }

    var index$C = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetOS: GetOS,
        IsAndroid: IsAndroid,
        IsChromeOS: IsChromeOS,
        IsCordova: IsCordova,
        IsCrosswalk: IsCrosswalk,
        IsEjecta: IsEjecta,
        IsiOS: IsiOS,
        IsKindle: IsKindle,
        IsLinux: IsLinux,
        IsMacOS: IsMacOS,
        IsNode: IsNode,
        IsNodeWebkit: IsNodeWebkit,
        IsWebApp: IsWebApp,
        IsWindows: IsWindows,
        IsWindowsPhone: IsWindowsPhone
    });

    var _videoElement;
    function CanPlayVideoType(type, videoElement) {
        if (!videoElement) {
            if (!_videoElement) {
                _videoElement = document.createElement('video');
            }
            videoElement = _videoElement;
        }
        return (videoElement && videoElement.canPlayType(type) !== '');
    }

    function CanPlayH264Video(videoElement) {
        return CanPlayVideoType('video/mp4; codecs="avc1.42E01E"', videoElement);
    }

    function CanPlayHLSVideo(videoElement) {
        return CanPlayVideoType('application/x-mpegURL; codecs="avc1.42E01E"', videoElement);
    }

    function CanPlayOGGVideo(videoElement) {
        return CanPlayVideoType('video/ogg; codecs="theora"', videoElement);
    }

    function CanPlayVP9Video(videoElement) {
        return CanPlayVideoType('video/webm; codecs="vp9"', videoElement);
    }

    function CanPlayWebMVideo(videoElement) {
        return CanPlayVideoType('video/webm; codecs="vp8, vorbis"', videoElement);
    }

    function GetVideo() {
        return {
            h264Video: CanPlayH264Video(),
            hlsVideo: CanPlayHLSVideo(),
            oggVideo: CanPlayOGGVideo(),
            vp9Video: CanPlayVP9Video(),
            webmVideo: CanPlayWebMVideo()
        };
    }

    var index$B = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CanPlayH264Video: CanPlayH264Video,
        CanPlayHLSVideo: CanPlayHLSVideo,
        CanPlayOGGVideo: CanPlayOGGVideo,
        CanPlayVP9Video: CanPlayVP9Video,
        CanPlayVideoType: CanPlayVideoType,
        CanPlayWebMVideo: CanPlayWebMVideo,
        GetVideo: GetVideo
    });

    var index$A = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Audio: index$E,
        Browser: index$D,
        OS: index$C,
        Video: index$B,
        CanPlayAudioType: CanPlayAudioType,
        CanPlayM4A: CanPlayM4A,
        CanPlayMP3: CanPlayMP3,
        CanPlayOGG: CanPlayOGG,
        CanPlayOpus: CanPlayOpus,
        CanPlayWAV: CanPlayWAV,
        CanPlayWebM: CanPlayWebM,
        GetAudio: GetAudio,
        HasAudio: HasAudio,
        HasWebAudio: HasWebAudio,
        GetBrowser: GetBrowser,
        IsChrome: IsChrome,
        IsEdge: IsEdge,
        IsFirefox: IsFirefox,
        IsMobileSafari: IsMobileSafari,
        IsMSIE: IsMSIE,
        IsOpera: IsOpera,
        IsSafari: IsSafari,
        IsSilk: IsSilk,
        IsTrident: IsTrident,
        GetOS: GetOS,
        IsAndroid: IsAndroid,
        IsChromeOS: IsChromeOS,
        IsCordova: IsCordova,
        IsCrosswalk: IsCrosswalk,
        IsEjecta: IsEjecta,
        IsiOS: IsiOS,
        IsKindle: IsKindle,
        IsLinux: IsLinux,
        IsMacOS: IsMacOS,
        IsNode: IsNode,
        IsNodeWebkit: IsNodeWebkit,
        IsWebApp: IsWebApp,
        IsWindows: IsWindows,
        IsWindowsPhone: IsWindowsPhone,
        CanPlayH264Video: CanPlayH264Video,
        CanPlayHLSVideo: CanPlayHLSVideo,
        CanPlayOGGVideo: CanPlayOGGVideo,
        CanPlayVP9Video: CanPlayVP9Video,
        CanPlayVideoType: CanPlayVideoType,
        CanPlayWebMVideo: CanPlayWebMVideo,
        GetVideo: GetVideo
    });

    function DepthFirstSearch(parent) {
        var stack = [parent];
        var output = [];
        while (stack.length > 0) {
            var node = stack.shift();
            output.push(node);
            var numChildren = node.numChildren;
            if (numChildren > 0) {
                for (var i = numChildren - 1; i >= 0; i--) {
                    stack.unshift(node.children[i]);
                }
            }
        }
        output.shift();
        return output;
    }

    function GetChildIndex(parent, child) {
        return parent.children.indexOf(child);
    }

    function RemoveChildAt(parent, index) {
        var children = parent.children;
        var child;
        if (index >= 0 && index < children.length) {
            var removed = children.splice(index, 1);
            if (removed[0]) {
                child = removed[0];
                child.parent = null;
            }
        }
        return child;
    }

    function RemoveChild(parent, child) {
        var currentIndex = GetChildIndex(parent, child);
        if (currentIndex > -1) {
            RemoveChildAt(parent, currentIndex);
        }
        return child;
    }

    var AddedToWorldEvent = 'addedtoworld';

    var DestroyEvent = 'destroy';

    var PostUpdateEvent = 'postupdate';

    var RemovedFromWorldEvent = 'removedfromworld';

    var UpdateEvent = 'update';

    function Emit(emitter, event) {
        var e_1, _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (emitter.events.size === 0 || !emitter.events.has(event)) {
            return false;
        }
        var listeners = emitter.events.get(event);
        try {
            for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                var ee = listeners_1_1.value;
                ee.callback.apply(ee.context, args);
                if (ee.once) {
                    listeners.delete(ee);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (listeners.size === 0) {
            emitter.events.delete(event);
        }
        return true;
    }

    function SetWorld(world) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            if (child.world) {
                Emit(child.world, RemovedFromWorldEvent, child, child.world);
                Emit(child, RemovedFromWorldEvent, child, child.world);
            }
            child.world = world;
            Emit(world, AddedToWorldEvent, child, world);
            Emit(child, AddedToWorldEvent, child, world);
        });
        return children;
    }

    function SetParent(parent) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            if (child.parent) {
                RemoveChild(child.parent, child);
            }
            child.parent = parent;
        });
        var parentWorld = parent.world;
        if (parentWorld) {
            SetWorld.apply(void 0, __spreadArray([parentWorld], __read(DepthFirstSearch(parent))));
        }
        return children;
    }

    function AddChild(parent, child) {
        parent.children.push(child);
        SetParent(parent, child);
        child.transform.updateWorld();
        return child;
    }

    function AddChildAt(parent, index, child) {
        var children = parent.children;
        if (index >= 0 && index <= children.length) {
            SetParent(parent, child);
            children.splice(index, 0, child);
            child.transform.updateWorld();
        }
        return child;
    }

    function AddChildren(parent) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            AddChild(parent, child);
        });
        return children;
    }

    function AddChildrenAt(parent, index) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var parentChildren = parent.children;
        if (index >= 0 && index <= parentChildren.length) {
            children.reverse().forEach(function (child) {
                children.splice(index, 0, child);
                SetParent(parent, child);
                child.transform.updateWorld();
            });
        }
        return children;
    }

    function AddPosition(x, y) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            child.x += x;
            child.y += y;
        });
        return children;
    }

    function AddRotation(rotation) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            child.rotation += rotation;
        });
        return children;
    }

    function AddScale(scaleX, scaleY) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            child.scaleX += scaleX;
            child.scaleY += scaleY;
        });
        return children;
    }

    function AddSkew(skewX, skewY) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            child.skewX += skewX;
            child.skewY += skewY;
        });
        return children;
    }

    var DIRTY_CONST = {
        CLEAR: 0,
        TRANSFORM: 1,
        UPDATE: 2,
        CHILD_CACHE: 4,
        POST_RENDER: 8,
        COLORS: 16,
        BOUNDS: 32,
        TEXTURE: 64,
        FRAME: 128,
        ALPHA: 256,
        CHILD: 512,
        DEFAULT: 1 + 2 + 16 + 32,
        USER1: 536870912,
        USER2: 1073741824,
        USER3: 2147483648,
        USER4: 4294967296
    };

    function BringChildToTop(parent, child) {
        var parentChildren = parent.children;
        var currentIndex = GetChildIndex(parent, child);
        if (currentIndex !== -1 && currentIndex < parentChildren.length) {
            parentChildren.splice(currentIndex, 1);
            parentChildren.push(child);
            child.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return child;
    }

    function DepthFirstSearchRecursiveNested(parent, output) {
        if (output === void 0) { output = []; }
        for (var i = 0; i < parent.numChildren; i++) {
            var node = parent.children[i];
            var children = [];
            output.push({ node: node, children: children });
            if (node.numChildren > 0) {
                DepthFirstSearchRecursiveNested(node, children);
            }
        }
        return output;
    }

    function GetInfo$1(entry) {
        var legend = (entry.numChildren > 0) ? 'Parent' : 'Child';
        return legend + " [ type=" + entry.type + ", name=" + entry.name + " ]";
    }
    function LogChildren$1(entry) {
        console.group(GetInfo$1(entry.node));
        entry.children.forEach(function (child) {
            if (child.children.length > 0) {
                LogChildren$1(child);
            }
            else {
                console.log(GetInfo$1(child.node));
            }
        });
        console.groupEnd();
    }
    function ConsoleTreeChildren(parent) {
        var entries = DepthFirstSearchRecursiveNested(parent);
        if (parent.world === parent) {
            console.group('World');
        }
        else {
            console.group(GetInfo$1(parent));
        }
        entries.forEach(function (entry) {
            if (entry.children.length) {
                LogChildren$1(entry);
            }
            else {
                console.log(GetInfo$1(entry.node));
            }
        });
        console.groupEnd();
    }

    function CountMatchingChildren(parent, property, value) {
        var children = parent.children;
        var total = 0;
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                total++;
            }
        });
        return total;
    }

    function DepthFirstSearchRecursive(parent, output) {
        if (output === void 0) { output = []; }
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.children[i];
            output.push(child);
            if (child.numChildren > 0) {
                DepthFirstSearchRecursive(child, output);
            }
        }
        return output;
    }

    function RemoveChildrenBetween(parent, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        var children = parent.children;
        if (endIndex === undefined) {
            endIndex = children.length;
        }
        var range = endIndex - beginIndex;
        if (range > 0 && range <= endIndex) {
            var removed = children.splice(beginIndex, range);
            removed.forEach(function (child) {
                child.parent = null;
            });
            return removed;
        }
        else {
            return [];
        }
    }

    function DestroyChildren(parent, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        var removed = RemoveChildrenBetween(parent, beginIndex, endIndex);
        removed.forEach(function (child) {
            child.destroy();
        });
    }

    function FindChildByName(parent, searchString) {
        var children = DepthFirstSearch(parent);
        var regex = RegExp(searchString);
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (regex.test(child.name)) {
                return child;
            }
        }
    }

    function FindChildrenByName(parent, searchString) {
        var children = DepthFirstSearch(parent);
        var regex = RegExp(searchString);
        var results = [];
        children.forEach(function (child) {
            if (regex.test(child.name)) {
                results.push(child);
            }
        });
        return results;
    }

    function GetAllChildren(parent, property, value) {
        var children = DepthFirstSearch(parent);
        if (!property) {
            return children;
        }
        var results = [];
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                results.push(child);
            }
        });
        return results;
    }

    function GetChildAt(parent, index) {
        var children = parent.children;
        if (index < 0 || index > children.length) {
            throw new Error("Index out of bounds: " + index);
        }
        return children[index];
    }

    function GetChildren(parent, property, value) {
        var children = parent.children;
        if (!property) {
            return __spreadArray([], __read(children));
        }
        var results = [];
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                results.push(child);
            }
        });
        return results;
    }

    function GetClosestChild(parent, point) {
        var children = parent.children;
        var closest = null;
        var distance = 0;
        children.forEach(function (child) {
            var childDistance = GetVec2Distance(point, child.transform.position);
            if (!closest || childDistance < distance) {
                closest = child;
                distance = childDistance;
            }
        });
        return closest;
    }

    function GetFirstChild(parent, property, value) {
        var children = parent.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                return child;
            }
        }
    }

    function GetFurthestChild(parent, point) {
        var children = parent.children;
        var furthest = null;
        var distance = 0;
        children.forEach(function (child) {
            var childDistance = GetVec2Distance(point, child.transform.position);
            if (!furthest || childDistance > distance) {
                furthest = child;
                distance = childDistance;
            }
        });
        return furthest;
    }

    function GetLastChild(parent, property, value) {
        var children = parent.children;
        for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i];
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                return child;
            }
        }
    }

    function GetParents(child) {
        var parents = [];
        while (child.parent) {
            parents.push(child.parent);
            child = child.parent;
        }
        return parents;
    }

    function GetRandomChild(parent, startIndex, length) {
        if (startIndex === void 0) { startIndex = 0; }
        var children = parent.children;
        if (!length) {
            length = children.length;
        }
        var randomIndex = startIndex + Math.floor(Math.random() * length);
        return children[randomIndex];
    }

    function MoveChildDown(parent, child) {
        var parentChildren = parent.children;
        var currentIndex = GetChildIndex(parent, child);
        if (currentIndex > 0) {
            var child2 = parentChildren[currentIndex - 1];
            var index2 = parentChildren.indexOf(child2);
            parentChildren[currentIndex] = child2;
            parentChildren[index2] = child;
            child.setDirty(DIRTY_CONST.TRANSFORM);
            child2.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return child;
    }

    function MoveChildTo(parent, child, index) {
        var parentChildren = parent.children;
        var currentIndex = GetChildIndex(parent, child);
        if (currentIndex === -1 || index < 0 || index >= parentChildren.length) {
            throw new Error('Index out of bounds');
        }
        if (currentIndex !== index) {
            parentChildren.splice(currentIndex, 1);
            parentChildren.splice(index, 0, child);
            child.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return child;
    }

    function MoveChildUp(parent, child) {
        var parentChildren = parent.children;
        var currentIndex = GetChildIndex(parent, child);
        if (currentIndex !== -1 && currentIndex > 0) {
            var child2 = parentChildren[currentIndex + 1];
            var index2 = parentChildren.indexOf(child2);
            parentChildren[currentIndex] = child2;
            parentChildren[index2] = child;
            child.setDirty(DIRTY_CONST.TRANSFORM);
            child2.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return child;
    }

    function RectangleToRectangle(rectA, rectB) {
        if (rectA.width <= 0 || rectA.height <= 0 || rectB.width <= 0 || rectB.height <= 0) {
            return false;
        }
        return !(rectA.right < rectB.x || rectA.bottom < rectB.y || rectA.x > rectB.right || rectA.y > rectB.bottom);
    }

    function Overlap(source) {
        var targets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            targets[_i - 1] = arguments[_i];
        }
        var sourceBounds = source.bounds.get();
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            var targetBounds = target.bounds.get();
            if (RectangleToRectangle(sourceBounds, targetBounds)) {
                return true;
            }
        }
        return false;
    }

    function RemoveChildren(parent) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            RemoveChild(parent, child);
        });
        return children;
    }

    function RemoveChildrenAt(parent) {
        var index = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            index[_i - 1] = arguments[_i];
        }
        var removed = [];
        index.sort(function (a, b) { return a - b; });
        index.reverse().forEach(function (i) {
            var child = RemoveChildAt(parent, i);
            if (child) {
                removed.push(child);
            }
        });
        return removed;
    }

    function ReparentChildren(parent, newParent, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        var moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
        SetParent.apply(void 0, __spreadArray([newParent], __read(moved)));
        moved.forEach(function (child) {
            child.transform.updateWorld();
        });
        return moved;
    }

    function RotateChildrenLeft(parent, total) {
        if (total === void 0) { total = 1; }
        var parentChildren = parent.children;
        var child = null;
        for (var i = 0; i < total; i++) {
            child = parentChildren.shift();
            parentChildren.push(child);
            child.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return child;
    }

    function RotateChildrenRight(parent, total) {
        if (total === void 0) { total = 1; }
        var parentChildren = parent.children;
        var child = null;
        for (var i = 0; i < total; i++) {
            child = parentChildren.pop();
            parentChildren.unshift(child);
            child.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return child;
    }

    function SendChildToBack(parent, child) {
        var parentChildren = parent.children;
        var currentIndex = GetChildIndex(parent, child);
        if (currentIndex !== -1 && currentIndex > 0) {
            parentChildren.splice(currentIndex, 1);
            parentChildren.unshift(child);
            child.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return child;
    }

    function SetBounds(x, y, width, height) {
        var children = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            children[_i - 4] = arguments[_i];
        }
        children.forEach(function (child) {
            child.bounds.set(x, y, width, height);
        });
        return children;
    }

    function SetChildrenValue(parent, property, value) {
        var children = DepthFirstSearch(parent);
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor) {
                descriptor.set(value);
            }
        });
        return children;
    }

    function SetName(name) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            child.name = name;
        });
        return children;
    }

    function SetOrigin(originX, originY) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            child.setOrigin(originX, originY);
        });
        return children;
    }

    function SetPosition(x, y) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            child.setPosition(x, y);
        });
        return children;
    }

    function SetRotation(rotation) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            child.rotation = rotation;
        });
        return children;
    }

    function SetScale(scaleX, scaleY) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            child.setScale(scaleX, scaleY);
        });
        return children;
    }

    function SetSize(width, height) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            child.setSize(width, height);
        });
        return children;
    }

    function SetSkew(skewX, skewY) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            child.setSkew(skewX, skewY);
        });
        return children;
    }

    function SetType(type) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            child.type = type;
        });
        return children;
    }

    function SetValue(property, value) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor) {
                descriptor.set(value);
            }
        });
        return children;
    }

    function SetVisible(visible) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            child.visible = visible;
        });
        return children;
    }

    function ShuffleChildren(parent) {
        var children = parent.children;
        for (var i = children.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = children[i];
            children[i] = children[j];
            children[j] = temp;
            temp.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return children;
    }

    function SwapChildren(child1, child2) {
        if (child1.parent === child2.parent) {
            var children = child1.parent.children;
            var index1 = GetChildIndex(child1.parent, child1);
            var index2 = GetChildIndex(child2.parent, child2);
            if (index1 !== index2) {
                children[index1] = child2;
                children[index2] = child1;
            }
        }
    }

    var index$z = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AddChild: AddChild,
        AddChildAt: AddChildAt,
        AddChildren: AddChildren,
        AddChildrenAt: AddChildrenAt,
        AddPosition: AddPosition,
        AddRotation: AddRotation,
        AddScale: AddScale,
        AddSkew: AddSkew,
        BringChildToTop: BringChildToTop,
        ConsoleTreeChildren: ConsoleTreeChildren,
        CountMatchingChildren: CountMatchingChildren,
        DepthFirstSearch: DepthFirstSearch,
        DepthFirstSearchRecursive: DepthFirstSearchRecursive,
        DepthFirstSearchRecursiveNested: DepthFirstSearchRecursiveNested,
        DestroyChildren: DestroyChildren,
        FindChildByName: FindChildByName,
        FindChildrenByName: FindChildrenByName,
        GetAllChildren: GetAllChildren,
        GetChildAt: GetChildAt,
        GetChildIndex: GetChildIndex,
        GetChildren: GetChildren,
        GetClosestChild: GetClosestChild,
        GetFirstChild: GetFirstChild,
        GetFurthestChild: GetFurthestChild,
        GetLastChild: GetLastChild,
        GetParents: GetParents,
        GetRandomChild: GetRandomChild,
        MoveChildDown: MoveChildDown,
        MoveChildTo: MoveChildTo,
        MoveChildUp: MoveChildUp,
        Overlap: Overlap,
        RemoveChild: RemoveChild,
        RemoveChildAt: RemoveChildAt,
        RemoveChildren: RemoveChildren,
        RemoveChildrenAt: RemoveChildrenAt,
        RemoveChildrenBetween: RemoveChildrenBetween,
        ReparentChildren: ReparentChildren,
        RotateChildrenLeft: RotateChildrenLeft,
        RotateChildrenRight: RotateChildrenRight,
        SendChildToBack: SendChildToBack,
        SetBounds: SetBounds,
        SetChildrenValue: SetChildrenValue,
        SetName: SetName,
        SetOrigin: SetOrigin,
        SetParent: SetParent,
        SetPosition: SetPosition,
        SetRotation: SetRotation,
        SetScale: SetScale,
        SetSize: SetSize,
        SetSkew: SetSkew,
        SetType: SetType,
        SetValue: SetValue,
        SetVisible: SetVisible,
        SetWorld: SetWorld,
        ShuffleChildren: ShuffleChildren,
        SwapChildren: SwapChildren
    });

    function DepthFirstSearch3D(parent) {
        var stack = [parent];
        var output = [];
        while (stack.length > 0) {
            var node = stack.shift();
            output.push(node);
            var numChildren = node.numChildren;
            if (numChildren > 0) {
                for (var i = numChildren - 1; i >= 0; i--) {
                    stack.unshift(node.children[i]);
                }
            }
        }
        output.shift();
        return output;
    }

    function GetChild3DIndex(parent, child) {
        return parent.children.indexOf(child);
    }

    function RemoveChild3DAt(parent, index) {
        var children = parent.children;
        var child;
        if (index >= 0 && index < children.length) {
            var removed = children.splice(index, 1);
            if (removed[0]) {
                child = removed[0];
                child.parent = null;
            }
        }
        return child;
    }

    function RemoveChild3D(parent, child) {
        var currentIndex = GetChild3DIndex(parent, child);
        if (currentIndex > -1) {
            RemoveChild3DAt(parent, currentIndex);
        }
        return child;
    }

    function SetWorld3D(world) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            if (child.world) {
                Emit(child.world, RemovedFromWorldEvent, child, child.world);
                Emit(child, RemovedFromWorldEvent, child, child.world);
            }
            child.world = world;
            Emit(world, AddedToWorldEvent, child, world);
            Emit(child, AddedToWorldEvent, child, world);
        });
        return children;
    }

    function SetParent3D(parent) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            if (child.parent) {
                RemoveChild3D(child.parent, child);
            }
            child.parent = parent;
        });
        var parentWorld = parent.world;
        if (parentWorld) {
            SetWorld3D.apply(void 0, __spreadArray([parentWorld], __read(DepthFirstSearch3D(parent))));
        }
        return children;
    }

    function AddChild3D(parent, child) {
        parent.children.push(child);
        SetParent3D(parent, child);
        return child;
    }

    function AddChild3DAt(parent, index, child) {
        var children = parent.children;
        if (index >= 0 && index <= children.length) {
            SetParent3D(parent, child);
            children.splice(index, 0, child);
        }
        return child;
    }

    function AddChildren3D(parent) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            AddChild3D(parent, child);
        });
        return children;
    }

    function AddChildren3DAt(parent, index) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var parentChildren = parent.children;
        if (index >= 0 && index <= parentChildren.length) {
            children.reverse().forEach(function (child) {
                children.splice(index, 0, child);
                SetParent3D(parent, child);
            });
        }
        return children;
    }

    function DepthFirstSearchRecursiveNested3D(parent, output) {
        if (output === void 0) { output = []; }
        for (var i = 0; i < parent.numChildren; i++) {
            var node = parent.children[i];
            var children = [];
            output.push({ node: node, children: children });
            if (node.numChildren > 0) {
                DepthFirstSearchRecursiveNested3D(node, children);
            }
        }
        return output;
    }

    function GetInfo(entry) {
        var legend = (entry.numChildren > 0) ? 'Parent' : 'Child';
        return legend + " [ type=" + entry.type + ", name=" + entry.name + " ]";
    }
    function LogChildren(entry) {
        console.group(GetInfo(entry.node));
        entry.children.forEach(function (child) {
            if (child.children.length > 0) {
                LogChildren(child);
            }
            else {
                console.log(GetInfo(child.node));
            }
        });
        console.groupEnd();
    }
    function ConsoleTreeChildren3D(parent) {
        var entries = DepthFirstSearchRecursiveNested3D(parent);
        if (parent.world === parent) {
            console.group('World');
        }
        else {
            console.group(GetInfo(parent));
        }
        entries.forEach(function (entry) {
            if (entry.children.length) {
                LogChildren(entry);
            }
            else {
                console.log(GetInfo(entry.node));
            }
        });
        console.groupEnd();
    }

    function CountMatchingChildren3D(parent, property, value) {
        var children = parent.children;
        var total = 0;
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                total++;
            }
        });
        return total;
    }

    function DepthFirstSearchRecursive3D(parent, output) {
        if (output === void 0) { output = []; }
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.children[i];
            output.push(child);
            if (child.numChildren > 0) {
                DepthFirstSearchRecursive3D(child, output);
            }
        }
        return output;
    }

    function RemoveChildren3DBetween(parent, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        var children = parent.children;
        if (endIndex === undefined) {
            endIndex = children.length;
        }
        var range = endIndex - beginIndex;
        if (range > 0 && range <= endIndex) {
            var removed = children.splice(beginIndex, range);
            removed.forEach(function (child) {
                child.parent = null;
            });
            return removed;
        }
        else {
            return [];
        }
    }

    function DestroyChildren3D(parent, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        var removed = RemoveChildren3DBetween(parent, beginIndex, endIndex);
        removed.forEach(function (child) {
            child.destroy();
        });
    }

    function FindChild3DByName(parent, searchString) {
        var children = DepthFirstSearch3D(parent);
        var regex = RegExp(searchString);
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (regex.test(child.name)) {
                return child;
            }
        }
    }

    function FindChildren3DByName(parent, searchString) {
        var children = DepthFirstSearch3D(parent);
        var regex = RegExp(searchString);
        var results = [];
        children.forEach(function (child) {
            if (regex.test(child.name)) {
                results.push(child);
            }
        });
        return results;
    }

    function GetAllChildren3D(parent, property, value) {
        var children = DepthFirstSearch3D(parent);
        if (!property) {
            return children;
        }
        var results = [];
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                results.push(child);
            }
        });
        return results;
    }

    function GetChild3DAt(parent, index) {
        var children = parent.children;
        if (index < 0 || index > children.length) {
            throw new Error("Index out of bounds: " + index);
        }
        return children[index];
    }

    function GetChildren3D(parent, property, value) {
        var children = parent.children;
        if (!property) {
            return __spreadArray([], __read(children));
        }
        var results = [];
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                results.push(child);
            }
        });
        return results;
    }

    function GetFirstChild3D(parent, property, value) {
        var children = parent.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                return child;
            }
        }
    }

    function GetLastChild3D(parent, property, value) {
        var children = parent.children;
        for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i];
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor && (value === undefined || value === descriptor.value)) {
                return child;
            }
        }
    }

    function GetParents3D(child) {
        var parents = [];
        while (child.parent) {
            parents.push(child.parent);
            child = child.parent;
        }
        return parents;
    }

    function GetRandomChild3D(parent, startIndex, length) {
        if (startIndex === void 0) { startIndex = 0; }
        var children = parent.children;
        if (!length) {
            length = children.length;
        }
        var randomIndex = startIndex + Math.floor(Math.random() * length);
        return children[randomIndex];
    }

    function MoveChild3DTo(parent, child, index) {
        var parentChildren = parent.children;
        var currentIndex = GetChild3DIndex(parent, child);
        if (currentIndex === -1 || index < 0 || index >= parentChildren.length) {
            throw new Error('Index out of bounds');
        }
        if (currentIndex !== index) {
            parentChildren.splice(currentIndex, 1);
            parentChildren.splice(index, 0, child);
            child.setDirty(DIRTY_CONST.TRANSFORM);
        }
        return child;
    }

    function RemoveChildren3D(parent) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        children.forEach(function (child) {
            RemoveChild3D(parent, child);
        });
        return children;
    }

    function RemoveChildren3DAt(parent) {
        var index = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            index[_i - 1] = arguments[_i];
        }
        var removed = [];
        index.sort(function (a, b) { return a - b; });
        index.reverse().forEach(function (i) {
            var child = RemoveChild3DAt(parent, i);
            if (child) {
                removed.push(child);
            }
        });
        return removed;
    }

    function ReparentChildren3D(parent, newParent, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        var moved = RemoveChildren3DBetween(parent, beginIndex, endIndex);
        SetParent3D.apply(void 0, __spreadArray([newParent], __read(moved)));
        moved.forEach(function (child) {
        });
        return moved;
    }

    function ReplaceChild3D(target, source) {
        var targetParent = target.parent;
        var sourceParent = source.parent;
        var targetIndex = GetChild3DIndex(targetParent, target);
        if (targetParent === sourceParent) {
            MoveChild3DTo(targetParent, source, targetIndex);
            RemoveChild3D(targetParent, target);
        }
        else {
            RemoveChild3D(targetParent, target);
            RemoveChild3D(sourceParent, source);
            AddChild3DAt(targetParent, targetIndex, source);
        }
        return target;
    }

    function SetChildren3DValue(parent, property, value) {
        var children = DepthFirstSearch3D(parent);
        children.forEach(function (child) {
            var descriptor = Object.getOwnPropertyDescriptor(child, property);
            if (descriptor) {
                descriptor.set(value);
            }
        });
        return children;
    }

    function SwapChildren3D(child1, child2) {
        if (child1.parent === child2.parent) {
            var children = child1.parent.children;
            var index1 = GetChild3DIndex(child1.parent, child1);
            var index2 = GetChild3DIndex(child2.parent, child2);
            if (index1 !== index2) {
                children[index1] = child2;
                children[index2] = child1;
            }
        }
    }

    var index$y = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AddChild3D: AddChild3D,
        AddChild3DAt: AddChild3DAt,
        AddChildren3D: AddChildren3D,
        AddChildren3DAt: AddChildren3DAt,
        ConsoleTreeChildren3D: ConsoleTreeChildren3D,
        CountMatchingChildren3D: CountMatchingChildren3D,
        DepthFirstSearch3D: DepthFirstSearch3D,
        DepthFirstSearchRecursive3D: DepthFirstSearchRecursive3D,
        DepthFirstSearchRecursiveNested3D: DepthFirstSearchRecursiveNested3D,
        DestroyChildren3D: DestroyChildren3D,
        FindChild3DByName: FindChild3DByName,
        FindChildren3DByName: FindChildren3DByName,
        GetAllChildren3D: GetAllChildren3D,
        GetChild3DAt: GetChild3DAt,
        GetChild3DIndex: GetChild3DIndex,
        GetChildren3D: GetChildren3D,
        GetFirstChild3D: GetFirstChild3D,
        GetLastChild3D: GetLastChild3D,
        GetParents3D: GetParents3D,
        GetRandomChild3D: GetRandomChild3D,
        MoveChild3DTo: MoveChild3DTo,
        RemoveChild3D: RemoveChild3D,
        RemoveChild3DAt: RemoveChild3DAt,
        RemoveChildren3D: RemoveChildren3D,
        RemoveChildren3DAt: RemoveChildren3DAt,
        RemoveChildren3DBetween: RemoveChildren3DBetween,
        ReparentChildren3D: ReparentChildren3D,
        ReplaceChild3D: ReplaceChild3D,
        SetChildren3DValue: SetChildren3DValue,
        SetParent3D: SetParent3D,
        SetWorld3D: SetWorld3D,
        SwapChildren3D: SwapChildren3D
    });

    function ClearEvent(emitter, event) {
        emitter.events.delete(event);
        return emitter;
    }

    var EventEmitter = (function () {
        function EventEmitter() {
            this.events = new Map();
        }
        return EventEmitter;
    }());

    var EventInstance = (function () {
        function EventInstance(callback, context, once) {
            if (once === void 0) { once = false; }
            this.callback = callback;
            this.context = context;
            this.once = once;
        }
        return EventInstance;
    }());

    function GetEventNames(emitter) {
        return __spreadArray([], __read(emitter.events.keys()));
    }

    function GetListenerCount(emitter, event) {
        var listeners = emitter.events.get(event);
        return (listeners) ? listeners.size : 0;
    }

    function GetListeners(emitter, event) {
        var out = [];
        var listeners = emitter.events.get(event);
        listeners.forEach(function (listener) {
            out.push(listener.callback);
        });
        return out;
    }

    function Off(emitter, event, callback, context, once) {
        var e_1, _a;
        var events = emitter.events;
        var listeners = events.get(event);
        if (!callback) {
            events.delete(event);
        }
        else if (callback instanceof EventInstance) {
            listeners.delete(callback);
        }
        else {
            var hasContext = !context;
            var hasOnce = (once !== undefined);
            try {
                for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                    var listener = listeners_1_1.value;
                    if ((listener.callback === callback) &&
                        (hasContext && listener.context === context) &&
                        (hasOnce && listener.once === once)) {
                        listeners.delete(listener);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (listeners.size === 0) {
            events.delete(event);
        }
        return emitter;
    }

    function On(emitter, event, callback, context, once) {
        if (context === void 0) { context = emitter; }
        if (once === void 0) { once = false; }
        if (typeof callback !== 'function') {
            throw new TypeError('Listener not a function');
        }
        var listener = new EventInstance(callback, context, once);
        var listeners = emitter.events.get(event);
        if (!listeners) {
            emitter.events.set(event, new Set([listener]));
        }
        else {
            listeners.add(listener);
        }
        return listener;
    }

    function Once(emitter, event, callback, context) {
        if (context === void 0) { context = emitter; }
        return On(emitter, event, callback, context, true);
    }

    function RemoveAllListeners(emitter, event) {
        if (!event) {
            emitter.events.clear();
        }
        else {
            emitter.events.delete(event);
        }
    }

    var index$x = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ClearEvent: ClearEvent,
        Emit: Emit,
        EventEmitter: EventEmitter,
        EventInstance: EventInstance,
        GetEventNames: GetEventNames,
        GetListenerCount: GetListenerCount,
        GetListeners: GetListeners,
        Off: Off,
        On: On,
        Once: Once,
        RemoveAllListeners: RemoveAllListeners
    });

    function GetVertices(transform) {
        var _a = transform.world, a = _a.a, b = _a.b, c = _a.c, d = _a.d, tx = _a.tx, ty = _a.ty;
        var _b = transform.extent, x = _b.x, y = _b.y, right = _b.right, bottom = _b.bottom;
        var x0 = (x * a) + (y * c) + tx;
        var y0 = (x * b) + (y * d) + ty;
        var x1 = (x * a) + (bottom * c) + tx;
        var y1 = (x * b) + (bottom * d) + ty;
        var x2 = (right * a) + (bottom * c) + tx;
        var y2 = (right * b) + (bottom * d) + ty;
        var x3 = (right * a) + (y * c) + tx;
        var y3 = (right * b) + (y * d) + ty;
        return { x0: x0, y0: y0, x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3 };
    }

    var BoundsComponent = (function () {
        function BoundsComponent(entity) {
            this.fixed = false;
            this.includeChildren = true;
            this.visibleOnly = true;
            this.entity = entity;
            this.area = new Rectangle$1();
        }
        BoundsComponent.prototype.set = function (x, y, width, height) {
            this.area.set(x, y, width, height);
        };
        BoundsComponent.prototype.get = function () {
            if (this.entity.isDirty(DIRTY_CONST.BOUNDS) && !this.fixed) {
                this.update();
            }
            return this.area;
        };
        BoundsComponent.prototype.updateLocal = function () {
            var _a = GetVertices(this.entity.transform), x0 = _a.x0, y0 = _a.y0, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, x3 = _a.x3, y3 = _a.y3;
            var x = Math.min(x0, x1, x2, x3);
            var y = Math.min(y0, y1, y2, y3);
            var right = Math.max(x0, x1, x2, x3);
            var bottom = Math.max(y0, y1, y2, y3);
            return this.area.set(x, y, right - x, bottom - y);
        };
        BoundsComponent.prototype.update = function () {
            var bounds = this.updateLocal();
            this.entity.clearDirty(DIRTY_CONST.BOUNDS);
            if (!this.includeChildren || !this.entity.numChildren) {
                return bounds;
            }
            var visibleOnly = this.visibleOnly;
            var children = this.entity.children;
            var x = bounds.x;
            var y = bounds.y;
            var right = bounds.right;
            var bottom = bounds.bottom;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (!child || (visibleOnly && !child.visible)) {
                    continue;
                }
                var childBounds = child.bounds.get();
                if (childBounds.x < x) {
                    x = childBounds.x;
                }
                if (childBounds.y < y) {
                    y = childBounds.y;
                }
                if (childBounds.right > right) {
                    right = childBounds.right;
                }
                if (childBounds.bottom > bottom) {
                    bottom = childBounds.bottom;
                }
            }
            return bounds.set(x, y, right - x, bottom - y);
        };
        BoundsComponent.prototype.destroy = function () {
            this.entity = null;
            this.area = null;
        };
        return BoundsComponent;
    }());

    var index$w = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BoundsComponent: BoundsComponent
    });

    var InputComponent = (function () {
        function InputComponent(entity) {
            this.enabled = false;
            this.enabledChildren = true;
            this.entity = entity;
        }
        InputComponent.prototype.destroy = function () {
            this.entity = null;
            this.hitArea = null;
        };
        return InputComponent;
    }());

    var index$v = /*#__PURE__*/Object.freeze({
        __proto__: null,
        InputComponent: InputComponent
    });

    function GetVerticesFromValues(left, right, top, bottom, x, y, rotation, scaleX, scaleY, skewX, skewY) {
        if (rotation === void 0) { rotation = 0; }
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        if (skewX === void 0) { skewX = 0; }
        if (skewY === void 0) { skewY = 0; }
        var a = Math.cos(rotation + skewY) * scaleX;
        var b = Math.sin(rotation + skewY) * scaleX;
        var c = -Math.sin(rotation - skewX) * scaleY;
        var d = Math.cos(rotation - skewX) * scaleY;
        var x0 = (left * a) + (top * c) + x;
        var y0 = (left * b) + (top * d) + y;
        var x1 = (left * a) + (bottom * c) + x;
        var y1 = (left * b) + (bottom * d) + y;
        var x2 = (right * a) + (bottom * c) + x;
        var y2 = (right * b) + (bottom * d) + y;
        var x3 = (right * a) + (top * c) + x;
        var y3 = (right * b) + (top * d) + y;
        return { x0: x0, y0: y0, x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3 };
    }

    function PackColors(vertices) {
        vertices.forEach(function (vertex) {
            vertex.packColor();
        });
    }

    function UpdateVertices(gameObject) {
        var vertices = gameObject.vertices;
        var _a = GetVertices(gameObject.transform), x0 = _a.x0, y0 = _a.y0, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, x3 = _a.x3, y3 = _a.y3;
        vertices[0].setPosition(x0, y0);
        vertices[1].setPosition(x1, y1);
        vertices[2].setPosition(x2, y2);
        vertices[3].setPosition(x3, y3);
        return gameObject;
    }

    function PreRenderVertices(gameObject) {
        if (gameObject.isDirty(DIRTY_CONST.COLORS)) {
            PackColors(gameObject.vertices);
            gameObject.clearDirty(DIRTY_CONST.COLORS);
        }
        if (gameObject.isDirty(DIRTY_CONST.TRANSFORM)) {
            UpdateVertices(gameObject);
            gameObject.clearDirty(DIRTY_CONST.TRANSFORM);
        }
        return gameObject;
    }

    function GetDefaultOriginX() {
        return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
    }

    function GetDefaultOriginY() {
        return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
    }

    function CeilRectangle(rect) {
        rect.x = Math.ceil(rect.x);
        rect.y = Math.ceil(rect.y);
        rect.width = Math.ceil(rect.width);
        rect.height = Math.ceil(rect.height);
        return rect;
    }

    function CeilRectanglePosition(rect) {
        rect.x = Math.ceil(rect.x);
        rect.y = Math.ceil(rect.y);
        return rect;
    }

    function CenterRectangleOn(rect, x, y) {
        rect.x = x - (rect.width / 2);
        rect.y = y - (rect.height / 2);
        return rect;
    }

    function CloneRectangle(source) {
        return new Rectangle$1(source.x, source.y, source.width, source.height);
    }

    function CopyRectangleFrom(source, dest) {
        return dest.set(source.x, source.y, source.width, source.height);
    }

    function DecomposeRectangle(rect, out) {
        if (out === void 0) { out = []; }
        out.push(new Vec2(rect.x, rect.y), new Vec2(rect.right, rect.y), new Vec2(rect.right, rect.bottom), new Vec2(rect.x, rect.bottom));
        return out;
    }

    function GetRectangleAspectRatio(rect) {
        return (rect.height === 0) ? NaN : rect.width / rect.height;
    }

    function GetRectangleCenterX(rect) {
        return rect.x + (rect.width / 2);
    }

    function GetRectangleCenterY(rect) {
        return rect.y + (rect.height / 2);
    }

    function FitRectangleInside(target, source) {
        var ratio = GetRectangleAspectRatio(target);
        var width = source.width;
        var height = source.height;
        if (ratio < GetRectangleAspectRatio(source)) {
            width = source.height * ratio;
        }
        else {
            height = source.width / ratio;
        }
        return target.set(GetRectangleCenterX(source) - (target.width / 2), GetRectangleCenterY(source) - (target.height / 2), width, height);
    }

    function FitRectangleOutside(target, source) {
        var ratio = GetRectangleAspectRatio(target);
        var width = source.width;
        var height = source.height;
        if (ratio > GetRectangleAspectRatio(source)) {
            width = source.height * ratio;
        }
        else {
            height = source.width / ratio;
        }
        return target.set(GetRectangleCenterX(source) - target.width / 2, GetRectangleCenterY(source) - target.height / 2, width, height);
    }

    function FitRectangleToPoint(target, x, y) {
        var minX = Math.min(target.x, x);
        var maxX = Math.max(target.right, x);
        var minY = Math.min(target.y, y);
        var maxY = Math.max(target.bottom, y);
        return target.set(minX, minY, maxX - minX, maxY - minY);
    }

    function FitRectangleToPoints(target, points) {
        var minX = target.x;
        var maxX = target.right;
        var minY = target.y;
        var maxY = target.bottom;
        for (var i = 0; i < points.length; i++) {
            minX = Math.min(minX, points[i].x);
            maxX = Math.max(maxX, points[i].x);
            minY = Math.min(minY, points[i].y);
            maxY = Math.max(maxY, points[i].y);
        }
        return target.set(minX, minY, maxX - minX, maxY - minY);
    }

    function FloorRectangle(rect) {
        rect.x = Math.floor(rect.x);
        rect.y = Math.floor(rect.y);
        rect.width = Math.floor(rect.width);
        rect.height = Math.floor(rect.height);
        return rect;
    }

    function FloorRectanglePosition(rect) {
        rect.x = Math.floor(rect.x);
        rect.y = Math.floor(rect.y);
        return rect;
    }

    function GetRectangleArea(rect) {
        return rect.width * rect.height;
    }

    function GetRectangleCenter(rect, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(GetRectangleCenterX(rect), GetRectangleCenterY(rect));
    }

    var Line = (function () {
        function Line(x1, y1, x2, y2) {
            if (x1 === void 0) { x1 = 0; }
            if (y1 === void 0) { y1 = 0; }
            if (x2 === void 0) { x2 = 0; }
            if (y2 === void 0) { y2 = 0; }
            this.set(x1, y1, x2, y2);
        }
        Line.prototype.set = function (x1, y1, x2, y2) {
            if (x1 === void 0) { x1 = 0; }
            if (y1 === void 0) { y1 = 0; }
            if (x2 === void 0) { x2 = 0; }
            if (y2 === void 0) { y2 = 0; }
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            return this;
        };
        Object.defineProperty(Line.prototype, "left", {
            get: function () {
                return Math.min(this.x1, this.x2);
            },
            set: function (value) {
                if (this.x1 <= this.x2) {
                    this.x1 = value;
                }
                else {
                    this.x2 = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "right", {
            get: function () {
                return Math.max(this.x1, this.x2);
            },
            set: function (value) {
                if (this.x1 > this.x2) {
                    this.x1 = value;
                }
                else {
                    this.x2 = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "top", {
            get: function () {
                return Math.min(this.y1, this.y2);
            },
            set: function (value) {
                if (this.y1 <= this.y2) {
                    this.y1 = value;
                }
                else {
                    this.y2 = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "bottom", {
            get: function () {
                return Math.max(this.y1, this.y2);
            },
            set: function (value) {
                if (this.y1 > this.y2) {
                    this.y1 = value;
                }
                else {
                    this.y2 = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        return Line;
    }());

    function GetRectangleEdges(rectangle) {
        var x = rectangle.x, y = rectangle.y, right = rectangle.right, bottom = rectangle.bottom;
        var line1 = new Line(x, y, right, y);
        var line2 = new Line(right, y, right, bottom);
        var line3 = new Line(right, bottom, x, bottom);
        var line4 = new Line(x, bottom, x, y);
        return [line1, line2, line3, line4];
    }

    function GetRectangleIntersection$1(rectA, rectB, out) {
        if (out === void 0) { out = new Rectangle$1(); }
        if (RectangleToRectangle(rectA, rectB)) {
            out.set(Math.max(rectA.x, rectB.x), Math.max(rectA.y, rectB.y), Math.min(rectA.right, rectB.right) - out.x, Math.min(rectA.bottom, rectB.bottom) - out.y);
        }
        else {
            out.set();
        }
        return out;
    }

    function GetRectanglePerimeter(rect) {
        return 2 * (rect.width + rect.height);
    }

    function GetRectangleMarchingAnts(rect, step, quantity, out) {
        if (out === void 0) { out = []; }
        if (!step && !quantity) {
            return out;
        }
        if (!step) {
            step = GetRectanglePerimeter(rect) / quantity;
        }
        else {
            quantity = Math.round(GetRectanglePerimeter(rect) / step);
        }
        var x = rect.x;
        var y = rect.y;
        var face = 0;
        for (var i = 0; i < quantity; i++) {
            out.push(new Vec2(x, y));
            switch (face) {
                case 0:
                    x += step;
                    if (x >= rect.right) {
                        face = 1;
                        y += (x - rect.right);
                        x = rect.right;
                    }
                    break;
                case 1:
                    y += step;
                    if (y >= rect.bottom) {
                        face = 2;
                        x -= (y - rect.bottom);
                        y = rect.bottom;
                    }
                    break;
                case 2:
                    x -= step;
                    if (x <= rect.x) {
                        face = 3;
                        y -= (rect.x - x);
                        x = rect.x;
                    }
                    break;
                case 3:
                    y -= step;
                    if (y <= rect.y) {
                        face = 0;
                        y = rect.y;
                    }
                    break;
            }
        }
        return out;
    }

    function GetRectangleOverlap(rectA, rectB) {
        return (rectA.x < rectB.right &&
            rectA.right > rectB.x &&
            rectA.y < rectB.bottom &&
            rectA.bottom > rectB.y);
    }

    function GetRectanglePerimeterPoint(rectangle, angle, out) {
        if (out === void 0) { out = new Vec2(); }
        angle = DegToRad(angle);
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var dx = (c > 0) ? rectangle.width / 2 : rectangle.width / -2;
        var dy = (s > 0) ? rectangle.height / 2 : rectangle.height / -2;
        if (Math.abs(dx * s) < Math.abs(dy * c)) {
            dy = (dx * s) / c;
        }
        else {
            dx = (dy * c) / s;
        }
        return out.set(dx + GetRectangleCenterX(rectangle), dy + GetRectangleCenterY(rectangle));
    }

    function GetRectanglePoint(rectangle, position, out) {
        if (out === void 0) { out = new Vec2(); }
        if (position <= 0 || position >= 1) {
            return out.set(rectangle.x, rectangle.y);
        }
        var p = GetRectanglePerimeter(rectangle) * position;
        if (position > 0.5) {
            p -= (rectangle.width + rectangle.height);
            if (p <= rectangle.width) {
                return out.set(rectangle.right - p, rectangle.bottom);
            }
            else {
                return out.set(rectangle.x, rectangle.bottom - (p - rectangle.width));
            }
        }
        else if (p <= rectangle.width) {
            return out.set(rectangle.x + p, rectangle.y);
        }
        else {
            return out.set(rectangle.right, rectangle.y + (p - rectangle.width));
        }
    }

    function GetRectanglePoints(rectangle, step, quantity, out) {
        if (quantity === void 0) { quantity = 0; }
        if (out === void 0) { out = []; }
        if (!quantity) {
            quantity = GetRectanglePerimeter(rectangle) / step;
        }
        for (var i = 0; i < quantity; i++) {
            out.push(GetRectanglePoint(rectangle, i / quantity));
        }
        return out;
    }

    function GetRectangleRandomPoint(rect, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(rect.x + (Math.random() * rect.width), rect.y + (Math.random() * rect.height));
    }

    function RectangleContainsRectangle(rectA, rectB) {
        if ((rectB.width * rectB.height) > (rectA.width * rectA.height)) {
            return false;
        }
        return ((rectB.x > rectA.x && rectB.x < rectA.right) &&
            (rectB.right > rectA.x && rectB.right < rectA.right) &&
            (rectB.y > rectA.y && rectB.y < rectA.bottom) &&
            (rectB.bottom > rectA.y && rectB.bottom < rectA.bottom));
    }

    function GetRectangleRandomPointOutside(outer, inner, out) {
        if (out === void 0) { out = new Vec2(); }
        if (RectangleContainsRectangle(outer, inner)) {
            switch (Between(0, 3)) {
                case 0:
                    out.x = outer.x + (Math.random() * (inner.right - outer.x));
                    out.y = outer.y + (Math.random() * (inner.y - outer.y));
                    break;
                case 1:
                    out.x = inner.x + (Math.random() * (outer.right - inner.x));
                    out.y = inner.bottom + (Math.random() * (outer.bottom - inner.bottom));
                    break;
                case 2:
                    out.x = outer.x + (Math.random() * (inner.x - outer.x));
                    out.y = inner.y + (Math.random() * (outer.bottom - inner.y));
                    break;
                case 3:
                    out.x = inner.right + (Math.random() * (outer.right - inner.right));
                    out.y = outer.y + (Math.random() * (inner.bottom - outer.y));
                    break;
            }
        }
        return out;
    }

    function GetRectangleSize(rect, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(rect.width, rect.height);
    }

    function GetRectangleUnion(rectA, rectB, out) {
        if (out === void 0) { out = new Rectangle$1(); }
        var x = Math.min(rectA.x, rectB.x);
        var y = Math.min(rectA.y, rectB.y);
        var w = Math.max(rectA.right, rectB.right) - x;
        var h = Math.max(rectA.bottom, rectB.bottom) - y;
        return out.set(x, y, w, h);
    }

    function InflateRectangle(rect, x, y) {
        var cx = GetRectangleCenterX(rect);
        var cy = GetRectangleCenterY(rect);
        rect.width = rect.width + (x * 2);
        rect.height = rect.height + (y * 2);
        return CenterRectangleOn(rect, cx, cy);
    }

    function MergeRectangle(target, source) {
        var minX = Math.min(target.x, source.x);
        var maxX = Math.max(target.right, source.right);
        var minY = Math.min(target.y, source.y);
        var maxY = Math.max(target.bottom, source.bottom);
        return target.set(minX, minY, maxX - minX, maxY - minY);
    }

    function RectangleContainsPoint(rect, point) {
        return RectangleContains(rect, point.x, point.y);
    }

    function RectangleEquals(rect, toCompare) {
        return (rect.x === toCompare.x &&
            rect.y === toCompare.y &&
            rect.width === toCompare.width &&
            rect.height === toCompare.height);
    }

    function RectangleFromPoints(points, out) {
        if (out === void 0) { out = new Rectangle$1(); }
        if (points.length === 0) {
            return out;
        }
        var minX = Number.MAX_VALUE;
        var minY = Number.MAX_VALUE;
        var maxX = MATH_CONST.MIN_SAFE_INTEGER;
        var maxY = MATH_CONST.MIN_SAFE_INTEGER;
        for (var i = 0; i < points.length; i++) {
            var px = points[i].x;
            var py = points[i].y;
            minX = Math.min(minX, px);
            minY = Math.min(minY, py);
            maxX = Math.max(maxX, px);
            maxY = Math.max(maxY, py);
        }
        return out.set(minX, minY, maxX - minX, maxY - minY);
    }

    function RectangleSizeEquals(rect, toCompare) {
        return (rect.width === toCompare.width && rect.height === toCompare.height);
    }

    function ScaleRectangle(rect, x, y) {
        if (y === void 0) { y = x; }
        rect.width *= x;
        rect.height *= y;
        return rect;
    }

    function TranslateRectangle(rect, x, y) {
        rect.x += x;
        rect.y += y;
        return rect;
    }

    function TranslateRectanglePoint(rect, point) {
        rect.x += point.x;
        rect.y += point.y;
        return rect;
    }

    var index$u = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CeilRectangle: CeilRectangle,
        CeilRectanglePosition: CeilRectanglePosition,
        CenterRectangleOn: CenterRectangleOn,
        CloneRectangle: CloneRectangle,
        CopyRectangleFrom: CopyRectangleFrom,
        DecomposeRectangle: DecomposeRectangle,
        FitRectangleInside: FitRectangleInside,
        FitRectangleOutside: FitRectangleOutside,
        FitRectangleToPoint: FitRectangleToPoint,
        FitRectangleToPoints: FitRectangleToPoints,
        FloorRectangle: FloorRectangle,
        FloorRectanglePosition: FloorRectanglePosition,
        GetRectangleArea: GetRectangleArea,
        GetRectangleAspectRatio: GetRectangleAspectRatio,
        GetRectangleCenter: GetRectangleCenter,
        GetRectangleCenterX: GetRectangleCenterX,
        GetRectangleCenterY: GetRectangleCenterY,
        GetRectangleEdges: GetRectangleEdges,
        GetRectangleIntersection: GetRectangleIntersection$1,
        GetRectangleMarchingAnts: GetRectangleMarchingAnts,
        GetRectangleOverlap: GetRectangleOverlap,
        GetRectanglePerimeter: GetRectanglePerimeter,
        GetRectanglePerimeterPoint: GetRectanglePerimeterPoint,
        GetRectanglePoint: GetRectanglePoint,
        GetRectanglePoints: GetRectanglePoints,
        GetRectangleRandomPoint: GetRectangleRandomPoint,
        GetRectangleRandomPointOutside: GetRectangleRandomPointOutside,
        GetRectangleSize: GetRectangleSize,
        GetRectangleUnion: GetRectangleUnion,
        InflateRectangle: InflateRectangle,
        MergeRectangle: MergeRectangle,
        Rectangle: Rectangle$1,
        RectangleContains: RectangleContains,
        RectangleContainsPoint: RectangleContainsPoint,
        RectangleContainsRectangle: RectangleContainsRectangle,
        RectangleEquals: RectangleEquals,
        RectangleFromPoints: RectangleFromPoints,
        RectangleSizeEquals: RectangleSizeEquals,
        ScaleRectangle: ScaleRectangle,
        TranslateRectangle: TranslateRectangle,
        TranslateRectanglePoint: TranslateRectanglePoint
    });

    function UpdateLocalTransform(transform) {
        var local = transform.local;
        var x = transform.position.x;
        var y = transform.position.y;
        var rotation = transform.rotation;
        var scaleX = transform.scale.x;
        var scaleY = transform.scale.y;
        var skewX = transform.skew.x;
        var skewY = transform.skew.y;
        local.set(Math.cos(rotation + skewY) * scaleX, Math.sin(rotation + skewY) * scaleX, -Math.sin(rotation - skewX) * scaleY, Math.cos(rotation - skewX) * scaleY, x, y);
    }

    function UpdateWorldTransform(gameObject) {
        var parent = gameObject.parent;
        var transform = gameObject.transform;
        var lt = transform.local;
        var wt = transform.world;
        if (!parent) {
            Mat2dCopyFrom(lt, wt);
        }
        else if (transform.passthru) {
            Mat2dCopyFrom(parent.transform.world, wt);
        }
        else {
            var a = lt.a, b = lt.b, c = lt.c, d = lt.d, tx = lt.tx, ty = lt.ty;
            var _a = parent.transform.world, pa = _a.a, pb = _a.b, pc = _a.c, pd = _a.d, ptx = _a.tx, pty = _a.ty;
            wt.set(a * pa + b * pc, a * pb + b * pd, c * pa + d * pc, c * pb + d * pd, tx * pa + ty * pc + ptx, tx * pb + ty * pd + pty);
        }
    }

    var TransformComponent = (function () {
        function TransformComponent(entity, x, y) {
            var _this = this;
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.passthru = false;
            this._rotation = 0;
            this.entity = entity;
            this.local = new Matrix2D();
            this.world = new Matrix2D();
            var update = function () { return _this.update(); };
            var updateExtent = function () { return _this.updateExtent(); };
            this.position = new Vec2Callback(update, x, y);
            this.scale = new Vec2Callback(update, 1, 1);
            this.skew = new Vec2Callback(update);
            this.origin = new Vec2Callback(updateExtent, GetDefaultOriginX(), GetDefaultOriginY());
            this.extent = new Rectangle$1();
        }
        TransformComponent.prototype.update = function () {
            this.updateLocal();
            this.updateWorld();
        };
        TransformComponent.prototype.updateLocal = function () {
            this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
            UpdateLocalTransform(this);
        };
        TransformComponent.prototype.updateWorld = function () {
            var entity = this.entity;
            entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
            UpdateWorldTransform(entity);
            if (entity.numChildren) {
                this.updateChildren();
            }
        };
        TransformComponent.prototype.updateChildren = function () {
            var children = this.entity.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                child.transform.updateWorld();
            }
        };
        TransformComponent.prototype.globalToLocal = function (x, y, out) {
            if (out === void 0) { out = new Vec2(); }
            var _a = this.world, a = _a.a, b = _a.b, c = _a.c, d = _a.d, tx = _a.tx, ty = _a.ty;
            var id = 1 / ((a * d) + (c * -b));
            out.x = (d * id * x) + (-c * id * y) + (((ty * c) - (tx * d)) * id);
            out.y = (a * id * y) + (-b * id * x) + (((-ty * a) + (tx * b)) * id);
            return out;
        };
        TransformComponent.prototype.localToGlobal = function (x, y, out) {
            if (out === void 0) { out = new Vec2(); }
            var _a = this.world, a = _a.a, b = _a.b, c = _a.c, d = _a.d, tx = _a.tx, ty = _a.ty;
            out.x = (a * x) + (c * y) + tx;
            out.y = (b * x) + (d * y) + ty;
            return out;
        };
        TransformComponent.prototype.setExtent = function (x, y, width, height) {
            this.extent.set(x, y, width, height);
            this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
        };
        TransformComponent.prototype.updateExtent = function (width, height) {
            var extent = this.extent;
            var entity = this.entity;
            if (width !== undefined) {
                extent.width = width;
            }
            if (height !== undefined) {
                extent.height = height;
            }
            extent.x = -(this.origin.x) * extent.width;
            extent.y = -(this.origin.y) * extent.height;
            entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
        };
        Object.defineProperty(TransformComponent.prototype, "rotation", {
            get: function () {
                return this._rotation;
            },
            set: function (value) {
                if (value !== this._rotation) {
                    this._rotation = value;
                    this.update();
                }
            },
            enumerable: false,
            configurable: true
        });
        TransformComponent.prototype.destroy = function () {
            this.position.destroy();
            this.scale.destroy();
            this.skew.destroy();
            this.origin.destroy();
            this.entity = null;
            this.local = null;
            this.world = null;
            this.position = null;
            this.scale = null;
            this.skew = null;
            this.origin = null;
            this.extent = null;
        };
        return TransformComponent;
    }());

    var index$t = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetVertices: GetVertices,
        GetVerticesFromValues: GetVerticesFromValues,
        PreRenderVertices: PreRenderVertices,
        TransformComponent: TransformComponent,
        UpdateLocalTransform: UpdateLocalTransform,
        UpdateWorldTransform: UpdateWorldTransform,
        UpdateVertices: UpdateVertices
    });

    function PackColor(rgb, alpha) {
        var ua = ((alpha * 255) | 0) & 0xFF;
        return ((ua << 24) | rgb) >>> 0;
    }

    var Vertex = (function () {
        function Vertex(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.u = 0;
            this.v = 0;
            this.texture = 0;
            this.tint = 0xffffff;
            this.alpha = 1;
            this.color = 4294967295;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Vertex.prototype.setPosition = function (x, y, z) {
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        Vertex.prototype.setUV = function (u, v) {
            this.u = u;
            this.v = v;
            return this;
        };
        Vertex.prototype.setColor = function (color, alpha) {
            if (alpha === void 0) { alpha = 1; }
            this.tint = color;
            this.alpha = alpha;
            this.packColor();
            return this;
        };
        Vertex.prototype.setAlpha = function (value) {
            this.alpha = value;
            return this;
        };
        Vertex.prototype.setTint = function (value) {
            this.tint = value;
            return this;
        };
        Vertex.prototype.packColor = function () {
            this.color = PackColor(this.tint, this.alpha);
        };
        return Vertex;
    }());

    var index$s = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Bounds: index$w,
        Input: index$v,
        Transform: index$t,
        Vertex: Vertex
    });

    function BatchTexturedQuad(texture, vertices, renderPass) {
        var _a = GetVertexBufferEntry(renderPass, 1), F32 = _a.F32, U32 = _a.U32, offset = _a.offset;
        var textureIndex = SetTexture$2(renderPass, texture);
        var vertOffset = offset;
        vertices.forEach(function (vertex) {
            F32[vertOffset + 0] = vertex.x;
            F32[vertOffset + 1] = vertex.y;
            F32[vertOffset + 2] = vertex.u;
            F32[vertOffset + 3] = vertex.v;
            F32[vertOffset + 4] = textureIndex;
            U32[vertOffset + 5] = vertex.color;
            vertOffset += 6;
        });
    }

    var GameObject = (function () {
        function GameObject(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.type = 'GameObject';
            this.name = '';
            this.willUpdate = true;
            this.willUpdateChildren = true;
            this.willRender = true;
            this.willRenderChildren = true;
            this.willCacheChildren = false;
            this.dirty = 0;
            this.dirtyFrame = 0;
            this.visible = true;
            this.children = [];
            this.vertices = [];
            this.events = new Map();
            this.transform = new TransformComponent(this, x, y);
            this.bounds = new BoundsComponent(this);
            this.input = new InputComponent(this);
            this.dirty = DIRTY_CONST.DEFAULT;
            this.transform.update();
        }
        GameObject.prototype.isRenderable = function () {
            return (this.visible && this.willRender);
        };
        GameObject.prototype.isDirty = function (flag) {
            return (this.dirty & flag) !== 0;
        };
        GameObject.prototype.clearDirty = function (flag) {
            if (this.isDirty(flag)) {
                this.dirty ^= flag;
            }
            return this;
        };
        GameObject.prototype.setDirty = function (flag, flag2) {
            if (!this.isDirty(flag)) {
                this.dirty ^= flag;
                this.dirtyFrame = GameInstance.getFrame();
            }
            if (!this.isDirty(flag2)) {
                this.dirty ^= flag2;
            }
            return this;
        };
        GameObject.prototype.update = function (delta, time) {
            if (this.willUpdateChildren) {
                var children = this.children;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (child && child.willUpdate) {
                        child.update(delta, time);
                    }
                }
            }
            this.postUpdate(delta, time);
        };
        GameObject.prototype.postUpdate = function (delta, time) {
        };
        GameObject.prototype.renderGL = function (renderPass) {
        };
        GameObject.prototype.renderCanvas = function (renderer) {
        };
        GameObject.prototype.postRenderGL = function (renderPass) {
        };
        GameObject.prototype.postRenderCanvas = function (renderer) {
        };
        Object.defineProperty(GameObject.prototype, "numChildren", {
            get: function () {
                return this.children.length;
            },
            enumerable: false,
            configurable: true
        });
        GameObject.prototype.destroy = function (reparentChildren) {
            if (reparentChildren) {
                ReparentChildren(this, reparentChildren);
            }
            else {
                DestroyChildren(this);
            }
            Emit(this, DestroyEvent, this);
            this.transform.destroy();
            this.bounds.destroy();
            this.input.destroy();
            this.events.clear();
            this.world = null;
            this.parent = null;
            this.children = null;
            this.vertices = [];
        };
        return GameObject;
    }());

    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, x, y) || this;
            _this._alpha = 1;
            _this.type = 'Container';
            return _this;
        }
        Container.prototype.setSize = function (width, height) {
            if (height === void 0) { height = width; }
            this.transform.updateExtent(width, height);
            return this;
        };
        Container.prototype.getSize = function (out) {
            if (out === void 0) { out = new Vec2(); }
            return GetRectangleSize(this.transform.extent, out);
        };
        Container.prototype.setPosition = function (x, y) {
            this.transform.position.set(x, y);
            return this;
        };
        Container.prototype.getPosition = function (out) {
            if (out === void 0) { out = new Vec2(); }
            var position = this.transform.position;
            return out.set(position.x, position.y);
        };
        Container.prototype.setOrigin = function (x, y) {
            if (y === void 0) { y = x; }
            this.transform.origin.set(x, y);
            return this;
        };
        Container.prototype.getOrigin = function (out) {
            if (out === void 0) { out = new Vec2(); }
            var origin = this.transform.origin;
            return out.set(origin.x, origin.y);
        };
        Container.prototype.setSkew = function (x, y) {
            if (y === void 0) { y = x; }
            this.transform.skew.set(x, y);
            return this;
        };
        Container.prototype.getSkew = function (out) {
            if (out === void 0) { out = new Vec2(); }
            var skew = this.transform.skew;
            return out.set(skew.x, skew.y);
        };
        Container.prototype.setScale = function (x, y) {
            if (y === void 0) { y = x; }
            this.transform.scale.set(x, y);
            return this;
        };
        Container.prototype.getScale = function (out) {
            if (out === void 0) { out = new Vec2(); }
            var scale = this.transform.scale;
            return out.set(scale.x, scale.y);
        };
        Container.prototype.setRotation = function (value) {
            this.transform.rotation = value;
            return this;
        };
        Container.prototype.getRotation = function () {
            return this.transform.rotation;
        };
        Object.defineProperty(Container.prototype, "width", {
            get: function () {
                return this.transform.extent.width;
            },
            set: function (value) {
                this.transform.updateExtent(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "height", {
            get: function () {
                return this.transform.extent.height;
            },
            set: function (value) {
                this.transform.updateExtent(undefined, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "x", {
            get: function () {
                return this.transform.position.x;
            },
            set: function (value) {
                this.transform.position.x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "y", {
            get: function () {
                return this.transform.position.y;
            },
            set: function (value) {
                this.transform.position.y = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "originX", {
            get: function () {
                return this.transform.origin.x;
            },
            set: function (value) {
                this.transform.origin.x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "originY", {
            get: function () {
                return this.transform.origin.y;
            },
            set: function (value) {
                this.transform.origin.y = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "skewX", {
            get: function () {
                return this.transform.skew.x;
            },
            set: function (value) {
                this.transform.skew.x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "skewY", {
            get: function () {
                return this.transform.skew.y;
            },
            set: function (value) {
                this.transform.skew.y = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "scaleX", {
            get: function () {
                return this.transform.scale.x;
            },
            set: function (value) {
                this.transform.scale.x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "scaleY", {
            get: function () {
                return this.transform.scale.y;
            },
            set: function (value) {
                this.transform.scale.y = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "rotation", {
            get: function () {
                return this.transform.rotation;
            },
            set: function (value) {
                this.transform.rotation = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (value !== this._alpha) {
                    this._alpha = value;
                    this.vertices.forEach(function (vertex) {
                        vertex.setAlpha(value);
                    });
                    this.setDirty(DIRTY_CONST.COLORS);
                }
            },
            enumerable: false,
            configurable: true
        });
        return Container;
    }(GameObject));

    function DrawTexturedQuad$1(frame, alpha, transform, renderer) {
        if (!frame) {
            return;
        }
        var ctx = renderer.ctx;
        var _a = transform.world, a = _a.a, b = _a.b, c = _a.c, d = _a.d, tx = _a.tx, ty = _a.ty;
        var _b = transform.extent, x = _b.x, y = _b.y;
        ctx.save();
        ctx.setTransform(a, b, c, d, tx, ty);
        ctx.globalAlpha = alpha;
        ctx.drawImage(frame.texture.image, frame.x, frame.y, frame.width, frame.height, x, y, frame.width, frame.height);
        ctx.restore();
    }

    function SetFrame$1(texture, key) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var frame = texture.getFrame(key);
        var pivot = frame.pivot;
        children.forEach(function (child) {
            if (!child || frame === child.frame) {
                return;
            }
            child.frame = frame;
            child.hasTexture = true;
            if (pivot) {
                child.setOrigin(pivot.x, pivot.y);
            }
            frame.copyToExtent(child);
            frame.copyToVertices(child.vertices);
        });
        return children;
    }

    var instance$1;
    var TextureManagerInstance = {
        get: function () {
            return instance$1;
        },
        set: function (manager) {
            instance$1 = manager;
        }
    };

    function SetTexture$1(key, frame) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        if (!key) {
            children.forEach(function (child) {
                child.texture = null;
                child.frame = null;
                child.hasTexture = false;
            });
        }
        else {
            var texture_1;
            if (key instanceof Texture) {
                texture_1 = key;
            }
            else {
                texture_1 = TextureManagerInstance.get().get(key);
            }
            if (!texture_1) {
                console.warn("Invalid Texture key: " + key);
            }
            else {
                children.forEach(function (child) {
                    child.texture = texture_1;
                });
                SetFrame$1.apply(void 0, __spreadArray([texture_1, frame], __read(children)));
            }
        }
        return children;
    }

    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(x, y, texture, frame) {
            var _this = _super.call(this, x, y) || this;
            _this.hasTexture = false;
            _this._tint = 0xffffff;
            _this.type = 'Sprite';
            _this.vertices = [new Vertex(), new Vertex(), new Vertex(), new Vertex()];
            _this.setTexture(texture, frame);
            return _this;
        }
        Sprite.prototype.setTexture = function (key, frame) {
            SetTexture$1(key, frame, this);
            return this;
        };
        Sprite.prototype.setFrame = function (key) {
            SetFrame$1(this.texture, key, this);
            return this;
        };
        Sprite.prototype.isRenderable = function () {
            return (this.visible && this.willRender && this.hasTexture && this.alpha > 0);
        };
        Sprite.prototype.renderGL = function (renderPass) {
            PreRenderVertices(this);
            BatchTexturedQuad(this.texture, this.vertices, renderPass);
        };
        Sprite.prototype.renderCanvas = function (renderer) {
            PreRenderVertices(this);
            DrawTexturedQuad$1(this.frame, this.alpha, this.transform, renderer);
        };
        Object.defineProperty(Sprite.prototype, "tint", {
            get: function () {
                return this._tint;
            },
            set: function (value) {
                if (value !== this._tint) {
                    this._tint = value;
                    this.vertices.forEach(function (vertex) {
                        vertex.setTint(value);
                    });
                    this.setDirty(DIRTY_CONST.COLORS);
                }
            },
            enumerable: false,
            configurable: true
        });
        Sprite.prototype.destroy = function (reparentChildren) {
            _super.prototype.destroy.call(this, reparentChildren);
            this.texture = null;
            this.frame = null;
            this.hasTexture = false;
        };
        return Sprite;
    }(Container));

    var AnimatedSprite = (function (_super) {
        __extends(AnimatedSprite, _super);
        function AnimatedSprite(x, y, texture, frame) {
            var _this = _super.call(this, x, y, texture, frame) || this;
            _this.type = 'AnimatedSprite';
            _this.anims = new Map();
            _this.animData = {
                currentAnim: '',
                currentFrames: [],
                frameIndex: 0,
                animSpeed: 0,
                nextFrameTime: 0,
                repeatCount: 0,
                isPlaying: false,
                yoyo: false,
                pendingStart: false,
                playingForward: true,
                delay: 0,
                repeatDelay: 0,
                onStart: null,
                onRepeat: null,
                onComplete: null
            };
            return _this;
        }
        AnimatedSprite.prototype.stop = function () {
            var data = this.animData;
            data.isPlaying = false;
            data.currentAnim = '';
            if (data.onComplete) {
                data.onComplete(this, data.currentAnim);
            }
        };
        AnimatedSprite.prototype.nextFrame = function () {
            var data = this.animData;
            data.frameIndex++;
            if (data.frameIndex === data.currentFrames.length) {
                if (data.yoyo) {
                    data.frameIndex--;
                    data.playingForward = false;
                }
                else if (data.repeatCount === -1 || data.repeatCount > 0) {
                    data.frameIndex = 0;
                    if (data.repeatCount !== -1) {
                        data.repeatCount--;
                    }
                    if (data.onRepeat) {
                        data.onRepeat(this, data.currentAnim);
                    }
                    data.nextFrameTime += data.repeatDelay;
                }
                else {
                    data.frameIndex--;
                    return this.stop();
                }
            }
            this.setFrame(data.currentFrames[data.frameIndex]);
            data.nextFrameTime += data.animSpeed;
        };
        AnimatedSprite.prototype.prevFrame = function () {
            var data = this.animData;
            data.frameIndex--;
            if (data.frameIndex === -1) {
                if (data.repeatCount === -1 || data.repeatCount > 0) {
                    data.frameIndex = 0;
                    data.playingForward = true;
                    if (data.repeatCount !== -1) {
                        data.repeatCount--;
                    }
                    if (data.onRepeat) {
                        data.onRepeat(this, data.currentAnim);
                    }
                    data.nextFrameTime += data.repeatDelay;
                }
                else {
                    data.frameIndex = 0;
                    return this.stop();
                }
            }
            this.setFrame(data.currentFrames[data.frameIndex]);
            data.nextFrameTime += data.animSpeed;
        };
        AnimatedSprite.prototype.update = function (delta, now) {
            _super.prototype.update.call(this, delta, now);
            var data = this.animData;
            if (!data.isPlaying) {
                return;
            }
            data.nextFrameTime -= delta * 1000;
            data.nextFrameTime = Math.max(data.nextFrameTime, 0);
            if (data.nextFrameTime === 0) {
                if (data.pendingStart) {
                    if (data.onStart) {
                        data.onStart(this, data.currentAnim);
                    }
                    data.pendingStart = false;
                    data.nextFrameTime = data.animSpeed;
                }
                else if (data.playingForward) {
                    this.nextFrame();
                }
                else {
                    this.prevFrame();
                }
            }
        };
        Object.defineProperty(AnimatedSprite.prototype, "isPlaying", {
            get: function () {
                return this.animData.isPlaying;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AnimatedSprite.prototype, "isPlayingForward", {
            get: function () {
                return (this.animData.isPlaying && this.animData.playingForward);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AnimatedSprite.prototype, "currentAnimation", {
            get: function () {
                return this.animData.currentAnim;
            },
            enumerable: false,
            configurable: true
        });
        AnimatedSprite.prototype.destroy = function (reparentChildren) {
            _super.prototype.destroy.call(this, reparentChildren);
            this.anims.clear();
            this.animData = null;
        };
        return AnimatedSprite;
    }(Sprite));

    function BatchSingleQuad(renderPass, x, y, width, height, u0, v0, u1, v1, textureIndex, packedColor) {
        if (textureIndex === void 0) { textureIndex = 0; }
        if (packedColor === void 0) { packedColor = 4294967295; }
        var _a = GetVertexBufferEntry(renderPass, 1), F32 = _a.F32, U32 = _a.U32, offset = _a.offset;
        F32[offset + 0] = x;
        F32[offset + 1] = y;
        F32[offset + 2] = u0;
        F32[offset + 3] = v1;
        F32[offset + 4] = textureIndex;
        U32[offset + 5] = packedColor;
        F32[offset + 6] = x;
        F32[offset + 7] = y + height;
        F32[offset + 8] = u0;
        F32[offset + 9] = v0;
        F32[offset + 10] = textureIndex;
        U32[offset + 11] = packedColor;
        F32[offset + 12] = x + width;
        F32[offset + 13] = y + height;
        F32[offset + 14] = u1;
        F32[offset + 15] = v0;
        F32[offset + 16] = textureIndex;
        U32[offset + 17] = packedColor;
        F32[offset + 18] = x + width;
        F32[offset + 19] = y;
        F32[offset + 20] = u1;
        F32[offset + 21] = v1;
        F32[offset + 22] = textureIndex;
        U32[offset + 23] = packedColor;
    }

    function DrawTexturedQuad(renderPass, texture, shader) {
        if (!shader) {
            shader = renderPass.quadShader;
        }
        var _a = texture.firstFrame, u0 = _a.u0, v0 = _a.v0, u1 = _a.u1, v1 = _a.v1;
        BindTexture(texture, 0);
        SetVertexBuffer(renderPass, renderPass.quadBuffer);
        SetShader(renderPass, shader, 0);
        BatchSingleQuad(renderPass, 0, 0, texture.width, texture.height, u0, v0, u1, v1, 0);
        Flush(renderPass);
        PopVertexBuffer(renderPass);
        PopShader(renderPass);
        UnbindTexture(renderPass);
    }

    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            var _this = _super.call(this) || this;
            _this.type = 'Layer';
            _this.transform.passthru = true;
            _this.willRender = false;
            return _this;
        }
        return Layer;
    }(GameObject));

    var RenderLayer = (function (_super) {
        __extends(RenderLayer, _super);
        function RenderLayer() {
            var _this = _super.call(this) || this;
            _this.type = 'RenderLayer';
            _this.willRender = true;
            _this.willRenderChildren = true;
            _this.willCacheChildren = true;
            _this.setDirty(DIRTY_CONST.CHILD_CACHE);
            var width = GetWidth();
            var height = GetHeight();
            var resolution = GetResolution();
            var texture = new Texture(null, width * resolution, height * resolution);
            var binding = new GLTextureBinding(texture);
            texture.binding = binding;
            binding.framebuffer = CreateFramebuffer(binding.texture);
            _this.texture = texture;
            _this.framebuffer = binding.framebuffer;
            return _this;
        }
        RenderLayer.prototype.renderGL = function (renderPass) {
            if (this.numChildren > 0) {
                Flush(renderPass);
                if (!this.willCacheChildren || this.isDirty(DIRTY_CONST.CHILD_CACHE)) {
                    SetFramebuffer(renderPass, this.framebuffer, true);
                    this.clearDirty(DIRTY_CONST.CHILD_CACHE);
                }
                else {
                    SetFramebuffer(renderPass, this.framebuffer, false);
                    this.postRenderGL(renderPass);
                }
            }
        };
        RenderLayer.prototype.postRenderGL = function (renderPass) {
            Flush(renderPass);
            PopFramebuffer(renderPass);
            DrawTexturedQuad(renderPass, this.texture);
            this.clearDirty(DIRTY_CONST.TRANSFORM);
        };
        return RenderLayer;
    }(Layer));

    var EffectLayer = (function (_super) {
        __extends(EffectLayer, _super);
        function EffectLayer() {
            var shaders = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                shaders[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.shaders = [];
            _this.type = 'EffectLayer';
            if (Array.isArray(shaders)) {
                _this.shaders = shaders;
            }
            return _this;
        }
        EffectLayer.prototype.postRenderGL = function (renderPass) {
            var shaders = this.shaders;
            var texture = this.texture;
            Flush(renderPass);
            PopFramebuffer(renderPass);
            if (shaders.length === 0) {
                DrawTexturedQuad(renderPass, texture);
            }
            else {
                var prevTexture = texture;
                for (var i = 0; i < shaders.length; i++) {
                    var shader = shaders[i];
                    DrawTexturedQuad(renderPass, prevTexture, shader);
                    prevTexture = shader.texture;
                }
                DrawTexturedQuad(renderPass, prevTexture);
            }
            this.clearDirty(DIRTY_CONST.TRANSFORM);
        };
        return EffectLayer;
    }(RenderLayer));

    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(x, y, width, height, color) {
            if (width === void 0) { width = 64; }
            if (height === void 0) { height = 64; }
            if (color === void 0) { color = 0xffffff; }
            var _this = _super.call(this, x, y) || this;
            _this._color = 0xffffff;
            _this.type = 'Rectangle';
            _this.vertices = [new Vertex(), new Vertex(), new Vertex(), new Vertex()];
            _this.color = color;
            _this.setWhiteTexture();
            _this.setSize(width, height);
            return _this;
        }
        Rectangle.prototype.setWhiteTexture = function () {
            this.texture = TextureManagerInstance.get().get('__WHITE');
            this.frame = this.texture.getFrame();
            this.frame.copyToExtent(this);
            this.frame.copyToVertices(this.vertices);
        };
        Rectangle.prototype.setColor = function (color) {
            this.color = color;
            return this;
        };
        Rectangle.prototype.isRenderable = function () {
            return (this.visible && this.willRender && this.alpha > 0);
        };
        Rectangle.prototype.renderGL = function (renderPass) {
            PreRenderVertices(this);
            BatchTexturedQuad(this.texture, this.vertices, renderPass);
        };
        Rectangle.prototype.renderCanvas = function (renderer) {
            PreRenderVertices(this);
            DrawTexturedQuad$1(this.frame, this.alpha, this.transform, renderer);
        };
        Object.defineProperty(Rectangle.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                if (value !== this._color) {
                    this._color = value;
                    this.vertices.forEach(function (vertex) {
                        vertex.setTint(value);
                    });
                    this.setDirty(DIRTY_CONST.COLORS);
                }
            },
            enumerable: false,
            configurable: true
        });
        Rectangle.prototype.destroy = function (reparentChildren) {
            _super.prototype.destroy.call(this, reparentChildren);
            this.texture = null;
            this.frame = null;
        };
        return Rectangle;
    }(Container));

    var SpriteBatch = (function (_super) {
        __extends(SpriteBatch, _super);
        function SpriteBatch(maxSize, texture) {
            var _this = _super.call(this) || this;
            _this.glTextureIndex = 0;
            _this.hasTexture = false;
            _this.type = 'SpriteBatch';
            _this.willRender = true;
            _this.setTexture(texture);
            _this.setMaxSize(maxSize);
            return _this;
        }
        SpriteBatch.prototype.resetBuffers = function () {
            var ibo = [];
            for (var i = 0; i < (this.maxSize * 4); i += 4) {
                ibo.push(i + 0, i + 1, i + 2, i + 2, i + 3, i + 0);
            }
            this.data = new ArrayBuffer(this.maxSize * 96);
            this.index = new Uint16Array(ibo);
            this.vertexViewF32 = new Float32Array(this.data);
            this.vertexViewU32 = new Uint32Array(this.data);
            if (gl) {
                DeleteFramebuffer(this.vertexBuffer);
                DeleteFramebuffer(this.indexBuffer);
                this.vertexBuffer = gl.createBuffer();
                this.indexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }
            ibo = [];
            this.count = 0;
        };
        SpriteBatch.prototype.setMaxSize = function (value) {
            this.maxSize = Clamp(value, 0, 65535);
            this.resetBuffers();
            return this;
        };
        SpriteBatch.prototype.setTexture = function (key) {
            var texture;
            if (key instanceof Texture) {
                texture = key;
            }
            else {
                texture = TextureManagerInstance.get().get(key);
            }
            if (!texture) {
                console.warn("Invalid Texture key: " + key);
            }
            else {
                this.texture = texture;
                this.hasTexture = true;
                this.glTextureIndex = -1;
            }
            return this;
        };
        SpriteBatch.prototype.isRenderable = function () {
            return (this.visible && this.willRender && this.hasTexture && this.count > 0);
        };
        SpriteBatch.prototype.clear = function () {
            this.count = 0;
            return this;
        };
        SpriteBatch.prototype.addToBatch = function (frame, color, x0, y0, x1, y1, x2, y2, x3, y3) {
            if (this.count >= this.maxSize) {
                console.warn('SpriteBatch full');
                return this;
            }
            var u0 = frame.u0, u1 = frame.u1, v0 = frame.v0, v1 = frame.v1;
            var F32 = this.vertexViewF32;
            var U32 = this.vertexViewU32;
            var offset = this.count * 24;
            var textureIndex = (this.texture.binding) ? this.texture.binding.index : 0;
            F32[offset + 0] = x0;
            F32[offset + 1] = y0;
            F32[offset + 2] = u0;
            F32[offset + 3] = v0;
            F32[offset + 4] = textureIndex;
            U32[offset + 5] = color;
            F32[offset + 6] = x1;
            F32[offset + 7] = y1;
            F32[offset + 8] = u0;
            F32[offset + 9] = v1;
            F32[offset + 10] = textureIndex;
            U32[offset + 11] = color;
            F32[offset + 12] = x2;
            F32[offset + 13] = y2;
            F32[offset + 14] = u1;
            F32[offset + 15] = v1;
            F32[offset + 16] = textureIndex;
            U32[offset + 17] = color;
            F32[offset + 18] = x3;
            F32[offset + 19] = y3;
            F32[offset + 20] = u1;
            F32[offset + 21] = v0;
            F32[offset + 22] = textureIndex;
            U32[offset + 23] = color;
            this.setDirty(DIRTY_CONST.TRANSFORM);
            this.count++;
            return this;
        };
        SpriteBatch.prototype.add = function (config) {
            var _a = config.frame, frame = _a === void 0 ? null : _a, _b = config.x, x = _b === void 0 ? 0 : _b, _c = config.y, y = _c === void 0 ? 0 : _c, _d = config.rotation, rotation = _d === void 0 ? 0 : _d, _e = config.scaleX, scaleX = _e === void 0 ? 1 : _e, _f = config.scaleY, scaleY = _f === void 0 ? 1 : _f, _g = config.skewX, skewX = _g === void 0 ? 0 : _g, _h = config.skewY, skewY = _h === void 0 ? 0 : _h, _j = config.originX, originX = _j === void 0 ? 0 : _j, _k = config.originY, originY = _k === void 0 ? 0 : _k, _l = config.alpha, alpha = _l === void 0 ? 1 : _l, _m = config.tint, tint = _m === void 0 ? 0xffffff : _m;
            var textureFrame = this.texture.getFrame(frame);
            var _o = textureFrame.getExtent(originX, originY), left = _o.left, right = _o.right, top = _o.top, bottom = _o.bottom;
            var _p = GetVerticesFromValues(left, right, top, bottom, x, y, rotation, scaleX, scaleY, skewX, skewY), x0 = _p.x0, y0 = _p.y0, x1 = _p.x1, y1 = _p.y1, x2 = _p.x2, y2 = _p.y2, x3 = _p.x3, y3 = _p.y3;
            var packedColor = PackColor(tint, alpha);
            return this.addToBatch(textureFrame, packedColor, x0, y0, x1, y1, x2, y2, x3, y3);
        };
        SpriteBatch.prototype.addXY = function (x, y, frame) {
            var textureFrame = this.texture.getFrame(frame);
            var _a = textureFrame.getExtent(0, 0), left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
            var _b = GetVerticesFromValues(left, right, top, bottom, x, y), x0 = _b.x0, y0 = _b.y0, x1 = _b.x1, y1 = _b.y1, x2 = _b.x2, y2 = _b.y2, x3 = _b.x3, y3 = _b.y3;
            return this.addToBatch(textureFrame, 4294967295, x0, y0, x1, y1, x2, y2, x3, y3);
        };
        SpriteBatch.prototype.updateTextureIndex = function () {
            var textureIndex = this.texture.binding.index;
            if (textureIndex === this.glTextureIndex) {
                return;
            }
            var F32 = this.vertexViewF32;
            this.glTextureIndex = textureIndex;
            for (var i = 0; i < this.count; i++) {
                F32[(i * 24) + 4] = textureIndex;
                F32[(i * 24) + 10] = textureIndex;
                F32[(i * 24) + 16] = textureIndex;
                F32[(i * 24) + 22] = textureIndex;
            }
        };
        SpriteBatch.prototype.renderGL = function (renderPass) {
        };
        SpriteBatch.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            DeleteFramebuffer(this.vertexBuffer);
            DeleteFramebuffer(this.indexBuffer);
            this.data = null;
            this.vertexViewF32 = null;
            this.vertexViewU32 = null;
            this.index = null;
            this.texture = null;
            this.hasTexture = false;
        };
        return SpriteBatch;
    }(Layer));

    function CreateCanvas(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas.getContext('2d');
    }

    function CanvasTexture(width, height) {
        if (width === void 0) { width = 32; }
        if (height === void 0) { height = 32; }
        var ctx = CreateCanvas(width, height);
        return new Texture(ctx.canvas);
    }

    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(x, y, text, font, fillStyle) {
            if (text === void 0) { text = ''; }
            var _this = _super.call(this, x, y, CanvasTexture()) || this;
            _this.splitRegExp = /(?:\r\n|\r|\n)/;
            _this.padding = { left: 0, right: 0, top: 0, bottom: 0 };
            _this.verticalAlign = 'ascent';
            _this.lineSpacing = 0;
            _this.font = '16px monospace';
            _this.fillStyle = '#fff';
            _this.strokeStyle = '';
            _this.backgroundStyle = '';
            _this.cornerRadius = 0;
            _this.textAlign = 'left';
            _this.textBaseline = 'alphabetic';
            _this.lineWidth = 0;
            _this.lineDash = [];
            _this.antialias = false;
            _this.type = 'Text';
            var game = GameInstance.get();
            _this.resolution = game.renderer.resolution;
            _this.canvas = _this.texture.image;
            _this.context = _this.canvas.getContext('2d');
            if (font) {
                _this.font = font;
            }
            if (fillStyle) {
                _this.fillStyle = fillStyle;
            }
            _this.setText(text);
            return _this;
        }
        Text.prototype.syncContext = function (canvas, ctx) {
            if (this.preRenderCallback) {
                this.preRenderCallback(canvas, ctx);
            }
            ctx.font = this.font;
            ctx.textBaseline = this.textBaseline;
            ctx.textAlign = this.textAlign;
            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.setLineDash(this.lineDash);
            ctx.imageSmoothingEnabled = this.antialias;
        };
        Text.prototype.updateText = function () {
            var canvas = this.canvas;
            var ctx = this.context;
            var resolution = this.resolution;
            var lines = this._text.split(this.splitRegExp);
            var padding = this.padding;
            var fillStyle = this.fillStyle;
            var strokeStyle = this.strokeStyle;
            var strokeWidth = this.lineWidth;
            var lineSpacing = this.lineSpacing;
            var strokeWidthHalf = (strokeWidth > 0) ? strokeWidth / 2 : 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.syncContext(canvas, ctx);
            ctx.textAlign = 'start';
            var maxWidth = 0;
            var maxHeight = 0;
            var y = 0;
            var lineMetrics = [];
            var vAlignAscent = (this.verticalAlign === 'ascent');
            var metrics = ctx.measureText('|MÉq');
            var averageLineHeight = Math.ceil(Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent)) + strokeWidth;
            for (var i = 0; i < lines.length; i++) {
                var metrics_1 = ctx.measureText(lines[i]);
                var left = metrics_1.actualBoundingBoxLeft;
                var right = metrics_1.actualBoundingBoxRight;
                var ascent = metrics_1.actualBoundingBoxAscent;
                var descent = metrics_1.actualBoundingBoxDescent;
                if ((!ascent && !descent) || lines[i] === '') {
                    ascent = averageLineHeight;
                    descent = 0;
                }
                var lineWidth = Math.ceil(Math.abs(left) + Math.abs(right)) + strokeWidth;
                var lineHeight = Math.ceil(Math.abs(ascent) + Math.abs(descent)) + strokeWidth;
                if (vAlignAscent) {
                    y += ascent + strokeWidthHalf;
                    if (i > 0) {
                        y += lineSpacing + strokeWidthHalf;
                    }
                    maxHeight = y + descent + strokeWidthHalf;
                }
                else {
                    y = maxHeight + ((lineHeight - descent) - strokeWidthHalf);
                    maxHeight += lineHeight;
                    if (i < lines.length - 1) {
                        maxHeight += lineSpacing;
                    }
                }
                maxWidth = Math.max(maxWidth, lineWidth);
                lineMetrics.push({ lineWidth: lineWidth, lineHeight: lineHeight, ascent: ascent, descent: descent, left: left, right: right, y: y });
            }
            maxWidth += padding.left + padding.right;
            maxHeight += padding.top + padding.bottom;
            var displayWidth = (this.fixedWidth) ? this.fixedWidth : maxWidth;
            var displayHeight = (this.fixedHeight) ? this.fixedHeight : maxHeight;
            var canvasWidth = Math.ceil(displayWidth * resolution);
            var canvasHeight = Math.ceil(displayHeight * resolution);
            if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                this.texture.setSize(displayWidth, displayHeight);
                this.setSize(displayWidth, displayHeight);
            }
            ctx.save();
            ctx.scale(resolution, resolution);
            this.syncContext(canvas, ctx);
            var backgroundStyle = this.backgroundStyle;
            if (backgroundStyle) {
                ctx.save();
                ctx.fillStyle = backgroundStyle;
                ctx.strokeStyle = backgroundStyle;
                var cornerRadius = this.cornerRadius;
                var halfRadius = (cornerRadius > 0) ? cornerRadius / 2 : 0;
                if (cornerRadius) {
                    ctx.lineWidth = cornerRadius;
                    ctx.strokeRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
                }
                ctx.fillRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
                ctx.restore();
            }
            var textAlign = this.textAlign;
            var isCenter = (textAlign === 'center');
            var isRight = (textAlign === 'right' || textAlign === 'end');
            var yOffset = ((displayHeight - maxHeight) / 2) + padding.top;
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var metrics_2 = lineMetrics[i];
                var tx = padding.left + metrics_2.left + strokeWidthHalf;
                var ty = yOffset + metrics_2.y;
                if (isCenter) {
                    tx = displayWidth / 2;
                }
                else if (isRight) {
                    tx = displayWidth - strokeWidthHalf;
                }
                if (strokeStyle) {
                    ctx.strokeText(line, tx, ty);
                }
                if (fillStyle) {
                    ctx.fillText(line, tx, ty);
                }
            }
            ctx.restore();
            if (this.texture.binding) {
                this.texture.binding.update();
            }
            this.setDirty(DIRTY_CONST.TEXTURE);
            return this;
        };
        Object.defineProperty(Text.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this.setText(value);
            },
            enumerable: false,
            configurable: true
        });
        Text.prototype.setText = function (value) {
            if (value === void 0) { value = ''; }
            if (Array.isArray(value)) {
                value = value.join('\n');
            }
            if (value !== this._text) {
                this._text = value.toString();
                this.updateText();
            }
            return this;
        };
        Text.prototype.destroy = function (reparentChildren) {
            this.texture.destroy();
            this.fillStyle = null;
            this.strokeStyle = null;
            this.backgroundStyle = null;
            this.canvas = null;
            this.context = null;
            _super.prototype.destroy.call(this, reparentChildren);
        };
        return Text;
    }(Sprite));

    var index$r = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AnimatedSprite: AnimatedSprite,
        Components: index$s,
        Container: Container,
        EffectLayer: EffectLayer,
        GameObject: GameObject,
        Layer: Layer,
        Rectangle: Rectangle,
        RenderLayer: RenderLayer,
        Sprite: Sprite,
        SpriteBatch: SpriteBatch,
        Text: Text
    });

    var Transform3DComponent = (function () {
        function Transform3DComponent(entity, x, y, z) {
            var _this = this;
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.passthru = false;
            this.entity = entity;
            this.local = new Matrix4();
            this.world = new Matrix4();
            this.normal = new Matrix4();
            this.position = new Vec3Callback(function () { return _this.update(); }, x, y, z);
            this.scale = new Vec3Callback(function () { return _this.update(); }, 1, 1, 1);
            this.origin = new Vec3Callback(function () { return _this.update(); });
            this.rotation = new Quaternion();
            this.rotation.onChange = function () { return _this.update(); };
            this.forward = Vec3Forward();
            this.up = Vec3Up();
            this.right = Vec3Right();
            this.update();
        }
        Transform3DComponent.prototype.rotateX = function (angle) {
            QuatRotateX(this.rotation, angle, this.rotation);
        };
        Transform3DComponent.prototype.rotateY = function (angle) {
            QuatRotateY(this.rotation, angle, this.rotation);
        };
        Transform3DComponent.prototype.rotateZ = function (angle) {
            QuatRotateZ(this.rotation, angle, this.rotation);
        };
        Transform3DComponent.prototype.update = function () {
            var model = this.local;
            var normal = this.normal;
            Mat4FromRotationTranslationScale(this.rotation, this.position, this.scale, model);
            Mat4Invert(model, normal);
            Mat4Transpose(normal, normal);
        };
        Transform3DComponent.prototype.updateLocal = function () {
            this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
        };
        Transform3DComponent.prototype.updateWorld = function () {
            var entity = this.entity;
            entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
            if (entity.numChildren) {
                this.updateChildren();
            }
        };
        Transform3DComponent.prototype.updateChildren = function () {
            var children = this.entity.children;
            for (var i = 0; i < children.length; i++) {
                children[i];
            }
        };
        Transform3DComponent.prototype.destroy = function () {
            this.position.destroy();
            this.scale.destroy();
            this.origin.destroy();
            this.rotation.destroy();
            this.entity = null;
            this.local = null;
            this.world = null;
            this.position = null;
            this.scale = null;
            this.origin = null;
            this.rotation = null;
        };
        return Transform3DComponent;
    }());

    var index$q = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Transform3DComponent: Transform3DComponent
    });

    function CreateVertexSet() {
        return {
            vertices: [],
            normals: [],
            uvs: [],
            indices: [],
            numberOfVertices: 0
        };
    }

    var index$p = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CreateFramebuffer: CreateFramebuffer,
        CreateGLTexture: CreateGLTexture,
        DeleteFramebuffer: DeleteFramebuffer,
        DeleteGLBuffer: DeleteGLBuffer,
        DeleteGLTexture: DeleteGLTexture,
        GL: GL,
        PackColor: PackColor,
        PackColors: PackColors,
        SetGLTextureFilterMode: SetGLTextureFilterMode,
        UpdateGLTexture: UpdateGLTexture,
        WebGLRenderer: WebGLRenderer
    });

    var FaceUVNormalTexture = (function () {
        function FaceUVNormalTexture(v1, v2, v3, n1, n2, n3, uv1, uv2, uv3, scale) {
            if (scale === void 0) { scale = 1; }
            this.color = 0xffffff;
            this.alpha = 1;
            this.size = 30;
            this.vertex1 = new Vertex(v1.x * scale, v1.y * scale, v1.z * scale);
            this.vertex2 = new Vertex(v2.x * scale, v2.y * scale, v2.z * scale);
            this.vertex3 = new Vertex(v3.x * scale, v3.y * scale, v3.z * scale);
            this.vertex1.setUV(uv1.x, uv1.y);
            this.vertex2.setUV(uv2.x, uv2.y);
            this.vertex3.setUV(uv3.x, uv3.y);
            this.normal1 = n1;
            this.normal2 = n2;
            this.normal3 = n3;
            this._packedColor = PackColor(this.color, this.alpha);
        }
        FaceUVNormalTexture.prototype.setColor = function (color, alpha) {
            if (alpha === void 0) { alpha = 1; }
            this.color = color;
            this.alpha = alpha;
            this._packedColor = PackColor(color, alpha);
        };
        FaceUVNormalTexture.prototype.addToBuffer = function (F32, U32, textureID, offset) {
            var v1 = this.vertex1;
            var v2 = this.vertex2;
            var v3 = this.vertex3;
            var n1 = this.normal1;
            var n2 = this.normal2;
            var n3 = this.normal3;
            var color = this._packedColor;
            F32[offset++] = v1.x;
            F32[offset++] = v1.y;
            F32[offset++] = v1.z;
            F32[offset++] = n1.x;
            F32[offset++] = n1.y;
            F32[offset++] = n1.z;
            F32[offset++] = v1.u;
            F32[offset++] = v1.v;
            F32[offset++] = textureID;
            U32[offset++] = color;
            F32[offset++] = v2.x;
            F32[offset++] = v2.y;
            F32[offset++] = v2.z;
            F32[offset++] = n2.x;
            F32[offset++] = n2.y;
            F32[offset++] = n2.z;
            F32[offset++] = v2.u;
            F32[offset++] = v2.v;
            F32[offset++] = textureID;
            U32[offset++] = color;
            F32[offset++] = v3.x;
            F32[offset++] = v3.y;
            F32[offset++] = v3.z;
            F32[offset++] = n3.x;
            F32[offset++] = n3.y;
            F32[offset++] = n3.z;
            F32[offset++] = v3.u;
            F32[offset++] = v3.v;
            F32[offset++] = textureID;
            U32[offset++] = color;
            return offset;
        };
        return FaceUVNormalTexture;
    }());

    function GetVec3$1(data, index) {
        var x = data[(index * 3) + 0];
        var y = data[(index * 3) + 1];
        var z = data[(index * 3) + 2];
        return [x, y, z];
    }
    function GetVec2$1(data, index) {
        var x = data[(index * 2) + 0];
        var y = data[(index * 2) + 1];
        return [x, y];
    }
    function CreateNonIndexedVertexBuffer(data) {
        var vertices = data.vertices, normals = data.normals, uvs = data.uvs;
        var total = vertices.length;
        var count = total / 3;
        var batchSize = count / 3;
        var buffer = new VertexBuffer({ batchSize: batchSize, isDynamic: false, vertexElementSize: 8, elementsPerEntry: 3 });
        var F32 = buffer.vertexViewF32;
        var offset = 0;
        var uvIndex = 0;
        for (var i = 0; i < total; i += 3) {
            F32[offset++] = vertices[i + 0];
            F32[offset++] = vertices[i + 1];
            F32[offset++] = vertices[i + 2];
            F32[offset++] = normals[i + 0];
            F32[offset++] = normals[i + 1];
            F32[offset++] = normals[i + 2];
            F32[offset++] = uvs[uvIndex + 0];
            F32[offset++] = uvs[uvIndex + 1];
            uvIndex += 2;
        }
        buffer.count = count;
        return buffer;
    }
    function CreateVertexBuffer(data) {
        var vertices = data.vertices, normals = data.normals, uvs = data.uvs, indices = data.indices;
        var buffer = new VertexBuffer({ batchSize: indices.length / 3, isDynamic: false, vertexElementSize: 8, elementsPerEntry: 3 });
        var F32 = buffer.vertexViewF32;
        var offset = 0;
        for (var i = 0; i < indices.length; i += 3) {
            var i1 = indices[i + 0];
            var i2 = indices[i + 1];
            var i3 = indices[i + 2];
            var v1 = GetVec3$1(vertices, i1);
            var v2 = GetVec3$1(vertices, i2);
            var v3 = GetVec3$1(vertices, i3);
            var n1 = GetVec3$1(normals, i1);
            var n2 = GetVec3$1(normals, i2);
            var n3 = GetVec3$1(normals, i3);
            var uv1 = GetVec2$1(uvs, i1);
            var uv2 = GetVec2$1(uvs, i2);
            var uv3 = GetVec2$1(uvs, i3);
            F32[offset++] = v1[0];
            F32[offset++] = v1[1];
            F32[offset++] = v1[2];
            F32[offset++] = n1[0];
            F32[offset++] = n1[1];
            F32[offset++] = n1[2];
            F32[offset++] = uv1[0];
            F32[offset++] = uv1[1];
            F32[offset++] = v2[0];
            F32[offset++] = v2[1];
            F32[offset++] = v2[2];
            F32[offset++] = n2[0];
            F32[offset++] = n2[1];
            F32[offset++] = n2[2];
            F32[offset++] = uv2[0];
            F32[offset++] = uv2[1];
            F32[offset++] = v3[0];
            F32[offset++] = v3[1];
            F32[offset++] = v3[2];
            F32[offset++] = n3[0];
            F32[offset++] = n3[1];
            F32[offset++] = n3[2];
            F32[offset++] = uv3[0];
            F32[offset++] = uv3[1];
        }
        buffer.count = indices.length;
        return buffer;
    }
    function GetBufferFromVertexSet(data) {
        if (data.indices && data.indices.length > 0) {
            return CreateVertexBuffer(data);
        }
        else {
            return CreateNonIndexedVertexBuffer(data);
        }
    }

    var Geometry = (function () {
        function Geometry(data) {
            if (data) {
                if (data.hasOwnProperty('vertices')) {
                    this.buffer = GetBufferFromVertexSet(data);
                }
                else {
                    this.buffer = data;
                }
            }
        }
        Geometry.prototype.destroy = function () {
            this.buffer.destroy();
        };
        return Geometry;
    }());

    var ParseObj = (function () {
        function ParseObj(fileContents, flipUVs, defaultModelName) {
            if (flipUVs === void 0) { flipUVs = true; }
            if (defaultModelName === void 0) { defaultModelName = 'untitled'; }
            this.currentMaterial = '';
            this.currentGroup = '';
            this.smoothingGroup = 0;
            this.result = {
                materialLibraries: [],
                models: []
            };
            this.fileContents = fileContents;
            this.defaultModelName = defaultModelName;
            this.flipUVs = flipUVs;
        }
        ParseObj.prototype.parseAsync = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    resolve(_this.parse());
                }
                catch (theError) {
                    reject(theError);
                }
            });
        };
        ParseObj.prototype.parse = function () {
            var e_1, _a;
            var stripComments = function (line) {
                var commentIndex = line.indexOf('#');
                if (commentIndex > -1) {
                    return line.substring(0, commentIndex);
                }
                return line;
            };
            var lines = this.fileContents.split('\n');
            try {
                for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                    var line = lines_1_1.value;
                    var strippedline = stripComments(line);
                    var lineItems = strippedline
                        .replace(/\s\s+/g, ' ')
                        .trim()
                        .split(' ');
                    switch (lineItems[0].toLowerCase()) {
                        case 'o':
                            this.parseObject(lineItems);
                            break;
                        case 'g':
                            this.parseGroup(lineItems);
                            break;
                        case 'v':
                            this.parseVertexCoords(lineItems);
                            break;
                        case 'vt':
                            this.parseTextureCoords(lineItems);
                            break;
                        case 'vn':
                            this.parseVertexNormal(lineItems);
                            break;
                        case 's':
                            this.parseSmoothShadingStatement(lineItems);
                            break;
                        case 'f':
                            this.parsePolygon(lineItems);
                            break;
                        case 'mtllib':
                            this.parseMtlLib(lineItems);
                            break;
                        case 'usemtl':
                            this.parseUseMtl(lineItems);
                            break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.fileContents = '';
            return this.result;
        };
        ParseObj.prototype.currentModel = function () {
            if (this.result.models.length === 0) {
                this.result.models.push({
                    faces: [],
                    name: this.defaultModelName,
                    textureCoords: [],
                    vertexNormals: [],
                    vertices: []
                });
                this.currentGroup = '';
                this.smoothingGroup = 0;
            }
            return this.result.models[this.result.models.length - 1];
        };
        ParseObj.prototype.parseObject = function (lineItems) {
            var modelName = lineItems.length >= 2 ? lineItems[1] : this.defaultModelName;
            this.result.models.push({
                faces: [],
                name: modelName,
                textureCoords: [],
                vertexNormals: [],
                vertices: []
            });
            this.currentGroup = '';
            this.smoothingGroup = 0;
        };
        ParseObj.prototype.parseGroup = function (lineItems) {
            if (lineItems.length !== 2) {
                throw 'Group statements must have exactly 1 argument (eg. g group_1)';
            }
            this.currentGroup = lineItems[1];
        };
        ParseObj.prototype.parseVertexCoords = function (lineItems) {
            var len = lineItems.length;
            var x = (len >= 2) ? parseFloat(lineItems[1]) : 0;
            var y = (len >= 3) ? parseFloat(lineItems[2]) : 0;
            var z = (len >= 4) ? parseFloat(lineItems[3]) : 0;
            this.currentModel().vertices.push({ x: x, y: y, z: z });
        };
        ParseObj.prototype.parseTextureCoords = function (lineItems) {
            var len = lineItems.length;
            var u = (len >= 2) ? parseFloat(lineItems[1]) : 0;
            var v = (len >= 3) ? parseFloat(lineItems[2]) : 0;
            var w = (len >= 4) ? parseFloat(lineItems[3]) : 0;
            if (isNaN(u)) {
                u = 0;
            }
            if (isNaN(v)) {
                v = 0;
            }
            if (isNaN(w)) {
                w = 0;
            }
            if (this.flipUVs) {
                v = 1 - v;
            }
            this.currentModel().textureCoords.push({ u: u, v: v, w: w });
        };
        ParseObj.prototype.parseVertexNormal = function (lineItems) {
            var len = lineItems.length;
            var x = (len >= 2) ? parseFloat(lineItems[1]) : 0;
            var y = (len >= 3) ? parseFloat(lineItems[2]) : 0;
            var z = (len >= 4) ? parseFloat(lineItems[3]) : 0;
            this.currentModel().vertexNormals.push({ x: x, y: y, z: z });
        };
        ParseObj.prototype.parsePolygon = function (lineItems) {
            var totalVertices = lineItems.length - 1;
            if (totalVertices < 3) {
                throw 'Face < 3 vertices';
            }
            var face = {
                group: this.currentGroup,
                material: this.currentMaterial,
                smoothingGroup: this.smoothingGroup,
                vertices: []
            };
            for (var i = 0; i < totalVertices; i++) {
                var vertexString = lineItems[i + 1];
                var vertexValues = vertexString.split('/');
                var vvLen = vertexValues.length;
                if (vvLen < 1 || vvLen > 3) {
                    throw 'Too many / values for single vertex';
                }
                var vertexIndex = 0;
                var textureCoordsIndex = 0;
                var vertexNormalIndex = 0;
                vertexIndex = parseInt(vertexValues[0], 10);
                if (vvLen > 1 && vertexValues[1] !== '') {
                    textureCoordsIndex = parseInt(vertexValues[1], 10);
                }
                if (vvLen > 2) {
                    vertexNormalIndex = parseInt(vertexValues[2], 10);
                }
                if (vertexIndex === 0) {
                    throw 'Faces uses invalid vertex index of 0';
                }
                if (vertexIndex < 0) {
                    vertexIndex = this.currentModel().vertices.length + 1 + vertexIndex;
                }
                textureCoordsIndex -= 1;
                vertexIndex -= 1;
                vertexNormalIndex -= 1;
                face.vertices.push({
                    textureCoordsIndex: textureCoordsIndex,
                    vertexIndex: vertexIndex,
                    vertexNormalIndex: vertexNormalIndex
                });
            }
            this.currentModel().faces.push(face);
        };
        ParseObj.prototype.parseMtlLib = function (lineItems) {
            if (lineItems.length >= 2) {
                this.result.materialLibraries.push(lineItems[1]);
            }
        };
        ParseObj.prototype.parseUseMtl = function (lineItems) {
            if (lineItems.length >= 2) {
                this.currentMaterial = lineItems[1];
            }
        };
        ParseObj.prototype.parseSmoothShadingStatement = function (lineItems) {
            if (lineItems.length !== 2) {
                throw 'Smoothing group statements must have exactly 1 argument (eg. s <number|off>)';
            }
            var groupNumber = lineItems[1].toLowerCase() === 'off' ? 0 : parseInt(lineItems[1], 10);
            this.smoothingGroup = groupNumber;
        };
        return ParseObj;
    }());

    function GetBufferFromObj(data, flipUVs) {
        if (flipUVs === void 0) { flipUVs = true; }
        var parser = new ParseObj(data, flipUVs);
        var result = parser.parse();
        var output = [];
        result.models.forEach(function (model) {
            var faces = model.faces, textureCoords = model.textureCoords, vertexNormals = model.vertexNormals, vertices = model.vertices;
            var totalFaces = 0;
            for (var i = 0; i < faces.length; i++) {
                totalFaces += (faces[i].vertices.length === 4) ? 6 : 3;
            }
            var buffer = new VertexBuffer({ batchSize: totalFaces, isDynamic: false, vertexElementSize: 8, elementsPerEntry: 3 });
            var F32 = buffer.vertexViewF32;
            var offset = 0;
            for (var i = 0; i < faces.length; i++) {
                var face = faces[i];
                var i1 = face.vertices[0];
                var i2 = face.vertices[1];
                var i3 = face.vertices[2];
                var v1 = vertices[i1.vertexIndex];
                var v2 = vertices[i2.vertexIndex];
                var v3 = vertices[i3.vertexIndex];
                var n1 = vertexNormals[i1.vertexNormalIndex];
                var n2 = vertexNormals[i2.vertexNormalIndex];
                var n3 = vertexNormals[i3.vertexNormalIndex];
                var uv1 = textureCoords[i1.textureCoordsIndex];
                var uv2 = textureCoords[i2.textureCoordsIndex];
                var uv3 = textureCoords[i3.textureCoordsIndex];
                F32[offset++] = v1.x;
                F32[offset++] = v1.y;
                F32[offset++] = v1.z;
                F32[offset++] = n1.x;
                F32[offset++] = n1.y;
                F32[offset++] = n1.z;
                F32[offset++] = uv1.u;
                F32[offset++] = uv1.v;
                F32[offset++] = v2.x;
                F32[offset++] = v2.y;
                F32[offset++] = v2.z;
                F32[offset++] = n2.x;
                F32[offset++] = n2.y;
                F32[offset++] = n2.z;
                F32[offset++] = uv2.u;
                F32[offset++] = uv2.v;
                F32[offset++] = v3.x;
                F32[offset++] = v3.y;
                F32[offset++] = v3.z;
                F32[offset++] = n3.x;
                F32[offset++] = n3.y;
                F32[offset++] = n3.z;
                F32[offset++] = uv3.u;
                F32[offset++] = uv3.v;
                buffer.count += 3;
                if (face.vertices.length === 4) {
                    var i4 = face.vertices[3];
                    var v4 = vertices[i4.vertexIndex];
                    var n4 = vertexNormals[i4.vertexNormalIndex];
                    var uv4 = textureCoords[i4.textureCoordsIndex];
                    F32[offset++] = v1.x;
                    F32[offset++] = v1.y;
                    F32[offset++] = v1.z;
                    F32[offset++] = n1.x;
                    F32[offset++] = n1.y;
                    F32[offset++] = n1.z;
                    F32[offset++] = uv1.u;
                    F32[offset++] = uv1.v;
                    F32[offset++] = v3.x;
                    F32[offset++] = v3.y;
                    F32[offset++] = v3.z;
                    F32[offset++] = n3.x;
                    F32[offset++] = n3.y;
                    F32[offset++] = n3.z;
                    F32[offset++] = uv3.u;
                    F32[offset++] = uv3.v;
                    F32[offset++] = v4.x;
                    F32[offset++] = v4.y;
                    F32[offset++] = v4.z;
                    F32[offset++] = n4.x;
                    F32[offset++] = n4.y;
                    F32[offset++] = n4.z;
                    F32[offset++] = uv4.u;
                    F32[offset++] = uv4.v;
                    buffer.count += 3;
                }
            }
            output.push({ name: model.name, buffer: buffer });
        });
        return output;
    }

    function GetVec3(data, index) {
        var x = data[(index * 3) + 0];
        var y = data[(index * 3) + 1];
        var z = data[(index * 3) + 2];
        return [x, y, z];
    }
    function GetVec2(data, index) {
        var x = data[(index * 2) + 0];
        var y = data[(index * 2) + 1];
        return [x, y];
    }
    function GetFacesFromVertexSet(data) {
        var vertices = data.vertices, normals = data.normals, uvs = data.uvs, indices = data.indices;
        var faces = [];
        for (var i = 0; i < indices.length; i += 3) {
            var i1 = indices[i + 0];
            var i2 = indices[i + 1];
            var i3 = indices[i + 2];
            var v1 = GetVec3(vertices, i1);
            var v2 = GetVec3(vertices, i2);
            var v3 = GetVec3(vertices, i3);
            var n1 = GetVec3(normals, i1);
            var n2 = GetVec3(normals, i2);
            var n3 = GetVec3(normals, i3);
            var uv1 = GetVec2(uvs, i1);
            var uv2 = GetVec2(uvs, i2);
            var uv3 = GetVec2(uvs, i3);
            var f = new FaceUVNormalTexture({ x: v1[0], y: v1[1], z: v1[2] }, { x: v2[0], y: v2[1], z: v2[2] }, { x: v3[0], y: v3[1], z: v3[2] }, { x: n1[0], y: n1[1], z: n1[2] }, { x: n2[0], y: n2[1], z: n2[2] }, { x: n3[0], y: n3[1], z: n3[2] }, { x: uv1[0], y: uv1[1] }, { x: uv2[0], y: uv2[1] }, { x: uv3[0], y: uv3[1] }, 1);
            faces.push(f);
        }
        return faces;
    }

    var index$o = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CreateVertexSet: CreateVertexSet,
        FaceUVNormalTexture: FaceUVNormalTexture,
        Geometry: Geometry,
        GetBufferFromObj: GetBufferFromObj,
        GetBufferFromVertexSet: GetBufferFromVertexSet,
        GetFacesFromVertexSet: GetFacesFromVertexSet,
        ParseObj: ParseObj
    });

    function PlaneGeometry(data, x, y, z, u, v, w, udir, vdir, width, height, depth, gridX, gridY) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (u === void 0) { u = 0; }
        if (v === void 0) { v = 1; }
        if (w === void 0) { w = 2; }
        if (udir === void 0) { udir = 1; }
        if (vdir === void 0) { vdir = -1; }
        if (width === void 0) { width = 1; }
        if (height === void 0) { height = 1; }
        if (depth === void 0) { depth = 1; }
        if (gridX === void 0) { gridX = 1; }
        if (gridY === void 0) { gridY = 1; }
        if (!data) {
            data = CreateVertexSet();
        }
        var vertices = data.vertices, normals = data.normals, uvs = data.uvs, indices = data.indices, numberOfVertices = data.numberOfVertices;
        var segmentWidth = width / gridX;
        var segmentHeight = height / gridY;
        var widthHalf = width / 2;
        var heightHalf = height / 2;
        var depthHalf = depth / 2;
        var gridX1 = gridX + 1;
        var gridY1 = gridY + 1;
        var vertexCounter = 0;
        var vector = [];
        for (var iy = 0; iy < gridY1; iy++) {
            var by = iy * segmentHeight - heightHalf;
            for (var ix = 0; ix < gridX1; ix++) {
                var bx = ix * segmentWidth - widthHalf;
                vector[u] = bx * udir;
                vector[v] = by * vdir;
                vector[w] = depthHalf;
                vertices.push(x + vector[0], y + vector[1], z + vector[2]);
                vector[u] = 0;
                vector[v] = 0;
                vector[w] = depth > 0 ? 1 : -1;
                normals.push(vector[0], vector[1], vector[2]);
                uvs.push(ix / gridX);
                uvs.push(1 - (iy / gridY));
                vertexCounter += 1;
            }
        }
        for (var iy = 0; iy < gridY; iy++) {
            for (var ix = 0; ix < gridX; ix++) {
                var a = numberOfVertices + ix + gridX1 * iy;
                var b = numberOfVertices + ix + gridX1 * (iy + 1);
                var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                var d = numberOfVertices + (ix + 1) + gridX1 * iy;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        data.numberOfVertices += vertexCounter;
        return data;
    }

    function BoxGeometry(x, y, z, width, height, depth, widthSegments, heightSegments, depthSegments) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (width === void 0) { width = 1; }
        if (height === void 0) { height = 1; }
        if (depth === void 0) { depth = 1; }
        if (widthSegments === void 0) { widthSegments = 1; }
        if (heightSegments === void 0) { heightSegments = 1; }
        if (depthSegments === void 0) { depthSegments = 1; }
        var data = CreateVertexSet();
        PlaneGeometry(data, x, y, z, 2, 1, 0, -1, -1, depth, height, width, depthSegments, heightSegments);
        PlaneGeometry(data, x, y, z, 2, 1, 0, 1, -1, depth, height, -width, depthSegments, heightSegments);
        PlaneGeometry(data, x, y, z, 0, 2, 1, 1, 1, width, depth, height, widthSegments, depthSegments);
        PlaneGeometry(data, x, y, z, 0, 2, 1, 1, -1, width, depth, -height, widthSegments, depthSegments);
        PlaneGeometry(data, x, y, z, 0, 1, 2, 1, -1, width, height, depth, widthSegments, heightSegments);
        PlaneGeometry(data, x, y, z, 0, 1, 2, -1, -1, width, height, -depth, widthSegments, heightSegments);
        return data;
    }

    var GameObject3D = (function () {
        function GameObject3D(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.type = 'GameObject3D';
            this.name = '';
            this.willUpdate = true;
            this.willUpdateChildren = true;
            this.willRender = true;
            this.willRenderChildren = true;
            this.willCacheChildren = false;
            this.dirty = 0;
            this.dirtyFrame = 0;
            this.visible = true;
            this.children = [];
            this.events = new Map();
            this.transform = new Transform3DComponent(this, x, y, z);
            this.dirty = DIRTY_CONST.DEFAULT;
        }
        GameObject3D.prototype.isRenderable = function () {
            return (this.visible && this.willRender);
        };
        GameObject3D.prototype.isDirty = function (flag) {
            return (this.dirty & flag) !== 0;
        };
        GameObject3D.prototype.clearDirty = function (flag) {
            if (this.isDirty(flag)) {
                this.dirty ^= flag;
            }
            return this;
        };
        GameObject3D.prototype.setDirty = function (flag, flag2) {
            if (!this.isDirty(flag)) {
                this.dirty ^= flag;
                this.dirtyFrame = GameInstance.getFrame();
            }
            if (!this.isDirty(flag2)) {
                this.dirty ^= flag2;
            }
            return this;
        };
        GameObject3D.prototype.update = function (delta, time) {
            if (this.willUpdateChildren) {
                var children = this.children;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (child && child.willUpdate) {
                        child.update(delta, time);
                    }
                }
            }
            this.postUpdate(delta, time);
        };
        GameObject3D.prototype.postUpdate = function (delta, time) {
        };
        GameObject3D.prototype.renderGL = function (renderPass) {
        };
        GameObject3D.prototype.postRenderGL = function (renderPass) {
        };
        Object.defineProperty(GameObject3D.prototype, "numChildren", {
            get: function () {
                return this.children.length;
            },
            enumerable: false,
            configurable: true
        });
        GameObject3D.prototype.destroy = function (reparentChildren) {
            Emit(this, DestroyEvent, this);
            this.transform.destroy();
            this.events.clear();
            this.world = null;
            this.parent = null;
            this.children = null;
        };
        return GameObject3D;
    }());

    var Material = (function () {
        function Material(config) {
            var _this = this;
            if (config === void 0) { config = {}; }
            this.isDirty = false;
            var _a = config.ambient, ambient = _a === void 0 ? [1, 1, 1] : _a, _b = config.diffuse, diffuse = _b === void 0 ? [1, 1, 1] : _b, _c = config.specular, specular = _c === void 0 ? [1, 1, 1] : _c, _d = config.shine, shine = _d === void 0 ? 0.25 : _d;
            var onChange = function () { return _this.update(); };
            this.ambient = new RGBCallback(onChange).fromArray(ambient);
            this.diffuse = new RGBCallback(onChange).fromArray(diffuse);
            this.specular = new RGBCallback(onChange).fromArray(specular);
            this._shine = shine;
        }
        Object.defineProperty(Material.prototype, "shine", {
            get: function () {
                return this._shine;
            },
            set: function (value) {
                this._shine = Clamp(value, 0, 1);
                this.isDirty = true;
            },
            enumerable: false,
            configurable: true
        });
        Material.prototype.update = function () {
            this.isDirty = true;
        };
        Material.prototype.setUniforms = function (shader) {
            shader.setUniform('uMaterialAmbient', this.ambient.toArray());
            shader.setUniform('uMaterialDiffuse', this.diffuse.toArray());
            shader.setUniform('uMaterialSpecular', this.specular.toArray());
            shader.setUniform('uMaterialShine', this._shine * 256);
        };
        Material.prototype.destroy = function () {
            this.ambient.destroy();
            this.diffuse.destroy();
            this.specular.destroy();
        };
        return Material;
    }());

    function SetFrame(texture, key) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var frame = texture.getFrame(key);
        children.forEach(function (child) {
            if (!child || frame === child.frame) {
                return;
            }
            child.frame = frame;
            child.hasTexture = true;
        });
        return children;
    }

    function SetTexture(key, frame) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        if (!key) {
            children.forEach(function (child) {
                child.texture = null;
                child.frame = null;
                child.hasTexture = false;
            });
        }
        else {
            var texture_1;
            if (key instanceof Texture) {
                texture_1 = key;
            }
            else {
                texture_1 = TextureManagerInstance.get().get(key);
            }
            if (!texture_1) {
                console.warn("Invalid Texture key: " + key);
            }
            else {
                children.forEach(function (child) {
                    child.texture = texture_1;
                });
                SetFrame.apply(void 0, __spreadArray([texture_1, frame], __read(children)));
            }
        }
        return children;
    }

    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(x, y, z, geometry, material) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (material === void 0) { material = new Material(); }
            var _this = _super.call(this, x, y, z) || this;
            _this.hasTexture = false;
            _this.cullFaces = true;
            _this.geometry = geometry;
            _this.material = material;
            _this.setTexture('__WHITE');
            return _this;
        }
        Mesh.prototype.setTexture = function (key, frame) {
            SetTexture(key, frame, this);
            return this;
        };
        Mesh.prototype.setFrame = function (key) {
            SetFrame(this.texture, key, this);
            return this;
        };
        Mesh.prototype.setMaterial = function (material) {
            this.material = material;
            return this;
        };
        Mesh.prototype.renderGL = function (renderPass) {
            var shader = renderPass.currentShader.shader;
            shader.setUniform('uModelMatrix', this.transform.local.data);
            shader.setUniform('uNormalMatrix', this.transform.normal.data);
            if (this.hasTexture) {
                var textureIndex = SetTexture$2(renderPass, this.texture);
                shader.setUniform('uTexture', textureIndex);
            }
            this.material.setUniforms(shader);
            FlushBuffer(renderPass, this.geometry.buffer);
        };
        Mesh.prototype.destroy = function (reparentChildren) {
            _super.prototype.destroy.call(this, reparentChildren);
            this.geometry = null;
            this.material = null;
            this.texture = null;
            this.frame = null;
            this.hasTexture = false;
        };
        return Mesh;
    }(GameObject3D));

    var Box = (function (_super) {
        __extends(Box, _super);
        function Box(x, y, z, width, height, depth, widthSegments, heightSegments, depthSegments) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            if (depth === void 0) { depth = 1; }
            if (widthSegments === void 0) { widthSegments = 1; }
            if (heightSegments === void 0) { heightSegments = 1; }
            if (depthSegments === void 0) { depthSegments = 1; }
            var _this = this;
            var data = BoxGeometry(0, 0, 0, width, height, depth, widthSegments, heightSegments, depthSegments);
            var geometry = new Geometry(data);
            _this = _super.call(this, x, y, z, geometry) || this;
            return _this;
        }
        return Box;
    }(Mesh));

    function GenerateCap(top, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength) {
        var vertices = data.vertices, normals = data.normals, uvs = data.uvs, indices = data.indices;
        var uv = new Vec2();
        var vertex = new Vec3();
        var radius = (top === true) ? radiusTop : radiusBottom;
        var sign = (top === true) ? 1 : -1;
        var centerIndexStart = index;
        for (var x = 1; x <= radialSegments; x++) {
            vertices.push(0, halfHeight * sign, 0);
            normals.push(0, sign, 0);
            uvs.push(0.5, 0.5);
            index++;
        }
        var centerIndexEnd = index;
        for (var x = 0; x <= radialSegments; x++) {
            var u = x / radialSegments;
            var theta = u * thetaLength + thetaStart;
            var cosTheta = Math.cos(theta);
            var sinTheta = Math.sin(theta);
            vertex.x = radius * sinTheta;
            vertex.y = halfHeight * sign;
            vertex.z = radius * cosTheta;
            vertices.push(vertex.x, vertex.y, vertex.z);
            normals.push(0, sign, 0);
            uv.x = (cosTheta * 0.5) + 0.5;
            uv.y = (sinTheta * 0.5 * sign) + 0.5;
            uvs.push(uv.x, uv.y);
            index++;
        }
        for (var x = 0; x < radialSegments; x++) {
            var c = centerIndexStart + x;
            var i = centerIndexEnd + x;
            if (top) {
                indices.push(i, i + 1, c);
            }
            else {
                indices.push(i + 1, i, c);
            }
        }
        return index;
    }
    function CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        if (radiusTop === void 0) { radiusTop = 1; }
        if (radiusBottom === void 0) { radiusBottom = 1; }
        if (height === void 0) { height = 1; }
        if (radialSegments === void 0) { radialSegments = 8; }
        if (heightSegments === void 0) { heightSegments = 1; }
        if (openEnded === void 0) { openEnded = false; }
        if (thetaStart === void 0) { thetaStart = 0; }
        if (thetaLength === void 0) { thetaLength = Math.PI * 2; }
        var data = CreateVertexSet();
        var vertices = data.vertices, normals = data.normals, uvs = data.uvs, indices = data.indices;
        var index = 0;
        var indexArray = [];
        var halfHeight = height / 2;
        var normal = new Vec3();
        var vertex = new Vec3();
        var slope = (radiusBottom - radiusTop) / height;
        for (var y = 0; y <= heightSegments; y++) {
            var indexRow = [];
            var v = y / heightSegments;
            var radius = v * (radiusBottom - radiusTop) + radiusTop;
            for (var x = 0; x <= radialSegments; x++) {
                var u = x / radialSegments;
                var theta = u * thetaLength + thetaStart;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);
                vertex.x = radius * sinTheta;
                vertex.y = -v * height + halfHeight;
                vertex.z = radius * cosTheta;
                vertices.push(vertex.x, vertex.y, vertex.z);
                normal.set(sinTheta, slope, cosTheta);
                Vec3Normalize(normal, normal);
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(u, 1 - v);
                indexRow.push(index++);
            }
            indexArray.push(indexRow);
        }
        for (var x = 0; x < radialSegments; x++) {
            for (var y = 0; y < heightSegments; y++) {
                var a = indexArray[y][x];
                var b = indexArray[y + 1][x];
                var c = indexArray[y + 1][x + 1];
                var d = indexArray[y][x + 1];
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        if (!openEnded) {
            if (radiusTop > 0) {
                index = GenerateCap(true, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength);
            }
            if (radiusBottom > 0) {
                GenerateCap(false, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength);
            }
        }
        data.numberOfVertices = vertices.length;
        return data;
    }

    function ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        if (radius === void 0) { radius = 1; }
        if (height === void 0) { height = 1; }
        if (radialSegments === void 0) { radialSegments = 8; }
        if (heightSegments === void 0) { heightSegments = 1; }
        if (openEnded === void 0) { openEnded = false; }
        if (thetaStart === void 0) { thetaStart = 0; }
        if (thetaLength === void 0) { thetaLength = Math.PI * 2; }
        return CylinderGeometry(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
    }

    var Cone = (function (_super) {
        __extends(Cone, _super);
        function Cone(x, y, z, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (radius === void 0) { radius = 1; }
            if (height === void 0) { height = 1; }
            if (radialSegments === void 0) { radialSegments = 8; }
            if (heightSegments === void 0) { heightSegments = 1; }
            if (openEnded === void 0) { openEnded = false; }
            if (thetaStart === void 0) { thetaStart = 0; }
            if (thetaLength === void 0) { thetaLength = Math.PI * 2; }
            var _this = this;
            var data = ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
            var geometry = new Geometry(data);
            _this = _super.call(this, x, y, z, geometry) || this;
            return _this;
        }
        return Cone;
    }(Mesh));

    var Light = (function () {
        function Light(config) {
            var _this = this;
            if (config === void 0) { config = {}; }
            this.isDirty = false;
            var _a = config.x, x = _a === void 0 ? 0 : _a, _b = config.y, y = _b === void 0 ? 0 : _b, _c = config.z, z = _c === void 0 ? 0.1 : _c, _d = config.ambient, ambient = _d === void 0 ? [1, 1, 1] : _d, _e = config.diffuse, diffuse = _e === void 0 ? [1, 1, 1] : _e, _f = config.specular, specular = _f === void 0 ? [1, 1, 1] : _f;
            var onChange = function () { return _this.update(); };
            this.position = new Vec3Callback(onChange, x, y, z);
            this.ambient = new RGBCallback(onChange).fromArray(ambient);
            this.diffuse = new RGBCallback(onChange).fromArray(diffuse);
            this.specular = new RGBCallback(onChange).fromArray(specular);
        }
        Light.prototype.setUniforms = function (shader) {
            shader.setUniform('uLightPosition', this.position.toArray());
            shader.setUniform('uLightAmbient', this.ambient.toArray());
            shader.setUniform('uLightDiffuse', this.diffuse.toArray());
            shader.setUniform('uLightSpecular', this.specular.toArray());
        };
        Light.prototype.update = function () {
            this.isDirty = true;
        };
        Light.prototype.destroy = function () {
            this.position.destroy();
            this.ambient.destroy();
            this.diffuse.destroy();
            this.specular.destroy();
        };
        return Light;
    }());

    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane(x, y, z, width, height, widthSegments, heightSegments) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            if (widthSegments === void 0) { widthSegments = 1; }
            if (heightSegments === void 0) { heightSegments = 1; }
            var _this = this;
            var data = PlaneGeometry(null, 0, 0, 0, 0, 1, 2, 1, -1, width, height, 1, widthSegments, heightSegments);
            var geometry = new Geometry(data);
            _this = _super.call(this, x, y, z, geometry) || this;
            return _this;
        }
        return Plane;
    }(Mesh));

    var RenderLayer3D = (function (_super) {
        __extends(RenderLayer3D, _super);
        function RenderLayer3D() {
            var _this = _super.call(this) || this;
            _this.type = 'RenderLayer';
            _this.willRender = true;
            _this.willRenderChildren = true;
            _this.willCacheChildren = true;
            _this.setDirty(DIRTY_CONST.CHILD_CACHE);
            var width = GetWidth();
            var height = GetHeight();
            var resolution = GetResolution();
            var texture = new Texture(null, width * resolution, height * resolution);
            var binding = new GLTextureBinding(texture);
            texture.binding = binding;
            binding.framebuffer = CreateFramebuffer(binding.texture);
            binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
            _this.texture = texture;
            _this.framebuffer = binding.framebuffer;
            return _this;
        }
        RenderLayer3D.prototype.renderGL = function (renderPass) {
            if (this.numChildren > 0) {
                Flush(renderPass);
                if (!this.willCacheChildren || this.isDirty(DIRTY_CONST.CHILD_CACHE)) {
                    SetFramebuffer(renderPass, this.framebuffer, true);
                    this.clearDirty(DIRTY_CONST.CHILD_CACHE);
                }
                else {
                    SetFramebuffer(renderPass, this.framebuffer, false);
                    this.postRenderGL(renderPass);
                }
            }
        };
        RenderLayer3D.prototype.postRenderGL = function (renderPass) {
            Flush(renderPass);
            PopFramebuffer(renderPass);
            DrawTexturedQuad(renderPass, this.texture);
            this.clearDirty(DIRTY_CONST.TRANSFORM);
        };
        return RenderLayer3D;
    }(Layer));

    function SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
        if (radius === void 0) { radius = 1; }
        if (widthSegments === void 0) { widthSegments = 3; }
        if (heightSegments === void 0) { heightSegments = 3; }
        if (phiStart === void 0) { phiStart = 0; }
        if (phiLength === void 0) { phiLength = Math.PI * 2; }
        if (thetaStart === void 0) { thetaStart = 0; }
        if (thetaLength === void 0) { thetaLength = Math.PI; }
        widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
        heightSegments = Math.max(2, Math.floor(heightSegments) || 6);
        var thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);
        var data = CreateVertexSet();
        var vertices = data.vertices, normals = data.normals, uvs = data.uvs, indices = data.indices;
        var index = 0;
        var grid = [];
        var vertex = new Vec3();
        var normal = new Vec3();
        for (var iy = 0; iy <= heightSegments; iy++) {
            var verticesRow = [];
            var v = iy / heightSegments;
            var uOffset = 0;
            if (iy === 0 && thetaStart === 0) {
                uOffset = 0.5 / widthSegments;
            }
            else if (iy === heightSegments && thetaEnd == Math.PI) {
                uOffset = -0.5 / widthSegments;
            }
            for (var ix = 0; ix <= widthSegments; ix++) {
                var u = ix / widthSegments;
                vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertices.push(vertex.x, vertex.y, vertex.z);
                Vec3Normalize(vertex, normal);
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(u + uOffset, 1 - v);
                verticesRow.push(index++);
            }
            grid.push(verticesRow);
        }
        for (var iy = 0; iy < heightSegments; iy++) {
            for (var ix = 0; ix < widthSegments; ix++) {
                var a = grid[iy][ix + 1];
                var b = grid[iy][ix];
                var c = grid[iy + 1][ix];
                var d = grid[iy + 1][ix + 1];
                if (iy !== 0 || thetaStart > 0) {
                    indices.push(a, b, d);
                }
                if (iy !== heightSegments - 1 || thetaEnd < Math.PI) {
                    indices.push(b, c, d);
                }
            }
        }
        data.numberOfVertices = vertices.length;
        return data;
    }

    var Sphere = (function (_super) {
        __extends(Sphere, _super);
        function Sphere(x, y, z, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (radius === void 0) { radius = 1; }
            if (widthSegments === void 0) { widthSegments = 3; }
            if (heightSegments === void 0) { heightSegments = 3; }
            if (phiStart === void 0) { phiStart = 0; }
            if (phiLength === void 0) { phiLength = Math.PI * 2; }
            if (thetaStart === void 0) { thetaStart = 0; }
            if (thetaLength === void 0) { thetaLength = Math.PI; }
            var _this = this;
            var data = SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
            var geometry = new Geometry(data);
            _this = _super.call(this, x, y, z, geometry) || this;
            return _this;
        }
        return Sphere;
    }(Mesh));

    var index$n = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Components: index$q,
        Geometry: index$o,
        Box: Box,
        Cone: Cone,
        Light: Light,
        Material: Material,
        Mesh: Mesh,
        Plane: Plane,
        RenderLayer3D: RenderLayer3D,
        Sphere: Sphere,
        GameObject3D: GameObject3D
    });

    function CircleContains(circle, x, y) {
        if (circle.radius > 0 && x >= circle.left && x <= circle.right && y >= circle.top && y <= circle.bottom) {
            var dx = (circle.x - x) * (circle.x - x);
            var dy = (circle.y - y) * (circle.y - y);
            return (dx + dy) <= (circle.radius * circle.radius);
        }
        else {
            return false;
        }
    }

    var Circle$1 = (function () {
        function Circle(x, y, radius) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (radius === void 0) { radius = 0; }
            this.set(x, y, radius);
        }
        Circle.prototype.set = function (x, y, radius) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (radius === void 0) { radius = 0; }
            this.x = x;
            this.y = y;
            this.radius = radius;
            return this;
        };
        Circle.prototype.contains = function (x, y) {
            return CircleContains(this, x, y);
        };
        Object.defineProperty(Circle.prototype, "radius", {
            get: function () {
                return this._radius;
            },
            set: function (value) {
                this._radius = value;
                this._diameter = value * 2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "diameter", {
            get: function () {
                return this._diameter;
            },
            set: function (value) {
                this._diameter = value;
                this._radius = value * 0.5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "left", {
            get: function () {
                return this.x - this._radius;
            },
            set: function (value) {
                this.x = value + this._radius;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "right", {
            get: function () {
                return this.x + this._radius;
            },
            set: function (value) {
                this.x = value - this._radius;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "top", {
            get: function () {
                return this.y - this._radius;
            },
            set: function (value) {
                this.y = value + this._radius;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "bottom", {
            get: function () {
                return this.y + this._radius;
            },
            set: function (value) {
                this.y = value - this._radius;
            },
            enumerable: false,
            configurable: true
        });
        return Circle;
    }());

    function CircleContainsPoint(circle, point) {
        return CircleContains(circle, point.x, point.y);
    }

    function CircleContainsRect(circle, rect) {
        return (CircleContains(circle, rect.x, rect.y) &&
            CircleContains(circle, rect.right, rect.y) &&
            CircleContains(circle, rect.x, rect.bottom) &&
            CircleContains(circle, rect.right, rect.bottom));
    }

    function CircleEquals(circle, toCompare) {
        return (circle.x === toCompare.x &&
            circle.y === toCompare.y &&
            circle.radius === toCompare.radius);
    }

    function CloneCircle(source) {
        return new Circle$1(source.x, source.y, source.radius);
    }

    function CopyCircleFrom(source, dest) {
        return dest.set(source.x, source.y, source.radius);
    }

    function GetCircleArea(circle) {
        return (circle.radius > 0) ? Math.PI * circle.radius * circle.radius : 0;
    }

    function GetCircleBounds(circle, out) {
        if (out === void 0) { out = new Rectangle$1(); }
        return out.set(circle.left, circle.top, circle.diameter, circle.diameter);
    }

    function GetCircleCircumference(circle) {
        return 2 * (Math.PI * circle.radius);
    }

    function GetCircleCircumferencePoint(circle, angle, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set(circle.x + (circle.radius * Math.cos(angle)), circle.y + (circle.radius * Math.sin(angle)));
    }

    function GetCirclePoint(circle, position, out) {
        if (out === void 0) { out = new Vec2(); }
        var angle = FromPercent(position, 0, MATH_CONST.PI2);
        return GetCircleCircumferencePoint(circle, angle, out);
    }

    function GetCirclePoints(circle, step, quantity, out) {
        if (quantity === void 0) { quantity = 0; }
        if (out === void 0) { out = []; }
        if (!quantity) {
            quantity = GetCircleCircumference(circle) / step;
        }
        for (var i = 0; i < quantity; i++) {
            var angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
            out.push(GetCircleCircumferencePoint(circle, angle));
        }
        return out;
    }

    function GetCircleRandomPoint(circle, out) {
        if (out === void 0) { out = new Vec2(); }
        var t = 2 * Math.PI * Math.random();
        var u = Math.random() + Math.random();
        var r = (u > 1) ? 2 - u : u;
        var x = r * Math.cos(t);
        var y = r * Math.sin(t);
        return out.set(circle.x + (x * circle.radius), circle.y + (y * circle.radius));
    }

    function TranslateCircle(circle, x, y) {
        circle.x += x;
        circle.y += y;
        return circle;
    }

    function TranslateCirclePoint(circle, point) {
        circle.x += point.x;
        circle.y += point.y;
        return circle;
    }

    var index$m = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Circle: Circle$1,
        CircleContains: CircleContains,
        CircleContainsPoint: CircleContainsPoint,
        CircleContainsRect: CircleContainsRect,
        CircleEquals: CircleEquals,
        GetCircleRandomPoint: GetCircleRandomPoint,
        CloneCircle: CloneCircle,
        CopyCircleFrom: CopyCircleFrom,
        GetCircleArea: GetCircleArea,
        GetCircleBounds: GetCircleBounds,
        GetCircleCircumference: GetCircleCircumference,
        GetCircleCircumferencePoint: GetCircleCircumferencePoint,
        GetCirclePoint: GetCirclePoint,
        GetCirclePoints: GetCirclePoints,
        TranslateCircle: TranslateCircle,
        TranslateCirclePoint: TranslateCirclePoint
    });

    function EllipseContains(ellipse, x, y) {
        if (ellipse.width <= 0 || ellipse.height <= 0) {
            return false;
        }
        var normx = ((x - ellipse.x) / ellipse.width);
        var normy = ((y - ellipse.y) / ellipse.height);
        normx *= normx;
        normy *= normy;
        return (normx + normy < 0.25);
    }

    var Ellipse = (function () {
        function Ellipse(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.set(x, y, width, height);
        }
        Ellipse.prototype.set = function (x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        };
        Ellipse.prototype.contains = function (x, y) {
            return EllipseContains(this, x, y);
        };
        Ellipse.prototype.getMinorRadius = function () {
            return Math.min(this.width, this.height) / 2;
        };
        Ellipse.prototype.getMajorRadius = function () {
            return Math.max(this.width, this.height) / 2;
        };
        Object.defineProperty(Ellipse.prototype, "left", {
            get: function () {
                return this.x - (this.width / 2);
            },
            set: function (value) {
                this.x = value + (this.width / 2);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ellipse.prototype, "right", {
            get: function () {
                return this.x + (this.width / 2);
            },
            set: function (value) {
                this.x = value - (this.width / 2);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ellipse.prototype, "top", {
            get: function () {
                return this.y - (this.height / 2);
            },
            set: function (value) {
                this.y = value + (this.height / 2);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ellipse.prototype, "bottom", {
            get: function () {
                return this.y + (this.height / 2);
            },
            set: function (value) {
                this.y = value - (this.height / 2);
            },
            enumerable: false,
            configurable: true
        });
        return Ellipse;
    }());

    function CloneEllipse(source) {
        return new Ellipse(source.x, source.y, source.width, source.height);
    }

    function CopyEllipseFrom(source, dest) {
        return dest.set(source.x, source.y, source.width, source.height);
    }

    function EllipseContainsPoint(ellipse, point) {
        return EllipseContains(ellipse, point.x, point.y);
    }

    function EllipseContainsRect(ellipse, rect) {
        return (EllipseContains(ellipse, rect.x, rect.y) &&
            EllipseContains(ellipse, rect.right, rect.y) &&
            EllipseContains(ellipse, rect.x, rect.bottom) &&
            EllipseContains(ellipse, rect.right, rect.bottom));
    }

    function EllipseEquals(ellipse, toCompare) {
        return (ellipse.x === toCompare.x &&
            ellipse.y === toCompare.y &&
            ellipse.width === toCompare.width &&
            ellipse.height === toCompare.height);
    }

    function GetEllipseArea(ellipse) {
        if ((ellipse.width <= 0 || ellipse.height <= 0)) {
            return 0;
        }
        return (ellipse.getMajorRadius() * ellipse.getMinorRadius() * Math.PI);
    }

    function GetEllipseBounds(ellipse, out) {
        if (out === void 0) { out = new Rectangle$1(); }
        return out.set(ellipse.left, ellipse.top, ellipse.width, ellipse.height);
    }

    function GetEllipseCircumference(ellipse) {
        var rx = ellipse.width / 2;
        var ry = ellipse.height / 2;
        var h = Math.pow((rx - ry), 2) / Math.pow((rx + ry), 2);
        return (Math.PI * (rx + ry)) * (1 + ((3 * h) / (10 + Math.sqrt(4 - (3 * h)))));
    }

    function GetEllipseCircumferencePoint(ellipse, angle, out) {
        if (out === void 0) { out = new Vec2(); }
        var halfWidth = ellipse.width / 2;
        var halfHeight = ellipse.height / 2;
        return out.set(ellipse.x + halfWidth * Math.cos(angle), ellipse.y + halfHeight * Math.sin(angle));
    }

    function GetEllipsePoint(ellipse, position, out) {
        if (out === void 0) { out = new Vec2(); }
        var angle = FromPercent(position, 0, MATH_CONST.PI2);
        return GetEllipseCircumferencePoint(ellipse, angle, out);
    }

    function GetEllipsePoints(ellipse, step, quantity, out) {
        if (quantity === void 0) { quantity = 0; }
        if (out === void 0) { out = []; }
        if (!quantity) {
            quantity = GetEllipseCircumference(ellipse) / step;
        }
        for (var i = 0; i < quantity; i++) {
            var angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
            out.push(GetEllipseCircumferencePoint(ellipse, angle));
        }
        return out;
    }

    function GetEllipseRandomPoint(ellipse, out) {
        if (out === void 0) { out = new Vec2(); }
        var p = Math.random() * Math.PI * 2;
        var s = Math.sqrt(Math.random());
        out.x = ellipse.x + ((s * Math.cos(p)) * ellipse.width / 2);
        out.y = ellipse.y + ((s * Math.sin(p)) * ellipse.height / 2);
        return out;
    }

    function TranslateEllipse(ellipse, x, y) {
        ellipse.x += x;
        ellipse.y += y;
        return ellipse;
    }

    function TranslateEllipsePoint(ellipse, point) {
        ellipse.x += point.x;
        ellipse.y += point.y;
        return ellipse;
    }

    var index$l = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CloneEllipse: CloneEllipse,
        CopyEllipseFrom: CopyEllipseFrom,
        Ellipse: Ellipse,
        EllipseContains: EllipseContains,
        EllipseContainsPoint: EllipseContainsPoint,
        EllipseContainsRect: EllipseContainsRect,
        EllipseEquals: EllipseEquals,
        GetEllipseRandomPoint: GetEllipseRandomPoint,
        GetEllipseArea: GetEllipseArea,
        GetEllipseBounds: GetEllipseBounds,
        GetEllipseCircumference: GetEllipseCircumference,
        GetEllipseCircumferencePoint: GetEllipseCircumferencePoint,
        GetEllipsePoint: GetEllipsePoint,
        GetEllipsePoints: GetEllipsePoints,
        TranslateEllipse: TranslateEllipse,
        TranslateEllipsePoint: TranslateEllipsePoint
    });

    function CircleToCircle(circleA, circleB) {
        return (GetVec2Distance(circleA, circleB) <= (circleA.radius + circleB.radius));
    }

    function CircleToRectangle(circle, rect) {
        var halfWidth = rect.width / 2;
        var halfHeight = rect.height / 2;
        var cx = Math.abs(circle.x - rect.x - halfWidth);
        var cy = Math.abs(circle.y - rect.y - halfHeight);
        var xDist = halfWidth + circle.radius;
        var yDist = halfHeight + circle.radius;
        if (cx > xDist || cy > yDist) {
            return false;
        }
        else if (cx <= halfWidth || cy <= halfHeight) {
            return true;
        }
        else {
            var xCornerDist = cx - halfWidth;
            var yCornerDist = cy - halfHeight;
            var xCornerDistSq = xCornerDist * xCornerDist;
            var yCornerDistSq = yCornerDist * yCornerDist;
            var maxCornerDistSq = circle.radius * circle.radius;
            return (xCornerDistSq + yCornerDistSq <= maxCornerDistSq);
        }
    }

    function GetCircleToCircle(circleA, circleB, out) {
        if (out === void 0) { out = []; }
        if (CircleToCircle(circleA, circleB)) {
            var x0 = circleA.x;
            var y0 = circleA.y;
            var r0 = circleA.radius;
            var x1 = circleB.x;
            var y1 = circleB.y;
            var r1 = circleB.radius;
            var coefficientA = void 0;
            var coefficientB = void 0;
            var coefficientC = void 0;
            var lambda = void 0;
            var x = void 0;
            if (y0 === y1) {
                x = ((r1 * r1) - (r0 * r0) - (x1 * x1) + (x0 * x0)) / (2 * (x0 - x1));
                coefficientA = 1;
                coefficientB = -2 * y1;
                coefficientC = (x1 * x1) + (x * x) - (2 * x1 * x) + (y1 * y1) - (r1 * r1);
                lambda = (coefficientB * coefficientB) - (4 * coefficientA * coefficientC);
                if (lambda === 0) {
                    out.push(new Vec2(x, (-coefficientB / (2 * coefficientA))));
                }
                else if (lambda > 0) {
                    out.push(new Vec2(x, (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA)));
                    out.push(new Vec2(x, (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA)));
                }
            }
            else {
                var v1 = (x0 - x1) / (y0 - y1);
                var n = (r1 * r1 - r0 * r0 - x1 * x1 + x0 * x0 - y1 * y1 + y0 * y0) / (2 * (y0 - y1));
                coefficientA = (v1 * v1) + 1;
                coefficientB = (2 * y0 * v1) - (2 * n * v1) - (2 * x0);
                coefficientC = (x0 * x0) + (y0 * y0) + (n * n) - (r0 * r0) - (2 * y0 * n);
                lambda = (coefficientB * coefficientB) - (4 * coefficientA * coefficientC);
                if (lambda === 0) {
                    x = (-coefficientB / (2 * coefficientA));
                    out.push(new Vec2(x, (n - (x * v1))));
                }
                else if (lambda > 0) {
                    x = (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA);
                    out.push(new Vec2(x, (n - (x * v1))));
                    x = (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA);
                    out.push(new Vec2(x, (n - (x * v1))));
                }
            }
        }
        return out;
    }

    var tmp = new Vec2();
    function LineToCircle(line, circle, nearest) {
        if (!nearest) {
            nearest = tmp;
        }
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        if (CircleContains(circle, x1, y1)) {
            nearest.set(x1, y1);
            return true;
        }
        if (CircleContains(circle, x2, y2)) {
            nearest.set(x2, y2);
            return true;
        }
        var dx = x2 - x1;
        var dy = y2 - y1;
        var lcx = circle.x - x1;
        var lcy = circle.y - y1;
        var dLen2 = (dx * dx) + (dy * dy);
        var px = dx;
        var py = dy;
        if (dLen2 > 0) {
            var dp = ((lcx * dx) + (lcy * dy)) / dLen2;
            px *= dp;
            py *= dp;
        }
        nearest.set(x1 + px, y1 + py);
        var pLen2 = (px * px) + (py * py);
        return (pLen2 <= dLen2 &&
            ((px * dx) + (py * dy)) >= 0 &&
            CircleContains(circle, nearest.x, nearest.y));
    }

    function GetLineToCircle(line, circle, out) {
        if (out === void 0) { out = []; }
        if (LineToCircle(line, circle)) {
            var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
            var cr = circle.radius;
            var lDirX = x2 - x1;
            var lDirY = y2 - y1;
            var oDirX = x1 - circle.x;
            var oDirY = y1 - circle.y;
            var coefficientA = lDirX * lDirX + lDirY * lDirY;
            var coefficientB = 2 * (lDirX * oDirX + lDirY * oDirY);
            var coefficientC = oDirX * oDirX + oDirY * oDirY - cr * cr;
            var lambda = (coefficientB * coefficientB) - (4 * coefficientA * coefficientC);
            var x = void 0;
            var y = void 0;
            if (lambda === 0) {
                var root = -coefficientB / (2 * coefficientA);
                x = x1 + root * lDirX;
                y = y1 + root * lDirY;
                if (root >= 0 && root <= 1) {
                    out.push(new Vec2(x, y));
                }
            }
            else if (lambda > 0) {
                var root1 = (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA);
                x = x1 + root1 * lDirX;
                y = y1 + root1 * lDirY;
                if (root1 >= 0 && root1 <= 1) {
                    out.push(new Vec2(x, y));
                }
                var root2 = (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA);
                x = x1 + root2 * lDirX;
                y = y1 + root2 * lDirY;
                if (root2 >= 0 && root2 <= 1) {
                    out.push(new Vec2(x, y));
                }
            }
        }
        return out;
    }

    function GetCircleToRectangle(circle, rect, out) {
        if (out === void 0) { out = []; }
        if (CircleToRectangle(circle, rect)) {
            var _a = __read(GetRectangleEdges(rect), 4), line1 = _a[0], line2 = _a[1], line3 = _a[2], line4 = _a[3];
            GetLineToCircle(line1, circle, out);
            GetLineToCircle(line2, circle, out);
            GetLineToCircle(line3, circle, out);
            GetLineToCircle(line4, circle, out);
        }
        return out;
    }

    function LineToLine(line1, line2, out) {
        var x1 = line1.x1, y1 = line1.y1, x2 = line1.x2, y2 = line1.y2;
        var x3 = line2.x1, y3 = line2.y1, x4 = line2.x2, y4 = line2.y2;
        var numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
        var numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
        var deNom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (deNom === 0) {
            return false;
        }
        var uA = numA / deNom;
        var uB = numB / deNom;
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            if (out) {
                out.set(x1 + (uA * (x2 - x1)), y1 + (uA * (y2 - y1)));
            }
            return true;
        }
        return false;
    }

    function LineToRectangle(line, rect) {
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        var x = rect.x, y = rect.y, right = rect.right, bottom = rect.bottom;
        var t = 0;
        if ((x1 >= x && x1 <= right && y1 >= y && y1 <= bottom) ||
            (x2 >= x && x2 <= right && y2 >= y && y2 <= bottom)) {
            return true;
        }
        if (x1 < x && x2 >= x) {
            t = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
            if (t > y && t <= bottom) {
                return true;
            }
        }
        else if (x1 > right && x2 <= right) {
            t = y1 + (y2 - y1) * (right - x1) / (x2 - x1);
            if (t >= y && t <= bottom) {
                return true;
            }
        }
        if (y1 < y && y2 >= y) {
            t = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
            if (t >= x && t <= right) {
                return true;
            }
        }
        else if (y1 > bottom && y2 <= bottom) {
            t = x1 + (x2 - x1) * (bottom - y1) / (y2 - y1);
            if (t >= x && t <= right) {
                return true;
            }
        }
        return false;
    }

    function GetLineToRectangle(line, rect, out) {
        if (out === void 0) { out = []; }
        if (LineToRectangle(line, rect)) {
            var _a = __read(GetRectangleEdges(rect), 4), lineA = _a[0], lineB = _a[1], lineC = _a[2], lineD = _a[3];
            var points = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
            var results = [
                LineToLine(lineA, line, points[0]),
                LineToLine(lineB, line, points[1]),
                LineToLine(lineC, line, points[2]),
                LineToLine(lineD, line, points[3])
            ];
            for (var i = 0; i < results.length; i++) {
                if (results[i]) {
                    out.push(points[i]);
                }
            }
        }
        return out;
    }

    function GetRectangleIntersection(rectA, rectB, out) {
        if (out === void 0) { out = new Rectangle$1(); }
        if (RectangleToRectangle(rectA, rectB)) {
            var x = Math.max(rectA.x, rectB.x);
            var y = Math.max(rectA.y, rectB.y);
            return out.set(x, y, Math.min(rectA.right, rectB.right) - x, Math.min(rectA.bottom, rectB.bottom) - y);
        }
    }

    function GetRectangleToRectangle(rectA, rectB, out) {
        if (out === void 0) { out = []; }
        if (RectangleToRectangle(rectA, rectB)) {
            var _a = __read(GetRectangleEdges(rectA), 4), lineA = _a[0], lineB = _a[1], lineC = _a[2], lineD = _a[3];
            GetLineToRectangle(lineA, rectB, out);
            GetLineToRectangle(lineB, rectB, out);
            GetLineToRectangle(lineC, rectB, out);
            GetLineToRectangle(lineD, rectB, out);
        }
        return out;
    }

    function GetTriangleEdges(triangle) {
        var x1 = triangle.x1, y1 = triangle.y1, x2 = triangle.x2, y2 = triangle.y2, x3 = triangle.x3, y3 = triangle.y3;
        var edge1 = new Line(x1, y1, x2, y2);
        var edge2 = new Line(x2, y2, x3, y3);
        var edge3 = new Line(x3, y3, x1, y1);
        return [edge1, edge2, edge3];
    }

    function TriangleContains(triangle, x, y) {
        var x1 = triangle.x1, y1 = triangle.y1, x2 = triangle.x2, y2 = triangle.y2, x3 = triangle.x3, y3 = triangle.y3;
        var v0x = x3 - x1;
        var v0y = y3 - y1;
        var v1x = x2 - x1;
        var v1y = y2 - y1;
        var v2x = x - x1;
        var v2y = y - y1;
        var dot00 = (v0x * v0x) + (v0y * v0y);
        var dot01 = (v0x * v1x) + (v0y * v1y);
        var dot02 = (v0x * v2x) + (v0y * v2y);
        var dot11 = (v1x * v1x) + (v1y * v1y);
        var dot12 = (v1x * v2x) + (v1y * v2y);
        var b = ((dot00 * dot11) - (dot01 * dot01));
        var inv = (b === 0) ? 0 : (1 / b);
        var u = ((dot11 * dot02) - (dot01 * dot12)) * inv;
        var v = ((dot00 * dot12) - (dot01 * dot02)) * inv;
        return (u >= 0 && v >= 0 && (u + v < 1));
    }

    function TriangleContainsPoints(triangle, points, returnFirst, out) {
        if (returnFirst === void 0) { returnFirst = false; }
        if (out === void 0) { out = []; }
        var skip = false;
        points.forEach(function (point) {
            if (skip) {
                return;
            }
            var x = point.x, y = point.y;
            if (TriangleContains(triangle, x, y)) {
                out.push(new Vec2(x, y));
                if (returnFirst) {
                    skip = true;
                }
            }
        });
        return out;
    }

    function RectangleToTriangle(rect, triangle) {
        if (triangle.left > rect.right ||
            triangle.right < rect.x ||
            triangle.top > rect.bottom ||
            triangle.bottom < rect.y) {
            return false;
        }
        var _a = __read(GetTriangleEdges(triangle), 3), triA = _a[0], triB = _a[1], triC = _a[2];
        if (RectangleContains(rect, triA.x1, triA.y1) || RectangleContains(rect, triA.x2, triA.y2)) {
            return true;
        }
        if (RectangleContains(rect, triB.x1, triB.y1) || RectangleContains(rect, triB.x2, triB.y2)) {
            return true;
        }
        if (RectangleContains(rect, triC.x1, triC.y1) || RectangleContains(rect, triC.x2, triC.y2)) {
            return true;
        }
        var _b = __read(GetRectangleEdges(rect), 4), rectA = _b[0], rectB = _b[1], rectC = _b[2], rectD = _b[3];
        if (LineToLine(triA, rectA) || LineToLine(triA, rectB) || LineToLine(triA, rectC) || LineToLine(triA, rectD)) {
            return true;
        }
        if (LineToLine(triB, rectA) || LineToLine(triB, rectB) || LineToLine(triB, rectC) || LineToLine(triB, rectD)) {
            return true;
        }
        if (LineToLine(triC, rectA) || LineToLine(triC, rectB) || LineToLine(triC, rectC) || LineToLine(triC, rectD)) {
            return true;
        }
        var within = TriangleContainsPoints(triangle, DecomposeRectangle(rect), true);
        return (within.length > 0);
    }

    function GetRectangleToTriangle(rect, triangle, out) {
        if (out === void 0) { out = []; }
        if (RectangleToTriangle(rect, triangle)) {
            var _a = __read(GetTriangleEdges(triangle), 3), lineA = _a[0], lineB = _a[1], lineC = _a[2];
            GetLineToRectangle(lineA, rect, out);
            GetLineToRectangle(lineB, rect, out);
            GetLineToRectangle(lineC, rect, out);
        }
        return out;
    }

    function TriangleToCircle(triangle, circle) {
        if (triangle.left > circle.right ||
            triangle.right < circle.left ||
            triangle.top > circle.bottom ||
            triangle.bottom < circle.top) {
            return false;
        }
        if (TriangleContains(triangle, circle.x, circle.y)) {
            return true;
        }
        var _a = __read(GetTriangleEdges(triangle), 3), line1 = _a[0], line2 = _a[1], line3 = _a[2];
        return (LineToCircle(line1, circle) ||
            LineToCircle(line2, circle) ||
            LineToCircle(line3, circle));
    }

    function GetTriangleToCircle(triangle, circle, out) {
        if (out === void 0) { out = []; }
        if (TriangleToCircle(triangle, circle)) {
            var _a = __read(GetTriangleEdges(triangle), 3), lineA = _a[0], lineB = _a[1], lineC = _a[2];
            GetLineToCircle(lineA, circle, out);
            GetLineToCircle(lineB, circle, out);
            GetLineToCircle(lineC, circle, out);
        }
        return out;
    }

    function TriangleToLine(triangle, line) {
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        if (TriangleContains(triangle, x1, y1) || TriangleContains(triangle, x2, y2)) {
            return true;
        }
        var _a = __read(GetTriangleEdges(triangle), 3), line1 = _a[0], line2 = _a[1], line3 = _a[2];
        return (LineToLine(line1, line) ||
            LineToLine(line2, line) ||
            LineToLine(line3, line));
    }

    function GetTriangleToLine(triangle, line, out) {
        if (out === void 0) { out = []; }
        if (TriangleToLine(triangle, line)) {
            var _a = __read(GetTriangleEdges(triangle), 3), lineA = _a[0], lineB = _a[1], lineC = _a[2];
            var points = [new Vec2(), new Vec2(), new Vec2()];
            var results = [
                LineToLine(lineA, line, points[0]),
                LineToLine(lineB, line, points[1]),
                LineToLine(lineC, line, points[2])
            ];
            for (var i = 0; i < results.length; i++) {
                if (results[i]) {
                    out.push(points[i]);
                }
            }
        }
        return out;
    }

    function DecomposeTriangle(triangle, out) {
        if (out === void 0) { out = []; }
        var x1 = triangle.x1, y1 = triangle.y1, x2 = triangle.x2, y2 = triangle.y2, x3 = triangle.x3, y3 = triangle.y3;
        out.push(new Vec2(x1, y1), new Vec2(x2, y2), new Vec2(x3, y3));
        return out;
    }

    function TriangleToTriangle(triangleA, triangleB) {
        if (triangleA.left > triangleB.right ||
            triangleA.right < triangleB.left ||
            triangleA.top > triangleB.bottom ||
            triangleA.bottom < triangleB.top) {
            return false;
        }
        var _a = __read(GetTriangleEdges(triangleA), 3), lineAA = _a[0], lineAB = _a[1], lineAC = _a[2];
        var _b = __read(GetTriangleEdges(triangleB), 3), lineBA = _b[0], lineBB = _b[1], lineBC = _b[2];
        if (LineToLine(lineAA, lineBA) ||
            LineToLine(lineAA, lineBB) ||
            LineToLine(lineAA, lineBC) ||
            LineToLine(lineAB, lineBA) ||
            LineToLine(lineAB, lineBB) ||
            LineToLine(lineAB, lineBC) ||
            LineToLine(lineAC, lineBA) ||
            LineToLine(lineAC, lineBB) ||
            LineToLine(lineAC, lineBC)) {
            return true;
        }
        var withinA = TriangleContainsPoints(triangleB, DecomposeTriangle(triangleA), true);
        if (withinA.length > 0) {
            return true;
        }
        var withinB = TriangleContainsPoints(triangleA, DecomposeTriangle(triangleB), true);
        return (withinB.length > 0);
    }

    function GetTriangleToTriangle(triangleA, triangleB, out) {
        if (out === void 0) { out = []; }
        if (TriangleToTriangle(triangleA, triangleB)) {
            var _a = __read(GetTriangleEdges(triangleB), 3), lineA = _a[0], lineB = _a[1], lineC = _a[2];
            GetTriangleToLine(triangleA, lineA, out);
            GetTriangleToLine(triangleA, lineB, out);
            GetTriangleToLine(triangleA, lineC, out);
        }
        return out;
    }

    function PointToLine(point, line, lineThickness) {
        if (lineThickness === void 0) { lineThickness = 1; }
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        var px = point.x, py = point.y;
        var L2 = (((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        if (L2 === 0) {
            return false;
        }
        var r = (((px - x1) * (x2 - x1)) + ((py - y1) * (y2 - y1))) / L2;
        if (r < 0) {
            return (Math.sqrt(((x1 - px) * (x1 - px)) + ((y1 - py) * (y1 - py))) <= lineThickness);
        }
        else if ((r >= 0) && (r <= 1)) {
            var s = (((y1 - py) * (x2 - x1)) - ((x1 - px) * (y2 - y1))) / L2;
            return (Math.abs(s) * Math.sqrt(L2) <= lineThickness);
        }
        else {
            return (Math.sqrt(((x2 - px) * (x2 - px)) + ((y2 - py) * (y2 - py))) <= lineThickness);
        }
    }

    function PointToLineSegment(point, line) {
        if (!PointToLine(point, line)) {
            return false;
        }
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        var x = point.x, y = point.y;
        var xMin = Math.min(x1, x2);
        var xMax = Math.max(x1, x2);
        var yMin = Math.min(y1, y2);
        var yMax = Math.max(y1, y2);
        return ((x >= xMin && x <= xMax) && (y >= yMin && y <= yMax));
    }

    var index$k = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CircleToCircle: CircleToCircle,
        CircleToRectangle: CircleToRectangle,
        GetCircleToCircle: GetCircleToCircle,
        GetCircleToRectangle: GetCircleToRectangle,
        GetLineToCircle: GetLineToCircle,
        GetLineToRectangle: GetLineToRectangle,
        GetRectangleIntersection: GetRectangleIntersection,
        GetRectangleToRectangle: GetRectangleToRectangle,
        GetRectangleToTriangle: GetRectangleToTriangle,
        GetTriangleToCircle: GetTriangleToCircle,
        GetTriangleToLine: GetTriangleToLine,
        GetTriangleToTriangle: GetTriangleToTriangle,
        LineToCircle: LineToCircle,
        LineToLine: LineToLine,
        LineToRectangle: LineToRectangle,
        PointToLine: PointToLine,
        PointToLineSegment: PointToLineSegment,
        RectangleToRectangle: RectangleToRectangle,
        RectangleToTriangle: RectangleToTriangle,
        TriangleToCircle: TriangleToCircle,
        TriangleToLine: TriangleToLine,
        TriangleToTriangle: TriangleToTriangle
    });

    function CenterLineOn(line, x, y) {
        var tx = x - ((line.x1 + line.x2) / 2);
        var ty = y - ((line.y1 + line.y2) / 2);
        line.x1 += tx;
        line.y1 += ty;
        line.x2 += tx;
        line.y2 += ty;
        return line;
    }

    function CloneLine(source) {
        return new Line(source.x1, source.y1, source.x2, source.y2);
    }

    function CopyLineFrom(source, dest) {
        return dest.set(source.x1, source.y1, source.x2, source.y2);
    }

    function GetLineLength(line) {
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    function ExtendLine(line, left, right) {
        if (right === void 0) { right = left; }
        var length = GetLineLength(line);
        var slopX = line.x2 - line.x1;
        var slopY = line.y2 - line.y1;
        if (left) {
            line.x1 = line.x1 - slopX / length * left;
            line.y1 = line.y1 - slopY / length * left;
        }
        if (right) {
            line.x2 = line.x2 + slopX / length * right;
            line.y2 = line.y2 + slopY / length * right;
        }
        return line;
    }

    function GetLineAngle(line) {
        return Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
    }

    function GetLineBresenhamPoints(line, stepRate, results) {
        if (stepRate === void 0) { stepRate = 1; }
        if (results === void 0) { results = []; }
        var x1 = Math.round(line.x1);
        var y1 = Math.round(line.y1);
        var x2 = Math.round(line.x2);
        var y2 = Math.round(line.y2);
        var dx = Math.abs(x2 - x1);
        var dy = Math.abs(y2 - y1);
        var sx = (x1 < x2) ? 1 : -1;
        var sy = (y1 < y2) ? 1 : -1;
        var err = dx - dy;
        results.push(new Vec2(x1, y1));
        var i = 1;
        while (!((x1 === x2) && (y1 === y2))) {
            var e2 = err << 1;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
            if (i % stepRate === 0) {
                results.push(new Vec2(x1, y1));
            }
            i++;
        }
        return results;
    }

    function GetLineHeight(line) {
        return Math.abs(line.y1 - line.y2);
    }

    function GetLineMidPoint(line, out) {
        if (out === void 0) { out = new Vec2(); }
        out.x = (line.x1 + line.x2) / 2;
        out.y = (line.y1 + line.y2) / 2;
        return out;
    }

    function GetLineNearestPoint(line, point, out) {
        if (out === void 0) { out = new Vec2(); }
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        var L2 = (((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        if (L2 === 0) {
            return out;
        }
        var r = (((point.x - x1) * (x2 - x1)) + ((point.y - y1) * (y2 - y1))) / L2;
        out.x = x1 + (r * (x2 - x1));
        out.y = y1 + (r * (y2 - y1));
        return out;
    }

    function GetLineNormal(line, out) {
        if (out === void 0) { out = new Vec2(); }
        var a = GetLineAngle(line) - MATH_CONST.HALF_PI;
        out.x = Math.cos(a);
        out.y = Math.sin(a);
        return out;
    }

    function GetLineNormalAngle(line) {
        var angle = GetLineAngle(line) - MATH_CONST.HALF_PI;
        return Wrap(angle, -Math.PI, Math.PI);
    }

    function GetLineNormalX(line) {
        return Math.cos(GetLineAngle(line) - MATH_CONST.HALF_PI);
    }

    function GetLineNormalY(line) {
        return Math.sin(GetLineAngle(line) - MATH_CONST.HALF_PI);
    }

    function GetLinePerpSlope(line) {
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        return -((x2 - x1) / (y2 - y1));
    }

    function GetLinePoint(line, position, out) {
        if (out === void 0) { out = new Vec2(); }
        out.x = line.x1 + (line.x2 - line.x1) * position;
        out.y = line.y1 + (line.y2 - line.y1) * position;
        return out;
    }

    function GetLinePoints(line, quantity, stepRate, out) {
        if (stepRate === void 0) { stepRate = 0; }
        if (out === void 0) { out = []; }
        if (!quantity) {
            quantity = GetLineLength(line) / stepRate;
        }
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        for (var i = 0; i < quantity; i++) {
            var position = i / quantity;
            var x = x1 + (x2 - x1) * position;
            var y = y1 + (y2 - y1) * position;
            out.push(new Vec2(x, y));
        }
        return out;
    }

    function GetLineRandomPoint(line, out) {
        if (out === void 0) { out = new Vec2(); }
        var t = Math.random();
        out.x = line.x1 + t * (line.x2 - line.x1);
        out.y = line.y1 + t * (line.y2 - line.y1);
        return out;
    }

    function GetLineReflectAngle(lineA, lineB) {
        return (2 * GetLineNormalAngle(lineB) - Math.PI - GetLineAngle(lineA));
    }

    function GetLineSlope(line) {
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        return (y2 - y1) / (x2 - x1);
    }

    function GetLineWidth(line) {
        return Math.abs(line.x1 - line.x2);
    }

    function GetShortestLineDistance(line, point) {
        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
        var L2 = (((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        if (L2 === 0) {
            return 0;
        }
        var s = (((y1 - point.y) * (x2 - x1)) - ((x1 - point.x) * (y2 - y1))) / L2;
        return Math.abs(s) * Math.sqrt(L2);
    }

    function LineEquals(line, toCompare) {
        return (line.x1 === toCompare.x1 &&
            line.y1 === toCompare.y1 &&
            line.x2 === toCompare.x2 &&
            line.y2 === toCompare.y2);
    }

    function LineSetToAngle(line, x, y, angle, length) {
        line.x1 = x;
        line.y1 = y;
        line.x2 = x + (Math.cos(angle) * length);
        line.y2 = y + (Math.sin(angle) * length);
        return line;
    }

    function RotateLineAround(line, x, y, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var tx = line.x1 - x;
        var ty = line.y1 - y;
        line.x1 = tx * c - ty * s + x;
        line.y1 = tx * s + ty * c + y;
        tx = line.x2 - x;
        ty = line.y2 - y;
        line.x2 = tx * c - ty * s + x;
        line.y2 = tx * s + ty * c + y;
        return line;
    }

    function RotateLine(line, angle) {
        var x = (line.x1 + line.x2) / 2;
        var y = (line.y1 + line.y2) / 2;
        return RotateLineAround(line, x, y, angle);
    }

    function RotateLineAroundPoint(line, point, angle) {
        return RotateLineAround(line, point.x, point.y, angle);
    }

    function TranslateLine(line, x, y) {
        line.x1 += x;
        line.y1 += y;
        line.x2 += x;
        line.y2 += y;
        return line;
    }

    function TranslateLinePoint(line, v) {
        return TranslateLine(line, v.x, v.y);
    }

    var index$j = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CenterLineOn: CenterLineOn,
        CloneLine: CloneLine,
        CopyLineFrom: CopyLineFrom,
        ExtendLine: ExtendLine,
        GetLineAngle: GetLineAngle,
        GetLineBresenhamPoints: GetLineBresenhamPoints,
        GetLineHeight: GetLineHeight,
        GetLineLength: GetLineLength,
        GetLineMidPoint: GetLineMidPoint,
        GetLineNearestPoint: GetLineNearestPoint,
        GetLineNormal: GetLineNormal,
        GetLineNormalAngle: GetLineNormalAngle,
        GetLineNormalX: GetLineNormalX,
        GetLineNormalY: GetLineNormalY,
        GetLinePerpSlope: GetLinePerpSlope,
        GetLinePoint: GetLinePoint,
        GetLinePoints: GetLinePoints,
        GetLineReflectAngle: GetLineReflectAngle,
        GetLineSlope: GetLineSlope,
        GetLineWidth: GetLineWidth,
        GetLineRandomPoint: GetLineRandomPoint,
        GetShortestLineDistance: GetShortestLineDistance,
        Line: Line,
        LineEquals: LineEquals,
        LineSetToAngle: LineSetToAngle,
        RotateLine: RotateLine,
        RotateLineAround: RotateLineAround,
        RotateLineAroundPoint: RotateLineAroundPoint,
        TranslateLine: TranslateLine,
        TranslateLinePoint: TranslateLinePoint
    });

    var Triangle = (function () {
        function Triangle(x1, y1, x2, y2, x3, y3) {
            if (x1 === void 0) { x1 = 0; }
            if (y1 === void 0) { y1 = 0; }
            if (x2 === void 0) { x2 = 0; }
            if (y2 === void 0) { y2 = 0; }
            if (x3 === void 0) { x3 = 0; }
            if (y3 === void 0) { y3 = 0; }
            this.set(x1, y1, x2, y2, x3, y3);
        }
        Triangle.prototype.set = function (x1, y1, x2, y2, x3, y3) {
            if (x1 === void 0) { x1 = 0; }
            if (y1 === void 0) { y1 = 0; }
            if (x2 === void 0) { x2 = 0; }
            if (y2 === void 0) { y2 = 0; }
            if (x3 === void 0) { x3 = 0; }
            if (y3 === void 0) { y3 = 0; }
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.x3 = x3;
            this.y3 = y3;
            return this;
        };
        Triangle.prototype.contains = function (x, y) {
            return TriangleContains(this, x, y);
        };
        Object.defineProperty(Triangle.prototype, "left", {
            get: function () {
                return Math.min(this.x1, this.x2, this.x3);
            },
            set: function (value) {
                var diff = 0;
                if (this.x1 <= this.x2 && this.x1 <= this.x3) {
                    diff = this.x1 - value;
                }
                else if (this.x2 <= this.x1 && this.x2 <= this.x3) {
                    diff = this.x2 - value;
                }
                else {
                    diff = this.x3 - value;
                }
                this.x1 -= diff;
                this.x2 -= diff;
                this.x3 -= diff;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Triangle.prototype, "right", {
            get: function () {
                return Math.max(this.x1, this.x2, this.x3);
            },
            set: function (value) {
                var diff = 0;
                if (this.x1 >= this.x2 && this.x1 >= this.x3) {
                    diff = this.x1 - value;
                }
                else if (this.x2 >= this.x1 && this.x2 >= this.x3) {
                    diff = this.x2 - value;
                }
                else {
                    diff = this.x3 - value;
                }
                this.x1 -= diff;
                this.x2 -= diff;
                this.x3 -= diff;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Triangle.prototype, "top", {
            get: function () {
                return Math.min(this.y1, this.y2, this.y3);
            },
            set: function (value) {
                var diff = 0;
                if (this.y1 <= this.y2 && this.y1 <= this.y3) {
                    diff = this.y1 - value;
                }
                else if (this.y2 <= this.y1 && this.y2 <= this.y3) {
                    diff = this.y2 - value;
                }
                else {
                    diff = this.y3 - value;
                }
                this.y1 -= diff;
                this.y2 -= diff;
                this.y3 -= diff;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Triangle.prototype, "bottom", {
            get: function () {
                return Math.max(this.y1, this.y2, this.y3);
            },
            set: function (value) {
                var diff = 0;
                if (this.y1 >= this.y2 && this.y1 >= this.y3) {
                    diff = this.y1 - value;
                }
                else if (this.y2 >= this.y1 && this.y2 >= this.y3) {
                    diff = this.y2 - value;
                }
                else {
                    diff = this.y3 - value;
                }
                this.y1 -= diff;
                this.y2 -= diff;
                this.y3 -= diff;
            },
            enumerable: false,
            configurable: true
        });
        return Triangle;
    }());

    function BuildEquilateralTriangle(x, y, length) {
        var height = length * (Math.sqrt(3) / 2);
        var x1 = x;
        var y1 = y;
        var x2 = x + (length / 2);
        var y2 = y + height;
        var x3 = x - (length / 2);
        var y3 = y + height;
        return new Triangle(x1, y1, x2, y2, x3, y3);
    }

    function BuildRightTriangle(x, y, width, height) {
        if (height === void 0) { height = width; }
        var x1 = x;
        var y1 = y;
        var x2 = x;
        var y2 = y - height;
        var x3 = x + width;
        var y3 = y;
        return new Triangle(x1, y1, x2, y2, x3, y3);
    }

    function GetTriangleCentroid(triangle, out) {
        if (out === void 0) { out = new Vec2(); }
        return out.set((triangle.x1 + triangle.x2 + triangle.x3) / 3, (triangle.y1 + triangle.y2 + triangle.y3) / 3);
    }

    function TranslateTriangle(triangle, x, y) {
        triangle.x1 += x;
        triangle.y1 += y;
        triangle.x2 += x;
        triangle.y2 += y;
        triangle.x3 += x;
        triangle.y3 += y;
        return triangle;
    }

    function CenterTriangleOn(triangle, x, y, centerFunc) {
        if (centerFunc === void 0) { centerFunc = GetTriangleCentroid; }
        var center = centerFunc(triangle);
        var diffX = x - center.x;
        var diffY = y - center.y;
        return TranslateTriangle(triangle, diffX, diffY);
    }

    function CloneTriangle(source) {
        var x1 = source.x1, y1 = source.y1, x2 = source.x2, y2 = source.y2, x3 = source.x3, y3 = source.y3;
        return new Triangle(x1, y1, x2, y2, x3, y3);
    }

    function CopyTriangleFrom(source, dest) {
        var x1 = source.x1, y1 = source.y1, x2 = source.x2, y2 = source.y2, x3 = source.x3, y3 = source.y3;
        return dest.set(x1, y1, x2, y2, x3, y3);
    }

    function GetTriangleArea(triangle) {
        var x1 = triangle.x1, y1 = triangle.y1, x2 = triangle.x2, y2 = triangle.y2, x3 = triangle.x3, y3 = triangle.y3;
        return Math.abs(((x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1)) / 2);
    }

    function Det(m00, m01, m10, m11) {
        return (m00 * m11) - (m01 * m10);
    }
    function GetTriangleCircumCenter(triangle, out) {
        if (out === void 0) { out = new Vec2(); }
        var cx = triangle.x3;
        var cy = triangle.y3;
        var ax = triangle.x1 - cx;
        var ay = triangle.y1 - cy;
        var bx = triangle.x2 - cx;
        var by = triangle.y2 - cy;
        var denom = 2 * Det(ax, ay, bx, by);
        var numx = Det(ay, ax * ax + ay * ay, by, bx * bx + by * by);
        var numy = Det(ax, ax * ax + ay * ay, bx, bx * bx + by * by);
        return out.set(cx - numx / denom, cy + numy / denom);
    }

    var Circle = (function () {
        function Circle(x, y, radius) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (radius === void 0) { radius = 0; }
            this.set(x, y, radius);
        }
        Circle.prototype.set = function (x, y, radius) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (radius === void 0) { radius = 0; }
            this.x = x;
            this.y = y;
            this.radius = radius;
            return this;
        };
        Circle.prototype.contains = function (x, y) {
            return CircleContains(this, x, y);
        };
        Object.defineProperty(Circle.prototype, "radius", {
            get: function () {
                return this._radius;
            },
            set: function (value) {
                this._radius = value;
                this._diameter = value * 2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "diameter", {
            get: function () {
                return this._diameter;
            },
            set: function (value) {
                this._diameter = value;
                this._radius = value * 0.5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "left", {
            get: function () {
                return this.x - this._radius;
            },
            set: function (value) {
                this.x = value + this._radius;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "right", {
            get: function () {
                return this.x + this._radius;
            },
            set: function (value) {
                this.x = value - this._radius;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "top", {
            get: function () {
                return this.y - this._radius;
            },
            set: function (value) {
                this.y = value + this._radius;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "bottom", {
            get: function () {
                return this.y + this._radius;
            },
            set: function (value) {
                this.y = value - this._radius;
            },
            enumerable: false,
            configurable: true
        });
        return Circle;
    }());

    function GetTriangleCircumCircle(triangle, out) {
        if (out === void 0) { out = new Circle(); }
        var x1 = triangle.x1, y1 = triangle.y1, x2 = triangle.x2, y2 = triangle.y2, x3 = triangle.x3, y3 = triangle.y3;
        var A = x2 - x1;
        var B = y2 - y1;
        var C = x3 - x1;
        var D = y3 - y1;
        var E = A * (x1 + x2) + B * (y1 + y2);
        var F = C * (x1 + x3) + D * (y1 + y3);
        var G = 2 * (A * (y3 - y2) - B * (x3 - x2));
        if (Math.abs(G) < 0.000001) {
            var minX = Math.min(x1, x2, x3);
            var minY = Math.min(y1, y2, y3);
            var dx = (Math.max(x1, x2, x3) - minX) * 0.5;
            var dy = (Math.max(y1, y2, y3) - minY) * 0.5;
            return out.set(minX + dx, minY + dy, Math.sqrt(dx * dx + dy * dy));
        }
        else {
            var cx = (D * E - B * F) / G;
            var cy = (A * F - C * E) / G;
            var dx = cx - x1;
            var dy = cy - y1;
            return out.set(cx, cy, Math.sqrt(dx * dx + dy * dy));
        }
    }

    function GetLength(x1, y1, x2, y2) {
        var x = x1 - x2;
        var y = y1 - y2;
        return Math.sqrt((x * x) + (y * y));
    }
    function GetTriangleInCenter(triangle, out) {
        if (out === void 0) { out = new Vec2(); }
        var x1 = triangle.x1, y1 = triangle.y1, x2 = triangle.x2, y2 = triangle.y2, x3 = triangle.x3, y3 = triangle.y3;
        var d1 = GetLength(x3, y3, x2, y2);
        var d2 = GetLength(x1, y1, x3, y3);
        var d3 = GetLength(x2, y2, x1, y1);
        var p = d1 + d2 + d3;
        return out.set((x1 * d1 + x2 * d2 + x3 * d3) / p, (y1 * d1 + y2 * d2 + y3 * d3) / p);
    }

    function GetTrianglePerimeter(triangle) {
        var _a = __read(GetTriangleEdges(triangle), 3), line1 = _a[0], line2 = _a[1], line3 = _a[2];
        return (GetLineLength(line1) + GetLineLength(line2) + GetLineLength(line3));
    }

    function GetTrianglePoint(triangle, position, out) {
        if (out === void 0) { out = new Vec2(); }
        var _a = __read(GetTriangleEdges(triangle), 3), line1 = _a[0], line2 = _a[1], line3 = _a[2];
        if (position <= 0 || position >= 1) {
            return out.set(line1.x1, line1.y1);
        }
        var length1 = GetLineLength(line1);
        var length2 = GetLineLength(line2);
        var length3 = GetLineLength(line3);
        var perimeter = length1 + length2 + length3;
        var p = perimeter * position;
        var localPosition = 0;
        if (p < length1) {
            localPosition = p / length1;
            var x1 = line1.x1, y1 = line1.y1, x2 = line1.x2, y2 = line1.y2;
            return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
        }
        else if (p > length1 + length2) {
            p -= length1 + length2;
            localPosition = p / length3;
            var x1 = line3.x1, y1 = line3.y1, x2 = line3.x2, y2 = line3.y2;
            return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
        }
        else {
            p -= length1;
            localPosition = p / length2;
            var x1 = line2.x1, y1 = line2.y1, x2 = line2.x2, y2 = line2.y2;
            return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
        }
    }

    function GetTrianglePoints(triangle, quantity, stepRate, out) {
        if (out === void 0) { out = []; }
        var _a = __read(GetTriangleEdges(triangle), 3), line1 = _a[0], line2 = _a[1], line3 = _a[2];
        var length1 = GetLineLength(line1);
        var length2 = GetLineLength(line2);
        var length3 = GetLineLength(line3);
        var perimeter = length1 + length2 + length3;
        if (!quantity) {
            quantity = perimeter / stepRate;
        }
        for (var i = 0; i < quantity; i++) {
            var p = perimeter * (i / quantity);
            var localPosition = 0;
            var point = void 0;
            if (p < length1) {
                localPosition = p / length1;
                var x1 = line1.x1, y1 = line1.y1, x2 = line1.x2, y2 = line1.y2;
                point = new Vec2(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
            }
            else if (p > length1 + length2) {
                p -= length1 + length2;
                localPosition = p / length3;
                var x1 = line3.x1, y1 = line3.y1, x2 = line3.x2, y2 = line3.y2;
                point = new Vec2(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
            }
            else {
                p -= length1;
                localPosition = p / length2;
                var x1 = line2.x1, y1 = line2.y1, x2 = line2.x2, y2 = line2.y2;
                point = new Vec2(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
            }
            out.push(point);
        }
        return out;
    }

    function GetTriangleRandomPoint(triangle, out) {
        if (out === void 0) { out = new Vec2(); }
        var x1 = triangle.x1, y1 = triangle.y1, x2 = triangle.x2, y2 = triangle.y2, x3 = triangle.x3, y3 = triangle.y3;
        var ux = x2 - x1;
        var uy = y2 - y1;
        var vx = x3 - x1;
        var vy = y3 - y1;
        var r = Math.random();
        var s = Math.random();
        if (r + s >= 1) {
            r = 1 - r;
            s = 1 - s;
        }
        return out.set(x1 + ((ux * r) + (vx * s)), y1 + ((uy * r) + (vy * s)));
    }

    function RotateTriangleAround(triangle, x, y, angle) {
        var x1 = triangle.x1, y1 = triangle.y1, x2 = triangle.x2, y2 = triangle.y2, x3 = triangle.x3, y3 = triangle.y3;
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return triangle.set((x1 - x) * c - (y1 - y) * s + x, (x1 - x) * s + (y1 - y) * c + y, (x2 - x) * c - (y2 - y) * s + x, (x2 - x) * s + (y2 - y) * c + y, (x3 - x) * c - (y3 - y) * s + x, (x3 - x) * s + (y3 - y) * c + y);
    }

    function RotateTriangle(triangle, angle) {
        var point = GetTriangleInCenter(triangle);
        return RotateTriangleAround(triangle, point.x, point.y, angle);
    }

    function RotateTriangleAroundPoint(triangle, point, angle) {
        return RotateTriangleAround(triangle, point.x, point.y, angle);
    }

    function TriangleContainsPoint(triangle, point) {
        return TriangleContains(triangle, point.x, point.y);
    }

    function TriangleEquals(src, dest) {
        return (src.x1 === dest.x1 &&
            src.y1 === dest.y1 &&
            src.x2 === dest.x2 &&
            src.y2 === dest.y2 &&
            src.x3 === dest.x3 &&
            src.y3 === dest.y3);
    }

    var index$i = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BuildEquilateralTriangle: BuildEquilateralTriangle,
        BuildRightTriangle: BuildRightTriangle,
        CenterTriangleOn: CenterTriangleOn,
        CloneTriangle: CloneTriangle,
        CopyTriangleFrom: CopyTriangleFrom,
        DecomposeTriangle: DecomposeTriangle,
        GetTriangleArea: GetTriangleArea,
        GetTriangleCentroid: GetTriangleCentroid,
        GetTriangleCircumCenter: GetTriangleCircumCenter,
        GetTriangleCircumCircle: GetTriangleCircumCircle,
        GetTriangleEdges: GetTriangleEdges,
        GetTriangleInCenter: GetTriangleInCenter,
        GetTrianglePerimeter: GetTrianglePerimeter,
        GetTrianglePoint: GetTrianglePoint,
        GetTrianglePoints: GetTrianglePoints,
        GetTriangleRandomPoint: GetTriangleRandomPoint,
        RotateTriangle: RotateTriangle,
        RotateTriangleAround: RotateTriangleAround,
        RotateTriangleAroundPoint: RotateTriangleAroundPoint,
        TranslateTriangle: TranslateTriangle,
        Triangle: Triangle,
        TriangleContains: TriangleContains,
        TriangleContainsPoint: TriangleContainsPoint,
        TriangleContainsPoints: TriangleContainsPoints,
        TriangleEquals: TriangleEquals
    });

    var index$h = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Circle: index$m,
        Ellipse: index$l,
        Intersects: index$k,
        Line: index$j,
        Rectangle: index$u,
        Triangle: index$i
    });

    function TorusGeometry(radius, tube, radialSegments, tubularSegments, arc) {
        if (radius === void 0) { radius = 1; }
        if (tube === void 0) { tube = 0.4; }
        if (radialSegments === void 0) { radialSegments = 8; }
        if (tubularSegments === void 0) { tubularSegments = 6; }
        if (arc === void 0) { arc = Math.PI * 2; }
        var data = CreateVertexSet();
        var vertices = data.vertices, normals = data.normals, uvs = data.uvs, indices = data.indices;
        var center = new Vec3();
        var vertex = new Vec3();
        var normal = new Vec3();
        for (var j = 0; j <= radialSegments; j++) {
            for (var i = 0; i <= tubularSegments; i++) {
                var u = i / tubularSegments * arc;
                var v = j / radialSegments * Math.PI * 2;
                vertex.x = (radius + tube * Math.cos(v)) * Math.cos(u);
                vertex.y = (radius + tube * Math.cos(v)) * Math.sin(u);
                vertex.z = tube * Math.sin(v);
                vertices.push(vertex.x, vertex.y, vertex.z);
                center.x = radius * Math.cos(u);
                center.y = radius * Math.sin(u);
                Vec3Subtract(vertex, center, normal);
                Vec3Normalize(normal, normal);
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(i / tubularSegments);
                uvs.push(j / radialSegments);
            }
        }
        for (var j = 1; j <= radialSegments; j++) {
            for (var i = 1; i <= tubularSegments; i++) {
                var a = (tubularSegments + 1) * j + i - 1;
                var b = (tubularSegments + 1) * (j - 1) + i - 1;
                var c = (tubularSegments + 1) * (j - 1) + i;
                var d = (tubularSegments + 1) * j + i;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        data.numberOfVertices = vertices.length;
        return data;
    }

    var index$g = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BoxGeometry: BoxGeometry,
        ConeGeometry: ConeGeometry,
        CylinderGeometry: CylinderGeometry,
        PlaneGeometry: PlaneGeometry,
        SphereGeometry: SphereGeometry,
        TorusGeometry: TorusGeometry
    });

    var Key = (function () {
        function Key(value) {
            this.capture = true;
            this.isDown = false;
            this.enabled = true;
            this.repeatRate = 0;
            this.canRepeat = true;
            this.timeDown = 0;
            this.timeUpdated = 0;
            this.timeUp = 0;
            this.value = value;
            this.events = new Map();
        }
        Key.prototype.getValue = function () {
            return this.value;
        };
        Key.prototype.down = function (event) {
            if (!this.enabled) {
                return;
            }
            if (this.capture) {
                event.preventDefault();
            }
            this.shiftKey = event.shiftKey;
            this.ctrlKey = event.ctrlKey;
            this.altKey = event.altKey;
            if (this.isDown && this.canRepeat) {
                this.timeUpdated = event.timeStamp;
                var delay = this.timeUpdated - this.timeDown;
                if (delay >= this.repeatRate) {
                    Emit(this, 'keydown', this);
                    if (this.downCallback) {
                        this.downCallback(this);
                    }
                }
            }
            else {
                this.isDown = true;
                this.timeDown = event.timeStamp;
                this.timeUpdated = event.timeStamp;
                Emit(this, 'keydown', this);
                if (this.downCallback) {
                    this.downCallback(this);
                }
            }
        };
        Key.prototype.up = function (event) {
            if (!this.enabled) {
                return;
            }
            if (this.capture) {
                event.preventDefault();
            }
            this.shiftKey = event.shiftKey;
            this.ctrlKey = event.ctrlKey;
            this.altKey = event.altKey;
            if (this.isDown) {
                this.isDown = false;
                this.timeUp = event.timeStamp;
                this.timeUpdated = event.timeStamp;
                Emit(this, 'keyup', this);
                if (this.upCallback) {
                    this.upCallback(this);
                }
            }
        };
        Key.prototype.reset = function () {
            this.isDown = false;
            this.timeUpdated = this.timeDown;
            this.timeUp = this.timeDown;
        };
        Key.prototype.destroy = function () {
            this.downCallback = null;
            this.upCallback = null;
            this.events.clear();
        };
        return Key;
    }());

    var AKey = (function (_super) {
        __extends(AKey, _super);
        function AKey() {
            return _super.call(this, 'a') || this;
        }
        return AKey;
    }(Key));

    var ArrowKeys = (function () {
        function ArrowKeys(keyboardManager, config) {
            var _a = config.left, left = _a === void 0 ? true : _a, _b = config.right, right = _b === void 0 ? true : _b, _c = config.up, up = _c === void 0 ? true : _c, _d = config.down, down = _d === void 0 ? true : _d, _e = config.space, space = _e === void 0 ? true : _e;
            var keys = keyboardManager.keys;
            if (left) {
                this.left = new Key('ArrowLeft');
                keys.set(this.left.value, this.left);
            }
            if (right) {
                this.right = new Key('ArrowRight');
                keys.set(this.right.value, this.right);
            }
            if (up) {
                this.up = new Key('ArrowUp');
                keys.set(this.up.value, this.up);
            }
            if (down) {
                this.down = new Key('ArrowDown');
                keys.set(this.down.value, this.down);
            }
            if (space) {
                this.space = new Key(' ');
                keys.set(this.space.value, this.space);
            }
        }
        return ArrowKeys;
    }());

    var BKey = (function (_super) {
        __extends(BKey, _super);
        function BKey() {
            return _super.call(this, 'b') || this;
        }
        return BKey;
    }(Key));

    var CKey = (function (_super) {
        __extends(CKey, _super);
        function CKey() {
            return _super.call(this, 'c') || this;
        }
        return CKey;
    }(Key));

    var DKey = (function (_super) {
        __extends(DKey, _super);
        function DKey() {
            return _super.call(this, 'd') || this;
        }
        return DKey;
    }(Key));

    var DownKey = (function (_super) {
        __extends(DownKey, _super);
        function DownKey() {
            return _super.call(this, 'ArrowDown') || this;
        }
        return DownKey;
    }(Key));

    var EKey = (function (_super) {
        __extends(EKey, _super);
        function EKey() {
            return _super.call(this, 'e') || this;
        }
        return EKey;
    }(Key));

    var FKey = (function (_super) {
        __extends(FKey, _super);
        function FKey() {
            return _super.call(this, 'f') || this;
        }
        return FKey;
    }(Key));

    var GKey = (function (_super) {
        __extends(GKey, _super);
        function GKey() {
            return _super.call(this, 'g') || this;
        }
        return GKey;
    }(Key));

    var HKey = (function (_super) {
        __extends(HKey, _super);
        function HKey() {
            return _super.call(this, 'h') || this;
        }
        return HKey;
    }(Key));

    var IKey = (function (_super) {
        __extends(IKey, _super);
        function IKey() {
            return _super.call(this, 'i') || this;
        }
        return IKey;
    }(Key));

    var JKey = (function (_super) {
        __extends(JKey, _super);
        function JKey() {
            return _super.call(this, 'j') || this;
        }
        return JKey;
    }(Key));

    var KKey = (function (_super) {
        __extends(KKey, _super);
        function KKey() {
            return _super.call(this, 'k') || this;
        }
        return KKey;
    }(Key));

    var LKey = (function (_super) {
        __extends(LKey, _super);
        function LKey() {
            return _super.call(this, 'l') || this;
        }
        return LKey;
    }(Key));

    var LeftKey = (function (_super) {
        __extends(LeftKey, _super);
        function LeftKey() {
            return _super.call(this, 'ArrowLeft') || this;
        }
        return LeftKey;
    }(Key));

    var MKey = (function (_super) {
        __extends(MKey, _super);
        function MKey() {
            return _super.call(this, 'm') || this;
        }
        return MKey;
    }(Key));

    var NKey = (function (_super) {
        __extends(NKey, _super);
        function NKey() {
            return _super.call(this, 'n') || this;
        }
        return NKey;
    }(Key));

    var OKey = (function (_super) {
        __extends(OKey, _super);
        function OKey() {
            return _super.call(this, 'o') || this;
        }
        return OKey;
    }(Key));

    var PKey = (function (_super) {
        __extends(PKey, _super);
        function PKey() {
            return _super.call(this, 'p') || this;
        }
        return PKey;
    }(Key));

    var QKey = (function (_super) {
        __extends(QKey, _super);
        function QKey() {
            return _super.call(this, 'q') || this;
        }
        return QKey;
    }(Key));

    var RKey = (function (_super) {
        __extends(RKey, _super);
        function RKey() {
            return _super.call(this, 'r') || this;
        }
        return RKey;
    }(Key));

    var RightKey = (function (_super) {
        __extends(RightKey, _super);
        function RightKey() {
            return _super.call(this, 'ArrowRight') || this;
        }
        return RightKey;
    }(Key));

    var SKey = (function (_super) {
        __extends(SKey, _super);
        function SKey() {
            return _super.call(this, 's') || this;
        }
        return SKey;
    }(Key));

    var SpaceKey = (function (_super) {
        __extends(SpaceKey, _super);
        function SpaceKey() {
            return _super.call(this, ' ') || this;
        }
        return SpaceKey;
    }(Key));

    var TKey = (function (_super) {
        __extends(TKey, _super);
        function TKey() {
            return _super.call(this, 't') || this;
        }
        return TKey;
    }(Key));

    var UKey = (function (_super) {
        __extends(UKey, _super);
        function UKey() {
            return _super.call(this, 'u') || this;
        }
        return UKey;
    }(Key));

    var UpKey = (function (_super) {
        __extends(UpKey, _super);
        function UpKey() {
            return _super.call(this, 'ArrowUp') || this;
        }
        return UpKey;
    }(Key));

    var VKey = (function (_super) {
        __extends(VKey, _super);
        function VKey() {
            return _super.call(this, 'v') || this;
        }
        return VKey;
    }(Key));

    var WASDKeys = (function () {
        function WASDKeys(keyboardManager, config) {
            var _a = config.W, W = _a === void 0 ? true : _a, _b = config.A, A = _b === void 0 ? true : _b, _c = config.S, S = _c === void 0 ? true : _c, _d = config.D, D = _d === void 0 ? true : _d, _e = config.space, space = _e === void 0 ? true : _e;
            var keys = keyboardManager.keys;
            if (W) {
                this.W = new Key('w');
                keys.set(this.W.value, this.W);
            }
            if (A) {
                this.A = new Key('a');
                keys.set(this.A.value, this.A);
            }
            if (S) {
                this.S = new Key('s');
                keys.set(this.S.value, this.S);
            }
            if (D) {
                this.D = new Key('d');
                keys.set(this.D.value, this.D);
            }
            if (space) {
                this.space = new Key(' ');
                keys.set(this.space.value, this.space);
            }
        }
        return WASDKeys;
    }());

    var WKey = (function (_super) {
        __extends(WKey, _super);
        function WKey() {
            return _super.call(this, 'w') || this;
        }
        return WKey;
    }(Key));

    var XKey = (function (_super) {
        __extends(XKey, _super);
        function XKey() {
            return _super.call(this, 'x') || this;
        }
        return XKey;
    }(Key));

    var YKey = (function (_super) {
        __extends(YKey, _super);
        function YKey() {
            return _super.call(this, 'y') || this;
        }
        return YKey;
    }(Key));

    var ZKey = (function (_super) {
        __extends(ZKey, _super);
        function ZKey() {
            return _super.call(this, 'z') || this;
        }
        return ZKey;
    }(Key));

    var index$f = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AKey: AKey,
        BKey: BKey,
        CKey: CKey,
        DKey: DKey,
        EKey: EKey,
        FKey: FKey,
        GKey: GKey,
        HKey: HKey,
        IKey: IKey,
        JKey: JKey,
        KKey: KKey,
        LKey: LKey,
        MKey: MKey,
        NKey: NKey,
        OKey: OKey,
        PKey: PKey,
        QKey: QKey,
        RKey: RKey,
        SKey: SKey,
        TKey: TKey,
        UKey: UKey,
        VKey: VKey,
        WKey: WKey,
        XKey: XKey,
        YKey: YKey,
        ZKey: ZKey,
        ArrowKeys: ArrowKeys,
        DownKey: DownKey,
        LeftKey: LeftKey,
        RightKey: RightKey,
        SpaceKey: SpaceKey,
        UpKey: UpKey,
        WASDKeys: WASDKeys
    });

    function GetKeyDownDuration(key) {
        if (key.isDown) {
            return key.timeUpdated - key.timeDown;
        }
        else {
            return key.timeUp - key.timeDown;
        }
    }

    var Keyboard = (function (_super) {
        __extends(Keyboard, _super);
        function Keyboard() {
            var _this = _super.call(this) || this;
            _this.keyConversion = {
                Up: 'ArrowUp',
                Down: 'ArrowDown',
                Left: 'ArrowLeft',
                Right: 'ArrowRight',
                Spacebar: ' ',
                Win: 'Meta',
                Scroll: 'ScrollLock',
                Del: 'Delete',
                Apps: 'ContextMenu',
                Esc: 'Escape',
                Add: '+',
                Subtract: '-',
                Multiply: '*',
                Decimal: '.',
                Divide: '/'
            };
            _this.keydownHandler = function (event) { return _this.onKeyDown(event); };
            _this.keyupHandler = function (event) { return _this.onKeyUp(event); };
            _this.blurHandler = function () { return _this.onBlur(); };
            window.addEventListener('keydown', _this.keydownHandler);
            window.addEventListener('keyup', _this.keyupHandler);
            window.addEventListener('blur', _this.blurHandler);
            _this.keys = new Map();
            return _this;
        }
        Keyboard.prototype.addKeys = function () {
            var _this = this;
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            keys.forEach(function (key) {
                _this.keys.set(key.getValue(), key);
            });
        };
        Keyboard.prototype.clearKeys = function () {
            this.keys.clear();
        };
        Keyboard.prototype.onBlur = function () {
            this.keys.forEach(function (key) {
                key.reset();
            });
        };
        Keyboard.prototype.getKeyValue = function (key) {
            if (this.keyConversion.hasOwnProperty(key)) {
                return this.keyConversion[key];
            }
            else {
                return key;
            }
        };
        Keyboard.prototype.onKeyDown = function (event) {
            var value = this.getKeyValue(event.key);
            if (this.keys.has(value)) {
                var key = this.keys.get(value);
                key.down(event);
            }
            Emit(this, 'keydown-' + value, event);
            Emit(this, 'keydown', event);
        };
        Keyboard.prototype.onKeyUp = function (event) {
            var value = this.getKeyValue(event.key);
            if (this.keys.has(value)) {
                var key = this.keys.get(value);
                key.up(event);
            }
            Emit(this, 'keyup-' + value, event);
            Emit(this, 'keyup', event);
        };
        Keyboard.prototype.destroy = function () {
            window.removeEventListener('keydown', this.keydownHandler);
            window.removeEventListener('keyup', this.keyupHandler);
            window.removeEventListener('blur', this.blurHandler);
            Emit(this, 'destroy');
        };
        return Keyboard;
    }(EventEmitter));

    function SetKeyRepeatRate(rate) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        keys.forEach(function (key) {
            key.repeatRate = rate;
        });
        return keys;
    }

    var index$e = /*#__PURE__*/Object.freeze({
        __proto__: null,
        GetKeyDownDuration: GetKeyDownDuration,
        Key: Key,
        Keys: index$f,
        Keyboard: Keyboard,
        SetKeyRepeatRate: SetKeyRepeatRate
    });

    var Mouse = (function (_super) {
        __extends(Mouse, _super);
        function Mouse(target) {
            var _this = _super.call(this) || this;
            _this.primaryDown = false;
            _this.auxDown = false;
            _this.secondaryDown = false;
            _this.blockContextMenu = true;
            _this.resolution = 1;
            _this.mousedownHandler = function (event) { return _this.onMouseDown(event); };
            _this.mouseupHandler = function (event) { return _this.onMouseUp(event); };
            _this.mousemoveHandler = function (event) { return _this.onMouseMove(event); };
            _this.mousewheelHandler = function (event) { return _this.onMouseWheel(event); };
            _this.contextmenuHandler = function (event) { return _this.onContextMenuEvent(event); };
            _this.blurHandler = function () { return _this.onBlur(); };
            _this.localPoint = new Vec2();
            _this.hitPoint = new Vec2();
            _this.transPoint = new Vec2();
            if (!target) {
                target = GameInstance.get().renderer.canvas;
            }
            target.addEventListener('mousedown', _this.mousedownHandler);
            target.addEventListener('mouseup', _this.mouseupHandler);
            target.addEventListener('wheel', _this.mousewheelHandler, { passive: false });
            target.addEventListener('contextmenu', _this.contextmenuHandler);
            window.addEventListener('mouseup', _this.mouseupHandler);
            window.addEventListener('mousemove', _this.mousemoveHandler);
            window.addEventListener('blur', _this.blurHandler);
            _this.target = target;
            return _this;
        }
        Mouse.prototype.onBlur = function () {
        };
        Mouse.prototype.onMouseDown = function (event) {
            this.positionToPoint(event);
            this.primaryDown = (event.button === 0);
            this.auxDown = (event.button === 1);
            this.secondaryDown = (event.button === 2);
            Emit(this, 'pointerdown', this.localPoint.x, this.localPoint.y, event.button, event);
        };
        Mouse.prototype.onMouseUp = function (event) {
            this.positionToPoint(event);
            this.primaryDown = !(event.button === 0);
            this.auxDown = !(event.button === 1);
            this.secondaryDown = !(event.button === 2);
            Emit(this, 'pointerup', this.localPoint.x, this.localPoint.y, event.button, event);
        };
        Mouse.prototype.onMouseMove = function (event) {
            this.positionToPoint(event);
            Emit(this, 'pointermove', this.localPoint.x, this.localPoint.y, event);
        };
        Mouse.prototype.onMouseWheel = function (event) {
            Emit(this, 'wheel', event.deltaX, event.deltaY, event.deltaZ, event);
        };
        Mouse.prototype.onContextMenuEvent = function (event) {
            if (this.blockContextMenu) {
                event.preventDefault();
            }
            Emit(this, 'contextmenu', event);
        };
        Mouse.prototype.positionToPoint = function (event) {
            return this.localPoint.set(event.offsetX, event.offsetY);
        };
        Mouse.prototype.getInteractiveChildren = function (parent, results) {
            var children = parent.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (!child.visible || !child.input.enabled) {
                    continue;
                }
                results.push(child);
                if (child.input.enabledChildren && child.numChildren) {
                    this.getInteractiveChildren(child, results);
                }
            }
        };
        Mouse.prototype.checkHitArea = function (entity, px, py) {
            if (entity.input.hitArea) {
                if (entity.input.hitArea.contains(px, py)) {
                    return true;
                }
            }
            else {
                return entity.transform.extent.contains(px, py);
            }
            return false;
        };
        Mouse.prototype.hitTest = function () {
            var entities = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                entities[_i] = arguments[_i];
            }
            var localX = this.localPoint.x;
            var localY = this.localPoint.y;
            var point = this.transPoint;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                if (!entity.world) {
                    continue;
                }
                var mat = Mat2dAppend(entity.world.camera.worldTransform, entity.transform.world);
                Mat2dGlobalToLocal(mat, localX, localY, point);
                if (this.checkHitArea(entity, point.x, point.y)) {
                    this.hitPoint.set(point.x, point.y);
                    return true;
                }
            }
            return false;
        };
        Mouse.prototype.hitTestChildren = function (parent, topOnly) {
            if (topOnly === void 0) { topOnly = true; }
            var output = [];
            if (!parent.visible) {
                return output;
            }
            var candidates = [];
            var parentInput = parent.input;
            if (parentInput && parentInput.enabled) {
                candidates.push(parent);
            }
            if (parentInput.enabledChildren && parent.numChildren) {
                this.getInteractiveChildren(parent, candidates);
            }
            for (var i = candidates.length - 1; i >= 0; i--) {
                var entity = candidates[i];
                if (this.hitTest(entity)) {
                    output.push(entity);
                    if (topOnly) {
                        break;
                    }
                }
            }
            return output;
        };
        Mouse.prototype.shutdown = function () {
            var target = this.target;
            target.removeEventListener('mousedown', this.mousedownHandler);
            target.removeEventListener('mouseup', this.mouseupHandler);
            target.removeEventListener('wheel', this.mousewheelHandler);
            target.removeEventListener('contextmenu', this.contextmenuHandler);
            window.removeEventListener('mouseup', this.mouseupHandler);
            window.removeEventListener('mousemove', this.mousemoveHandler);
            window.removeEventListener('blur', this.blurHandler);
        };
        return Mouse;
    }(EventEmitter));

    var index$d = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Mouse: Mouse
    });

    function SetInteractive() {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        children.forEach(function (child) {
            child.input.enabled = true;
        });
        return children;
    }

    var index$c = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Keyboard: index$e,
        Mouse: index$d,
        SetInteractive: SetInteractive
    });

    function AtlasParser(texture, data) {
        var frames;
        if (Array.isArray(data.textures)) {
            frames = data.textures[0].frames;
        }
        else if (Array.isArray(data.frames)) {
            frames = data.frames;
        }
        else if (data.hasOwnProperty('frames')) {
            frames = Object.values(data.frames);
        }
        else {
            console.warn('Invalid Texture Atlas JSON');
        }
        if (frames) {
            var newFrame = void 0;
            for (var i = 0; i < frames.length; i++) {
                var src = frames[i];
                newFrame = texture.addFrame(src.filename, src.frame.x, src.frame.y, src.frame.w, src.frame.h);
                if (src.trimmed) {
                    newFrame.setTrim(src.sourceSize.w, src.sourceSize.h, src.spriteSourceSize.x, src.spriteSourceSize.y, src.spriteSourceSize.w, src.spriteSourceSize.h);
                }
                else {
                    newFrame.setSourceSize(src.sourceSize.w, src.sourceSize.h);
                }
                if (src.rotated) ;
                if (src.anchor) {
                    newFrame.setPivot(src.anchor.x, src.anchor.y);
                }
            }
        }
    }

    var File = (function () {
        function File(key, url, config) {
            this.responseType = 'text';
            this.crossOrigin = undefined;
            this.skipCache = false;
            this.hasLoaded = false;
            this.key = key;
            this.url = url;
            this.config = config;
        }
        return File;
    }());

    function GetURL(key, url, extension, loader) {
        if (!url) {
            url = key + extension;
        }
        if ((/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/).exec(url)) {
            return url;
        }
        else if (loader) {
            return loader.baseURL + loader.path + url;
        }
        else {
            return url;
        }
    }

    function ImageTagLoader(file) {
        file.data = new Image();
        if (file.crossOrigin) {
            file.data.crossOrigin = file.crossOrigin;
        }
        return new Promise(function (resolve, reject) {
            file.data.onload = function () {
                if (file.data.onload) {
                    file.data.onload = null;
                    file.data.onerror = null;
                    resolve(file);
                }
            };
            file.data.onerror = function (event) {
                if (file.data.onload) {
                    file.data.onload = null;
                    file.data.onerror = null;
                    file.error = event;
                    reject(file);
                }
            };
            file.data.src = file.url;
            if (file.data.complete && file.data.width && file.data.height) {
                file.data.onload = null;
                file.data.onerror = null;
                resolve(file);
            }
        });
    }

    function ImageFile(key, url, glConfig) {
        var file = new File(key, url);
        file.load = function () {
            file.url = GetURL(file.key, file.url, '.png', file.loader);
            if (file.loader) {
                file.crossOrigin = file.loader.crossOrigin;
            }
            return new Promise(function (resolve, reject) {
                var textureManager = TextureManagerInstance.get();
                if (textureManager.has(file.key)) {
                    resolve(file);
                }
                else {
                    ImageTagLoader(file).then(function (file) {
                        textureManager.add(file.key, file.data, glConfig);
                        resolve(file);
                    }).catch(function (file) {
                        reject(file);
                    });
                }
            });
        };
        return file;
    }

    var caches = new Map();
    var Cache = {
        get: function (type) {
            if (!caches.has(type)) {
                caches.set(type, new Map());
            }
            return caches.get(type);
        },
        getEntry: function (cache, entry) {
            if (caches.has(cache)) {
                return caches.get(cache).get(entry);
            }
        }
    };

    function XHRLoader(file) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file.url, true);
        xhr.responseType = file.responseType;
        return new Promise(function (resolve, reject) {
            xhr.onload = function () {
                file.data = xhr.responseText;
                file.hasLoaded = true;
                resolve(file);
            };
            xhr.onerror = function () {
                file.hasLoaded = true;
                reject(file);
            };
            xhr.send();
        });
    }

    function JSONFile(key, url) {
        var file = new File(key, url);
        file.load = function () {
            file.url = GetURL(file.key, file.url, '.json', file.loader);
            return new Promise(function (resolve, reject) {
                var cache = Cache.get('JSON');
                if (!file.skipCache && cache.has(file.key)) {
                    resolve(file);
                }
                else {
                    XHRLoader(file).then(function (file) {
                        file.data = JSON.parse(file.data);
                        if (!file.skipCache) {
                            cache.set(file.key, file.data);
                        }
                        resolve(file);
                    }).catch(function (file) {
                        reject(file);
                    });
                }
            });
        };
        return file;
    }

    function AtlasFile(key, textureURL, atlasURL, glConfig) {
        var json = JSONFile(key, atlasURL);
        var image = ImageFile(key, textureURL, glConfig);
        var file = new File(key, '');
        file.load = function () {
            json.url = GetURL(json.key, json.url, '.json', file.loader);
            image.url = GetURL(image.key, image.url, '.png', file.loader);
            return new Promise(function (resolve, reject) {
                json.skipCache = true;
                json.load().then(function () {
                    image.load().then(function () {
                        AtlasParser(TextureManagerInstance.get().get(key), json.data);
                        resolve(file);
                    }).catch(function () {
                        reject(file);
                    });
                }).catch(function () {
                    reject(file);
                });
            });
        };
        return file;
    }

    function GetValue(node, attribute) {
        return parseInt(node.getAttribute(attribute), 10);
    }
    function BitmapTextParser(texture, xml, frame) {
        var xSpacing = 0;
        var ySpacing = 0;
        var info = xml.getElementsByTagName('info')[0];
        var common = xml.getElementsByTagName('common')[0];
        var data = {
            font: info.getAttribute('face'),
            size: GetValue(info, 'size'),
            lineHeight: GetValue(common, 'lineHeight') + ySpacing,
            chars: {}
        };
        var letters = xml.getElementsByTagName('char');
        for (var i = 0; i < letters.length; i++) {
            var node = letters[i];
            var charCode = GetValue(node, 'id');
            var x = GetValue(node, 'x');
            var y = GetValue(node, 'y');
            var width = GetValue(node, 'width');
            var height = GetValue(node, 'height');
            data.chars[charCode] =
                {
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    xOffset: GetValue(node, 'xoffset'),
                    yOffset: GetValue(node, 'yoffset'),
                    xAdvance: GetValue(node, 'xadvance') + xSpacing,
                    kerning: {}
                };
            texture.addFrame(charCode, x, y, width, height);
        }
        var kernings = xml.getElementsByTagName('kerning');
        for (var i = 0; i < kernings.length; i++) {
            var kern = kernings[i];
            var first = GetValue(kern, 'first');
            var second = GetValue(kern, 'second');
            var amount = GetValue(kern, 'amount');
            data.chars[second].kerning[first] = amount;
        }
        return data;
    }

    function XMLFile(key, url) {
        var file = new File(key, url);
        file.load = function () {
            file.url = GetURL(file.key, file.url, '.xml', file.loader);
            return new Promise(function (resolve, reject) {
                var cache = Cache.get('XML');
                if (!file.skipCache && cache.has(file.key)) {
                    resolve(file);
                }
                else {
                    XHRLoader(file).then(function (file) {
                        var xml = ParseXML(file.data);
                        if (xml !== null) {
                            file.data = xml;
                            if (!file.skipCache) {
                                cache.set(file.key, xml);
                            }
                            resolve(file);
                        }
                        else {
                            reject(file);
                        }
                    }).catch(function (file) {
                        reject(file);
                    });
                }
            });
        };
        return file;
    }

    function BitmapTextFile(key, textureURL, fontDataURL, glConfig) {
        var xml = XMLFile(key, fontDataURL);
        var image = ImageFile(key, textureURL, glConfig);
        var file = new File(key, '');
        file.load = function () {
            xml.url = GetURL(xml.key, xml.url, '.xml', file.loader);
            image.url = GetURL(image.key, image.url, '.png', file.loader);
            return new Promise(function (resolve, reject) {
                xml.skipCache = true;
                xml.load().then(function () {
                    image.load().then(function () {
                        var texture = TextureManagerInstance.get().get(key);
                        var fontData = BitmapTextParser(texture, xml.data);
                        texture.data = fontData;
                        resolve(file);
                    }).catch(function () {
                        reject(file);
                    });
                }).catch(function () {
                    reject(file);
                });
            });
        };
        return file;
    }

    function CSVFile(key, url) {
        var file = new File(key, url);
        file.load = function () {
            file.url = GetURL(file.key, file.url, '.csv', file.loader);
            return new Promise(function (resolve, reject) {
                var cache = Cache.get('CSV');
                if (!file.skipCache && cache.has(file.key)) {
                    resolve(file);
                }
                else {
                    XHRLoader(file).then(function (file) {
                        if (!file.skipCache) {
                            cache.set(file.key, file.data);
                        }
                        resolve(file);
                    }).catch(function (file) {
                        reject(file);
                    });
                }
            });
        };
        return file;
    }

    function JSONGeometryFile(key, url, mappingConfig) {
        var file = new File(key, url);
        var _a = mappingConfig.vertices, vertices = _a === void 0 ? 'verts' : _a, _b = mappingConfig.normals, normals = _b === void 0 ? 'normals' : _b, _c = mappingConfig.uvs, uvs = _c === void 0 ? 'uvs' : _c, _d = mappingConfig.numberOfVertices, numberOfVertices = _d === void 0 ? 0 : _d;
        file.load = function () {
            file.url = GetURL(file.key, file.url, '.json', file.loader);
            return new Promise(function (resolve, reject) {
                var cache = Cache.get('Geometry');
                if (!file.skipCache && cache.has(file.key)) {
                    resolve(file);
                }
                else {
                    XHRLoader(file).then(function (file) {
                        var data = JSON.parse(file.data);
                        var geom = new Geometry({
                            vertices: data[vertices],
                            normals: data[normals],
                            uvs: data[uvs],
                            numberOfVertices: numberOfVertices
                        });
                        file.data = geom;
                        if (!file.skipCache) {
                            cache.set(file.key, geom);
                        }
                        resolve(file);
                    }).catch(function (file) {
                        reject(file);
                    });
                }
            });
        };
        return file;
    }

    function OBJFile(key, url) {
        var file = new File(key, url);
        file.load = function () {
            file.url = GetURL(file.key, file.url, '.obj', file.loader);
            return new Promise(function (resolve, reject) {
                var cache = Cache.get('Obj');
                if (!file.skipCache && cache.has(file.key)) {
                    resolve(file);
                }
                else {
                    XHRLoader(file).then(function (file) {
                        if (!file.skipCache) {
                            cache.set(file.key, file.data);
                        }
                        resolve(file);
                    }).catch(function (file) {
                        reject(file);
                    });
                }
            });
        };
        return file;
    }

    function OBJGeometryFile(key, url, flipUVs) {
        if (flipUVs === void 0) { flipUVs = true; }
        var file = new File(key, url);
        file.load = function () {
            file.url = GetURL(file.key, file.url, '.obj', file.loader);
            return new Promise(function (resolve, reject) {
                var cache = Cache.get('Geometry');
                if (!file.skipCache && cache.has(file.key)) {
                    resolve(file);
                }
                else {
                    XHRLoader(file).then(function (file) {
                        var models = GetBufferFromObj(file.data, flipUVs);
                        file.data = models;
                        if (!file.skipCache) {
                            var key_1 = file.key;
                            models.forEach(function (model, index) {
                                if (index > 0) {
                                    key_1 = file.key + index.toString();
                                }
                                var geom = new Geometry(model.buffer);
                                cache.set(key_1, geom);
                            });
                        }
                        resolve(file);
                    }).catch(function (file) {
                        reject(file);
                    });
                }
            });
        };
        return file;
    }

    function SpriteSheetParser(texture, x, y, width, height, frameConfig) {
        var _a = frameConfig.frameWidth, frameWidth = _a === void 0 ? null : _a, _b = frameConfig.endFrame, endFrame = _b === void 0 ? -1 : _b, _c = frameConfig.margin, margin = _c === void 0 ? 0 : _c, _d = frameConfig.spacing, spacing = _d === void 0 ? 0 : _d;
        var _e = frameConfig.frameHeight, frameHeight = _e === void 0 ? null : _e, _f = frameConfig.startFrame, startFrame = _f === void 0 ? 0 : _f;
        if (!frameHeight) {
            frameHeight = frameWidth;
        }
        if (frameWidth === null) {
            throw new Error('SpriteSheetParser: Invalid frameWidth');
        }
        var row = Math.floor((width - margin + spacing) / (frameWidth + spacing));
        var column = Math.floor((height - margin + spacing) / (frameHeight + spacing));
        var total = row * column;
        if (total === 0) {
            console.warn('SpriteSheetParser: Frame config will result in zero frames');
        }
        if (startFrame > total || startFrame < -total) {
            startFrame = 0;
        }
        if (startFrame < 0) {
            startFrame = total + startFrame;
        }
        if (endFrame !== -1) {
            total = startFrame + (endFrame + 1);
        }
        var fx = margin;
        var fy = margin;
        var ax = 0;
        var ay = 0;
        for (var i = 0; i < total; i++) {
            ax = 0;
            ay = 0;
            var w = fx + frameWidth;
            var h = fy + frameHeight;
            if (w > width) {
                ax = w - width;
            }
            if (h > height) {
                ay = h - height;
            }
            texture.addFrame(i, x + fx, y + fy, frameWidth - ax, frameHeight - ay);
            fx += frameWidth + spacing;
            if (fx + frameWidth > width) {
                fx = margin;
                fy += frameHeight + spacing;
            }
        }
    }

    function SpriteSheetFile(key, url, frameConfig, glConfig) {
        var file = new File(key, url);
        file.load = function () {
            file.url = GetURL(file.key, file.url, '.png', file.loader);
            if (file.loader) {
                file.crossOrigin = file.loader.crossOrigin;
            }
            return new Promise(function (resolve, reject) {
                var textureManager = TextureManagerInstance.get();
                if (textureManager.has(file.key)) {
                    resolve(file);
                }
                else {
                    ImageTagLoader(file).then(function (file) {
                        var texture = textureManager.add(file.key, file.data, glConfig);
                        if (texture) {
                            SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);
                            resolve(file);
                        }
                        else {
                            reject(file);
                        }
                    }).catch(function (file) {
                        reject(file);
                    });
                }
            });
        };
        return file;
    }

    var index$b = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AtlasFile: AtlasFile,
        BitmapTextFile: BitmapTextFile,
        CSVFile: CSVFile,
        ImageFile: ImageFile,
        JSONFile: JSONFile,
        JSONGeometryFile: JSONGeometryFile,
        OBJFile: OBJFile,
        OBJGeometryFile: OBJGeometryFile,
        SpriteSheetFile: SpriteSheetFile,
        XMLFile: XMLFile
    });

    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader() {
            var _this = _super.call(this) || this;
            _this.baseURL = '';
            _this.path = '';
            _this.crossOrigin = 'anonymous';
            _this.maxParallelDownloads = -1;
            _this.isLoading = false;
            _this.reset();
            return _this;
        }
        Loader.prototype.reset = function () {
            this.isLoading = false;
            this.queue = new Set();
            this.inflight = new Set();
            this.completed = new Set();
            this.progress = 0;
        };
        Loader.prototype.add = function () {
            var _this = this;
            var file = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                file[_i] = arguments[_i];
            }
            file.forEach(function (entity) {
                entity.loader = _this;
                _this.queue.add(entity);
            });
            return this;
        };
        Loader.prototype.start = function () {
            var _this = this;
            if (this.isLoading) {
                return null;
            }
            return new Promise(function (resolve, reject) {
                _this.completed.clear();
                _this.progress = 0;
                if (_this.queue.size > 0) {
                    _this.isLoading = true;
                    _this.onComplete = resolve;
                    _this.onError = reject;
                    Emit(_this, 'start');
                    _this.nextFile();
                }
                else {
                    _this.progress = 1;
                    Emit(_this, 'complete');
                    resolve(_this);
                }
            });
        };
        Loader.prototype.nextFile = function () {
            var _this = this;
            var limit = this.queue.size;
            if (this.maxParallelDownloads !== -1) {
                limit = Math.min(limit, this.maxParallelDownloads) - this.inflight.size;
            }
            if (limit) {
                var iterator = this.queue.values();
                while (limit > 0) {
                    var file = iterator.next().value;
                    this.inflight.add(file);
                    this.queue.delete(file);
                    file.load()
                        .then(function (file) { return _this.fileComplete(file); })
                        .catch(function (file) { return _this.fileError(file); });
                    limit--;
                }
            }
            else if (this.inflight.size === 0) {
                this.stop();
            }
        };
        Loader.prototype.stop = function () {
            if (!this.isLoading) {
                return;
            }
            this.isLoading = false;
            Emit(this, 'complete', this.completed);
            this.onComplete();
            this.completed.clear();
        };
        Loader.prototype.updateProgress = function (file) {
            this.inflight.delete(file);
            this.completed.add(file);
            var totalCompleted = this.completed.size;
            var totalQueued = this.queue.size + this.inflight.size;
            if (totalCompleted > 0) {
                this.progress = totalCompleted / (totalCompleted + totalQueued);
            }
            Emit(this, 'progress', this.progress, totalCompleted, totalQueued);
            this.nextFile();
        };
        Loader.prototype.fileComplete = function (file) {
            Emit(this, 'filecomplete', file);
            this.updateProgress(file);
        };
        Loader.prototype.fileError = function (file) {
            Emit(this, 'fileerror', file);
            this.updateProgress(file);
        };
        Loader.prototype.totalFilesToLoad = function () {
            return this.queue.size + this.inflight.size;
        };
        Loader.prototype.setBaseURL = function (url) {
            if (url === void 0) { url = ''; }
            if (url !== '' && url.substr(-1) !== '/') {
                url = url.concat('/');
            }
            this.baseURL = url;
            return this;
        };
        Loader.prototype.setPath = function (path) {
            if (path === void 0) { path = ''; }
            if (path !== '' && path.substr(-1) !== '/') {
                path = path.concat('/');
            }
            this.path = path;
            return this;
        };
        Loader.prototype.setCORS = function (crossOrigin) {
            this.crossOrigin = crossOrigin;
            return this;
        };
        Loader.prototype.setMaxParallelDownloads = function (max) {
            this.maxParallelDownloads = max;
            return this;
        };
        return Loader;
    }(EventEmitter));

    var index$a = /*#__PURE__*/Object.freeze({
        __proto__: null,
        File: File,
        Files: index$b,
        Loader: Loader
    });

    var BlackPlastic = new Material({
        ambient: [0, 0, 0],
        diffuse: [0.01, 0.01, 0.01],
        specular: [0.5, 0.5, 0.5],
        shine: 0.25
    });

    var BlackRubber = new Material({
        ambient: [0.02, 0.02, 0.02],
        diffuse: [0.01, 0.01, 0.01],
        specular: [0.4, 0.4, 0.4],
        shine: 0.078125
    });

    var Brass = new Material({
        ambient: [0.329412, 0.223529, 0.027451],
        diffuse: [0.780392, 0.568627, 0.113725],
        specular: [0.992157, 0.941176, 0.807843],
        shine: 0.21794872
    });

    var Bronze = new Material({
        ambient: [0.2125, 0.1275, 0.054],
        diffuse: [0.714, 0.4284, 0.18144],
        specular: [0.393548, 0.271906, 0.166721],
        shine: 0.2
    });

    var Chrome = new Material({
        ambient: [0.25, 0.25, 0.25],
        diffuse: [0.4, 0.4, 0.4],
        specular: [0.774597, 0.774597, 0.774597],
        shine: 0.6
    });

    var Copper = new Material({
        ambient: [0.19125, 0.0735, 0.0225],
        diffuse: [0.7038, 0.27048, 0.0828],
        specular: [0.256777, 0.137622, 0.086014],
        shine: 0.1
    });

    var CyanPlastic = new Material({
        ambient: [0, 0.1, 0.06],
        diffuse: [0, 0.50980392, 0.50980392],
        specular: [0.50196078, 0.50196078, 0.50196078],
        shine: 0.25
    });

    var CyanRubber = new Material({
        ambient: [0, 0.05, 0.05],
        diffuse: [0.4, 0.5, 0.5],
        specular: [0.04, 0.7, 0.7],
        shine: 0.078125
    });

    var Emerald = new Material({
        ambient: [0.0215, 0.1745, 0.0215],
        diffuse: [0.07568, 0.61424, 0.07568],
        specular: [0.633, 0.727811, 0.633],
        shine: 0.6
    });

    var Gold = new Material({
        ambient: [0.24725, 0.1995, 0.0745],
        diffuse: [0.75164, 0.60648, 0.22648],
        specular: [0.628281, 0.555802, 0.366065],
        shine: 0.4
    });

    var GreenPlastic = new Material({
        ambient: [0, 0, 0],
        diffuse: [0.1, 0.35, 0.1],
        specular: [0.45, 0.55, 0.45],
        shine: 0.25
    });

    var GreenRubber = new Material({
        ambient: [0, 0.05, 0],
        diffuse: [0.4, 0.5, 0.4],
        specular: [0.04, 0.7, 0.04],
        shine: 0.078125
    });

    var Jade = new Material({
        ambient: [0.135, 0.2225, 0.1575],
        diffuse: [0.54, 0.89, 0.63],
        specular: [0.316228, 0.316228, 0.316228],
        shine: 0.1
    });

    var Obsidian = new Material({
        ambient: [0.05375, 0.05, 0.06625],
        diffuse: [0.18275, 0.17, 0.22525],
        specular: [0.332741, 0.328634, 0.346435],
        shine: 0.3
    });

    var Pearl = new Material({
        ambient: [0.25, 0.20725, 0.20725],
        diffuse: [1, 0.829, 0.829],
        specular: [0.296648, 0.296648, 0.296648],
        shine: 0.088
    });

    var RedPlastic = new Material({
        ambient: [0, 0, 0],
        diffuse: [0.5, 0, 0],
        specular: [0.7, 0.6, 0.6],
        shine: 0.25
    });

    var RedRubber = new Material({
        ambient: [0.05, 0, 0],
        diffuse: [0.5, 0.4, 0.4],
        specular: [0.7, 0.04, 0.04],
        shine: 0.078125
    });

    var Ruby = new Material({
        ambient: [0.1745, 0.01175, 0.01175],
        diffuse: [0.61424, 0.04136, 0.04136],
        specular: [0.727811, 0.626959, 0.626959],
        shine: 0.6
    });

    var Silver = new Material({
        ambient: [0.19225, 0.19225, 0.19225],
        diffuse: [0.50754, 0.50754, 0.50754],
        specular: [0.508273, 0.508273, 0.508273],
        shine: 0.4
    });

    var Turquoise = new Material({
        ambient: [0.1, 0.18725, 0.1745],
        diffuse: [0.396, 0.74151, 0.69102],
        specular: [0.297254, 0.30829, 0.306678],
        shine: 0.1
    });

    var WhitePlastic = new Material({
        ambient: [0, 0, 0],
        diffuse: [0.55, 0.55, 0.55],
        specular: [0.7, 0.7, 0.7],
        shine: 0.25
    });

    var WhiteRubber = new Material({
        ambient: [0.05, 0.05, 0.05],
        diffuse: [0.5, 0.5, 0.5],
        specular: [0.7, 0.7, 0.7],
        shine: 0.078125
    });

    var YellowPlastic = new Material({
        ambient: [0, 0, 0],
        diffuse: [0.5, 0.5, 0],
        specular: [0.6, 0.6, 0.5],
        shine: 0.25
    });

    var YellowRubber = new Material({
        ambient: [0.05, 0.05, 0],
        diffuse: [0.5, 0.5, 0.4],
        specular: [0.7, 0.7, 0.04],
        shine: 0.078125
    });

    var index$9 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BlackPlastic: BlackPlastic,
        BlackRubber: BlackRubber,
        Brass: Brass,
        Bronze: Bronze,
        Chrome: Chrome,
        Copper: Copper,
        CyanPlastic: CyanPlastic,
        CyanRubber: CyanRubber,
        Emerald: Emerald,
        Gold: Gold,
        GreenPlastic: GreenPlastic,
        GreenRubber: GreenRubber,
        Jade: Jade,
        Obsidian: Obsidian,
        Pearl: Pearl,
        RedPlastic: RedPlastic,
        RedRubber: RedRubber,
        Ruby: Ruby,
        Silver: Silver,
        Turquoise: Turquoise,
        WhitePlastic: WhitePlastic,
        WhiteRubber: WhiteRubber,
        YellowPlastic: YellowPlastic,
        YellowRubber: YellowRubber
    });

    var Arne16 = [
        '#000',
        '#9D9D9D',
        '#FFF',
        '#BE2633',
        '#E06F8B',
        '#493C2B',
        '#A46422',
        '#EB8931',
        '#F7E26B',
        '#2F484E',
        '#44891A',
        '#A3CE27',
        '#1B2632',
        '#005784',
        '#31A2F2',
        '#B2DCEF'
    ];

    var C64 = [
        '#000',
        '#fff',
        '#8b4131',
        '#7bbdc5',
        '#8b41ac',
        '#6aac41',
        '#3931a4',
        '#d5de73',
        '#945a20',
        '#5a4100',
        '#bd736a',
        '#525252',
        '#838383',
        '#acee8b',
        '#7b73de',
        '#acacac'
    ];

    var CGA = [
        '#000',
        '#2234d1',
        '#0c7e45',
        '#44aacc',
        '#8a3622',
        '#5c2e78',
        '#aa5c3d',
        '#b5b5b5',
        '#5e606e',
        '#4c81fb',
        '#6cd947',
        '#7be2f9',
        '#eb8a60',
        '#e23d69',
        '#ffd93f',
        '#fff'
    ];

    var JMP = [
        '#000',
        '#191028',
        '#46af45',
        '#a1d685',
        '#453e78',
        '#7664fe',
        '#833129',
        '#9ec2e8',
        '#dc534b',
        '#e18d79',
        '#d6b97b',
        '#e9d8a1',
        '#216c4b',
        '#d365c8',
        '#afaab9',
        '#f5f4eb'
    ];

    var MSX = [
        '#000',
        '#191028',
        '#46af45',
        '#a1d685',
        '#453e78',
        '#7664fe',
        '#833129',
        '#9ec2e8',
        '#dc534b',
        '#e18d79',
        '#d6b97b',
        '#e9d8a1',
        '#216c4b',
        '#d365c8',
        '#afaab9',
        '#fff'
    ];

    var PICO8 = [
        '#000',
        '#1D2B53',
        '#7E2553',
        '#008751',
        '#AB5236',
        '#5F574F',
        '#C2C3C7',
        '#FFF1E8',
        '#FF004D',
        '#FFA300',
        '#FFEC27',
        '#00E436',
        '#29ADFF',
        '#83769C',
        '#FF77A8',
        '#FFCCAA'
    ];

    var index$8 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Arne16: Arne16,
        C64: C64,
        CGA: CGA,
        JMP: JMP,
        MSX: MSX,
        PICO8: PICO8
    });

    var index$7 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AtlasParser: AtlasParser,
        BitmapTextParser: BitmapTextParser,
        SpriteSheetParser: SpriteSheetParser
    });

    function GridTexture(color1, color2, width, height, cols, rows) {
        if (width === void 0) { width = 32; }
        if (height === void 0) { height = 32; }
        if (cols === void 0) { cols = 2; }
        if (rows === void 0) { rows = 2; }
        var ctx = CreateCanvas(width, height);
        var colWidth = width / cols;
        var rowHeight = height / rows;
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = color2;
        for (var y = 0; y < rows; y++) {
            for (var x = (y % 2); x < cols; x += 2) {
                ctx.fillRect(x * colWidth, y * rowHeight, colWidth, rowHeight);
            }
        }
        return new Texture(ctx.canvas);
    }

    function PixelTexture(config) {
        var _a = config.data, data = _a === void 0 ? [] : _a, _b = config.palette, palette = _b === void 0 ? Arne16 : _b, _c = config.pixelWidth, pixelWidth = _c === void 0 ? 1 : _c, _d = config.pixelHeight, pixelHeight = _d === void 0 ? pixelWidth : _d, _e = config.preRender, preRender = _e === void 0 ? null : _e, _f = config.postRender, postRender = _f === void 0 ? null : _f;
        var _g = config.canvas, canvas = _g === void 0 ? null : _g, _h = config.resizeCanvas, resizeCanvas = _h === void 0 ? true : _h, _j = config.clearCanvas, clearCanvas = _j === void 0 ? true : _j;
        var width = Math.floor(Math.abs(data[0].length * pixelWidth));
        var height = Math.floor(Math.abs(data.length * pixelHeight));
        if (!canvas) {
            canvas = CreateCanvas(width, height).canvas;
            resizeCanvas = false;
            clearCanvas = false;
        }
        if (resizeCanvas) {
            canvas.width = width;
            canvas.height = height;
        }
        var ctx = canvas.getContext('2d');
        if (clearCanvas) {
            ctx.clearRect(0, 0, width, height);
        }
        if (preRender) {
            preRender(canvas, ctx);
        }
        for (var y = 0; y < data.length; y++) {
            var row = data[y];
            for (var x = 0; x < row.length; x++) {
                var d = row[x];
                if (d !== '.' && d !== ' ') {
                    ctx.fillStyle = palette[parseInt('0x' + d.toUpperCase())];
                    ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
                }
            }
        }
        if (postRender) {
            postRender(canvas, ctx);
        }
        return new Texture(canvas);
    }

    var RenderTexture = (function (_super) {
        __extends(RenderTexture, _super);
        function RenderTexture(renderer, width, height) {
            if (width === void 0) { width = 256; }
            if (height === void 0) { height = width; }
            var _this = _super.call(this, null, width, height) || this;
            _this.renderer = renderer;
            return _this;
        }
        RenderTexture.prototype.cls = function () {
            return this;
        };
        RenderTexture.prototype.batchStart = function () {
            return this;
        };
        RenderTexture.prototype.batchDraw = function (sprites) {
            for (var i = 0, len = sprites.length; i < len; i++) {
            }
            return this;
        };
        RenderTexture.prototype.batchEnd = function () {
            var renderer = this.renderer;
            renderer.reset();
            return this;
        };
        RenderTexture.prototype.draw = function () {
            var sprites = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                sprites[_i] = arguments[_i];
            }
            this.batchStart();
            this.batchDraw(sprites);
            this.batchEnd();
            return this;
        };
        return RenderTexture;
    }(Texture));

    function SolidColorTexture(color, width, height) {
        if (color === void 0) { color = 'rgba(0,0,0,0)'; }
        if (width === void 0) { width = 32; }
        if (height === void 0) { height = 32; }
        var ctx = CreateCanvas(width, height);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        return new Texture(ctx.canvas);
    }

    var index$6 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CanvasTexture: CanvasTexture,
        GridTexture: GridTexture,
        PixelTexture: PixelTexture,
        RenderTexture: RenderTexture,
        SolidColorTexture: SolidColorTexture
    });

    function GetFrames(texture, frames) {
        var output = [];
        frames.forEach(function (key) {
            output.push(texture.getFrame(key));
        });
        return output;
    }

    function GetFramesInRange(texture, config) {
        var _a = config.prefix, prefix = _a === void 0 ? '' : _a, _b = config.start, start = _b === void 0 ? 0 : _b, _c = config.zeroPad, zeroPad = _c === void 0 ? 0 : _c, _d = config.suffix, suffix = _d === void 0 ? '' : _d;
        var end = config.end;
        var output = [];
        var diff = (start < end) ? 1 : -1;
        end += diff;
        for (var i = start; i !== end; i += diff) {
            var frameKey = (prefix + i.toString().padStart(zeroPad, '0') + suffix);
            output.push(texture.getFrame(frameKey));
        }
        return output;
    }

    function SetFilter(linear) {
        var textures = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            textures[_i - 1] = arguments[_i];
        }
        textures.forEach(function (texture) {
            if (texture.binding) {
                texture.binding.setFilter(linear);
            }
        });
        return textures;
    }

    var TextureManager = (function () {
        function TextureManager() {
            this.textures = new Map();
            this.createDefaultTextures();
            TextureManagerInstance.set(this);
        }
        TextureManager.prototype.createDefaultTextures = function () {
            this.add('__BLANK', new Texture(CreateCanvas(32, 32).canvas));
            var missing = CreateCanvas(32, 32);
            missing.strokeStyle = '#0f0';
            missing.moveTo(0, 0);
            missing.lineTo(32, 32);
            missing.stroke();
            missing.strokeRect(0.5, 0.5, 31, 31);
            this.add('__MISSING', new Texture(missing.canvas));
            var white = CreateCanvas(32, 32);
            white.fillStyle = '#fff';
            white.fillRect(0, 0, 32, 32);
            this.add('__WHITE', new Texture(white.canvas));
        };
        TextureManager.prototype.get = function (key) {
            var textures = this.textures;
            if (textures.has(key)) {
                return textures.get(key);
            }
            else {
                return textures.get('__MISSING');
            }
        };
        TextureManager.prototype.has = function (key) {
            return this.textures.has(key);
        };
        TextureManager.prototype.add = function (key, source, glConfig) {
            var texture;
            var textures = this.textures;
            if (!textures.has(key)) {
                if (source instanceof Texture) {
                    texture = source;
                }
                else {
                    texture = new Texture(source, 0, 0, glConfig);
                }
                texture.key = key;
                textures.set(key, texture);
            }
            return texture;
        };
        return TextureManager;
    }());

    var index$5 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CreateCanvas: CreateCanvas,
        Frame: Frame,
        GetFrames: GetFrames,
        GetFramesInRange: GetFramesInRange,
        SetFilter: SetFilter,
        Palettes: index$8,
        Parsers: index$7,
        Types: index$6,
        Texture: Texture,
        TextureManager: TextureManager
    });

    function NOOP() {
    }

    function AddTimer(clock, config) {
        var _a = config.duration, duration = _a === void 0 ? 0 : _a, _b = config.repeat, repeat = _b === void 0 ? 0 : _b, _c = config.delay, delay = _c === void 0 ? -1 : _c, _d = config.onStart, onStart = _d === void 0 ? NOOP : _d, _e = config.onUpdate, onUpdate = _e === void 0 ? NOOP : _e, _f = config.onRepeat, onRepeat = _f === void 0 ? NOOP : _f, _g = config.onComplete, onComplete = _g === void 0 ? NOOP : _g;
        var timer = {
            elapsed: duration,
            duration: duration,
            repeat: repeat,
            delay: delay,
            update: null,
            onStart: onStart,
            onUpdate: onUpdate,
            onRepeat: onRepeat,
            onComplete: onComplete
        };
        timer.update = function (delta) {
            if (timer.delay > 0) {
                timer.delay -= delta;
                if (timer.delay < 0) {
                    timer.delay = 0;
                }
                else {
                    return false;
                }
            }
            if (timer.delay === 0) {
                timer.onStart();
                timer.delay = -1;
            }
            if (timer.delay === -1) {
                timer.elapsed -= delta;
                timer.onUpdate(delta, timer.elapsed / timer.duration);
                if (timer.elapsed <= 0) {
                    if (timer.repeat > 0) {
                        timer.repeat--;
                        timer.elapsed = timer.duration;
                        timer.onRepeat(timer.repeat);
                    }
                    else {
                        timer.elapsed = 0;
                        timer.onComplete();
                    }
                }
            }
            return (timer.elapsed === 0);
        };
        clock.events.add(timer);
    }

    function AddDelayedCall(clock, delay, callback) {
        AddTimer(clock, {
            duration: 0,
            delay: delay,
            onComplete: callback
        });
    }

    var Clock = (function () {
        function Clock(world) {
            this.world = world;
            this.timeScale = 1;
            this.events = new Set();
        }
        Clock.prototype.update = function (delta, time) {
            var _this = this;
            this.now = time;
            delta *= this.timeScale;
            this.events.forEach(function (timer) {
                if (timer.update(delta)) {
                    _this.events.delete(timer);
                }
            });
        };
        return Clock;
    }());

    var index$4 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AddDelayedCall: AddDelayedCall,
        AddTimer: AddTimer,
        Clock: Clock,
        NOOP: NOOP
    });

    var WorldRenderEvent = 'worldrender';

    var WorldShutdownEvent = 'worldshutdown';

    var index$3 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        WorldRenderEvent: WorldRenderEvent,
        WorldShutdownEvent: WorldShutdownEvent
    });

    function CalculateTotalRenderable$1(entry, renderData) {
        renderData.numRendered++;
        renderData.numRenderable++;
        if (entry.node.dirtyFrame >= renderData.gameFrame) {
            renderData.dirtyFrame++;
        }
        entry.children.forEach(function (child) {
            if (child.children.length > 0) {
                CalculateTotalRenderable$1(child, renderData);
            }
        });
    }

    function HasDirtyChildren$1(parent) {
        if (parent.node.isDirty(DIRTY_CONST.CHILD_CACHE)) {
            return true;
        }
        var stack = [parent];
        while (stack.length > 0) {
            var entry = stack.pop();
            if (entry.node.isDirty(DIRTY_CONST.TRANSFORM)) {
                return true;
            }
            var numChildren = entry.children.length;
            if (numChildren > 0) {
                for (var i = 0; i < numChildren; i++) {
                    stack.push(entry.children[i]);
                }
            }
        }
        stack.length = 0;
        return false;
    }

    function UpdateCachedLayers$1(cachedLayers, dirtyCamera) {
        cachedLayers.forEach(function (layer) {
            if (dirtyCamera || HasDirtyChildren$1(layer)) {
                layer.node.setDirty(DIRTY_CONST.CHILD_CACHE);
            }
            else {
                layer.children.length = 0;
            }
        });
    }

    function WorldDepthFirstSearch$1(cachedLayers, parent, output) {
        if (output === void 0) { output = []; }
        for (var i = 0; i < parent.numChildren; i++) {
            var node = parent.children[i];
            if (node.isRenderable()) {
                var children = [];
                var entry = { node: node, children: children };
                output.push(entry);
                if (node.willRenderChildren && node.numChildren > 0) {
                    if (node.willCacheChildren) {
                        cachedLayers.push(entry);
                    }
                    WorldDepthFirstSearch$1(cachedLayers, node, children);
                }
            }
        }
        return output;
    }

    function BuildRenderList$1(world) {
        var cachedLayers = [];
        var stack = [];
        var entries = WorldDepthFirstSearch$1(cachedLayers, world, stack);
        var renderData = world.renderData;
        if (cachedLayers.length > 0) {
            UpdateCachedLayers$1(cachedLayers, world.camera.dirtyRender);
        }
        entries.forEach(function (entry) {
            if (entry.children.length > 0) {
                CalculateTotalRenderable$1(entry, renderData);
            }
            else {
                renderData.numRendered++;
                renderData.numRenderable++;
                if (entry.node.dirtyFrame >= renderData.gameFrame) {
                    renderData.dirtyFrame++;
                }
            }
        });
        world.renderList = entries;
        if (world.forceRefresh) {
            renderData.dirtyFrame++;
            world.forceRefresh = false;
        }
    }

    function MergeRenderData$1(sceneRenderData, worldRenderData) {
        sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
        sceneRenderData.numTotalFrames += worldRenderData.numRendered;
        if (worldRenderData.camera.dirtyRender) {
            sceneRenderData.numDirtyCameras++;
        }
        sceneRenderData.worldData.push(worldRenderData);
    }

    function ResetWorldRenderData(renderData, gameFrame) {
        renderData.gameFrame = gameFrame;
        renderData.dirtyFrame = 0;
        renderData.numRendered = 0;
        renderData.numRenderable = 0;
    }

    var BaseWorld = (function (_super) {
        __extends(BaseWorld, _super);
        function BaseWorld(scene) {
            var _this = _super.call(this) || this;
            _this.forceRefresh = false;
            _this.is3D = false;
            _this.type = 'BaseWorld';
            _this.scene = scene;
            _this.world = _this;
            _this.events = new Map();
            _this.renderList = [];
            _this._updateListener = On(scene, 'update', function (delta, time) { return _this.update(delta, time); });
            _this._renderListener = On(scene, 'render', function (renderData) { return _this.render(renderData); });
            _this._shutdownListener = On(scene, 'shutdown', function () { return _this.shutdown(); });
            Once(scene, 'destroy', function () { return _this.destroy(); });
            return _this;
        }
        BaseWorld.prototype.update = function (delta, time) {
            if (!this.willUpdate) {
                return;
            }
            Emit(this, UpdateEvent, delta, time, this);
            _super.prototype.update.call(this, delta, time);
        };
        BaseWorld.prototype.postUpdate = function (delta, time) {
            Emit(this, PostUpdateEvent, delta, time, this);
        };
        BaseWorld.prototype.render = function (sceneRenderData) {
            var renderData = this.renderData;
            ResetWorldRenderData(renderData, sceneRenderData.gameFrame);
            if (!this.willRender || !this.visible) {
                return;
            }
            BuildRenderList$1(this);
            Emit(this, WorldRenderEvent, renderData, this);
            MergeRenderData$1(sceneRenderData, renderData);
            this.camera.dirtyRender = false;
        };
        BaseWorld.prototype.renderGL = function (renderPass) {
            var _this = this;
            var currentCamera = renderPass.current2DCamera;
            var camera = this.camera;
            if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform)) {
                Flush(renderPass);
            }
            Begin(renderPass, camera);
            this.renderList.forEach(function (entry) {
                if (entry.children.length > 0) {
                    _this.renderNode(entry, renderPass);
                }
                else {
                    entry.node.renderGL(renderPass);
                }
            });
        };
        BaseWorld.prototype.renderNode = function (entry, renderPass) {
            var _this = this;
            entry.node.renderGL(renderPass);
            entry.children.forEach(function (child) {
                if (child.children.length > 0) {
                    _this.renderNode(child, renderPass);
                }
                else {
                    child.node.renderGL(renderPass);
                }
            });
            entry.node.postRenderGL(renderPass);
        };
        BaseWorld.prototype.postRenderGL = function (renderPass) {
        };
        BaseWorld.prototype.shutdown = function () {
            var scene = this.scene;
            Off(scene, 'update', this._updateListener);
            Off(scene, 'render', this._renderListener);
            Off(scene, 'shutdown', this._shutdownListener);
            RemoveChildren(this);
            Emit(this, WorldShutdownEvent, this);
            ResetWorldRenderData(this.renderData, 0);
            if (this.camera) {
                this.camera.reset();
            }
        };
        BaseWorld.prototype.destroy = function (reparentChildren) {
            _super.prototype.destroy.call(this, reparentChildren);
            Emit(this, DestroyEvent, this);
            ResetWorldRenderData(this.renderData, 0);
            if (this.camera) {
                this.camera.destroy();
            }
            this.events.clear();
            this.camera = null;
            this.renderData = null;
            this.events = null;
        };
        return BaseWorld;
    }(GameObject));

    function CreateWorldRenderData(world, camera) {
        return {
            world: world,
            camera: camera,
            gameFrame: 0,
            dirtyFrame: 0,
            numRendered: 0,
            numRenderable: 0
        };
    }

    var StaticWorld = (function (_super) {
        __extends(StaticWorld, _super);
        function StaticWorld(scene) {
            var _this = _super.call(this, scene) || this;
            _this.type = 'StaticWorld';
            _this.camera = new StaticCamera();
            _this.renderData = CreateWorldRenderData(_this, _this.camera);
            return _this;
        }
        return StaticWorld;
    }(BaseWorld));

    var World = (function (_super) {
        __extends(World, _super);
        function World(scene) {
            var _this = _super.call(this, scene) || this;
            _this.enableCameraCull = true;
            _this.type = 'World';
            _this.camera = new Camera();
            _this.renderData = CreateWorldRenderData(_this, _this.camera);
            return _this;
        }
        return World;
    }(BaseWorld));

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BaseWorld: BaseWorld,
        BuildRenderList: BuildRenderList$1,
        CalculateTotalRenderable: CalculateTotalRenderable$1,
        CreateWorldRenderData: CreateWorldRenderData,
        Events: index$3,
        HasDirtyChildren: HasDirtyChildren$1,
        MergeRenderData: MergeRenderData$1,
        ResetWorldRenderData: ResetWorldRenderData,
        StaticWorld: StaticWorld,
        UpdateCachedLayers: UpdateCachedLayers$1,
        World: World,
        WorldDepthFirstSearch: WorldDepthFirstSearch$1
    });

    var World3DRenderEvent = 'worldrender';

    var World3DShutdownEvent = 'worldshutdown';

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        World3DRenderEvent: World3DRenderEvent,
        World3DShutdownEvent: World3DShutdownEvent
    });

    function CalculateTotalRenderable(entry, renderData) {
        renderData.numRendered++;
        renderData.numRenderable++;
        if (entry.node.dirtyFrame >= renderData.gameFrame) {
            renderData.dirtyFrame++;
        }
        entry.children.forEach(function (child) {
            if (child.children.length > 0) {
                CalculateTotalRenderable(child, renderData);
            }
        });
    }

    function HasDirtyChildren(parent) {
        if (parent.node.isDirty(DIRTY_CONST.CHILD_CACHE)) {
            return true;
        }
        var stack = [parent];
        while (stack.length > 0) {
            var entry = stack.pop();
            if (entry.node.isDirty(DIRTY_CONST.TRANSFORM)) {
                return true;
            }
            var numChildren = entry.children.length;
            if (numChildren > 0) {
                for (var i = 0; i < numChildren; i++) {
                    stack.push(entry.children[i]);
                }
            }
        }
        stack.length = 0;
        return false;
    }

    function UpdateCachedLayers(cachedLayers, dirtyCamera) {
        cachedLayers.forEach(function (layer) {
            if (dirtyCamera || HasDirtyChildren(layer)) {
                layer.node.setDirty(DIRTY_CONST.CHILD_CACHE);
            }
            else {
                layer.children.length = 0;
            }
        });
    }

    function WorldDepthFirstSearch(cachedLayers, parent, output) {
        if (output === void 0) { output = []; }
        for (var i = 0; i < parent.numChildren; i++) {
            var node = parent.children[i];
            if (node.isRenderable()) {
                var children = [];
                var entry = { node: node, children: children };
                output.push(entry);
                if (node.willRenderChildren && node.numChildren > 0) {
                    if (node.willCacheChildren) {
                        cachedLayers.push(entry);
                    }
                    WorldDepthFirstSearch(cachedLayers, node, children);
                }
            }
        }
        return output;
    }

    function BuildRenderList(world) {
        var cachedLayers = [];
        var stack = [];
        var entries = WorldDepthFirstSearch(cachedLayers, world, stack);
        var renderData = world.renderData;
        if (cachedLayers.length > 0) {
            UpdateCachedLayers(cachedLayers, world.camera.dirtyRender);
        }
        entries.forEach(function (entry) {
            if (entry.children.length > 0) {
                CalculateTotalRenderable(entry, renderData);
            }
            else {
                renderData.numRendered++;
                renderData.numRenderable++;
                if (entry.node.dirtyFrame >= renderData.gameFrame) {
                    renderData.dirtyFrame++;
                }
            }
        });
        world.renderList = entries;
        if (world.forceRefresh) {
            renderData.dirtyFrame++;
            world.forceRefresh = false;
        }
    }

    function MergeRenderData(sceneRenderData, worldRenderData) {
        sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
        sceneRenderData.numTotalFrames += worldRenderData.numRendered;
        if (worldRenderData.camera.dirtyRender) {
            sceneRenderData.numDirtyCameras++;
        }
        sceneRenderData.worldData.push(worldRenderData);
    }

    function ResetWorld3DRenderData(renderData, gameFrame) {
        renderData.gameFrame = gameFrame;
        renderData.dirtyFrame = 0;
        renderData.numRendered = 0;
        renderData.numRenderable = 0;
    }

    var BaseWorld3D = (function (_super) {
        __extends(BaseWorld3D, _super);
        function BaseWorld3D(scene) {
            var _this = _super.call(this) || this;
            _this.forceRefresh = false;
            _this.is3D = true;
            _this.type = 'BaseWorld';
            _this.scene = scene;
            _this.world = _this;
            _this.events = new Map();
            _this.renderList = [];
            _this._updateListener = On(scene, 'update', function (delta, time) { return _this.update(delta, time); });
            _this._renderListener = On(scene, 'render', function (renderData) { return _this.render(renderData); });
            _this._shutdownListener = On(scene, 'shutdown', function () { return _this.shutdown(); });
            Once(scene, 'destroy', function () { return _this.destroy(); });
            return _this;
        }
        BaseWorld3D.prototype.update = function (delta, time) {
            if (!this.willUpdate) {
                return;
            }
            Emit(this, UpdateEvent, delta, time, this);
            _super.prototype.update.call(this, delta, time);
        };
        BaseWorld3D.prototype.postUpdate = function (delta, time) {
            Emit(this, PostUpdateEvent, delta, time, this);
        };
        BaseWorld3D.prototype.render = function (sceneRenderData) {
            var renderData = this.renderData;
            ResetWorld3DRenderData(renderData, sceneRenderData.gameFrame);
            if (!this.willRender || !this.visible) {
                return;
            }
            BuildRenderList(this);
            Emit(this, World3DRenderEvent, renderData, this);
            MergeRenderData(sceneRenderData, renderData);
        };
        BaseWorld3D.prototype.renderNode = function (entry, renderPass) {
            var _this = this;
            entry.node.renderGL(renderPass);
            entry.children.forEach(function (child) {
                if (child.children.length > 0) {
                    _this.renderNode(child, renderPass);
                }
                else {
                    child.node.renderGL(renderPass);
                }
            });
            entry.node.postRenderGL(renderPass);
        };
        BaseWorld3D.prototype.shutdown = function () {
            var scene = this.scene;
            Off(scene, 'update', this._updateListener);
            Off(scene, 'render', this._renderListener);
            Off(scene, 'shutdown', this._shutdownListener);
            RemoveChildren3D(this);
            Emit(this, World3DShutdownEvent, this);
            ResetWorld3DRenderData(this.renderData, 0);
        };
        BaseWorld3D.prototype.destroy = function (reparentChildren) {
            _super.prototype.destroy.call(this, reparentChildren);
            Emit(this, DestroyEvent, this);
            ResetWorld3DRenderData(this.renderData, 0);
            this.events.clear();
            this.camera = null;
            this.renderData = null;
            this.events = null;
        };
        return BaseWorld3D;
    }(GameObject3D));

    function CreateWorld3DRenderData(world, camera) {
        return {
            world: world,
            camera: camera,
            gameFrame: 0,
            dirtyFrame: 0,
            numRendered: 0,
            numRenderable: 0
        };
    }

    var AMBIENT_LIGHT_FRAG = "#define SHADER_NAME AMBIENT_LIGHT_FRAG\n\nprecision highp float;\n\nuniform vec3 uLightPosition;\nuniform vec3 uLightAmbient;\nuniform vec3 uLightDiffuse;\nuniform vec3 uLightSpecular;\n\nuniform vec3 uMaterialAmbient;\nuniform vec3 uMaterialDiffuse;\nuniform vec3 uMaterialSpecular;\nuniform float uMaterialShine;\n\nuniform vec3 uCameraPosition;\n\nuniform sampler2D uTexture;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\n\nvoid main (void)\n{\n    vec4 color = texture2D(uTexture, vTextureCoord);\n\n    vec3 ambient = uLightAmbient * uMaterialAmbient;\n\n    vec3 norm = normalize(vNormal);\n    vec3 lightDir = normalize(uLightPosition - vPosition);\n    float diff = max(dot(norm, lightDir), 0.0);\n    vec3 diffuse = uLightDiffuse * (diff * uMaterialDiffuse);\n\n    vec3 viewDir = normalize(uCameraPosition - vPosition);\n    vec3 reflectDir = reflect(-lightDir, norm);\n    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uMaterialShine);\n    vec3 specular = uLightSpecular * (spec * uMaterialSpecular);\n\n    vec3 result = (ambient + diffuse + specular) * color.rgb;\n\n    gl_FragColor = vec4(result, color.a);\n}";

    var AMBIENT_LIGHT_VERT = "\n#define SHADER_NAME AMBIENT_LIGHT_VERT\n\nprecision highp float;\n\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uModelMatrix;\nuniform mat4 uNormalMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\n\nvoid main(void)\n{\n    vTextureCoord = aTextureCoord;\n\n    vPosition = vec3(uModelMatrix * vec4(aVertexPosition, 1.0));\n\n    vNormal = vec3(uNormalMatrix * vec4(aVertexNormal, 1.0));\n\n    gl_Position = uViewProjectionMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n}\n";

    var AmbientLightShader = (function (_super) {
        __extends(AmbientLightShader, _super);
        function AmbientLightShader() {
            var _this = _super.call(this) || this;
            var tempMat4 = new Float32Array(16).fill(0);
            var tempVec3 = [0, 0, 0];
            var config = {
                fragmentShader: AMBIENT_LIGHT_FRAG,
                vertexShader: AMBIENT_LIGHT_VERT,
                attributes: {
                    aVertexPosition: { size: 3, type: FLOAT, normalized: false, offset: 0 },
                    aVertexNormal: { size: 3, type: FLOAT, normalized: false, offset: 12 },
                    aTextureCoord: { size: 2, type: FLOAT, normalized: false, offset: 24 }
                },
                uniforms: {
                    uViewProjectionMatrix: tempMat4,
                    uNormalMatrix: tempMat4,
                    uModelMatrix: tempMat4,
                    uCameraPosition: tempVec3,
                    uTexture: 0,
                    uLightPosition: tempVec3,
                    uLightAmbient: tempVec3,
                    uLightDiffuse: tempVec3,
                    uLightSpecular: tempVec3,
                    uMaterialAmbient: tempVec3,
                    uMaterialDiffuse: tempVec3,
                    uMaterialSpecular: tempVec3,
                    uMaterialShine: 0
                }
            };
            _this.fromConfig(config);
            return _this;
        }
        return AmbientLightShader;
    }(Shader));

    var NewCamera3D = (function () {
        function NewCamera3D(fov, near, far) {
            var _this = this;
            if (fov === void 0) { fov = 45; }
            if (near === void 0) { near = 0.1; }
            if (far === void 0) { far = 1000; }
            this.isOrbit = false;
            this.minDistance = 0;
            this.maxDistance = Infinity;
            this.minPolarAngle = 0;
            this.maxPolarAngle = Math.PI;
            this.minAzimuthAngle = -Infinity;
            this.maxAzimuthAngle = Infinity;
            this.dirtyRender = true;
            this.panRate = 5;
            this.zoomRate = 200;
            this.rotateRate = -3;
            this._yaw = 0;
            this._pitch = 0;
            this._roll = 0;
            this.type = 'Camera3D';
            this._fov = fov;
            this._near = near;
            this._far = far;
            this.matrix = new Matrix4();
            this.viewMatrix = new Matrix4();
            this.projectionMatrix = new Matrix4();
            this.viewProjectionMatrix = new Matrix4();
            this.position = new Vec3Callback(function () { return _this.update(); });
            this.rotation = new Quaternion();
            var game = GameInstance.get();
            var renderer = game.renderer;
            this.viewport = new Rectangle$1(0, 0, renderer.width, renderer.height);
            this.renderer = renderer;
            this.forward = Vec3Forward();
            this.up = Vec3Up();
            this.right = Vec3Right();
            this.start = new Vec3();
            this.setAspectRatio();
        }
        NewCamera3D.prototype.update = function () {
            var matrix = this.matrix;
            var view = this.viewMatrix;
            Mat4FromRotationXYTranslation(this.rotation, this.position, !this.isOrbit, matrix);
            Vec3TransformMat4Zero(FORWARD, matrix, this.forward);
            Vec3TransformMat4Zero(UP, matrix, this.up);
            Vec3TransformMat4Zero(RIGHT, matrix, this.right);
            Mat4Invert(matrix, view);
            Mat4Multiply(this.projectionMatrix, view, this.viewProjectionMatrix);
            return this;
        };
        NewCamera3D.prototype.panX = function (amount) {
            var pos = this.position;
            if (!this.isOrbit) {
                Vec3ScaleAndAdd(pos, this.right, amount, pos);
            }
            return this;
        };
        NewCamera3D.prototype.panY = function (amount) {
            var pos = this.position;
            var up = this.up;
            if (this.isOrbit) {
                pos.y += up.y * amount;
            }
            else {
                Vec3ScaleAndAdd(pos, up, amount, pos);
            }
            return this;
        };
        NewCamera3D.prototype.panZ = function (amount) {
            var pos = this.position;
            if (this.isOrbit) {
                pos.z += amount;
            }
            else {
                Vec3ScaleAndAdd(pos, this.forward, amount, pos);
            }
            return this;
        };
        NewCamera3D.prototype.begin = function (x, y) {
            this.start.set(x, y);
        };
        NewCamera3D.prototype.pan = function (x, y) {
            var dx = x - this.start.x;
            var dy = y - this.start.y;
            var viewport = this.viewport;
            this.panX(-dx * (this.panRate / viewport.width));
            this.panY(dy * (this.panRate / viewport.height));
            this.start.set(x, y);
        };
        NewCamera3D.prototype.rotate = function (x, y) {
            var dx = x - this.start.x;
            var dy = y - this.start.y;
            var viewport = this.viewport;
            this.rotation.x += dy * (this.rotateRate / viewport.height);
            this.rotation.y += dx * (this.rotateRate / viewport.width);
            this.start.set(x, y);
            this.update();
        };
        NewCamera3D.prototype.zoom = function (delta) {
            this.panZ(Clamp(delta, -1, 1) * (this.zoomRate / this.viewport.height));
        };
        NewCamera3D.prototype.setAspectRatio = function (value) {
            if (!value) {
                var renderer = this.renderer;
                value = renderer.width / renderer.height;
            }
            this.aspect = value;
            return this.updateProjectionMatrix();
        };
        NewCamera3D.prototype.updateProjectionMatrix = function () {
            Mat4Perspective(DegToRad(this._fov), this.aspect, this._near, this._far, this.projectionMatrix);
            return this;
        };
        Object.defineProperty(NewCamera3D.prototype, "fov", {
            get: function () {
                return this._fov;
            },
            set: function (value) {
                this._fov = Clamp(value, 0, 180);
                this.updateProjectionMatrix();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NewCamera3D.prototype, "near", {
            get: function () {
                return this._near;
            },
            set: function (value) {
                if (value > 0) {
                    this._near = value;
                    this.updateProjectionMatrix();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NewCamera3D.prototype, "far", {
            get: function () {
                return this._far;
            },
            set: function (value) {
                if (value > 0) {
                    this._far = value;
                    this.updateProjectionMatrix();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NewCamera3D.prototype, "yaw", {
            get: function () {
                return this._yaw;
            },
            set: function (value) {
                this._yaw = value;
                QuatRotationYawPitchRoll(value, this._pitch, this._roll, this.rotation);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NewCamera3D.prototype, "pitch", {
            get: function () {
                return this._pitch;
            },
            set: function (value) {
                this._pitch = value;
                QuatRotationYawPitchRoll(this._yaw, value, this._roll, this.rotation);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NewCamera3D.prototype, "roll", {
            get: function () {
                return this._roll;
            },
            set: function (value) {
                this._roll = value;
                QuatRotationYawPitchRoll(this._yaw, this._pitch, value, this.rotation);
            },
            enumerable: false,
            configurable: true
        });
        return NewCamera3D;
    }());

    var World3D = (function (_super) {
        __extends(World3D, _super);
        function World3D(scene, x, y, z, lightConfig) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            var _this = _super.call(this, scene) || this;
            _this.enableCameraCull = true;
            _this.type = 'World3D';
            _this.camera = new NewCamera3D();
            _this.camera.position.set(x, y, z);
            _this.light = new Light(lightConfig);
            _this.shader = new AmbientLightShader();
            _this.renderData = CreateWorld3DRenderData(_this, _this.camera);
            return _this;
        }
        World3D.prototype.renderGL = function (renderPass) {
            var _this = this;
            Flush(renderPass);
            var shader = this.shader;
            var camera = this.camera;
            var gl = renderPass.renderer.gl;
            SetShader(renderPass, shader, 0);
            shader.setUniform('uViewProjectionMatrix', camera.viewProjectionMatrix.data);
            shader.setUniform('uCameraPosition', camera.position.toArray());
            this.light.setUniforms(shader);
            gl.enable(gl.DEPTH_TEST);
            this.renderList.forEach(function (entry) {
                if (entry.children.length > 0) {
                    _this.renderNode(entry, renderPass);
                }
                else {
                    entry.node.renderGL(renderPass);
                }
            });
        };
        World3D.prototype.postRenderGL = function (renderPass) {
            var gl = renderPass.renderer.gl;
            gl.disable(gl.DEPTH_TEST);
            gl.disable(gl.CULL_FACE);
            PopShader(renderPass);
        };
        return World3D;
    }(BaseWorld3D));

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BaseWorld3D: BaseWorld3D,
        BuildRenderList: BuildRenderList,
        CalculateTotalRenderable: CalculateTotalRenderable,
        CreateWorld3DRenderData: CreateWorld3DRenderData,
        Events: index$1,
        HasDirtyChildren: HasDirtyChildren,
        MergeRenderData: MergeRenderData,
        ResetWorld3DRenderData: ResetWorld3DRenderData,
        UpdateCachedLayers: UpdateCachedLayers,
        World3D: World3D,
        WorldDepthFirstSearch: WorldDepthFirstSearch
    });

    function GetBanner() {
        var _a = ConfigStore.get(CONFIG_DEFAULTS.BANNER), title = _a.title, version = _a.version, url = _a.url, color = _a.color, background = _a.background;
        if (title !== '') {
            var str = (version !== '') ? title + ' ' + version : title;
            console.log("%c" + str + "%c " + url, "padding: 4px 16px; color: " + color + "; background: " + background, '');
        }
    }

    function GetParent() {
        return ConfigStore.get(CONFIG_DEFAULTS.PARENT);
    }

    function GetRenderer() {
        return ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
    }

    function CreateSceneRenderData() {
        return {
            gameFrame: 0,
            numTotalFrames: 0,
            numDirtyFrames: 0,
            numDirtyCameras: 0,
            worldData: []
        };
    }

    function GetScenes() {
        return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
    }

    function ResetSceneRenderData(renderData, gameFrame) {
        if (gameFrame === void 0) { gameFrame = 0; }
        renderData.gameFrame = gameFrame;
        renderData.numTotalFrames = 0;
        renderData.numDirtyFrames = 0;
        renderData.numDirtyCameras = 0;
        renderData.worldData.length = 0;
    }

    var instance;
    var SceneManagerInstance = {
        get: function () {
            return instance;
        },
        set: function (manager) {
            instance = manager;
        }
    };

    var SceneManager = (function () {
        function SceneManager() {
            var _this = this;
            this.scenes = new Map();
            this.sceneIndex = 0;
            this.flush = false;
            this.renderResult = CreateSceneRenderData();
            this.game = GameInstance.get();
            SceneManagerInstance.set(this);
            Once(this.game, 'boot', function () { return _this.boot(); });
        }
        SceneManager.prototype.boot = function () {
            GetScenes().forEach(function (scene) { return new scene(); });
        };
        SceneManager.prototype.update = function (delta, time) {
            var e_1, _a;
            try {
                for (var _b = __values(this.scenes.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var scene = _c.value;
                    Emit(scene, 'update', delta, time);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        SceneManager.prototype.render = function (gameFrame) {
            var e_2, _a;
            var results = this.renderResult;
            ResetSceneRenderData(results, gameFrame);
            try {
                for (var _b = __values(this.scenes.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var scene = _c.value;
                    Emit(scene, 'render', results);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (this.flush) {
                results.numDirtyFrames++;
                this.flush = false;
            }
            return results;
        };
        return SceneManager;
    }());

    function SetConfigDefaults() {
        SetBackgroundColor(0);
        SetBatchSize(4096);
        SetBanner('Phaser', '4.0.0', 'https://phaser4.io');
        SetMaxTextures(0);
        SetDefaultOrigin(0.5, 0.5);
        SetSize$1(800, 600, 1);
    }

    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var settings = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                settings[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.VERSION = '4.0.0-beta1';
            _this.isBooted = false;
            _this.isPaused = false;
            _this.willUpdate = true;
            _this.willRender = true;
            _this.lastTick = 0;
            _this.elapsed = 0;
            _this.frame = 0;
            GameInstance.set(_this);
            SetConfigDefaults();
            DOMContentLoaded(function () { return _this.boot(settings); });
            return _this;
        }
        Game.prototype.boot = function (settings) {
            settings.forEach(function (setting) { return setting(); });
            var renderer = GetRenderer();
            this.renderer = new renderer();
            this.textureManager = new TextureManager();
            this.sceneManager = new SceneManager();
            var parent = GetParent();
            if (parent) {
                AddToDOM(this.renderer.canvas, parent);
            }
            this.isBooted = true;
            GetBanner();
            Emit(this, 'boot');
            this.lastTick = performance.now();
            this.step(this.lastTick);
        };
        Game.prototype.pause = function () {
            this.isPaused = true;
        };
        Game.prototype.resume = function () {
            this.isPaused = false;
            this.lastTick = performance.now();
        };
        Game.prototype.step = function (time) {
            var _this = this;
            var delta = time - this.lastTick;
            this.lastTick = time;
            this.elapsed += delta;
            if (!this.isPaused) {
                if (this.willUpdate) {
                    this.sceneManager.update(delta, time);
                    Emit(this, 'update', delta, time);
                }
                if (this.willRender) {
                    this.renderer.render(this.sceneManager.render(this.frame));
                }
            }
            this.frame++;
            GameInstance.setFrame(this.frame);
            GameInstance.setElapsed(this.elapsed);
            requestAnimationFrame(function (now) { return _this.step(now); });
        };
        Game.prototype.destroy = function () {
        };
        return Game;
    }(EventEmitter));

    function GetConfigValue(config, property, defaultValue) {
        if (Object.prototype.hasOwnProperty.call(config, property)) {
            return config[property];
        }
        else {
            return defaultValue;
        }
    }

    function Install(scene, config) {
        if (config === void 0) { config = {}; }
        var sceneManager = SceneManagerInstance.get();
        var size = sceneManager.scenes.size;
        var sceneIndex = sceneManager.sceneIndex;
        var firstScene = (size === 0);
        if (typeof config === 'string') {
            scene.key = config;
        }
        else if (config || (!config && firstScene)) {
            scene.key = GetConfigValue(config, 'key', 'scene' + sceneIndex.toString());
        }
        if (sceneManager.scenes.has(scene.key)) {
            console.warn('Scene key already in use: ' + scene.key);
        }
        else {
            sceneManager.scenes.set(scene.key, scene);
            sceneManager.flush = true;
            sceneManager.sceneIndex++;
        }
    }

    var Scene = (function () {
        function Scene(config) {
            this.game = GameInstance.get();
            this.events = new Map();
            Install(this, config);
        }
        return Scene;
    }());

    exports.Camera = index$11;
    exports.Camera3D = index$H;
    exports.Config = index$G;
    exports.DOM = index$F;
    exports.Device = index$A;
    exports.Display = index$z;
    exports.Display3D = index$y;
    exports.Events = index$x;
    exports.Game = Game;
    exports.GameObjects = index$r;
    exports.GameObjects3D = index$n;
    exports.Geom = index$h;
    exports.Geom3D = index$g;
    exports.Input = index$c;
    exports.Loader = index$a;
    exports.Materials3D = index$9;
    exports.Math = index$I;
    exports.Scene = Scene;
    exports.Textures = index$5;
    exports.Time = index$4;
    exports.WebGL1 = index$p;
    exports.World = index$2;
    exports.World3D = index;

})));
//# sourceMappingURL=Phaser.js.map
