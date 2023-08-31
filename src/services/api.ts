import axios, { AxiosResponse } from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
})

axiosInstance.interceptors.request.use(req => {
    return req
})

const api = {
    get(...params: Parameters<typeof axiosInstance.get>) {
        return new Promise<AxiosResponse>(resolve => {
            setTimeout(() => {
                axiosInstance.get(...params).then(resolve)
            }, 2000)
        })
    },
}

export default api
