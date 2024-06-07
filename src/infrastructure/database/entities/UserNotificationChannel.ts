import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { NotificationType } from "./NotificationType";

@Entity()
export class UserNotificationChannel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.channels)
  user: User;

  @ManyToOne(() => NotificationType, (notificationType) => notificationType.channels)
  notificationType: NotificationType;
}