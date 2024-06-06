import axios from "axios";

const axiosJWT = axios.create({
    baseURL: "http://localhost:8017",
    withCredentials: true,
});

export const getDetailsUser = async ({ id, token }) => {
    const res = await axiosJWT.get(`users/get-detail/${id}`, {
        headers: {
            token: `Bearer ${token}`,
        }
    },)
    return res.data
}

