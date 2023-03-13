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