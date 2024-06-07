import { DataSource } from "typeorm";
import { NotificationType } from "../entities/NotificationType";

export class NotificationTypeSeeder {
  async run(dataSource: DataSource) {
    const notificationTypeRepository =
      dataSource.getRepository(NotificationType);

    const notificationTypes = [
      { name: "SMS" },
      { name: "Email" },
      { name: "Push Notification" },
    ];

    for (const type of notificationTypes) {
      const existingNotificationType = await notificationTypeRepository.findOne(
        { where: { name: type.name } }
      );
      if (!existingNotificationType) {
        const notificationTypeEntity = notificationTypeRepository.create(type);
        await notificationTypeRepository.save(notificationTypeEntity);
      }
    }
  }
}
