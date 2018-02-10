const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

/**
 * drawDiamond
 * Draw a diamon shape from top point and diamon length
 * @param {Object} topPoint - The top position of the diamon
 * @param {number} topPoint.x - the x position of the point
 * @param {number} topPoint.y - the y position of the point
 * @param {Number} diagonal - The diagonal length of the diamond
 */
const drawDiamond = (topPoint, diagonal) => {
  // Calculate position of each corner
  const bottomPoint = {
    x: topPoint.x,
    y: topPoint.y + diagonal
  }
  const leftPoint = {
    x: topPoint.x - diagonal/2,
    y: topPoint.y + diagonal/2
  }
  const rightPoint = {
    x: topPoint.x + diagonal/2,
    y: topPoint.y + diagonal/2
  }

  // Draw lines to make diamond
  // Top to right
  ctx.beginPath()
  ctx.moveTo(topPoint.x, topPoint.y)
  ctx.lineTo(rightPoint.x, rightPoint.y)
  ctx.lineTo(bottomPoint.x, bottomPoint.y)
  ctx.lineTo(leftPoint.x, leftPoint.y)
  ctx.closePath()
  ctx.stroke()
}

/**
 * drawRecursiveDiamons
 * Draw recursive diamonds from center to specified radius
 * @param {Object} center - center point to begin drawing diamons
 * @param {number} center.x - x position of center 
 * @param {number} center.y - y position of center 
 * @param {number} radius - the max radius of diamonds
 * @param {boolean} outEdges - if the outer edge of diamon should be displayed
 */
const drawRecursiveDiamonds = (center, radius, outEdges = true) => {
  const step = 4
  // Draw center
  ctx.fillStyle = 'black'
  ctx.fillRect(center.x - 1, center.y - 1, 2, 2)
  // Draw diamonds
  const loopLimit = (outEdges) ? radius : radius - step
  for (let i=0; i <= loopLimit; i += step) {
    const top = {
      x: center.x,
      y: center.y - i
    }
    drawDiamond(top, i*2)
  }
}

/**
 * @param  {Object} canvas - The canvas we draw in
 * @param {number} canvas.width - width of canvas
 * @param {number} canvas.height - height of canvas
 * @param  {number} radius - The radius of diamonds
 */
const drawRecursiveDiamondsAllOverCanvas = (canvas, radius) => {
  for (let y = 0; y <= canvas.height; y += radius) {
    if ((y/radius) % 2 === 0) {
      for (let x = 0; x < (canvas.width / radius*2); x++) {
        const center = {
          x: x * radius*2,
          y: y
        }
        drawRecursiveDiamonds(center, radius)
      }
    } else if ((y/radius) % 2 === 1) {
      for (let x = 0; x < (canvas.width / radius*2); x++) {
        const center = {
          x: x * radius*2 + radius,
          y: y
        }
        drawRecursiveDiamonds(center, radius, false)
      }
    }
  }
}

// SCRIPTS BEGIN HEEEEEEEERE
const diagMaxRadius = 100
drawRecursiveDiamondsAllOverCanvas(canvas, diagMaxRadius)