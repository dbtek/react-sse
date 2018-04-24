import React, { Component, createElement } from 'react'
import nanobus from 'nanobus'

var emitter = nanobus()
var state = {}

/**
 * Registers store function.
 * @param {function} store
 */
export function addStore (store) {
  store(state, emitter)
}

/**
 * Higher order component to provide state & emit as props.
 * @param  {Class} _Component Component to be wrapped.
 * @return {Class}            Component with state & emit
 */
export function withState (_Component) {
  return class StatefulHOC extends Component {
    componentDidMount () {
      emitter.on('render', () => this.rerender())
    }

    componentWillUnmount () {
      emitter.removeListener('render', () => this.rerender())
    }

    rerender () {
      this.setState({})
    }

    render () {
      var { props } = this
      return createElement(_Component, Object.assign({}, props, {
        state,
        emit: (ev, data) => emitter.emit(ev, data)
      }))
    }
  }
}