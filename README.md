## React SSE
Simple State Management via Event Emitter

### Install
```bash
$ yarn add react-sse
// or
$ npm i react-sse --save
```

### Usage
```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withState, addStore } from 'react-sse'

function countStore (state, emitter) {
  state.count = 0

  emitter.on('count:increase', () => {
    state.count++
    emitter.emit('render')
  })

  emitter.on('count:decrease', () => {
    state.count--
    emitter.emit('render')
  })
}

class Counter extends Component {
  render () {
    const { state, emit } = this.props
    return (
      <div>
        <h2>{state.count}</h2>
        <p>
          <button onClick={e => emit('count:decrease')}>-</button>
          <button onClick={e => emit('count:increase')}>+</button>
        </p>
      </div>
    )
  }
}

StatefulCounter = withState(Counter)
addStore(countStore)

ReactDOM.render(<StatefulCounter/>, document.querySelector('#app'))
```

### Author
İsmail Demirbilek - [@dbtek](https://twitter.com/dbtek)

### License
MIT