'use client';

import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import { useUsers } from "../hooks/useUsers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { MdAlternateEmail } from "react-icons/md";

export default function InitialPage() {
  const { findByEmail } = useUsers();
  const navigation = useRouter()
  const emailRef = useRef('');

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = await findByEmail(emailRef.current);

    await localStorage.setItem('@GSW:user-account', JSON.stringify(user));

    navigation.push('/account');
  }

  return (
    <main className="grid min-h-screen place-content-center p-4 bg-teal-200">
      <div className="bg-teal-700 rounded-3xl mb-4 p-8 text-teal-50">
        <h1 className="text-left uppercase text-xl mb-8">
          <strong className="text-6xl">
            GSW
          </strong>
          <br />
          Challenge
        </h1>
        <form onSubmit={login}>
          <Textfield type="email" icon={MdAlternateEmail} placeholder="Email" onChange={e => emailRef.current = e.target.value} required />
          <Button type="submit" customClass="mt-4">
            Entrar
          </Button>
          <Link href='/admin' className="flex justify-center items-center p-2 mt-4 text-teal-100 font-bold">
            Painel ADMIN
          </Link>
        </form>
      </div>
    </main >
  )
}
