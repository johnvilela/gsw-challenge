import { Account } from "./Account";

export type User = {
  id: string;
  name: string;
  email: string;
  account?: Account;
  createdAt: Date;
  updatedAt: Date;
}