import babel from '@babel/core';
import cp from 'child_process';
import dirTree from 'directory-tree';
import esbuild from 'esbuild';
import fs from 'fs-extra';

const filterConfig = {
    extensions: /\.ts/,
    exclude: [
        /src\\stats/,
        /src\/stats/
    ]
};

const ESMInputBundle = [];

const times = [];

const startTimer = () =>
{
    times.push(Date.now());
}

const logTime = (message, skipTime = false) =>
{
    if (skipTime)
    {
        console.log(`${message})`);

        startTimer();

        return;
    }

    const startTime = times[times.length - 1];
    let duration = Date.now() - startTime;

    if (duration > 1000)
    {
        duration /= 1000;
        duration = duration.toFixed(2);

        console.log(`${message} (${duration} secs)`);
    }
    else
    {
        console.log(`${message} (${duration} ms)`);
    }

    startTimer();
}

const endLog = (message) =>
{
    let total = 0;

    for (let i = 1; i < times.length; i++)
    {
        const prev = times[ i - 1 ];
        const now = times[ i ];

        total += (now - prev);
    }

    total /= 1000;

    console.log(`${message} in ${total} secs`);
}

dirTree('src', filterConfig, (item) =>
{
    /*
    item.path: 'src\\utils\\base64\\Base64ToArrayBuffer.ts'
    item.name: 'Base64ToArrayBuffer.ts'
    item.size: 2019
    item.extension: '.ts'
    */

    //  First we need to see if this is an interface and bail out
    //  The quickest test is if the filename starts with a capital I:

    if (item.name.substring(0, 1) === 'I')
    {
        //  Now we need to actually check inside the file *sigh*
        const fileContents = fs.readFileSync(item.path, 'utf8');

        if (fileContents.includes('export interface') || fileContents.includes('export type'))
        {
            // console.log('Ignoring interface ' + item.name);
            return;
        }
    }

    ESMInputBundle.push(item.path);
});

//  Clear folder contents

startTimer();

fs.emptyDirSync('./dist');

logTime('✔ Cleared target folder');

//  Copy package.json version number to dist/package.json

const devPackage = fs.readJsonSync('./package.json');
const distPackage = fs.readJsonSync('./dist.package.json');

distPackage.version = devPackage.version;

fs.writeJsonSync('./dist/package.json', distPackage, { spaces: 4 });

//  Copy other files we need
fs.copySync('./LICENSE', './dist/LICENSE');
fs.copySync('./logo.png', './dist/logo.png');
fs.copySync('./README.dist.md', './dist/README.md');

logTime('✔ Copied dist files');

//  Run esbuild - this converts from TS into ES6 JS modules in the dist folder

const buildResults = esbuild.buildSync({
    entryPoints: ESMInputBundle,
    outdir: './dist/',
    target: 'es6',
    minify: false,
    bundle: false,
});

if (buildResults.errors.length > 0)
{
    console.log('❌ esbuild error');
    console.log(buildResults.errors);
    process.exit(1);
}

logTime(`✔ Built Phaser 4 v${distPackage.version} - ${ESMInputBundle.length} modules`);

//  ES5 Build

esbuild.buildSync({
    entryPoints: [ './dist/index.js' ],
    bundle: true,
    outfile: './dist/umd/Phaser.mjs',
});

logTime(`✔ Built Phaser.mjs ES6 Bundle`);

logTime(`+ babel.transform running (please wait, takes ages!)`, true);

const umd = babel.transformSync(
    fs.readFileSync('./dist/umd/Phaser.mjs', 'utf8'),
    {
        comments: false,
        presets: [
            [ '@babel/preset-env', { targets: "ie 11, not ie_mob 11" } ]
        ],
        plugins: [ '@babel/plugin-transform-modules-umd' ]
    }
);

fs.writeFileSync('./dist/umd/Phaser.js', umd.code);

logTime(`✔ Built Phaser.js ES5 UMD Bundle`);

esbuild.buildSync({
    entryPoints: [ './dist/umd/Phaser.js' ],
    minify: true,
    outfile: './dist/umd/Phaser.min.js',
});

logTime(`+ Building TypeScript Defs ...`, true);

//  Run tsc to generate TS defs

cp.exec('tsc --build ./tsconfig.json', (error, stdout, stderr) =>
{
    if (error)
    {
        console.log(`❌ error: ${error.message}`);
        console.log(stdout);
        process.exit(1);
    }

    if (stderr)
    {
        console.log(`❌ stderr: ${stderr}`);
        process.exit(1);
    }

    logTime('✔ TypeScript Defs complete');

    endLog('✔ Build complete');
});
