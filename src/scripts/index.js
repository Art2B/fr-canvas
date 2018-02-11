import 'babel-polyfill'
import { h, app } from 'hyperapp'

const state = {
  image: ''
}

const actions = {
  handleFile: file => async (state, actions) => {
    const img = await new Promise(resolve => {
      const fr = new FileReader()
      fr.onload = e => {
        resolve(e.target.result)
      }
      fr.readAsDataURL(file)
    })
    actions.setImage(img)
  },
  setImage: value => state => ({ image: value })
}

const drawImage = (canvas, base64) => {
  const img = new Image()
  const ctx = canvas.getContext('2d')

  img.addEventListener('load', () => {
    // Update canvas size to match img size
    canvas.width = img.width
    canvas.height = img.height
    // Draw image on canvas
    ctx.drawImage(img, 0, 0)
  })
  img.src = base64
}

const Canvas = ({ image }) => (
  <canvas 
    onupdate={(element, oldProps) => {
      drawImage(element, image)
    }} 
  />
)

const view = (state, actions) => (
  <div>
    <input type="file" id="fr-upload" multiple size="50" onchange={e => actions.handleFile(e.target.files[0])} />
    <Canvas image={ state.image } />
  </div>
)

app(state, actions, view, document.body)