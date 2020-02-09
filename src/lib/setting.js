
export const ENV_MODE = process.env.NODE_ENV;
export const ENV_MODE_DEV = process.env.NODE_ENV === 'development';
export const ENV_MODE_POD = process.env.NODE_ENV === 'production';

export const api_address = ENV_MODE_DEV?`http://127.0.0.1:9999` :`http://127.0.0.1:9999`;