// import { serializeUser, deserializeUser, use } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import { Passport } from "passport";

const passport = new Passport();
const googleSecret = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `http://localhost:4001/google/callback`,
};
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(googleSecret, function (
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    console.log("refreshToken => " + refreshToken);
    return done(null, { accessToken, refreshToken, profile });
  })
);
export default passport;
