'use client';

import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import Link from "next/link";
import { MdPerson } from "react-icons/md";

export default function InitialPage() {
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
        <form>
          <p className="mb-4">Para acessar sua conta, entre com seu nome.</p>
          <Textfield icon={MdPerson} placeholder="Nome da conta" />
          <Button customClass="mt-4">
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
