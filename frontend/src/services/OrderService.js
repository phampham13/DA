import axios from "axios";

const axiosJWT = axios.create({
    baseURL: "http://localhost:8017",
    withCredentials: true,
});

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