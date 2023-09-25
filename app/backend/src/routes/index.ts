import { Router } from 'express';
import teamsRouter from './teams';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
