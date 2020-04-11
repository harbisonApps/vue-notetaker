const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const port = process.env.PORT
require('./db/db')

//models
const Note = require('./models/Note');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Setting up the static directory
app.use(express.static(path.join(__dirname, '../public')));

// eslint-disable-next-line no-unused-vars
app.get('/api/note/list', (req, res) => {
    Note.find({}).sort({ updatedAt: 'descending' }).exec((err, notes) => {
        if (err)
            return res.status(404).send('Error while getting notes!');

        return res.send({ notes });
    });
});

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

app.post('/api/note/update/:id', (req, res) => {
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


const userRoutes = require('./routes/useRoute'); //bring in our user routes
const factRoutes = require('./routes/factRoute')
app.use('/user', userRoutes);
app.use('/fact', factRoutes)

app.listen(port);
console.log('api running on port :' + port);