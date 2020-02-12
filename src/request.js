 export const request = async (url, config = {}) => {
            const request = await fetch(url, {
              ...config,
              headers: {
                ...config.headers,
                Authorization: localStorage && `Bearer ${localStorage.getItem('token')}`
              }
            });
            return await request.json();
          };