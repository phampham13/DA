import axios from 'axios'
import dayjs from 'dayjs'
import { useContext } from 'react'
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../contexts/AuthContext'
import { refreshToken } from '../services/UserService'

const useAxios = () => {
    const { token, setUser, setToken, handleDecoded } = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL: `${process.env.REACT_API_URL_BACKEND}`,
        headers: { token: `Bearer ${token}` }
    });


    axiosInstance.interceptors.request.use(async req => {

        const { decoded, a_token, r_token } = handleDecoded()

        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))

        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

    return axiosInstance
}

export default useAxios;