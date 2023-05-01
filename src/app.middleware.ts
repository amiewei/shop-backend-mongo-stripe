import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Connection } from 'mongoose';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly connection: Connection) {}
    use(req: Request, res: Response, next: NextFunction) {
        console.log('i am the logger middleware - class');
        console.log(this.connection.readyState);
        if (this.connection.readyState !== 1) {
            console.log('MongoDB connection is not ready');
        } else {
            console.log('MongoDB connection is ready');
        }

        next();
    }
}
