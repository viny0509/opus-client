/* eslint-disable no-undef */
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API,
})

export default axiosInstance
