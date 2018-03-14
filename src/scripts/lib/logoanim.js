import Hexagon from './hexagon'

export default class Logo extends Hexagon {
  /**
   * @param  {Object} canvas - canvas to render the animation in
   * @param  {Object[]} hexagons - the infos about hexagons to render
   */
  constructor (canvas, hexagons) {
    super(canvas)
    this.hexagons = hexagons
    this.animation = null
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
      this.drawHexagon(center, hexagon.size, hexagon.options)
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