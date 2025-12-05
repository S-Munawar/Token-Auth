import { Router } from 'express';
import { Login, Register } from '../controllers/auth';


const router: Router = Router();

router.post('/register', Register);
router.post('/login', Login);

export default router;