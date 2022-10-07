import axios from 'axios';
import { checkEnvVariable } from './helpers/check-env-variable.helper';


export const qontakAxios = axios.create({
    baseURL: checkEnvVariable("QONTAK_CHAT_SERVICE_BASE_URL") || 'https://chat-service.qontak.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});