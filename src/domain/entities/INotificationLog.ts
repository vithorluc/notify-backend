import { IUser } from "./IUser";
import { ICategory } from "./ICategory";
import { INotificationType } from "./INotificationType";

export interface INotificationLog {
  id: number;
  user: any;
  category: any;
  notificationType: any;
  message: string;
  timestamp: Date;
}
