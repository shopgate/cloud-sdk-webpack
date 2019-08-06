const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const {
  ENV, isDev, PUBLIC_FOLDER, NODE_MODULES, EXTENSIONS_PATH,
} = require('./variables');
const themes = require('./Themes');
const getDevConfig = require('./helpers/getDevConfig');
const getAppSettings = require('./helpers/getAppSettings');
const getComponentsSettings = require('./helpers/getComponentsSettings');
const getThemeConfig = require('./helpers/getThemeConfig');
const getExtensionsNodeModulesPaths = require('./helpers/getExtensionsNodeModulesPaths');
const convertLanguageToISO = require('./helpers/convertLanguageToISO');
const getThemeLanguage = require('./helpers/getThemeLanguage');
const i18n = require('./i18n');

const { sourceMap, ip, apiPort } = getDevConfig();
const appConfig = getAppSettings();
const componentsConfig = getComponentsSettings();
const themeConfig = getThemeConfig();

const t = i18n(__filename);
const isoLang = convertLanguageToISO(appConfig.language);
const themePath = themes.getPath();
const themeName = themes.getName();

/*

FILE CONTENT:
==================
1. PLUGINS
2. LOADERS
3. APP ENTRY
4. WEBPACK CONFIG

*/

/*

------ 1. PLUGINS ------

*/

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(ENV),
      APP_CONFIG: JSON.stringify(appConfig),
      COMPONENTS_CONFIG: JSON.stringify(componentsConfig),
      THEME_CONFIG: JSON.stringify(themeConfig),
      THEME: JSON.stringify(themeName),
      // @deprecated Replaced by LOCALE and LOCALE_FILE - kept for now for theme compatibility.
      LANG: JSON.stringify(isoLang),
      LOCALE: JSON.stringify(isoLang),
      LOCALE_FILE: JSON.stringify(getThemeLanguage(themes.getLanguages(), appConfig.language)),
      IP: JSON.stringify(ip),
      PORT: JSON.stringify(apiPort),
    },
  }),
  new StringReplacePlugin(),
  new HTMLWebpackPlugin({
    title: appConfig.shopName || themeName,
    filename: path.resolve(themePath, PUBLIC_FOLDER, 'index.html'),
    template: path.resolve(__dirname, 'template.ejs'),
    inject: false,
    cache: !isDev,
    minify: !isDev ? {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
    } : false,
  }),
  new ScriptExtHtmlWebpackPlugin({
    sync: ['app', 'common'],
    prefetch: /\.js$/,
    defaultAttribute: 'async',
  }),
  new webpack.LoaderOptionsPlugin({
    debug: isDev,
    options: {
      context: themePath,
      output: {
        path: path.resolve(themePath, PUBLIC_FOLDER),
      },
    },
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.HashedModuleIdsPlugin(),
  new ProgressBarWebpackPlugin({
    format: `  ${t('WEBPACK_PROGRESS', {
      bar: chalk.blue(':bar'),
      message: ':msg',
      percent: chalk.green(':percent'),
      elapsed: ':elapsed',
    })}`,
    clear: false,
  }),
];

if (!isDev) {
  plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      minRatio: 1,
    }),
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    })
  );
}

plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);

if (process.env.analyze === 'true') {
  plugins.push(new BundleAnalyzerPlugin());
}

/*

------ 2. LOADERS ------

*/

const babelLoaderConfig = {
  loader: path.resolve(NODE_MODULES, 'babel-loader'),
  options: {
    compact: true,
    comments: true,
    sourceRoot: themePath,
    cacheDirectory: true,
    extends: path.resolve(themePath, '.babelrc'),
  },
};
const stringReplaceLoader = StringReplacePlugin.replace({
  replacements: [
    {
      pattern: /__THEME_PATH__/g,
      replacement: () => JSON.stringify(themes.getPath()),
    },
    {
      pattern: /__EXTENSIONS_PATH__/g,
      replacement: () => JSON.stringify(EXTENSIONS_PATH),
    },
  ],
});

const loaders = [
  {
    test: /\.css$/,
    use: [
      path.resolve(NODE_MODULES, 'style-loader'),
      path.resolve(NODE_MODULES, 'css-loader'),
    ],
  },
  {
    test: /\.svg$/,
    use: [
      path.resolve(NODE_MODULES, 'svg-inline-loader'),
    ],
  },
  {
    test: /\.ejs$/,
    use: [path.resolve(__dirname, 'webpackConfig', 'ejsLoader')],
  },
  {
    test: /\.(js|jsx)$/,
    exclude: isDev ? [
      path.resolve(process.env.SDK_PATH),
      path.resolve(process.env.SDK_PATH, 'bin'),
      new RegExp(`node_modules\\b(?!\\${path.sep}@shopgate)\\b.*`),
    ] : undefined,
    use: [
      stringReplaceLoader,
      babelLoaderConfig,
    ].concat(isDev ? [path.resolve(NODE_MODULES, 'cache-loader')] : []),
  },
];

/*

------ 3. APP ENTRY ------

*/

const app = (() => {
  const appEntry = [
    path.resolve(NODE_MODULES, 'babel-polyfill'),
  ];

  if (!isDev) {
    appEntry.push(path.resolve(__dirname, 'webpackConfig', 'scripts', 'offline.js'));
  }

  appEntry.push(
    path.resolve(__dirname, 'webpackConfig', 'scripts', 'polyfill.js'),
    './index.jsx'
  );

  return appEntry;
})();

/*

------ 4. WEBPACK CONFIG ------

*/

const config = {
  mode: ENV,
  target: 'web',
  context: path.resolve(themePath),
  entry: {
    common: [
      path.resolve(NODE_MODULES, 'intl'),
      path.resolve(NODE_MODULES, 'intl', 'locale-data', 'jsonp', `${isoLang}.js`),
      'react',
      'react-dom',
      'lodash',
      'swiper',
      'glamor',
      'react-redux',
      'react-helmet',
      'recompose',
      'rxjs',
      'reselect',
      'gsap',
      'hammerjs',
    ],
    app,
  },
  output: {
    filename: !isDev ? '[name].[hash].js' : '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(themePath, PUBLIC_FOLDER),
    publicPath: isDev ? '/' : (process.env.publicPath || './'),
  },
  plugins,
  module: {
    rules: loaders,
  },
  externals: {
    cheerio: 'window',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: [
      './node_modules',
      `./themes/${themeName}/widgets`,
      `./themes/${themeName}/node_modules`,
      './extensions',
      ...getExtensionsNodeModulesPaths(),
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: isDev ? sourceMap : (process.env.SOURCE_MAPS || false),
  stats: isDev ? 'normal' : 'errors-only',
  performance: {
    hints: isDev ? false : 'warning',
  },
  watchOptions: {
    ignored: /node_modules\b(?!\/@shopgate)\b.*/,
  },
  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: '/',
    contentBase: path.resolve(themePath, PUBLIC_FOLDER),
    progress: true,
  },
  optimization: {
    usedExports: true,
    sideEffects: true,
    namedModules: true,
    namedChunks: true,
    nodeEnv: process.env.NODE_ENV,
    removeAvailableModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'common',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: false,
        extractComments: false,
        terserOptions: {
          ecma: 5,
          keep_fnames: false,
          mangle: true,
          sourceMap: false,
          safari10: false,
          toplevel: false,
          warnings: false,
          output: {
            comments: false,
          },
          parse: {
            shebang: false,
          },
          compress: {
            passes: 3,
            keep_fargs: false,
          },
        },
      }),
    ],
  },
};

module.exports = config;
