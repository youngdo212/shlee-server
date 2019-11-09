function isValidThumbnail(thumbnail) {
  return !!thumbnail;
}

function isValidTitle(title) {
  return title !== '';
}

function isValidHeaderImage(headerImage) {
  return !!headerImage;
}

/**
 * @param {Object} formState
 * @returns {Object} Object represents validity by using boolean value
 */
export default function ({ thumbnail, title, headerImage }) {
  const validityState = {};

  validityState.thumbnail = isValidThumbnail(thumbnail);
  validityState.title = isValidTitle(title);
  validityState.headerImage = isValidHeaderImage(headerImage);

  validityState.ok = Object.values(validityState).every((validity) => validity === true);

  return validityState;
}
