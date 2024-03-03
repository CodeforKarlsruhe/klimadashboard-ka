const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/klimadashboard-ka' : '';
export default basePath