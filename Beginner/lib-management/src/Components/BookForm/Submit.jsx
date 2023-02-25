import React, { useState } from "react";

const Submit = (props) => {
  const [id, setId] = useState(1);

  // a function to get the data from the form
  function getFormData() {
    /**
     * This function will be used to get the  data from the form, it will return the data,
     * -> id of the data,
     * -> change (true or false) will show that we are updating the existing data or need to create new data.
     * -> form object will be used to reset the form from callback function of submit button.
     */
    let data = props.submitForm();
    return {
      data: [data.title, data.author, data.subject, data.pages, data.price],
      id: data.id,
      change: data.change,
      form: data.form,
    };
  }

  function update(data, id) {
    /**
     * // Now we have id and data, next we need to update the  Map object.
     * // now we will update the existing data by specifying the id and the new data.
     *
     * Since we are updating on the old data, we will use the old state to update the data and
     * after that we will create a copy of the data so rendering should be done.
     */
    props.record.set(id, data);
    let newData = new Map();

    props.record.forEach((value, key) => {
      newData.set(key, value);
    });
    props.setRecord(newData);
  }

  // to add a new record
  function add(data) {
    /**
     * This method will be used to add a new record on the Record Table. In this, we will first make a copy of the the old record and then, we will add the new record on `new record copy` and then put that copy of record into the the setRecord, so our RecordTable rerenders with the new record.
     *
     */
    let mapData = new Map();
    // putting all the old data into the new Map
    props.record.forEach((value, key) => {
      mapData.set(key, value);
    });

    // adding new data with the current id.
    mapData.set(id, data);
    setId(id + 1);

    props.setRecord(mapData);
  }

  return (
    <input
      className="fill bg-teal"
      type="submit"
      value="Submit"
      onClick={(e) => {
        e.preventDefault();
        // data is an object containing the title, author, subject, pages and price.
        let data = getFormData(e);

        if (data.change) {
          // if data-action = 'change' set then update.
          update(data.data, data.id);
        } else {
          // if data-action = 'anything' then add new entry.
          add(data.data);
        }
        data.form.reset();
      }}
    />
  );
};

export default Submit;
