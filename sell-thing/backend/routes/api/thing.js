const express = require('express');
const router = express.Router();
const Thing = require('../../models/Thing');

router.route('/')
    .post((req, res) => {
        delete req.body._id;
        const thing = new Thing({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId,
            price: req.body.price
        });
        thing.save()
            .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
            .catch((error) => res.status(400).json({ error }));
    })
    .get((req, res) => {
        Thing.find().
            then((stuff) => {
                res.status(200).json(stuff);
            })
            .catch((error) => res.status(400).json({ error }));
    });

router.route('/:id').get((req, res) => {
    Thing.findOne({ _id: req.params.id })
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
});

module.exports = router;