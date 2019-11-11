import { Router } from 'express';
import middlewares from '../middlewares';
import controllers from '../controllers';

const router = Router();
const { Auth } = middlewares;
const { AuthController } = controllers;

router.post(
  '/register',
  Auth.userExists,
  AuthController.create
);

export default router;
