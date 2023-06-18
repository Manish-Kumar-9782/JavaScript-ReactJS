

export class KeyRequired extends Error {
    constructor(keyName, message) {
        super(message);
        this.keyName = keyName;
        this.name = `${this.keyName}-Required`
        this.httpStatusCode = 406
    }
}


class HTTP404 extends Error {

    constructor(message) {
        super(message)
        this.name = 'HTTP404'
        this.protocol = 'http'
        this.httpStatusCode = 404
    }
}


export class CourseNotFound extends HTTP404 {
    constructor(message, itemId) {
        super(message)
        this.name = 'CourseNotFound::404:'
        this.itemId = itemId
    }
}

export class SectionNotFound extends HTTP404 {
    constructor(message, itemId) {
        super(message)
        this.name = 'SectionNotFound::404:'
        this.itemId = itemId
    }
}

export class TopicNotFound extends HTTP404 {
    constructor(message, itemId) {
        super(message)
        this.name = 'TopicNotFound::404:'
        this.itemId = itemId
    }
}