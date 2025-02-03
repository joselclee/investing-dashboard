import axios from 'axios';

export default axios.create({
    baseURL: 'http://ec2-3-94-107-189.compute-1.amazonaws.com:5000/',
    headers: {"skip-browser-warning": "true"}
});