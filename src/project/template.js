export default function ({title, imageUrl, widthRatio}) {
  return `<img class="snapshot" style="width: ${widthRatio}%" src="${imageUrl}" alt="${title}">`;
};