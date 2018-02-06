'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _path = require('path');

var _environment = require('./environment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Themes = function () {
  function Themes() {
    _classCallCheck(this, Themes);

    this.currentTheme = null;
    this.themes = this.findThemes();
  }

  _createClass(Themes, [{
    key: 'init',
    value: function init(callback) {
      this.setCurrentTheme();
      callback();
    }
  }, {
    key: 'getCurrentTheme',
    value: function getCurrentTheme() {
      return this.currentTheme;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      return this.getCurrentTheme().path;
    }
  }, {
    key: 'getName',
    value: function getName() {
      var current = this.getCurrentTheme();

      if (!current || !current.name) {
        return process.env.theme;
      }

      return current.name;
    }
  }, {
    key: 'getLanguages',
    value: function getLanguages() {
      var current = this.getCurrentTheme();

      if (!current || !current.languages) {
        return [];
      }

      return current.languages;
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return this.getCurrentTheme().config;
    }
  }, {
    key: 'getThemes',
    value: function getThemes() {
      return this.themes;
    }
  }, {
    key: 'setCurrentTheme',
    value: function setCurrentTheme() {
      this.currentTheme = this.themes.filter(function (theme) {
        return process.env.theme === theme.name;
      })[0];
      return this;
    }
  }, {
    key: 'findThemes',
    value: function findThemes() {
      var _this = this;

      var source = (0, _path.resolve)(process.cwd() + '/themes');

      var folders = (0, _fs.readdirSync)(source).filter(function (folder) {
        return (0, _fs.lstatSync)((0, _path.join)(source, folder)).isDirectory();
      });

      return folders.map(function (name) {
        var themePath = (0, _path.join)(source, name);

        return {
          name: name,
          path: themePath,
          config: _this.findWebpackConfig(themePath),
          languages: _this.findLanguages(themePath)
        };
      });
    }
  }, {
    key: 'findLanguages',
    value: function findLanguages(themePath) {
      var localeRegex = /^[a-z]{2}-[a-z]{2}.json/i;
      var localeFolder = themePath + '/locale';
      var languages = [];

      if ((0, _fs.existsSync)(localeFolder)) {
        var files = (0, _fs.readdirSync)(localeFolder);

        languages = files.reduce(function (matches, file) {
          if (localeRegex.test(file)) {
            matches.push(file.substr(0, file.length - 5));
          }

          return matches;
        }, []);
      }

      return languages;
    }
  }, {
    key: 'findWebpackConfig',
    value: function findWebpackConfig(path) {
      var themeConfig = (0, _path.join)(path, 'webpack.config.js');

      if ((0, _fs.existsSync)(themeConfig)) {
        return themeConfig;
      }

      var configFile = _environment.isProd ? 'webpack.prod.js' : 'webpack.dev.js';

      return (0, _path.join)(__dirname, './webpackConfig/' + configFile);
    }
  }]);

  return Themes;
}();

exports.default = new Themes();