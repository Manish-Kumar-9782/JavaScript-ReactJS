import React from "react";

/** Index number 6
 *
 * In this section we will see how to control the multiple input selection
 * from a single component states so we can easy switch b/w the multiple input
 * options.
 */

class MultiInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoing: true,
      numberOfGuest: 4,
    };
  }

  //   an input change handler callback function which will update the
  // state values according to the their corresponding input selection.
  handleInputChange(event) {
    // first we need identify that which input is selected
    // if checkbox is selected then we will set true or false.
    // if number is selected then we will set the number.
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    // Now we need to set the state
    this.setState({ [event.target.name]: value });
  }

  //   Now we will make another handler method which will handle the submit
  // event for form.

  handleSubmit(event) {
    event.preventDefault(); // first prevent the default behavior of the submit button.
    // Now we will show the alert message.
    const status = `
    isGoing: ${this.state.isGoing}
    Number of Guest: ${this.state.numberOfGuest}`;
    alert(status);
  }

  //   Rendering the multiple input section form.
  render() {
    return (
      <form onSubmit={(item) => this.handleSubmit(item)}>
        <label htmlFor="isGoing">Is Going: </label>
        <input
          type="checkbox"
          name="isGoing"
          id="isGoing"
          value={this.state.isGoing}
          onChange={(item) => {
            this.handleInputChange(item);
          }}
        />{" "}
        <br />
        {/* ------------------------------------------ */}
        <label htmlFor="numberOfGuest">Number of Guest: </label>
        <input
          type="number"
          name="numberOfGuest"
          id="numberOfGuest"
          min={0}
          style={{ width: "40px" }}
          value={this.state.numberOfGuest}
          onChange={(item) => {
            this.handleInputChange(item);
          }}
        />
        <br />
        <br />
        <input type="submit" value="Submit data" />
      </form>
    );
  }
}

export default MultiInputForm;
