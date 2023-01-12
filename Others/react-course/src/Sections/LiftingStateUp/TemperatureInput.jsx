import React from "react";

class TemperatureInput extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  //   an handler function to change the input and update the temperature.
  handleChange(e) {
    // onTempChange is defined in the TempCalculator class.
    this.props.onTempChange(e.target.value);
  }

  render() {
    return (
      <fieldset>
        <legend>Enter Temperature in {this.props.scale}</legend>
        <input
          type="number"
          value={this.props.temperature}
          onChange={(el) => this.handleChange(el)}
        />
      </fieldset>
    );
  }
}

export default TemperatureInput;
