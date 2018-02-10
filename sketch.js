const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const handleFile = () => {
  const x = document.getElementById('fr-upload')
  if (x.files && x.files[0]) {
    const fr = new FileReader();
    fr.onload = e => {
      const img = new Image()
      img.addEventListener('load', () => {
        canvas.width = img.width
        canvas.height = img.height
        addFilters()
        ctx.drawImage(img, 0, 0)
        const diagMaxRadius = 100
        drawRecursiveDiamondsAllOverCanvas(canvas, diagMaxRadius)
      })
      img.src = e.target.result
    }
    fr.readAsDataURL(x.files[0])
  }
}

const addFilters = () => {
  ctx.filter = 'grayscale(100%) brightness(120%)'
}

const drawLines = (canvas, img) => {
  const imgData = getImageData(img)
  const context = canvas.getContext('2d')

  imgData.forEach((pixel, index) => {
    if (Math.floor(index/img.width) % 2 === 0) {
      const xPos = index % img.width
      const yPos = Math.floor(index/img.width)
      ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`
      ctx.fillRect( xPos, yPos, 1,1)
    }
  })

  // for (let i = 0; i < canvas.height; i = i+4) {
  //   context.beginPath()
  //   context.moveTo(0,i)
  //   context.lineTo(canvas.width, i)
  //   canvas.lineWidth = 1
  //   context.stroke()
  // }
}

const getImageData = img => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  // Make human readable data
  let data = []

  for (let i=0; i < imgData.data.length; i = i+4) {
    let pixel = {
      r: imgData.data[i],
      g: imgData.data[i + 1],
      b: imgData.data[i + 2],
      a: imgData.data[i + 3]
    }
    data.push(pixel)
  }
  return data
}

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
  ctx.strokeStyle = "#FFFFFF"
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
  for (let y = 0; y <= canvas.height + radius; y += radius) {
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
// drawRecursiveDiamondsAllOverCanvas(canvas, diagMaxRadius)