import { logout } from '../src/services/userService.js'
import { VITE_API_URL } from './services/host.js';

window.addEventListener('unload', async ()=> {
    
    const logOutUrl = `${VITE_API_URL}/users/logout`;
    const token = sessionStorage.getItem('authToken');
    sessionStorage.removeItem('authToken');
    if (token) navigator.sendBeacon(logOutUrl, {'authToken': token });
    window.location.href= '/';
})
   
    