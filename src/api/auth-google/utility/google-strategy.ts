import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
} from '../../../config';
import { authService } from '../auth_google-service';
import { generateToken } from '../../auth/generateToken';

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!,
            callbackURL: GOOGLE_CALLBACK_URL!,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userProfile = {
                    id: profile.id,
                    displayName: profile.displayName,
                    emails:
                        profile.emails && profile.emails.length > 0
                            ? profile.emails[0].value
                            : null,
                };

                if (!userProfile.emails) {
                    console.error('No email found in profile');
                    return done(new Error('No email found in user profile'));
                }

                await authService.saveGoogleUser(userProfile);
                const { emails, id } = userProfile;

                const token = generateToken(id, emails);

                return done(null, {
                    customer_id: id,
                    token,
                });
            } catch (error) {
                console.error('Error during Google authentication:', error);
                return done(error);
            }
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});
