# WhosNext - P2P Web Extension

## Summary & Motivation
This web extension was thought to make your calls easier, more fluent and
productive without the overhead of thinking about that.

Working on a scrum basis you several times are wondering who will be the next
mate to share the updates with the team. It can be an embarassing moment or even
a time loss.

WhosNext tries to minimize this overhead during
[Hangouts Meet](https://gsuite.google.com/products/meet/) calls by providing
you the next speaker as well as showing who already spoke in case you came a
few minutes later to the party.

## How does it work?
TBD

#
## Developing & Contributing

```bash
$ yarn install
$ yarn run build:dev
```

#### `yarn run build`

Build the extension into `dist` folder for **production**.

#### `yarn run build:dev`

Build the extension into `dist` folder for **development**.

#### `yarn run watch`

Watch for modifications then run `yarn run build`.

#### `yarn run watch:dev`

Watch for modifications then run `yarn run build:dev`.

It also enable [Hot Module Reloading](https://webpack.js.org/concepts/hot-module-replacement), thanks to [webpack-chrome-extension-reloader](https://github.com/rubenspgcavalcante/webpack-chrome-extension-reloader) plugin.

:warning: Keep in mind that HMR only works for your **background** entry.

#### `yarn run build-zip`

Build a zip file following this format `<name>-v<version>.zip`, by reading `name` and `version` from `manifest.json` file.
Zip file is located in `dist-zip` folder.

#
### Contributing

All contributions or issue reporting are welcomed. If you are filing a bug please include information to help debug it!

If you plan to contribute, please make sure you test the code.

#
## Credits

Icon made by Freepik from www.flaticon.com is licensed by CC 3.0 BY
