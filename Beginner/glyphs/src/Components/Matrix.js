
class Matrix {

    arr = null;
    rows = null;
    cols = null;

    constructor(arr) {
        this.arr = arr;
        // this is simple linear array.
        this.cols = this.arr.length;
        this.rows = 0;
    }

    resize(row, col) {
        // row will decide that how many rows will be made in an array.
        // col will decide that how many values should be placed inside 
        // each row.

        let array = [] // a new matrix array.
        let temp = [] // a temp array which will hold the current row element.
        for (let i = 0; i < this.arr.length; i++) {
            // now arr is a linear array. so our for loop will run until the last element of the arr.
            if ((i + 1) % col !== 0) {
                // putting the current rows element.
                temp.push(this.arr[i]);
            }
            else {
                temp.push(this.arr[i]);
                array.push([...temp]);// putting all the temp array
                // at the current row array.
                temp = [];
            }
            // console.log(temp);
        }

        this.arr = array;
        this.rows = row;
        this.cols = col;
    }

    getRow(row) {
        return this.arr[row];
    }

    getColumn(col) {
        let temp = [];
        for (let row of this.arr) {
            temp.push(row[col]);
        }
        return temp;
    }

    sumOf(arr) {
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    sumOfRows() {
        let sum = 0;
        for (let i = 0; i < this.rows; i++) {
            sum += this.sumOf(this.getRow(i))
        }
        return sum;
    }

    sumOfColumns() {
        let sum = 0;
        for (let i = 0; i < this.cols; i++) {
            sum += this.sumOf(this.getColumn(i))
        }
        return sum;
    }
}
export default Matrix;