# Phaser 4 - HTML5 Game Framework

Rebooting the Phaser universe from scratch.

This release is **not** production ready yet. Follow the Dev Logs for details on using it.

![Phaser4](logo.png)

Examples can be found in the [Phaser 4 Examples repo](https://github.com/phaserjs/dev).

Developer updates can be found on the [Phaser Patreon](https://www.patreon.com/join/photonstorm).

Get the latest release from npm:

```
npm install @phaserjs/phaser --save-dev
```

Keep updating it. It's changing multiple times per day.

You can find all packages under the [@phaserjs](https://www.npmjs.com/settings/phaserjs/packages) organization.

## npm development scripts

| script | action |
| ------ | ------ |
| `ts` | Run TypeScript to check for type errors |
| `lint` | Run ESLint across the whole src folder in fix mode |
| `build` | Build all of the Phaser 4 modules |
| `umdbuild` | Build the Phaser 4 UMD Bundle |

## VS Code Extensions

If you wish to help with development of Phaser, the following VS Code Extensions are useful:

* [Document This](https://github.com/joelday/vscode-docthis)
* [EditorConfig for VS Code](https://github.com/editorconfig/editorconfig-vscode)
* [ESLint](https://github.com/Microsoft/vscode-eslint)
* [sort-imports](https://github.com/amatiasq/vsc-sort-imports)

## Admin only npm scripts

| script | action |
| ------ | ------ |
| `testdist` | Increment version by patch, run a build but **do not** publish to npm |
| `dist` | Increment version by patch, run a build then publish to npm |
| `distminor` | Increment version by minor, run a build then publish to npm |
| `distmajor` | Increment version by major, run a build then publish to npm |
