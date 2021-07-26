import dirTree from 'directory-tree';
import fs from 'fs-extra';

const srcFolder = process.cwd() + '/src';

const filterConfig = {
    extensions: /\.ts$/,
    normalizePath: true,
    exclude: [
        /camera3d/,
        /display3d/,
        /gameobjects3d/,
        /materials3d/,
        /world3d/
    ]
};

const tree = dirTree(srcFolder, filterConfig);

const files = new Set();

const childScan = (data) => {

    if (data.type === 'directory' && data.children && data.children.length > 0)
    {
        data.children.forEach(child => childScan(child));
    }
    else if (data.type === 'file')
    {
        files.add(data.path);
    }
};

childScan(tree);

const output = [];

files.forEach(file => {

    let logFile = false;

    const data = fs.readFileSync(file, { encoding: 'utf8' });

    const lines = data.split('\n');

    lines.forEach(line => {

        if (line.startsWith('import') && !line.includes('bitecs') && !line.includes('/const'))
        {
            const packages = line.substring(line.indexOf('{') + 1, line.indexOf('}')).trim();
            const files = line.substring(line.indexOf("'") + 1, line.lastIndexOf("'")).trim();

            if (packages.includes(','))
            {
                if (!logFile)
                {
                    output.push(`\n${file}`);
                    logFile = true;
                }

                output.push(`  Multi-import: ${line}`);
            }
            else if (packages === 'gl' || files.includes(packages))
            {
                //  Yay!
                return;
            }
            else
            {
                if (!logFile)
                {
                    output.push(`\n${file}`);
                    logFile = true;
                }

                output.push(`  ERROR: ${line}`);
            }
        }

    });

});

fs.writeFileSync('import-results.txt', output.join('\n'));

console.log(`Written ${output.length} results to import-results.txt`);
