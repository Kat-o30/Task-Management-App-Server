// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/auth/google/callback"
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Find or create a user in your database
//     let user = await GoogleLogin.findOne({ googleId: profile.id });
//     if (!user) {
//       user = await new GoogleLogin({
//         googleId: profile.id,
//         email: profile.emails[0].value,
//         name: profile.displayName
//       }).save();
//     }
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await GoogleLogin.findById(id);
//   done(null, user);
// });
