define('commonjs/router/transition-intent', ['exports', './utils'], function (exports, utils) {

  'use strict';

  function TransitionIntent(props) {
    this.initialize(props);

    // TODO: wat
    this.data = this.data || {};
  }

  TransitionIntent.prototype = {
    initialize: null,
    applyToState: null
  };

  exports['default'] = TransitionIntent;

});