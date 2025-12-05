import express, { NextFunction, Request, Response } from 'express';
import os from 'os';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import initDB from './app/config/db';

const app = express();

// parser
app.use(express.json());
app.use(express.urlencoded());

// initializing DB
initDB();

app.get('/', (req: Request, res: Response, _next: NextFunction) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Welcome to Vehicle Rental System',
    version: '1.0.0',
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60
      )} minutes`,
    },
    developerContact: {
      email: 'almamunrub@gmail.com',
      website: 'https://mamunrub.web.app',
    },
  });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
