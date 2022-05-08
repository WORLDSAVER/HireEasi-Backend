import {Router} from 'express';
import authRouter from './auth.route';
import verifyToken from "../middlewares/VerifyToken";

const router = Router();


const routes = [
    {
        path: '/auth.ts',
        route: authRouter
    },

];

for (const route of routes) {
    if (route.path === '/auth.ts') {
        router.use(route.path, route.route);
    } else {
        router.use(route.path, verifyToken, route.route);
    }
}



export default router;
