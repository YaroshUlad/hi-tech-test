import axios, {AxiosInstance} from 'axios';

export const instance: AxiosInstance = axios.create({
	baseURL: 'http://worldtimeapi.org/api/timezone/',
});