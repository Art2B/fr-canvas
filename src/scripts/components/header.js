import { h, app } from 'hyperapp'
import { Link } from "@hyperapp/router"

import Logo from './../lib/logoanim'
import config from './../config'

const logoAnim = canvas => {
  canvas.height = 100
  canvas.width = 100

  const logo = new Logo(canvas, config.logoHexagons)
  logo.animate()
}

export default ({}) => (
  <header>
    <canvas className='hexagon-anim' oncreate={el => logoAnim(el)} />
    <h1><Link to='/'>Hexag on canvas</Link></h1>
  </header>
)
