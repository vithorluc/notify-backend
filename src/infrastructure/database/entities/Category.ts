import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { UserSubscription } from "./UserSubscription";
import { NotificationLog } from "./NotificationLog";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  name: string;

  @OneToMany(() => UserSubscription, (subscription) => subscription.category)
  subscriptions: UserSubscription[];

  @OneToMany(() => NotificationLog, (log) => log.category)
  notificationLogs: NotificationLog[];
}