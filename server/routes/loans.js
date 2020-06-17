const router = require('express').Router()
const Loan = require('../models/Loan')
const Book = require('../models/Book')
const isActiveUser = require('./middleware/isActiveUser')


router.get('/book=?:book', async (req, res) => {
    const loansExist = await Loan.find({ book: req.params.book })
    if (!loansExist) return res.status(404).send({ error: `Loans don't exist`, resultCode: 10 });

    for (let i = 0; i < loansExist.length; i++) {
        if (new Date(loansExist[i].dueDate) < Date.now()) {
            if (loansExist[i].status !== 'overdue') {
                Loan.findOneAndUpdate(
                    { _id: loansExist[i]._id },
                    { $set: { status: 'overdue' } },
                    { new: true, overwrite: true },
                    function (err) {
                        if (err)
                            console.log(err);
                    })
            }
        }
    }
    try {
        res.send(loansExist)
    } catch (err) {
        res.status(400).send(err);
    }
})


router.get('/', isActiveUser, async (req, res) => {
    const loansExist = await Loan.find({ member: req.currentUser._id })
    if (!loansExist) return res.status(404).send({ error: `Loans don't exist`, resultCode: 10 });
    for (let i = 0; i < loansExist.length; i++) {
        if (new Date(loansExist[i].dueDate) < Date.now()) {
            if (loansExist[i].status !== 'overdue') {
                Loan.findOneAndUpdate(
                    { _id: loansExist[i]._id },
                    { $set: { status: 'overdue' } },
                    { new: true, overwrite: true },
                    function (err, result) {
                        if (!err)
                            loansExist[i] = result
                    })
            }
        }
    }
    try {
        res.send(loansExist)
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/close', isActiveUser, async (req, res) => {
    let { loanId, returnDate } = req.body
    returnDate = new Date(returnDate)
    try {
        Loan.findOneAndUpdate(
            { _id: loanId, member: req.currentUser._id },
            { $set: { returnDate: returnDate, status: 'closed' } },
            { new: true, overwrite: true }, function (error, result) {
                if (!error) {
                    res.send({ message: 'Loan is closed', status: 200 })
                    Book.findOneAndUpdate(
                        { _id: result.book },
                        { $inc: { stock: -1 } },
                        { new: true, overwrite: true },
                        function (err) {
                            if (err)
                                console.log(err);
                        })
                }
            })
    } catch (err) {
        res.status(400).send(err);
    }
})


router.delete('/loanId=?:loanId', isActiveUser, async (req, res) => {
    let loanId = req.params.loanId
    const loanExist = await Loan.findOne({ _id: loanId, member: req.currentUser._id })
    if (!loanExist) return res.status(404).send({ error: `Loan doesn't exist`, resultCode: 10 });

    try {
        await loanExist.remove();
        res.status(200).send({ message: `Loan deleted`, status: 200 })
    } catch (err) {
        res.status(400).send(err);
    }
})


router.post('/create', isActiveUser, async (req, res) => {
    let { book, issueDate, dueDate } = req.body
    issueDate = new Date(issueDate)
    dueDate = new Date(dueDate)
    const member = req.currentUser._id
    if (issueDate > dueDate) {
        return res.status(400).send('Bad request')
    }
    const bookExist = await Book.findOne({ _id: book })
    if (bookExist.stock < bookExist.numberOfCopies) {
        Book.findOneAndUpdate(
            { _id: book },
            { $inc: { stock: 1 } },
            { new: true, overwrite: true },
            function (err) {
                if (err)
                    console.log(err);
            })
        const loan = new Loan({
            book: book,
            title: bookExist.title,
            member: member,
            issueDate: issueDate,
            dueDate: dueDate,
            returnDate: null,
            status: 'inProgress'
        });
        try {
            const savedLoan = await loan.save();
            res.send(savedLoan)
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(400).send({ message: 'No free copies in base' });
    }

})


module.exports = router;