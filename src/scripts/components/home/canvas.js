import { h, app } from 'hyperapp'

import Hexagon from './../../hexagon'

const drawImage = (canvas, base64) => {
  const img = new Image()
  const ctx = canvas.getContext('2d')

  img.addEventListener('load', () => {
    // Update canvas size to match img size
    canvas.width = img.width
    canvas.height = img.height
    // Draw image on canvas
    ctx.filter = 'grayscale(100%)'
    ctx.drawImage(img, 0, 0)
    // Draw hexagons on image
    const hexa = new Hexagon(canvas, 100)
    hexa.draw()
  })
  img.src = base64
}

const clearCanvas = (canvas) => {
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.removeAttribute('width')
  canvas.removeAttribute('height')
}

export default ({ image }) => (
  <canvas
    onupdate={(element, oldProps) => {
      if (image) {
        drawImage(element, image)
      } else {
        clearCanvas(element)
      }
    }}
  ></canvas>
)
