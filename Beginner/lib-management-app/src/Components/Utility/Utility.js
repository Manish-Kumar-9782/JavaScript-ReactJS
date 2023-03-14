export function setItem(key, value) {
    /**
     * this function will be used to store the data in key value pair to the local storage.
     */

    let data = JSON.stringify(value);
    localStorage.setItem(key, data);
}

export function getItem(key) {
    /**
     * this function will be used to get the data in key value pair form local storage.
     */
    let data = localStorage.getItem(key)
    return JSON.parse(data)
}

export function getFormData(form, inputs) {
    let data = {};
    inputs.forEach((item) => {
        data[item] = form[item].value;
    })
    return data;
}

export function makeFormEntry(e, form) {

    /**
     * form: it is the form element which contains our all
     * input elements.
     * 
     * input_names: it contains the all inputs name which are 
     * contained by our form.
     */

    // now store the form, into the form variable from form.current which is previous state of form object.
    form = form.current;

    // now we need a variable to hold database
    let database = null;

    // if database from localStorage is empty
    // then set an empty array into localStorage
    // using the database key (Students)
    if (getItem(form.dataset.database) == null) {
        setItem(form.dataset.database, []);
    }

    // now retrieve the database from localStorage.
    database = getItem(form.dataset.database);

    // add the new entry to the database.
    database.push(
        getFormData(form, form.dataset.inputNames.split(","))
    );

    // Now after updating our database we need to set the database.
    setItem(form.dataset.database, database);

    // after submitting the form data we need to reset the form

    form.reset();
}