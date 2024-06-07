import { INotificationType } from "../entities/INotificationType";

export interface INotificationTypeRepository {
  findOneById(id: number): Promise<any | null>;
  save(notificationType: INotificationType): Promise<any>;
}
