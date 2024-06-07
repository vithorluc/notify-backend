import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { NotificationType } from "./NotificationType";

@Entity()
export class NotificationLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notificationLogs)
  user: User;

  @ManyToOne(() => Category, (category) => category.notificationLogs)
  category: Category;

  @ManyToOne(
    () => NotificationType,
    (notificationType) => notificationType.notificationLogs
  )
  notificationType: NotificationType;

  @Column("text")
  message: string;

  @Column("timestamp")
  timestamp: Date;
}
