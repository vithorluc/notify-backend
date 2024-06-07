import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserNotificationChannel } from "./UserNotificationChannel";
import { NotificationLog } from "./NotificationLog";

@Entity()
export class NotificationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  name: string;

  @OneToMany(() => UserNotificationChannel, (channel) => channel.notificationType)
  channels: UserNotificationChannel[];

  @OneToMany(() => NotificationLog, (log) => log.notificationType)
  notificationLogs: NotificationLog[];
}