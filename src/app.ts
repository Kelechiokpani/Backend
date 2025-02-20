import express, {CookieOptions, NextFunction, Request, Response, Application} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from "http";
import {FRONT_END_DOMAIN, isDev, MONGO_URL, PORT,} from "./helpers/config.js";
// import {config} from "dotenv";
import db from "./db/index.js";
import {Document} from "mongoose";
import { IUser } from "./models/user/User.js";
import routes from './routes/index.js';
import dotenv from 'dotenv';


dotenv.config();

declare global {
    type LeanDocument<T> = T & Document;
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

// config()
// const app = express();

// Initialize Express app
const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cookieParser());


// Setup MongoDB connection
new db(console).connect(MONGO_URL as string);


// CORS configuration
const origin = [
    "https://sdash.mynncapp.com",
    "https://sdash-staging.mynncapp.com",
];

if (isDev) {
    origin.push("http://localhost:3000", "http://localhost:3001");
}

const corsOptions = {
    origin,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
};

app.use(cors<cors.CorsRequest>(corsOptions));


// Define routes
app.use('/api', routes);

// Basic route for health check
app.get('/', (req: Request, res: Response) => {
    res.send('Server health check!');
});


const httpServer = http.createServer(app);


await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
);

console.log(`🚀 Server ready at http://localhost:${PORT}`);
