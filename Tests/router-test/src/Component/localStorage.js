export default function Storage(key) {
    this.key = key;
    this.data = null;

    this.getItem = function () {
        if (this.isKeyExist(this.key)) {
            const data = JSON.parse(localStorage.getItem(this.key))
            if (data instanceof Array) return data
            return []
        }
        return []  // if no key present then return an empty array
    }

    this.setItem = function (data) {

        if (!(data instanceof Array))
            return console.error("Type Error: data must be an instance of Array.")

        data = JSON.stringify(data)
        localStorage.setItem(this.key, data)
    }

    this.isKeyExist = function () {
        if (localStorage.getItem(this.key) == null)
            return false
        return true
    }
}