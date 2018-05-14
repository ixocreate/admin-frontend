# kiwi ngx-admin

Base providers and components for the [Kiwi Admin Frontend](https://github.com/kiwi-suite/admin-frontend).

This is an Angular 5 library, implementing the
[Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).

Based on [cyrilletuzi/angular-quickstart-lib](https://github.com/cyrilletuzi/angular-quickstart-lib)

## Tasks

Common tasks are present as npm scripts:

- `npm start` to run a live-reload server with the demo app
- `npm run test` to test in watch mode, or `npm run test:once` to only run once
- `npm run build` to build the library
- `npm run lint` to lint 
- `npm run clean` to clean
- `npm run integration` to run the integration e2e tests
- `npm install ./relative/path/to/lib` after `npm run build` to test locally in another app

If you need to debug the integration app, please check `./integration/README.md`.

## Demo

Even though [AOT](#appendix-supporting-aot)
is preferred, [Just-in-time](#appendix-supporting-jit) compilation should be supported.

Make sure you have at least Node 6.9 and NPM 3.0 installed.
Then ...

1. Install npm packages.
1. Run `npm start` to launch the sample application.
