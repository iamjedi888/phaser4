const fs = require('fs-extra');
const path = require('path');
const dirTree = require('directory-tree');
const { build } = require('esbuild');
const { exec } = require('child_process');

const filterConfig = {
    extensions: /\.ts/,
    exclude: [
        /src\\stats/,
        /src\/stats/
    ]
};

const ESMInputBundle = [];

dirTree('src', filterConfig, (item) =>
{
    /*
    item structure:

    { path: 'src\\utils\\base64\\Base64ToArrayBuffer.ts',
    name: 'Base64ToArrayBuffer.ts',
    size: 2019,
    extension: '.ts',
    type: 'file' }
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

    const itemPath = path.dirname(item.path);

    //  Take the item path and put it into an array
    const parts = itemPath.split(path.sep);

    //  Remove the src\ part from the dir array (the first entry)
    parts.shift();

    //  Turn back, always use / as Rollup requires it
    const dir = parts.join('/');

    const name = item.name.substring(0, item.name.length - item.extension.length);

    const entryPoint = (dir === '') ? name : dir + '/' + name;

    ESMInputBundle.push(item.path);
    // ESMInputBundle[entryPoint] = item.path;
});

const times = [];

const startTimer = () => {

    times.push(Date.now());

}

const logTime = (message) => {

    const startTime = times[times.length - 1];
    const duration = Date.now() - startTime;

    console.log(`${message} (${duration} ms)`);

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

//  Clear folder contents

startTimer();

fs.emptyDirSync('./dist');

// const duration1 = Date.now() - start;

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

//  Run esbuild

build({
    entryPoints: ESMInputBundle,
    outdir: './dist/',
    target: 'es6',
    minify: false,
    bundle: false,
}).catch(() => {
    console.log('❌ esbuild error');
    return;
});

logTime(`✔ Built Phaser 4 v${distPackage.version} - ${ESMInputBundle.length} modules`);

//  Run tsc

exec('tsc --build ./tsconfig.json', (error, stdout, stderr) => {

    if (error) {
        console.log(`❌ error: ${error.message}`);
        console.log(stdout);
        return;
    }

    if (stderr) {
        console.log(`❌ stderr: ${stderr}`);
        return;
    }

    logTime('✔ TypeScript defs complete');

    endLog('✔ Build complete');
});
