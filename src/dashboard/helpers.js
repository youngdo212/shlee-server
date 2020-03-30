export async function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      resolve(result);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * @param {Object} formState
 */
export function createFormData(formState) {
  const formData = new FormData();

  Object.entries(formState).forEach(([name, value]) => {
    if (Array.isArray(value)) {
      value.forEach((eachValue) => {
        formData.append(name, eachValue);
      });
    } else {
      formData.append(name, value);
    }
  });

  return formData;
}
/**
 * @param {Object} target
 * @param {Object} source
 * @returns new object only including target properies
 */
export function assignObject(target, source) {
  const newObject = {};

  Object.keys(target).forEach((property) => {
    const has = Object.prototype.hasOwnProperty;
    newObject[property] = has.call(source, property) ? source[property] : target[property];
  });

  return newObject;
}

/**
 * Moves array element to new index
 *
 * @param {Array} targetArray
 * @param {Number} oldIndex
 * @param {Number} newIndex
 * @returns {Array}
 */
export function moveArrayElement(targetArray, oldIndex, newIndex) {
  const element = targetArray[oldIndex];
  const newArray = targetArray.filter((e, index) => index !== oldIndex);

  newArray.splice(newIndex, 0, element);

  return newArray;
}
