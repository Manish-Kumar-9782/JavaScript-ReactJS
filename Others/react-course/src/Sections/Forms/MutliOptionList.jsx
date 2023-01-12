import React from "react";

// Index number 5

class MultiOptionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: [], // here we will use the array instead of single value
    };
  }

  // a method to handle the selection changes.
  handleChange(event) {
    // here we will retrieve the event.target.selectedOptions

    // now we will make an array from the selectedOptions HTMLCollectionsList
    // we need to get the value from the selectedOptions and then we need to
    // put them into the array.
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    // Now the final result is the array of values from all selectedOptions

    this.setState({
      value: selectedOptions, // now we will set that array of selectedOptions as the value
      // of our item.
    });
    console.log(event.target.selectedOptions);
  }

  // a method to handle the submit process.
  handleSubmit(event) {
    event.preventDefault();
    alert("You have Selected: " + this.state.value.join(","));
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
          multiple={true}
          id="flavor"
          value={this.state.value}
          onChange={(item) => this.handleChange(item)}
        >
          <option value="grapefruit">GrapeFruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>

        <label htmlFor="flavor">
          {" "}
          Selected Option: {this.state.value.join(",")}
        </label>
        <br />
        <br />
        <input type="submit" value="Submit Selection" />
      </form>
    );
  }
}

export default MultiOptionList;
