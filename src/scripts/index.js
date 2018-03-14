import 'babel-polyfill'
import { h, app } from 'hyperapp'
import { Link, Route, location } from "@hyperapp/router"

import config from './config'
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/home'
import NotFound from './components/404'

import './../assets/styles/index.scss'

const state = {
  location: location.state,
  image: {
    data: null,
    name: null
  },
  error: null
}

const actions = {
  location: location.actions,
  handleFile: file => async (state, actions) => {
    if (config.allowedFileTypes.find(type => file.type === type)) {
      const img = await new Promise(resolve => {
        const fr = new FileReader()
        fr.onload = e => {
          resolve(e.target.result)
        }
        fr.readAsDataURL(file)
      })
      actions.setImage({
        data: img,
        name: 'hexagon_' + file.name
      })
      actions.setError(null)
    } else {
      actions.setError(config.errorMessages.fileType)
    }
  },
  setImage: value => state => ({ image: Object.assign({}, state.image, value) }),
  setError: value => state => ({ error: value })
}

const view = (state, actions) => {
  return (
    <div className='app-view'>
      <Header />
      <Route path="/" render={Home({image: state.image, error: state.error, setImage: actions.setImage,  handleFile: actions.handleFile})} />
      { state.location.pathname !== '/' &&
        <NotFound />
      }
      <Footer />
    </div>
  )
}

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
