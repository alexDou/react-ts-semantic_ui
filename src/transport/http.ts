import axios from 'axios';

const http = () =>
    // config defaults. all optional
    // auth, timeouts, headers, proxy, etc
    axios.create({
        timeout: 4000,
        headers: {}
    });

export default http;
