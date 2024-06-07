import dotenv from 'dotenv';
import { App } from './app';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const startServer = async () => {
  const app = new App(port);
  app.listen();
};

startServer();