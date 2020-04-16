/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
/**
 * Subtract an `amount` from `value`, limiting the minimum result to `min`.
 *
 * @function Phaser.Math.MinSub
 * @since 3.0.0
 *
 * @param {number} value - The value to subtract from.
 * @param {number} amount - The amount to subtract.
 * @param {number} min - The minimum value to return.
 *
 * @return {number} The resulting value.
 */
export default function MinSub(value, amount, min) {
    return Math.max(value - amount, min);
}
//# sourceMappingURL=MinSub.js.map