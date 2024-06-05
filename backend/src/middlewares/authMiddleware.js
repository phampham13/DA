const jwt = require('jsonwebtoken')
import { env } from '~/config/environment'

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, env.SECRET_KEY, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            })
        }
        const { payload } = user
        if (payload.role === 'admin') {
            next()
        }
        else {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            })
        }
    });
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, env.SECRET_KEY, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            })
        }
        const { payload } = user
        if (payload.id === userId) {
            next()
        }
        else {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            })
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}
