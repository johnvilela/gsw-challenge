import { Api } from "@/services/api"
import { Account } from "@/types/Account"
import { AccountMovement } from "@/types/AccountMovement"
import { User } from "@/types/User"
import { useState } from "react"

export function useAccount() {
  const [status, setStatus] = useState<'success' | 'loading' | 'error' | 'idle'>('idle')
  const [userAccount, setUserAccount] = useState<User | null>(() => {
    const userAccount = localStorage.getItem('@GSW:user-account')

    if (userAccount) {
      return JSON.parse(userAccount)
    }

    return null
  })

  async function createAccountMovement(data: Omit<AccountMovement, 'createdAt' | 'id' | 'accountId'>) {
    setStatus('loading')

    try {
      const res = (await Api.post('account-movement', { ...data, accountId: userAccount?.account?.id })).data

      const account = (await Api.get(`accounts/${userAccount?.id!}`)).data as Account

      setStatus('success')
      setUserAccount(val => ({ ...val!, account }))
      localStorage.setItem('@GSW:user-account', JSON.stringify({ ...userAccount, account }))

      return res as AccountMovement
    } catch (error) {
      setStatus('error')
    }
  }

  return {
    status,
    userAccount,
    createAccountMovement,
  }
}