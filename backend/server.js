import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from './config/database.js';
import passportConfig from './config/passport.js'
// Routes
import goalRoutes from './routes/goal.js';
import authRoutes from './routes/auth.js';

dotenv.config({path: './config/.env'})
const app = express()
connectDB()

// Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: 'GET, POST, PUT, DELETE',
        credentials: true,
    })
)

// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    cookie: {
        secure: true, //Enable when deployment OR when not using localhost, this wont work without https
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "none", //Enable when deployment OR when not using localhost, We're not on the same site, we're using different site so the cookie need to effectively transfer from Backend to Frontend
    }
}))
  
// Passport
passportConfig(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/goals', goalRoutes)
app.use('/auth', authRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    