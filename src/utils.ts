import Cookies from 'js-cookie';
import axios from 'axios';

export const request = {
    get: (url: string) => axios.get(url),
    post: (url: string, body: any) => axios.post(url, body, {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }),
    put: (url: string, body: any) => axios.put(url, body, {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }),
    delete: (url: string) => axios.delete(url, {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    })
}