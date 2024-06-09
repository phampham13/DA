import axios from "axios";

const axiosJWT = axios.create({
    baseURL: "http://localhost:8017",
    withCredentials: true,
});

export const createBorrowerSlip = async (token, data) => {
    const res = await axiosJWT.post(`borrowerSlip/create`, data, {
        headers: {
            token: `Bearer ${token}`,
        }
    })
    return res
}