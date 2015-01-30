define('commonjs/router/handler-info/resolved-handler-info', ['exports', '../handler-info', 'router/utils', 'rsvp/promise'], function (exports, HandlerInfo, utils, Promise) {

  'use strict';

  var ResolvedHandlerInfo = utils.subclass(HandlerInfo['default'], {
    resolve: function(shouldContinue, payload) {
      // A ResolvedHandlerInfo just resolved with itself.
      if (payload && payload.resolvedModels) {
        payload.resolvedModels[this.name] = this.context;
      }
      return Promise['default'].resolve(this, this.promiseLabel("Resolve"));
    },

    getUnresolved: function() {
      return this.factory('param', {
        name: this.name,
        handler: this.handler,
        params: this.params
      });
    },

    isResolved: true
  });

  exports['default'] = ResolvedHandlerInfo;

});