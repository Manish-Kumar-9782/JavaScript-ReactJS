import React from "react";

/** Index Number 1.
 * In this section we will make a simple form which will be later converted
 * to the components. Below form is a default HTML form which can be used
 * to make a form.
 *
 */
const FirstForm = () => {
  return (
    <div>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
        <br />
        <br />
        <input type="submit" value="submit" />
        {/* Now note that by default the submit button will submit the 
        form and reload the whole page which we don't want to we need to make a
        function which will disabled the default submit behavior. 
        
        A Controlled Component: if we have a javaScript function that handles 
        the submission of the form and has access to the data that the user 
        entered into the form. The standard way to achieve this is a technique called 
        controlled components
        
        */}
      </form>
    </div>
  );
};

export default FirstForm;
