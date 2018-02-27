import { h, app } from 'hyperapp'

import Canvas from './canvas'

export default ({image, handleFile}) => (
  <div>
    <section className='explanations'>
      <p>Choose an image, let me process it, and BAM! You have a cooler image made with hexagons.</p>
    </section>
    <section className={image ? 'home is-file' : 'home'}>
      <label className='file-input' for='fr-upload'><span className='text-bg'>Choose a <i A className="fas fa-fire" /> af image.</span></label>
      <input type='file' id='fr-upload' size='50' onchange={e => handleFile(e.target.files[0])} />
      <Canvas image={image} />
    </section>
  </div>
)
