import React from "react";

/** Index Number 1
 *
 * In this section we will see the first introduction to the sharing the state
 * in b/w the multiple states.
 *
 * In this section we will make an simple component in which we will test the
 * boiling temperature of the water in both fahrenheit and Celsius.
 *
 */

const BoilingVerdict = (props) => {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
};

class TempCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: '', // initially no temperature is set.
    };
  }

  // Now we will make an function which will handle the input
  handleChange(e) {
    this.setState({
      temperature: e.target.value,
    });
  }

  // Now we will make a render method for the component which will display the
  // input fields
  render() {
    return (
      <fieldset>
        <legend>Enter Temperature in Celsius: </legend>
        <input
          type="number"
          value={this.state.temperature}
          step={10}
          onChange={(element) => this.handleChange(element)}
        />
        <BoilingVerdict celsius={parseFloat(this.state.temperature)} />
      </fieldset>
    );
  }
}

export default TempCalculator;
