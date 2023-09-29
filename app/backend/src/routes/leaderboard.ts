import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();
const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboardController.rankTeams(req, res));

export default router;
