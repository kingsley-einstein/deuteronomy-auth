import { Router } from 'express';
import AuthRouter from './auth';

const router = Router();

router.use('/auth', AuthRouter);

router.get('/', (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: 'The Deuteronomy Auth API'
  });
});

export default router;
