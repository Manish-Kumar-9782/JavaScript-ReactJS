import React from "react";

// Index number 4

class OptionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "Select an Option",
    };
  }

  // a method to handle the selection changes.
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  // a method to handle the submit process.
  handleSubmit(event) {
    event.preventDefault();
    alert("You have Selected: " + this.state.value);
  }

  //  Now we will make a render method.
  render() {
    return (
      <form
        onSubmit={(item) => {
          this.handleSubmit(item);
        }}
      >
        <select
          name="flavor"
          id="flavor"
          value={this.state.value}
          onChange={(item) => this.handleChange(item)}
        >
          <option value="grapefruit">GrapeFruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>

        <label htmlFor="flavor"> Selected Option: {this.state.value}</label>
        <br />
        <br />
        <input type="submit" value="Submit Selection" />
      </form>
    );
  }
}

export default OptionList;
