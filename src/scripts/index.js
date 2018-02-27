import 'babel-polyfill'
import { h, app } from 'hyperapp'
import { Link, Route, location } from "@hyperapp/router"

import Hexagon from './hexagon'
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/home'
import NotFound from './components/404'

import './../assets/styles/index.scss'

const state = {
  location: location.state,
  image: ''
}

const actions = {
  location: location.actions,
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

const view = (state, actions) => {
  return (
    <div className='app-view'>
      <Header />
      <main>
        <Route path="/" render={Home({image: state.image, handleFile: actions.handleFile})} />
        { state.location.pathname !== '/' &&
          <NotFound />
        }
      </main>
      <Footer />
    </div>
  )
}

const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
