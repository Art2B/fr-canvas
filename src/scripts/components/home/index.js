import { h, app } from 'hyperapp'

import Canvas from './canvas'

export default ({image, error, setImage, handleFile}) => () => (
  <main>
    <section className='explanations'>
      <p>Choose an image, let me process it, and BAM! You have a cooler image made with hexagons.</p>
    </section>
    <section className={image.data ? 'home is-file' : 'home'}>
      <div className='input-container'>
        <label for='fr-upload'><span className='text-bg'>Choose a <i A className="fas fa-fire" /> af image.</span></label>
        <input 
          type='file'
          id='fr-upload'
          size='50'
          onchange={e => {
            handleFile(e.target.files[0])
            e.target.value = null
          }}
        />
        { error &&
          <p class='file-error'>{error}</p>
        }
      </div>
      <Canvas image={image.data} />
      { image.data &&
        <div class='btn-container'>
          <button type='button' class='btn clear' onclick={() => setImage({data: null, name: null})} >Clear</button>
          <a class='btn download' onclick={e => {
            e.target.href = document.getElementById('render').toDataURL()
            e.target.download = image.name
          }} >Download</a>
        </div>
      }
    </section>
  </main>
)
