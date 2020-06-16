const router = require('express').Router()
const Book = require('../models/Book')
const isActiveUser = require('./middleware/isActiveUser')


router.get('/', async (req, res) => {
    const listOfBooks = await Book.find()
    try {
        res.status(200).send(listOfBooks)
    } catch (err) {
        res.status(400).send(err);
    }
})

router.get('/id=?:id', async (req, res) => {
    const bookExist = await Book.findOne({ _id: req.params.id })
    if (!bookExist) return res.status(400).send({ error: `Book doesn't exist`, resultCode: 10 });

    try {
        res.send(bookExist)
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/add', isActiveUser, async (req, res) => {
    const newBook = req.body
    const book = new Book({
        ...newBook,
        stock: 0,
        status: 'available'
    });

    try {
        const savedBook = await book.save();
        res.send(savedBook)
    } catch (err) {
        res.status(400).send(err);
    }
})


module.exports = router;