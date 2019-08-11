import { APIConfig } from '@t/app';

const apiConfig: APIConfig = {
    apiBaseUrl: 'https://api.github.com',
    repos: '/search/repositories',
    q: '?q',
    sort: '&sort',
    per_page: '&per_page',
    page: '&page',
    defaults: {
        sort: 'starts&order=desc',
        per_page: 10
    }
};

export default apiConfig;
