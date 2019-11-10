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
