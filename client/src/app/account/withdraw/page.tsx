'use client';

import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import { useAccount } from "@/hooks/useAccount";
import { Banknotes, useBanknotes } from "@/hooks/useBanknotes";
import { ACCOUNT_MOVEMENT_TYPE, AccountMovement } from "@/types/AccountMovement";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { MdAttachMoney } from "react-icons/md";

export default function WithdrawPage() {
  const { notesAmount } = useBanknotes();
  const { createAccountMovement } = useAccount();
  const valueRef = useRef(0);

  const [withdrawResult, setWithdrawResult] = useState<AccountMovement | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const withdrawRes = await createAccountMovement({
      value: valueRef.current,
      movementType: ACCOUNT_MOVEMENT_TYPE.WITHDRAW,
      banknotes: notesAmount
    })

    setWithdrawResult(withdrawRes!);
  }

  return (
    <main className="grid min-h-screen place-content-center p-4 bg-teal-200">
      <div className="bg-teal-700 rounded-3xl mb-4 p-8 text-teal-50">
        {!withdrawResult ? (
          <>
            <h1 className="text-left uppercase text-3xl mb-8">
              <strong>
                WITHDRAW
              </strong>
            </h1>
            <p className="mb-8">We only have the following notes <br /><strong>R$ 100,00<br />R$ 50,00<br /> R$ 20,00<br />R$ 10,00</strong></p>
            <form onSubmit={submit}>
              <Textfield type='number' min={10} id="value" label='Value' icon={MdAttachMoney} onChange={e => valueRef.current = +e.target.value} required />
              <Button type='submit' customClass="mt-4">
                Withdraw money
              </Button>
              <Link href='/account' className="mt-4 flex justify-center items-center">
                Go back
              </Link>
            </form></>
        ) : (
          <>
            <h1 className="text-left uppercase text-3xl mb-8">
              <strong>
                Money Withdrawn!
              </strong>
            </h1>
            <ul>
              {withdrawResult.banknotes && Object.keys(withdrawResult.banknotes).map((value) => (
                <li key={value} className="flex justify-between">
                  <p><strong>x{withdrawResult.banknotes![value as keyof Banknotes]}</strong></p>
                  <p>R$ {value},00</p>
                </li>
              ))}

            </ul>
            <div className="flex justify-between font-bold border-t border-teal-50 py-2 mt-2">
              <p>Total</p>
              <p>R$ {withdrawResult.value.toLocaleString('pt-BR')}</p>
            </div>
            <Button type='button' onClick={() => setWithdrawResult(null)} customClass="mt-4">
              Create another withdraw
            </Button>
            <Link href='/account' className="mt-4 flex justify-center items-center">
              Go back
            </Link>
          </>
        )}

      </div>
    </main >
  )
}
