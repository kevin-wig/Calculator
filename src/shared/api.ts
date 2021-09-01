import { API_BASE_URL } from './api.config';

export const get = async (url: string) => {
    return (await fetch(`${API_BASE_URL}/${url}`, { method: 'GET' })).json();
};

export const post = async (url: string, data?: any) => {
  return (await fetch(`${ API_BASE_URL }/${url}`, { method: 'POST', body: data })).json();
};

