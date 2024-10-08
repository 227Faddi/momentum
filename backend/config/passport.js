import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';


export default function(passport){
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
        },
        async (accessToken, refreshToken, email, done) => {
            const newUser = {
                googleId: email.id,
                username: email.displayName,
                email: email.emails[0].value,
                points: 0,
            }
            try{
                let user = await User.findOne({ googleId: email.id })
                if(user){
                    done(null, user)
                } else{
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch(err){
                console.error(err)
            }
        }
      )
    )

    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile)
                console.log(profile.login)

                const newUser = {
                    githubId: profile.id,
                    username: profile.username,
                }
                try{
                    let user = await User.findOne({ githubId: profile.id })
                    if(user){
                        done(null, user)
                    } else{
                        user = await User.create(newUser)
                        done(null, user)
                    }
                } catch(err){
                    console.error(err)
                }
            }
        )
    )
  
  
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
  
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id).exec();
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}