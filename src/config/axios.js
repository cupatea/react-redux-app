import axios from 'axios'

export const baseURL = "http://ari-dar.herokuapp.com"
export default axios.create({
    baseURL: baseURL
})