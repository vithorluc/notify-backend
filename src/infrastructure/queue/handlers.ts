import { Category } from "./types";

const handlers: {
  [key in keyof Category]: {
    handle: (userId: number, message: string) => Promise<void>;
  };
} = {
  movies: {
    handle: async (userId: number, message: string) => {
      console.log(`Handling movie notification for user ${userId}: ${message}`);
      // Add your handling logic here
    },
  },
  sports: {
    handle: async (userId: number, message: string) => {
      console.log(
        `Handling sports notification for user ${userId}: ${message}`
      );
      // Add your handling logic here
    },
  },
  finance: {
    handle: async (userId: number, message: string) => {
      console.log(
        `Handling finance notification for user ${userId}: ${message}`
      );
      // Add your handling logic here
    },
  },
};

export { handlers };
