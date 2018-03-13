function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

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
export default (img, mode = 'object') => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  return formatImgData(imgData, {
    width: img.width,
    height: img.height
  }, mode)
}

export const formatImgData = (imgData, size, mode = 'object') => {
  const data = Array(size.width).fill().map(()=>Array(size.height).fill())

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const i = (x + (size.width * y)) * 4

      if (mode === 'object') {
        data[x][y] = {
          r: imgData.data[i],
          g: imgData.data[i + 1],
          b: imgData.data[i + 2],
          a: imgData.data[i + 3]
        }
      } else if (mode === 'array') {
        data[x][y] = [
          map_range(imgData.data[i], 0, 255, 0, 1),
          map_range(imgData.data[i + 1], 0, 255, 0, 1),
          map_range(imgData.data[i + 2], 0, 255, 0, 1),
          map_range(imgData.data[i + 3], 0, 255, 0, 1)
        ]
      }

    }
  }

  return data
}