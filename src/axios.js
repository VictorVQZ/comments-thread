import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/VictorVQZ/comments-thread'
});

export default instance;