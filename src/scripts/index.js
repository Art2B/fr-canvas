import 'babel-polyfill'
import { h, app } from 'hyperapp'

import Hexagon from './hexagon'
import config from './config'

import './../assets/styles/index.scss'

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
    ctx.filter = 'grayscale(100%)'
    ctx.drawImage(img, 0, 0)
    // Draw hexagons on image
    const hexa = new Hexagon(canvas, 100)
    hexa.draw()
  })
  img.src = base64
}

const logoAnim = canvas => {
  canvas.height = 100
  canvas.width = 100

  const hexa = new Hexagon(canvas)

  hexa.drawLogoAnim(config.logoHexagons)
}

const Canvas = ({ image }) => (
  <canvas
    onupdate={(element, oldProps) => {
      drawImage(element, image)
    }}
  ></canvas>
)

const view = (state, actions) => (
  <div className='app-view'>
    <header>
      <canvas className='hexagon-anim' oncreate={el => logoAnim(el)} />
      <h1>Hexag on canvas</h1>
    </header>
    <section className='explanations'>
      <p>Choose an image, let me process it, and BAM! You have a cooler image made with hexagons.</p>
    </section>
    <main className={state.image ? 'is-file' : ''}>
      <label className='file-input' for='fr-upload'><span className='text-bg'>Choose a <i A className="fas fa-fire" /> af image.</span></label>
      <input type='file' id='fr-upload' size='50' onchange={e => actions.handleFile(e.target.files[0])} />
      <Canvas image={state.image} />
    </main>
    <footer>
      <div className='border'/>
      Made with <i className='far fa-keyboard' /> by <a href='https://twitter.com/mr_marabout' target='_blank'>Art2B</a>
    </footer>
  </div>
)

app(state, actions, view, document.body)
