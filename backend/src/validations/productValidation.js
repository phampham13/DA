const Joi = require('joi');
import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().required().min(3).max(50).trim().strict(),
        description: Joi.string().required().min(3).max(256).trim().strict(),
    })

    try {
        console.log(req.body)

        await correctCondition.validateAsync(req.body, { abortEarly: false }) // tham số thứ hai không bắt buộc trả về nếu nhiều lỗi đồng thời
        //next()
        res.status(StatusCodes.CREATED).json({ message: 'pd post ready to use' })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message
        })
    }

}

export const productValidation = {
    createNew
}