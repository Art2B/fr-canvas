import { h, app } from 'hyperapp'
import { Link } from "@hyperapp/router"

import Hexagon from './../hexagon'
import config from './../config'

const logoAnim = canvas => {
  canvas.height = 100
  canvas.width = 100

  const hexa = new Hexagon(canvas)

  hexa.drawLogoAnim(config.logoHexagons)
}

export default ({}) => (
  <header>
    <canvas className='hexagon-anim' oncreate={el => logoAnim(el)} />
    <h1><Link to='/'>Hexag on canvas</Link></h1>
  </header>
)
