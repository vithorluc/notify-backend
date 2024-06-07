import { Request, Response } from "express";
import { NotificationService } from "../../application/services/NotificationService";
import { UserRepository } from "../../infrastructure/database/repositories/userRepository";
import { CategoryRepository } from "../../infrastructure/database/repositories/categoryRepository";
import { NotificationTypeRepository } from "../../infrastructure/database/repositories/notificationTypeRepository";
import { NotificationLogRepository } from "../../infrastructure/database/repositories/notificationLogRepository";
import { CreateNotificationDTO } from "../../application/dtos/CreateNotificationDTO";

const userRepository = new UserRepository();
const categoryRepository = new CategoryRepository();
const notificationTypeRepository = new NotificationTypeRepository();
const notificationLogRepository = new NotificationLogRepository();

const notificationService = new NotificationService(
  userRepository,
  categoryRepository,
  notificationTypeRepository,
  notificationLogRepository
);

export const createNotification = async (req: Request, res: Response) => {
  const { categoryId, notificationTypeId, message } =
    req.body as CreateNotificationDTO;

  try {
    await notificationService.createNotification({
      categoryId,
      notificationTypeId,
      message,
    });
    res
      .status(201)
      .json({ message: "Notification created and logged successfully" });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotificationLogs = async (req: Request, res: Response) => {
  try {
    const logs = await notificationService.getNotificationLogs();
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching notification logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
