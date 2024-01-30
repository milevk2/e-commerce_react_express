import { VITE_API_URL } from './host.js'

function callUtilityService(endpoint) {

    return fetch(`${VITE_API_URL}/${endpoint}`);

}

export default callUtilityService;