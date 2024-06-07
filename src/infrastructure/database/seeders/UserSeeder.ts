import { DataSource } from "typeorm";
import { User } from "../entities/User";

export class UserSeeder {
  async run(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(User);

    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "123456789",
      },
    ];

    for (const user of users) {
      const existingUser = await userRepository.findOne({
        where: { email: user.email },
      });
      if (!existingUser) {
        const userEntity = userRepository.create(user);
        await userRepository.save(userEntity);
      }
    }
  }
}
