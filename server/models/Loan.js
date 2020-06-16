const mongoose = require('mongoose');


const loanSchema = new mongoose.Schema({
    book: {
        type: String,
        required: true,
    },
    member: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['inProgress', 'overdue', 'closed']
    }
})

module.exports = mongoose.model('Loan', loanSchema)