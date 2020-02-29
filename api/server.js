const express = require('express');
require('dotenv/config');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');

//models
const Note = require('./Note');

//connect server to mongoDB
mongoose.connect(
    process.env.MONGO_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => { console.log('Connected to DB')}
)
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// eslint-disable-next-line no-unused-vars
app.get('/api/note/list', (req, res) => {
    Note.find({}).sort({updatedAt: 'descending'}).exec((err, notes) => {
        if (err) return res.status(404).send('Error getting Notes');

        else return res.send(notes)
    })
})

app.post('/api/note/create', (req, res) => {
    const note = new Note({ 
        body: req.body.body, 
        title: req.body.title 
    });
    note.save((err) => {
        if (err) return res.status(404).send({ message: err.message });

        return res.status(200).send({ message: 'note created', note });
    });
});

app.patch('/api/note/update/:id', (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, note) => {
        if (err) return res.status(404).send({ message: err.message });
        
        return res.status(200).send({ message: 'note updated!', note });
    });
});

app.delete('/api/note/delete/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.status(404).send({ message: err.message });
        return res.send({ message: 'note deleted' });
    });
});

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');