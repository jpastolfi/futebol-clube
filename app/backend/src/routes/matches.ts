import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();
const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAll(req, res));
router.use(Validations.validateToken);
router.patch(
  '/:id/finish',
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
