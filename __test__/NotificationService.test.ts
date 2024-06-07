import { CreateNotificationDTO } from "../src/application/dtos/CreateNotificationDTO";
import { NotificationService } from "../src/application/services/NotificationService";
import { ICategoryRepository } from "../src/domain/repositories/ICategoryRepository";
import { INotificationLogRepository } from "../src/domain/repositories/INotificationLogRepository";
import { INotificationTypeRepository } from "../src/domain/repositories/INotificationTypeRepository";
import { IUserRepository } from "../src/domain/repositories/IUserRepository";
import { addNotificationJob } from "../src/infrastructure/queue/NotificationQueue";

jest.mock("../src/infrastructure/queue/NotificationQueue");

jest.mock("redis", () => {
  return {
    createClient: jest.fn().mockReturnValue({
      connect: jest.fn(),
      on: jest.fn(),
    }),
  };
});

describe("NotificationService", () => {
  let notificationService: NotificationService;
  let userRepository: IUserRepository;
  let categoryRepository: ICategoryRepository;
  let notificationTypeRepository: INotificationTypeRepository;
  let notificationLogRepository: INotificationLogRepository;

  beforeEach(() => {
    userRepository = {
      findOneById: jest.fn(),
    } as any;

    categoryRepository = {
      findOneById: jest.fn(),
    } as any;

    notificationTypeRepository = {
      findOneById: jest.fn(),
    } as any;

    notificationLogRepository = {
      save: jest.fn(),
      findAllSortedByTimestamp: jest.fn(),
    } as any;

    notificationService = new NotificationService(
      userRepository,
      categoryRepository,
      notificationTypeRepository,
      notificationLogRepository
    );
  });

  it("should create a notification successfully", async () => {
    const dto: CreateNotificationDTO = {
      categoryId: 1,
      notificationTypeId: 1,
      message: "Test notification",
    };

    const user = { id: 1, name: "Test User" };
    const category = { id: 1, name: "Test Category" };
    const notificationType = { id: 1, name: "Test Type" };

    (userRepository.findOneById as jest.Mock).mockResolvedValue(user);
    (categoryRepository.findOneById as jest.Mock).mockResolvedValue(category);
    (notificationTypeRepository.findOneById as jest.Mock).mockResolvedValue(
      notificationType
    );

    await notificationService.createNotification(dto);

    expect(userRepository.findOneById).toHaveBeenCalledWith(1);
    expect(categoryRepository.findOneById).toHaveBeenCalledWith(1);
    expect(notificationTypeRepository.findOneById).toHaveBeenCalledWith(1);
    expect(notificationLogRepository.save).toHaveBeenCalled();
    expect(addNotificationJob).toHaveBeenCalledWith({
      message: dto.message,
      category: category.name,
      userId: user.id,
    });
  });

  it("should throw an error if user is not found", async () => {
    const dto: CreateNotificationDTO = {
      categoryId: 1,
      notificationTypeId: 1,
      message: "Test notification",
    };

    (userRepository.findOneById as jest.Mock).mockResolvedValue(null);

    await expect(notificationService.createNotification(dto)).rejects.toThrow(
      "User not found"
    );
  });

  it("should throw an error if category or notification type is not found", async () => {
    const dto: CreateNotificationDTO = {
      categoryId: 1,
      notificationTypeId: 1,
      message: "Test notification",
    };

    const user = { id: 1, name: "Test User" };
    (userRepository.findOneById as jest.Mock).mockResolvedValue(user);
    (categoryRepository.findOneById as jest.Mock).mockResolvedValue(null);

    await expect(notificationService.createNotification(dto)).rejects.toThrow(
      "Invalid user, category, or notification type"
    );
  });

  it("should return all notification logs sorted by timestamp", async () => {
    const logs = [
      {
        id: 1,
        message: "Log 1",
        timestamp: new Date(),
        category: {},
        notificationType: {},
      },
      {
        id: 2,
        message: "Log 2",
        timestamp: new Date(),
        category: {},
        notificationType: {},
      },
    ];

    (
      notificationLogRepository.findAllSortedByTimestamp as jest.Mock
    ).mockResolvedValue(logs);

    const result = await notificationService.getNotificationLogs();

    expect(result).toEqual(logs);
    expect(
      notificationLogRepository.findAllSortedByTimestamp
    ).toHaveBeenCalled();
  });
});
