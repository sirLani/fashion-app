import { expressjwt as jwt } from 'express-jwt';
import { env } from '../config/config';

export const requireSignin = jwt({
   secret: env.JWT_SECRET!,
   algorithms: ['HS256']
});
