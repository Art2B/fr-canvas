import paper from 'paper'

export default class Hexagon {
/**
 * constructor
 * Draw a  shape from center and radius
 * @param {Object} canvas - The canvas to draw in
 * @param {number} radius - The radius of the hexagons
 * @param {Object} options - Options for hexagons drawing
 */
  constructor (canvas, image, {
    radius = 80,
    step = 8,
    adjustment = 1
  } = {}) {
    this.canvas = canvas
    this.image = image
    // Options values
    this.radius = radius
    this.step = step
    this.adjustment = adjustment

    this.project = new paper.Project(canvas)
    this.raster = new paper.Raster(image)
    this.raster.visible = false
    this.raster.fitBounds(this.project.view.bounds)
  }

  /**
   * drawHexagon`- Simple stroked hexagon
   * Draw am hexagon from center and radius
   * @param {Object} center - center of the hexagon
   * @param {number} center.x - the x position of the point
   * @param {number} center.y - the y position of the point
   * @param {Number} radius - The radius of the hexagon
   * @param {Object} options - Options for hexagon display
   * @param {number} options.adjustment - Adjust hexagon rotation angle
   * @param {string} options.color - The color to draw the hexagon in
   * @param {number} options.lineWidth - The lineWidth of the hexagon 
   */
  drawHexagon (center, radius, {
    adjustment = this.adjustment,
    color = '#FFFFFF',
    lineWidth = 1
  } = {}) {
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
   * [getHexagonAnglesPosition get array of paper.Point for each hexagon angles
   * @param  {Object} center Center point coordinates
   * @param  {number} center.x  x position of center
   * @param  {number} center.y  y position of center
   * @param  {number} radius radius of hexagon
   * @return {[type]}          [description]
   */
  getHexagonAnglesPosition (
    center = {
      x: 0,
      y: 0
    },
    radius = this.radius,
    adjustment = this.adjustment
  ) {
    const step = Math.PI / 3
    const shift = (Math.PI / 180.0) * adjustment

    return Array.apply(null, Array(6)).map((el, index) => {
      const curStep = index * step + shift
      return new paper.Point(
        center.x + radius * Math.cos(curStep),
        center.y + radius * Math.sin(curStep)
      )
    })
  }

  /**
   * drawRasterBasedHexagon - Draw stroke fluid hexagons based on raster color
   * @param  {Object} center - Hexagon center position
   * @param  {number} center.x - x center position
   * @param  {number} center.y - y center positionb
   * @param  {number} radius - Radius of the hexagon
   * @param  {String} options.color - color to draw the stroke in
   */
  drawRasterBasedHexagon (
    center = {
      x: 0,
      y: 0
    }, 
    radius = this.radius,
    {
      color = '#000000'
    } = {}
  ) {
    const path = new paper.Path({
      closed: true
    })
    const anglesPoints = this.getHexagonAnglesPosition(center, radius)

    anglesPoints.forEach((point, index) => {
      // Hide certain outer part of hexagon so line don't lap
      if (radius > this.radius && index > 3) {
        return
      }

      const nextPoint = (index < (anglesPoints.length - 1)) ? anglesPoints[index + 1] : anglesPoints[0]
      const hiddenSide = new paper.Path()
      hiddenSide.add(point)
      hiddenSide.add(nextPoint)

      const side = new paper.Path({
        fillColor: color,
        closed: true
      })

      for (let i = 0; i <= 10; i++) {
        const offset = Math.floor((hiddenSide.length / 10)) * i
        const offsetPoint = hiddenSide.getPointAt(offset)

        const deltaOffset = (i < 10) ? Math.floor((hiddenSide.length / 10)) * (i + 1) : Math.floor((hiddenSide.length / 10) * (i - 1))
        const delta = hiddenSide.getPointAt(deltaOffset).rotate(90, offsetPoint).subtract(offsetPoint)

        const color = this.raster.getAverageColor(offsetPoint)
        const value = color ? (1 - color.gray) * 2.7 : 0
        delta.length = Math.max(value, 0.2)

        const top = offsetPoint.add(delta)
        const bottom = offsetPoint.subtract(delta)

        side.add(top)
        side.insert(0, bottom)
        side.smooth()
      }

      path.addSegments(side.segments)
    })
  }

  /**
   * drawRecursiveHexagons - draw concentric raster based hexagons
   * Draw recursive hexagons from center to specified radius
   * @param {Object} center - center point to begin drawing diamons
   * @param {number} center.x - x position of center
   * @param {number} center.y - y position of center
   * @param {number} radius - the max radius of hexagons
   */
  drawRecursiveHexagons (center, radius = this.radius) {
    for (let i = 1; i <= (radius + 1); i += this.step) {
      this.drawRasterBasedHexagon(center, i)
    }
  }

  /**
   * draw
   * draw recursives hexagons on the all canvas to cover it
   */
  draw () {
    const innerRadius = Math.round(Math.sqrt(3) / 2 * this.radius)
    const ctx = this.canvas.getContext('2d')
    const xStep = Math.sqrt( Math.pow(this.radius, 2) - Math.pow((this.radius / 2), 2)) * 2

    // this.canvas.height
    for (let y = 0; y < this.canvas.height; y += (this.radius * 1.5)) {
      const xOffset = (y % this.radius) ? xStep/2 : 0
      for (let x = 0; x < this.canvas.width; x += xStep) {
        this.drawRecursiveHexagons({
          x: xOffset + x,
          y: y
        }, this.radius)
      }
    }
  }
}
