import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerapp-de7d1-default-rtdb.firebaseio.com/',
});

export default instance;