# flight-recorder

[![Build 
Status](https://secure.travis-ci.org/tbrd/flight-recorder.png)](http://travis-ci.org/tbrd/flight-recorder)

A [Flight](https://github.com/twitter/flight) component for simple undo. 
Register events with flight-recorder and pass event to action to perform 
undo

## Installation

```bash
bower install --save flight-recorder
```

## Example


```javascript
this.trigger('recorder-register', {
  eventName: 'some-event'
});

this.trigger('some-event', {
  undo: {
    eventName: 'some-other-event',
    data: {
      …
    }
  }
}

this.trigger('recorder-undo'); // undo last event in history
```

## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
