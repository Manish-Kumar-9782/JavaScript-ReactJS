
const promise = new Promise((resolve, rejects) => {
    console.log("Promise Created")
    resolve(10);
})

const square = (value) => {
    console.log("Promise returned value: " + value);
    return value ** 2
}

const cube = (value) => {
    // Now in this we will throw an error
    throw new Error("There was an error during computing the cube of " + value)
}

const onFailure = (error) => {
    console.error("Promise returned error:: " + error)
}

const finalValue = (value) => value

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});
