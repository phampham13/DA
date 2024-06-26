import { axiosJWT } from "../utils/httpRequest";

export const revenueStatistic = async (token, id) => {
    try {
        const res = await axiosJWT.get(`order/revenue/${id}`, {
            headers: {
                token: `Bearer ${token}`,
            }
        })
        return res.data
    } catch (err) {
        console.log("err:", err);
        throw err
    }
}

export const createOrder = async (token, data) => {
    try {
        const res = await axiosJWT.post(`order/create`, data, {
            headers: {
                token: `Bearer ${token}`,
            }
        })
        return res.data
    } catch (err) {
        console.log("err", err);
        throw err
    }
}

