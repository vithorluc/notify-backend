import "dotenv";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  migrations: ["src/infrastructure/database/migrations/*.ts"],
  entities: ["src/infrastructure/database/entities/*.ts"],
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
});

export default AppDataSource;
