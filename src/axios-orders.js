import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-test-fb8cb.firebaseio.com/'
});

export default instance;