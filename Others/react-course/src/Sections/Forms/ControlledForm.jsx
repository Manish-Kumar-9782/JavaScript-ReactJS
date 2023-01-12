import React from "react";

/** Index Number 2.
 * In this section we will see that how to make a from into a Controlled
 * form in which we can control the form internal state by using the
 * setState() methods.
 *
 * In this section we will make FirstForm as the controlled Form.
 */

// Now we will make a class based component for better controlled structure.

class NameForm extends React.Component {
  // now first we need to make the constructor with the props and
  // states.

  constructor(props) {
    super(props);

    this.state = {
      value: "", // this initial value of the form.
    };

    // since in jsx binding the method does not work as we works in the pain js.
    // so we need to manually bind the method so we can access the this object.
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // if we don't want to bind them manually we will get the undesired result.
  }

  // Now we will make a function to change the state fo the form
  handleChange(e) {
    // console.log("changing state:  ", this);
    this.setState({
      value: e.target.value,
      // an event which will be called when the internal
      // value is changed of the form.
    });
  }

  //   Now we will make another function to handle the submit event.
  handleSubmit(e) {
    // first we need to prevent the form default submit behavior.
    e.preventDefault();
    // Now we will show an alert message.
    alert("A name was submitted: " + this.state.value);
  }

  //   Now we will make the render method which will render the changed
  // states.

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={this.state.value}
          onChange={(item) => this.handleChange(item)}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export { NameForm };
