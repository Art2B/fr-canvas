import { mapRange } from './helpers'

/**
 * @param {Object} img - The img to analyse
 * @param {number} img.width - width of image
 * @param {number} img.height - height of image
 * @param {string} mode - The mode of the ouput. Either 'object' 'array' 
 * @return {Object[][]} data - The pixel data matrice of image
 * @return {number} data[image.width][image.height].r - The red value of pixel
 * @return {number} data[image.width][image.height].g - The green value of pixel
 * @return {number} data[image.width][image.height].b - The blue value of pixel
 * @return {number} data[image.width][image.height].q - The alpha value of pixel
 */
export default (img, mode) => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  return formatImgData(imgData, mode)
}

/**
 * @param  {Object} imgData - PIxel data from image
 * @param  {number[]} imgData.data - Pixel color and alpha value for image's pixel
 * @param  {number} imgData.width - Width of the image
 * @param  {number} imgData.height - Height of the image
 * @param  {String} mode - The node for the returned format
 * @return {Number[][][] || Object[][]}
 */
export const formatImgData = (imgData, mode) => {
  const data = Array(imgData.width).fill().map(()=>Array(imgData.height).fill())

  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      const i = (x + (imgData.width * y)) * 4

      if (mode && mode === 'array') {
        data[x][y] = [
          mapRange(imgData.data[i], 0, 255, 0, 1),
          mapRange(imgData.data[i + 1], 0, 255, 0, 1),
          mapRange(imgData.data[i + 2], 0, 255, 0, 1),
          mapRange(imgData.data[i + 3], 0, 255, 0, 1)
        ]
      } else {
        data[x][y] = {
          r: imgData.data[i],
          g: imgData.data[i + 1],
          b: imgData.data[i + 2],
          a: imgData.data[i + 3]
        }
      }
    }
  }

  return data
}