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
    if (data) {
        return JSON.parse(data)
    }
    return []
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
        setItem(form.dataset.database, {
            fields: Student.fields,
            students: []
        });
    }

    // now retrieve the database from localStorage.
    database = getItem(form.dataset.database);

    Student.Fields = database.fields

    database.students.forEach((item) => {
        let st = new Student()
        Student.fields.forEach((key, index) => {
            // updating each field, where key is the field name,
            // and item[index] will be our value
            st.updateField(key, item[index])
        })
    })

    // // add the new entry to the database.
    // database.push(
    //     getFormData(form, form.dataset.inputNames.split(","))
    // );

    // // Now after updating our database we need to set the database.
    // setItem(form.dataset.database, database);
    let data = getFormData(form, form.dataset.inputNames.split(","))
    new Student({
        name: data.name, email: data.email, contact: data.contact,
        address: data.address, _class: data.class
    })

    Student.saveStudents()

    // after submitting the form data we need to reset the form

    form.reset();
}

// getItemList to generate of the list of data.

export function getItemList(database) {

    return getItem(database).map((item, index) => {
        return [index, ...Object.values(item)]
    })
}

class Student {

    // list of all Student Objects
    static Students = [];
    // Student Database name in localStorage
    static DatabaseKey = 'Students';

    // current student id for new student.
    static StudentId = 1;

    // fields which are loaded and stored inside the localStorage.
    static Fields = [
        "id", "name", "class", "email", "contact",
        "address", "current_issued_book", "registration_date", "updated_on", "is_finned", "finned_amount", "is_returned", "returned_date", "Image"
    ]

    // a constructor to create a new student object.
    constructor({ name, _class, email, contact, address, current_issued_book, registration_date, updated_on, is_finned, finned_amount, is_returned, returned_date, Image }) {

        this.id = Student.StudentId++;
        this.name = name;
        this.class = _class;
        this.email = email;
        this.contact = contact;
        this.address = address;
        this.current_issued_book = current_issued_book;
        this.registration_date = new Date().toLocaleDateString();
        this.updated_on = new Date().toLocaleDateString;
        this.is_finned = is_finned;
        this.finned_amount = finned_amount;
        this.is_returned = is_returned;
        this.returned_date = returned_date;
        this.Image = Image;
        Student.Students.push(this)

    }

    updateField(key, value) {
        this[key] = value;
    }

    static loadStudents() {
        let data = getItem(Student.DatabaseKey)
    }

    static saveStudents() {
        // Now since our data will be stored in localStorage, which need string
        // representation of our data.

        // now we will get all the student values.
        setItem(Student.DatabaseKey, {
            fields: Student.Fields,
            students: Student.Students.map((item) => item.toArray())
        })
    }


    toArray() {
        /**
         *  "id", "name", "class", "email", "contact",
        "address", "current_issued_book", "registration_date", "updated_on", "is_finned", "finned_amount", "is_returned", "returned_date", "Image"
         */
        return [this.id, this.name, this.class, this.email, this.contact, this.address, this.is_finned, this.current_issued_book, this.registration_date, this.updated_on, this.is_finned, this.finned_amount, this.is_returned, this.returned_date, this.Image]
    }

}   