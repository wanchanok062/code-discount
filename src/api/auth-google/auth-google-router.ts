import { Router } from 'express';
import passport from 'passport';
import { googleOAuth } from './auth-google-controller';

const router = Router();
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    googleOAuth.googleCallback,
);
router.post('/google/logout', googleOAuth.logout);
export default router;
