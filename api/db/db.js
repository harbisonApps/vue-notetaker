const mongoose = require('mongoose')

//connect server to mongoDB
mongoose.connect(
    process.env.MONGO_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => { console.log('Connected to DB') }
)
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));