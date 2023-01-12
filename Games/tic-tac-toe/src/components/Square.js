import React from "react";

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
    };

    // console.log(this);
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => {
          this.setState({ disabled: true });
          this.props.onClick();
        }}
        disabled={this.state.disabled ? "disabled" : null}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
