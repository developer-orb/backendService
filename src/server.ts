import dotenv from 'dotenv';
import express,{ Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import routes from './routes/index'
import router from './routes/index';


dotenv.config()

const server = express()

server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req:Request, res: Response, next:NextFunction)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, x-Request-with, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, DELETE')
    next();
})

server.use('/', router)