import { h, app } from "hyperapp"

const state = {}

const actions = {}

const handleFile = event => {
  console.log(event.target.files[0])
}

const view = (state, actions) => (
  <div>
    <input type="file" id="fr-upload" multiple size="50" onchange={e => handleFile(e)} />
    <canvas id="canvas"></canvas>
  </div>
)

app(state, actions, view, document.body)