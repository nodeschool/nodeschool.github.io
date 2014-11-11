nodeschool.github.io
====================

http://nodeschool.io/ internet web page

Please fork it and send us improvements! Read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for more details on how to send a great PR.

**If you are an owner on the nodeschool/Owners team** please do not edit this repo directly but instead send your contributions as pull requests.

We ask that you make pull requests because changes to this repository will get deployed onto the live production site immediately and it's best if you get feedback on your pull request first before it goes live.

## Running the app locally

This is a static site, simply open `index.html` or use your favorite static file server to run local server.

You can also use the included development static server by running the following commands:

```
npm install
npm start
```

## Stickers, Badges and whatnots

These are in the `/images` directory, feel free to use for your events. In `images/make-a-sticker` there is a template for making a sticker too. Woop.

## Translations

If you would like to translate the nodeschool site into another language please make a pull request adding `languages/<language code>.json`.

To generate a new language file template automatically, run the following commands inside a clone of this repository:

```
npm install
npm run language
```

This will prompt you to enter a language code and will generate your language file in the `languages/` folder with English placeholder text. Now just translate each line. You should also add your language to the `languages/languages.json` list.

When picking your language code, please use the correct code from the first column of this spreadsheet: http://en.wikiversity.org/wiki/ISO_639-1_language_matrix

The way translations are implemented is using 100% client-side javascript. When the page is loaded the users browser locale is detected (using [browser-locale](http://npmjs.org/browser-locale)) and a XHR request is made to the `languages` folder to try and fetch a JSON translation file for that locale. First we check for the full 5 character locale file (e.g. `en-us`) and if that doesn't exist we fallback to the 2 character version (`en`) and if that doesn't exist we just do nothing and show the default English version.

Translation files are a mapping of translations IDs to the translated strings. There is a separate file called `languages/selectors.json` which maps CSS selectors in markup to the translation IDs.

The good things about this approach:

- The site remains a static site. This means that contributing to the site is really easy as the entire site is just flat HTML, CSS, JS and JSON files
- When PRs get merged they are immediately deployed live to GitHub pages. This makes maintainence really nice as there is no manual deploy step.

The drawbacks of this approach:

- Only the English (default) version is indexed by search engines
- The English version briefly appears on page loads before the translated version is swapped in
