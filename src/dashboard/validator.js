function isValidThumbnail(thumbnail) {
  return !!thumbnail;
}

function isValidTitle(title) {
  return title !== '';
}

function isValidHeaderImage(headerImage) {
  return !!headerImage;
}

function isValidSnapshotColumn(snapshotColumn) {
  const getConstructor = (input) => (input !== null && typeof input !== 'undefined' ? input.constructor : null);
  const isNumber = (input) => getConstructor(input) === Number && !Number.isNaN(input);
  const target = parseInt(snapshotColumn, 10);

  return isNumber(target) && (target > 0);
}

/**
 * @param {Object} formState
 * @returns {Object} Object represents validity by using boolean value
 */
export default function ({
  thumbnail, title, headerImage, snapshotColumn,
}) {
  const validityState = {};

  validityState.thumbnail = isValidThumbnail(thumbnail);
  validityState.title = isValidTitle(title);
  validityState.headerImage = isValidHeaderImage(headerImage);
  validityState.snapshotColumn = isValidSnapshotColumn(snapshotColumn);

  validityState.ok = Object.values(validityState).every((validity) => validity === true);

  return validityState;
}
