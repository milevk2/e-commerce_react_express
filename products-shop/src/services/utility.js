import { VITE_API_URL } from './host.js'

function callUtilityService(endpoint) {

    return fetch(`${VITE_API_URL}/api/${endpoint}`);
}

export default callUtilityService;