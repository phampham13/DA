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