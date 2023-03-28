import Button from "react-bootstrap/esm/Button";
import Issue from "./Buttons/Issue";
import { faker } from "@faker-js/faker"




export class Const {
    static USER_MODAL = Symbol.for("userModal")
    static BOOK_MODAL = Symbol.for("bookModal")
    static STUDENT = Symbol.for("student")
    static TEACHER = Symbol.for("teacher")
}

export class Sorting {
    static Faker = faker;
    static byDate(instance1, instance2, field) {
        let date1 = new Date(instance1[field]);
        let date2 = new Date(instance2[field]);

        if (date1.getMonth() > date2.getMonth()) {
            return 1;
        }
        else if (date1.getMonth() < date2.getMonth()) {
            return -1;
        }
        else {
            return date1.getDate() - date2.getDate();
        }
    }

    static byId(a, b) {
        if (a.id > b.id) return 1;
        else if (a.id < b.id) return -1;
        else return 0;
    }

    static byNumber(a, b, field) {
        return a[field] - b[field];
    }
}

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
    static TableFields = [] // a list of fields which will be displayed on the table.
    static showIssueModal = null;
    // this will hold the bsModal which to get the book issue details.
    constructor({ id, regDate, updateDate }) {
        if (id) {
            // if id is already in the with the already stored data, then we need 
            // use that existing id.
            this.id = id;
            this.constructor.setId(id);
            this.constructor.increaseId();
        }
        else {
            // if id is not in the database, then we need to create one.
            this.id = this.constructor.increaseId();
        }

        if (regDate) {
            // if registration date is given then we need to use that existing date.
            this.regDate = regDate;
        }
        else {
            let date = new Date()
            this.regDate = date.toISOString;
        }

        if (updateDate) {
            // if an update date is given then we need to use that existing date.
            this.updateDate = updateDate;
        }
        else {
            this.updateDate = null;
        }

        this.constructor.pushRecord(this)

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

        // before loading the instance we need to make preloaded data empty if any existing.
        this.RowRecord = null;
        this.Records = []
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

    getValueByFields() {
        return this.constructor.TableFields.map(field => this[field])
    }

    static getFields() {
        return this.Fields;
    }

    static getRowRecord() {
        if (!this.RowRecord) {
            this.load();
        }
        return this.RowRecord;
    }

    static getRecordByFields() {
        // this method will return only those fields which are currently listed into the TableFields 
        // static property.
        if (!this.Records) {
            this.load();
        }
        let result = this.Records.map(instance => instance.getValueByFields())
        // return this.Records.map(instance => instance.getValueByFields())
        console.log(this.name, ": ", this.Records, result)
        return result;
    }

    static getDatabaseKey() {
        return this.DatabaseKey;
    }

    toArray() {
        return this.constructor.getFields().map((key) => this[key])
    }

    save() {
        // to save the instance record , first we need to get the data in array format.
        // then we need to push that record into the RowRecord
        this.constructor.getRowRecord().values.push(this.toArray())
        // Now after pushing the record we need to save that into the localStorage.
        this.constructor.setRecord(this.constructor.getDatabaseKey(), this.constructor.RowRecord)
    }

    // a method to get the instance by using its id value.
    static get(id) {
        for (let instance of this.Records) {
            if (instance.id == id) {
                return instance;
            }
        }
    }

    static saveAll() {
        // a method to save the all instance to the database with current data.
        let data = {
            "fields": this.Fields,
            'values': this.Records.map((record) => record.toArray())
        }
        this.setRecord(this.DatabaseKey, data)
    }

    static getOptionList(idKey, valueKey) {
        return this.Records.map((instance) => {
            return { key: instance[idKey], value: instance[valueKey] }
        })
    }

    static getRecentRecord(fieldName, type) {
        // this will get the recent record using the given field name.
        // generally it should be date field.

        switch (type) {
            case 'date':
                return this.Records.sort((a, b) => Sorting.byDate(a, b, fieldName)).reverse()[0]
            default:
                return this.Records.sort((a, b) => Sorting.byId(a, b)).reverse()[0]
        }
    }

    static showRecords() {
        console.table(this.Records)
    }

    static getTop(n, field) {
        if (!this.Records) this.load();
        this.Records.sort((a, b) => Sorting.byNumber(a, b, field)).reverse()
        return this.Records.slice(0, n);
    }

}

/**=================================================================================== */
export class FormModel {

    constructor(form, name, database, inputAttributes, fields, model) {
        this.form = form;
        this.name = name;
        this.database = database;
        this.inputAttributes = inputAttributes;
        this.fields = fields;
        this.model = model;
    }

    getData() {
        // this method will retrieve the data from form.
        let data = {};
        this.fields.forEach((field) => {
            data[field] = this.form.current[field].value;
        })
        return data;

    }
    saveEntry() {
        // a function to save the data entry to the database.
        // this.model.constructor.bind(this.model)
        let st = new this.model(this.getData())
        st.save();
        this.form.current.reset();
    }
}
/**=================================================================================== */
export class Student extends LocalDatabase {


