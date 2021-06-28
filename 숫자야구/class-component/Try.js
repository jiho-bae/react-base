const React = require("react");
const { Component } = React;

class Try extends Component {
  render() {
    const { value } = this.props;
    return (
      <li>
        <div>입력한 숫자 : {value.try}</div>
        <span>{value.result}</span>
        <div>--------------------------------</div>
      </li>
    );
  }
}

module.exports = Try;
