import { CreateNotificationDTO } from "../dtos/CreateNotificationDTO";
import { addNotificationJob } from "../../infrastructure/queue/NotificationQueue";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { INotificationTypeRepository } from "../../domain/repositories/INotificationTypeRepository";
import { INotificationLogRepository } from "../../domain/repositories/INotificationLogRepository";
import { INotificationService } from "../interfaces/INotificationService";
import { NotificationLog } from "../../infrastructure/database/entities/NotificationLog";

export class NotificationService implements INotificationService {
  constructor(
    private userRepository: IUserRepository,
    private categoryRepository: ICategoryRepository,
    private notificationTypeRepository: INotificationTypeRepository,
    private notificationLogRepository: INotificationLogRepository
  ) {}

  async createNotification(dto: CreateNotificationDTO): Promise<void> {
    const { categoryId, notificationTypeId, message } = dto;

    const user = await this.userRepository.findOneById(1);

    if (!user) {
      throw new Error("User not found");
    }

    const category = await this.categoryRepository.findOneById(categoryId);
    const notificationType = await this.notificationTypeRepository.findOneById(
      notificationTypeId
    );

    if (!category || !notificationType) {
      throw new Error("Invalid user, category, or notification type");
    }

    const notificationLog = new NotificationLog();

    notificationLog.category = category;
    notificationLog.notificationType = notificationType;
    notificationLog.message = message;
    notificationLog.timestamp = new Date();
    notificationLog.user = user;

    await this.notificationLogRepository.save(notificationLog);

    const job = {
      message,
      category: category.name,
      userId: user.id,
    };

    await addNotificationJob(job);
  }

  async getNotificationLogs(): Promise<NotificationLog[]> {
    return this.notificationLogRepository.findAllSortedByTimestamp();
  }
}
