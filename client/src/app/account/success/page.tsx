'use client';

import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import Link from "next/link";
import { MdAttachMoney } from "react-icons/md";

export default function SuccessPage() {
  return (
    <main className="grid min-h-screen place-content-center p-4 bg-teal-200">
      <div className="bg-teal-700 rounded-3xl mb-4 p-8 text-teal-50">
        <h1 className="text-left uppercase text-3xl mb-8">
          <strong>
            Dinheiro Sacado!
          </strong>
        </h1>
        <ul>
          <li className="flex justify-between">
            <p><strong>2x</strong></p>
            <p>R$100,00</p>
          </li>
        </ul>
        <div className="flex justify-between font-bold border-t border-teal-50 py-2 mt-2">
          <p>Total</p>
          <p>R$200,00</p>
        </div>
        <Link href='/account' className="mt-4 flex justify-center items-center">
          Voltar
        </Link>
      </div>
    </main >
  )
}
