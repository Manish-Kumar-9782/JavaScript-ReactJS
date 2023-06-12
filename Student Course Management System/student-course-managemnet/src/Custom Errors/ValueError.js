
class ValidateValue extends Error {

    constructor(message, value, types = ["string"]) {
        super(message);
        this.value = value;
        this.name = "StudentIdError";
        this.code = 404
        this.validTypes = types
        this.isTypeValid = this.validateType();
        this.generateErrorMessage()
    }

    validateType() {
        const validation_result = this.validTypes.map(type => typeof this.value === type)
        return validation_result.some(value => value)
    }

    generateErrorMessage() {
        if (!this.isTypeValid) {
            const singleType = this.validTypes.length > 1 ? true : false

            this.errorMessage = `Value must be type ${singleType ? "of" : "any of"}${singleType ? this.validTypes[0] : this.validTypes} instead received typeof '${typeof this.value}'`

            // Now updating the error message
            this.message += "\n" + this.errorMessage
        }
    }
}


export class StudentIdError extends ValidateValue {

    constructor(message, value) {
        super(message, value);
        this.name = "StudentIdError";
        this.code = 404
    }
}

export class CourseIdError extends ValidateValue {

    constructor(message, value) {
        super(message, value);
        this.name = "CourseIdError";
        this.code = 404
    }
}