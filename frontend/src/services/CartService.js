import { axiosJWT } from "../utils/httpRequest";

export const getCart = async (id, token) => {
    const res = await axiosJWT.get(`cart/${id}`, {
        headers: {
            token: `Bearer ${token}`,
        }
    })
    return res.data
}