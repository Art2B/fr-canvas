import GPU from 'gpu.js'

import getImageData, { formatImgData } from './../helpers/getImageData'
import hexagon from './hexagon'

export default class Renderer {
/**
 * @param {Object} canvas - The canvas to draw in
 * @param {Object} img - The image to draw
 */
  constructor (canvas, image) {
    this.canvas = canvas
    this.canvas.width = image.width
    this.canvas.height = image.height
    this.image = image
    this.imageData = getImageData(image)
    this.maskData = this.getMaskData(image)
  }

  /**
   * @param  {Object} size - Size of the mask
   * @param  {number} size.width- Width of the mask
   * @param  {number} size.height- Height of the mask
   * @return {number[][][]} The mask pixel data
   */
  getMaskData (size) {
    const map = document.createElement('canvas')
    map.width = size.width
    map.height =size.height
    const mapHexa = new hexagon(map)
    mapHexa.draw()
    return formatImgData(map.getContext('2d').getImageData(0, 0, map.width, map.height))
  }

  /**
   * Update the rendered image
   * @param  {Object} - The new image
   */
  updateImage (image) {
    this.clear()
    this.image = image
    this.imageData = getImageData(image)
    this.canvas.width = image.width
    this.canvas.height = image.height
    this.maskData = this.getMaskData(image)
  }

  /**
   * Clear the canvas and image related variables
   */
  clear () {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.canvas.removeAttribute('width')
    this.canvas.removeAttribute('height')
    this.image = null
    this.imageData = null
    this.maskData = null
  }

  /**
   * Where the magic happen :)
   * @return {Object} HTML canvas
   */
  getCanvasToRender () {
    const gpu = new GPU()
    const render = gpu.createKernel(function(imageData, maskData) {
      const yPos = this.constants.height - this.thread.y - 1
      let pixelGrey = 1
      const redPercent = 0.21
      const greenPercent = 0.72
      const bluePercent = 0.07

      if (maskData[this.thread.x][yPos][3] === 0) {
        pixelGrey = (
          (imageData[this.thread.x][yPos][0] * redPercent)
        + (imageData[this.thread.x][yPos][1] * greenPercent)
        + (imageData[this.thread.x][yPos][2] * bluePercent)
        )
      }

      this.color(pixelGrey, pixelGrey, pixelGrey, 1)
    }, {
      constants: {
        width: this.image.width,
        height: this.image.height
      },
      graphical: true,
      output: [this.image.width, this.image.height]
    })

    render(this.imageData, this.maskData)
    return render.getCanvas()
  }

  /**
   * draw canvas
   */
  draw () {
    const ctx = this.canvas.getContext('2d')
    ctx.drawImage(this.getCanvasToRender(), 0, 0)
  }
}
