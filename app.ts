import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./src/presentention/routes/routes";
import AppDataSource from "./src/infrastructure/database/ormconfig";
import { connectToRedis } from "./src/infrastructure/queue/connection";
import { Seeder } from "./src/infrastructure/database/seeders/runSeeders";

export class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeDatabase();
    this.initializeRoutes();
    this.initializeRedis();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private async initializeDatabase(): Promise<void> {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        await AppDataSource.initialize();
        console.log("Database connection established");
        await Seeder.run(AppDataSource);
        console.log("Database seeders successful");
        return;
      } catch (error) {
        retries++;
        console.error(`Database connection error (attempt ${retries}):`, error);
        if (retries < maxRetries) {
          console.log(`Retrying in ${retries * 2} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, retries * 2000));
        } else {
          console.error("Max retries reached. Exiting...");
          process.exit(1);
        }
      }
    }
  }

  private async initializeRedis(): Promise<void> {
    try {
      await connectToRedis();
      console.log("Redis connection established");
    } catch (error) {
      console.error("Redis connection error:", error);
      process.exit(1);
    }
  }

  private initializeRoutes(): void {
    this.app.use("/api", router);
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Olá");
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
