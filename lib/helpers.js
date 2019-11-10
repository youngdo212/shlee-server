const fs = require('fs');

/**
 * @param {String[]} paths
 * @param {Function(Error|null)} callback
 */
exports.deleteFiles = function deleteFiles(paths, callback) {
  if (!paths.length) return callback(null);

  fs.unlink(paths[0], () => {
    deleteFiles(paths.slice(1), callback);
  });
};
