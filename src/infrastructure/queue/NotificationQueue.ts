import { redisClient } from "./connection";

interface NotificationJob {
  message: string;
  category: string;
  userId: number;
}

const addNotificationJob = async (job: NotificationJob) => {
  await redisClient.rPush("notificationQueue", JSON.stringify(job));
};

export { addNotificationJob };
