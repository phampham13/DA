import { req, axiosJWT } from "../utils/httpRequest"

export const createPayment = async (data) => {
    try {
        const res = await req.post(`momo/create-payment`, data)
        return res.data
    } catch (err) {
        throw err
    }
}