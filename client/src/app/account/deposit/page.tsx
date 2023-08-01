'use client';

import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import { useAccount } from "@/hooks/useAccount";
import { ACCOUNT_MOVEMENT_TYPE } from "@/types/AccountMovement";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { MdAttachMoney } from "react-icons/md";

export default function DepositPage() {
  const { createAccountMovement } = useAccount();
  const router = useRouter()
  const valueRef = useRef(0);


  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await createAccountMovement({
      value: valueRef.current,
      movementType: ACCOUNT_MOVEMENT_TYPE.DEPOSIT,
    })

    router.push('/account');
  }

  return (
    <main className="grid min-h-screen place-content-center p-4 bg-teal-200">
      <div className="bg-teal-700 rounded-3xl mb-4 p-8 text-teal-50">
        <h1 className="text-left uppercase text-3xl mb-8">
          <strong>
            DEPOSIT
          </strong>
        </h1>
        <form onSubmit={submit}>
          <Textfield type='number' min={10} id="value" label='Value' icon={MdAttachMoney} onChange={e => valueRef.current = +e.target.value} required />
          <Button type='submit' customClass="mt-4">
            Deposit money
          </Button>
          <Link href='/account' className="mt-4 flex justify-center items-center">
            Go back
          </Link>
        </form>
      </div>
    </main >
  )
}
