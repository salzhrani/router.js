define('commonjs/router/handler-info/factory', ['exports', 'router/handler-info/resolved-handler-info', 'router/handler-info/unresolved-handler-info-by-object', 'router/handler-info/unresolved-handler-info-by-param'], function (exports, ResolvedHandlerInfo, UnresolvedHandlerInfoByObject, UnresolvedHandlerInfoByParam) {

  'use strict';

  handlerInfoFactory.klasses = {
    resolved: ResolvedHandlerInfo['default'],
    param: UnresolvedHandlerInfoByParam['default'],
    object: UnresolvedHandlerInfoByObject['default']
  };

  function handlerInfoFactory(name, props) {
    var Ctor = handlerInfoFactory.klasses[name],
        handlerInfo = new Ctor(props || {});
    handlerInfo.factory = handlerInfoFactory;
    return handlerInfo;
  }

  exports['default'] = handlerInfoFactory;

});