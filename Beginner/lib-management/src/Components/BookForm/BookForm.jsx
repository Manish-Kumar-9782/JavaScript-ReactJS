import React, { useRef, useState, useEffect } from "react";
import Input from "./Input";
import Submit from "./Submit";

const BookForm = (props) => {
  const form = useRef();

  const [counting, resetValues] = useState(10);

  function submitForm() {
    /** This function is called to get the form data.
     *  return:
     *    id: an id of the current data, if data is created on first time then will we be null else we will have and integer value.
     *
     *    change: This  values plays an important role to tells the submit callback what to do, either    creating a new Entry or updating existing entry.
     *          In form we have hidden input element which is having the id of the data and the data-action value, if change is given then we will update the value else we will create a new entry.
     *
     *    data: Title, Author, Subject, Pages, Prices will be our data.
     *    form: an object of the form so we can use that form to reset the all input fields.
     */
    return {
      id: parseInt(form.current["id"].value), // passing the values as int.
      change:
        form.current["id"].getAttribute("data-action") === "change"
          ? true
          : false,
      title: form.current["Title"].value,
      author: form.current["Author"].value,
      subject: form.current["Subject"].value,
      pages: form.current["Pages"].value,
      price: form.current["Price"].value,
      form: form.current,
    };
  }

  function setFormData(id) {
    /**
     * A function to fill the input fields with the given information.
     *
     * This function will fill the input fields id, Title, Author, Subject, Pages, Price and it will
     * set the data-* attribute data-action to 'change', this attribute will be used to as a sign of
     * update the values not create new entry
     *
     * id will be received as argument.
     */
    let data = props.record.get(id);
    form.current["Title"].value = data[0];
    form.current["Author"].value = data[1];
    form.current["Subject"].value = data[2];
    form.current["Pages"].value = data[3];
    form.current["Price"].value = data[4];
    form.current["id"].value = id;
    form.current["id"].setAttribute("data-action", "change");
  }

  useEffect(() => {
    /** This useEffect callback function will run when our LibManagement's state changeId state will be
     * changed.
     *
     *  changeId is an object containing data: {change: true or false, id: integer}
     *
     *  if changeId is true then we will fill the form inputs with the information associated with the given changeId.id value.
     */
    if (props.changeId.change) {
      setFormData(parseInt(props.changeId.changeId));
    }
  }, [props.changeId]);

  console.log("our form: ", form);

  return (
    <div className="form" value={counting}>
      <form ref={form} action="#">
        <Input title="id" hidden={true} />
        <Input title="Title" label="Book Title: " />
        <Input title="Author" label="Book Author: " />
        <Input title="Subject" label="Book Subject: " />
        <Input title="Pages" label="Book Pages: " />
        <Input title="Price" label="Book Price: " />
        <Submit
          record={props.record}
          setRecord={props.setRecord}
          reset={resetValues}
          submitForm={(e) => submitForm(e)}
        />
      </form>
    </div>
  );
};

export default BookForm;
