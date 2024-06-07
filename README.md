### Notification Service

This project provides a notification service built with Node.js, TypeScript, TypeORM, and Express. It allows you to send notifications and log them into a database. Additionally, it provides endpoints to retrieve the logs and check the service health.

### Table of Contents

1. [Features](#features)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [Getting Started](#getting-started)
5. [Running the Project](#running-the-project)

### Features

- **Send Notifications**: Send notifications with different categories and types.
- **Log Notifications**: Log all notifications into the database.
- **Retrieve Logs**: Retrieve logs of all notifications, sorted from newest to oldest.
- **Health Check**: Check the health status of the service.

### Database Schema

The database consists of the following tables:

#### Users

| Column      | Type    | Description         |
| ----------- | ------- | ------------------- |
| id          | INT     | Primary Key         |
| name        | VARCHAR | User's name         |
| email       | VARCHAR | User's email        |
| phoneNumber | VARCHAR | User's phone number |

#### Categories

| Column | Type    | Description   |
| ------ | ------- | ------------- |
| id     | INT     | Primary Key   |
| name   | VARCHAR | Category name |

#### NotificationTypes

| Column | Type    | Description            |
| ------ | ------- | ---------------------- |
| id     | INT     | Primary Key            |
| name   | VARCHAR | Notification type name |

#### UserSubscriptions

| Column     | Type | Description               |
| ---------- | ---- | ------------------------- |
| id         | INT  | Primary Key               |
| userId     | INT  | Foreign Key to Users      |
| categoryId | INT  | Foreign Key to Categories |

#### UserNotificationChannels

| Column             | Type | Description                      |
| ------------------ | ---- | -------------------------------- |
| id                 | INT  | Primary Key                      |
| userId             | INT  | Foreign Key to Users             |
| notificationTypeId | INT  | Foreign Key to NotificationTypes |

#### NotificationLogs

| Column             | Type      | Description                      |
| ------------------ | --------- | -------------------------------- |
| id                 | INT       | Primary Key                      |
| userId             | INT       | Foreign Key to Users             |
| categoryId         | INT       | Foreign Key to Categories        |
| notificationTypeId | INT       | Foreign Key to NotificationTypes |
| message            | TEXT      | Notification message             |
| timestamp          | TIMESTAMP | Time of notification             |

### API Endpoints

#### POST /send-notifications

Send a notification and log it into the database.

**Payload:**

```json
{
  "message": "Test Message",
  "category_id": "1",
  "notification_type_id": "1"
}
```

#### GET /notification-logs

Retrieve the logs of all notifications, sorted from newest to oldest.

**Response:**

```json
[
  {
    "id": 2,
    "message": "Test Message",
    "timestamp": "2024-06-06T18:22:11.000Z",
    "user": null,
    "category": {
      "id": 1,
      "name": "Sports"
    },
    "notificationType": {
      "id": 1,
      "name": "SMS"
    }
  },
  {
    "id": 1,
    "message": "Test Message",
    "timestamp": "2024-06-06T18:17:26.000Z",
    "user": null,
    "category": {
      "id": 1,
      "name": "Sports"
    },
    "notificationType": {
      "id": 1,
      "name": "SMS"
    }
  }
]
```

#### GET /health-check

Check the health status of the service.

**Response:**

```text
OK
```

### Getting Started

Follow these steps to get the project up and running:

1. **Clone the repository:**

   ```sh
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create environment variables file:**
   Create a `.env` file in the root directory with the following content:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=user
   DB_PASSWORD=password
   DB_DATABASE=notifications
   REDIS_URL=redis://localhost:6379
   ```

### Running the Project

1. **Start Docker containers:**
   Make sure Docker is installed and running on your machine, then start the services with Docker Compose.

   ```sh
   docker compose up
   ```

2. **Run the application:**
   ```sh
   npm start
   ```

The application should now be running and accessible at `http://localhost:3000`.

### Example Requests

**Sending a Notification:**

```sh
curl -X POST http://localhost:3000/api/send-notifications \
-H "Content-Type: application/json" \
-d '{
    "message": "Test Message",
    "category_id": "1",
    "notification_type_id": "1"
}'
```

**Retrieving Notification Logs:**

```sh
curl http://localhost:3000/api/notification-logs
```

**Health Check:**

```sh
curl http://localhost:3000/api/health-check
```
