import axios from "axios";
import { createAuthHeader } from "../auth/authHeader";
const token = localStorage.getItem("token");
class ProductAPI {
  async getAllProduct(limit, page, sort) {
    let res = {};
    try {
      res = await axios.get(
        `${process.env.REACT_API_URL_BACKEND}/products/getAll?limit=${limit}&page=${page}&sort=asc&sort=${sort}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async getDetailProduct(id) {
    let res = {};
    try {
      res = await axios.get(
        `${process.env.REACT_API_URL_BACKEND}/products/getDetail/${id}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}
export const ApiProduct = new ProductAPI();
