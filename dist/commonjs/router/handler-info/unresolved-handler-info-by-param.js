define('commonjs/router/handler-info/unresolved-handler-info-by-param', ['exports', '../handler-info', 'router/utils'], function (exports, HandlerInfo, utils) {

  'use strict';

  var UnresolvedHandlerInfoByParam = utils.subclass (HandlerInfo['default'], {
    initialize: function(props) {
      this.params = props.params || {};
    },

    getModel: function(payload) {
      var fullParams = this.params;
      if (payload && payload.queryParams) {
        fullParams = {};
        utils.merge(fullParams, this.params);
        fullParams.queryParams = payload.queryParams;
      }

      var handler = this.handler;
      var hookName = utils.resolveHook(handler, 'deserialize') ||
                     utils.resolveHook(handler, 'model');

      return this.runSharedModelHook(payload, hookName, [fullParams]);
    }
  });

  exports['default'] = UnresolvedHandlerInfoByParam;

});