define('commonjs/router/transition-intent/url-transition-intent', ['exports', '../transition-intent', '../transition-state', '../handler-info/factory', '../utils'], function (exports, TransitionIntent, TransitionState, handlerInfoFactory, utils) {

  'use strict';

  exports['default'] = utils.subclass(TransitionIntent['default'], {
    url: null,

    initialize: function(props) {
      this.url = props.url;
    },

    applyToState: function(oldState, recognizer, getHandler) {
      var newState = new TransitionState['default']();

      var results = recognizer.recognize(this.url),
          queryParams = {},
          i, len;

      if (!results) {
        throw new UnrecognizedURLError(this.url);
      }

      var statesDiffer = false;

      for (i = 0, len = results.length; i < len; ++i) {
        var result = results[i];
        var name = result.handler;
        var handler = getHandler(name);

        if (handler.inaccessibleByURL) {
          throw new UnrecognizedURLError(this.url);
        }

        var newHandlerInfo = handlerInfoFactory['default']('param', {
          name: name,
          handler: handler,
          params: result.params
        });

        var oldHandlerInfo = oldState.handlerInfos[i];
        if (statesDiffer || newHandlerInfo.shouldSupercede(oldHandlerInfo)) {
          statesDiffer = true;
          newState.handlerInfos[i] = newHandlerInfo;
        } else {
          newState.handlerInfos[i] = oldHandlerInfo;
        }
      }

      utils.merge(newState.queryParams, results.queryParams);

      return newState;
    }
  });

  /**
    Promise reject reasons passed to promise rejection
    handlers for failed transitions.
   */
  function UnrecognizedURLError(message) {
    this.message = (message || "UnrecognizedURLError");
    this.name = "UnrecognizedURLError";
  }

});