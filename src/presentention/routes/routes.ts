import { Router } from "express";
import {
  createNotification,
  getNotificationLogs,
} from "../controllers/NotificationController";

const routes = Router();

routes.use("/send-notifications", createNotification);
routes.use("/health-check", (_, res) => res.send("OK"));
routes.get("/notification-logs", getNotificationLogs);

export default routes;
