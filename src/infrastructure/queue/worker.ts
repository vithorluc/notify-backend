import { redisClient } from "./connection";
import { handlers } from "./handlers";
import { NotificationJob } from "./types";

const processJob = async () => {
  const jobData = await redisClient.lPop("notificationQueue");
  if (jobData) {
    const job: NotificationJob = JSON.parse(jobData);
    const { message, category, userId } = job;
    console.log(
      `Processing ${category} notification for user ${userId}: ${message}`
    );

    const handler = handlers[category];
    if (handler) {
      try {
        await handler.handle(userId, message);
        console.log(`Job for user ${userId} completed successfully`);
      } catch (error: any) {
        console.error(
          `Job for user ${userId} failed with error: ${error.message}`
        );
      }
    } else {
      console.error(`No handler found for category: ${category}`);
    }
  }
};

const startWorker = () => {
  setInterval(processJob, 1000);
};

startWorker();
