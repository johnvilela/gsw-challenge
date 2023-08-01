'use client';

import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import { useBanknotes } from "@/hooks/useBanknotes";
import { useUsers } from "@/hooks/useUsers";
import Link from "next/link";
import { useRef } from "react";
import { MdDelete } from "react-icons/md";

export default function AdminPage() {
  const { notesAmount, saveNotesAmount, setNotesAmount } = useBanknotes();
  const { createUser, users, deleteUser, status } = useUsers();
  const userRef = useRef({ name: '', email: '' })

  return (
    <main className="grid min-h-screen place-content-center p-4 bg-teal-200">
      <div className="bg-teal-700 p-8 rounded-3xl">
        <h1 className="text-left uppercase text-3xl mb-8 text-teal-50">
          <strong>
            Painel ADMIN
          </strong>
        </h1>
        <h2 className="text-teal-100 mb-4 uppercase">Amount of notes</h2>
        <form className="grid gap-2 grid-cols-2 grid-rows-2" onSubmit={saveNotesAmount}>
          <Textfield type="number" label="R$ 100" value={notesAmount[100]} onChange={e => setNotesAmount(val => ({ ...val, '100': +e.target.value }))} />
          <Textfield type="number" label="R$ 50" value={notesAmount[50]} onChange={e => setNotesAmount(val => ({ ...val, '50': +e.target.value }))} />
          <Textfield type="number" label="R$ 20" value={notesAmount[20]} onChange={e => setNotesAmount(val => ({ ...val, '20': +e.target.value }))} />
          <Textfield type="number" label="R$ 10" value={notesAmount[10]} onChange={e => setNotesAmount(val => ({ ...val, '10': +e.target.value }))} />
          <div className="col-span-2 mt-2">
            <Button type='submit'>
              Save update
            </Button>
          </div>
        </form>

        <div className="w-full border-b-2 border-teal-100 my-12" />

        <h2 className="text-teal-100 mb-4 uppercase">Manage users</h2>

        {status === 'loading' && (<p className="text-teal-100">Loading users...</p>)}

        {status === 'success' && (<>
          <form className="grid gap-2 grid-cols-2 grid-rows-2" onSubmit={() => createUser({ ...userRef.current })}>
            <Textfield type='text' placeholder="Name" onChange={e => userRef.current.name = e.target.value} />
            <Textfield type='email' placeholder="Email" onChange={e => userRef.current.email = e.target.value} />
            <div className="col-span-2 mt-2">
              <Button type="submit">
                Create user
              </Button>
            </div>
          </form>

          <h3 className="text-teal-100 mt-8 uppercase">User list</h3>

          <ul>
            {users.map(user => (
              <li key={user.id} className="py-4 border-b last:border-b-0 border-teal-300 flex justify-between items-center text-teal-100">
                <p>{user.name}</p>
                <button type='button' onClick={() => deleteUser(user.id)}>
                  <MdDelete size='1.5rem' />
                </button>
              </li>
            ))}
          </ul>
        </>
        )}

        <div className="w-full border-b-2 border-teal-100 my-12" />
              
        <Link href='/' className="flex justify-center items-center w-full p-4 font-bold text-teal-50">
          Go back
        </Link>
      </div>
    </main>
  )
}