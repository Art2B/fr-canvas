const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

/**
 * handleFile
 * handle file upload on input
 */
const handleFile = () => {
  const x = document.getElementById('fr-upload')
  if (x.files && x.files[0]) {
    const fr = new FileReader();
    fr.onload = e => {
      const img = new Image()
      img.addEventListener('load', () => {
        // Update canvas size to match img size
        canvas.width = img.width
        canvas.height = img.height
        // Draw image on canvas
        addFilters()
        ctx.drawImage(img, 0, 0)
        // Add shapes
        const diagMaxRadius = 100
        drawRecursiveShapesAllOverCanvas(canvas, diagMaxRadius)
      })
      img.src = e.target.result
    }
    fr.readAsDataURL(x.files[0])
  }
}

/**
 * addFilters
 * add filters to canvas before rendering
 */
const addFilters = () => {
  ctx.filter = 'grayscale(100%)'
}

/**
 * @param {Object} img - The img to analyse
 * @param {number} img.width - width of image
 * @param {number} img.height - height of image
 * @return {Object[]} data - The data of image for each pixels
 * @return {number} data[].r - The red value of pixel
 * @return {number} data[].g - The green value of pixel
 * @return {number} data[].b - The blue value of pixel
 * @return {number} data[].q - The alpha value of pixel
 */
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
 * drawShape
 * Draw a  shape from center and radius
 * @param {Object} center - The top position of the diamon
 * @param {number} center.x - the x position of the point
 * @param {number} center.y - the y position of the point
 * @param {number} sides - the number of sides of shape
 * @param {Number} diagonal - The diagonal length of the diamond
 * @param {number} adjustement - angle adjustment for shape
 */
const drawShape = (center, sides, diagonal, adjustment = 1) => {
  const step  = 2 * Math.PI / sides
  const shift = (Math.PI / 180.0) * adjustment

  ctx.beginPath()

  for (let i = 0; i <= sides;i++) {
    const curStep = i * step + shift
    ctx.lineTo (center.x + diagonal * Math.cos(curStep), center.y + diagonal * Math.sin(curStep))
  }

  ctx.strokeStyle = "#FFFFFF"
  ctx.lineWidth = 1
  ctx.stroke()
}

/**
 * drawRecursiveShapes
 * Draw recursive shapes from center to specified radius
 * @param {Object} center - center point to begin drawing diamons
 * @param {number} center.x - x position of center 
 * @param {number} center.y - y position of center 
 * @param {number} radius - the max radius of diamonds
 * @param {boolean} outEdges - if the outer edge of diamon should be displayed
 */
const drawRecursiveShapes = (center, radius, outEdges = true) => {
  const step = 4
  const loopLimit = (outEdges) ? radius : radius - step

  for (let i=0; i <= loopLimit; i += step) {
    const top = {
      x: center.x,
      y: center.y - i
    }
    drawShape(center, 6, i, 180)
  }
}

/**
 * drawRecursiveShapesAllOverCanvas
 * draw recursives shapes on the all canvas to cover it
 * @param  {Object} canvas - The canvas we draw in
 * @param {number} canvas.width - width of canvas
 * @param {number} canvas.height - height of canvas
 * @param  {number} radius - The radius of diamonds
 */
const drawRecursiveShapesAllOverCanvas = (canvas, radius) => {
  const innerRadius = Math.round(Math.sqrt(3)/2 * radius)

  for (let y = 0; y < (canvas.height / innerRadius) + innerRadius; y++) {
    if (y % 2 === 0) {
      for (let x = 0; x < (canvas.width / radius); x++) {
        const xAdjusment = (x > 0) ? (2 * x) : 0
        const center = {
          x: (x * radius*3) - xAdjusment,
          y: (innerRadius + 1) * y
        }
        drawRecursiveShapes(center, radius)
      }
    } else {
      for (let x = 0; x < ((canvas.width - (innerRadius+radius)) / radius); x++) {
        const xAdjusment = x + 1 + x%2
        const center = {
          x: (x * radius*3 + radius * 1.5) - xAdjusment,
          y: (innerRadius + 1) * y
        }
        drawRecursiveShapes(center, radius, true)
      }
    }
  }
}