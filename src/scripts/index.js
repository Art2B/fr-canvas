import 'babel-polyfill'
import { h, app } from 'hyperapp'

import Canvas from './components/canvas'
import App from './components/app'

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

app(state, actions, App, document.body)
