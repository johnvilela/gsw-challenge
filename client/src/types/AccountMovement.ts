export enum ACCOUNT_MOVEMENT_TYPE {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW'
}

export type AccountMovement = {
  id: string,
  value: number,
  movementType: ACCOUNT_MOVEMENT_TYPE,
  accountId: string,
  createdAt: Date
}