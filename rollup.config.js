import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

// Can't use official TypeScript plugin because: https://github.com/rollup/plugins/issues/287 >:-(

const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];

const licenseInfo =
`/**
  * @author       Richard Davey <rich@photonstorm.com>
  * @copyright    2021 Photon Storm Ltd.
  * @license      {@link https://opensource.org/licenses/MIT|MIT License}
  */`;

export default [
    {
        //  UMD Bundle
        input: './src/index.ts',

        onwarn: (warning, next) =>
        {
            //  Because the TypeScript plugin will create d.ts files
            //  that already exist, so let's not spam the console
            //  with them.
            if (warning.code === 'FILE_NAME_CONFLICT')
            {
                return;
            }
            else
            {
                next(warning);
            }
        },

        output: [
            {
                file: './dist/umd/Phaser.js',
                format: 'umd',
                name: 'Phaser',
                sourcemap: true,
                esModule: false,
                plugins: [
                    filesize()
                ]
            },
            {
                file: './dist/umd/Phaser.min.js',
                format: 'umd',
                name: 'Phaser',
                sourcemap: false,
                esModule: false,
                plugins: [
                    terser({
                        output: {
                            preamble: licenseInfo,
                            comments: false
                        }
                    })
                ]
            }
        ],
        plugins: [

            resolve({
                extensions
            }),

            typescript({
                tsconfig: './tsconfig-umd.json'
            })

        ]
    }
];
