'use strict';

describeComponent('lib/flight-recorder', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  describe('recorder-register', function () {

    it('records subsequent matching events', function () {

      var spy = spyOnEvent(document, 'recorder-recorded-event');

      this.component.$node.trigger('recorder-register', {
        eventName: 'test-event'
      });

      this.component.$node.trigger('test-event', {
        test: true
      });

      expect(spy.callCount).toBe(1);
      expect(spy.mostRecentCall.data).toEqual({
        eventName: 'test-event',
        data: {
          test: true
        }
      });
    });
  });

  describe('recorder-undo', function () {

    it('triggers undo for last recorded event', function () {

      var spy1 = spyOnEvent(document, 'undo-test-event-1');
      var spy2 = spyOnEvent(document, 'undo-test-event-2');

      this.component.$node.trigger('recorder-register', {
        eventName: 'test-event'
      });

      this.component.$node.trigger('test-event', {
        test: true,
        undo: {
          eventName: 'undo-test-event-1',
          data: {
            test: false
          }
        }
      });

      this.component.$node.trigger('test-event', {
        test: true,
        undo: {
          eventName: 'undo-test-event-2',
          data: {
            test: false
          }
        }
      });

      this.component.$node.trigger('recorder-undo');

      expect(spy2.callCount).toBe(1);
      expect(spy1.callCount).toBe(0);
      expect(spy2.mostRecentCall.data).toEqual({
        test: false
      });

      this.component.$node.trigger('recorder-undo');

      expect(spy2.callCount).toBe(1);
      expect(spy1.callCount).toBe(1);
    });



    it('triggers undo up to max undo', function () {

      setupComponent({
        maxUndos: 1
      });

      var spy1 = spyOnEvent(document, 'undo-test-event-1');
      var spy2 = spyOnEvent(document, 'undo-test-event-2');

      this.component.$node.trigger('recorder-register', {
        eventName: 'test-event'
      });

      this.component.$node.trigger('test-event', {
        test: true,
        undo: {
          eventName: 'undo-test-event-1',
          data: {
            test: false
          }
        }
      });

      this.component.$node.trigger('test-event', {
        test: true,
        undo: {
          eventName: 'undo-test-event-2',
          data: {
            test: false
          }
        }
      });

      this.component.$node.trigger('recorder-undo');

      expect(spy2.callCount).toBe(1);
      expect(spy1.callCount).toBe(0);
      expect(spy2.mostRecentCall.data).toEqual({
        test: false
      });

      this.component.$node.trigger('recorder-undo');

      expect(spy2.callCount).toBe(1);
      expect(spy1.callCount).toBe(0);

    });
  });
});
