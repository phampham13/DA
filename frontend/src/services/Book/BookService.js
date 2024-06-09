import axios from "axios";
import { createAuthHeader } from "../auth/authHeader";
const token = localStorage.getItem("token");
class APIBOOK {
  async getAllBook(limit, page, sort) {
    let res = {};
    try {
      res = await axios.get(
        `${process.env.REACT_API_URL_BACKEND}/books/getAll?limit=${limit}&page=${page}&sort=asc&sort=${sort}`
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
      res = await axios.put(
        `${process.env.REACT_API_URL_BACKEND}/books/update/${id}`,
        body,
        {
          headers: createAuthHeader(token),
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async DeleteBook(id) {
    let res = {};
    try {
      res = await axios.delete(
        `${process.env.REACT_API_URL_BACKEND}/books/delete/${id}`,
        {
          headers: createAuthHeader(token),
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async DeleteManyBook(ids) {
    let res = {};
    try {
      const body = {
        ids: ids,
      };
      res = await axios.post(
        `${process.env.REACT_API_URL_BACKEND}/books/delete-many`,
        body,
        {
          headers: createAuthHeader(token),
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async AddBook(body) {
    let res = {};
    try {
      res = await axios.post(
        `${process.env.REACT_API_URL_BACKEND}/books/create`,
        body,
        {
          headers: createAuthHeader(token),
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async getAllCate() {
    let res = {};
    try {
      res = await axios.get(
        `${process.env.REACT_API_URL_BACKEND}/bookCategories/getAll`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}

export const ApiBOOK = new APIBOOK();
