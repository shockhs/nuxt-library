const User = require('../../models/User')
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).end('You need to login first')
    }
    const decodedTokenData = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    const userRecord = await User.findOne({ _id: decodedTokenData._id })

    req.currentUser = { _id: userRecord._id, username: userRecord.name, email: userRecord.email, group: userRecord.group };

    if (!userRecord) {
        return res.status(401).end('User not found')
    } else return next();

}