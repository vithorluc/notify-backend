export interface Category {
  movies: string;
  sports: string;
  finance: string;
}

export interface NotificationJob {
  message: string;
  category: keyof Category;
  userId: number;
}
