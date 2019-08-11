import config from '@api/api.config';
import { SearchRepositories } from '@t/app';
import { http } from '../transport';

const transport = http();

/** API endpoints */
const requests: SearchRepositories = {
    /**
     * Get data from Github by query
     * @param query {string} search query
     * @return {Promise}
     */
    search_repos: (
        query,
        page = 1,
        orderBy = config.defaults.sort,
        per_page = config.defaults.per_page
    ) => {
        const reqUrl = `${config.q}=${query}${config.sort}=${orderBy}${config.page}=${page}${config.per_page}=${per_page}`;
        const url = `${config.apiBaseUrl}${config.repos}` + encodeURI(reqUrl);

        return transport.get(url);
    }
};

export default requests;
