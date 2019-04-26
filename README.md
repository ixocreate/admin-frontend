# IXOCREATE Admin Frontend Application

[![Packagist](https://img.shields.io/packagist/v/ixocreate/admin-frontend.svg)](https://packagist.org/packages/ixocreate/admin-frontend)
[![License](https://img.shields.io/github/license/ixocreate/admin-frontend.svg)](LICENSE)

Angular application that interacts with [IXOCREATE's Admin API](https://github.com/ixocreate/admin-package).
It is added as Composer dependency in the [Admin package](https://github.com/ixocreate/admin-package) by default to ensure API client compatibility.

## Features

- **Bootstrap application configuration** either externally through template (does not require build) or hard coding (requires build)
- **Ensure API version compatibility** through content negotiation for core and project features
- **Lazy loaded modules** and **AoT build** by default for increased performance
- **Mobile friendly UI** based on [Bootstrap 4](https://getbootstrap.com/docs/4.0/) and a modified variant of [CoreUI](http://coreui.io/).
- **Deploy pre-built** as is to use out of the box features
- **White labeling** by configuration

## Installation

Install the package via composer:

```sh
composer require ixocreate/admin-frontend
```

## Usage

**Pre-Built**

Directly include the `build` folder contents in your project

**Customize & Extend**

Extend the application with custom features as explained in detail below.

## Development

IXOCREATE's admin application can be customized by extending the feature set with custom components and building the application.

The application layout is based on a default `angular-cli` project setup to not get in the way of common Angular development workflows.

*Note:* To run and build the application please use the npm scripts defined in `package.json` instead of direct `ng` commands as described in the following sections.

### Development server

    $ yarn run serve

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To specify the port the app should be served at (e.g. `4201` instead of the angular default `4200`) change the port in package.json or use:

    $ yarn run serve --port=4201

### Update ngx-admin

To update the core library run

    $ yarn install @ixocreate/ngx-admin

**Note:** make sure the updated library version is compatible with the current Admin API version that is used in your project.

For change requests and/or bug fixes for ngx-admin please refer to the [ngx-admin package](https://github.com/ixocreate/ngx-admin/issues).

### Code scaffolding

Run `ng g component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

    $ yarn run build

The build artifacts will be stored in the `build/` directory. The `--prod` flag for a production build is default.

### Running unit tests

Execute the unit tests via [Karma](https://karma-runner.github.io):

    $ yarn run test


### Running end-to-end tests

Execute the end-to-end tests via [Protractor](http://www.protractortest.org/):

    $ yarn run e2e

## Documentation

Learn more about IXOCREATE by reading its [Documentation](https://ixocreate.github.io/).

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Security Vulnerabilities

If you discover security vulnerabilities, please address issues directly to opensource@ixocreate.com via e-mail.

## License

The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.
