const Thing = require('../models/Thing');
const fs = require('fs');

const getAllStuff = async (req, res) => {
    try {
        const things = await Thing.find();
        if (!things) {
            return res.status(404).json({ message: 'No things found' });
        }
        res.json(things);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const createStuff = async (req, res) => {
    const stuff = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    try {
        const thing = await Thing.create({
            title: stuff.title,
            description: stuff.description,
            imageUrl: `${url}/images/${req.file.filename}`,
            userId: req.auth.userId,
            price: stuff.price
        });
        res.status(201).json({ thing });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getOneStuff = async (req, res) => {
    try {
        const thing = await Thing.findOne({ _id: req.params.id });
        if (!thing) {
            return res.status(404).json({ message: 'Thing not found' });
        }
        res.status(200).json(thing);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateStuff = async (req, res) => {
    try {
        const thing = await Thing.findOne({ _id: req.params.id });
        if (!thing) {
            return res.status(404).json({ message: 'Thing not found' });
        }
        if (thing.userId != req.auth.userId) {
            res.status(401).json({ message: 'Unauthorized' });
        }
        const url = req.protocol + '://' + req.get('host');
        if (!req.file) {
            thing.title = req.body.title;
            thing.description = req.body.description;
            thing.userId = req.auth.userId;
            thing.price = req.body.price;
        } else {
            const stuff = JSON.parse(req.body.thing);
            thing.title = stuff.title;
            thing.description = stuff.description;
            thing.userId = req.auth.userId;
            thing.imageUrl = `${url}/images/${req.file.filename}`;
        }
        await thing.save();
        res.status(200).json({ thing });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteStuff = async (req, res) => {
    console.log(req.params);
    try {
        const thing = await Thing.findOne({ _id: req.params.id });
        if (!thing) {
            return res.status(404).json({ message: 'Thing not found' });
        }
        if (req.auth.userId != thing.userId) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const filename = thing.imageUrl.split('images')[1];

        const result = await thing.deleteOne();
        console.log(result);

        res.status(200).json({ message: 'Thing deleted' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getAllStuff,
    getOneStuff,
    createStuff,
    updateStuff,
    deleteStuff
}