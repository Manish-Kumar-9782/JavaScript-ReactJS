const allowedOrigins = [
    "http://localhost:3000"
]

export const corsOptions = {
    origin: (origin, callback) => {

        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // no error
        } else {
            // if we don't have an allowed origin then we can't access the data
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}