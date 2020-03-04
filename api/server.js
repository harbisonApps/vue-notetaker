const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

//models
const Note = require('./models/Note');
//const Fact = require('./models/Fact');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Seting up the static directory
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

// eslint-disable-next-line no-unused-vars
// app.get('/api/fact/list', (req, res) => {
//     Fact.find({}).exec((err, facts) => {
//         if (err)
//             return res.status(404).send('Error while getting notes!');

//         return res.send({ facts });
//     });
// });

// app.post('/api/fact/create', (req, res) => {
//     const fact = new Fact({
//         name: req.body.name,
//         category: req.body.category,
//         description: req.body.description,
//         fullText: req.body.fullText,
//         imageUrl: req.body.imageUrl,
//         slug: req.body.slug
//     });
//     fact.save((err) => {
//         if (err) return res.status(404).send({ message: err.message });

//         return res.status(200).send({ message: 'note created', fact });
//     });
// });

// app.post('/api/fact/update/:id', (req, res) => {
//     Fact.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, fact) => {
//         if (err) return res.status(404).send({ message: err.message });

//         return res.status(200).send({ message: 'fact updated!', fact });
//     });
// });

// app.delete('/api/fact/delete/:id', (req, res) => {
//     Fact.findByIdAndRemove(req.params.id, (err) => {
//         if (err) return res.status(404).send({ message: err.message });
//         return res.send({ message: 'note deleted' });
//     });
// });

const userRoutes = require('./routes/useRoute'); //bring in our user routes
const factRoutes = require('./routes/factRoute')
app.use('/user', userRoutes);
app.use('/fact', factRoutes)

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

const PORT = 5000

app.listen(PORT);
console.log('api runnging on port :' + PORT);