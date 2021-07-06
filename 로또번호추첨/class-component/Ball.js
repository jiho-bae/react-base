import React, { PureComponent } from "react";

class Ball extends PureComponent {
  render() {
    const { number } = this.props;
    let background;
    if (number <= 10) background = "#ff3838";
    else if (number <= 20) background = "orange";
    else if (number <= 30) background = "#fff200";
    else if (number <= 40) background = "#0984e3";
    else background = "green";

    return (
      <div className="ball" style={{ background }}>
        {number}
      </div>
    );
  }
}

export default Ball;
