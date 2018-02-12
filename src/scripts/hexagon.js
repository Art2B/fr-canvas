export default class Hexagon {
/**
 * constructor
 * Draw a  shape from center and radius
 * @param {Object} canvas - The canvas to draw in
 * @param {number} radius - The radius of the hexagons
 */
  constructor (canvas, radius) {
    console.log('Create new hexagon')
    this.canvas = canvas
    this.radius = radius
  }

  /**
   * drawHexagon
   * Draw am hexagon from center and radius
   * @param {Object} center - The top position of the diamon
   * @param {number} center.x - the x position of the point
   * @param {number} center.y - the y position of the point
   * @param {number} sides - the number of sides of shape
   * @param {Number} diagonal - The diagonal length of the diamond
   * @param {number} adjustement - angle adjustment for shape
   */
  drawHexagon (center, sides, diagonal, adjustment = 1) {
    const ctx = this.canvas.getContext('2d')
    const step = 2 * Math.PI / sides
    const shift = (Math.PI / 180.0) * adjustment

    ctx.beginPath()

    for (let i = 0; i <= sides; i++) {
      const curStep = i * step + shift
      ctx.lineTo(center.x + diagonal * Math.cos(curStep), center.y + diagonal * Math.sin(curStep))
    }

    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  /**
   * drawRecursiveHexagons
   * Draw recursive hexagons from center to specified radius
   * @param {Object} center - center point to begin drawing diamons
   * @param {number} center.x - x position of center
   * @param {number} center.y - y position of center
   * @param {number} radius - the max radius of diamonds
   * @param {boolean} outEdges - if the outer edge of diamon should be displayed
   */
  drawRecursiveHexagons (center, radius, outEdges = true) {
    const step = 4
    const loopLimit = (outEdges) ? radius : radius - step

    for (let i = 0; i <= loopLimit; i += step) {
      this.drawHexagon(center, 6, i, 180)
    }
  }

  /**
   * draw
   * draw recursives hexagons on the all canvas to cover it
   */
  draw () {
    const innerRadius = Math.round(Math.sqrt(3) / 2 * this.radius)

    for (let y = 0; y < (this.canvas.height / innerRadius) + innerRadius; y++) {
      if (y % 2 === 0) {
        for (let x = 0; x < (this.canvas.width / this.radius); x++) {
          const xAdjusment = (x > 0) ? (2 * x) : 0
          const center = {
            x: (x * this.radius * 3) - xAdjusment,
            y: (innerRadius + 1) * y
          }
          this.drawRecursiveHexagons(center, this.radius)
        }
      } else {
        for (let x = 0; x < ((this.canvas.width - (innerRadius + this.radius)) / this.radius); x++) {
          const xAdjusment = x + 1 + (x % 2)
          const center = {
            x: ((x * this.radius * 3) + (this.radius * 1.5)) - xAdjusment,
            y: (innerRadius + 1) * y
          }
          this.drawRecursiveHexagons(center, this.radius, true)
        }
      }
    }
  }
}
