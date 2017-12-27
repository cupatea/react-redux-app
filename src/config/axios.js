import axios from 'axios'

export const baseURL = "http://snowdrop-server.herokuapp.com/"
export default axios.create({
    baseURL: baseURL
})