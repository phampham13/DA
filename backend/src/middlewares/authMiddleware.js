const jwt = require('jsonwebtoken')
import { env } from '~/config/environment'

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, env.SECRET_KEY, function (err, user) { //user gom ca iat
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
    //const token = req.cookies.token
    //const userId = req.params.id || decode.payload.id 
    if (token) {
        jwt.verify(token, env.SECRET_KEY, function (err, user) {
            if (err) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'The authemtication'
                })
            }
            //const decode = jwt.verify(token, env.SECRET_KEY)
            const { payload } = user
            if (payload.id) {
                next()
            }
            else {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'The authemtication'
                })
            }
        })
    } else {
        res.json({
            message: "chưa đăng nhập",
            errCodeCheckLogin: 1,
        })
    }
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}
