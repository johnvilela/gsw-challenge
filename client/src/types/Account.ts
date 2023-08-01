import { AccountMovement } from "./AccountMovement"

export type Account = {
  id: string,
  totalValue: number,
  userId: string,
  movements: AccountMovement[],
  createdAt: Date,
  updatedAt: Date
}