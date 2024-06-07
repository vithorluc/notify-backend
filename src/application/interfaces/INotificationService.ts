import { CreateNotificationDTO } from "../dtos/CreateNotificationDTO";

export interface INotificationService {
  createNotification(dto: CreateNotificationDTO): Promise<void>;
}
