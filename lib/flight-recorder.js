define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(recorder);

  /**
   * Module function
   */

  function recorder() {
    this.defaultAttrs({
      maxUndos: 0 // infinite
    });

    this.after('initialize', function () {
      this.history = [];
      this.on('recorder-register', this.handleRecorderRegister);
      this.on('recorder-undo', this.handleRecorderUndo);
    });

    this.handleRecorderRegister = function (e, data) {
      this.on(data.eventName, this.handleRegisteredEvent);
    };

    this.handleRegisteredEvent = function (e, data) {
      var event = {
        eventName: e.type,
        data: data,
        undo: data.undo
      };

      this.history.push(event);

      if (this.attr.maxUndos > 0 && this.history.length > this.attr.maxUndos) {
        this.history.shift();
      }

      this.trigger('recorder-recorded-event', event);
    };

    this.handleRecorderUndo = function (e, data) {
      var event = this.history.pop();
      if (event) {
        this.trigger(event.undo.eventName, event.undo.data);
      }
    };

  }

});
