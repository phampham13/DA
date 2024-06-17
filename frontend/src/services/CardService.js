import { axiosJWT } from "../utils/httpRequest";

export const getCard = async (id, token) => {
    const res = await axiosJWT.get(`card/${id}`, {
        headers: {
            token: `Bearer ${token}`,
        }
    })
    return res.data
}

export const updateCard = async (id, token, newBooks) => {
    const res = await axiosJWT.put(`card/${id}`, newBooks, {
        headers: {
            token: `Bearer ${token}`,
        }
    })
    return res.data
}