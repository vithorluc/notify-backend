import { Repository } from "typeorm";
import { AppDataSource } from "../ormconfig";
import { NotificationType } from "../entities/NotificationType";

export class NotificationTypeRepository {
  private repository: Repository<NotificationType>;

  constructor() {
    this.repository = AppDataSource.getRepository(NotificationType);
  }

  async findOneById(id: number): Promise<NotificationType | null> {
    return this.repository.findOneBy({ id });
  }

  async save(notificationType: NotificationType): Promise<NotificationType> {
    return this.repository.save(notificationType);
  }
}
