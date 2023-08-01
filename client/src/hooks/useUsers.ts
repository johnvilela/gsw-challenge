import { Api } from "@/services/api";
import { User } from "@/types/User";
import { useEffect, useState } from "react";

export function useUsers() {
  const [status, setStatus] = useState<'success' | 'loading' | 'error' | 'idle'>('idle')
  const [users, setUsers] = useState<User[]>([])

  async function createUser(data: Pick<User, 'name' | 'email'>) {
    setStatus('loading')
    try {
      const res = (await Api.post('/user', data)).data
      setStatus('success')
      setUsers(val => [...val, res])
    } catch (error) {
      setStatus('error')
      throw error
    }
  }

  async function listUsers() {
    setStatus('loading')
    try {
      const res = (await Api.get('/user')).data
      setStatus('success')
      setUsers(res)
    } catch (error) {
      setStatus('error')
      throw error
    }
  }

  async function deleteUser(id: string) {
    setStatus('loading')
    try {
      await Api.delete(`/user/${id}`)

      setUsers(val => val.filter((user) => user.id !== id))

      setStatus('success')
    } catch (error) {
      setStatus('error')
      throw error
    }
  }

  async function findByEmail(email: string) {
    setStatus('loading')
    try {
      const res = (await Api.get(`/user/email?email=${encodeURIComponent(email)}`)).data
      setStatus('success')

      return res
    } catch (error) {
      setStatus('error')
      throw error
    }
  }

  useEffect(() => {
    listUsers()
  }, [])

  return {
    status,
    users,
    createUser,
    listUsers,
    deleteUser,
    findByEmail
  }
}