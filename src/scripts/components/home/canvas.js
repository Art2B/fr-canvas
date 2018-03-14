import { h, app } from 'hyperapp'

import Renderer from './../../lib/renderer'

let cRenderer

const clearCanvas = (canvas) => {
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.removeAttribute('width')
  canvas.removeAttribute('height')
}

const onCanvasUpdate = (element, image) => {
  if (image) {
    new Promise((resolve, reject) => {
      const img = new Image()
      img.addEventListener('load', () => resolve(img))
      img.src = image
    })
    .then(img => {
      if (!cRenderer) {
        cRenderer = new Renderer(element, img)
      } else {
        cRenderer.updateImage(img)
      }
      cRenderer.draw()
    })
  } else {
    cRenderer.clear()
  }
}

export default ({ image }) => (
  <canvas
    id='render'
    onupdate={element => onCanvasUpdate(element, image)}
  ></canvas>
)