    // Student Database name in localStorage

    // fields which are loaded and stored inside the localStorage.
    static {
        super.Fields = super.Fields.concat(["name", "std", "email", "contact",
            "address", "current_issued_book", "is_finned", "finned_amount", "is_returned", "returned_date", "Image", "totalBookIssued"
        ])
        super.DatabaseKey = 'Students';
    }
    static setCurrentStudent = null;
    // a constructor to create a new student object.
    constructor({ id, name, std, email, contact, address, current_issued_book, regDate, updateDate, is_finned, finned_amount, is_returned, returned_date, Image, totalBookIssued }) {

        super({ id, regDate, updateDate })
        this.name = name;
        this.std = std;
        this.email = email;
        this.contact = contact;
        this.address = address;
        this.current_issued_book = current_issued_book;
        this.is_finned = is_finned;
        this.finned_amount = finned_amount;
        this.is_returned = is_returned;
        this.returned_date = returned_date;
        this.Image = Image;
        this.issue_book = <Issue onClick={() => { this.issueBook() }} />;
        this.totalBookIssued = totalBookIssued;
    }

    issueBook() {
        this.constructor.showIssueModal(true);
        this.constructor.setCurrentStudent(this);
    }

}


export class Teacher extends LocalDatabase {


    // Student Database name in localStorage

    // fields which are loaded and stored inside the localStorage.
    static {
        super.Fields = super.Fields.concat(["name", "stream", "email", "contact",
            "address", "current_issued_book", "is_finned", "finned_amount", "is_returned", "returned_date", "Image", "totalBookIssued"
        ])
        super.DatabaseKey = 'Teachers';
    }

    static showIssueModal = null;
    static setCurrentIssueBook = null;

    // a constructor to create a new student object.
    constructor({ id, name, stream, email, contact, address, current_issued_book, regDate, updateDate, is_finned, finned_amount, is_returned, returned_date, Image, totalBookIssued }) {

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
        this.issue_book = <Issue onClick={() => { this.issueBook() }} />;
        this.totalBookIssued = totalBookIssued;
    }

    issueBook() {
        console.log("issuing this book", this)
        this.constructor.showIssueModal(true);
        this.constructor.setCurrentIssueBook(this)
    }
}



export class Book extends LocalDatabase {


    // Student Database name in localStorage
    static setCurrentIssueBook = null;
    // fields which are loaded and stored inside the localStorage.
    static {
        super.Fields = super.Fields.concat(["title", "author", "subject", "pages", "price", "issued_to", "regDate", "updateDate", "finned", "finned_amount", "availability", "stoke", "Image", "IssuedCounts"
        ])
        super.DatabaseKey = 'Books';
    }
    // a constructor to create a new student object.
    constructor({ id, title, author, subject, pages, price, issued_to, regDate, updateDate, finned, finned_amount, availability, stoke, Image, IssuedCounts }) {

        super({ id, regDate, updateDate })
        this.title = title;
        this.author = author;
        this.subject = subject;
        this.pages = pages;
        this.price = price;
        this.issued_to = issued_to;
        this.finned = finned;
        this.finned_amount = finned_amount;
        this.availability = availability;
        this.stoke = stoke;
        this.Image = Image;
        this.issue = <Issue onClick={() => { this.issueBook() }} />;
        this.IssuedCounts = IssuedCounts;
    }

    issueBook() {
        console.log("issuing this book", this)
        this.constructor.showIssueModal(true);
        this.constructor.setCurrentIssueBook(this)
    }



}


// a class to extend the Date time functionality.

export class DateTime extends Date {

    static #SM = 60 * 1000;
    static #SH = 60 * DateTime.#SM;
    static #SD = 24 * DateTime.#SH;
    static #SW = 7 * DateTime.#SD;
    static #SMM = 28 * DateTime.#SD;
    static #SY = 365 * DateTime.#SD;


    addTime({ seconds = 0, minutes = 0, hours = 0, days = 0, months = 0, years = 0 }) {
        let date_seconds = this.getTime();
        console.log("new DateTime seconds:", date_seconds)
        date_seconds = date_seconds + seconds +
            (DateTime.#SM * minutes) +
            (DateTime.#SH * hours) +
            (DateTime.#SD * days) +
            (DateTime.#SMM * months) +
            (DateTime.#SY * years)

        console.log("new DateTime seconds:", date_seconds)

        return new DateTime(date_seconds)
    }

    subtractTime({ seconds = 0, minutes = 0, hours = 0, days = 0, months = 0, years = 0 }) {
        let date_seconds = Date.parse(this.toISOString());
        console.log("new DateTime seconds:", date_seconds)
        date_seconds = date_seconds - (seconds +
            (DateTime.#SM * minutes) +
            (DateTime.#SH * hours) +
            (DateTime.#SD * days) +
            (DateTime.#SMM * months) +
            (DateTime.#SY * years))

        console.log("new DateTime seconds:", date_seconds)

        return new DateTime(date_seconds)
    }

}
