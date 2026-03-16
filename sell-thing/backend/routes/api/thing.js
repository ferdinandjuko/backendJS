const express = require('express');
const router = express.Router();
const Thing = require('../../models/Thing');

router.route('/stuff')
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
    .get((req, res, next) => {
        const stuff = [
            {
                _id: 'oeihfzeoi',
                title: 'Mon premier objet',
                description: 'Les infos de mon premier objet',
                imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
                price: 4900,
                userId: 'qsomihvqios',
            },
            {
                _id: 'oeihfzeomoihi',
                title: 'Mon deuxième objet',
                description: 'Les infos de mon deuxième objet',
                imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
                price: 2900,
                userId: 'qsomihvqios',
            },
        ];
        res.status(200).json(stuff);
    })
    ;

module.exports = router;