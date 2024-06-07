import { INotificationLog } from "../entities/INotificationLog";

export interface INotificationLogRepository {
  save(notificationLog: INotificationLog): Promise<INotificationLog>;
  findAllSortedByTimestamp(): Promise<INotificationLog[]>;
}
