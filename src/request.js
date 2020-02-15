         const getHeaders = (headers) => {
            const token = localStorage.getItem('token');
            return {
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
              ...headers,
            }
          };
           
          export const request = async (url, config = {}) => {
            const request = await fetch(url, { ...config, headers:
            getHeaders(config.headers)});
            return await request.json();
          };