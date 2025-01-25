
// const DEV_URL = `http://localhost:5000/`
const PROD_URL = `https://backend-express-zeta.vercel.app`


export const BASE_URL = PROD_URL

export const ApiRoutes = {
    login: BASE_URL + '/api/auth/login',
    register: BASE_URL + '/api/auth/register',
}