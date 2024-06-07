import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig";
import { NotificationLog } from "../entities/NotificationLog";

export class NotificationLogRepository {
  private repository: Repository<NotificationLog>;

  constructor() {
    this.repository = AppDataSource.getRepository(NotificationLog);
  }

  async save(notificationLog: NotificationLog): Promise<NotificationLog> {
    return this.repository.save(notificationLog);
  }

  async findAllSortedByTimestamp(): Promise<NotificationLog[]> {
    return this.repository.find({
      order: {
        timestamp: "DESC",
      },
      relations: ["user", "category", "notificationType"],
    });
  }
}
