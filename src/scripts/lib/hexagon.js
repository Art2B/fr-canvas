import paper from 'paper'

export default class Hexagon {
/**
 * constructor
 * Draw a  shape from center and radius
 * @param {Object} canvas - The canvas to draw in
 * @param {number} radius - The radius of the hexagons
 * @param {Object} options - Options for hexagons drawing
 */
  constructor (canvas, image, options = {}) {
    this.canvas = canvas
    this.image = image
    this.project = new paper.Project(canvas)

    this.raster = new paper.Raster(image)
    this.raster.visible = false
    this.raster.fitBounds(this.project.view.bounds)

    this.options = Object.assign({
      radius: 80,
      stepGap: 8,
      adjustment: 1,
      color: '#000000',
      lineThicknessRatio: 2.7,
      minLineThickness: 0.2,
      sideNbStep: 20,
      minRadius: 5
    }, options)
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
    }, {
      radius = this.options.radius,
      adjustment = this.options.adjustment
    }
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
   * [getSidePath get a side path]
   * @param  {paper.Point} startPoint    - Starting point of side
   * @param  {paper.Point} endPoint      - Endpoint of side
   * @param  {String} options.color - color to fill the side with
   * @return {paper.Path} Hexagon Side
   */
  getSidePath (startPoint, endPoint, {
    color = this.options.color,
    nbStep = this.options.sideNbStep,
    lineThicknessRatio = this.options.lineThicknessRatio,
    minLineThickness = this.options.minLineThickness
  } = {}) {
    const hiddenSide = new paper.Path()
    hiddenSide.add(startPoint)
    hiddenSide.add(endPoint)

    const side = new paper.Path({
      fillColor: color,
      closed: true
    })

    for (let i = 0; i <= nbStep; i++) {
      const offset = hiddenSide.length * (i / nbStep)
      const offsetPoint = hiddenSide.getPointAt(offset)
      const deltaOffset = (i < nbStep) ? Math.floor(hiddenSide.length * ((i + 1) / nbStep)) : Math.floor(hiddenSide.length * ((i - 1) / nbStep))
      let delta = hiddenSide.getPointAt(deltaOffset).rotate(90, offsetPoint).subtract(offsetPoint)
      if (i === nbStep) {
        delta = delta.multiply(-1)
      }

      const color = this.raster.getAverageColor(offsetPoint)
      const value = color ? (1 - color.gray) * lineThicknessRatio : 0
      delta.length = Math.max(value, minLineThickness)

      const top = offsetPoint.add(delta)
      const bottom = offsetPoint.subtract(delta)

      side.add(top)
      side.insert(0, bottom)
      side.smooth()
    }

    return side
  }

  /**
   * drawHexagon - Draw stroke fluid hexagons based on raster color
   * @param  {Object} center - Hexagon center position
   * @param  {number} center.x - x center position
   * @param  {number} center.y - y center positionb
   * @param  {number} options.radius [description]
   * @param  {String} options.color  [description]
   */
  drawHexagon (
    center = {
      x: 0,
      y: 0
    }, 
    {
      radius = this.options.radius,
      color = this.options.color
    } = {}
  ) {
    const path = new paper.Path({
      closed: true
    })
    const anglesPoints = this.getHexagonAnglesPosition(center, { radius })

    anglesPoints.forEach((point, index) => {
      // Hide certain outer part of hexagon so line don't lap
      if (radius > this.options.radius && index < 3) {
        return
      }

      const nextPoint = (index < (anglesPoints.length - 1)) ? anglesPoints[index + 1] : anglesPoints[0]
      const side = this.getSidePath(point, nextPoint, {
        color: color
      })

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
  drawRecursiveHexagons (center, {
    radius = this.options.radius
  }) {
    for (let i = 1; i <= (radius + 1); i += this.options.stepGap) {
      this.drawHexagon(center, {
        radius: i
      })
    }
  }

  /**
   * draw
   * draw recursives hexagons on the all canvas to cover it
   */
  draw () {
    const { radius } = this.options
    const innerRadius = Math.round(Math.sqrt(3) / 2 * radius)
    const ctx = this.canvas.getContext('2d')
    const xStep = Math.sqrt( Math.pow(radius, 2) - Math.pow((radius / 2), 2)) * 2

    for (let y = 0; y < this.canvas.height; y += (radius * 1.5)) {
      const xOffset = (y % radius) ? xStep/2 : 0
      for (let x = 0; x < this.canvas.width; x += xStep) {
        this.drawRecursiveHexagons({
          x: xOffset + x,
          y: y
        }, {
          radius: radius
        })
      }
    }
  }
}
