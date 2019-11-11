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

router.post(
  '/login_with_username',
  AuthController.loginWithUsername
);

router.post(
  '/login_with_email',
  AuthController.loginWithEmail
);

export default router;
