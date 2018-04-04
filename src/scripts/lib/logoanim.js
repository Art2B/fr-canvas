import Hexagon from './hexagon'

export default class Logo {
  /**
   * @param  {Object} canvas - canvas to render the animation in
   * @param  {Object[]} hexagons - the infos about hexagons to render
   */
  constructor (canvas, hexagons) {
    this.canvas = canvas
    this.hexagons = hexagons
    this.animation = null
  }

  /**
   * drawHexagon`- Simple stroked hexagon
   * Draw am hexagon from center and radius
   * @param {Object} center - center of the hexagon
   * @param {number} center.x - the x position of the point
   * @param {number} center.y - the y position of the point
   * @param {Object} options - Options for hexagon drawing
   * @param {Number} options.radius - The radius of the hexagon
   * @param {number} options.adjustment - Adjust hexagon rotation angle
   * @param {string} options.color - The color to draw the hexagon in
   * @param {number} options.lineWidth - The lineWidth of the hexagon 
   */
  drawHexagon (
    center = {
      x: 0,
      y: 0
    }, {
      radius = 0,
      adjustment = 1,
      color = '#000000',
      lineWidth = 1
    } = {}
  ) {
    const ctx = this.canvas.getContext('2d')
    const step = Math.PI / 3
    const shift = (Math.PI / 180.0) * adjustment

    ctx.beginPath()

    for (let i = 0; i <= 6; i++) {
      const curStep = i * step + shift
      ctx.lineTo(center.x + radius * Math.cos(curStep), center.y + radius * Math.sin(curStep))
    }

    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }

  /**
   * Update position and rotation of hexagons
   */
  updateHexagonsState () {
    this.hexagons.map(hexagon => {
      if (hexagon.options.adjustment >= 360) {
        hexagon.options.adjustment = 0
      } else {
        hexagon.options.adjustment += hexagon.step
      }
      return hexagon
    })
  }

  /**
   * Draw current state of hexagons inside canvas
   */
  draw () {
    const center = {
      x: this.canvas.width/2,
      y: this.canvas.height/2
    }

    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.hexagons.forEach(hexagon => {
      this.drawHexagon(center, hexagon.options)
    });
  }

  /**
   * Animate - call this.draw on each render frame
   */
  animate () {
    this.animation = requestAnimationFrame(() => {
      this.updateHexagonsState()
      this.draw()
      this.animate()
    })
  }

  /**
   * Stop the animation
   */
  stop () {
    cancelAnimationFrame(this.animation)
  }
}