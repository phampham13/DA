import axios from "axios";
import { createAuthHeader } from "../auth/authHeader";
const token = localStorage.getItem("token");
class APIBOOK {
  async getAllBook(limit, page, sort) {
    let res = {};
    try {
      res = await axios.get(
        `http://localhost:8017/books/getAll?limit=${limit}&page=${page}&sort=asc&sort=${sort}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async UpdateBook(id, body) {
    let res = {};
    try {
      res = await axios.put(`http://localhost:8017/books/update/${id}`, body, {
        headers: createAuthHeader(token),
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}

export const ApiBOOK = new APIBOOK();
