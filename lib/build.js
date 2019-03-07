const { fork } = require('child_process');
const path = require('path');

try {
  const webpackProcess = fork(path.join(__dirname, './webpack'));
  webpackProcess.on('exit', code => process.exit(code));
} catch (error) {
  throw error;
}
