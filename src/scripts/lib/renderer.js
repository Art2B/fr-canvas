import GPU from 'gpu.js'

import getImageData, { formatImgData, getProcessedImage } from './../helpers/getImageData'
import Hexagon from './hexagon'

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
    this.hexa = new Hexagon(canvas, image, {
      adjustment: 90
    })
  }

  /**
   * Update the rendered image
   * @param  {Object} - The new image
   */
  updateImage (image) {
    this.clear()
    this.image = image
    this.canvas.width = image.width
    this.canvas.height = image.height
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
  }

  /**
   * draw canvas
   */
  draw () {
    this.hexa.draw()
  }
}
