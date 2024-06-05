import request from "../../utils/httpRequest";

export const verifyToken = async (token) => {
    const res = await request.post("/user/verify", { token });
    return res.data;
};
export const verifyTokenAdmin = async (token) => {
    const res = await request.post("/user/admin/verify", { token });
    return res.data;
};