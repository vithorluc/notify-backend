import { DataSource } from "typeorm";
import { CategorySeeder } from "./CategorySeeder";
import { NotificationTypeSeeder } from "./NotificationTypeSeeder";
import { UserSeeder } from "./UserSeeder";

export class Seeder {
  static async run(dataSource: DataSource) {
    await new CategorySeeder().run(dataSource);
    await new NotificationTypeSeeder().run(dataSource);
    await new UserSeeder().run(dataSource);
  }
}
