'use client';

import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import Link from "next/link";
import { MdAttachMoney } from "react-icons/md";

export default function WithdrawnPage() {
  return (
    <main className="grid min-h-screen place-content-center p-4 bg-teal-200">
      <div className="bg-teal-700 rounded-3xl mb-4 p-8 text-teal-50">
        <h1 className="text-left uppercase text-3xl mb-8">
          <strong>
            SAQUE
          </strong>
        </h1>
        <p className="mb-8">Temos apenas notas de <br /><strong>R$ 100,00<br />R$ 50,00<br /> R$ 20,00<br />R$ 10,00</strong></p>
        <form>
          <Textfield icon={MdAttachMoney} placeholder="0,00" />
          <Button customClass="mt-4">
            Sacar dinheiro
          </Button>
          <Link href='/account' className="mt-4 flex justify-center items-center">
            Voltar
          </Link>
        </form>
      </div>
    </main >
  )
}
