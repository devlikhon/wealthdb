export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status?: "Sent" | "In Progress" | "Completed" | "Rejected";
  createdAt: string;
  updatedAt: string;
}
