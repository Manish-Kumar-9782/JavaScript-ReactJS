export class LocalDatabase {
    /**
     * This class will be used to perform operations related to the localStorage, it will 
     * Take care of the required functionality working with the localStorage database.
     * 
     * In this we will take care of reading, writing and updating and deleting data from 
     * local storage.
     */

    static DatabaseKey = 'database'; // it must contain the name of the database.
    static Records = []; // it must contain the instance of the class or subclass.
    static RowRecord = null;
    // it will be our row object retrieved form the database.
    static UniqueId = 1;
    static Fields = ["id", "regDate", "updateDate"]; // it must contain the all fields which are going to be stored in the database.
    static view_fields = [] // a list of fields which will be displayed on the table.
    constructor({ id, regDate, updateDate }) {
        if (id) {
            // if id is already in the with the already stored data, then we need 
            // use that existing id.
            this.id = id;
            LocalDatabase.setId(id);
        }
        else {
            // if id is not in the database, then we need to create one.
            this.id = LocalDatabase.increaseId();
        }

        if (regDate) {
            // if registration date is given then we need to use that existing date.
            this.regDate = regDate;
        }
        else {
            let date = new Date()
            this.regDate = date.toLocaleDateString();
        }

        if (updateDate) {
            // if an update date is given then we need to use that existing date.
            this.updateDate = updateDate;
        }
        else {
            this.updateDate = null;
        }

        LocalDatabase.pushRecord(this)

    }

    static setId(id) {
        this.UniqueId = id;
    }

    static increaseId() {
        return this.UniqueId++;
    }

    static pushRecord(record) {
        this.Records.push(record)
    }

    static setRecord(key, value) {
        /**
         * this function will be used to store the data in key value pair to the local storage.
         */
        let data = JSON.stringify(value);
        localStorage.setItem(key, data);
    }


    static getRecord(key) {
        /**
         * this function will be used to get the data in key value pair form local storage.
         */
        let data = localStorage.getItem(key)
        if (data) {
            return JSON.parse(data)
        }
        return { "fields": this.Fields, values: [] }
    }

    updateField(key, value) {
        // a method that updates the instance data field with given value.
        this[key] = value;
    }

    static load() {
        // this method will load the data from the database and it will create instances.
        this.RowRecord = this.getRecord(this.DatabaseKey);
        // Now after loading the Row data now we need to create a new instances for our 
        // application.
        let obj = {}

        this.RowRecord.values.forEach(record => {
            this.Fields.forEach((field, index) => {
                obj[field] = record[index];
            })
            new this(obj)
        })
    }

    static getFields() {
        return this.Fields;
    }

    static getRowRecord() {
        return this.RowRecord;
    }

    static getDatabaseKey() {
        return this.DatabaseKey;
    }

    toArray(cls) {
        return cls.getFields().map((key) => this[key])
    }

    save(cls) {
        // to save the instance record , first we need to get the data in array format.
        // then we need to push that record into the RowRecord
        cls.getRowRecord().values.push(this.toArray(cls))
        // Now after pushing the record we need to save that into the localStorage.
        cls.setRecord(cls.getDatabaseKey(), cls.RowRecord)
    }

    static saveAll() {
        // a method to save the all instance to the database with current data.
        let data = {
            "fields": this.fields,
            'values': this.Records.map((record) => record.toArray())
        }
        this.setRecord(this.database, data)
    }

}

export class Form {

    constructor(form, name, database, inputAttributes) {
        this.form = form;
        this.name = name;
        this.database = database;
        this.inputAttributes = inputAttributes;
    }

    getData() {
        // this method will retrieve the data from form.

    }
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

    // // Now after updating our database we need to set the database.
    // setItem(form.dataset.database, database);
    let data = getFormData(form, form.dataset.inputNames.split(","))
    let st = new Student({
        name: data.name, email: data.email, contact: data.contact,
        address: data.address, _class: data.class
    })

    st.save();
    // after submitting the form data we need to reset the form

    form.reset();
}

// getItemList to generate of the list of data.



export class Student extends LocalDatabase {


    // Student Database name in localStorage

    // fields which are loaded and stored inside the localStorage.
    static {
        super.Fields = super.Fields.concat(["name", "class", "email", "contact",
            "address", "current_issued_book", "is_finned", "finned_amount", "is_returned", "returned_date", "Image"
        ])
        super.DatabaseKey = 'Students';
    }

    // a constructor to create a new student object.
    constructor({ id, name, _class, email, contact, address, current_issued_book, regDate, updateDate, is_finned, finned_amount, is_returned, returned_date, Image }) {

        super({ id, regDate, updateDate })
        this.name = name;
        this.class = _class;
        this.email = email;
        this.contact = contact;
        this.address = address;
        this.current_issued_book = current_issued_book;
        this.is_finned = is_finned;
        this.finned_amount = finned_amount;
        this.is_returned = is_returned;
        this.returned_date = returned_date;
        this.Image = Image;
    }

    save() {
        super.save(Student)
    }

}


export class Teacher extends LocalDatabase {


    // Student Database name in localStorage

    // fields which are loaded and stored inside the localStorage.
    static {
        super.Fields = super.Fields.concat(["name", "stream", "email", "contact",
            "address", "current_issued_book", "is_finned", "finned_amount", "is_returned", "returned_date", "Image"
        ])
        super.DatabaseKey = 'Teachers';
    }

    // a constructor to create a new student object.
    constructor({ id, name, stream, email, contact, address, current_issued_book, regDate, updateDate, is_finned, finned_amount, is_returned, returned_date, Image }) {

        super({ id, regDate, updateDate })
        this.name = name;
        this.stream = stream;
        this.email = email;
        this.contact = contact;
        this.address = address;
        this.current_issued_book = current_issued_book;
        this.is_finned = is_finned;
        this.finned_amount = finned_amount;
        this.is_returned = is_returned;
        this.returned_date = returned_date;
        this.Image = Image;
    }

    save() {
        super.save(Teacher);
    }
}   