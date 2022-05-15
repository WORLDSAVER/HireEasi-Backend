import {Router} from 'express';
import authRouter from './auth.route';
import verifyToken from "../middlewares/VerifyToken";

const router = Router();


const routes = [
    {
        path: '/auth',
        route: authRouter
    },

];

for (const route of routes) {
    if (route.path === '/auth') {
        router.use(route.path, route.route);
    } else {
        router.use(route.path, verifyToken, route.route);
    }
}



export default router;
