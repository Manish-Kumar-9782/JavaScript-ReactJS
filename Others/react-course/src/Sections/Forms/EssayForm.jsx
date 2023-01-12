import React from "react";

/** index Number 3:
 *
 * In this section we will make a <textarea> component which will
 * be controlled by using the React state just like we did in the ControlledForm.
 */

class EssayForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      placeholder: "Write something good about your context.",
    };
  }

  //   A method to handle the Changes the state of the EssayForm Component.

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  // Now we will handle the submit button
  handleSubmit(event) {
    event.preventDefault();
    alert("your Essay is Submitted: " + this.state.value);
  }

  // now we will make the form into the render method.
  render() {
    return (
      <form onSubmit={(item) => this.handleSubmit(item)}>
        <textarea
          name="essay"
          id="essay"
          cols="60"
          rows="10"
          value={this.state.value}
          placeholder={this.state.placeholder}
          style={{ padding: "10px" }}
          onChange={(item) => this.handleChange(item)}
        ></textarea>
        <br />
        <input type="submit" value="Submit Essay" />
      </form>
    );
  }
}

export default EssayForm;
