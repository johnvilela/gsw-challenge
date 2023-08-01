import { Account } from "@/types/Account"
import { useState } from "react"

export function useAccount() {
  const [status, setStatus] = useState<'success' | 'loading' | 'error' | 'idle'>('idle')
  const [account, setAccount] = useState<Account | null>(() => {
    const account = localStorage.getItem('@GSW:user-account')

    if (account) {
      return JSON.parse(account).account
    }

    return null
  })

  return {
    status,
    account,
  }
}