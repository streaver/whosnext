# WhosNext - Real time web extension with Vue

<p align="center">
  <img src="https://user-images.githubusercontent.com/11605133/54558953-b365d800-499d-11e9-8359-154795087344.png" height="150px">
  <h2 align="center">Optimizing remote meetings with a real time Vue web extension.</h2>
</p>

<p align="center" style="font-size: 16px;">
  <strong>Warning:</strong> Hangouts meet's DOM changes often, we can't ensure
  it'll work as expected 100% of the time, so please create a new issue or open
   a PR to fix it. 🙏
<p>

#
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
Take a look to the demo video to witness a real scenario and understand how to use it.

<div style="width: 500px; margin-top: 25px; text-align: center;">

  [![Watch the video](https://user-images.githubusercontent.com/11605133/55350912-816f6e00-5493-11e9-9903-bcf1cbe07562.png)](https://youtu.be/lmBxu3J7y7Q)
</div>

This is an overview of the architecture. A more detailed version will be published asap.

<img src="https://user-images.githubusercontent.com/11605133/55337706-93421880-5475-11e9-8991-79aa12437843.png">

### ⚠️️ Notes

1. Be aware that in order to get the extension running correcly, all participants
in the meeting must have it installed, otherwise those participants won't be
taken into account by the extension.

2. Please check out the `.env.example` file to setup your firebase environment.


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
