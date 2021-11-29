
import { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      class: this.props.className + " disabled:opacity-50 disabled:cursor-default select-none cursor-pointer p-1 fixed outline-none right-4 bottom-4 w-14 bg-gray-900 z-50 rounded text-white"
    }
  }

  render() {
    return (
      <button id={this.props.id} onClick={this.props.onClick} className={this.state.class}>{this.props.text}</button>
    )
  }
}