import { redisClient } from "./connection";
import { NotificationJob } from "./types";

const addNotificationJob = async (job: NotificationJob) => {
  await redisClient.rPush("notificationQueue", JSON.stringify(job));
};

export { addNotificationJob };
