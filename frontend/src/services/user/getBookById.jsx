//import request from "../utils/httpRequest";

export const getBookById = async (id) => {
    try {
        /*const res = await request.get(`/book/${id}`, {
          params: {},
        });
        return res.data;*/
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    } catch (error) {
        console.log("getOneProduct " + error);
    }
};