export async function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      resolve(result);
    };
    reader.readAsDataURL(file);
  });
}

export function any() {
  return 'test';
}
