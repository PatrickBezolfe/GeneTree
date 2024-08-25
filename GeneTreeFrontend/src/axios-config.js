import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3030',
    defaults: {
        headers: {
            post: {
                'Content-Type': 'application/json'
            }
        }
    }
});

export default instance;