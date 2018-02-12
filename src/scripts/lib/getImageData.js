/**
 * @param {Object} img - The img to analyse
 * @param {number} img.width - width of image
 * @param {number} img.height - height of image
 * @return {Object[]} data - The data of image for each pixels
 * @return {number} data[].r - The red value of pixel
 * @return {number} data[].g - The green value of pixel
 * @return {number} data[].b - The blue value of pixel
 * @return {number} data[].q - The alpha value of pixel
 */
const getImageData = img => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  // Make human readable data
  let data = []

  for (let i = 0; i < imgData.data.length; i = i + 4) {
    let pixel = {
      r: imgData.data[i],
      g: imgData.data[i + 1],
      b: imgData.data[i + 2],
      a: imgData.data[i + 3]
    }
    data.push(pixel)
  }
  return data
}

export default getImageData
