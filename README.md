# Kiwi Admin Frontend

[![Build Status](https://travis-ci.org/kiwi-suite/admin-frontend.svg?branch=master)](https://travis-ci.org/kiwi-suite/admin-frontend)

Angular 5 application that interacts with [Kiwi's Admin API](https://github.com/kiwi-suite/admin).
It is added as Composer dependency in the [Admin package](https://github.com/kiwi-suite/admin) by default to ensure API client compatibility.

Services to consume the Admin API as well as base components, directives, etc. are provided by the Kiwi Angular module included in the [ngx-admin package](https://github.com/kiwi-suite/ngx-admin).

## Features

- **Bootstrap application configuration** either externally through template (does not require build) or hard coding (requires build)
- **Ensure API version compatibility** through content negotiation for core and project features
- **Lazy loaded modules** and **AoT build** by default for increased performance
- **Mobile friendly UI** based on [Bootstrap 4](https://getbootstrap.com/docs/4.0/) and a modified variant of [CoreUI](http://coreui.io/).
- **Deploy pre-built** as is to use out of the box features
- **White labeling** by configuration

## Usage

**Pre-Built**

Directly include the `build` folder contents in your project

**Customize & Extend**

Extend the application with custom features as explained in detail below.

## Development

Kiwi's admin application can be customized by extending the feature set with custom components and building the application.

The application layout is based on a default `angular-cli` project setup to not get in the way of common Angular development workflows.

*Note:* To run and build the application please use the npm scripts defined in `package.json` instead of direct `ng` commands as described in the following sections.

### Development server

    $ npm start

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To specify the port the app should be served at (e.g. `4201` instead of the angular default `4200`) change the port in package.json or use:

    $ npm start -- --port=4201

### Update ngx-admin

To update the core library run

    $ npm i @kiwi-suite/ngx-admin

**Note:** make sure the updated library version is compatible with the current Admin API version that is used in your project.

For change requests and/or bug fixes for ngx-admin please refer to the [ngx-admin package](https://github.com/kiwi-suite/ngx-admin/issues).

### Code scaffolding

Run `ng g component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

    $ npm run build

The build artifacts will be stored in the `build/` directory. The `--prod` flag for a production build is default.

### Running unit tests

Execute the unit tests via [Karma](https://karma-runner.github.io):

    $ npm run test


### Running end-to-end tests

Execute the end-to-end tests via [Protractor](http://www.protractortest.org/):

    $ npm run e2e
