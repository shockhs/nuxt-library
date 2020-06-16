const router = require('express').Router()
const Loan = require('../models/Loan')
const isActiveUser = require('./middleware/isActiveUser')


router.get('/book=?:book', async (req, res) => {
    const loansExist = await Loan.find({ book: req.params.book })
    if (!loansExist) return res.status(400).send({ error: `Loans don't exist`, resultCode: 10 });

    for (let i = 0; i < loansExist.length; i++) {
        if (new Date(loansExist[i].dueDate) < Date.now()) {
            if (loansExist[i].status !== 'overdue') {
                Loan.findOneAndUpdate(
                    { _id: loansExist[i]._id },
                    { $set: { status: 'overdue' } },
                    { new: true, overwrite: true },
                    function (err) {
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
    if (!loansExist) return res.status(400).send({ error: `Loans don't exist`, resultCode: 10 });
    for (let i = 0; i < loansExist.length; i++) {
        if (new Date(loansExist[i].dueDate) < Date.now()) {
            if (loansExist[i].status !== 'overdue') {
                Loan.findOneAndUpdate(
                    { _id: loansExist[i]._id },
                    { $set: { status: 'overdue' } },
                    { new: true, overwrite: true },
                    function (err) {
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

router.post('/close', isActiveUser, async (req, res) => {
    let { loanId, returnDate } = req.body
    returnDate = new Date(returnDate)
    try {
        const loan = Loan.findOneAndUpdate(
            { _id: loanId },
            { $set: { status: 'closed', returnDate: returnDate } },
            { new: true, overwrite: true })
        res.status(200).send(loan)
    } catch (err) {
        res.status(400).send(err);
    }
})


router.post('/create', isActiveUser, async (req, res) => {
    let { book, issueDate, dueDate } = req.body
    issueDate = new Date(issueDate)
    dueDate = new Date(dueDate)
    const member = req.currentUser._id
    if (issueDate > dueDate || issueDate < Date.now() || dueDate < Date.now()) {
        return res.status(400).send('Bad request')
    }
    const loan = new Loan({
        book: book,
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
})


module.exports = router;