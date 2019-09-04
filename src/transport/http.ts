import axios, { AxiosInstance } from 'axios';

const http = (): AxiosInstance =>
    // config defaults. all optional
    // auth, timeouts, headers, proxy, etc
    axios.create({
        timeout: 4000,
        headers: {}
    });

export default http;
