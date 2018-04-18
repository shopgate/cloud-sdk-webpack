'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getDevConfig = function getDevConfig() {
  var defaultConfig = {
    ip: '127.0.0.0',
    port: 8080,
    apiPort: 9666,
    hmrPort: 3000,
    remotePort: 8000,
    sourceMap: 'cheap-module-eval-source-map'
  };

  try {
    var _JSON$parse = JSON.parse(process.env.settings),
        ip = _JSON$parse.ip,
        port = _JSON$parse.port,
        apiPort = _JSON$parse.apiPort,
        hmrPort = _JSON$parse.hmrPort,
        remotePort = _JSON$parse.remotePort,
        sourceMapsType = _JSON$parse.sourceMapsType;

    return _extends({}, defaultConfig, {
      ip: ip,
      port: port,
      apiPort: apiPort,
      hmrPort: hmrPort,
      remotePort: remotePort,
      sourceMap: sourceMapsType
    });
  } catch (e) {
    return defaultConfig;
  }
};

exports.default = getDevConfig;