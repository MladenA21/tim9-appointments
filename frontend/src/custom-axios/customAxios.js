import axios from "axios";

const instance = axios.create({
    baseURL: 'https://tim9.smetkovodstvo.com/',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})
export default instance;