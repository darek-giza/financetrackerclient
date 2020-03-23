import config from '../config';

const { REACT_APP_LOCAL } = process.env;

const BASE_URL = REACT_APP_LOCAL
  ? config.baseUrl.development
  : config.baseUrl.production;

const getHeaders = headers => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };
};

export const request = async (url, config = {}) => {
  const request = await fetch(`${BASE_URL}${url}`, {
    ...config,
    headers: getHeaders(config.headers),
  });
  if (request.ok) {
    return await request.json();
  }

  if (request.status === 401 && window.location.pathname !== '/signin') {
    window.location.replace('/signin');
  }

  throw new Error('API error');
};
