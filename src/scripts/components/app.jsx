const App = (state, actions) => (
  <div>
    <input type='file' id='fr-upload' multiple size='50' onchange={e => actions.handleFile(e.target.files[0])} />
    <Canvas image={state.image} />
  </div>
)

export default App