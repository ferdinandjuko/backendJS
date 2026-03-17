const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            products: products
        });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            inStock: req.body.inStock
        });
        res.status(201).json({
            product: product
        });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.inStock = req.body.inStock;
        const result = await product.save();
        res.status(200).json({ product: result });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};