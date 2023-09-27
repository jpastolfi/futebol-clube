import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/verifyLogin';

const userController = new UserController();
const router = Router();

router.post('/', Validations.verifyLogin, (req: Request, res: Response) => {
  userController.findByEmail(req, res);
});

export default router;
