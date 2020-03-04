const Fact = require('../models/Fact')

exports.getAllFacts = (req, res) => {
    Fact.find({}).exec((err, facts) => {
        if (err)
            return res.status(404).send('Error while getting notes!');

        return res.send({ facts });
    });
}

exports.factCreate = (req, res) => {
    const fact = new Fact({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        fullText: req.body.fullText,
        imageUrl: req.body.imageUrl,
        slug: req.body.slug
    });
    fact.save((err) => {
        if (err) return res.status(404).send({ message: err.message });

        return res.status(200).send({ message: 'note created', fact });
    });
}

exports.factUpdate = (req, res) => {
    Fact.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, fact) => {
        if (err) return res.status(404).send({ message: err.message });

        return res.status(200).send({ message: 'fact updated!', fact });
    });
}

exports.factDelete = (req, res) => {
    Fact.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.status(404).send({ message: err.message });
        return res.send({ message: 'fact deleted' });
    })
}