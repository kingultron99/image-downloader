import { Component } from "react";

export default class Image extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    }

    this.handleChecked = this.handleChecked.bind(this)
  }

  handleChecked() {
    if (this.state.checked === true) this.setState({ checked: false })
    else this.setState({ checked: true });
    document.getElementById(this.props.index).classList.toggle("ring-2")
  }


  render() {
    return (
      <div className="relative m-1 z-0">
        <img id={this.props.index} className="select-none rounded ring-blue-400 h-52" value={this.state.checked} src={this.props.image} onClick={this.handleChecked}/>
      </div>
    )
  }

}