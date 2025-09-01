import axios from 'axios'
import React from 'react'

function UseAxios() {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api'
    })
  return axiosInstance;
}

export default UseAxios