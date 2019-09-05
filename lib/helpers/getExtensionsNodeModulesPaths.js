const fs = require('fs');
const path = require('path');
const { EXTENSIONS_PATH } = require('../variables');
const logger = require('../logger');
const i18n = require('../i18n');

const t = i18n(__filename);

let extensions = {};

try {
  extensions = JSON.parse(process.env.extensions);
} catch (error) {
  // eslint-disable-next-line prefer-template
  logger.log('  ' + t('NO_EXTENSIONS_ATTACHED') + '\n');
}

/**
 * Returns the node modules paths to all extensions.
 * @return {Array}
 */
module.exports = function getExtensionsNodeModulePaths() {
  const paths = [];

  Object.keys(extensions).forEach((key) => {
    const extension = extensions[key];
    const fePathRelative = path.resolve(
      EXTENSIONS_PATH,
      extension.path,
      'frontend',
      'node_modules'
    );
    const frontendPath = `./${path.relative(process.cwd(), fePathRelative)}`;

    if (fs.existsSync(frontendPath)) {
      paths.push(frontendPath);
      return;
    }

    const exPathRelative = path.resolve(EXTENSIONS_PATH, extension.path, 'node_modules');
    paths.push(`./${path.relative(process.cwd(), exPathRelative)}`);
  });

  return paths;
};
