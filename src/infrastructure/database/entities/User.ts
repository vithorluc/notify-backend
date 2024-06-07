import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { UserSubscription } from "./UserSubscription";
import { UserNotificationChannel } from "./UserNotificationChannel";
import { NotificationLog } from "./NotificationLog";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  name: string;

  @Column({type: "varchar"})
  email: string;

  @Column({type: "varchar"})
  phoneNumber: string;

  @OneToMany(() => UserSubscription, (subscription) => subscription.user)
  subscriptions: UserSubscription[];

  @OneToMany(() => UserNotificationChannel, (channel) => channel.user)
  channels: UserNotificationChannel[];

  @OneToMany(() => NotificationLog, (log) => log.user)
  notificationLogs: NotificationLog[];
}