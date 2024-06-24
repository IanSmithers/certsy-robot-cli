[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

# Robot CLI

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background

This is an implementation of a REPL CLI that controls a robot navigating a surface. The robot can accept certain commands and operates within certain boundaries.

The goals for this repository were to demonstrate good code knowledge and practices.

1. Contains production quality code.
2. Demonstrates good OO and functional programming practices.
3. Incorporates a solid testing approach.
4. Displays code that has well thought out naming.
5. Has solid error handling.
6. Is easily extensible and maintainable.
7. Has good design from a software engineering perspective.
8. Displays separation of concerns.
9. Breaks code down into sensible files and modules.
10. Uses best practices/idioms when it comes to language, testing etc.
11. Has an appropriate use of tools and frameworks.

The project was built with the following packages.

- typescript
- node
- jest
- babel
- bandersnatch

Additionally for development runtime execution it uses `ts-node` and `ts-jest`.

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

After cloning this repository simply run:

```sh
$ npm install
```

## Usage

This repository has two main parts that can be executed:
1. CLI
2. Tests

### CLI

To run the CLI:

```sh
ts-node ./src/index.ts
```

#### Issuing Commands

The CLI will accept the following (case-sensitive) commands:

- PLACE X,Y,F
- MOVE
- LEFT
- RIGHT
- REPORT

### Testing

To run the tests:

```sh
npm t
```

#### Test Coverage

There are test coverage results which will be generated in the `tests/coverage` area as well as be printed to the terminal once tests finishing running.
You can view an HTML test coverage report from `tests/coverage/lcov-report/index.html`.

## Maintainers

[@IanSmithers](https://github.com/IanSmithers).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/IanSmithers/certsy-robot-cli/issues/new)

## License

[MIT](LICENSE) © Ian Smithers