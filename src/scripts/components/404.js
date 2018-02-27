import { h, app } from 'hyperapp'
import { Link } from "@hyperapp/router"

export default () => (
  <main className='not-found'>
    <h2>404 not found</h2>
    <p>I can't find the page you're looking for.</p>
    <p>So shut up ang go <Link to='/'>home</Link></p>
  </main>
)